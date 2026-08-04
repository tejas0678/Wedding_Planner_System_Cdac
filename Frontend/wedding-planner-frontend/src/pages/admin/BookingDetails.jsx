import React, { useEffect, useState } from "react";
import {
  FiBookmark,
  FiCheckCircle,
  FiClock,
  FiXCircle,
  FiUser,
  FiMapPin,
  FiFilter,
  FiSearch,
  FiEye,
} from "react-icons/fi";
import { getBookings, getBookingDetails, updateBookingStatus, deleteBooking } from "../../services/adminService";
import EmptyState from "../../components/admin/EmptyState";
import StatusBadge from "../../components/admin/StatusBadge";

const titleCase = (s) => (s ? s.charAt(0) + s.slice(1).toLowerCase() : s);

const BOOKING_STATUSES = ["PENDING", "CONFIRMED", "REJECTED", "COMPLETED", "CANCELLED"];

export default function BookingDetails() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDetails, setSelectedDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

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
    const searchLower = (searchQuery || "").toLowerCase();

    const bookingId = String(b.bookingNumber || b.id || "").toLowerCase();
    const clientName = String(b.user?.fullName || "").toLowerCase();
    const plannerName = String(b.plannerName || "").toLowerCase();
    const pkgName = String(b.packageName || "").toLowerCase();
    const status = String(b.status || "").toLowerCase();

    const matchesSearch =
      bookingId.includes(searchLower) ||
      clientName.includes(searchLower) ||
      plannerName.includes(searchLower) ||
      pkgName.includes(searchLower) ||
      status.includes(searchLower);

    const matchesStatus = statusFilter === "ALL" || String(b.status || "").toUpperCase() === statusFilter;

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
            <FiClock className="w-3.5 h-3.5" /> Pending
          </span>
        );
      case "CANCELLED":
      case "REJECTED":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold">
            <FiXCircle className="w-3.5 h-3.5" /> {titleCase(status)}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-700 text-xs font-bold">
            {titleCase(status) || "Unknown"}
          </span>
        );
    }
  };

  const openDetails = async (id) => {
    setIsModalOpen(true);
    setLoadingDetails(true);
    try {
      const details = await getBookingDetails(id);
      setSelectedDetails(details);
    } catch (error) {
      console.error("Failed to load booking details:", error);
      setSelectedDetails(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDetails(null);
  };

  const refreshAndSync = async (id) => {
    await loadBookings();
    if (selectedDetails?.booking?.id === id) {
      const details = await getBookingDetails(id);
      setSelectedDetails(details);
    }
  };

  const handleUpdateStatus = async (id, status) => {
    setActionLoading(true);
    try {
      await updateBookingStatus(id, status);
      await refreshAndSync(id);
    } catch (error) {
      alert(error?.message || "Failed to update booking status.");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancel = (id) => handleUpdateStatus(id, "CANCELLED");

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this booking permanently? This cannot be undone.")) return;
    setActionLoading(true);
    try {
      await deleteBooking(id);
      alert("Booking deleted successfully.");
      closeModal();
      await loadBookings();
    } catch (error) {
      alert(error?.message || "Failed to delete booking.");
    } finally {
      setActionLoading(false);
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
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-100 text-[#EC3664] text-xs font-extrabold uppercase mb-2">
            <FiBookmark className="w-3.5 h-3.5" /> System Overview
          </div>
          <h1 className="font-serif text-3xl font-bold text-gray-900 tracking-tight">Booking Details & Monitoring</h1>
          <p className="text-xs text-gray-500 font-light mt-1">
            Track client reservations, assigned wedding planners, package pricing, and payment statuses.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-white border border-rose-100/80 rounded-2xl px-4 py-2.5 shadow-2xs text-center">
            <span className="text-[10px] font-extrabold uppercase text-gray-400 tracking-wider block">TOTAL BOOKINGS</span>
            <span className="font-serif text-xl font-bold text-[#EC3664]">{bookings.length}</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-rose-100/80 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative flex-1 w-full">
          <FiSearch className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by Booking ID, Client, Planner, or Package..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl pl-11 pr-4 py-3 text-xs text-gray-900 font-medium focus:outline-none focus:border-[#EC3664] focus:bg-white transition"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <span className="text-xs font-bold text-gray-500 flex items-center gap-1.5 shrink-0 mr-1">
            <FiFilter className="w-3.5 h-3.5 text-[#EC3664]" /> Status:
          </span>

          {["ALL", "PENDING", "CONFIRMED", "COMPLETED", "CANCELLED", "REJECTED"].map((status) => (
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
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-2xl bg-rose-100 flex items-center justify-center text-[#EC3664] font-bold text-lg shrink-0 shadow-xs">
                  {b.plannerName?.charAt(0) || "P"}
                </div>

                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono text-xs font-bold text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-lg">
                      {b.bookingNumber || `#${b.id}`}
                    </span>
                    {getStatusBadge(b.status)}
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100">
                      {titleCase(b.paymentStatus) || "Pending"}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl font-bold text-gray-900 tracking-tight pt-1">{b.packageName}</h3>

                  <p className="text-xs text-gray-600 font-medium flex items-center gap-1.5">
                    <FiUser className="w-3.5 h-3.5 text-[#EC3664]" />
                    Client: <span className="font-bold text-gray-900">{b.user?.fullName || "N/A"}</span>
                    <span className="text-gray-300">|</span>
                    Planner: <span className="font-bold text-gray-900">{b.plannerName || "N/A"}</span>
                  </p>

                  <p className="text-xs text-gray-500 font-light flex items-center gap-1.5 pt-0.5">
                    <FiMapPin className="w-3.5 h-3.5 text-amber-500" />
                    {b.venueName || "Venue TBD"} • {b.guestCount || "Guest count N/A"} • Event: {b.eventDate || "TBD"}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between lg:justify-end gap-6 pt-4 lg:pt-0 border-t lg:border-t-0 border-gray-100">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-extrabold tracking-wider text-gray-400 uppercase block">TOTAL VALUE</span>
                  <span className="font-serif text-2xl font-bold text-[#EC3664]">
                    ₹{Number(b.totalAmount || 0).toLocaleString()}
                  </span>
                  <span className="text-[11px] text-gray-400 block mt-0.5">
                    Booked: {b.createdAt ? new Date(b.createdAt).toLocaleDateString() : "N/A"}
                  </span>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <button
                    type="button"
                    onClick={() => openDetails(b.id)}
                    className="flex-1 sm:flex-none bg-rose-50 hover:bg-[#EC3664] text-[#EC3664] hover:text-white px-4 py-2.5 rounded-2xl text-xs font-bold transition flex items-center justify-center gap-1.5 cursor-pointer border border-rose-100"
                  >
                    <FiEye className="w-3.5 h-3.5" /> View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* DETAILS MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col shadow-2xl border border-rose-100">
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4 bg-rose-50/30">
              <div>
                <span className="text-[10px] font-extrabold text-[#EC3664] uppercase tracking-wider block">Booking Details</span>
                <h3 className="font-serif text-2xl font-bold text-gray-900 mt-0.5">
                  {selectedDetails?.booking?.bookingNumber || (selectedDetails?.booking ? `#${selectedDetails.booking.id}` : "")}
                </h3>
              </div>
              <button type="button" onClick={closeModal} className="text-gray-400 hover:text-gray-700 text-lg font-bold p-1 cursor-pointer">
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-4 text-xs text-gray-700">
              {loadingDetails ? (
                <div className="flex flex-col items-center justify-center py-16 text-gray-400">
                  <div className="w-8 h-8 border-4 border-rose-200 border-t-[#EC3664] rounded-full animate-spin mb-4"></div>
                  Loading booking details...
                </div>
              ) : selectedDetails?.booking ? (
                <>
                  <div className="bg-[#FFF9FA] p-4 rounded-2xl border border-rose-100 space-y-2">
                    <div className="flex justify-between"><span className="text-gray-500">Status:</span>{getStatusBadge(selectedDetails.booking.status)}</div>
                    <div className="flex justify-between"><span className="text-gray-500">Payment Status:</span><StatusBadge status={titleCase(selectedDetails.booking.paymentStatus)} /></div>
                    <div className="flex justify-between"><span className="text-gray-500">Package:</span><span className="font-bold text-gray-900">{selectedDetails.booking.packageName}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Event Type:</span><span className="font-bold text-gray-900">{selectedDetails.package?.eventType || "N/A"}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Event Date:</span><span className="font-bold text-gray-900">{selectedDetails.booking.eventDate || "TBD"}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Guest Count:</span><span className="font-bold text-gray-900">{selectedDetails.booking.guestCount || "N/A"}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Venue:</span><span className="font-bold text-gray-900">{selectedDetails.booking.venueName || "TBD"}</span></div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
                    <h5 className="font-bold text-gray-800 mb-1">Client</h5>
                    <div className="flex justify-between"><span className="text-gray-500">Name:</span><span className="font-bold text-gray-900">{selectedDetails.client?.fullName || "N/A"}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Email:</span><span className="font-bold text-gray-900">{selectedDetails.client?.email || "N/A"}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Phone:</span><span className="font-bold text-gray-900">{selectedDetails.client?.phone || "N/A"}</span></div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
                    <h5 className="font-bold text-gray-800 mb-1">Planner</h5>
                    <div className="flex justify-between"><span className="text-gray-500">Studio:</span><span className="font-bold text-gray-900">{selectedDetails.planner?.businessName || selectedDetails.booking.plannerName || "N/A"}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Email:</span><span className="font-bold text-gray-900">{selectedDetails.planner?.email || "N/A"}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Phone:</span><span className="font-bold text-gray-900">{selectedDetails.planner?.phone || "N/A"}</span></div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
                    <h5 className="font-bold text-gray-800 mb-1">Payment</h5>
                    <div className="flex justify-between"><span className="text-gray-500">Total Amount:</span><span className="font-bold text-[#EC3664] text-sm">₹{Number(selectedDetails.booking.totalAmount || 0).toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Paid Amount:</span><span className="font-bold text-emerald-600">₹{Number(selectedDetails.booking.paidAmount || 0).toLocaleString()}</span></div>
                  </div>

                  {selectedDetails.customizations?.length > 0 && (
                    <div className="bg-orange-50/30 p-4 rounded-2xl border border-orange-100 space-y-2">
                      <h5 className="font-bold text-gray-800 mb-1">Customizations ({selectedDetails.customizations.length})</h5>
                      {selectedDetails.customizations.map((c) => (
                        <div key={c.id} className="flex justify-between border-t border-orange-100 pt-2 first:border-t-0 first:pt-0">
                          <span className="text-gray-500">{c.status}</span>
                          <span className="font-bold text-gray-900">{c.updatedPrice ? `₹${Number(c.updatedPrice).toLocaleString()}` : "No quote yet"}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {selectedDetails.booking.notes && (
                    <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                      <h5 className="font-bold text-gray-800 mb-1">Notes</h5>
                      <p className="text-gray-600">{selectedDetails.booking.notes}</p>
                    </div>
                  )}

                  <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-1">
                    <h5 className="font-bold text-gray-800 mb-1">Timeline</h5>
                    <div className="flex justify-between"><span className="text-gray-500">Created:</span><span>{selectedDetails.booking.createdAt ? new Date(selectedDetails.booking.createdAt).toLocaleString() : "N/A"}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Last Updated:</span><span>{selectedDetails.booking.updatedAt ? new Date(selectedDetails.booking.updatedAt).toLocaleString() : "N/A"}</span></div>
                  </div>

                  {/* ADMIN ACTIONS */}
                  <div className="bg-white p-4 rounded-2xl border border-gray-200 space-y-3">
                    <h5 className="font-bold text-gray-800">Admin Actions</h5>
                    <div className="flex flex-wrap gap-2">
                      {BOOKING_STATUSES.map((s) => (
                        <button
                          key={s}
                          disabled={actionLoading || selectedDetails.booking.status === s}
                          onClick={() => handleUpdateStatus(selectedDetails.booking.id, s)}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-bold border transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                            selectedDetails.booking.status === s
                              ? "bg-[#EC3664] text-white border-[#EC3664]"
                              : "bg-white text-gray-600 border-gray-200 hover:bg-rose-50 hover:text-[#EC3664]"
                          }`}
                        >
                          {titleCase(s)}
                        </button>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-100">
                      <button
                        disabled={actionLoading}
                        onClick={() => handleCancel(selectedDetails.booking.id)}
                        className="px-4 py-2 rounded-full text-xs font-bold bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-100 transition cursor-pointer disabled:opacity-50"
                      >
                        Cancel Booking
                      </button>
                      <button
                        disabled={actionLoading}
                        onClick={() => handleDelete(selectedDetails.booking.id)}
                        className="px-4 py-2 rounded-full text-xs font-bold bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 transition cursor-pointer disabled:opacity-50"
                      >
                        Delete Booking
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="py-12 text-center text-gray-500">Failed to load booking details.</div>
              )}
            </div>

            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50">
              <button
                type="button"
                onClick={closeModal}
                className="w-full bg-[#EC3664] hover:bg-[#d42d57] text-white py-3 rounded-full font-bold text-xs shadow-md transition cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
