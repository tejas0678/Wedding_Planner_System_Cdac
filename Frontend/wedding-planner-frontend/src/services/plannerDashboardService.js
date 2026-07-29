import api from './api';

const fetchMockData = async (fileName) => {
  const res = await fetch(`/mock/${fileName}`);
  return await res.json();
};

export const getPlannerDashboardStats = async () => {
  try {
    const res = await api.get('/planner/dashboard/stats');
    if (res && res.data) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, fetching mock planner dashboard stats:", err);
  }
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('plannersDashboard.json');
      resolve(data);
    }, 400);
  });
};
