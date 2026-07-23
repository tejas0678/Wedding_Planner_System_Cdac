import { useEffect, useState } from "react";
import SearchBar from "../../components/admin/SearchBar";
import StatusBadge from "../../components/admin/StatusBadge";
import EmptyState from "../../components/admin/EmptyState";
import { getClients } from "../../services/adminService";

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
      statusFilter === "All" ||
      client.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= PAGE CONTENT ================= */}
      <div className="px-6 py-6 lg:px-10 lg:py-8">

        {/* ================= PAGE HEADER ================= */}
        <div className="mb-6 pl-2">

          <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
            Manage Clients
          </h1>

          <p className="mt-1 text-sm text-gray-500 lg:text-base">
            View, search and manage all registered clients.
          </p>

        </div>


        {/* ================= SEARCH SECTION ================= */}
        <div className="mb-6 max-w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-3 md:flex-row md:items-center">

            {/* Search Bar */}
            <div className="w-full md:flex-1">

              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search by name or email..."
              />

            </div>


            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="
                h-11
                w-full
                rounded-lg
                border
                border-gray-300
                bg-white
                px-4
                text-sm
                text-gray-700
                outline-none
                transition
                focus:border-rose-400
                focus:ring-2
                focus:ring-rose-100
                md:w-40
              "
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>

          </div>

        </div>


        {/* ================= CLIENTS CONTAINER ================= */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          {/* Container Header */}
          <div className="border-b border-gray-200 px-5 py-4">

            <h2 className="text-lg font-semibold text-gray-800">
              All Clients
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filteredClients.length} client
              {filteredClients.length !== 1 ? "s" : ""} found
            </p>

          </div>


          {/* ================= TABLE ================= */}
          <div className="overflow-x-auto">

            <table className="min-w-full">

              {/* Table Header */}
              <thead className="bg-gray-50">

                <tr>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Client ID
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Name
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Email
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Phone
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Created
                  </th>

                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>

                </tr>

              </thead>


              {/* Table Body */}
              <tbody>

                {filteredClients.length === 0 ? (

                  <tr>

                    <td
                      colSpan="7"
                      className="h-56 text-center"
                    >

                      <EmptyState message="No clients found." />

                    </td>

                  </tr>

                ) : (

                  filteredClients.map((client) => (

                    <tr
                      key={client.id}
                      className="border-t border-gray-100 transition hover:bg-rose-50/30"
                    >

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {client.id}
                      </td>

                      <td className="px-5 py-4 text-sm font-medium text-gray-800">
                        {client.name}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {client.email}
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {client.phone}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge status={client.status} />
                      </td>

                      <td className="px-5 py-4 text-sm text-gray-600">
                        {client.created}
                      </td>

                      <td className="px-5 py-4">

                        <div className="flex justify-center gap-2">

                          <button
                            className="
                              rounded-lg
                              bg-blue-50
                              px-3
                              py-1.5
                              text-xs
                              font-medium
                              text-blue-600
                              transition
                              hover:bg-blue-100
                            "
                          >
                            View
                          </button>

                          <button
                            className="
                              rounded-lg
                              bg-green-50
                              px-3
                              py-1.5
                              text-xs
                              font-medium
                              text-green-600
                              transition
                              hover:bg-green-100
                            "
                          >
                            Edit
                          </button>

                          <button
                            className="
                              rounded-lg
                              bg-red-50
                              px-3
                              py-1.5
                              text-xs
                              font-medium
                              text-red-600
                              transition
                              hover:bg-red-100
                            "
                          >
                            Delete
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

    </div>
  );
}