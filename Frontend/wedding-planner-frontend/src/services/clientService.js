import api from './api';
import { getBookings, createBooking as createBookingService, removeBooking as removeBookingService } from './bookingService';

export async function getClientProfile() {
  const res = await api.get('/client/profile');
  return res && res.data ? res.data : res;
}

export async function updateClientProfile(data) {
  const res = await api.put('/client/profile', data);
  return res && res.data ? res.data : res;
}

export async function getClientBookings() {
  return await getBookings();
}

export async function createBooking(bookingData) {
  return await createBookingService(bookingData);
}

export async function cancelBooking(bookingId) {
  return await removeBookingService(bookingId);
}

export async function removeBooking(bookingId) {
  return await removeBookingService(bookingId);
}

export async function getPublicPackages(filters = {}) {
  let url = '/packages';
  const params = new URLSearchParams();
  if (filters.plannerId) params.append('plannerId', filters.plannerId);
  if (filters.eventType && filters.eventType !== 'All') params.append('eventType', filters.eventType);
  if (filters.theme && filters.theme !== 'All') params.append('theme', filters.theme);
  if (filters.city && filters.city !== 'All') params.append('city', filters.city);
  if (filters.keyword) params.append('keyword', filters.keyword);

  if (params.toString()) url += `?${params.toString()}`;
  const res = await api.get(url);
  return res && res.data ? res.data : [];
}

export async function getPackageFilters() {
  const res = await api.get('/packages/filters');
  return res && res.data ? res.data : { eventTypes: [], themes: [], cities: [], planners: [] };
}

export async function getPublicPlanners() {
  const res = await api.get('/planners');
  return res && res.data ? res.data : [];
}

export async function getWishlist() {
  const res = await api.get('/client/wishlist');
  return res && res.data ? res.data : [];
}

export async function getCustomizationRequests() {
  const res = await api.get('/client/customization-requests');
  return res && res.data ? res.data : [];
}
