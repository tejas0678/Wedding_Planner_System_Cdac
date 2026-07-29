import api from './api';

const fetchMockData = async (fileName) => {
  const res = await fetch(`/mock/${fileName}`);
  return await res.json();
};

export const getNotifications = async () => {
  try {
    const res = await api.get('/notifications');
    if (res && res.data) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, fetching mock notifications:", err);
  }
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('notifications.json');
      resolve(data);
    }, 400);
  });
};
