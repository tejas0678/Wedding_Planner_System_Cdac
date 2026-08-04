import { useState, useEffect } from 'react';
import { getBookingHistory, removeBooking } from '../../services/bookingService';
import { SkeletonCard, EmptyState, ErrorAlert } from '../../components/common/StateFeedback';
import { FiTrash2 } from 'react-icons/fi';

export default function Bookings() {
  const [bookingList, setBookingList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [removingId, setRemovingId] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getBookingHistory();
      setBookingList(data || []);
    } catch (err) {
      console.error("Error loading booking history:", err);
      setError("Unable to load booking history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleRemove = async (bookingId, packageName) => {
    if (!window.confirm(`Are you sure you want to remove the pending booking for "${packageName}"?`)) {
      return;
    }

    try {
      setRemovingId(bookingId);
      await removeBooking(bookingId);
      setBookingList((prev) => prev.filter((b) => b.id !== bookingId && b.bookingId !== bookingId));
    } catch (err) {
      console.error("Error removing booking:", err);
      alert("Failed to remove booking request. Please try again.");
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-6">
        Booking History
      </h2>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {error && !loading && <ErrorAlert message={error} onRetry={fetchBookings} />}

      {!loading && !error && bookingList.length === 0 && (
        <EmptyState title="No Bookings Found" message="You have no active or pending wedding bookings." />
      )}

      {!loading && !error && bookingList.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {bookingList.map((b) => {
            const bId = b.id || b.bookingNumber;
            const rawStatus = (b.bookingStatus || b.status || 'PENDING').toUpperCase();
            const isPending = rawStatus === 'PENDING';

            let statusBadge = {
              label: '🟡 Pending Approval',
              style: 'bg-amber-100 text-amber-800 border border-amber-200'
            };

            if (rawStatus === 'CONFIRMED' || rawStatus === 'ACCEPTED') {
              statusBadge = {
                label: '🟢 Confirmed',
                style: 'bg-emerald-100 text-emerald-800 border border-emerald-200'
              };
            } else if (rawStatus === 'REJECTED') {
              statusBadge = {
                label: '🔴 Rejected',
                style: 'bg-rose-100 text-rose-800 border border-rose-200'
              };
            } else if (rawStatus === 'COMPLETED') {
              statusBadge = {
                label: '🔵 Completed',
                style: 'bg-blue-100 text-blue-800 border border-blue-200'
              };
            }

            return (
              <div key={bId} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm space-y-4 flex flex-col justify-between hover:shadow-md transition">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#EC3664] bg-rose-50 px-3 py-1 rounded-full uppercase">
                      {b.bookingId || b.id}
                    </span>
                    <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${statusBadge.style}`}>
                      {statusBadge.label}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif text-lg font-bold text-gray-900">{b.packageName || b.package}</h3>
                    <p className="text-xs text-gray-500 mt-1">{b.plannerName || b.planner}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{b.venue || b.location}</p>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-gray-900 block">{b.amount}</span>
                    <span className="text-[10px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full inline-block mt-1">
                      {b.paymentStatus || 'Pending'}
                    </span>
                  </div>

                  {isPending && (
                    <button
                      onClick={() => handleRemove(bId, b.packageName || b.package)}
                      disabled={removingId === bId}
                      className="bg-rose-50 hover:bg-rose-100 text-rose-600 px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                    >
                      <FiTrash2 className="w-3.5 h-3.5" />
                      <span>{removingId === bId ? 'Removing...' : 'Remove'}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}