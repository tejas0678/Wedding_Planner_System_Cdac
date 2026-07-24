import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { Status } from './../../components/planner/common/Status'
import { mockData } from './data/mockData';

// ============= PROFILE PAGE =============
export const PlannerProfile = () => {
  const user = { id: 1, name: 'John Doe', email: 'john@example.com' };
  const [data, setData] = useState(mockData);
  const p = data.planners.find(x => x.planner_id === user.id);
  const [form, setForm] = useState(p || {});
  const [msg, setMsg] = useState('');

  const update = (key, fn) => {
    setData(prev => ({
      ...prev,
      [key]: typeof fn === 'function' ? fn(prev[key]) : fn
    }));
  };

  const save = (e) => {
    e.preventDefault();
    update('planners', a => a.map(x => x.planner_id === user.id ? { ...x, ...form } : x));
    setMsg('Profile updated successfully! ✅');
    setTimeout(() => setMsg(''), 3000);
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={save} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
            <input 
              value={form.name || ''} 
              onChange={e => setForm({ ...form, name: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              value={form.email || ''} 
              onChange={e => setForm({ ...form, email: e.target.value })}
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience</label>
            <input 
              value={form.experience || ''} 
              onChange={e => setForm({ ...form, experience: e.target.value })}
              placeholder="e.g., 5 years"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
            <input 
              value={form.specialization || ''} 
              onChange={e => setForm({ ...form, specialization: e.target.value })}
              placeholder="e.g., Wedding Decoration"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Image URL</label>
            <input 
              value={form.image || ''} 
              onChange={e => setForm({ ...form, image: e.target.value })}
              placeholder="https://example.com/photo.jpg"
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea 
              value={form.bio || ''} 
              onChange={e => setForm({ ...form, bio: e.target.value })}
              rows="3"
              placeholder="Tell couples about yourself..."
              className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
          {msg && <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">{msg}</div>}
          <button type="submit" className="w-full bg-pink-600 text-white py-2.5 rounded-lg font-semibold hover:bg-pink-700 transition">
            Save Changes
          </button>
        </form>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
          <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
            <img 
              src={form.image || 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=200&h=200&q=80'} 
              alt="Profile" 
              className="w-20 h-20 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-gray-900">{form.name}</p>
              <p className="text-sm text-gray-600">{form.specialization}</p>
              <p className="text-sm text-gray-500">{form.experience} experience</p>
            </div>
          </div>
          <p className="text-gray-600 text-sm mt-4">{form.bio || 'No bio added yet.'}</p>
          <div className="mt-4">
            <p className="text-sm text-gray-500">Status: <Status status={p?.status || 'Pending'} /></p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};