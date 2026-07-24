import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { EmptyState } from './../../components/planner/common/EmptyState'
import { mockData } from './data/mockData';

// ============= GALLERY PAGE =============
export const PlannerGallery = () => {
  const user = { id: 1 };
  const [data, setData] = useState(mockData);
  const [url, setUrl] = useState('');
  const mine = data.images.filter(i => i.planner_id === user.id);

  const update = (key, fn) => {
    setData(prev => ({
      ...prev,
      [key]: typeof fn === 'function' ? fn(prev[key]) : fn
    }));
  };

  const add = (e) => {
    e.preventDefault();
    if (!url) return;
    update('images', a => [...a, {
      image_id: 'i' + Date.now(),
      planner_id: user.id,
      image_url: url,
      upload_time: new Date().toISOString().slice(0, 10)
    }]);
    setUrl('');
  };

  const del = (id) => update('images', a => a.filter(x => x.image_id !== id));

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Image Gallery</h1>
      <form onSubmit={add} className="flex gap-3 mb-6">
        <input 
          placeholder="Paste image URL..." 
          value={url} 
          onChange={e => setUrl(e.target.value)}
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button type="submit" className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-pink-700 transition flex items-center gap-2">
          <span>➕</span> Add Image
        </button>
      </form>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {mine.map(i => (
          <div key={i.image_id} className="relative group rounded-lg overflow-hidden border border-gray-200">
            <img src={i.image_url} alt="Gallery" className="w-full h-48 object-cover" />
            <button 
              onClick={() => del(i.image_id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition text-xl"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
      {mine.length === 0 && (
        <EmptyState icon="🖼️" title="No images" text="Add images to showcase your work." />
      )}
    </DashboardLayout>
  );
};