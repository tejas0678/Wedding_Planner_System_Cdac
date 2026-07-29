import api from './api';
import { getBookings, createBooking as createBookingService, removeBooking as removeBookingService } from './bookingService';

const fetchMockData = async (fileName) => {
  const res = await fetch(`/mock/${fileName}`);
  return await res.json();
};

export async function getClientProfile() {
  try {
    const res = await api.get('/client/profile');
    if (res && res.data) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, returning client profile:", err);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        fullName: localStorage.getItem('userName') || 'TEJASSAYANE067',
        email: localStorage.getItem('userEmail') || 'client@gmail.com',
        phone: '+91 98765 43210',
        city: 'Mumbai'
      });
    }, 400);
  });
}

export async function updateClientProfile(data) {
  try {
    const res = await api.put('/client/profile', data);
    if (res && res.data) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, simulating client profile update:", err);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, ...data });
    }, 400);
  });
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

export async function getPublicPackages() {
  try {
    const res = await api.get('/packages');
    if (res && res.data && res.data.length > 0) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, fetching mock public packages:", err);
  }
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('packages.json');
      resolve(data);
    }, 400);
  });
}

export async function getPublicPlanners() {
  try {
    const res = await api.get('/planners');
    if (res && res.data && res.data.length > 0) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, fetching mock public planners:", err);
  }
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('planners.json');
      resolve(data);
    }, 400);
  });
}

export async function getWishlist() {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('wishlist.json');
      resolve(data);
    }, 400);
  });
}

export async function getCustomizationRequests() {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('customizationRequests.json');
      resolve(data);
    }, 400);
  });
}
