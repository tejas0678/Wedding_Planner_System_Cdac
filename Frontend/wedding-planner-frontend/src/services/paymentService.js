import api from './api';

const RAZORPAY_CHECKOUT_SRC = 'https://checkout.razorpay.com/v1/checkout.js';

// Loads the Razorpay Checkout widget script once and caches the in-flight promise so
// repeated "Pay Now" clicks don't inject the script tag more than once.
let razorpayScriptPromise = null;
export function loadRazorpayScript() {
  if (window.Razorpay) return Promise.resolve(true);
  if (razorpayScriptPromise) return razorpayScriptPromise;

  razorpayScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = RAZORPAY_CHECKOUT_SRC;
    script.onload = () => resolve(true);
    script.onerror = () => {
      razorpayScriptPromise = null;
      reject(new Error('Failed to load Razorpay checkout script.'));
    };
    document.body.appendChild(script);
  });
  return razorpayScriptPromise;
}

export const createPaymentOrder = async (bookingId, amount, currency = 'INR') => {
  const res = await api.post('/api/payments/create-order', { bookingId, amount, currency });
  return res && res.data ? res.data : res;
};

export const verifyPayment = async (verifyData) => {
  const res = await api.post('/api/payments/verify', verifyData);
  return res && res.data ? res.data : res;
};

export const getClientPayments = async () => {
  const res = await api.get('/api/payments/client');
  return res && res.data ? res.data : [];
};

export const getPlannerPayments = async () => {
  const res = await api.get('/api/payments/planner');
  return res && res.data ? res.data : [];
};
