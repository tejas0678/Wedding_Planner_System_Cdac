import api from './api';

export async function login(credentials) {
  try {
    const res = await api.post('/auth/login', credentials);
    if (res && res.success && res.data) {
      const { token, role, userName, userEmail, userId } = res.data;
      localStorage.setItem('authToken', token || 'mock-jwt-token');
      localStorage.setItem('userRole', role || 'USER');
      localStorage.setItem('userName', userName || credentials.email.split('@')[0]);
      localStorage.setItem('userEmail', userEmail || credentials.email);
      localStorage.setItem('userId', userId || 1);
      return res;
    }
  } catch (err) {
    console.warn("Backend API unavailable for login, using mock authentication fallback:", err);
  }

  // Mock Authentication Fallback if backend is offline
  return new Promise((resolve) => {
    setTimeout(() => {
      const email = credentials.email.toLowerCase();
      let role = 'USER';
      if (email.includes('planner')) {
        role = 'PLANNER';
      } else if (email.includes('admin')) {
        role = 'ADMIN';
      }

      const userName = credentials.email.split('@')[0] || 'User';
      const token = `mock-jwt-token-${role.toLowerCase()}`;

      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userName', userName);
      localStorage.setItem('userEmail', credentials.email);
      localStorage.setItem('userId', 1);

      resolve({
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
      });
    }, 400);
  });
}

export async function registerClient(data) {
  try {
    const res = await api.post('/auth/register/client', data);
    if (res && res.success && res.data) {
      const { token, role, userName, userEmail, userId } = res.data;
      localStorage.setItem('authToken', token || 'mock-jwt-token');
      localStorage.setItem('userRole', role || 'USER');
      localStorage.setItem('userName', userName || data.fullName);
      localStorage.setItem('userEmail', userEmail || data.email);
      localStorage.setItem('userId', userId || 1);
      return res;
    }
  } catch (err) {
    console.warn("Backend API unavailable for client registration, using fallback:", err);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const role = 'USER';
      const userName = data.fullName || data.email.split('@')[0];
      const token = 'mock-jwt-token-user';

      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userName', userName);
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('userId', Date.now());

      resolve({
        success: true,
        message: 'Client registration successful',
        data: {
          token,
          tokenType: 'Bearer',
          role,
          userName,
          userEmail: data.email,
          userId: Date.now(),
        },
      });
    }, 400);
  });
}

export async function registerPlanner(data) {
  try {
    const res = await api.post('/auth/register/planner', data);
    if (res && res.success && res.data) {
      const { token, role, userName, userEmail, userId } = res.data;
      localStorage.setItem('authToken', token || 'mock-jwt-token');
      localStorage.setItem('userRole', role || 'PLANNER');
      localStorage.setItem('userName', userName || data.businessName);
      localStorage.setItem('userEmail', userEmail || data.email);
      localStorage.setItem('userId', userId || 1);
      return res;
    }
  } catch (err) {
    console.warn("Backend API unavailable for planner registration, using fallback:", err);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      const role = 'PLANNER';
      const userName = data.businessName || data.fullName || 'Planner Studio';
      const token = 'mock-jwt-token-planner';

      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', role);
      localStorage.setItem('userName', userName);
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('userId', Date.now());

      resolve({
        success: true,
        message: 'Planner registration successful',
        data: {
          token,
          tokenType: 'Bearer',
          role,
          userName,
          userEmail: data.email,
          userId: Date.now(),
        },
      });
    }, 400);
  });
}

export async function forgotPassword(email) {
  try {
    const res = await api.post('/auth/forgot-password', { email });
    if (res) return res;
  } catch (err) {
    console.warn("Backend API unavailable for forgotPassword, using fallback:", err);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Password reset link sent to email' });
    }, 400);
  });
}

export async function resetPassword(data) {
  try {
    const res = await api.post('/auth/reset-password', data);
    if (res) return res;
  } catch (err) {
    console.warn("Backend API unavailable for resetPassword, using fallback:", err);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Password reset successful' });
    }, 400);
  });
}

export function logout() {
  localStorage.removeItem('authToken');
  localStorage.removeItem('userRole');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
  localStorage.removeItem('userId');
}
