import React, { useState } from 'react';
import { PaymentQueries } from '../db/queries';
import { Invoice } from '../types';
import { format } from 'date-fns';

interface AddPaymentFormProps {
  queries: PaymentQueries;
  invoices: Invoice[];
  onSuccess: () => void;
}

export function AddPaymentForm({ queries, invoices, onSuccess }: AddPaymentFormProps) {
  const [formData, setFormData] = useState({
    invoiceId: '',
    amountPaid: '',
    paymentDate: format(new Date(), 'yyyy-MM-dd')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const invoice = invoices.find(i => i.id === parseInt(formData.invoiceId));
    if (!invoice) return;

    queries.addPayment({
      invoiceId: parseInt(formData.invoiceId),
      customerId: invoice.customerId,
      amountPaid: parseFloat(formData.amountPaid),
      paymentDate: formData.paymentDate
    });
    onSuccess();
    setFormData({
      invoiceId: '',
      amountPaid: '',
      paymentDate: format(new Date(), 'yyyy-MM-dd')
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Record Payment</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Invoice
            </label>
            <select
              required
              value={formData.invoiceId}
              onChange={e => setFormData(prev => ({ ...prev, invoiceId: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Invoice</option>
              {invoices.map(invoice => (
                <option key={invoice.id} value={invoice.id}>
                  Invoice #{invoice.id} - ${invoice.amountDue} (Customer #{invoice.customerId})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount Paid
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.amountPaid}
              onChange={e => setFormData(prev => ({ ...prev, amountPaid: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Payment Date
            </label>
            <input
              type="date"
              required
              value={formData.paymentDate}
              onChange={e => setFormData(prev => ({ ...prev, paymentDate: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Record Payment
          </button>
        </div>
      </form>
    </div>
  );
}