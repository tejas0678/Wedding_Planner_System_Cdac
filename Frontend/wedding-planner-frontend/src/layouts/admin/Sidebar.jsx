import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { 
  FiBarChart2, 
  FiUsers, 
  FiBriefcase, 
  FiBookmark, 
  FiCreditCard, 
  FiMessageSquare, 
  FiLogOut,
  FiX
} from "react-icons/fi";

const navItems = [
  {
    path: "/admin/dashboard",
    label: "Overview & Dashboard",
    icon: FiBarChart2,
  },
  {
    path: "/admin/clients",
    label: "Manage Clients",
    icon: FiUsers,
  },
  {
    path: "/admin/planners",
    label: "Manage Planners",
    icon: FiBriefcase,
  },
  {
    path: "/admin/bookings",
    label: "Booking Details",
    icon: FiBookmark,
  },
  {
    path: "/admin/payments",
    label: "Monitor Payments",
    icon: FiCreditCard,
  },
  {
    path: "/admin/reports",
    label: "Feedback & Reports",
    icon: FiMessageSquare,
  },
];

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const navigate = useNavigate();

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    localStorage.removeItem("userEmail");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-black/50 backdrop-blur-xs lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-screen w-[270px] flex-col border-r border-rose-100/80 bg-white shadow-md transition-transform duration-300 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* 1. BRAND LOGO */}
        <div className="flex h-20 items-center justify-between border-b border-gray-100 px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EC3664] flex items-center justify-center text-white shadow-md">
              <FaHeart className="w-4 h-4" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-xl font-bold tracking-tight text-[#1F191D]">
                Royal Bliss
              </span>
              <span className="text-[9px] font-bold tracking-[0.2em] text-[#C9972C] uppercase mt-0.5">
                ADMIN CONTROL PANEL
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={closeSidebar}
            className="text-gray-400 hover:text-gray-700 lg:hidden p-1"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        {/* 2. ADMIN PROFILE CARD */}
        <div className="px-5 pt-6">
          <div className="rounded-2xl border border-rose-100 bg-[#FFF5F7] p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#EC3664] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0">
              A
            </div>
            <div className="overflow-hidden">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#EC3664] block">
                ADMINISTRATOR
              </span>
              <h3 className="text-xs font-bold text-gray-900 truncate">
                System Administrator
              </h3>
              <p className="text-[11px] text-gray-500 font-light truncate">
                admin@royaltouchweddings.com
              </p>
            </div>
          </div>
        </div>

        {/* 3. NAVIGATION MENU */}
        <nav className="mt-6 flex-1 px-4 space-y-1.5 overflow-y-auto">
          {navItems.map(({ path, label, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={closeSidebar}
              className={({ isActive }) =>
                `flex items-center gap-3.5 px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-200 ${
                  isActive
                    ? "bg-[#EC3664] text-white shadow-md"
                    : "text-gray-700 hover:bg-rose-50 hover:text-[#EC3664]"
                }`
              }
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* 4. LOGOUT BUTTON */}
        <div className="border-t border-gray-100 p-4">
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-full border border-rose-200 bg-[#FFF0F3] py-2.5 px-4 text-xs font-bold text-[#EC3664] hover:bg-[#EC3664] hover:text-white transition-all cursor-pointer shadow-2xs"
          >
            <FiLogOut className="w-4 h-4" />
            <span>Sign Out Admin</span>
          </button>
        </div>
      </aside>
    </>
  );
}