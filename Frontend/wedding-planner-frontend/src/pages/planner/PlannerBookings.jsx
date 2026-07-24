import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Status } from './../../components/planner/common/Status'
import { EmptyState } from './../../components/planner/common/EmptyState'
import { mockData } from './data/mockData';
import { money } from './../../utiles/planner/helpers';

// ============= BOOKINGS PAGE =============
export const PlannerBookings = () => {
  const user = { id: 1 };
  const [data, setData] = useState(mockData);
  const mine = data.weddings.filter(w => w.planner_id === user.id);

  const update = (key, fn) => {
    setData(prev => ({
      ...prev,
      [key]: typeof fn === 'function' ? fn(prev[key]) : fn
    }));
  };

  const act = (id, status) => {
    update('weddings', a => a.map(w => w.wedding_id === id ? { ...w, status } : w));
    if (status === 'Accepted') {
      const base = ['Venue Booking', 'Decoration', 'Catering', 'Photography', 'Guest Management'];
      base.forEach((n, i) => {
        update('tasks', a => 
          a.some(t => t.wedding_id === id && t.task_name === n) 
            ? a 
            : [...a, { task_id: 't' + Date.now() + i, wedding_id: id, task_name: n, status: 'Pending' }]
        );
      });
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Wedding Bookings</h1>
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        {mine.length > 0 ? (
          <div className="space-y-4">
            {mine.map(w => {
              const client = data.clients.find(c => c.client_id === w.client_id);
              const pkg = data.packages.find(p => p.package_id === w.package_id);
              return (
                <div key={w.wedding_id} className="flex flex-wrap justify-between items-center p-4 border border-gray-100 rounded-lg hover:bg-gray-50">
                  <div>
                    <p className="font-semibold text-gray-900">{w.wedding_id}</p>
                    <p className="text-sm text-gray-600">{client?.name || 'Unknown Client'}</p>
                    <p className="text-sm text-gray-500">{pkg?.name || 'No package'} • {w.date} • {w.venue || 'Venue TBD'}</p>
                    <p className="text-sm text-pink-600 font-medium">{money(w.budget)}</p>
                  </div>
                  <div className="flex items-center gap-3 mt-2 sm:mt-0">
                    <Status status={w.status} />
                    {w.status === 'Pending' && (
                      <>
                        <button onClick={() => act(w.wedding_id, 'Accepted')} className="px-4 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition flex items-center gap-1">
                          <span>✔️</span> Accept
                        </button>
                        <button onClick={() => act(w.wedding_id, 'Rejected')} className="px-4 py-1.5 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition flex items-center gap-1">
                          <span>❌</span> Reject
                        </button>
                      </>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <EmptyState icon="📅" title="No booking requests" text="You don't have any booking requests yet." />
        )}
      </div>
    </DashboardLayout>
  );
};

