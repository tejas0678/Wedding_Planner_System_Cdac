// Placeholder API service – replace with real API calls later

const delay = (ms = 500) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function getDashboardStats() {
  await delay();

  return {
    totalClients: 0,
    totalPlanners: 0,
    totalWeddings: 0,
    totalPackages: 0,
    pendingBookings: 0,
    recentActivities: [],
    topPlanners: [],
  };
}
export async function getClients() {
  await delay();
  return [];
}

export async function getPlanners() {
  await delay();
  return [];
}
export async function getBookings() {
  await delay();
  return [];
}
export async function getPackages() {
  await delay();
  return [];
}
