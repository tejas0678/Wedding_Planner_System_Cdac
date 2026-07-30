import api from './api';

const fetchMockData = async (fileName) => {
  const res = await fetch(`/mock/${fileName}`);
  return await res.json();
};

export async function getDashboardStats() {
  try {
    const res = await api.get('/admin/dashboard/stats');
    if (res && res.data) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, fetching mock admin dashboard stats:", err);
  }
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('adminDashboard.json');
      resolve(data);
    }, 400);
  });
}

export async function getClients() {
  try {
    const res = await api.get('/admin/clients');
    if (res && res.data && res.data.length > 0) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, fetching mock clients:", err);
  }
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('clients.json');
      resolve(data);
    }, 400);
  });
}

export async function getPlanners() {
  try {
    const res = await api.get('/admin/planners');
    if (res && res.data && res.data.length > 0) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, fetching mock planners:", err);
  }
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('planners.json');
      resolve(data);
    }, 400);
  });
}

export async function approvePlanner(id) {
  try {
    const res = await api.put(`/admin/planners/${id}/approve`);
    if (res && res.data) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, simulating planner approval:", err);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, id, status: 'APPROVED' });
    }, 400);
  });
}

export async function rejectPlanner(id) {
  try {
    const res = await api.put(`/admin/planners/${id}/reject`);
    if (res && res.data) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, simulating planner rejection:", err);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, id, status: 'REJECTED' });
    }, 400);
  });
}

export async function getBookings() {
  try {
    const res = await api.get('/admin/bookings');
    if (res && res.data && res.data.length > 0) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, fetching mock bookings for admin:", err);
  }
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('bookings.json');
      resolve(data);
    }, 400);
  });
}

export async function getPackages() {
  try {
    const res = await api.get('/packages');
    if (res && res.data && res.data.length > 0) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, fetching mock packages for admin:", err);
  }
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('packages.json');
      resolve(data);
    }, 400);
  });
}

export async function getPayments() {
  try {
    const res = await api.get('/admin/payments');
    if (res && res.data && res.data.length > 0) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, fetching mock payments for admin:", err);
  }
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('payments.json');
      resolve(data);
    }, 400);
  });
}

export async function getFeedbacks() {
  try {
    const res = await api.get('/admin/reports/feedback');
    if (res && res.data && res.data.length > 0) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, fetching mock feedbacks for admin:", err);
  }
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('reviews.json');
      resolve(data);
    }, 400);
  });
}