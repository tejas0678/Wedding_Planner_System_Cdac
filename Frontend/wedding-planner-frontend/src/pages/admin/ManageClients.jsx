import React, { useEffect, useState } from "react";
import SearchBar from "../../components/admin/SearchBar";
import StatusBadge from "../../components/admin/StatusBadge";
import EmptyState from "../../components/admin/EmptyState";
import { getClients, getClientDetails, toggleClientStatus } from "../../services/adminService";
import { FiUsers, FiSearch, FiFilter, FiX, FiMail, FiPhone, FiCalendar, FiMapPin, FiBriefcase, FiCreditCard } from "react-icons/fi";

export default function ManageClients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedClientDetails, setSelectedClientDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const data = await getClients();
      setClients(data || []);
    } catch (error) {
      console.error(error);
      setClients([]);
    }
  };

  const filteredClients = clients.filter((client) => {
    const name = String(client.fullName || client.name || "").toLowerCase();
    const email = String(client.email || "").toLowerCase();
    const searchLower = String(search || "").toLowerCase();

    const matchesSearch =
      name.includes(searchLower) ||
      email.includes(searchLower);

    const matchesStatus =
      statusFilter === "All" || 
      String(client.enabled ? "Active" : "Inactive").toUpperCase() === statusFilter.toUpperCase();

    return matchesSearch && matchesStatus;
  });

  const handleViewDetails = async (clientId) => {
    setLoadingDetails(true);
    setIsModalOpen(true);
    try {
      const details = await getClientDetails(clientId);
      setSelectedClientDetails(details);
    } catch (error) {
      console.error("Failed to load client details:", error);
    } finally {
      setLoadingDetails(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClientDetails(null);
  };

  const handleToggleStatus = async () => {
    if (!selectedClientDetails?.profile) return;
    const clientId = selectedClientDetails.profile.id;
    const nextEnabled = !selectedClientDetails.profile.enabled;

    setUpdatingStatus(true);
    try {
      const updatedUser = await toggleClientStatus(clientId, nextEnabled);
      setSelectedClientDetails((prev) => ({
        ...prev,
        profile: { ...prev.profile, enabled: updatedUser?.enabled ?? nextEnabled },
      }));
      alert(`Client account ${nextEnabled ? "activated" : "deactivated"} successfully.`);
      await loadClients();
    } catch (error) {
      console.error("Failed to update client status:", error);
      alert(error?.message || "Failed to update client status. Please try again.");
    } finally {
      setUpdatingStatus(false);
    }
  };

  return (
    <>
      <div className="space-y-6">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-extrabold tracking-widest text-[#EC3664] uppercase block mb-1">
            CLIENT MANAGEMENT
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900">
            Registered Clients & Couples
          </h1>
          <p className="mt-1 text-xs sm:text-sm text-gray-500 font-light">
            Manage client profiles, booking history, and account activity.
          </p>
        </div>

        <div className="inline-flex items-center gap-2 bg-white border border-rose-100 px-4 py-2 rounded-full text-xs font-bold text-gray-800 shadow-2xs">
          <FiUsers className="w-4 h-4 text-[#EC3664]" />
          <span>Total Clients: {clients.length}</span>
        </div>
      </div>

      {/* SEARCH & FILTER BAR */}
      <div className="bg-white rounded-3xl border border-rose-100/80 p-4 shadow-xs">
        <div className="flex flex-col md:flex-row items-center gap-3">
          <div className="flex-1 w-full flex items-center gap-2 bg-[#FFF9FA] border border-rose-100/60 rounded-2xl px-4 py-2.5">
            <FiSearch className="w-4 h-4 text-[#EC3664]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by client name or email..."
              className="w-full bg-transparent text-xs font-medium text-gray-800 focus:outline-none"
            />
          </div>

          <div className="w-full md:w-48 flex items-center gap-2 bg-[#FFF9FA] border border-rose-100/60 rounded-2xl px-3 py-1.5">
            <FiFilter className="w-4 h-4 text-gray-400" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-transparent text-xs font-bold text-gray-800 focus:outline-none cursor-pointer py-1"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* CLIENTS TABLE CONTAINER */}
      <div className="bg-white rounded-3xl border border-rose-100/80 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-serif text-xl font-bold text-gray-900">
            All Registered Clients
          </h2>
          <span className="text-xs text-gray-400 font-medium">
            Showing {filteredClients.length} clients
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#FFF9FA] border-b border-rose-100/60 text-[10px] font-extrabold text-gray-400 uppercase tracking-wider">
                <th className="px-6 py-3.5">Client ID</th>
                <th className="px-6 py-3.5">Name</th>
                <th className="px-6 py-3.5">Email</th>
                <th className="px-6 py-3.5">Phone</th>
                <th className="px-6 py-3.5">Status</th>
                <th className="px-6 py-3.5">Joined Date</th>
                <th className="px-6 py-3.5 text-center">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 text-xs text-gray-700">
              {filteredClients.length === 0 ? (
                <tr>
                  <td colSpan="7" className="py-12 text-center">
                    <EmptyState message="No clients found matching your search." />
                  </td>
                </tr>
              ) : (
                filteredClients.map((client) => (
                  <tr key={client.id} className="hover:bg-rose-50/40 transition">
                    <td className="px-6 py-4 font-mono font-semibold text-[#EC3664]">
                      {client.id}
                    </td>
                    <td className="px-6 py-4 font-bold text-gray-900">
                      {client.fullName || client.name}
                    </td>
                    <td className="px-6 py-4 font-light text-gray-600">
                      {client.email}
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {client.phone}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${client.enabled ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                        {client.enabled ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-light">
                      {client.createdAt ? new Date(client.createdAt).toLocaleDateString() : "N/A"}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-1.5">
                        <button 
                          onClick={() => handleViewDetails(client.id)}
                          className="bg-rose-50 hover:bg-[#EC3664] hover:text-white text-[#EC3664] px-3 py-1 rounded-full text-[11px] font-bold transition cursor-pointer"
                        >
                          View Details
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>

      {/* CLIENT DETAILS MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-rose-50/30">
              <h2 className="text-xl font-bold font-serif text-gray-900">Client Details</h2>
              <button 
                onClick={closeModal}
                className="p-2 text-gray-400 hover:text-[#EC3664] hover:bg-rose-50 rounded-full transition cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {loadingDetails ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <div className="w-8 h-8 border-4 border-rose-200 border-t-[#EC3664] rounded-full animate-spin mb-4"></div>
                  Loading client profile...
                </div>
              ) : selectedClientDetails ? (
                <div className="space-y-8">
                  
                  {/* Profile Section */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 items-start">
                    {selectedClientDetails.profile?.avatarUrl ? (
                      <img
                        src={selectedClientDetails.profile.avatarUrl}
                        alt={selectedClientDetails.profile?.fullName || "Client"}
                        className="w-20 h-20 rounded-full object-cover shadow-inner border border-rose-100"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center text-[#EC3664] text-2xl font-bold shadow-inner">
                        {selectedClientDetails.profile?.fullName?.charAt(0) || "C"}
                      </div>
                    )}
                    <div className="flex-1 space-y-3">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                          Client ID: #{selectedClientDetails.profile?.id}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-900">
                          {selectedClientDetails.profile?.fullName}
                        </h3>
                        <p className="text-[#EC3664] font-medium text-sm flex items-center gap-1.5 mt-1">
                          <FiMail className="w-4 h-4" /> {selectedClientDetails.profile?.email}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <FiPhone className="w-4 h-4 text-gray-400" /> {selectedClientDetails.profile?.phone || "N/A"}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FiMapPin className="w-4 h-4 text-gray-400" /> {selectedClientDetails.profile?.city || "Address not provided"}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FiCalendar className="w-4 h-4 text-gray-400" /> Joined: {selectedClientDetails.profile?.createdAt ? new Date(selectedClientDetails.profile.createdAt).toLocaleDateString() : "N/A"}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FiBriefcase className="w-4 h-4 text-gray-400" /> Total Bookings: {selectedClientDetails.bookings?.length || 0}
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                           Status:
                           <span className={`px-2 py-0.5 rounded-full text-[10px] border ${selectedClientDetails.profile?.enabled ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-rose-50 text-rose-600 border-rose-100'}`}>
                             {selectedClientDetails.profile?.enabled ? 'Active' : 'Inactive'}
                           </span>
                        </div>
                        <button
                          onClick={handleToggleStatus}
                          disabled={updatingStatus}
                          className={`px-4 py-1.5 rounded-full text-[11px] font-bold transition cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed ${
                            selectedClientDetails.profile?.enabled
                              ? 'bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100'
                              : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-100'
                          }`}
                        >
                          {updatingStatus
                            ? 'Updating...'
                            : selectedClientDetails.profile?.enabled
                              ? 'Deactivate Account'
                              : 'Activate Account'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Bookings Section */}
                  <div>
                    <h4 className="text-lg font-bold font-serif text-gray-900 mb-4 flex items-center gap-2">
                      <FiBriefcase className="w-5 h-5 text-[#EC3664]" /> Bookings & Payments
                    </h4>
                    {selectedClientDetails.bookings?.length > 0 ? (
                      <div className="grid gap-4 md:grid-cols-2">
                        {selectedClientDetails.bookings.map(booking => (
                          <div key={booking.id} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                            <div className="flex justify-between items-start mb-2">
                              <span className="font-mono text-xs font-bold text-[#EC3664]">#{booking.id}</span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-100">
                                {booking.status}
                              </span>
                            </div>
                            <h5 className="font-bold text-gray-800 text-sm mb-1">{booking.packageName}</h5>
                            <p className="text-xs text-gray-500 mb-3">Planner ID: {booking.plannerId}</p>
                            
                            <div className="pt-3 border-t border-gray-200 flex justify-between items-center text-xs">
                              <div className="flex flex-col">
                                <span className="text-gray-400">Total</span>
                                <span className="font-bold text-gray-900">₹{booking.totalAmount}</span>
                              </div>
                              <div className="flex flex-col items-end">
                                <span className="text-gray-400">Paid</span>
                                <span className="font-bold text-emerald-600">₹{booking.paidAmount || 0}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic bg-gray-50 py-4 px-6 rounded-xl border border-gray-100">
                        This client hasn't made any bookings yet.
                      </p>
                    )}
                  </div>

                  {/* Customizations Section */}
                  <div>
                    <h4 className="text-lg font-bold font-serif text-gray-900 mb-4 flex items-center gap-2">
                      <FiCreditCard className="w-5 h-5 text-[#C9972C]" /> Customization Requests
                    </h4>
                    {selectedClientDetails.customizations?.length > 0 ? (
                      <div className="space-y-3">
                        {selectedClientDetails.customizations.map(req => (
                          <div key={req.id} className="bg-orange-50/30 border border-orange-100 rounded-xl p-4 flex flex-col sm:flex-row justify-between sm:items-center gap-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="font-bold text-gray-900 text-sm">{req.originalPackageName || 'Custom Request'}</span>
                                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-50 text-orange-600 border border-orange-100">
                                  {req.status}
                                </span>
                              </div>
                              <p className="text-xs text-gray-600">Requested to Planner ID: {req.plannerId}</p>
                            </div>
                            <div className="text-left sm:text-right">
                              {req.estimatedPrice && (
                                <div className="text-sm font-bold text-gray-900">Quoted: ₹{req.estimatedPrice}</div>
                              )}
                              <div className="text-[10px] text-gray-400">{new Date(req.createdAt).toLocaleDateString()}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic bg-gray-50 py-4 px-6 rounded-xl border border-gray-100">
                        No customization requests found.
                      </p>
                    )}
                  </div>

                </div>
              ) : (
                <div className="py-12 text-center text-gray-500">
                  Failed to load client details.
                </div>
              )}
            </div>
            
            {/* Modal Footer */}
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 text-right">
              <button 
                onClick={closeModal}
                className="bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 px-5 py-2 rounded-full text-sm font-bold transition cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}