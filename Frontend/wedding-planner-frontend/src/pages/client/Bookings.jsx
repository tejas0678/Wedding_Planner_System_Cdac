import { useState, useEffect } from 'react'
import BookingCard from '../../components/client/BookingsCard'
import { useAppData } from '../../context/client/AppDataContext'

export default function Bookings() {
  const { bookings } = useAppData()
  const [loading, setLoading] = useState(true)

  // Bookings come from shared AppDataContext (populated once booking creation
  // and/or a real API integration exists). Simulate the initial load only.
  useEffect(() => {
    setLoading(false)
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading bookings...</div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">My Bookings</h2>

      {bookings.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-12 flex items-center justify-center">
          <p className="text-sm text-gray-400">No bookings found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </div>
      )}
    </div>
  )
}