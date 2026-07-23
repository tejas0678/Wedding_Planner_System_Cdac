import React from 'react';

// ============= STAR RATING =============
export const Stars = ({ value = 0 }) => {
  const full = Math.round(value);
  return (
    <span className="flex gap-0.5 text-yellow-400">
      {[1, 2, 3, 4, 5].map(n => (
        <span key={n}>{n <= full ? '★' : '☆'}</span>
      ))}
    </span>
  );
};
