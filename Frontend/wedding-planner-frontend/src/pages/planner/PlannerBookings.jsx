import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { Status } from './../../components/planner/common/Status';
import { getPlannerBookings, updateBookingStatus } from '../../services/plannerService';
import { LoadingSpinner, EmptyState, ErrorAlert } from '../../components/common/StateFeedback';

export const PlannerBookings = () => {
  const [bookingsList, setBookingsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPlannerBookings();
      setBookingsList(data || []);
    } catch (err) {
      console.error("Error loading planner bookings:", err);
      setError("Unable to load booking requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const act = async (id, status) => {
    try {
      await updateBookingStatus(id, status);
      setBookingsList((prev) =>
        prev.map((w) => ((w.id === id || w.bookingNumber === id) ? { ...w, status } : w))
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Wedding Bookings</h1>

      {loading && <LoadingSpinner text="Loading planner bookings..." />}

      {error && !loading && <ErrorAlert message={error} onRetry={fetchBookings} />}

      {!loading && !error && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          {bookingsList.length > 0 ? (
            <div className="space-y-4">
              {bookingsList.map((w) => (
                <div key={w.id || w.bookingNumber} className="flex flex-wrap justify-between items-center p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                  <div>
                    <p className="font-mono font-bold text-gray-900">{w.bookingNumber || w.id}</p>
                    <p className="text-sm font-semibold text-gray-800">{w.clientName || 'Couple Request'}</p>
                    <p className="text-xs text-gray-500 mt-1">{w.packageName || w.package} • {w.weddingDate || '2026-11-20'} • {w.venue || 'Resort Venue'}</p>
                    <p className="text-xs text-pink-600 font-bold mt-1">{w.amount}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-3 sm:mt-0">
                    <Status status={w.status || 'CONFIRMED'} />
                    {w.status === 'PENDING' && (
                      <>
                        <button onClick={() => act(w.id || w.bookingNumber, 'ACCEPTED')} className="px-4 py-1.5 bg-green-600 text-white text-xs font-bold rounded-lg hover:bg-green-700 transition flex items-center gap-1 cursor-pointer">
                          <span>✔️</span> Accept
                        </button>
                        <button onClick={() => act(w.id || w.bookingNumber, 'REJECTED')} className="px-4 py-1.5 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition flex items-center gap-1 cursor-pointer">
                          <span>❌</span> Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState title="No Booking Requests" message="You don't have any booking requests at the moment." />
          )}
        </div>
      )}
    </DashboardLayout>
  );
};
