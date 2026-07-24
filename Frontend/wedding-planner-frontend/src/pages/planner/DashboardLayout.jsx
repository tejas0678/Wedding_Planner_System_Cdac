import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const DashboardLayout = ({ children, role = "PLANNER" }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation items - NO ICONS (only text)
  const navItems = [
    { to: '/planner-dashboard', label: 'Dashboard' },
    { to: '/planner-profile', label: 'My Profile' },
    { to: '/planner-services', label: 'Services' },
    { to: '/planner-gallery', label: 'Gallery' },
    { to: '/planner-bookings', label: 'Bookings' },
    { to: '/planner-tasks', label: 'Tasks' },
    { to: '/planner-payments', label: 'Payments' },
    { to: '/planner-reviews', label: 'Reviews' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="flex h-screen bg-[#f8f4f0]">
      {/* Sidebar */}
      <aside 
        className={`${
          sidebarOpen ? 'w-64' : 'w-20'
        } bg-white border-r border-gray-200 transition-all duration-300 fixed h-full z-30 shadow-sm`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <span className="text-pink-500 text-2xl">♥</span>
              {sidebarOpen && <span className="text-xl font-bold text-gray-900">WedPlan</span>}
            </div>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)} 
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {sidebarOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Navigation - Text only, no icons */}
          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {navItems.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className={`flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                  isActive(item.to)
                    ? 'bg-pink-50 text-pink-600 font-semibold'
                    : 'text-gray-700 hover:bg-pink-50 hover:text-pink-600'
                }`}
              >
                {sidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              </Link>
            ))}
          </nav>

          {/* Logout - Vector SVG Icon (arrow pointing LEFT, slides RIGHT on hover) */}
          <div className="border-t border-gray-200 p-4">
            <button 
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-600 hover:bg-red-50 w-full transition-colors group"
            >
              {/* Vector Logout Icon - Arrow pointing LEFT */}
              <svg 
                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M7 16l-4-4m0 0l4-4m-4 4h14m-6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" 
                />
              </svg>
              {sidebarOpen && <span className="text-sm font-medium">Logout</span>}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-20'} transition-all duration-300`}>
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-semibold text-gray-800">
              {navItems.find(item => isActive(item.to))?.label || 'Dashboard'}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <span className="text-xl">🔔</span>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <span className="text-xl">⚙️</span>
            </button>
            <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center text-white text-sm font-semibold">
              P
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6 overflow-y-auto h-[calc(100vh-73px)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;