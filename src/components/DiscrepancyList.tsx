import React from 'react';
import { Discrepancy } from '../types';
import { PaymentQueries } from '../db/queries';
import { CheckCircle } from 'lucide-react';

interface DiscrepancyListProps {
  discrepancies: Discrepancy[];
  queries: PaymentQueries;
  onResolve: () => void;
}

export function DiscrepancyList({ discrepancies, queries, onResolve }: DiscrepancyListProps) {
  const handleResolve = (id: number) => {
    queries.resolveDiscrepancy(id);
    onResolve();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Active Discrepancies</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-b">
              <th className="text-left py-3">Invoice #</th>
              <th className="text-left py-3">Customer</th>
              <th className="text-left py-3">Issue</th>
              <th className="text-left py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {discrepancies.map(d => (
              <tr key={d.id} className="border-b">
                <td className="py-3">{d.invoiceId}</td>
                <td className="py-3">{d.customerId}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded text-sm ${
                    d.issue === 'UNDERPAYMENT' ? 'bg-red-100 text-red-800' :
                    d.issue === 'OVERPAYMENT' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {d.issue}
                  </span>
                </td>
                <td className="py-3">
                  <button
                    onClick={() => handleResolve(d.id)}
                    className="flex items-center text-green-600 hover:text-green-800"
                  >
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Mark Resolved
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}