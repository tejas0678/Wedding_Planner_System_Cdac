import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FiMail, FiLock, FiKey, FiArrowLeft, FiCheckCircle, FiShield } from "react-icons/fi";
import { forgotPassword as forgotPasswordApi, verifyOtp as verifyOtpApi, resetPassword as resetPasswordApi } from "../../services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [step, setStep] = useState(1); // 1: Send OTP, 2: Verify OTP, 3: Reset Password
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState({ type: "", text: "" });

  // STEP 1: Send OTP
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMsg({ type: "", text: "" });

    try {
      await forgotPasswordApi(email);
      setMsg({ type: "success", text: `6-digit OTP sent to ${email}. Valid for 5 minutes.` });
      setStep(2);
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: err.message || "Failed to send reset code. Please check your email." });
    } finally {
      setLoading(false);
    }
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return;

    if (otp.trim().length < 6) {
      setMsg({ type: "error", text: "Please enter the complete 6-digit OTP code." });
      return;
    }

    setLoading(true);
    setMsg({ type: "", text: "" });

    try {
      await verifyOtpApi(email, otp);
      setMsg({ type: "success", text: "OTP Verified Successfully! Enter your new password." });
      setStep(3);
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: err.message || "Invalid or expired OTP. Please check and try again." });
    } finally {
      setLoading(false);
    }
  };

  // STEP 3: Reset Password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMsg({ type: "error", text: "New password and Confirm password do not match!" });
      return;
    }

    setLoading(true);
    setMsg({ type: "", text: "" });

    try {
      await resetPasswordApi({ email, otp, newPassword });
      setMsg({ type: "success", text: "Password reset successful! Redirecting to login..." });
      setTimeout(() => {
        navigate("/login", { state: { registeredEmail: email, message: "Password updated successfully. Please log in with your new password." } });
      }, 1200);
    } catch (err) {
      console.error(err);
      setMsg({ type: "error", text: "Failed to reset password. Please try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F9] flex flex-col font-sans">
      
      {/* HEADER NAVBAR */}
      <header className="bg-white border-b border-gray-100 px-4 lg:px-8 py-3.5 sticky top-0 z-50 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link to="/home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#EC3664] flex items-center justify-center text-white shadow-md">
              <FaHeart className="w-4 h-4" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-xl font-bold tracking-tight text-[#1F191D]">
                Royal Bliss
              </span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-[#C9972C] uppercase mt-0.5">
                WEDDING PLANNERS
              </span>
            </div>
          </Link>

          <Link to="/login" className="text-xs sm:text-sm font-bold text-[#EC3664] hover:underline flex items-center gap-1">
            <FiArrowLeft className="w-4 h-4" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-[32px] border border-rose-100/60 p-8 sm:p-10 shadow-xl max-w-md w-full my-6">
          
          <div className="w-14 h-14 rounded-full bg-rose-50 text-[#EC3664] flex items-center justify-center mx-auto mb-4 border border-rose-100 shadow-xs">
            <FiKey className="w-6 h-6" />
          </div>

          <h1 className="font-serif text-3xl font-bold text-gray-900 text-center tracking-tight">
            Reset Password
          </h1>
          <p className="text-xs text-gray-500 font-light text-center mt-1 mb-6">
            {step === 1 && "Enter your registered email to receive an OTP verification code"}
            {step === 2 && `Enter the OTP sent to ${email}`}
            {step === 3 && "Create a new strong password for your account"}
          </p>

          {/* STEP INDICATORS */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <span className={`w-8 h-2 rounded-full transition-all ${step >= 1 ? 'bg-[#EC3664]' : 'bg-gray-200'}`}></span>
            <span className={`w-8 h-2 rounded-full transition-all ${step >= 2 ? 'bg-[#EC3664]' : 'bg-gray-200'}`}></span>
            <span className={`w-8 h-2 rounded-full transition-all ${step >= 3 ? 'bg-[#EC3664]' : 'bg-gray-200'}`}></span>
          </div>

          {/* MESSAGE ALERTS */}
          {msg.text && (
            <div className={`p-3.5 rounded-2xl text-xs font-bold mb-6 text-center border ${
              msg.type === 'success' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-rose-50 text-rose-700 border-rose-200'
            }`}>
              {msg.text}
            </div>
          )}

          {/* STEP 1: SEND OTP FORM */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-2">
                  Registered Email Address
                </label>
                <div className="relative flex items-center">
                  <FiMail className="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none" />
                  <input
                    type="email"
                    placeholder="name@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#EC3664] focus:bg-white transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#EC3664] hover:bg-[#d42d57] text-white py-3.5 rounded-full font-bold text-sm shadow-md transition cursor-pointer"
              >
                {loading ? "Sending OTP..." : "Send Reset Code"}
              </button>
            </form>
          )}

          {/* STEP 2: VERIFY OTP FORM */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">
              <div>
                <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-2">
                  Enter 6-Digit OTP Code
                </label>
                <div className="relative flex items-center">
                  <FiShield className="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="123456"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-gray-900 font-bold tracking-widest focus:outline-none focus:border-[#EC3664] focus:bg-white transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#EC3664] hover:bg-[#d42d57] text-white py-3.5 rounded-full font-bold text-sm shadow-md transition cursor-pointer"
              >
                Verify Code
              </button>
            </form>
          )}

          {/* STEP 3: RESET PASSWORD FORM */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-1">
                  New Password
                </label>
                <div className="relative flex items-center">
                  <FiLock className="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                    className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl pl-11 pr-4 py-3 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#EC3664] focus:bg-white transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-1">
                  Confirm New Password
                </label>
                <div className="relative flex items-center">
                  <FiLock className="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none" />
                  <input
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl pl-11 pr-4 py-3 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#EC3664] focus:bg-white transition"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#EC3664] hover:bg-[#d42d57] text-white py-3.5 rounded-full font-bold text-sm shadow-md transition cursor-pointer mt-2"
              >
                {loading ? "Updating Password..." : "Reset & Save Password"}
              </button>
            </form>
          )}

          <div className="border-t border-gray-100 mt-6 pt-6 text-center">
            <Link to="/login" className="text-xs font-bold text-[#EC3664] hover:underline">
              Return to Sign In
            </Link>
          </div>

        </div>
      </main>
    </div>
  );
};

export default ForgotPassword;