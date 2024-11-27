import React, { useState } from 'react';
import { PaymentQueries } from '../db/queries';
import { format } from 'date-fns';

interface AddInvoiceFormProps {
  queries: PaymentQueries;
  onSuccess: () => void;
}

export function AddInvoiceForm({ queries, onSuccess }: AddInvoiceFormProps) {
  const [formData, setFormData] = useState({
    customerId: '',
    amountDue: '',
    dueDate: format(new Date(), 'yyyy-MM-dd')
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    queries.addInvoice({
      customerId: parseInt(formData.customerId),
      amountDue: parseFloat(formData.amountDue),
      dueDate: formData.dueDate
    });
    onSuccess();
    setFormData({
      customerId: '',
      amountDue: '',
      dueDate: format(new Date(), 'yyyy-MM-dd')
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">Add New Invoice</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Customer ID
            </label>
            <input
              type="number"
              required
              value={formData.customerId}
              onChange={e => setFormData(prev => ({ ...prev, customerId: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Amount Due
            </label>
            <input
              type="number"
              step="0.01"
              required
              value={formData.amountDue}
              onChange={e => setFormData(prev => ({ ...prev, amountDue: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Due Date
            </label>
            <input
              type="date"
              required
              value={formData.dueDate}
              onChange={e => setFormData(prev => ({ ...prev, dueDate: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Add Invoice
          </button>
        </div>
      </form>
    </div>
  );
}