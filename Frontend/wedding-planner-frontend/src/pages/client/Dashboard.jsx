import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FiCalendar, 
  FiSliders, 
  FiMessageSquare, 
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
import { getClientProfile, getClientBookings } from '../../services/clientService';
import { removeBooking } from '../../services/bookingService';

export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('bookings');
  const [loading, setLoading] = useState(true);
  const [clientProfile, setClientProfile] = useState({
    fullName: localStorage.getItem('userName') || 'TEJASSAYANE067',
    email: localStorage.getItem('userEmail') || 'client@gmail.com',
  });
  const [bookingsList, setBookingsList] = useState([]);

  // Modal state
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [paymentModalBooking, setPaymentModalBooking] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [addedCustomItems, setAddedCustomItems] = useState([]);

  // Live Chat State & Handlers
  const [messages, setMessages] = useState([
    { id: 1, sender: 'planner', text: 'Namaste! I have updated your mandap decor layout. Please check the customizer.', time: '10:30 AM' },
    { id: 2, sender: 'client', text: 'Thank you! We love the royal golden floral mandap theme.', time: '10:35 AM' },
    { id: 3, sender: 'planner', text: 'Great! The advance 30% payment option is active on your dashboard.', time: '10:38 AM' }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'client',
      text: newMessage.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setNewMessage('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'planner',
          text: 'Thank you for your message! Royal Touch Weddings Concierge has received your query and will update your customizer details shortly.',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
    }, 800);
  };

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
  }, []);

  const handleRemoveBooking = async (bookingId) => {
    if (window.confirm("Are you sure you want to remove this pending booking request?")) {
      try {
        await removeBooking(bookingId);
        setBookingsList((prev) => prev.filter((b) => b.id !== bookingId && b.bookingNumber !== bookingId));
      } catch (err) {
        console.error("Failed to remove booking:", err);
      }
    }
  };

  const handleSimulatePayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setPaymentSuccess(false);
      setPaymentModalBooking(null);
      alert('Payment of 30% Advance Successful! Receipt saved to your account.');
    }, 1500);
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
          onClick={() => setActiveTab('chat')}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
            activeTab === 'chat'
              ? 'bg-[#EC3664] text-white shadow-sm'
              : 'text-[#EC3664] hover:bg-rose-50/50'
          }`}
        >
          <FiMessageSquare className="w-4 h-4" />
          <span>Live Planner Chat</span>
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
                  onCustomizePackage={() => setActiveTab('customizer')}
                  onContactPlanner={() => setActiveTab('chat')}
                  onViewInvoice={(booking) => setSelectedInvoice(booking)}
                  onPayAdvance={(booking) => setPaymentModalBooking(booking)}
                  onRemoveBooking={(bId) => handleRemoveBooking(bId)}
                />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-2xs">
              <span className="text-4xl block mb-3">📅</span>
              <h3 className="font-serif text-xl font-bold text-gray-900 mb-1">No Booking Requests Found</h3>
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

      {/* TAB 5: LIVE PLANNER CHAT */}
      {activeTab === 'chat' && (
        <div className="bg-white rounded-3xl border border-rose-100/80 overflow-hidden shadow-xs flex flex-col h-[600px]">
          
          {/* Chat Header */}
          <div className="bg-[#FFF5F7] px-6 py-4 border-b border-rose-100/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200"
                alt="Planner Avatar"
                className="w-10 h-10 rounded-full object-cover border border-rose-200"
              />
              <div>
                <h3 className="font-bold text-gray-900 text-sm">Royal Touch Weddings Studio</h3>
                <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse"></span>
                  Online • Wedding Concierge
                </span>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[#FAF8F9]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${m.sender === 'client' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-md p-4 rounded-2xl text-xs sm:text-sm font-medium leading-relaxed shadow-2xs ${
                    m.sender === 'client'
                      ? 'bg-[#EC3664] text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[10px] text-gray-400 mt-1 px-1">
                  {m.time}
                </span>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSendMessage} className="p-4 bg-white border-t border-gray-100 flex items-center gap-3">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message to Royal Touch Weddings..."
              className="flex-1 bg-[#FFF9FA] border border-rose-100 rounded-full px-5 py-3 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#EC3664]"
            />
            <button
              type="submit"
              className="bg-[#EC3664] hover:bg-[#d42d57] text-white w-11 h-11 rounded-full flex items-center justify-center shadow-md transition cursor-pointer shrink-0"
            >
              <FiSend className="w-5 h-5" />
            </button>
          </form>

        </div>
      )}

      {/* TAB 6: MY PROFILE & SETTINGS */}
      {activeTab === 'profile' && (
        <div>
          <ProfileForm />
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
      {paymentModalBooking && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            
            <button
              onClick={() => setPaymentModalBooking(null)}
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
                  Pay 30% Advance Payment
                </h3>
                <p className="text-xs text-gray-500 mb-6">
                  {paymentModalBooking.package} ({paymentModalBooking.id})
                </p>

                <div className="bg-rose-50/60 p-4 rounded-2xl mb-6">
                  <span className="text-[10px] font-bold text-gray-400 uppercase block">
                    AMOUNT TO PAY NOW (30%)
                  </span>
                  <span className="font-serif text-3xl font-bold text-[#EC3664]">
                    ₹2,29,680
                  </span>
                </div>

                <button
                  onClick={handleSimulatePayment}
                  className="w-full bg-[#EC3664] hover:bg-[#d42d57] text-white py-3.5 rounded-full font-bold text-xs shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Complete Payment via Razorpay</span>
                </button>
              </div>
            ) : (
              <div className="py-8 text-center">
                <FiCheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4 animate-bounce" />
                <h3 className="text-xl font-bold text-gray-900">Payment Successful!</h3>
                <p className="text-xs text-gray-500 mt-1">Transaction ID: RZP-9938472910</p>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}