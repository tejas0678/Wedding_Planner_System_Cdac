import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { getPlannerBookings } from '../../services/plannerService';
import { LoadingSpinner, EmptyState, ErrorAlert } from '../../components/common/StateFeedback';

export const PlannerTasks = () => {
  const [bookingsList, setBookingsList] = useState([]);
  const [tasksList, setTasksList] = useState([
    { id: 't1', bookingId: 'WPB-882910', name: 'Mandap Floral Layout Approval', status: 'Completed' },
    { id: 't2', bookingId: 'WPB-882910', name: 'Catering Menu Final Tasting', status: 'In Progress' },
    { id: 't3', bookingId: 'WPB-882911', name: 'Beach Gazebo Setup Inspection', status: 'Pending' }
  ]);
  const [taskName, setTaskName] = useState('');
  const [selectedBooking, setSelectedBooking] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPlannerBookings();
      setBookingsList(data || []);
      if (data && data.length > 0) {
        setSelectedBooking(data[0].bookingNumber || data[0].id);
      }
    } catch (err) {
      console.error("Error loading tasks:", err);
      setError("Unable to load planner tasks.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const addTask = (e) => {
    e.preventDefault();
    if (!taskName) return;
    setTasksList((prev) => [
      ...prev,
      {
        id: `t_${Date.now()}`,
        bookingId: selectedBooking || 'WPB-882910',
        name: taskName,
        status: 'Pending'
      }
    ]);
    setTaskName('');
  };

  const changeStatus = (id, status) => {
    setTasksList((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const deleteTask = (id) => {
    setTasksList((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Track Event Tasks</h1>

      {loading && <LoadingSpinner text="Loading tasks..." />}

      {error && !loading && <ErrorAlert message={error} onRetry={fetchBookings} />}

      {!loading && !error && (
        <>
          <form onSubmit={addTask} className="flex flex-wrap gap-3 mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
            <select 
              value={selectedBooking} 
              onChange={e => setSelectedBooking(e.target.value)}
              className="flex-1 min-w-[150px] rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            >
              {bookingsList.map(w => (
                <option key={w.id || w.bookingNumber} value={w.bookingNumber || w.id}>
                  {w.bookingNumber || w.id} • {w.packageName || w.package}
                </option>
              ))}
            </select>
            <input 
              placeholder="Task name..." 
              value={taskName} 
              onChange={e => setTaskName(e.target.value)}
              className="flex-1 min-w-[150px] rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button type="submit" className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-pink-700 transition flex items-center gap-2 cursor-pointer shrink-0">
              <span>➕</span> Add Task
            </button>
          </form>

          {bookingsList.map(w => {
            const bId = w.bookingNumber || w.id;
            const tasks = tasksList.filter(t => t.bookingId === bId);
            return (
              <div key={bId} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">{bId} • {w.packageName || w.package}</h2>
                {tasks.length > 0 ? (
                  <div className="space-y-2">
                    {tasks.map(t => (
                      <div key={t.id} className="flex flex-wrap items-center gap-3 p-3 bg-gray-50 rounded-xl">
                        <span className="flex-1 font-medium text-gray-800 text-sm">{t.name}</span>
                        <select 
                          value={t.status} 
                          onChange={e => changeStatus(t.id, e.target.value)}
                          className="rounded-lg border border-gray-300 px-3 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-pink-500 cursor-pointer"
                        >
                          <option>Pending</option>
                          <option>In Progress</option>
                          <option>Completed</option>
                        </select>
                        <button onClick={() => deleteTask(t.id)} className="p-1 text-red-500 hover:bg-red-50 rounded text-lg cursor-pointer">
                          🗑️
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-xs">No tasks assigned to this booking yet.</p>
                )}
              </div>
            );
          })}
        </>
      )}
    </DashboardLayout>
  );
};