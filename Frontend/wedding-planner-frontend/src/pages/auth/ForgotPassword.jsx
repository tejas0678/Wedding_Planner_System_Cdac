import React, { useState } from "react";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOtpSection, setShowOtpSection] = useState(false);
  const [showResetSection, setShowResetSection] = useState(false);

  // Send OTP
  const handleSendOtp = (e) => {
    e.preventDefault();

    console.log("Email :", email);

    // Call Send OTP API here

    alert("OTP sent successfully!");

    setShowOtpSection(true);
  };

  // Verify OTP
  const handleVerifyOtp = (e) => {
    e.preventDefault();

    console.log("OTP :", otp);

    // Call Verify OTP API here

    alert("OTP Verified Successfully!");

    setShowResetSection(true);
  };

  // Reset Password
  const handleResetPassword = (e) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("New Password :", newPassword);

    // Call Reset Password API here

    alert("Password Reset Successfully!");

    // Redirect to Login Page
    window.location.href = "/";
  };

  return (
    <div className="min-h-screen bg-[#f8f4f0] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 text-3xl font-bold text-gray-900">
            <span className="text-pink-500">♥</span>
            WedPlan
          </div>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">

          <h1 className="text-3xl font-semibold text-center text-gray-900 mb-6">
            Forgot Password
          </h1>

          {/* STEP 1 : EMAIL */}

          {!showOtpSection && (
            <form onSubmit={handleSendOtp} className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Registered Email
                </label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-pink-600 py-3 text-white font-semibold hover:bg-pink-700 duration-200"
              >
                Send OTP
              </button>

            </form>
          )}

          {/* STEP 2 : VERIFY OTP */}

          {showOtpSection && !showResetSection && (
            <form onSubmit={handleVerifyOtp} className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Enter OTP
                </label>

                <input
                  type="text"
                  placeholder="Enter 6-digit OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-pink-600 py-3 text-white font-semibold hover:bg-pink-700 duration-200"
              >
                Verify OTP
              </button>

            </form>
          )}

          {/* STEP 3 : RESET PASSWORD */}

          {showResetSection && (
            <form onSubmit={handleResetPassword} className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  New Password
                </label>

                <input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Confirm Password
                </label>

                <input
                  type="password"
                  placeholder="Confirm new password"
                  value={confirmPassword}
                  onChange={(e) =>
                    setConfirmPassword(e.target.value)
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-pink-600 py-3 text-white font-semibold hover:bg-pink-700 duration-200"
              >
                Reset Password
              </button>

            </form>
          )}

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* Back to Login */}
          <div className="flex justify-center">
            <a
              href="user-login"
              className="text-sm font-medium text-gray-600 hover:text-pink-600"
            >
              Back to Login
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;