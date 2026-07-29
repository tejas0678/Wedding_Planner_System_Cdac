import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { getPlannerServices, createPlannerService } from '../../services/plannerService';
import { LoadingSpinner, EmptyState, ErrorAlert } from '../../components/common/StateFeedback';

export const PlannerServices = () => {
  const [servicesList, setServicesList] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', description: '', category: 'DECORATION' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPlannerServices();
      setServicesList(data || []);
    } catch (err) {
      console.error("Error loading planner services:", err);
      setError("Unable to load service catalog.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const addService = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    try {
      const created = await createPlannerService({
        name: form.name,
        price: typeof form.price === 'number' ? `₹${form.price}` : form.price.startsWith('₹') ? form.price : `₹${form.price}`,
        description: form.description,
        category: form.category || 'DECORATION',
        pricingType: 'FIXED'
      });
      setServicesList((prev) => [created, ...prev]);
      setForm({ name: '', price: '', description: '', category: 'DECORATION' });
    } catch (err) {
      console.error("Error creating service:", err);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Services</h1>
      
      {loading && <LoadingSpinner text="Loading services catalog..." />}

      {error && !loading && <ErrorAlert message={error} onRetry={fetchServices} />}

      {!loading && !error && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <form onSubmit={addService} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Add New Service</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Service Name *</label>
              <input 
                required 
                value={form.name} 
                onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
              <input 
                required 
                type="text" 
                value={form.price} 
                onChange={e => setForm({ ...form, price: e.target.value })}
                placeholder="150000"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea 
                value={form.description} 
                onChange={e => setForm({ ...form, description: e.target.value })}
                rows="2"
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>
            <button type="submit" className="w-full bg-pink-600 text-white py-2.5 rounded-lg font-semibold hover:bg-pink-700 transition flex items-center justify-center gap-2 cursor-pointer">
              <span>➕</span> Add Service
            </button>
          </form>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Services ({servicesList.length})</h2>
            {servicesList.length > 0 ? (
              <div className="space-y-3">
                {servicesList.map(s => (
                  <div key={s.id || s.plannerService_id} className="flex justify-between items-start p-3.5 bg-gray-50 rounded-xl">
                    <div>
                      <p className="font-semibold text-gray-900">{s.name}</p>
                      <p className="text-pink-600 font-bold text-sm">{s.price}</p>
                      <p className="text-xs text-gray-500 mt-1">{s.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState title="No Services Yet" message="Add your first service offering to attract couples." />
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};