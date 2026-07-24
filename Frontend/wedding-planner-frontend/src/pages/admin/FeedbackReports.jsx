import { useEffect, useState } from "react";
import SearchBar from "../../components/admin/SearchBar";
import EmptyState from "../../components/admin/EmptyState";
import { getFeedbacks } from "../../services/adminService";

export default function FeedbackReports() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [search, setSearch] = useState("");
  const [ratingFilter, setRatingFilter] = useState("All");

  const [summary, setSummary] = useState({
    averageRating: 0,
    totalReviews: 0,
  });

  // ================= LOAD FEEDBACKS =================
  useEffect(() => {
    loadFeedbacks();
  }, []);

  const loadFeedbacks = async () => {
    try {
      const data = await getFeedbacks();

      const feedbackData = data || [];

      setFeedbacks(feedbackData);

      // Calculate average rating and total reviews
      if (feedbackData.length > 0) {
        const total = feedbackData.reduce(
          (sum, item) => sum + Number(item.rating || 0),
          0
        );

        setSummary({
          averageRating: (total / feedbackData.length).toFixed(1),
          totalReviews: feedbackData.length,
        });
      } else {
        setSummary({
          averageRating: 0,
          totalReviews: 0,
        });
      }
    } catch (error) {
      console.error(error);

      setFeedbacks([]);

      setSummary({
        averageRating: 0,
        totalReviews: 0,
      });
    }
  };

  // ================= SEARCH & FILTER =================
  const filteredFeedbacks = feedbacks.filter((item) => {
    const matchesSearch =
      item.clientName
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      item.plannerName
        ?.toLowerCase()
        .includes(search.toLowerCase());

    const matchesRating =
      ratingFilter === "All" ||
      Number(item.rating) === Number(ratingFilter);

    return matchesSearch && matchesRating;
  });

  return (
    <div className="min-h-screen space-y-7 bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">

      {/* ================= HEADER ================= */}
      <div className="pl-2">

        <h1 className="text-2xl font-bold text-gray-800 sm:text-3xl">
          Feedback & Reports
        </h1>

        <p className="mt-2 text-sm text-gray-500 sm:text-base">
          View customer reviews and planner ratings.
        </p>

      </div>


      {/* ================= SUMMARY CARDS ================= */}
      <div className="grid gap-5 pl-2 pr-2 md:grid-cols-2">

        {/* Average Rating */}
        <div
          className="
            rounded-xl
            border
            border-gray-200
            bg-white
            p-5
            shadow-sm
            transition
            hover:shadow-md
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Average Rating
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                {summary.averageRating}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Out of 5.0
              </p>

            </div>

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-yellow-50
                text-xl
              "
            >
              ⭐
            </div>

          </div>

        </div>


        {/* Total Reviews */}
        <div
          className="
            rounded-xl
            border
            border-gray-200
            bg-white
            p-5
            shadow-sm
            transition
            hover:shadow-md
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-sm font-medium text-gray-500">
                Total Reviews
              </p>

              <h2 className="mt-2 text-3xl font-bold text-gray-800">
                {summary.totalReviews}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Customer feedback received
              </p>

            </div>

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                bg-rose-50
                text-xl
              "
            >
              💬
            </div>

          </div>

        </div>

      </div>


      {/* ================= SEARCH & FILTER ================= */}
      {/* Wider container */}
      <div
        className="
          mx-2
          max-w-7xl
          rounded-xl
          border
          border-gray-200
          bg-white
          p-5
          shadow-sm
        "
      >

        <div
          className="
            flex
            flex-col
            gap-4
            md:flex-row
            md:items-center
          "
        >

          {/* Search Bar */}
          <div className="w-full md:flex-1">

            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search client or planner..."
            />

          </div>


          {/* Rating Filter */}
          <div className="w-full md:w-48">

            <select
              value={ratingFilter}
              onChange={(e) => setRatingFilter(e.target.value)}
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

              <option value="All">
                All Ratings
              </option>

              <option value="5">
                5 Star
              </option>

              <option value="4">
                4 Star
              </option>

              <option value="3">
                3 Star
              </option>

              <option value="2">
                2 Star
              </option>

              <option value="1">
                1 Star
              </option>

            </select>

          </div>

        </div>

      </div>


      {/* ================= FEEDBACK LIST ================= */}
      {/* Same wider width as search container */}
      <div className="mx-2 max-w-7xl space-y-4">

        {filteredFeedbacks.length === 0 ? (

          /* Empty State */
          <div
            className="
              rounded-xl
              border
              border-gray-200
              bg-white
              p-5
              shadow-sm
            "
          >

            <EmptyState message="No feedback available." />

          </div>

        ) : (

          /* Feedback Cards */
          filteredFeedbacks.map((feedback) => (

            <div
              key={feedback.id}
              className="
                rounded-xl
                border
                border-gray-200
                bg-white
                p-5
                shadow-sm
                transition
                hover:shadow-md
              "
            >

              {/* Client and Rating */}
              <div
                className="
                  flex
                  flex-col
                  gap-4
                  sm:flex-row
                  sm:items-center
                  sm:justify-between
                "
              >

                {/* Client Information */}
                <div>

                  <h3 className="text-lg font-semibold text-gray-800">
                    {feedback.clientName}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Planner:{" "}

                    <span className="font-medium text-gray-700">
                      {feedback.plannerName}
                    </span>
                  </p>

                </div>


                {/* Rating */}
                <div>

                  <span
                    className="
                      inline-flex
                      items-center
                      rounded-lg
                      bg-yellow-50
                      px-3
                      py-2
                      text-sm
                      font-semibold
                      text-yellow-600
                    "
                  >
                    ⭐ {feedback.rating} / 5
                  </span>

                </div>

              </div>


              {/* Comment */}
              <div
                className="
                  mt-5
                  rounded-lg
                  bg-gray-50
                  p-4
                "
              >

                <p className="text-sm leading-6 text-gray-700">
                  {feedback.comment}
                </p>

              </div>


              {/* Date */}
              <div className="mt-4">

                <p className="text-xs text-gray-400">
                  Submitted on {feedback.date}
                </p>

              </div>

            </div>

          ))

        )}

      </div>

    </div>
  );
}