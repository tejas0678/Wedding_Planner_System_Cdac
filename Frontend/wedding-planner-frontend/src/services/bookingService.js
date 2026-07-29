import api from './api';

const fetchMockData = async (fileName) => {
  const res = await fetch(`/mock/${fileName}`);
  return await res.json();
};

// Local storage session key for client bookings cache
const LOCAL_BOOKINGS_KEY = 'userBookingsCache';

export const getBookings = async () => {
  try {
    const res = await api.get('/client/bookings');
    if (res && res.data && res.data.length > 0) {
      localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(res.data));
      return res.data;
    }
  } catch (err) {
    console.warn("Backend unavailable, fetching client bookings from local session cache:", err);
  }

  // Session Cache
  const cached = localStorage.getItem(LOCAL_BOOKINGS_KEY);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      if (parsed && parsed.length > 0) return parsed;
    } catch (e) {}
  }

  return new Promise((resolve) => {
    setTimeout(async () => {
      const data = await fetchMockData('bookingHistory.json');
      localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(data));
      resolve(data);
    }, 300);
  });
};

export const getBookingHistory = async () => {
  return await getBookings();
};

export const createBooking = async (bookingData) => {
  const currentEmail = localStorage.getItem('userEmail') || 'client@gmail.com';
  const currentName = localStorage.getItem('userName') || 'TEJASSAYANE067';
  const pkgTitle = bookingData.packageName || bookingData.title || bookingData.name || 'Royal Heritage Destination Package';

  try {
    const res = await api.post('/client/bookings', bookingData);
    if (res && res.data) {
      updateLocalBookingsCache(res.data);
      return res.data;
    }
  } catch (err) {
    console.warn("Backend API unavailable, saving booking to active client session:", err);
  }

  // Get current cache list first to prevent duplicates
  const cachedStr = localStorage.getItem(LOCAL_BOOKINGS_KEY);
  let existingList = [];
  if (cachedStr) {
    try { existingList = JSON.parse(cachedStr); } catch (e) {}
  } else {
    // Load initial mock history if cache is empty
    try {
      existingList = await fetchMockData('bookingHistory.json');
    } catch (e) {}
  }

  // Check if booking already exists for this package name
  const duplicate = existingList.find(
    (b) => (b.packageName === pkgTitle || b.package === pkgTitle) && (b.status === 'Pending' || b.status === 'PENDING')
  );

  if (duplicate) {
    console.log("Booking already exists in Pending status:", duplicate);
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(existingList));
    return duplicate;
  }

  const generatedId = `WPB-${Math.floor(100000 + Math.random() * 900000)}`;

  const newBooking = {
    id: generatedId,
    bookingNumber: generatedId,
    clientName: currentName,
    clientEmail: currentEmail,
    planner: bookingData.plannerName || bookingData.planner || 'Royal Touch Weddings Studio',
    plannerName: bookingData.plannerName || bookingData.planner || 'Royal Touch Weddings Studio',
    plannerPhone: '+91 98765 11111',
    package: pkgTitle,
    packageName: pkgTitle,
    status: 'Pending',
    amount: bookingData.amount || bookingData.price || '₹7,65,600',
    plannerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200',
    venue: bookingData.venue || 'The Leela Palace Resort',
    location: bookingData.location || 'Udaipur, Rajasthan',
    guestCount: bookingData.guestCount || '300 Guests',
    countdownDays: 120,
    paymentStatus: 'Pending',
    stageText: 'Stage 1 of 8: Booking Request Submitted'
  };

  // Prepend new booking without duplicate entries
  const updatedList = [newBooking, ...existingList.filter(b => b.id !== newBooking.id)];
  localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(updatedList));

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(newBooking);
    }, 300);
  });
};

export const removeBooking = async (bookingId) => {
  try {
    await api.delete(`/client/bookings/${bookingId}`);
  } catch (err) {
    console.warn("Backend API unavailable, removing booking from local session:", err);
  }

  const cachedStr = localStorage.getItem(LOCAL_BOOKINGS_KEY);
  if (cachedStr) {
    try {
      let existingList = JSON.parse(cachedStr);
      existingList = existingList.filter(
        (b) => b.id !== bookingId && b.bookingNumber !== bookingId
      );
      localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(existingList));
    } catch (e) {}
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Booking removed successfully' });
    }, 300);
  });
};

export const removePendingBooking = removeBooking;

function updateLocalBookingsCache(newBooking) {
  try {
    const cachedStr = localStorage.getItem(LOCAL_BOOKINGS_KEY);
    let cachedList = cachedStr ? JSON.parse(cachedStr) : [];
    cachedList = cachedList.filter(b => (b.id !== newBooking.id && b.bookingNumber !== newBooking.bookingNumber));
    cachedList.unshift(newBooking);
    localStorage.setItem(LOCAL_BOOKINGS_KEY, JSON.stringify(cachedList));
  } catch (e) {
    console.error("Failed to update local bookings cache:", e);
  }
}
