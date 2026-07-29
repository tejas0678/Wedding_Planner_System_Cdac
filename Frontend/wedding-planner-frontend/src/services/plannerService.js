import api from './api';

const fetchMockData = async (fileName) => {
  const res = await fetch(`/mock/${fileName}`);
  return await res.json();
};

export const getPlanners = async () => {
  try {
    const res = await api.get('/planners');
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
};

export const getPlannerById = async (id) => {
  try {
    const res = await api.get(`/planners/${id}`);
    if (res && res.data) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, fetching mock planner details:", err);
  }
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('plannerDetails.json');
      resolve(data);
    }, 400);
  });
};

export const getPlannerDashboardStats = async () => {
  try {
    const res = await api.get('/planner/dashboard/stats');
    if (res && res.data) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, fetching mock planner dashboard stats:", err);
  }
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('plannersDashboard.json');
      resolve(data);
    }, 400);
  });
};

export const getPlannerProfile = async () => {
  try {
    const res = await api.get('/planner/profile');
    if (res && res.data) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, fetching mock planner profile:", err);
  }
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('plannerDetails.json');
      resolve(data);
    }, 400);
  });
};

export const updatePlannerProfile = async (data) => {
  try {
    const res = await api.put('/planner/profile', data);
    if (res && res.data) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, simulating planner profile update:", err);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, ...data });
    }, 400);
  });
};

export const getPlannerPackages = async () => {
  try {
    const res = await api.get('/planner/packages');
    if (res && res.data && res.data.length > 0) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, fetching mock packages:", err);
  }
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('packages.json');
      resolve(data);
    }, 400);
  });
};

export const createPlannerPackage = async (packageData) => {
  try {
    const res = await api.post('/planner/packages', packageData);
    if (res && res.data) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, simulating package creation:", err);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: Date.now(), ...packageData });
    }, 400);
  });
};

export const getPlannerServices = async () => {
  try {
    const res = await api.get('/planner/services');
    if (res && res.data && res.data.length > 0) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, fetching mock services:", err);
  }
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('services.json');
      resolve(data);
    }, 400);
  });
};

export const createPlannerService = async (serviceData) => {
  try {
    const res = await api.post('/planner/services', serviceData);
    if (res && res.data) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, simulating service creation:", err);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: Date.now(), ...serviceData });
    }, 400);
  });
};

export const getPlannerPortfolio = async () => {
  try {
    const res = await api.get('/planner/portfolio');
    if (res && res.data && res.data.length > 0) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, fetching mock portfolio:", err);
  }
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('plannerDetails.json');
      resolve(data.gallery || []);
    }, 400);
  });
};

export const createPortfolioItem = async (portfolioData) => {
  try {
    const res = await api.post('/planner/portfolio', portfolioData);
    if (res && res.data) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, simulating portfolio item creation:", err);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ id: Date.now(), ...portfolioData });
    }, 400);
  });
};

export const deletePortfolioItem = async (id) => {
  try {
    const res = await api.delete(`/planner/portfolio/${id}`);
    if (res && res.data) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, simulating portfolio item deletion:", err);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, id });
    }, 400);
  });
};

export const getPlannerBookings = async () => {
  try {
    const res = await api.get('/planner/bookings');
    if (res && res.data && res.data.length > 0) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, fetching mock planner bookings:", err);
  }
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('bookingHistory.json');
      resolve(data);
    }, 400);
  });
};

export const updateBookingStatus = async (bookingId, status) => {
  try {
    const res = await api.put(`/planner/bookings/${bookingId}/status?status=${status}`);
    if (res && res.data) return res.data;
  } catch (err) {
    console.warn("Backend unavailable, simulating booking status update:", err);
  }
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, bookingId, status });
    }, 400);
  });
};

export const getCities = async () => {
  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('cities.json');
      resolve(data);
    }, 400);
  });
};
