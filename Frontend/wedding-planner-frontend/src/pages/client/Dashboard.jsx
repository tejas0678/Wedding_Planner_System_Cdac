import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiCalendar, 
  FiSliders, 
  FiUser, 
  FiCamera, 
  FiEdit, 
  FiSend,
  FiX,
  FiPrinter,
  FiCreditCard,
  FiCheckCircle,
  FiStar,
  FiHeart
} from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { FaHeart } from 'react-icons/fa';
import BookingCard from '../../components/client/BookingsCard';
import ProfileForm from '../../components/client/ProfileForm';
import PackageCustomizerPage from '../../components/client/PackageCustomizerPage';
import FeedbackReviewSection from '../../components/client/FeedbackReviewSection';
import { getClientProfile, updateClientProfile, getClientBookings } from '../../services/clientService';
import { removeBooking, approveCustomization, rejectCustomization } from '../../services/bookingService';
import { createPaymentOrder, verifyPayment, loadRazorpayScript } from '../../services/paymentService';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [loading, setLoading] = useState(true);
  const [clientProfile, setClientProfile] = useState({
    fullName: localStorage.getItem('userName') || '',
    email: localStorage.getItem('userEmail') || '',
  });
  const [bookingsList, setBookingsList] = useState([]);
  const [customizingBooking, setCustomizingBooking] = useState(null);

  // Modal state
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentModalBooking, setPaymentModalBooking] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentProcessing, setPaymentProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState('');
  const [paymentReceipt, setPaymentReceipt] = useState(null);
  const [addedCustomItems, setAddedCustomItems] = useState([]);
  const [selectedQuotation, setSelectedQuotation] = useState(null);


  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const profile = await getClientProfile();
      if (profile) setClientProfile(profile);

      const bookings = await getClientBookings();
      if (bookings && bookings.length > 0) {
        setBookingsList(bookings);
      } else {
        setBookingsList([]);
      }
    } catch (err) {
      console.error("Error loading client dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, [activeTab]);

  const handleProfileUpdate = async (updatedData) => {
    try {
      const updated = await updateClientProfile(updatedData);
      if (updated) {
        setClientProfile(updated);
        localStorage.setItem('userName', updated.fullName || updated.name);
        alert('Profile updated successfully!');
      }
    } catch (err) {
      console.error('Failed to update profile:', err);
      alert('Failed to update profile. Please try again.');
    }
  };

  const handleRemoveBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to remove this pending booking request?")) {
      try {
        await removeBooking(bookingId);
        setBookingsList((prev) => prev.filter((b) => b.id !== bookingId && b.bookingId !== bookingId));
      } catch (err) {
        console.error("Failed to remove booking:", err);
      }
    }
  };

  const handleApproveQuotation = async (quotationId) => {
    try {
      await approveCustomization(quotationId);
      alert('Quotation approved! You can now proceed to payment.');
      setSelectedQuotation(null);
      fetchDashboardData();
    } catch (err) {
      console.error(err);
      alert('Failed to approve quotation.');
    }
  };

  const handleRejectQuotation = async (quotationId) => {
    if (window.confirm('Are you sure you want to reject this quotation?')) {
      try {
        await rejectCustomization(quotationId);
        alert('Quotation rejected.');
        setSelectedQuotation(null);
        fetchDashboardData();
      } catch (err) {
        console.error(err);
        alert('Failed to reject quotation.');
      }
    }
  };

  const closePaymentModal = () => {
    setPaymentModalBooking(null);
    setPaymentSuccess(false);
    setPaymentProcessing(false);
    setPaymentError('');
    setPaymentReceipt(null);
  };

  const handlePayNow = async () => {
    if (!paymentModalBooking) return;
    const bookingId = paymentModalBooking.id;
    const totalAmount = Number(paymentModalBooking.totalAmount) || 0;
    const paidAmount = Number(paymentModalBooking.paidAmount) || 0;
    const amountDue = Math.max(0, totalAmount - paidAmount);

    if (!amountDue) {
      setPaymentError('There is nothing due on this booking.');
      return;
    }

    setPaymentError('');
    setPaymentProcessing(true);

    try {
      await loadRazorpayScript();
      const order = await createPaymentOrder(bookingId, amountDue);

      const razorpay = new window.Razorpay({
        key: order.key,
        amount: Math.round(order.amount * 100),
        currency: order.currency,
        order_id: order.orderId,
        name: 'Wedding Planner',
        description: paymentModalBooking.packageName || 'Booking Payment',
        prefill: {
          name: clientProfile?.fullName || localStorage.getItem('userName') || '',
          email: clientProfile?.email || localStorage.getItem('userEmail') || '',
        },
        theme: { color: '#EC3664' },
        handler: async (response) => {
          try {
            const result = await verifyPayment({
              bookingId,
              razorpayOrderId: response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            });

            if (result && result.success) {
              setPaymentReceipt(result);
              setPaymentSuccess(true);
              fetchDashboardData();
            } else {
              setPaymentError(result?.message || 'Payment verification failed. Please contact support if the amount was deducted.');
            }
          } catch (err) {
            console.error(err);
            setPaymentError('Payment verification failed. Please contact support if the amount was deducted.');
          } finally {
            setPaymentProcessing(false);
          }
        },
        modal: {
          ondismiss: () => setPaymentProcessing(false),
        },
      });

      razorpay.on('payment.failed', () => {
        setPaymentProcessing(false);
        setPaymentError('Payment failed. Please try again.');
      });

      razorpay.open();
    } catch (err) {
      console.error(err);
      setPaymentProcessing(false);
      setPaymentError(err?.message || 'Failed to start payment. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 font-medium">
        Loading client dashboard...
      </div>
    );
  }

  return (
    <div>
      
      {/* 1. HERO HEADER CARD (BRIDE & GROOM PORTAL) */}
      <div className="bg-[#4E0A1A] rounded-3xl p-6 sm:p-8 text-white shadow-xl mb-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-rose-100/10">
        
        {/* Left Couple Info */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-[#EC3664] shadow-md">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400"
                alt="Client Avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <button 
              onClick={() => setActiveTab('profile')}
              className="absolute bottom-0 right-0 w-7 h-7 bg-[#EC3664] text-white rounded-full flex items-center justify-center text-xs shadow-md hover:scale-110 transition cursor-pointer"
            >
              <FiCamera className="w-4 h-4" />
            </button>
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2B13C]/20 border border-[#E2B13C]/40 text-[#E2B13C] text-[11px] font-bold tracking-wider uppercase mb-2">
              <span>✨ Bride & Groom Portal</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              {clientProfile.fullName || "TEJASSAYANE067"}
            </h1>

            <p className="text-rose-100/80 text-sm font-light mt-1">
              Welcome to your personal wedding dashboard
            </p>
          </div>

        </div>

        {/* Right Action Button */}
        <button
          onClick={() => setActiveTab('profile')}
          className="bg-[#EC8D15] hover:bg-[#d47b0e] text-white px-6 py-3 rounded-full text-xs font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 shrink-0 cursor-pointer"
        >
          <FiEdit className="w-4 h-4" />
          <span>Edit Profile & Settings</span>
        </button>

      </div>

      {/* 2. SECONDARY NAVIGATION BAR (TABS) */}
      <div className="bg-white shadow-xs border border-rose-100/60 rounded-2xl p-2 mb-8 flex flex-wrap items-center gap-2">
        
        <button
          onClick={() => setActiveTab('bookings')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'bookings'
              ? 'bg-[#EC3664] text-white shadow-sm'
              : 'text-gray-700 hover:text-[#EC3664] hover:bg-rose-50/50'
          }`}
        >
          <FiCalendar className="w-4 h-4" />
          <span>Booking History ({bookingsList.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('customizer')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'customizer'
              ? 'bg-[#EC3664] text-white shadow-sm'
              : 'text-gray-700 hover:text-[#EC3664] hover:bg-rose-50/50'
          }`}
        >
          <FiSliders className="w-4 h-4" />
          <span>Package Customizer</span>
        </button>

        <button
          onClick={() => setActiveTab('feedback')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'feedback'
              ? 'bg-[#EC3664] text-white shadow-sm'
              : 'text-gray-700 hover:text-[#EC3664] hover:bg-rose-50/50'
          }`}
        >
          <FiStar className="w-4 h-4 text-amber-400" />
          <span>Feedback & Reviews</span>
        </button>


        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'profile'
              ? 'bg-[#EC3664] text-white shadow-sm'
              : 'text-gray-700 hover:text-[#EC3664] hover:bg-rose-50/50'
          }`}
        >
          <FiUser className="w-4 h-4" />
          <span>Profile & Settings</span>
        </button>

      </div>

      {/* 3. TAB CONTENT */}

      {/* TAB 1: BOOKING HISTORY */}
      {activeTab === 'bookings' && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-3xl font-bold text-gray-900">
              Your Booking History
            </h2>
            <span className="text-xs font-bold text-gray-500">
              {bookingsList.length} Active Weddings
            </span>
          </div>

          {bookingsList.length > 0 ? (
            <div className="space-y-8">
              {bookingsList.map((b) => (
                <BookingCard 
                  key={b.id || b.bookingNumber} 
                  booking={b} 
                  onCustomizePackage={() => {
                    setCustomizingBooking(b);
                    setActiveTab('customizer');
                  }}
                  onViewInvoice={(booking) => setSelectedInvoice(booking)}
                  onPayAdvance={(booking) => setPaymentModalBooking(booking)}
                  onRemoveBooking={(bId) => handleRemoveBooking(bId)}
                  onViewQuotation={(quotation) => setSelectedQuotation(quotation)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-2xs">
              <span className="text-4xl block mb-3">📅</span>
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-1">No bookings found.</h3>
              <p className="text-xs text-gray-500 mb-4">You have not requested any wedding package bookings yet.</p>
              <button
                onClick={() => navigate('/packages')}
                className="bg-[#EC3664] hover:bg-[#d42d57] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-xs cursor-pointer"
              >
                Browse Packages
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 2: PACKAGE CUSTOMIZER */}
      {activeTab === 'customizer' && (
        <PackageCustomizerPage 
          booking={customizingBooking}
          addedCustomItems={addedCustomItems}
          onSubmitCustomization={() => {
            fetchDashboardData();
            setActiveTab('bookings');
          }}
        />
      )}

      {/* TAB 4: FEEDBACK & REVIEWS */}
      {activeTab === 'feedback' && (
        <FeedbackReviewSection />
      )}


      {/* TAB 6: MY PROFILE & SETTINGS */}
      {activeTab === 'profile' && (
        <div>
          <ProfileForm userData={clientProfile} onUpdate={handleProfileUpdate} />
        </div>
      )}

      {/* MODAL 1: TAX INVOICE */}
      {selectedInvoice && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setSelectedInvoice(null)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 p-2"
            >
              <FiX className="w-5 h-5" />
            </button>

            <div className="border-b border-gray-100 pb-6 mb-6">
              <span className="text-xs font-bold text-[#EC3664] tracking-widest uppercase">
                OFFICIAL TAX INVOICE
              </span>
              <h3 className="font-serif text-2xl font-bold text-gray-900 mt-1">
                {selectedInvoice.package}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5">
                Invoice #{selectedInvoice.id} • Date: July 28, 2026
              </p>
            </div>

            <div className="space-y-4 text-xs sm:text-sm mb-8">
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-600">Planner Studio</span>
                <span className="font-bold text-gray-900">{selectedInvoice.planner}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-600">Base Package Cost</span>
                <span className="font-semibold text-gray-900">₹6,48,813</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-50">
                <span className="text-gray-600">GST (18%)</span>
                <span className="font-semibold text-gray-900">₹1,16,787</span>
              </div>
              <div className="flex justify-between py-3 border-t border-gray-200 text-base font-bold">
                <span className="text-gray-900">Total Invoice Amount</span>
                <span className="text-[#EC3664] font-serif">{selectedInvoice.amount}</span>
              </div>
            </div>

            <button
              onClick={() => {
                alert('Tax Invoice downloaded successfully!');
                setSelectedInvoice(null);
              }}
              className="w-full bg-[#EC3664] hover:bg-[#d42d57] text-white py-3 rounded-full font-bold text-xs flex items-center justify-center gap-2 shadow-md"
            >
              <FiPrinter className="w-4 h-4" />
              <span>Download Invoice PDF</span>
            </button>

          </div>
        </div>
      )}

      {/* MODAL 2: RAZORPAY PAYMENT GATEWAY */}
      {paymentModalBooking && (() => {
        const totalAmount = Number(paymentModalBooking.totalAmount) || 0;
        const paidAmount = Number(paymentModalBooking.paidAmount) || 0;
        const amountDue = Math.max(0, totalAmount - paidAmount);

        return (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">

              <button
                onClick={closePaymentModal}
                className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 p-2"
              >
                <FiX className="w-5 h-5" />
              </button>

              {!paymentSuccess ? (
                <div>
                  <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider mb-2">
                    <FiCreditCard className="w-4 h-4" />
                    <span>Razorpay Secure Gateway</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-gray-900 mb-1">
                    Pay Now
                  </h3>
                  <p className="text-xs text-gray-500 mb-6">
                    {paymentModalBooking.packageName} ({paymentModalBooking.bookingId})
                  </p>

                  <div className="bg-rose-50/60 p-4 rounded-2xl mb-6">
                    <span className="text-[10px] font-bold text-gray-400 uppercase block">
                      AMOUNT TO PAY NOW
                    </span>
                    <span className="font-serif text-3xl font-bold text-[#EC3664]">
                      ₹{amountDue.toLocaleString('en-IN')}
                    </span>
                  </div>

                  {paymentError && (
                    <p className="text-xs font-bold text-rose-600 bg-rose-50 border border-rose-200 rounded-xl px-4 py-3 mb-4">
                      {paymentError}
                    </p>
                  )}

                  <button
                    onClick={handlePayNow}
                    disabled={paymentProcessing}
                    className="w-full bg-[#EC3664] hover:bg-[#d42d57] disabled:opacity-60 disabled:cursor-not-allowed text-white py-3.5 rounded-full font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{paymentProcessing ? 'Processing...' : 'Complete Payment via Razorpay'}</span>
                  </button>
                </div>
              ) : (
                <div className="py-8 text-center">
                  <FiCheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
                  <h3 className="text-xl font-bold text-gray-900">Your payment has been completed successfully.</h3>
                  <div className="mt-4 text-left bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 text-xs text-gray-600 space-y-1">
                    <p><span className="font-bold text-gray-800">Payment ID:</span> {paymentReceipt?.paymentId}</p>
                    <p><span className="font-bold text-gray-800">Transaction ID:</span> {paymentReceipt?.razorpayPaymentId}</p>
                    <p><span className="font-bold text-gray-800">Payment Date:</span> {paymentReceipt?.transactionDate ? new Date(paymentReceipt.transactionDate).toLocaleString('en-IN') : '--'}</p>
                    <p><span className="font-bold text-gray-800">Amount Paid:</span> ₹{Number(paymentReceipt?.amount || 0).toLocaleString('en-IN')}</p>
                  </div>
                  <button
                    onClick={closePaymentModal}
                    className="mt-6 bg-[#EC3664] hover:bg-[#d42d57] text-white px-6 py-2.5 rounded-full text-xs font-bold transition cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              )}

            </div>
          </div>
        );
      })()}

      {/* QUOTATION MODAL */}
      {selectedQuotation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl relative my-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-serif text-3xl font-bold text-gray-900">
                  Customization Quotation
                </h3>
                <span className="inline-block mt-2 text-[10px] font-bold px-3 py-1 rounded-full uppercase bg-emerald-100 text-emerald-700">
                  {selectedQuotation.status}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Total Amount</span>
                <span className="font-serif text-3xl font-bold text-[#EC3664]">₹{selectedQuotation.updatedPrice ? selectedQuotation.updatedPrice.toLocaleString('en-IN') : '0'}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
              <div className="grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
                <div><span className="font-bold text-gray-500 block text-xs">Food Preference</span>{selectedQuotation.foodPreference || 'N/A'}</div>
                <div><span className="font-bold text-gray-500 block text-xs">Welcome Drink</span>{selectedQuotation.welcomeDrink ? `${selectedQuotation.drinkName} (x${selectedQuotation.drinkQuantity})` : 'No'}</div>
                <div><span className="font-bold text-gray-500 block text-xs">Pre-Wed Shoot</span>{selectedQuotation.preWeddingShoot ? `${selectedQuotation.shootLocation} (${selectedQuotation.shootDuration})` : 'No'}</div>
                <div><span className="font-bold text-gray-500 block text-xs">DJ / Sound</span>{selectedQuotation.djRequired ? selectedQuotation.djType : 'No'}</div>
                <div><span className="font-bold text-gray-500 block text-xs">Cinematic Video</span>{selectedQuotation.cinematicVideo ? 'Yes' : 'No'}</div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                <span className="font-bold text-gray-700 block text-sm mb-2">Planner's Message & Notes</span>
                <div className="bg-white p-4 rounded-xl border border-gray-100 text-sm text-gray-600 whitespace-pre-wrap">
                  {selectedQuotation.plannerNotes || 'No additional notes provided by the planner.'}
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-100">
              <button onClick={() => setSelectedQuotation(null)} className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition cursor-pointer">Close</button>
              {selectedQuotation.status === 'ACCEPTED' && (
                <>
                  <button onClick={() => handleRejectQuotation(selectedQuotation.id)} className="px-6 py-2.5 rounded-full text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition cursor-pointer">Reject</button>
                  <button onClick={() => handleApproveQuotation(selectedQuotation.id)} className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition cursor-pointer">Approve Quotation</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}