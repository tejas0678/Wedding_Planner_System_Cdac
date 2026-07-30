import React, { useEffect, useState } from "react";
import { 
  FiBookmark, 
  FiCalendar, 
  FiClock, 
  FiCheckCircle, 
  FiXCircle, 
  FiDollarSign, 
  FiUser, 
  FiMapPin, 
  FiFilter, 
  FiSearch,
  FiEye,
  FiFileText
} from "react-icons/fi";
import { getBookings } from "../../services/adminService";
import EmptyState from "../../components/admin/EmptyState";

export default function BookingDetails() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    loadBookings();
  }, []);

  const loadBookings = async () => {
    try {
      const data = await getBookings();
      setBookings(data || []);
    } catch (error) {
      console.error("Error loading admin bookings:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch = 
      b.id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.planner?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.package?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.venue?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = 
      statusFilter === "ALL" || 
      b.status?.toUpperCase() === statusFilter.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status?.toUpperCase()) {
      case "CONFIRMED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold">
            <FiCheckCircle className="w-3.5 h-3.5" /> Confirmed
          </span>
        );
      case "PENDING":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
            <FiClock className="w-3.5 h-3.5" /> Pending Review
          </span>
        );
      case "CANCELLED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
            <FiXCircle className="w-3.5 h-3.5" /> Cancelled
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold">
            {status || "Active"}
          </span>
        );
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 font-medium">
        Loading system booking records...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* 1. HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-[#EC3664] text-xs font-extrabold uppercase mb-2">
            <FiBookmark className="w-3.5 h-3.5" /> System Overview
          </div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 tracking-tight">
            Booking Details & Monitoring
          </h1>
          <p className="text-xs text-gray-500 font-light mt-1">
            Track client reservations, assigned wedding planners, package pricing, and payment statuses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border border-rose-100/80 rounded-2xl px-4 py-2.5 shadow-2xs text-center">
            <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider block">
              TOTAL BOOKINGS
            </span>
            <span className="font-serif text-xl font-bold text-[#EC3664]">
              {bookings.length}
            </span>
          </div>
        </div>
      </div>

      {/* 2. SEARCH & FILTER CONTROLS */}
      <div className="bg-white rounded-3xl border border-rose-100/80 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Search Bar */}
        <div className="relative flex-1 w-full">
          <FiSearch className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Booking ID, Planner, Package, or Venue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl pl-11 pr-4 py-3 text-xs text-gray-900 font-medium focus:outline-none focus:border-[#EC3664] focus:bg-white transition"
          />
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5 shrink-0 mr-1">
            <FiFilter className="w-3.5 h-3.5 text-[#EC3664]" /> Status:
          </span>

          {["ALL", "CONFIRMED", "PENDING", "CANCELLED"].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
                statusFilter === status
                  ? "bg-[#EC3664] text-white shadow-xs"
                  : "bg-gray-100 text-gray-600 hover:bg-rose-50 hover:text-[#EC3664]"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* 3. BOOKINGS LIST / CARDS GRID */}
      {filteredBookings.length === 0 ? (
        <div className="bg-white rounded-3xl border border-rose-100/80 p-8 text-center shadow-xs">
          <EmptyState message="No matching booking records found." />
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {filteredBookings.map((b) => (
            <div
              key={b.id}
              className="bg-white rounded-3xl border border-rose-100/80 p-6 shadow-xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-6"
            >
              {/* Left Column: Planner Avatar & Booking Info */}
              <div className="flex items-start gap-4">
                <img
                  src={b.plannerAvatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200"}
                  alt={b.planner}
                  className="w-14 h-14 rounded-2xl object-cover border border-rose-200 shrink-0 shadow-xs"
                />

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-lg">
                      {b.id}
                    </span>
                    {getStatusBadge(b.status)}
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      {b.paymentStatus || "Paid"}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-gray-900 tracking-tight pt-1">
                    {b.package}
                  </h3>

                  <p className="text-xs text-gray-600 font-medium flex items-center gap-1.5">
                    <FiUser className="w-3.5 h-3.5 text-[#EC3664]" />
                    Planner Studio: <span className="font-bold text-gray-900">{b.planner}</span>
                  </p>

                  <p className="text-xs text-gray-500 font-light flex items-center gap-1.5 pt-0.5">
                    <FiMapPin className="w-3.5 h-3.5 text-amber-500" />
                    {b.venue} ({b.location})
                  </p>
                </div>
              </div>

              {/* Right Column: Pricing & Quick Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-extrabold tracking-wider text-gray-400 uppercase block">
                    TOTAL VALUE
                  </span>
                  <span className="font-serif text-2xl font-bold text-[#EC3664]">
                    {b.amount}
                  </span>
                  <span className="text-[11px] text-gray-400 block mt-0.5">
                    {b.guestCount} • {b.stageText || "Scheduled"}
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => setSelectedBooking(b)}
                    className="flex-1 sm:flex-none bg-rose-50 hover:bg-[#EC3664] text-[#EC3664] hover:text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border border-rose-100"
                  >
                    <FiEye className="w-3.5 h-3.5" /> View Summary
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 4. MODAL DIALOG FOR BOOKING SUMMARY */}
      {selectedBooking && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-rose-100 space-y-5 animate-in fade-in zoom-in duration-200">
            
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold text-[#EC3664] uppercase tracking-wider block">
                  BOOKING DETAILS SUMMARY
                </span>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mt-0.5">
                  {selectedBooking.id}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedBooking(null)}
                className="text-gray-400 hover:text-gray-700 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-gray-700">
              <div className="bg-[#FFF9FA] p-4 rounded-2xl border border-rose-100 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Package Name:</span>
                  <span className="font-bold text-gray-900">{selectedBooking.package}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Planner Studio:</span>
                  <span className="font-bold text-gray-900">{selectedBooking.planner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Planner Contact:</span>
                  <span className="font-bold text-gray-900">{selectedBooking.plannerPhone || "Not specified"}</span>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-500">Venue & Location:</span>
                  <span className="font-bold text-gray-900">{selectedBooking.venue}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Guest Count:</span>
                  <span className="font-bold text-gray-900">{selectedBooking.guestCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Total Price:</span>
                  <span className="font-bold text-[#EC3664] text-sm">{selectedBooking.amount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Payment Status:</span>
                  <span className="font-bold text-emerald-600">{selectedBooking.paymentStatus}</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedBooking(null)}
              className="w-full bg-[#EC3664] hover:bg-[#d42d57] text-white py-3 rounded-full font-bold text-xs shadow-md transition cursor-pointer"
            >
              Close Details Window
            </button>

          </div>
        </div>
      )}

    </div>
  );
}
