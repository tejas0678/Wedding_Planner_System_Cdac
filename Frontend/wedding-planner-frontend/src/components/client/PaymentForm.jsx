import { useState, useEffect } from 'react'
import { MdCreditCard, MdLock } from 'react-icons/md'

export default function PaymentForm({ onSuccess }) {
  const [form, setForm] = useState({
    wedding: '',
    amount: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  })
  const [weddings, setWeddings] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch user's weddings from API
  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/user/weddings')
        // const data = await response.json()
        // setWeddings(data)
        
        // For now, using empty array
        setWeddings([])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching weddings:', error)
        setLoading(false)
      }
    }

    fetchWeddings()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Replace with actual API call
      // const response = await fetch('/api/payments', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(form)
      // })
      // const data = await response.json()
      
      // Call onSuccess callback
      if (onSuccess) {
        onSuccess(form)
      }
      
      alert('Payment submitted successfully!')
      
      // Reset form
      setForm({
        wedding: '',
        amount: '',
        cardNumber: '',
        expiry: '',
        cvv: '',
      })
    } catch (error) {
      console.error('Error processing payment:', error)
      alert('Payment failed. Please try again.')
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-5">
        <MdCreditCard size={20} className="text-[#EC0B72]" />
        <h2 className="text-lg font-bold text-gray-900">Make Payment</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Wedding */}
        <div>
          <label className="block text-xs font-semibold text-[#EC0B72] mb-1.5">Wedding</label>
          <div className="relative">
            <select
              name="wedding"
              value={form.wedding}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 appearance-none focus:outline-none focus:border-[#EC0B72] focus:ring-1 focus:ring-[#EC0B72]/20 bg-white"
            >
              <option value="">Select wedding</option>
              {loading ? (
                <option value="" disabled>Loading weddings...</option>
              ) : weddings.length === 0 ? (
                <option value="" disabled>No weddings available</option>
              ) : (
                weddings.map((wedding) => (
                  <option key={wedding.id} value={wedding.id}>
                    {wedding.name} - {wedding.date}
                  </option>
                ))
              )}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
          </div>
        </div>

        {/* Amount */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 mb-1.5">Amount</label>
          <input
            type="number"
            name="amount"
            value={form.amount}
            onChange={handleChange}
            placeholder="₹ 0.00"
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#EC0B72] focus:ring-1 focus:ring-[#EC0B72]/20"
          />
        </div>

        {/* Card Number */}
        <div>
          <label className="block text-xs font-semibold text-[#EC0B72] mb-1.5">Card Number</label>
          <input
            type="text"
            name="cardNumber"
            value={form.cardNumber}
            onChange={handleChange}
            placeholder="1111 2222 3333 4444"
            maxLength={19}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#EC0B72] focus:ring-1 focus:ring-[#EC0B72]/20"
          />
        </div>

        {/* Expiry + CVV */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-[#EC0B72] mb-1.5">Expiry</label>
            <input
              type="text"
              name="expiry"
              value={form.expiry}
              onChange={handleChange}
              placeholder="MM/YY"
              maxLength={5}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#EC0B72] focus:ring-1 focus:ring-[#EC0B72]/20"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-[#EC0B72] mb-1.5">CVV</label>
            <input
              type="password"
              name="cvv"
              value={form.cvv}
              onChange={handleChange}
              placeholder="•••"
              maxLength={3}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#EC0B72] focus:ring-1 focus:ring-[#EC0B72]/20"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#EC0B72] text-white font-semibold py-3 rounded-xl hover:bg-[#c9005f] transition-colors duration-200 flex items-center justify-center gap-2 mt-2"
        >
          <MdLock size={16} />
          Make Payment
        </button>
      </form>
    </div>
  )
}