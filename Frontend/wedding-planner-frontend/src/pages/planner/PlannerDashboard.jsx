import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from './DashboardLayout';
import { EmptyState } from './../../components/planner/common/EmptyState'
import { Stars } from './../../components/planner/common/Stars'
import { Stat } from './../../components/planner/common/Stat'
import { Status } from './../../components/planner/common/Status'
import { mockData } from './data/mockData';
import { moneyShort, money } from './../../utiles/planner/helpers';

// ============= MAIN DASHBOARD =============
export const PlannerDashboard = () => {
  const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
  const [data] = useState(mockData);

  const p = data.planners.find(x => x.planner_id === user.id);
  const mine = data.weddings.filter(w => w.planner_id === user.id);
  const pending = mine.filter(w => w.status === 'Pending').length;
  const accepted = mine.filter(w => w.status === 'Accepted').length;
  const completed = mine.filter(w => w.status === 'Completed').length;
  
  const earn = data.payments
    .filter(p => mine.some(w => w.wedding_id === p.wedding_id) && p.status === 'Paid')
    .reduce((a, p) => a + p.amount, 0);
  
  const reviews = data.feedback.filter(f => f.planner_id === user.id);
  const avg = reviews.length ? (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1) : '0.0';
  
  const needsProfile = !p?.bio || !p?.image;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Banner */}
        <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-2xl p-6 border border-pink-100">
          <div className="flex justify-between items-start flex-wrap gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Welcome back, {user.name}! 👋</h1>
              {needsProfile ? (
                <p className="text-gray-600 mt-1">
                  Complete your profile with a <Link to="/planner-profile" className="text-pink-600 font-semibold hover:underline">bio and profile picture</Link> to attract more clients.
                </p>
              ) : (
                <p className="text-gray-600 mt-1">Manage your weddings and grow your planning business.</p>
              )}
            </div>
            <div className="bg-white px-6 py-3 rounded-xl shadow-sm text-center min-w-[140px]">
              <p className="text-xs text-gray-500">Your Rating</p>
              <p className="text-2xl font-bold text-gray-900">{avg}</p>
              <Stars value={Number(avg)} />
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Stat icon="📆" label="Total Bookings" value={mine.length} />
          <Stat icon="📋" label="Pending Requests" value={pending} />
          <Stat icon="✅" label="Accepted" value={accepted} />
          <Stat icon="📋" label="Completed" value={completed} />
          <Stat icon="💵" label="Total Earnings" value={moneyShort(earn)} title={money(earn)} />
          <Stat icon="⭐" label="Average Rating" value={`${avg} / 5`} />
        </div>

        {/* Recent Bookings */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Booking Requests</h2>
            {mine.length > 0 && <Link to="/planner-bookings" className="text-pink-600 text-sm font-medium hover:underline">View All →</Link>}
          </div>
          {mine.length > 0 ? (
            <div className="space-y-3">
              {mine.slice(-5).reverse().map(w => {
                const client = data.clients.find(c => c.client_id === w.client_id);
                return (
                  <div key={w.wedding_id} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg hover:bg-gray-50 transition">
                    <div>
                      <p className="font-medium text-gray-900">{w.wedding_id}</p>
                      <p className="text-sm text-gray-500">{client?.name || 'Unknown Client'} • {w.date}</p>
                    </div>
                    <Status status={w.status} />
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState icon="📆" title="No pending requests" text="You do not have any pending booking requests at the moment." />
          )}
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent Reviews</h2>
            {reviews.length > 0 && <Link to="/planner-reviews" className="text-pink-600 text-sm font-medium hover:underline">View All →</Link>}
          </div>
          {reviews.length > 0 ? (
            <div className="space-y-4">
              {reviews.slice(-3).reverse().map(r => {
                const client = data.clients.find(c => c.client_id === r.client_id);
                return (
                  <div key={r.feedback_id} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-gray-900">{client?.name || 'Anonymous'}</span>
                      <span className="text-yellow-400">★</span>
                      <span className="font-medium">{r.rating}</span>
                      <span className="text-xs text-gray-400">• {r.date}</span>
                    </div>
                    <p className="text-gray-600 text-sm">{r.comment}</p>
                  </div>
                );
              })}
            </div>
          ) : (
            <EmptyState icon="⭐" title="No reviews yet" text="Once you complete bookings, clients can leave feedback." />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};