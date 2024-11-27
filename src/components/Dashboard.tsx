import React from 'react';
import { Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { StatsCards } from './StatsCards';
import { DiscrepancyList } from './DiscrepancyList';
import { InvoiceList } from './InvoiceList';
import { AddInvoiceForm } from './AddInvoiceForm';
import { AddPaymentForm } from './AddPaymentForm';
import { usePaymentQueries } from '../hooks/usePaymentQueries';

export function Dashboard() {
  const { 
    queries,
    invoices,
    discrepancies,
    payments,
    isLoading,
    handleReconcile
  } = usePaymentQueries();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!queries) return null;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payment Reconciliation Dashboard</h1>
        <button
          onClick={handleReconcile}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
        >
          Run Reconciliation
        </button>
      </div>

      <StatsCards
        invoiceCount={invoices.length}
        discrepancyCount={discrepancies.length}
        reconciledCount={invoices.filter(i => i.status === 'PAID').length}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AddInvoiceForm 
          queries={queries} 
          onSuccess={handleReconcile} 
        />
        <AddPaymentForm 
          queries={queries} 
          invoices={invoices}
          onSuccess={handleReconcile} 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <InvoiceList invoices={invoices} />
        <DiscrepancyList 
          discrepancies={discrepancies} 
          queries={queries}
          onResolve={handleReconcile}
        />
      </div>
    </div>
  );
}