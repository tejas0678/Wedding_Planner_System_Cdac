import { useState, useEffect } from 'react';
import PaymentForm from '../../components/client/PaymentForm';
import { MdHistory } from 'react-icons/md';
import { getPayments } from '../../services/paymentService';
import { LoadingSpinner, EmptyState, ErrorAlert } from '../../components/common/StateFeedback';

export default function Payments() {
  const [paymentsList, setPaymentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPaymentHistory = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPayments();
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

  const handlePaymentSuccess = (paymentData) => {
    setPaymentsList((prev) => [
      {
        id: Date.now(),
        paymentNumber: `PAY-${Math.floor(1000 + Math.random() * 9000)}`,
        bookingNumber: paymentData.wedding || "WPB-882910",
        amount: `₹${paymentData.amount}`,
        type: "Online Payment",
        paymentDate: new Date().toLocaleDateString(),
        status: "Successful"
      },
      ...prev,
    ]);
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
                <div key={payment.id || payment.paymentNumber} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      {payment.paymentNumber || `PAY-${payment.id}`} • {payment.bookingNumber || `Booking #${payment.bookingId}`}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{payment.type || "30% Advance"} • {payment.paymentDate || "2026-07-28"}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#EC0B72]">{payment.amount}</p>
                    <span className="text-[10px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      {payment.status || "Successful"}
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