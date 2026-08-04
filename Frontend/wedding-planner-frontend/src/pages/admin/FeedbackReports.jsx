import { useEffect, useState } from "react";
import SearchBar from "../../components/admin/SearchBar";
import EmptyState from "../../components/admin/EmptyState";
import { getFeedbacks, getFeedbackSummary, deleteFeedback } from "../../services/adminService";
import { FiX, FiTrash2 } from "react-icons/fi";

export default function FeedbackReports() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("latest");
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const [summary, setSummary] = useState({
    averageRating: 0,
    totalFeedback: 0,
    fiveStar: 0,
    fourStar: 0,
    threeStar: 0,
    twoStar: 0,
    oneStar: 0,
  });

  useEffect(() => {
    loadFeedbacks();
    loadSummary();
  }, [ratingFilter, sortOrder]);

  const loadFeedbacks = async () => {
    setLoading(true);
    try {
      const data = await getFeedbacks({ rating: ratingFilter !== "All" ? ratingFilter : undefined, sort: sortOrder });
      setFeedbacks(data || []);
    } catch (error) {
      console.error(error);
      setFeedbacks([]);
    } finally {
      setLoading(false);
    }
  };

  const loadSummary = async () => {
    try {
      const data = await getFeedbackSummary();
      if (data) setSummary(data);
    } catch (error) {
      console.error("Error loading feedback summary:", error);
    }
  };

  const filteredFeedbacks = feedbacks.filter((item) => {
    const searchLower = search.toLowerCase();
    return (
      !search ||
      item.clientName?.toLowerCase().includes(searchLower) ||
      item.plannerName?.toLowerCase().includes(searchLower)
    );
  });

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this feedback permanently?")) return;
    setDeletingId(id);
    try {
      await deleteFeedback(id);
      alert("Feedback deleted successfully.");
      setSelectedFeedback(null);
      await Promise.all([loadFeedbacks(), loadSummary()]);
    } catch (error) {
      alert(error?.message || "Failed to delete feedback.");
    } finally {
      setDeletingId(null);
    }
  };

  const starBreakdown = [
    { stars: 5, count: summary.fiveStar },
    { stars: 4, count: summary.fourStar },
    { stars: 3, count: summary.threeStar },
    { stars: 2, count: summary.twoStar },
    { stars: 1, count: summary.oneStar },
  ];

  return (
    <div className="min-h-screen space-y-7 bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="pl-2">
        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">Feedback & Reports</h1>
        <p className="mt-2 text-sm text-gray-500 sm:text-base">View customer reviews and planner ratings.</p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid gap-5 pl-2 pr-2 md:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Average Rating</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-800">{summary.averageRating}</h2>
              <p className="mt-1 text-sm text-gray-500">Out of 5.0</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-yellow-50 text-xl">⭐</div>
          </div>
        </div>

        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Reviews</p>
              <h2 className="mt-2 text-3xl font-bold text-gray-800">{summary.totalFeedback}</h2>
              <p className="mt-1 text-sm text-gray-500">Customer feedback received</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-xl">💬</div>
          </div>
        </div>
      </div>

      {/* STAR BREAKDOWN */}
      <div className="mx-2 max-w-7xl rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <p className="text-sm font-semibold text-gray-700 mb-3">Rating Breakdown</p>
        <div className="grid grid-cols-5 gap-3">
          {starBreakdown.map(({ stars, count }) => (
            <div key={stars} className="text-center rounded-lg bg-gray-50 border border-gray-100 py-3">
              <div className="text-xs font-bold text-amber-600">{stars} ⭐</div>
              <div className="text-lg font-bold text-gray-800">{count}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SEARCH & FILTER */}
      <div className="mx-2 max-w-7xl rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <div className="w-full md:flex-1">
            <SearchBar value={search} onChange={setSearch} placeholder="Search client or planner..." />
          </div>

          <div className="w-full md:w-48">
            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
              className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
            >
              <option value="All">All Ratings</option>
              <option value="5">5 Star</option>
              <option value="4">4 Star</option>
              <option value="3">3 Star</option>
              <option value="2">2 Star</option>
              <option value="1">1 Star</option>
            </select>
          </div>

          <div className="w-full md:w-48">
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
              className="h-11 w-full rounded-lg border border-gray-300 bg-white px-4 text-sm text-gray-700 outline-none transition focus:border-rose-400 focus:ring-2 focus:ring-rose-100"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* FEEDBACK LIST */}
      <div className="mx-2 max-w-7xl space-y-4">
        {loading ? (
          <div className="rounded-xl border border-gray-200 bg-white p-8 text-center text-gray-400 shadow-sm">
            Loading feedback...
          </div>
        ) : filteredFeedbacks.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <EmptyState message="No feedback available." />
          </div>
        ) : (
          filteredFeedbacks.map((feedback) => (
            <div key={feedback.id} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{feedback.clientName}</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Planner: <span className="font-medium text-gray-700">{feedback.plannerName}</span>
                    {feedback.bookingId ? <span className="text-gray-400"> • Booking #{feedback.bookingId}</span> : null}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center rounded-lg bg-yellow-50 px-3 py-2 text-sm font-semibold text-yellow-600">
                    ⭐ {feedback.rating} / 5
                  </span>
                  <button
                    type="button"
                    onClick={() => setSelectedFeedback(feedback)}
                    className="rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-600 transition hover:bg-blue-100 cursor-pointer"
                  >
                    View
                  </button>
                  <button
                    type="button"
                    disabled={deletingId === feedback.id}
                    onClick={() => handleDelete(feedback.id)}
                    className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-100 cursor-pointer disabled:opacity-50 flex items-center gap-1"
                  >
                    <FiTrash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>

              <div className="mt-5 rounded-lg bg-gray-50 p-4">
                <p className="text-sm leading-6 text-gray-700">{feedback.comment}</p>
              </div>

              <div className="mt-4">
                <p className="text-xs text-gray-400">Submitted on {feedback.date}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* DETAILS MODAL */}
      {selectedFeedback && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-rose-100 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <h3 className="text-xl font-bold text-gray-900">Feedback Details</h3>
              <button type="button" onClick={() => setSelectedFeedback(null)} className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-gray-700">
              <div className="bg-[#FFF9FA] p-4 rounded-2xl border border-rose-100 space-y-2">
                <div className="flex justify-between"><span className="text-gray-500">Feedback ID:</span><span className="font-bold text-gray-900">#{selectedFeedback.id}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Booking ID:</span><span className="font-bold text-gray-900">#{selectedFeedback.bookingId || "N/A"}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Client:</span><span className="font-bold text-gray-900">{selectedFeedback.clientName}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Planner:</span><span className="font-bold text-gray-900">{selectedFeedback.plannerName}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Rating:</span><span className="font-bold text-amber-600">⭐ {selectedFeedback.rating} / 5</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Submitted:</span><span className="font-bold text-gray-900">{selectedFeedback.date}</span></div>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <p className="text-gray-500 mb-1">Review</p>
                <p className="text-gray-800">{selectedFeedback.comment}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleDelete(selectedFeedback.id)}
                disabled={deletingId === selectedFeedback.id}
                className="flex-1 bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-full font-bold text-xs transition cursor-pointer disabled:opacity-50"
              >
                Delete Feedback
              </button>
              <button
                type="button"
                onClick={() => setSelectedFeedback(null)}
                className="flex-1 bg-[#EC3664] hover:bg-[#d42d57] text-white py-3 rounded-full font-bold text-xs shadow-md transition cursor-pointer"
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
