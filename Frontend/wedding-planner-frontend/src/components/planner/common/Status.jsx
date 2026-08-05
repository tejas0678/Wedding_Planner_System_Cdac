import React from 'react';

// ============= STATUS COMPONENT =============
export const Status = ({ status }) => {
  const normStatus = (status || 'PENDING').toUpperCase();

  let colorClass = 'bg-amber-100 text-amber-800 border border-amber-200';
  let label = '🟡 Pending Approval';

  if (normStatus === 'CONFIRMED' || normStatus === 'ACCEPTED') {
    colorClass = 'bg-emerald-100 text-emerald-800 border border-emerald-200';
    label = '🟢 Confirmed';
  } else if (normStatus === 'REJECTED') {
    colorClass = 'bg-rose-100 text-rose-800 border border-rose-200';
    label = '🔴 Rejected';
  } else if (normStatus === 'COMPLETED') {
    colorClass = 'bg-blue-100 text-blue-800 border border-blue-200';
    label = '🔵 Completed';
  } else if (normStatus === 'PAID') {
    colorClass = 'bg-purple-100 text-purple-800 border border-purple-200';
    label = 'Paid';
  }

  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${colorClass}`}>
      {label}
    </span>
  );
};
