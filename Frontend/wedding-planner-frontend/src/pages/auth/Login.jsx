import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FiMail, FiLock, FiArrowRight, FiSearch, FiStar, FiUser, FiBriefcase, FiShield } from "react-icons/fi";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrorMsg("");
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFillCredentials = (email, password) => {
    setLoginData({
      email,
      password,
    });
    setErrorMsg("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loginData.email || !loginData.password) {
      setErrorMsg("Please fill in both email and password.");
      return;
    }

    setLoading(true);

    try {
      let userRole = "USER";
      let token = "mock-token";
      let userName = loginData.email.split("@")[0] || "User";

      // Detect role from credentials/backend response
      const lowerEmail = loginData.email.toLowerCase();
      if (lowerEmail.includes("planner")) {
        userRole = "PLANNER";
      } else if (lowerEmail.includes("admin")) {
        userRole = "ADMIN";
      } else {
        userRole = "USER";
      }

      // Store auth session
      localStorage.setItem("authToken", `${token}-${userRole.toLowerCase()}`);
      localStorage.setItem("userRole", userRole);
      localStorage.setItem("userName", userName);
      localStorage.setItem("userEmail", loginData.email);

      // Automatic redirection based on authenticated role
      if (userRole === "PLANNER") {
        navigate("/planner-dashboard");
      } else if (userRole === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/client/dashboard");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setErrorMsg("Invalid credentials. Please check your email and password.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8F9] flex flex-col font-sans">
      
      {/* 1. TOP NAVBAR HEADER */}
      <header className="bg-white border-b border-gray-100 px-4 lg:px-8 py-3.5 sticky top-0 z-50 shadow-2xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Brand Logo */}
          <Link to="/home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-full bg-[#EC3664] flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105">
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

          {/* Center Nav Links */}
          <div className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <Link to="/home" className="text-gray-700 hover:text-[#EC3664] transition-colors py-1">
              Home
            </Link>

            <Link to="/planner-register" className="flex items-center gap-1.5 text-gray-700 hover:text-[#EC3664] transition-colors py-1">
              <FiSearch className="w-4 h-4 text-[#EC3664]" />
              <span>Find Planners</span>
            </Link>

            <Link to="/packages" className="flex items-center gap-1.5 text-gray-700 hover:text-[#EC3664] transition-colors py-1">
              <FiStar className="w-4 h-4 text-[#C9972C]" />
              <span>Packages</span>
            </Link>
          </div>

          {/* Right Action Links */}
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-xs sm:text-sm font-bold text-[#EC3664]">
              Sign In
            </Link>
            <Link
              to="/user-register"
              className="bg-[#EC3664] hover:bg-[#d42d57] text-white px-5 py-2 sm:px-6 sm:py-2.5 rounded-full font-bold text-xs shadow-sm hover:shadow-md transition cursor-pointer"
            >
              Get Started
            </Link>
          </div>

        </div>
      </header>

      {/* 2. LOGIN MAIN CARD SECTION */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-[32px] border border-rose-100/60 p-8 sm:p-10 shadow-xl max-w-md w-full my-6">
          
          {/* Top Heart Badge */}
          <div className="w-14 h-14 rounded-full bg-[#EC3664] text-white flex items-center justify-center mx-auto mb-4 shadow-md">
            <FaHeart className="w-6 h-6" />
          </div>

          {/* Titles */}
          <h1 className="font-serif text-3xl font-bold text-gray-900 text-center tracking-tight">
            Sign In to Royal Bliss
          </h1>
          <p className="text-xs text-gray-500 font-light text-center mt-1 mb-6">
            Enter your registered email and password to log in
          </p>

          {/* SAMPLE LOGIN CREDENTIALS BOX (DEV/TESTING ONLY) */}
          <div className="bg-[#FFF5F7] border border-rose-100/80 rounded-2xl p-4 mb-6">
            <span className="text-[10px] font-extrabold text-[#EC3664] uppercase tracking-wider block text-center mb-2.5">
              ⚡ SAMPLE TEST CREDENTIALS (CLICK TO AUTO-FILL)
            </span>
            
            <div className="space-y-2">
              {/* Client Credentials */}
              <button
                type="button"
                onClick={() => handleFillCredentials("client@gmail.com", "123456")}
                className="w-full bg-white hover:bg-rose-50/60 border border-rose-100 rounded-xl p-2.5 text-left flex items-center justify-between transition cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-[#EC3664] flex items-center justify-center text-xs font-bold">
                    <FiUser className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="text-xs font-bold text-gray-900 block leading-none">Client Account</span>
                    <span className="text-[10px] text-gray-500 font-light">client@gmail.com</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#EC3664] group-hover:underline">Use</span>
              </button>

              {/* Planner Credentials */}
              <button
                type="button"
                onClick={() => handleFillCredentials("planner@gmail.com", "123456")}
                className="w-full bg-white hover:bg-rose-50/60 border border-rose-100 rounded-xl p-2.5 text-left flex items-center justify-between transition cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center text-xs font-bold">
                    <FiBriefcase className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="text-xs font-bold text-gray-900 block leading-none">Planner Account</span>
                    <span className="text-[10px] text-gray-500 font-light">planner@gmail.com</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#EC3664] group-hover:underline">Use</span>
              </button>

              {/* Admin Credentials */}
              <button
                type="button"
                onClick={() => handleFillCredentials("admin@gmail.com", "123456")}
                className="w-full bg-white hover:bg-rose-50/60 border border-rose-100 rounded-xl p-2.5 text-left flex items-center justify-between transition cursor-pointer group"
              >
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center text-xs font-bold">
                    <FiShield className="w-3.5 h-3.5" />
                  </span>
                  <div>
                    <span className="text-xs font-bold text-gray-900 block leading-none">Admin Account</span>
                    <span className="text-[10px] text-gray-500 font-light">admin@gmail.com</span>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-[#EC3664] group-hover:underline">Use</span>
              </button>
            </div>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 text-[#EC3664] text-xs font-bold p-3.5 rounded-2xl mb-6 text-center">
              {errorMsg}
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Email Address Input */}
            <div>
              <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-2">
                Email Address
              </label>
              <div className="relative flex items-center">
                <FiMail className="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  placeholder="name@gmail.com"
                  value={loginData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#EC3664] focus:bg-white transition"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs font-semibold text-[#EC3664] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative flex items-center">
                <FiLock className="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={loginData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#EC3664] focus:bg-white transition"
                />
              </div>
            </div>

            {/* Sign In Action Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#EC3664] hover:bg-[#d42d57] text-white py-3.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer mt-4 disabled:opacity-70"
            >
              <span>{loading ? "Signing In..." : "Sign In"}</span>
              {!loading && <FiArrowRight className="w-4 h-4" />}
            </button>

          </form>

          {/* SEPARATE REGISTER AS CLIENT AND REGISTER AS PLANNER BUTTONS */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-wider block text-center mb-3">
              Don't have an account? Register below
            </span>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to="/user-register"
                className="bg-[#FFF0F3] hover:bg-[#FCE7F0] text-[#EC3664] border border-rose-200/60 py-2.5 px-3 rounded-2xl text-xs font-bold text-center transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <FiUser className="w-3.5 h-3.5" />
                <span>Register as Client</span>
              </Link>

              <Link
                to="/planner-register"
                className="bg-white hover:bg-rose-50 text-gray-800 border border-gray-200 py-2.5 px-3 rounded-2xl text-xs font-bold text-center transition flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
              >
                <FiBriefcase className="w-3.5 h-3.5 text-[#EC3664]" />
                <span>Register as Planner</span>
              </Link>
            </div>
          </div>

        </div>
      </main>

    </div>
  );
};

export default Login;