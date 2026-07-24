import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { mockData } from './data/mockData';
import { EmptyState } from './../../components/planner/common/EmptyState'

// ============= REVIEWS PAGE =============
export const PlannerReviews = () => {
  const user = { id: 1 };
  const [data] = useState(mockData);
  const reviews = data.feedback.filter(f => f.planner_id === user.id);
  const avg = reviews.length ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : '0.0';

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Reviews</h1>
      {reviews.length > 0 && (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-6">
          <p className="text-3xl font-bold text-gray-900">{avg} ★</p>
          <p className="text-gray-600">{reviews.length} review{reviews.length > 1 ? 's' : ''}</p>
        </div>
      )}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map(r => {
              const client = data.clients.find(c => c.client_id === r.client_id);
              return (
                <div key={r.feedback_id} className="p-4 border border-gray-100 rounded-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">{client?.name || 'Anonymous'}</span>
                    <span className="text-yellow-400">★</span>
                    <span className="font-medium">{r.rating}</span>
                    <span className="text-xs text-gray-400">• {r.date}</span>
                  </div>
                  <p className="text-gray-600">{r.comment}</p>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState icon="⭐" title="No reviews yet" text="You haven't received any reviews. Complete bookings to get feedback." />
        )}
      </div>
    </DashboardLayout>
  );
};