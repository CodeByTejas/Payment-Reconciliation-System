import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { initializeDatabase } from '../db/schema';
import { PaymentQueries } from '../db/queries';
import { Invoice, Payment, Discrepancy } from '../types';

export function usePaymentQueries() {
  const [queries, setQueries] = useState<PaymentQueries | null>(null);

  useEffect(() => {
    const init = async () => {
      const db = await initializeDatabase();
      setQueries(new PaymentQueries(db));
    };
    init();
  }, []);

  const invoicesQuery = useQuery<Invoice[]>({
    queryKey: ['invoices'],
    queryFn: () => queries?.getAllInvoices() ?? [],
    enabled: !!queries
  });

  const discrepanciesQuery = useQuery<Discrepancy[]>({
    queryKey: ['discrepancies'],
    queryFn: () => queries?.getAllDiscrepancies() ?? [],
    enabled: !!queries
  });

  const paymentsQuery = useQuery<Payment[]>({
    queryKey: ['payments'],
    queryFn: () => queries?.getAllPayments() ?? [],
    enabled: !!queries
  });

  const handleReconcile = async () => {
    if (!queries) return;
    
    queries.reconcilePayments();
    await Promise.all([
      invoicesQuery.refetch(),
      discrepanciesQuery.refetch(),
      paymentsQuery.refetch()
    ]);
  };

  return {
    queries,
    invoices: invoicesQuery.data ?? [],
    discrepancies: discrepanciesQuery.data ?? [],
    payments: paymentsQuery.data ?? [],
    isLoading: !queries || invoicesQuery.isLoading || discrepanciesQuery.isLoading || paymentsQuery.isLoading,
    handleReconcile
  };
}