import initSqlJs from 'sql.js';
import { Database } from 'sql.js';
import { format } from 'date-fns';

let db: Database | null = null;

export async function initializeDatabase(): Promise<Database> {
  if (db) return db;
  
  const SQL = await initSqlJs({
    locateFile: file => `https://sql.js.org/dist/${file}`
  });
  
  db = new SQL.Database();
  
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT CHECK(role IN ('ADMIN', 'USER')) NOT NULL,
      createdAt TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS invoices (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customerId INTEGER NOT NULL,
      amountDue DECIMAL(10, 2) NOT NULL,
      dueDate TEXT NOT NULL,
      status TEXT CHECK(status IN ('PAID', 'UNPAID', 'PARTIALLY_PAID')) NOT NULL,
      createdAt TEXT NOT NULL,
      createdBy INTEGER NOT NULL,
      FOREIGN KEY (createdBy) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customerId INTEGER NOT NULL,
      invoiceId INTEGER NOT NULL,
      amountPaid DECIMAL(10, 2) NOT NULL,
      paymentDate TEXT NOT NULL,
      status TEXT CHECK(status IN ('MATCHED', 'UNMATCHED')) NOT NULL,
      recordedBy INTEGER NOT NULL,
      FOREIGN KEY (invoiceId) REFERENCES invoices(id),
      FOREIGN KEY (recordedBy) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS discrepancies (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      invoiceId INTEGER NOT NULL,
      customerId INTEGER NOT NULL,
      issue TEXT CHECK(issue IN ('UNDERPAYMENT', 'OVERPAYMENT', 'DELAYED_PAYMENT')) NOT NULL,
      resolved BOOLEAN NOT NULL DEFAULT 0,
      resolvedBy INTEGER,
      resolvedAt TEXT,
      FOREIGN KEY (invoiceId) REFERENCES invoices(id),
      FOREIGN KEY (resolvedBy) REFERENCES users(id)
    );

    CREATE TABLE IF NOT EXISTS audit_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      action TEXT NOT NULL,
      entityType TEXT NOT NULL,
      entityId INTEGER NOT NULL,
      userId INTEGER NOT NULL,
      timestamp TEXT NOT NULL,
      details TEXT,
      FOREIGN KEY (userId) REFERENCES users(id)
    );
  `);

  // Insert default admin user
  const stmt = db.prepare(`
    INSERT OR IGNORE INTO users (username, password, role, createdAt)
    VALUES (?, ?, 'ADMIN', ?)
  `);
  stmt.run(['admin', 'admin', format(new Date(), 'yyyy-MM-dd HH:mm:ss')]);
  stmt.free();

  return db;
}