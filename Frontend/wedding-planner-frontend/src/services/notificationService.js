import api from './api';

export const getNotifications = async (page = 0, size = 20) => {
  const res = await api.get(`/notifications?page=${page}&size=${size}`);
  return res && res.data ? res.data : { content: [], totalElements: 0 };
};

export const getUnreadNotifications = async () => {
  const res = await api.get('/notifications/unread');
  return res && res.data ? res.data : [];
};

export const getUnreadCount = async () => {
  const res = await api.get('/notifications/unread-count');
  return res && typeof res.data === 'number' ? res.data : 0;
};

export const markAsRead = async (id) => {
  const res = await api.put(`/notifications/${id}/read`);
  return res && res.data ? res.data : res;
};

export const markAllAsRead = async () => {
  const res = await api.put('/notifications/read-all');
  return res && res.data ? res.data : res;
};

export const deleteNotification = async (id) => {
  const res = await api.delete(`/notifications/${id}`);
  return res && res.data ? res.data : res;
};

export const deleteAllNotifications = async () => {
  const res = await api.delete('/notifications');
  return res && res.data ? res.data : res;
};
