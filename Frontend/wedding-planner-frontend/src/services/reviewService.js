import api from './api';

const fetchMockData = async (fileName) => {
  const res = await fetch(`/mock/${fileName}`);
  return await res.json();
};

export const getReviews = async () => {
  try {
    const res = await api.get('/admin/reports/feedback');
    if (res && res.data) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, fetching mock reviews:", err);
  }
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('reviews.json');
      resolve(data);
    }, 400);
  });
};

export const getPlannerReviews = async (plannerId) => {
  try {
    const res = await api.get(`/reviews/planner/${plannerId}`);
    if (res && res.data) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, fetching mock planner reviews:", err);
  }
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('reviews.json');
      resolve(data);
    }, 400);
  });
};

export const submitReview = async (reviewData) => {
  try {
    const res = await api.post('/reviews', reviewData);
    if (res && res.data) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, simulating review submission:", err);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: "Review submitted successfully" });
    }, 400);
  });
};
