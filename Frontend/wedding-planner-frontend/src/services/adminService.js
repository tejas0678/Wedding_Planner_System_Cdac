import api from './api';

export async function getDashboardStats() {
  const res = await api.get('/admin/dashboard/stats');
  return res && res.data ? res.data : res;
}

export async function getClients() {
  const res = await api.get('/admin/clients');
  return res && res.data ? res.data : [];
}

export async function getClientDetails(id) {
  const res = await api.get(`/api/admin/clients/${id}/details`);
  return res && res.data ? res.data : null;
}

export async function toggleClientStatus(id, enabled) {
  const res = await api.put(`/api/admin/users/${id}/toggle-status?enabled=${enabled}`);
  return res && res.data ? res.data : res;
}

export async function getPlanners() {
  const res = await api.get('/admin/planners');
  return res && res.data ? res.data : [];
}

export async function getPlannerDetails(id) {
  const res = await api.get(`/api/admin/planners/${id}/details`);
  return res && res.data ? res.data : null;
}

export async function approvePlanner(id) {
  const res = await api.put(`/admin/planners/${id}/approve`);
  return res && res.data ? res.data : res;
}

export async function rejectPlanner(id) {
  const res = await api.put(`/admin/planners/${id}/reject`);
  return res && res.data ? res.data : res;
}

export async function toggleUserStatus(id, enabled) {
  const res = await api.put(`/api/admin/users/${id}/toggle-status?enabled=${enabled}`);
  return res && res.data ? res.data : res;
}

export async function deleteUser(id) {
  const res = await api.delete(`/api/admin/users/${id}`);
  return res && res.data ? res.data : res;
}

export async function getBookings() {
  const res = await api.get('/admin/bookings');
  return res && res.data ? res.data : [];
}

export async function getBookingDetails(id) {
  const res = await api.get(`/api/admin/bookings/${id}/details`);
  return res && res.data ? res.data : null;
}

export async function updateBookingStatus(id, status) {
  const res = await api.put(`/api/admin/bookings/${id}/status?status=${status}`);
  return res && res.data ? res.data : res;
}

export async function deleteBooking(id) {
  const res = await api.delete(`/api/admin/bookings/${id}`);
  return res && res.data ? res.data : res;
}

export async function getPackages() {
  const res = await api.get('/packages');
  return res && res.data ? res.data : [];
}

export async function getPayments(status) {
  const query = status && status !== 'All' ? `?status=${encodeURIComponent(status)}` : '';
  const res = await api.get(`/admin/payments${query}`);
  return res && res.data ? res.data : [];
}

export async function getPaymentDetails(id) {
  const res = await api.get(`/admin/payments/${id}`);
  return res && res.data ? res.data : null;
}

export async function getPaymentsSummary() {
  const res = await api.get('/admin/payments/summary');
  return res && res.data ? res.data : null;
}

export async function getFeedbacks(filters = {}) {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '' && value !== 'All') {
      params.append(key, value);
    }
  });
  const query = params.toString() ? `?${params.toString()}` : '';
  const res = await api.get(`/admin/reports/feedback${query}`);
  return res && res.data ? res.data : [];
}

export async function getFeedbackDetails(id) {
  const res = await api.get(`/admin/reports/feedback/${id}`);
  return res && res.data ? res.data : null;
}

export async function deleteFeedback(id) {
  const res = await api.delete(`/admin/reports/feedback/${id}`);
  return res && res.data ? res.data : res;
}

export async function getFeedbackSummary() {
  const res = await api.get('/admin/reports/feedback/summary');
  return res && res.data ? res.data : null;
}