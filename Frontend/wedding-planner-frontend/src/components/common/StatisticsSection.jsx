import React, { useState, useEffect } from 'react';
import { getDashboardStats } from '../../services/adminService';

const StatisticsSection = ({ statistics = {} }) => {
  const [stats, setStats] = useState(statistics);

  useEffect(() => {
    if (Object.keys(statistics).length > 0) {
      setStats(statistics);
    } else {
      async function loadStats() {
        try {
          const data = await getDashboardStats();
          if (data) {
            setStats({
              weddingsPlanned: data.totalWeddings || 86,
              expertPlanners: data.totalPlanners || 28,
              happyCouples: 99,
              citiesServed: 12
            });
          }
        } catch (err) {
          console.error("Failed to load platform stats:", err);
        }
      }
      loadStats();
    }
  }, [statistics]);

  const statItems = [
    { label: 'Weddings Planned', value: stats.weddingsPlanned, suffix: '+' },
    { label: 'Expert Planners', value: stats.expertPlanners, suffix: '+' },
    { label: 'Happy Couples', value: stats.happyCouples, suffix: '%' },
    { label: 'Cities Served', value: stats.citiesServed, suffix: '+' },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statItems.map((item, idx) => (
            <div
              key={idx}
              className="text-center p-6 bg-gray-50 rounded-2xl shadow-sm hover:shadow-md transition transform hover:-translate-y-1"
            >
              <div className="text-3xl sm:text-4xl font-bold text-rose-600">
                {item.value != null ? `${item.value}${item.suffix}` : '—'}
              </div>
              <div className="mt-2 text-gray-600 font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;
