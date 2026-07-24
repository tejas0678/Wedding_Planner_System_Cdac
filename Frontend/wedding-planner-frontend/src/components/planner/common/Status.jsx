import React from 'react';

// ============= STATUS COMPONENT =============
export const Status = ({ status }) => {
  const colors = {
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Accepted': 'bg-green-100 text-green-800',
    'Rejected': 'bg-red-100 text-red-800',
    'Completed': 'bg-blue-100 text-blue-800',
    'Paid': 'bg-purple-100 text-purple-800',
    'In Progress': 'bg-indigo-100 text-indigo-800'
  };
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${colors[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};
