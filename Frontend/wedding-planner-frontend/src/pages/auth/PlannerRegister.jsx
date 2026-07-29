import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { FiUser, FiMail, FiPhone, FiLock, FiBriefcase, FiArrowRight, FiSearch, FiStar } from "react-icons/fi";
import { registerPlanner } from "../../services/authService";

const PlannerRegister = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessName: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setErrorMsg("");
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.password || !formData.businessName) {
      setErrorMsg("Please fill in all required fields.");
      return;
    }

    setLoading(true);
    try {
      await registerPlanner(formData);
      navigate("/planner-dashboard");
    } catch (err) {
      console.error("Planner registration error:", err);
      setErrorMsg(err.message || "Registration failed. Email may already be registered.");
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

      {/* 2. REGISTRATION CARD CONTAINER */}
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="bg-white rounded-[32px] border border-rose-100/60 p-8 sm:p-10 shadow-xl max-w-md w-full my-6">
          
          {/* Top Heart Badge */}
          <div className="w-14 h-14 rounded-full bg-[#EC3664] text-white flex items-center justify-center mx-auto mb-4 shadow-md">
            <FaHeart className="w-6 h-6" />
          </div>

          {/* Titles */}
          <h1 className="font-serif text-3xl font-bold text-gray-900 text-center tracking-tight">
            Create An Account
          </h1>
          <p className="text-xs text-gray-500 font-light text-center mt-1 mb-6">
            Join Royal Bliss Wedding Planner Network
          </p>

          {/* ROLE TOGGLE SWITCH */}
          <div className="bg-[#FFF5F7] border border-rose-100/80 rounded-2xl p-1.5 mb-6 flex items-center gap-1">
            <button
              type="button"
              onClick={() => navigate("/user-register")}
              className="flex-1 py-2 px-3 rounded-xl text-xs font-bold transition text-gray-700 hover:text-[#EC3664]"
            >
              I am a Couple (Bride/Groom)
            </button>
            <button
              type="button"
              onClick={() => navigate("/planner-register")}
              className="flex-1 py-2 px-3 rounded-xl text-xs font-bold transition bg-[#EC3664] text-white shadow-xs"
            >
              I am a Wedding Planner
            </button>
          </div>

          {/* Error Message */}
          {errorMsg && (
            <div className="bg-rose-50 border border-rose-200 text-[#EC3664] text-xs font-bold p-3.5 rounded-2xl mb-6 text-center">
              {errorMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-1.5">
                Full Name
              </label>
              <div className="relative flex items-center">
                <FiUser className="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="e.g. Aarav Sharma"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#EC3664] focus:bg-white transition"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-1.5">
                Email Address
              </label>
              <div className="relative flex items-center">
                <FiMail className="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none" />
                <input
                  type="email"
                  name="email"
                  placeholder="aarav@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#EC3664] focus:bg-white transition"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-1.5">
                Phone Number
              </label>
              <div className="relative flex items-center">
                <FiPhone className="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none" />
                <input
                  type="tel"
                  name="phone"
                  placeholder="+91 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#EC3664] focus:bg-white transition"
                />
              </div>
            </div>

            {/* Business / Agency Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-1.5">
                Business / Agency Name
              </label>
              <div className="relative flex items-center">
                <FiBriefcase className="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none" />
                <input
                  type="text"
                  name="businessName"
                  placeholder="e.g. Royal Touch Weddings"
                  value={formData.businessName}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#EC3664] focus:bg-white transition"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-1.5">
                Password
              </label>
              <div className="relative flex items-center">
                <FiLock className="w-4 h-4 text-gray-400 absolute left-4 pointer-events-none" />
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl pl-11 pr-4 py-3.5 text-sm text-gray-900 font-medium focus:outline-none focus:border-[#EC3664] focus:bg-white transition"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#EC3664] hover:bg-[#d42d57] text-white py-3.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition flex items-center justify-center gap-2 cursor-pointer mt-4 disabled:opacity-70"
            >
              <span>{loading ? "Registering Planner..." : "Register Account"}</span>
              {!loading && <FiArrowRight className="w-4 h-4" />}
            </button>

          </form>

          {/* Footer Link */}
          <div className="text-center mt-6 pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-500 font-medium">
              Already have an account?{" "}
            </span>
            <Link
              to="/login"
              className="text-xs font-bold text-[#EC3664] hover:underline"
            >
              Sign In
            </Link>
          </div>

        </div>
      </main>

    </div>
  );
};

export default PlannerRegister;