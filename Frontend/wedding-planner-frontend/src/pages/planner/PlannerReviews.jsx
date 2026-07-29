import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { getPlannerReviews } from '../../services/reviewService';
import { LoadingSpinner, EmptyState, ErrorAlert } from '../../components/common/StateFeedback';

export const PlannerReviews = () => {
  const [reviewsList, setReviewsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchReviews = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPlannerReviews(1);
      setReviewsList(data || []);
    } catch (err) {
      console.error("Error loading planner reviews:", err);
      setError("Unable to load reviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const avg = reviewsList.length
    ? (reviewsList.reduce((a, r) => a + (r.rating || 5), 0) / reviewsList.length).toFixed(1)
    : '5.0';

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Reviews & Feedback</h1>

      {loading && <LoadingSpinner text="Loading client feedback..." />}

      {error && !loading && <ErrorAlert message={error} onRetry={fetchReviews} />}

      {!loading && !error && (
        <>
          {reviewsList.length > 0 && (
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6 flex items-center gap-6">
              <div>
                <p className="text-4xl font-bold text-gray-900">{avg} ★</p>
                <p className="text-xs text-gray-500 font-medium mt-1">{reviewsList.length} Client Review{reviewsList.length > 1 ? 's' : ''}</p>
              </div>
            </div>
          )}

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            {reviewsList.length > 0 ? (
              <div className="space-y-4">
                {reviewsList.map((r) => (
                  <div key={r.id || r.feedback_id} className="p-4 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-bold text-gray-900">{r.clientName || 'Anonymous Couple'}</span>
                      <span className="text-amber-400 font-bold">★ {r.rating || 5}</span>
                      <span className="text-xs text-gray-400">• {r.date || '2026-07-28'}</span>
                    </div>
                    <p className="text-sm text-gray-600 font-light mt-1">"{r.comment || r.quote}"</p>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="No Reviews Yet" message="Complete bookings to receive verified feedback from couples." />
            )}
          </div>
        </>
      )}
    </DashboardLayout>
  );
};