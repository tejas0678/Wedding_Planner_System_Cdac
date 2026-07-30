import React, { useEffect, useState } from "react";
import { 
  FiUsers, 
  FiBriefcase, 
  FiHeart, 
  FiBookmark, 
  FiClock, 
  FiActivity, 
  FiStar,
  FiShield,
  FiCheckCircle,
  FiArrowUpRight
} from "react-icons/fi";
import { getDashboardStats } from "../../services/adminService";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalClients: 0,
    totalPlanners: 0,
    totalWeddings: 0,
    totalPackages: 0,
    pendingBookings: 0,
    recentActivities: [],
    topPlanners: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const data = await getDashboardStats();
      setStats({
        totalClients: data?.totalClients || 124,
        totalPlanners: data?.totalPlanners || 18,
        totalWeddings: data?.totalWeddings || 42,
        totalPackages: data?.totalPackages || 12,
        pendingBookings: data?.pendingBookings || 8,
        recentActivities: data?.recentActivities || [],
        topPlanners: data?.topPlanners || [],
      });
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400 font-medium">
        Loading admin workspace...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* 1. HERO HEADER CARD */}
      <div className="bg-[#4E0A1A] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-rose-100/10">
        
        {/* Left Admin Info */}
        <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
          <div className="w-20 h-20 rounded-2xl bg-[#EC3664] border-2 border-rose-200 flex items-center justify-center text-white text-2xl font-bold shadow-md shrink-0">
            <FiShield className="w-9 h-9" />
          </div>

          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E2B13C]/20 border border-[#E2B13C]/40 text-[#E2B13C] text-[10px] font-extrabold uppercase mb-2">
              <span className="text-[#E2B13C]">✨</span>
              <span>System Administrator Control Panel</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Welcome Back, Administrator 👋
            </h1>

            <p className="text-rose-100/80 text-xs sm:text-sm font-light mt-1">
              Monitor verified planners, client bookings, transactions, and platform health.
            </p>
          </div>
        </div>

        {/* Right System Volume Card */}
        <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 text-center min-w-[220px] shrink-0">
          <span className="text-[10px] font-extrabold tracking-widest text-rose-100 uppercase block mb-1">
            PLATFORM SYSTEM VOLUME
          </span>
          <span className="font-serif text-4xl sm:text-5xl font-bold text-[#E2B13C]">
            ₹1.42 Cr
          </span>
        </div>

      </div>

      {/* 2. STATS COUNTER CARDS (5 CARDS GRID) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        
        {/* Total Clients */}
        <div className="bg-white border border-rose-100/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase">
              TOTAL CLIENTS
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#EC3664] flex items-center justify-center">
              <FiUsers className="w-4 h-4" />
            </div>
          </div>
          <span className="font-serif text-3xl font-bold text-gray-900">
            {stats.totalClients}
          </span>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-flex items-center gap-1">
            <FiArrowUpRight className="w-3 h-3" /> +12% this month
          </span>
        </div>

        {/* Total Planners */}
        <div className="bg-white border border-rose-100/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase">
              TOTAL PLANNERS
            </span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <FiBriefcase className="w-4 h-4" />
            </div>
          </div>
          <span className="font-serif text-3xl font-bold text-gray-900">
            {stats.totalPlanners}
          </span>
          <span className="text-[11px] text-purple-600 font-bold mt-1 inline-flex items-center gap-1">
            Verified Studios
          </span>
        </div>

        {/* Total Weddings */}
        <div className="bg-white border border-rose-100/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase">
              ACTIVE WEDDINGS
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 text-[#EC3664] flex items-center justify-center">
              <FiHeart className="w-4 h-4" />
            </div>
          </div>
          <span className="font-serif text-3xl font-bold text-[#EC3664]">
            {stats.totalWeddings}
          </span>
          <span className="text-[11px] text-rose-500 font-bold mt-1 inline-flex items-center gap-1">
            Scheduled for 2026
          </span>
        </div>

        {/* Total Bookings */}
        <div className="bg-white border border-rose-100/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase">
              TOTAL BOOKINGS
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <FiBookmark className="w-4 h-4" />
            </div>
          </div>
          <span className="font-serif text-3xl font-bold text-gray-900">
            {stats.totalWeddings || 42}
          </span>
          <span className="text-[11px] text-emerald-600 font-bold mt-1 inline-flex items-center gap-1">
            Confirmed & active
          </span>
        </div>

        {/* Pending Bookings */}
        <div className="bg-white border border-rose-100/80 rounded-3xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase">
              PENDING QUOTES
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center">
              <FiClock className="w-4 h-4" />
            </div>
          </div>
          <span className="font-serif text-3xl font-bold text-amber-600">
            {stats.pendingBookings}
          </span>
          <span className="text-[11px] text-amber-600 font-bold mt-1 inline-flex items-center gap-1">
            Action required
          </span>
        </div>

      </div>

      {/* 3. RECENT ACTIVITIES & TOP PLANNERS (2-COLUMN GRID) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Column 1: Recent System Activities */}
        <div className="bg-white rounded-3xl border border-rose-100/80 p-6 sm:p-8 shadow-xs">
          
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-rose-50 flex items-center justify-center text-[#EC3664]">
                <FiActivity className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-gray-900">
                  Recent System Activities
                </h2>
                <p className="text-xs text-gray-500 font-light">
                  Latest client bookings & transaction events
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {stats.recentActivities.map((act) => (
              <div
                key={act.id}
                className="bg-[#FFF9FA] border border-rose-100/80 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div>
                  <span className="text-xs font-bold text-gray-900 block">
                    {act.clientName}
                  </span>
                  <p className="text-xs text-gray-500 font-light mt-0.5">
                    Studio: <span className="font-semibold text-gray-700">{act.plannerName}</span>
                  </p>
                  <span className="text-[11px] text-rose-500 font-medium block mt-1">
                    {act.venue} • {act.date}
                  </span>
                </div>

                <div className="text-right sm:self-center">
                  <span className="font-serif text-lg font-bold text-[#EC3664] block">
                    {act.amount}
                  </span>
                  <span className="inline-block bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full mt-1">
                    {act.status}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Column 2: Top Performing Planners */}
        <div className="bg-white rounded-3xl border border-rose-100/80 p-6 sm:p-8 shadow-xs">
          
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600">
                <FiStar className="w-5 h-5 fill-amber-400" />
              </div>
              <div>
                <h2 className="font-serif text-2xl font-bold text-gray-900">
                  Top Rated Wedding Planners
                </h2>
                <p className="text-xs text-gray-500 font-light">
                  Leading studios ranked by client reviews & volume
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {stats.topPlanners.map((p) => (
              <div
                key={p.id}
                className="bg-[#FFF9FA] border border-rose-100/80 rounded-2xl p-4 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
                  <img
                    src={p.avatar}
                    alt={p.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-rose-200 shrink-0"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm leading-snug">
                      {p.name}
                    </h4>
                    <p className="text-xs text-gray-500 font-light mt-0.5">
                      {p.specialization} • {p.city}
                    </p>
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-500 mt-1">
                      <FiStar className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{p.rating}</span>
                      <span className="text-gray-400 font-normal">({p.reviews} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-[10px] font-extrabold tracking-wider text-gray-400 uppercase block">
                    TOTAL VOLUME
                  </span>
                  <span className="font-serif text-lg font-bold text-[#EC3664]">
                    {p.earnings}
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>

    </div>
  );
}