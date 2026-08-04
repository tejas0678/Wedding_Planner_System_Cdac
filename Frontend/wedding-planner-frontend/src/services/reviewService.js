import api from './api';

export const getReviews = async () => {
  const res = await api.get('/admin/reports/feedback');
  return res && res.data ? res.data : [];
};

export const getPlannerReviews = async (plannerId) => {
  const res = await api.get(`/reviews/planner/${plannerId}`);
  return res && res.data ? res.data : [];
};

export const submitReview = async (reviewData) => {
  const res = await api.post('/reviews', reviewData);
  return res && res.data ? res.data : res;
};
