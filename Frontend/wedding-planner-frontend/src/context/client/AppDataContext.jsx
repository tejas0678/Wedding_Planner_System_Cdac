import { createContext, useContext, useMemo, useState } from 'react'

const AppDataContext = createContext(null)

function buildBookingNotifications(bookings) {
  const statusMessage = {
    Confirmed: (b) => `Your booking with ${b.planner} has been confirmed.`,
    Pending: (b) => `Your booking with ${b.planner} is awaiting confirmation.`,
    Cancelled: (b) => `Your booking with ${b.planner} was cancelled.`,
    Completed: (b) => `Your wedding with ${b.planner} is complete. Congratulations!`,
  }

  return bookings.map((b) => ({
    id: `booking-${b.id}`,
    text: (statusMessage[b.status] || (() => `Booking #${b.id} was updated.`))(b),
    time: b.updatedAt || b.date,
    sortKey: new Date(b.updatedAt || b.date).getTime() || 0,
  }))
}

function buildPaymentNotifications(payments) {
  return payments.map((p) => ({
    id: `payment-${p.id}`,
    text: `Payment of ${p.amount} received for Booking #${p.bookingId}.`,
    time: p.date,
    sortKey: new Date(p.date).getTime() || 0,
  }))
}

export function AppDataProvider({ children }) {
  const [bookings, setBookings] = useState([])
  const [payments, setPayments] = useState([])

  const addBooking = (booking) => {
    setBookings((prev) => [...prev, booking])
  }

  const updateBookingStatus = (id, status) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status, updatedAt: new Date().toISOString() } : b))
    )
  }

  const addPayment = (payment) => {
    setPayments((prev) => [...prev, payment])
  }

  const notifications = useMemo(() => {
    return [...buildBookingNotifications(bookings), ...buildPaymentNotifications(payments)]
      .sort((a, b) => b.sortKey - a.sortKey)
      .slice(0, 10)
  }, [bookings, payments])

  const value = {
    bookings,
    payments,
    addBooking,
    updateBookingStatus,
    addPayment,
    notifications,
  }

  return <AppDataContext.Provider value={value}>{children}</AppDataContext.Provider>
}

export function useAppData() {
  const ctx = useContext(AppDataContext)
  if (!ctx) {
    throw new Error('useAppData must be used within an AppDataProvider')
  }
  return ctx
}
