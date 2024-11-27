import React from 'react';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';

interface StatsCardsProps {
  invoiceCount: number;
  discrepancyCount: number;
  reconciledCount: number;
}

export function StatsCards({ invoiceCount, discrepancyCount, reconciledCount }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Total Invoices</h2>
          <Activity className="text-blue-500" />
        </div>
        <p className="text-3xl font-bold mt-2">{invoiceCount}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Unresolved Discrepancies</h2>
          <AlertTriangle className="text-yellow-500" />
        </div>
        <p className="text-3xl font-bold mt-2">{discrepancyCount}</p>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Reconciled Payments</h2>
          <CheckCircle className="text-green-500" />
        </div>
        <p className="text-3xl font-bold mt-2">{reconciledCount}</p>
      </div>
    </div>
  );
}