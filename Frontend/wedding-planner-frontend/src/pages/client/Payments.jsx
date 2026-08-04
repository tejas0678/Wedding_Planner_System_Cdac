import { useState, useEffect } from 'react';
import PaymentForm from '../../components/client/PaymentForm';
import { MdHistory } from 'react-icons/md';
import { getClientPayments } from '../../services/paymentService';
import { LoadingSpinner, EmptyState, ErrorAlert } from '../../components/common/StateFeedback';

export default function Payments() {
  const [paymentsList, setPaymentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPaymentHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getClientPayments();
      setPaymentsList(data || []);
    } catch (err) {
      console.error("Error loading payment history:", err);
      setError("Unable to load payment history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentHistory();
  }, []);

  // Real payments only happen via the Razorpay "Pay Now" button on My Bookings; this form
  // is a placeholder that doesn't call any API, so its "success" must not fabricate a row
  // in what is otherwise a real, gateway-verified payment history.
  const handlePaymentSuccess = () => {
    alert('To make a payment, use the "Pay Now" button on the relevant booking under My Bookings.');
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-6">Payments</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Payment Form */}
        <PaymentForm onSuccess={handlePaymentSuccess} />

        {/* Payment History */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <MdHistory size={20} className="text-[#EC0B72]" />
            <h2 className="text-lg font-bold text-gray-900">Payment History</h2>
          </div>

          {loading && <LoadingSpinner text="Loading payment transactions..." />}

          {error && !loading && <ErrorAlert message={error} onRetry={fetchPaymentHistory} />}

          {!loading && !error && paymentsList.length === 0 && (
            <EmptyState title="No Payments Found" message="You have no transaction records on file." />
          )}

          {!loading && !error && paymentsList.length > 0 && (
            <div className="space-y-4">
              {paymentsList.map((payment) => (
                <div key={payment.paymentId} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      PAY-{payment.paymentId} • {payment.bookingNumber || `Booking #${payment.bookingId}`}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {payment.packageName || 'Booking Payment'} • {payment.transactionDate ? new Date(payment.transactionDate).toLocaleDateString('en-IN') : new Date(payment.createdAt).toLocaleDateString('en-IN')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#EC0B72]">₹{Number(payment.amount || 0).toLocaleString('en-IN')}</p>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${payment.status === 'Paid' ? 'text-emerald-600 bg-emerald-50' : payment.status === 'Failed' ? 'text-rose-600 bg-rose-50' : 'text-amber-600 bg-amber-50'}`}>
                      {payment.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}