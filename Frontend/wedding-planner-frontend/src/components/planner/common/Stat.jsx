import React from 'react';

// ============= STAT COMPONENT =============
export const Stat = ({ icon, label, value, title }) => (
  <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium">{label}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1" title={title}>{value}</p>
      </div>
      <div className="p-3 bg-pink-50 rounded-lg text-pink-600 text-2xl">{icon}</div>
    </div>
  </div>
);