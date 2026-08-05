import api from './api';

export const getPlannerDashboardStats = async () => {
  const res = await api.get('/planner/dashboard/stats');
  return res && res.data ? res.data : res;
};
