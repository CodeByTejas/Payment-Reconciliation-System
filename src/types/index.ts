export interface Invoice {
  id: number;
  customerId: number;
  amountDue: number;
  dueDate: string;
  status: 'PAID' | 'UNPAID' | 'PARTIALLY_PAID';
  createdAt: string;
}

export interface Payment {
  id: number;
  customerId: number;
  invoiceId: number;
  amountPaid: number;
  paymentDate: string;
  status: 'MATCHED' | 'UNMATCHED';
}

export interface Discrepancy {
  id: number;
  invoiceId: number;
  customerId: number;
  issue: 'UNDERPAYMENT' | 'OVERPAYMENT' | 'DELAYED_PAYMENT';
  resolved: boolean;
}

export interface User {
  id: number;
  username: string;
  password: string;
  role: 'ADMIN' | 'USER';
  createdAt: string;
}

export interface PaymentAnalytics {
  totalAmount: number;
  paidAmount: number;
  unpaidAmount: number;
  monthlyPayments: {
    month: string;
    amount: number;
  }[];
}