import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { EmptyState } from './../../components/planner/common/EmptyState'
import { mockData } from './data/mockData';
import { money } from './../../utiles/planner/helpers';
import { moneyShort } from './../../utiles/planner/helpers';

// ============= SERVICES PAGE =============
export const PlannerServices = () => {
  const user = { id: 1 };
  const [data, setData] = useState(mockData);
  const [form, setForm] = useState({ name: '', price: '', description: '' });
  const mine = data.services.filter(s => s.planner_id === user.id);

  const update = (key, fn) => {
    setData(prev => ({
      ...prev,
      [key]: typeof fn === 'function' ? fn(prev[key]) : fn
    }));
  };

  const add = (e) => {
    e.preventDefault();
    if (!form.name || !form.price) return;
    update('services', a => [...a, {
      ...form,
      planner_id: user.id,
      plannerService_id: 's' + Date.now(),
      price: Number(form.price)
    }]);
    setForm({ name: '', price: '', description: '' });
  };

  const del = (id) => update('services', a => a.filter(x => x.plannerService_id !== id));

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manage Services</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <form onSubmit={add} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
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
            <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
            <input 
              required 
              type="number" 
              value={form.price} 
              onChange={e => setForm({ ...form, price: e.target.value })}
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
          <button type="submit" className="w-full bg-pink-600 text-white py-2.5 rounded-lg font-semibold hover:bg-pink-700 transition flex items-center justify-center gap-2">
            <span>➕</span> Add Service
          </button>
        </form>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Services ({mine.length})</h2>
          {mine.length > 0 ? (
            <div className="space-y-3">
              {mine.map(s => (
                <div key={s.plannerService_id} className="flex justify-between items-start p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-semibold text-gray-900">{s.name}</p>
                    <p className="text-pink-600 font-bold">{money(s.price)}</p>
                    <p className="text-sm text-gray-500">{s.description}</p>
                  </div>
                  <button onClick={() => del(s.plannerService_id)} className="p-1.5 text-red-500 hover:bg-red-50 rounded text-xl">
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState icon="💼" title="No services yet" text="Add your first service to attract clients." />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};