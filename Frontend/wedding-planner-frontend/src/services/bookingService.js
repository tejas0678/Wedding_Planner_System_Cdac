import api from './api';

export const getBookings = async () => {
  const res = await api.get('/client/bookings');
  return res && res.data ? res.data : [];
};

export const getBookingHistory = async () => {
  return await getBookings();
};

export const createBooking = async (bookingData) => {
  console.log(">>> [BOOKING REQUEST PAYLOAD]:", JSON.stringify(bookingData, null, 2));
  const res = await api.post('/client/bookings', bookingData);
  return res && res.data ? res.data : res;
};

export const submitCustomizationRequest = async (bookingId, customizationData) => {
  console.log(">>> [CUSTOMIZATION REQUEST]:", JSON.stringify(customizationData, null, 2));
  const res = await api.post(`/client/bookings/${bookingId}/customize`, customizationData);
  return res && res.data ? res.data : res;
};

export const removeBooking = async (bookingId) => {
  const res = await api.delete(`/client/bookings/${bookingId}`);
  return res && res.data ? res.data : res;
};

export const removePendingBooking = removeBooking;

export const approveCustomization = async (id) => {
  const res = await api.put(`/client/bookings/customizations/${id}/approve`);
  return res && res.data ? res.data : res;
};

export const rejectCustomization = async (id) => {
  const res = await api.put(`/client/bookings/customizations/${id}/reject`);
  return res && res.data ? res.data : res;
};
