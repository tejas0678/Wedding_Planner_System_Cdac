import { useEffect, useState } from "react";
import SearchBar from "../../components/admin/SearchBar";
import StatusBadge from "../../components/admin/StatusBadge";
import EmptyState from "../../components/admin/EmptyState";
import { getPlanners } from "../../services/adminService";

export default function ManagePlanners() {
  const [planners, setPlanners] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [approvalFilter, setApprovalFilter] = useState("All");

  // ================= LOAD PLANNERS =================
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

  // ================= FILTER PLANNERS =================
  const filtered = planners.filter((planner) => {
    const name = planner.name || "";
    const email = planner.email || "";

    const matchSearch =
      name.toLowerCase().includes(search.toLowerCase()) ||
      email.toLowerCase().includes(search.toLowerCase());

    const matchStatus =
      statusFilter === "All" ||
      planner.status === statusFilter;

    const matchApproval =
      approvalFilter === "All" ||
      planner.approvalStatus === approvalFilter;

    return (
      matchSearch &&
      matchStatus &&
      matchApproval
    );
  });

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= PAGE CONTENT ================= */}
      <div className="px-6 py-6 lg:px-10 lg:py-8">

        {/* ================= PAGE HEADER ================= */}
        <div className="mb-6 pl-2">

          <h1 className="text-2xl font-bold text-gray-900 lg:text-3xl">
            Manage Planners
          </h1>

          <p className="mt-1 text-sm text-gray-500 lg:text-base">
            Approve, reject and manage all registered planners.
          </p>

        </div>


        {/* ================= SEARCH & FILTER SECTION ================= */}
        <div className="mb-6 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

          <div className="grid gap-3 md:grid-cols-3">

            {/* Search */}
            <div className="md:col-span-1">

              <SearchBar
                value={search}
                onChange={setSearch}
                placeholder="Search planner by name or email..."
              />

            </div>


            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
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
              "
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>


            {/* Approval Filter */}
            <select
              value={approvalFilter}
              onChange={(e) =>
                setApprovalFilter(e.target.value)
              }
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
              "
            >
              <option value="All">All Approval Status</option>
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="Rejected">Rejected</option>
            </select>

          </div>

        </div>


        {/* ================= PLANNERS CONTAINER ================= */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          {/* Container Header */}
          <div className="border-b border-gray-200 px-5 py-4">

            <h2 className="text-lg font-semibold text-gray-800">
              All Planners
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {filtered.length} planner
              {filtered.length !== 1 ? "s" : ""} found
            </p>

          </div>


          {/* ================= TABLE ================= */}
          <div className="overflow-x-auto">

            <table className="min-w-full">

              {/* ================= TABLE HEADER ================= */}
              <thead className="bg-gray-50">

                <tr>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    ID
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Planner
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Email
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Experience
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Specialization
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Rating
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Status
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Approval
                  </th>

                  <th className="px-5 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500">
                    Actions
                  </th>

                </tr>

              </thead>


              {/* ================= TABLE BODY ================= */}
              <tbody>

                {filtered.length === 0 ? (

                  <tr>

                    <td
                      colSpan="9"
                      className="h-56 text-center"
                    >

                      <EmptyState message="No planners found." />

                    </td>

                  </tr>

                ) : (

                  filtered.map((planner) => (

                    <tr
                      key={planner.id}
                      className="
                        border-t
                        border-gray-100
                        transition
                        hover:bg-rose-50/30
                      "
                    >

                      {/* ID */}
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {planner.id}
                      </td>


                      {/* Planner Name */}
                      <td className="px-5 py-4 text-sm font-medium text-gray-800">
                        {planner.name}
                      </td>


                      {/* Email */}
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {planner.email}
                      </td>


                      {/* Experience */}
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {planner.experience}
                      </td>


                      {/* Specialization */}
                      <td className="px-5 py-4 text-sm text-gray-600">
                        {planner.specialization}
                      </td>


                      {/* Rating */}
                      <td className="px-5 py-4 text-sm font-medium text-gray-700">
                        ⭐ {planner.rating}
                      </td>


                      {/* Status */}
                      <td className="px-5 py-4">
                        <StatusBadge
                          status={planner.status}
                        />
                      </td>


                      {/* Approval */}
                      <td className="px-5 py-4">
                        <StatusBadge
                          status={planner.approvalStatus}
                        />
                      </td>


                      {/* Actions */}
                      <td className="px-5 py-4">

                        <div className="flex justify-center gap-2">

                          {/* View */}
                          <button
                            type="button"
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


                          {/* Edit */}
                          <button
                            type="button"
                            className="
                              rounded-lg
                              bg-yellow-50
                              px-3
                              py-1.5
                              text-xs
                              font-medium
                              text-yellow-600
                              transition
                              hover:bg-yellow-100
                            "
                          >
                            Edit
                          </button>


                          {/* Approve */}
                          <button
                            type="button"
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
                            Approve
                          </button>


                          {/* Reject */}
                          <button
                            type="button"
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
                            Reject
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