import api from './api';

export async function login(credentials) {
  const res = await api.post('/auth/login', credentials);
  if (res && res.success && res.data) {
    const { token, role, userName, userEmail, userId } = res.data;
    localStorage.setItem('authToken', token);
    localStorage.setItem('userRole', role || 'USER');
    localStorage.setItem('userName', userName || credentials.email.split('@')[0]);
    localStorage.setItem('userEmail', userEmail || credentials.email);
    localStorage.setItem('userId', userId || 1);
    return res;
  }
  throw new Error(res?.message || 'Login failed');
}

export async function registerClient(data) {
  const res = await api.post('/auth/register/client', data);
  if (res && res.success) {
    return res;
  }
  throw new Error(res?.message || 'Client registration failed');
}

export async function registerPlanner(data) {
  const res = await api.post('/auth/register/planner', data);
  if (res && res.success) {
    return res;
  }
  throw new Error(res?.message || 'Planner registration failed');
}

export async function forgotPassword(email) {
  return await api.post('/auth/forgot-password', { email });
}

export async function verifyOtp(email, otp) {
  return await api.post('/auth/verify-otp', { email, otp });
}

export async function resetPassword(data) {
  return await api.post('/auth/reset-password', data);
}

export function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userId');
}
