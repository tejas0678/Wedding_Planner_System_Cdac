import React from 'react';

// ============= EMPTY STATE =============
export const EmptyState = ({ icon, title, text }) => (
  <div className="text-center py-12">
    <div className="text-5xl text-gray-300 mb-3">{icon}</div>
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <p className="text-gray-500 text-sm mt-1">{text}</p>
  </div>
);