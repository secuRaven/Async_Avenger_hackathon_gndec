import React, { useState } from 'react';
import { Calendar, CheckCircle, AlertCircle } from 'lucide-react';

// Custom Rupee Icon component
const RupeeIcon = ({ className = "h-4 w-4" }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 7H6.5a3.5 3.5 0 0 1 0-7h11" />
    <path d="M6.5 7c2 0 3.5 1.5 3.5 3.5S8.5 14 6.5 14" />
    <path d="M18 14H6.5" />
    <path d="M12 14l5.5 7" />
    <path d="M6.5 21h11" />
  </svg>
);

const Fees = () => {
  const [fees] = useState([
    {
      id: 1,
      type: 'Tuition Fee',
      amount: 5000,
      dueDate: '2025-04-30',
      status: 'pending',
      semester: 'Spring 2025',
    },
    {
      id: 2,
      type: 'Library Fee',
      amount: 200,
      dueDate: '2025-04-15',
      status: 'paid',
      paidDate: '2025-04-10',
      transactionId: 'TXN123456',
      semester: 'Spring 2025',
    },
    {
      id: 3,
      type: 'Laboratory Fee',
      amount: 300,
      dueDate: '2025-04-20',
      status: 'overdue',
      semester: 'Spring 2025',
    },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'text-green-600 bg-green-100';
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'overdue':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-4 w-4" />;
      case 'pending':
        return <Calendar className="h-4 w-4" />;
      case 'overdue':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <RupeeIcon className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Fee Management</h1>
          <div className="flex space-x-2">
            <button className="bg-white text-gray-600 px-4 py-2 rounded-lg border hover:bg-gray-50 transition-colors">
              Payment History
            </button>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors">
              Pay Fees
            </button>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="grid grid-cols-1 gap-4 p-6">
            {fees.map((fee) => (
              <div
                key={fee.id}
                className="border rounded-lg p-4 hover:border-indigo-200 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {fee.type}
                    </h3>
                    <p className="text-gray-600">{fee.semester}</p>
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center space-x-1 text-gray-500">
                        <Calendar className="h-4 w-4" />
                        <span>Due: {formatDate(fee.dueDate)}</span>
                      </span>
                      <span className="flex items-center space-x-1 text-gray-500">
                        <RupeeIcon className="h-4 w-4" />
                        <span>Amount: {formatAmount(fee.amount)}</span>
                      </span>
                    </div>
                    {fee.paidDate && (
                      <p className="text-gray-500">
                        Paid on: {formatDate(fee.paidDate)}
                      </p>
                    )}
                    {fee.transactionId && (
                      <p className="text-gray-500">
                        Transaction ID: {fee.transactionId}
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <span
                      className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${getStatusColor(
                        fee.status
                      )}`}
                    >
                      {getStatusIcon(fee.status)}
                      <span className="capitalize">{fee.status}</span>
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex justify-end space-x-3">
                  <button className="text-gray-600 hover:text-gray-900 px-3 py-1 rounded border hover:border-gray-300 transition-colors">
                    View Details
                  </button>
                  {(fee.status === 'pending' || fee.status === 'overdue') && (
                    <button className="bg-indigo-600 text-white px-3 py-1 rounded hover:bg-indigo-700 transition-colors">
                      Pay Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fees;