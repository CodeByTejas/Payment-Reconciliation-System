import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { PaymentAnalytics } from '../types';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface AnalyticsProps {
  data: PaymentAnalytics;
}

export function Analytics({ data }: AnalyticsProps) {
  const chartData = {
    labels: data.monthlyPayments.map(p => p.month),
    datasets: [
      {
        label: 'Monthly Payments',
        data: data.monthlyPayments.map(p => p.amount),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Monthly Payment Trends'
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Total Amount</h3>
          <p className="text-2xl font-bold text-blue-600">${data.totalAmount.toFixed(2)}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Paid Amount</h3>
          <p className="text-2xl font-bold text-green-600">${data.paidAmount.toFixed(2)}</p>
        </div>
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold text-gray-700">Unpaid Amount</h3>
          <p className="text-2xl font-bold text-red-600">${data.unpaidAmount.toFixed(2)}</p>
        </div>
      </div>
      <div className="h-[400px]">
        <Line options={options} data={chartData} />
      </div>
    </div>
  );
}