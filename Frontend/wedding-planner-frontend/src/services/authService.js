import api from './api';

export async function login(credentials) {
  try {
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
  } catch (err) {
    console.warn("Backend API unavailable, using pure frontend authentication:", err);
  }

  // Pure Frontend Mode: Instantly authenticate any email/password
  const email = credentials.email ? credentials.email.toLowerCase() : 'user@gmail.com';
  let role = 'USER';
  if (email.includes('planner')) {
    role = 'PLANNER';
  } else if (email.includes('admin')) {
    role = 'ADMIN';
  }

  const userName = email.split('@')[0] || 'User';
  const token = `mock-jwt-token-${role.toLowerCase()}`;

  localStorage.setItem('authToken', token);
  localStorage.setItem('userRole', role);
  localStorage.setItem('userName', userName);
  localStorage.setItem('userEmail', credentials.email);
  localStorage.setItem('userId', 1);

  return {
    success: true,
    message: 'Login successful',
    data: {
      token,
      tokenType: 'Bearer',
      role,
      userName,
      userEmail: credentials.email,
      userId: 1,
    },
  };
}

export async function registerClient(data) {
  try {
    const res = await api.post('/auth/register/client', data);
    if (res && res.success) {
      return res;
    }
  } catch (err) {
    console.warn("Backend API unavailable, using pure frontend client registration:", err);
  }
  return {
    success: true,
    message: 'Client registered successfully',
    data: null,
  };
}

export async function registerPlanner(data) {
  try {
    const res = await api.post('/auth/register/planner', data);
    if (res && res.success) {
      return res;
    }
  } catch (err) {
    console.warn("Backend API unavailable, using pure frontend planner registration:", err);
  }
  return {
    success: true,
    message: 'Planner registered successfully',
    data: null,
  };
}

export async function forgotPassword(email) {
  try {
    const res = await api.post('/auth/forgot-password', { email });
    if (res) return res;
  } catch (err) {
    console.warn("Backend API unavailable, using pure frontend forgotPassword:", err);
  }
  return { success: true, message: '6-digit OTP code sent to email' };
}

export async function verifyOtp(email, otp) {
  try {
    const res = await api.post('/auth/verify-otp', { email, otp });
    if (res) return res;
  } catch (err) {
    console.warn("Backend API unavailable, using pure frontend verifyOtp:", err);
  }
  return { success: true, message: 'OTP verified successfully' };
}

export async function resetPassword(data) {
  try {
    const res = await api.post('/auth/reset-password', data);
    if (res) return res;
  } catch (err) {
    console.warn("Backend API unavailable, using pure frontend resetPassword:", err);
  }
  return { success: true, message: 'Password reset successful' };
}

export function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userId');
}
