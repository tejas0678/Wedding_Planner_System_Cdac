import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { Stat } from './../../components/planner/common/Stat';
import { Status } from './../../components/planner/common/Status';
import { getPlannerPayments } from '../../services/paymentService';
import { LoadingSpinner, EmptyState, ErrorAlert } from '../../components/common/StateFeedback';

export const PlannerPayments = () => {
  const [paymentsList, setPaymentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPayments = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPlannerPayments();
      setPaymentsList(data || []);
    } catch (err) {
      console.error("Error loading planner payments:", err);
      setError("Unable to load payment history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Payments</h1>

      {loading && <LoadingSpinner text="Loading payment transactions..." />}

      {error && !loading && <ErrorAlert message={error} onRetry={fetchPayments} />}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Stat
              icon="💰"
              label="Total Payments Received"
              value={`₹${paymentsList.filter((p) => p.status === 'Paid').reduce((sum, p) => sum + Number(p.amount || 0), 0).toLocaleString('en-IN')}`}
            />
            <Stat icon="💳" label="Transactions Count" value={paymentsList.length} />
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment History</h2>
            {paymentsList.length > 0 ? (
              <div className="space-y-3">
                {paymentsList.map((p) => (
                  <div key={p.paymentId} className="flex flex-wrap justify-between items-center p-3.5 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                    <div>
                      <p className="font-mono font-bold text-gray-900">PAY-{p.paymentId} • {p.bookingNumber}</p>
                      <p className="text-sm font-semibold text-gray-700">{p.clientName || 'Client'}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {p.packageName || 'Booking Payment'} • {p.transactionDate ? new Date(p.transactionDate).toLocaleDateString('en-IN') : new Date(p.createdAt).toLocaleDateString('en-IN')}
                      </p>
                      <p className="text-sm font-bold text-pink-600 mt-1">₹{Number(p.amount || 0).toLocaleString('en-IN')}</p>
                    </div>
                    <Status status={p.status} />
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="No Payments Found" message="No payment transactions recorded yet." />
            )}
          </div>
        </>
      )}
    </DashboardLayout>
  );
};