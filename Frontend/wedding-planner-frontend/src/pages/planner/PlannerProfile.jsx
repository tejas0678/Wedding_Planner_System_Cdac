import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { Status } from './../../components/planner/common/Status';
import { getPlannerProfile, updatePlannerProfile } from '../../services/plannerService';
import { LoadingSpinner, ErrorAlert } from '../../components/common/StateFeedback';

export const PlannerProfile = () => {
  const [form, setForm] = useState({
    name: 'Priya Sharma',
    businessName: 'Royal Touch Weddings Studio',
    email: 'priya@royaltouchweddings.com',
    phone: '+91 98765 43210',
    experience: '8 Years',
    specialization: 'Destination & Palace Weddings',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300',
    bio: 'Premier wedding planning studio specializing in regal setups, celebrity weddings, palace mandaps, and high-production destination events.'
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [msg, setMsg] = useState('');

  const loadProfile = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPlannerProfile();
      if (data) {
        setForm({
          name: data.ownerName || data.name || 'Priya Sharma',
          businessName: data.businessName || 'Royal Touch Weddings Studio',
          email: data.email || 'priya@royaltouchweddings.com',
          phone: data.phone || '+91 98765 43210',
          experience: data.experience || '8 Years',
          specialization: data.specialization || 'Destination & Palace Weddings',
          image: data.avatarUrl || data.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300',
          bio: data.description || data.bio || 'Premier wedding planning studio.'
        });
      }
    } catch (err) {
      console.error("Error loading planner profile:", err);
      setError("Unable to load profile.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const save = async (e) => {
    e.preventDefault();
    try {
      await updatePlannerProfile(form);
      setMsg('Profile updated successfully! ✅');
      setTimeout(() => setMsg(''), 3000);
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">My Profile</h1>

      {loading && <LoadingSpinner text="Loading planner profile..." />}

      {error && !loading && <ErrorAlert message={error} onRetry={loadProfile} />}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form onSubmit={save} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Business / Studio Name</label>
              <input 
                value={form.businessName || ''} 
                onChange={e => setForm({ ...form, businessName: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Owner Name</label>
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
                placeholder="e.g., 8 Years"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
              <input 
                value={form.specialization || ''} 
                onChange={e => setForm({ ...form, specialization: e.target.value })}
                placeholder="e.g., Destination & Palace Weddings"
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
              <label className="block text-sm font-medium text-gray-700 mb-1">Bio / Description</label>
              <textarea 
                value={form.bio || ''} 
                onChange={e => setForm({ ...form, bio: e.target.value })}
                rows="3"
                placeholder="Tell couples about yourself..."
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            {msg && <div className="p-3 bg-green-50 text-green-700 rounded-lg text-sm">{msg}</div>}
            <button type="submit" className="w-full bg-pink-600 text-white py-2.5 rounded-lg font-semibold hover:bg-pink-700 transition cursor-pointer">
              Save Changes
            </button>
          </form>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Preview</h2>
            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
              <img 
                src={form.image || 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200'} 
                alt="Profile" 
                className="w-20 h-20 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">{form.businessName}</p>
                <p className="text-sm text-gray-600">Managed by {form.name}</p>
                <p className="text-xs text-rose-600 font-bold mt-1">{form.specialization}</p>
                <p className="text-xs text-gray-500">{form.experience} experience</p>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-4">{form.bio || 'No bio added yet.'}</p>
            <div className="mt-4">
              <p className="text-sm text-gray-500">Status: <Status status="APPROVED" /></p>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};