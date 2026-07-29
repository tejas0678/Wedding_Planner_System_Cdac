import api from './api';

const fetchMockData = async (fileName) => {
  const res = await fetch(`/mock/${fileName}`);
  return await res.json();
};

export const getPayments = async () => {
  try {
    const res = await api.get('/admin/payments');
    if (res && res.data) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, fetching mock payments:", err);
  }
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('payments.json');
      resolve(data);
    }, 400);
  });
};
