import { useState, useEffect } from 'react'
import PaymentForm from '../../components/client/PaymentForm'
import { MdHistory } from 'react-icons/md'
import { useAppData } from '../../context/client/AppDataContext'

export default function Payments() {
  const { payments, addPayment } = useAppData()
  const [loading, setLoading] = useState(true)

  // Payment history comes from shared AppDataContext (populated as payments
  // succeed and/or a real API integration exists). Simulate the initial load only.
  useEffect(() => {
    setLoading(false)
  }, [])

  const handlePaymentSuccess = (paymentData) => {
    addPayment({
      id: Date.now(),
      bookingId: paymentData.wedding,
      amount: paymentData.amount,
      date: new Date().toISOString(),
    })
  }

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Payments</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Payment Form */}
        <PaymentForm onSuccess={handlePaymentSuccess} />

        {/* Payment History */}
        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <MdHistory size={20} className="text-[#EC0B72]" />
            <h2 className="text-lg font-bold text-gray-900">Payment History</h2>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-sm text-gray-400">Loading payment history...</p>
            </div>
          ) : payments.length === 0 ? (
            <div className="flex items-center justify-center py-12">
              <p className="text-sm text-gray-400">No payment history found.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {payments.map((payment) => (
                <div key={payment.id} className="flex items-center justify-between border-b border-gray-100 pb-3 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Booking #{payment.bookingId}</p>
                    <p className="text-xs text-gray-400">{new Date(payment.date).toLocaleDateString()}</p>
                  </div>
                  <p className="text-sm font-semibold text-[#EC0B72]">₹{payment.amount}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}