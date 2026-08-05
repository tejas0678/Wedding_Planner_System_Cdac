import { useEffect, useState } from "react";
import SearchBar from "../../components/admin/SearchBar";
import StatusBadge from "../../components/admin/StatusBadge";
import EmptyState from "../../components/admin/EmptyState";
import {
  getPlanners,
  getPlannerDetails,
  approvePlanner,
  rejectPlanner,
  toggleUserStatus,
  deleteUser,
} from "../../services/adminService";
import { FiX, FiMail, FiPhone, FiCalendar, FiMapPin, FiBriefcase, FiStar, FiImage, FiDollarSign } from "react-icons/fi";

const titleCase = (s) => (s ? s.charAt(0) + s.slice(1).toLowerCase() : s);

export default function ManagePlanners() {
  const [planners, setPlanners] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [approvalFilter, setApprovalFilter] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPlannerDetails, setSelectedPlannerDetails] = useState(null);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    loadPlanners();
  }, []);

  const loadPlanners = async () => {
    try {
      const data = await getPlanners();
      setPlanners(data || []);
    } catch (error) {
      console.error(error);
      setPlanners([]);
    }
  };

  const filtered = planners.filter((planner) => {
    const name = planner.businessName || planner.fullName || "";
    const email = planner.email || "";

    const matchSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase());

    const accountStatus = planner.enabled ? "Active" : "Inactive";
    const approvalStatus = titleCase(planner.approvalStatus) || "Pending";

    const matchStatus = statusFilter === "All" || accountStatus === statusFilter;
    const matchApproval = approvalFilter === "All" || approvalStatus === approvalFilter;

    return matchSearch && matchStatus && matchApproval;
  });

  const refreshAndSyncModal = async (id) => {
    await loadPlanners();
    if (selectedPlannerDetails?.profile?.id === id) {
      const details = await getPlannerDetails(id);
      setSelectedPlannerDetails(details);
    }
  };

  const handleViewDetails = async (id) => {
    setLoadingDetails(true);
    setIsModalOpen(true);
    try {
      const details = await getPlannerDetails(id);
      setSelectedPlannerDetails(details);
    } catch (error) {
      console.error("Failed to load planner details:", error);
      setSelectedPlannerDetails(null);
    } finally {
      setLoadingDetails(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPlannerDetails(null);
  };

  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      await approvePlanner(id);
      await refreshAndSyncModal(id);
    } catch (error) {
      alert(error?.message || "Failed to approve planner.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    setActionLoading(id);
    try {
      await rejectPlanner(id);
      await refreshAndSyncModal(id);
    } catch (error) {
      alert(error?.message || "Failed to reject planner.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleActive = async (planner) => {
    setActionLoading(planner.id);
    try {
      await toggleUserStatus(planner.id, !planner.enabled);
      await refreshAndSyncModal(planner.id);
    } catch (error) {
      alert(error?.message || "Failed to update account status.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this planner permanently? This cannot be undone.")) return;
    setActionLoading(id);
    try {
      await deleteUser(id);
      alert("Planner deleted successfully.");
      closeModal();
      await loadPlanners();
    } catch (error) {
      alert(error?.message || "Failed to delete planner.");
    } finally {
      setActionLoading(null);
    }
  };

  const totalEarnings = (bookings = []) =>
    bookings
      .filter((b) => b.status === "CONFIRMED" || b.status === "COMPLETED")
      .reduce((sum, b) => sum + (Number(b.totalAmount) || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="px-6 py-6 lg:px-10 lg:py-8">
        <div className="mb-6 pl-2">
          <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">Manage Planners</h1>
          <p className="mt-1 text-sm text-gray-500 lg:text-base">
            Approve, reject and manage all registered planners.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="grid gap-3 md:grid-cols-3">
            <div className="md:col-span-1">
              <SearchBar value={search} onChange={setSearch} placeholder="Search planner by name or email..." />
            </div>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

            <select
              value={approvalFilter}
              onChange={(e) => setApprovalFilter(e.target.value)}
              className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
            >
              <option value="All">All Approval Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="text-lg font-semibold text-gray-800">All Planners</h2>
            <p className="mt-1 text-sm text-gray-500">
              {filtered.length} planner{filtered.length !== 1 ? "s" : ""} found
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">ID</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Name</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Studio Name</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Email</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Phone</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Approval</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Status</th>
                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">Registered</th>
                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="h-56 text-center">
                      <EmptyState message="No planners found." />
                    </td>
                  </tr>
                ) : (
                  filtered.map((planner) => (
                    <tr key={planner.id} className="border-t border-gray-100 transition hover:bg-rose-50/30">
                      <td className="px-5 py-4 text-sm text-gray-600">{planner.id}</td>
                      <td className="px-5 py-4 text-sm font-medium text-gray-800">{planner.fullName}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{planner.businessName || "N/A"}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{planner.email}</td>
                      <td className="px-5 py-4 text-sm text-gray-600">{planner.phone || "N/A"}</td>
                      <td className="px-5 py-4">
                        <StatusBadge status={titleCase(planner.approvalStatus) || "Pending"} />
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={planner.enabled ? "Active" : "Inactive"} />
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-500">
                        {planner.createdAt ? new Date(planner.createdAt).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex justify-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleViewDetails(planner.id)}
                            className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-100 cursor-pointer"
                          >
                            View
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

      {/* PLANNER DETAILS MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-rose-50/30">
              <h2 className="text-xl font-bold text-gray-900">Planner Details</h2>
              <button onClick={closeModal} className="p-2 text-gray-400 hover:text-[#EC3664] hover:bg-rose-50 rounded-full transition cursor-pointer">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              {loadingDetails ? (
                <div className="flex flex-col items-center justify-center py-20 text-gray-400">
                  <div className="w-8 h-8 border-4 border-rose-200 border-t-[#EC3664] rounded-full animate-spin mb-4"></div>
                  Loading planner profile...
                </div>
              ) : selectedPlannerDetails ? (
                <div className="space-y-8">
                  {/* Profile Section */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-6 items-start">
                    {selectedPlannerDetails.profile?.avatarUrl ? (
                      <img
                        src={selectedPlannerDetails.profile.avatarUrl}
                        alt={selectedPlannerDetails.profile?.businessName}
                        className="w-20 h-20 rounded-full object-cover shadow-inner border border-rose-100"
                      />
                    ) : (
                      <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center text-[#EC3664] text-2xl font-bold shadow-inner">
                        {selectedPlannerDetails.profile?.businessName?.charAt(0) || "P"}
                      </div>
                    )}
                    <div className="flex-1 space-y-3">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                          Planner ID: #{selectedPlannerDetails.profile?.id}
                        </span>
                        <h3 className="text-2xl font-bold text-gray-900">{selectedPlannerDetails.profile?.businessName}</h3>
                        <p className="text-sm text-gray-500">{selectedPlannerDetails.profile?.fullName}</p>
                        <p className="text-[#EC3664] font-medium text-sm flex items-center gap-1.5 mt-1">
                          <FiMail className="w-4 h-4" /> {selectedPlannerDetails.profile?.email}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1.5">
                          <FiPhone className="w-4 h-4 text-gray-400" /> {selectedPlannerDetails.profile?.phone || "N/A"}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FiMapPin className="w-4 h-4 text-gray-400" /> {selectedPlannerDetails.profile?.city || "Address not provided"}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FiCalendar className="w-4 h-4 text-gray-400" /> Joined: {selectedPlannerDetails.profile?.createdAt ? new Date(selectedPlannerDetails.profile.createdAt).toLocaleDateString() : "N/A"}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <FiStar className="w-4 h-4 text-amber-500" /> {selectedPlannerDetails.profile?.rating ?? "No rating yet"}
                        </div>
                      </div>
                      <p className="text-xs text-gray-500">
                        Experience: {selectedPlannerDetails.profile?.experience || "N/A"} • Starting Price: {selectedPlannerDetails.profile?.startingPrice || "N/A"}
                      </p>
                      {selectedPlannerDetails.profile?.description && (
                        <p className="text-xs text-gray-600 bg-gray-50 p-3 rounded-xl border border-gray-100">
                          {selectedPlannerDetails.profile.description}
                        </p>
                      )}

                      {/* Approval / Status controls */}
                      <div className="flex flex-wrap items-center gap-3 pt-1">
                        <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                          Approval:
                          <StatusBadge status={titleCase(selectedPlannerDetails.profile?.approvalStatus) || "Pending"} />
                        </div>
                        <button
                          onClick={() => handleApprove(selectedPlannerDetails.profile.id)}
                          disabled={actionLoading === selectedPlannerDetails.profile?.id || selectedPlannerDetails.profile?.approvalStatus === "APPROVED"}
                          className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-100 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleReject(selectedPlannerDetails.profile.id)}
                          disabled={actionLoading === selectedPlannerDetails.profile?.id || selectedPlannerDetails.profile?.approvalStatus === "REJECTED"}
                          className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Reject
                        </button>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                          Account:
                          <StatusBadge status={selectedPlannerDetails.profile?.enabled ? "Active" : "Inactive"} />
                        </div>
                        <button
                          onClick={() => handleToggleActive(selectedPlannerDetails.profile)}
                          disabled={actionLoading === selectedPlannerDetails.profile?.id}
                          className={`px-3 py-1.5 rounded-full text-[11px] font-bold transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
                            selectedPlannerDetails.profile?.enabled
                              ? "bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-100"
                              : "bg-emerald-50 hover:bg-emerald-100 text-emerald-600 border border-emerald-100"
                          }`}
                        >
                          {selectedPlannerDetails.profile?.enabled ? "Deactivate Account" : "Activate Account"}
                        </button>
                        <button
                          onClick={() => handleDelete(selectedPlannerDetails.profile.id)}
                          disabled={actionLoading === selectedPlannerDetails.profile?.id}
                          className="px-3 py-1.5 rounded-full text-[11px] font-bold bg-gray-100 hover:bg-red-100 text-gray-600 hover:text-red-600 border border-gray-200 transition cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Delete Planner
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Stats Row */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-gray-900">{selectedPlannerDetails.totalBookings ?? 0}</div>
                      <div className="text-xs text-gray-500">Total Bookings</div>
                    </div>
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-emerald-600">
                        ₹{totalEarnings(selectedPlannerDetails.bookings).toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500 flex items-center justify-center gap-1"><FiDollarSign className="w-3 h-3" /> Earnings (Confirmed + Completed)</div>
                    </div>
                    <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
                      <div className="text-2xl font-bold text-gray-900">{selectedPlannerDetails.packages?.length ?? 0}</div>
                      <div className="text-xs text-gray-500">Packages Listed</div>
                    </div>
                  </div>

                  {/* Packages */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <FiBriefcase className="w-5 h-5 text-[#EC3664]" /> Packages
                    </h4>
                    {selectedPlannerDetails.packages?.length > 0 ? (
                      <div className="grid gap-4 md:grid-cols-2">
                        {selectedPlannerDetails.packages.map((pkg) => (
                          <div key={pkg.id} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                            <h5 className="font-bold text-gray-800 text-sm mb-1">{pkg.packageName}</h5>
                            <p className="text-xs text-gray-500 mb-2">{pkg.category} • {pkg.eventType}</p>
                            <span className="font-bold text-[#EC3664] text-sm">₹{Number(pkg.price || 0).toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic bg-gray-50 py-4 px-6 rounded-xl border border-gray-100">
                        No packages listed yet.
                      </p>
                    )}
                  </div>

                  {/* Portfolio */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                      <FiImage className="w-5 h-5 text-[#C9972C]" /> Portfolio Images
                    </h4>
                    {selectedPlannerDetails.portfolio?.length > 0 ? (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                        {selectedPlannerDetails.portfolio.map((item) => (
                          <img
                            key={item.id}
                            src={item.imageUrl}
                            alt={item.title || "Portfolio item"}
                            className="w-full h-24 object-cover rounded-xl border border-gray-100"
                          />
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic bg-gray-50 py-4 px-6 rounded-xl border border-gray-100">
                        No portfolio images uploaded yet.
                      </p>
                    )}
                  </div>

                  {/* Bookings */}
                  <div>
                    <h4 className="text-lg font-bold text-gray-900 mb-4">Recent Bookings</h4>
                    {selectedPlannerDetails.bookings?.length > 0 ? (
                      <div className="grid gap-3 md:grid-cols-2">
                        {selectedPlannerDetails.bookings.map((b) => (
                          <div key={b.id} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                            <div className="flex justify-between items-center mb-1">
                              <span className="font-mono text-xs font-bold text-[#EC3664]">{b.bookingNumber}</span>
                              <StatusBadge status={titleCase(b.status)} />
                            </div>
                            <p className="text-sm font-bold text-gray-800">{b.packageName}</p>
                            <p className="text-xs text-gray-500">Client: {b.user?.fullName || "N/A"}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic bg-gray-50 py-4 px-6 rounded-xl border border-gray-100">
                        No bookings yet.
                      </p>
                    )}
                  </div>

                  <p className="text-[11px] text-gray-400 italic">
                    Verification documents are not part of the current planner profile data model.
                  </p>
                </div>
              ) : (
                <div className="py-12 text-center text-gray-500">Failed to load planner details.</div>
              )}
            </div>

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
    </div>
  );
}
