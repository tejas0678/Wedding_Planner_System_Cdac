// src/layouts/admin/Layout.jsx

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">

        {/* Mobile Header */}
        <header className="flex items-center justify-between border-b bg-white px-5 py-4 shadow-sm lg:hidden">

          {/* Hamburger Button */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-700 transition hover:bg-gray-100"
            aria-label="Open sidebar"
          >
            {/* Tailwind CSS Hamburger Icon */}
            <div className="flex w-6 flex-col gap-1.5">
              <span className="block h-0.5 w-6 rounded bg-gray-700"></span>
              <span className="block h-0.5 w-6 rounded bg-gray-700"></span>
              <span className="block h-0.5 w-6 rounded bg-gray-700"></span>
            </div>
          </button>

          {/* Title */}
          <h1 className="text-xl font-bold text-gray-800">
            WedPlan Admin
          </h1>

          {/* Empty space to keep title centered */}
          <div className="h-10 w-10"></div>

        </header>

        {/* Page Content */}
        <main className="p-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
}