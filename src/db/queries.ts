import { Database } from 'sql.js';
import { Invoice, Payment, Discrepancy } from '../types';
import { format } from 'date-fns';

export class PaymentQueries {
  constructor(private db: Database) {}

  getAllInvoices(): Invoice[] {
    const stmt = this.db.prepare('SELECT * FROM invoices ORDER BY createdAt DESC');
    const results: Invoice[] = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject() as Invoice);
    }
    stmt.free();
    return results;
  }

  getAllPayments(): Payment[] {
    const stmt = this.db.prepare('SELECT * FROM payments ORDER BY paymentDate DESC');
    const results: Payment[] = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject() as Payment);
    }
    stmt.free();
    return results;
  }

  getAllDiscrepancies(): Discrepancy[] {
    const stmt = this.db.prepare('SELECT * FROM discrepancies WHERE resolved = 0');
    const results: Discrepancy[] = [];
    while (stmt.step()) {
      results.push(stmt.getAsObject() as Discrepancy);
    }
    stmt.free();
    return results;
  }

  addInvoice({ customerId, amountDue, dueDate }: { 
    customerId: number;
    amountDue: number;
    dueDate: string;
  }): void {
    const stmt = this.db.prepare(`
      INSERT INTO invoices (customerId, amountDue, dueDate, status, createdAt)
      VALUES (?, ?, ?, 'UNPAID', ?)
    `);
    stmt.run([customerId, amountDue, dueDate, format(new Date(), 'yyyy-MM-dd')]);
    stmt.free();
  }

  addPayment({ invoiceId, customerId, amountPaid, paymentDate }: {
    invoiceId: number;
    customerId: number;
    amountPaid: number;
    paymentDate: string;
  }): void {
    const stmt = this.db.prepare(`
      INSERT INTO payments (customerId, invoiceId, amountPaid, paymentDate, status)
      VALUES (?, ?, ?, ?, 'UNMATCHED')
    `);
    stmt.run([customerId, invoiceId, amountPaid, paymentDate]);
    stmt.free();
    this.reconcilePayments();
  }

  resolveDiscrepancy(discrepancyId: number): void {
    const stmt = this.db.prepare('UPDATE discrepancies SET resolved = 1 WHERE id = ?');
    stmt.run([discrepancyId]);
    stmt.free();
  }

  reconcilePayments(): void {
    this.db.exec(`
      BEGIN TRANSACTION;
      
      UPDATE payments SET status = 'MATCHED'
      WHERE amountPaid = (
        SELECT amountDue FROM invoices 
        WHERE invoices.id = payments.invoiceId
      );

      UPDATE invoices 
      SET status = CASE
        WHEN (SELECT SUM(amountPaid) FROM payments WHERE payments.invoiceId = invoices.id) >= amountDue 
        THEN 'PAID'
        WHEN (SELECT SUM(amountPaid) FROM payments WHERE payments.invoiceId = invoices.id) > 0 
        THEN 'PARTIALLY_PAID'
        ELSE 'UNPAID'
      END;

      INSERT INTO discrepancies (invoiceId, customerId, issue)
      SELECT 
        i.id,
        i.customerId,
        CASE
          WHEN p.totalPaid > i.amountDue THEN 'OVERPAYMENT'
          WHEN p.totalPaid < i.amountDue THEN 'UNDERPAYMENT'
          WHEN julianday(p.latestPayment) > julianday(i.dueDate) THEN 'DELAYED_PAYMENT'
        END as issue
      FROM invoices i
      LEFT JOIN (
        SELECT 
          invoiceId,
          SUM(amountPaid) as totalPaid,
          MAX(paymentDate) as latestPayment
        FROM payments
        GROUP BY invoiceId
      ) p ON p.invoiceId = i.id
      WHERE 
        p.totalPaid != i.amountDue 
        OR julianday(p.latestPayment) > julianday(i.dueDate);
      
      COMMIT;
    `);
  }
}