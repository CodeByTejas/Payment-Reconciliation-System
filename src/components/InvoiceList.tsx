import React from 'react';
import { Invoice } from '../types';
import { format } from 'date-fns';

interface InvoiceListProps {
  invoices: Invoice[];
}

export function InvoiceList({ invoices }: InvoiceListProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Recent Invoices</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Invoice #</th>
              <th className="text-left py-3">Customer</th>
              <th className="text-left py-3">Amount</th>
              <th className="text-left py-3">Due Date</th>
              <th className="text-left py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(invoice => (
              <tr key={invoice.id} className="border-b">
                <td className="py-3">{invoice.id}</td>
                <td className="py-3">{invoice.customerId}</td>
                <td className="py-3">${invoice.amountDue.toFixed(2)}</td>
                <td className="py-3">{format(new Date(invoice.dueDate), 'MMM d, yyyy')}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-sm ${
                    invoice.status === 'PAID' ? 'bg-green-100 text-green-800' :
                    invoice.status === 'PARTIALLY_PAID' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {invoice.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}