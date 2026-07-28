import React, { useEffect, useState } from "react";
import SearchBar from "../../components/admin/SearchBar";
import StatusBadge from "../../components/admin/StatusBadge";
import EmptyState from "../../components/admin/EmptyState";
import { getClients } from "../../services/adminService";
import { FiUsers, FiSearch, FiFilter } from "react-icons/fi";

export default function ManageClients() {
  const [clients, setClients] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

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
    const name = client.name || "";
    const email = client.email || "";

    const matchesSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === "All" || client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
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
                      {client.name}
                    </td>
                    <td className="px-6 py-4 font-light text-gray-600">
                      {client.email}
                    </td>
                    <td className="px-6 py-4 text-gray-600 font-medium">
                      {client.phone}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-100">
                        {client.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500 font-light">
                      {client.created}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="inline-flex items-center gap-1.5">
                        <button className="bg-rose-50 hover:bg-[#EC3664] hover:text-white text-[#EC3664] px-3 py-1 rounded-full text-[11px] font-bold transition cursor-pointer">
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
  );
}