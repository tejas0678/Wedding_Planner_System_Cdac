import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { mockData } from './data/mockData';

// ============= TASKS PAGE =============
export const PlannerTasks = () => {
  const user = { id: 1 };
  const [data, setData] = useState(mockData);
  const mine = data.weddings.filter(w => w.planner_id === user.id);
  const [form, setForm] = useState({ wedding_id: mine[0]?.wedding_id || '', task_name: '' });

  const update = (key, fn) => {
    setData(prev => ({
      ...prev,
      [key]: typeof fn === 'function' ? fn(prev[key]) : fn
    }));
  };

  const add = (e) => {
    e.preventDefault();
    if (!form.wedding_id || !form.task_name) return;
    update('tasks', a => [...a, {
      task_id: 't' + Date.now(),
      wedding_id: form.wedding_id,
      task_name: form.task_name,
      status: 'Pending'
    }]);
    setForm({ ...form, task_name: '' });
  };

  const change = (id, status) => update('tasks', a => a.map(t => t.task_id === id ? { ...t, status } : t));
  const del = (id) => update('tasks', a => a.filter(t => t.task_id !== id));

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Track Tasks</h1>
      
      <form onSubmit={add} className="flex flex-wrap gap-3 mb-6 bg-white p-4 rounded-2xl shadow-sm border border-gray-100">
        <select 
          value={form.wedding_id} 
          onChange={e => setForm({ ...form, wedding_id: e.target.value })}
          className="flex-1 min-w-[150px] rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        >
          {mine.map(w => (
            <option key={w.wedding_id} value={w.wedding_id}>{w.wedding_id} • {w.venue || 'TBD'}</option>
          ))}
        </select>
        <input 
          placeholder="Task name..." 
          value={form.task_name} 
          onChange={e => setForm({ ...form, task_name: e.target.value })}
          className="flex-1 min-w-[150px] rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button type="submit" className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition flex items-center gap-2">
          <span>➕</span> Add Task
        </button>
      </form>

      {mine.map(w => {
        const tasks = data.tasks.filter(t => t.wedding_id === w.wedding_id);
        return (
          <div key={w.wedding_id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">{w.wedding_id} • {w.venue || 'TBD'}</h2>
            {tasks.length > 0 ? (
              <div className="space-y-2">
                {tasks.map(t => (
                  <div key={t.task_id} className="flex flex-wrap items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <span className="flex-1 font-medium text-gray-800">{t.task_name}</span>
                    <select 
                      value={t.status} 
                      onChange={e => change(t.task_id, e.target.value)}
                      className="rounded-lg border border-gray-300 px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                    >
                      <option>Pending</option>
                      <option>In Progress</option>
                      <option>Completed</option>
                    </select>
                    <button onClick={() => del(t.task_id)} className="p-1 text-red-500 hover:bg-red-50 rounded text-xl">
                      🗑️
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-sm">No tasks added yet.</p>
            )}
          </div>
        );
      })}
    </DashboardLayout>
  );
};