import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FiMenu } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFF8F9] flex flex-col font-sans">

      {/* SIDEBAR */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 lg:ml-[270px] transition-all duration-300">

        {/* MOBILE HEADER */}
        <header className="flex h-16 items-center justify-between border-b border-gray-100 bg-white px-4 lg:hidden sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl text-gray-700 hover:bg-rose-50 hover:text-[#EC3664] transition"
            >
              <FiMenu className="w-6 h-6" />
            </button>
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#EC3664] flex items-center justify-center text-white text-xs shadow-xs">
                <FaHeart className="w-3.5 h-3.5" />
              </div>
              <span className="font-serif text-lg font-bold text-gray-900">Royal Bliss</span>
            </div>
          </div>
          <span className="text-xs font-bold text-[#EC3664] bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
            Admin
          </span>
        </header>

        {/* PAGE CONTENT */}
        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
}