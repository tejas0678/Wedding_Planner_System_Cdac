import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaHeart as FaHeartIcon } from 'react-icons/fa';
import { FiSearch, FiLogOut, FiCalendar, FiStar } from 'react-icons/fi';
import NotificationBell from '../common/NotificationBell';

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-100 px-4 lg:px-8 py-3.5 sticky top-0 z-50 shadow-2xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-full bg-[#EC3664] flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105">
            <FaHeartIcon className="w-4 h-4" />
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
          <Link
            to="/home"
            className="text-gray-700 hover:text-[#EC3664] transition-colors py-1"
          >
            Home
          </Link>

          <Link
            to="/find-planners"
            className="flex items-center gap-1.5 text-gray-700 hover:text-[#EC3664] transition-colors py-1"
          >
            <FiSearch className="w-4 h-4 text-[#EC3664]" />
            <span>Find Planners</span>
          </Link>

          <Link
            to="/packages"
            className="flex items-center gap-1.5 text-gray-700 hover:text-[#EC3664] transition-colors py-1"
          >
            <FiStar className="w-4 h-4 text-[#C9972C]" />
            <span>Packages</span>
          </Link>

          <Link
            to="/client/dashboard"
            className="flex items-center gap-1.5 text-[#EC3664] font-semibold py-1 border-b-2 border-[#EC3664]"
          >
            <FiCalendar className="w-4 h-4 text-[#EC3664]" />
            <span>My Dashboard</span>
          </Link>
        </div>

        {/* Right User Capsule Pill */}
        <div className="flex items-center gap-3">
          <NotificationBell />
          <div className="bg-rose-50/80 border border-rose-100/80 rounded-full px-4 py-1.5 flex items-center gap-2.5 shadow-2xs">
            <div className="w-7 h-7 rounded-full bg-[#EC3664] text-white flex items-center justify-center text-xs font-bold shadow-xs">
              T
            </div>
            <span className="text-xs font-bold text-gray-800 tracking-wide uppercase">
              Logout
            </span>
            <button
              onClick={handleLogout}
              title="Logout"
              className="text-gray-400 hover:text-[#EC3664] transition-colors ml-1 cursor-pointer"
            >
              <FiLogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}