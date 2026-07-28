import React, { useState } from 'react';
import { 
  FiCalendar, 
  FiChevronUp, 
  FiChevronDown, 
  FiFileText 
} from 'react-icons/fi';

export default function BookingCard({ 
  booking = {},
  onCustomizePackage,
  onContactPlanner,
  onViewInvoice,
  onPayAdvance
}) {
  const [expanded, setExpanded] = useState(true);

  const {
    id = 'WPB-882910',
    planner = 'Royal Touch Weddings Studio',
    plannerPhone = '+91 98765 11111',
    package: pkgName = 'Royal Heritage Destination Package',
    status = 'Confirmed',
    amount = '₹7,65,600',
    plannerAvatar = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200',
    venue = 'The Leela Palace Resort',
    location = 'Lake Pichola, Udaipur, Rajasthan • Udaipur',
    guestCount = '500 Guests',
    countdownDays = 114,
    paymentStatus = 'Partially Paid',
  } = booking;

  return (
    <div className="bg-white rounded-3xl border border-rose-100/80 overflow-hidden shadow-xs mb-8">
      {/* BOOKING MAIN INFO ROW */}
      <div className="p-6 sm:p-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          
          {/* Left Planner Info */}
          <div className="flex items-center gap-4">
            <img
              src={plannerAvatar}
              alt={planner}
              className="w-14 h-14 rounded-full object-cover border-2 border-rose-200 shadow-xs shrink-0"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-rose-50 text-[#EC3664] text-[10px] font-extrabold px-2.5 py-0.5 rounded-full border border-rose-100 uppercase">
                  {id}
                </span>
                <span className="bg-emerald-100/80 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                  {status}
                </span>
              </div>

              <h3 className="font-serif text-2xl font-bold text-gray-900">
                {pkgName}
              </h3>

              <p className="text-xs text-gray-500 mt-1 font-light">
                Planner: <span className="font-semibold text-gray-700">{planner}</span> • {plannerPhone}
              </p>
            </div>
          </div>

          {/* Right Price & Collapse Toggle */}
          <div className="flex items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
            <div className="text-left lg:text-right">
              <span className="text-[10px] font-bold tracking-wider text-gray-400 uppercase block">
                TOTAL BOOKING AMOUNT
              </span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-[#EC3664]">
                {amount}
              </span>
            </div>

            <button
              onClick={() => setExpanded(!expanded)}
              className="bg-[#FFF0F3] hover:bg-[#FCE7F0] text-[#EC3664] px-5 py-2.5 rounded-full text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shrink-0"
            >
              <span>{expanded ? 'Collapse Details' : 'Expand Details'}</span>
              {expanded ? <FiChevronUp className="w-4 h-4" /> : <FiChevronDown className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* 3. COLLAPSIBLE SHOWCASE & PAYMENT SECTION */}
        {expanded && (
          <div className="mt-8 space-y-6">
            
            {/* Dark Burgundy Showcase Card */}
            <div className="bg-[#4E0A1A] rounded-3xl p-6 sm:p-8 text-white shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
              
              <div>
                <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#E2B13C]/20 border border-[#E2B13C]/40 text-[#E2B13C] text-[11px] font-bold tracking-wider uppercase mb-3">
                  <FiCalendar className="w-3.5 h-3.5" />
                  <span>UPCOMING WEDDING EVENT SHOWCASE</span>
                </div>

                <h4 className="font-serif text-3xl font-bold text-white mb-2">
                  {venue}
                </h4>

                <p className="text-rose-100/80 text-xs sm:text-sm font-light">
                  {location} • Guest Count: <span className="font-semibold text-white">{guestCount}</span>
                </p>
              </div>

              {/* Countdown Card */}
              <div className="bg-white/10 border border-white/15 rounded-2xl p-5 text-center min-w-[200px] shrink-0">
                <span className="text-[10px] font-extrabold tracking-widest text-amber-300 uppercase block mb-1">
                  EVENT COUNTDOWN
                </span>
                <span className="font-serif text-4xl sm:text-5xl font-bold text-[#E2B13C]">
                  {countdownDays}
                </span>
                <span className="text-xs text-rose-100/90 font-medium block mt-1">
                  Days Left To Celebration
                </span>
              </div>

            </div>

            {/* Payment Summary & Razorpay Gateway Box */}
            <div className="bg-[#FFF8F9] border border-rose-100/80 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3">
                  <h4 className="font-serif text-xl font-bold text-gray-900">
                    Payment Summary & Razorpay Gateway
                  </h4>
                  <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                    {paymentStatus}
                  </span>
                </div>
              </div>

              <button 
                onClick={() => onPayAdvance && onPayAdvance(booking)}
                className="w-full sm:w-auto bg-[#EC3664] hover:bg-[#d42d57] text-white px-7 py-3 rounded-full font-bold text-xs shadow-md transition cursor-pointer"
              >
                Pay Advance 30% (Razorpay)
              </button>
            </div>

            {/* Bottom Actions Row */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button 
                onClick={() => onViewInvoice && onViewInvoice(booking)}
                className="bg-[#EC3664] hover:bg-[#d42d57] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-xs transition flex items-center gap-2 cursor-pointer"
              >
                <FiFileText className="w-4 h-4" />
                <span>View Tax Invoice</span>
              </button>

              <button 
                onClick={() => onCustomizePackage && onCustomizePackage(booking)}
                className="bg-[#FFF0F3] hover:bg-[#FCE7F0] text-[#EC3664] px-6 py-2.5 rounded-full text-xs font-bold transition cursor-pointer"
              >
                Customize Package
              </button>

              <button 
                onClick={() => onContactPlanner && onContactPlanner(booking)}
                className="bg-[#FFF0F3] hover:bg-[#FCE7F0] text-[#EC3664] px-6 py-2.5 rounded-full text-xs font-bold transition cursor-pointer"
              >
                Contact Planner
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
