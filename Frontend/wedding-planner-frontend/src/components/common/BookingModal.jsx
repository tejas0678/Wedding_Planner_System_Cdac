import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiX, FiCalendar, FiTag, FiFileText } from 'react-icons/fi';
import { createBooking } from '../../services/bookingService';
import ImageUpload from './ImageUpload';

function todayISO() {
  const d = new Date();
  const offset = d.getTimezoneOffset();
  return new Date(d.getTime() - offset * 60000).toISOString().split('T')[0];
}

export default function BookingModal({ isOpen, pkg, onClose }) {
  const navigate = useNavigate();
  const [eventDate, setEventDate] = useState('');
  const [notes, setNotes] = useState('');
  const [eventImage, setEventImage] = useState({ imageUrl: '', publicId: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !pkg) return null;

  const pkgTitle = pkg.packageName || pkg.title || pkg.name || 'Wedding Package';
  const plannerName = pkg.plannerName || pkg.vendor || 'Wedding Planner Studio';
  const eventType = pkg.eventType || null;
  const min = todayISO();

  const resetAndClose = () => {
    setEventDate('');
    setNotes('');
    setEventImage({ imageUrl: '', publicId: '' });
    setError('');
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!eventDate) {
      setError('Please select an event date to continue.');
      return;
    }
    if (eventDate < min) {
      setError('Event date cannot be in the past.');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      await createBooking({
        packageId: pkg.id,
        plannerId: pkg.plannerId || 1,
        packageName: pkgTitle,
        amount: pkg.price ?? pkg.amount,
        plannerName,
        guestCount: pkg.capacity || pkg.guestCount || 'As per package',
        eventDate,
        notes: notes || undefined,
        eventImageUrl: eventImage.imageUrl || undefined,
        eventImagePublicId: eventImage.publicId || undefined,
      });
      alert(`Booking Request for "${pkgTitle}" on ${eventDate} submitted successfully! Redirecting to your Client Dashboard...`);
      resetAndClose();
      navigate('/client/dashboard');
    } catch (err) {
      console.error('Booking error:', err);
      setError(err?.message || 'Failed to create booking. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-rose-50/30">
          <div>
            <span className="text-[10px] font-extrabold text-[#EC3664] uppercase tracking-wider block">Book Package</span>
            <h2 className="text-lg font-bold text-gray-900">{pkgTitle}</h2>
          </div>
          <button
            type="button"
            onClick={resetAndClose}
            className="p-2 text-gray-400 hover:text-[#EC3664] hover:bg-rose-50 rounded-full transition cursor-pointer"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-2">
              Event Date <span className="text-[#EC3664]">*</span>
            </label>
            <div className="relative flex items-center">
              <FiCalendar className="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none" />
              <input
                type="date"
                value={eventDate}
                min={min}
                onChange={(e) => { setEventDate(e.target.value); setError(''); }}
                required
                className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl pl-11 pr-4 py-3 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#EC3664] focus:bg-white transition"
              />
            </div>
            <p className="text-[10px] text-gray-400 mt-1.5">Past dates are not allowed.</p>
          </div>

          {eventType && (
            <div>
              <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-2">Event Type</label>
              <div className="relative flex items-center">
                <FiTag className="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  value={eventType}
                  disabled
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl pl-11 pr-4 py-3 text-sm text-gray-500 font-medium cursor-not-allowed"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-2">
              Special Instructions <span className="text-gray-400 normal-case font-normal">(optional)</span>
            </label>
            <div className="relative flex items-start">
              <FiFileText className="w-4 h-4 text-gray-400 absolute left-4 top-3.5 pointer-events-none" />
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                placeholder="Any special requests for your event..."
                className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl pl-11 pr-4 py-3 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#EC3664] focus:bg-white transition resize-none"
              />
            </div>
          </div>

          <div>
            <ImageUpload
              label="Event Image (Optional)"
              folder="wedding-planner/bookings/events"
              value={eventImage}
              onChange={setEventImage}
            />
          </div>

          {error && (
            <div className="bg-rose-50 border border-rose-200 text-[#EC3664] text-xs font-bold p-3 rounded-2xl text-center">
              {error}
            </div>
          )}

          <div className="flex items-center gap-3 pt-1">
            <button
              type="button"
              onClick={resetAndClose}
              className="flex-1 bg-white border border-gray-200 text-gray-600 py-3 rounded-full text-xs font-bold hover:bg-gray-50 transition cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-[#EC3664] hover:bg-[#d42d57] text-white py-3 rounded-full text-xs font-bold shadow-xs hover:shadow-md transition disabled:opacity-50 cursor-pointer"
            >
              {isSubmitting ? 'Booking...' : 'Confirm Booking'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
