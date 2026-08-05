import api from './api';

export const getPlanners = async (city, keyword) => {
  let url = '/planners';
  const params = new URLSearchParams();
  if (city && city !== 'All') params.append('city', city);
  if (keyword) params.append('keyword', keyword);
  if (params.toString()) url += `?${params.toString()}`;
  const res = await api.get(url);
  return res && res.data ? res.data : [];
};

export const getPackagesByPlannerId = async (plannerId) => {
  const res = await api.get(`/packages/planner/${plannerId}`);
  return res && res.data ? res.data : [];
};

export const getPlannerById = async (id) => {
  const res = await api.get(`/planners/${id}`);
  return res && res.data ? res.data : res;
};

export const getPlannerDashboardStats = async () => {
  const res = await api.get('/planner/dashboard/stats');
  return res && res.data ? res.data : res;
};

export const getPlannerProfile = async () => {
  const res = await api.get('/planner/profile');
  return res && res.data ? res.data : res;
};

export const updatePlannerProfile = async (data) => {
  const res = await api.put('/planner/profile', data);
  return res && res.data ? res.data : res;
};

export const getPlannerPackages = async () => {
  const res = await api.get('/planner/packages');
  return res && res.data ? res.data : [];
};

export const createPlannerPackage = async (packageData) => {
  const res = await api.post('/planner/packages', packageData);
  return res && res.data ? res.data : res;
};

export const updatePlannerPackage = async (id, packageData) => {
  const res = await api.put(`/planner/packages/${id}`, packageData);
  return res && res.data ? res.data : res;
};

export const deletePlannerPackage = async (id) => {
  const res = await api.delete(`/planner/packages/${id}`);
  return res && res.data ? res.data : res;
};

export const getPlannerServices = async () => {
  const res = await api.get('/planner/services');
  return res && res.data ? res.data : [];
};

export const createPlannerService = async (serviceData) => {
  const res = await api.post('/planner/services', serviceData);
  return res && res.data ? res.data : res;
};

export const updatePlannerService = async (id, serviceData) => {
  const res = await api.put(`/planner/services/${id}`, serviceData);
  return res && res.data ? res.data : res;
};

export const deletePlannerService = async (id) => {
  const res = await api.delete(`/planner/services/${id}`);
  return res && res.data ? res.data : res;
};

export const getPlannerPortfolio = async () => {
  const res = await api.get('/planner/portfolio');
  return res && res.data ? res.data : [];
};

export const createPortfolioItem = async (portfolioData) => {
  const res = await api.post('/planner/portfolio', portfolioData);
  return res && res.data ? res.data : res;
};

export const deletePortfolioItem = async (id) => {
  const res = await api.delete(`/planner/portfolio/${id}`);
  return res && res.data ? res.data : res;
};

export const getPlannerBookings = async () => {
  const res = await api.get('/planner/bookings');
  return res && res.data ? res.data : [];
};

export const acceptBooking = async (bookingId) => {
  const res = await api.put(`/planner/bookings/${bookingId}/accept`);
  return res && res.data ? res.data : res;
};

export const rejectBooking = async (bookingId) => {
  const res = await api.put(`/planner/bookings/${bookingId}/reject`);
  return res && res.data ? res.data : res;
};

export const updateBookingStatus = async (bookingId, status) => {
  const res = await api.put(`/planner/bookings/${bookingId}/status?status=${status}`);
  return res && res.data ? res.data : res;
};

export const getCities = async () => {
  const res = await api.get('/cities');
  return res && res.data ? res.data : [];
};

export const getPlannerCustomizations = async () => {
  const res = await api.get('/planner/customizations');
  return res && res.data ? res.data : [];
};

export const updateCustomizationStatus = async (id, status) => {
  const res = await api.patch(`/planner/customizations/${id}/status`, { status });
  return res && res.data ? res.data : res;
};

export const updateCustomizationRequest = async (id, data) => {
  const res = await api.put(`/planner/customizations/${id}`, data);
  return res && res.data ? res.data : res;
};

export const sendCustomizationQuotation = async (id) => {
  const res = await api.post(`/planner/customizations/${id}/quote`);
  return res && res.data ? res.data : res;
};
