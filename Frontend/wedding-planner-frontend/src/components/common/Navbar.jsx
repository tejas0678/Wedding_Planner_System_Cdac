import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const closeMenus = () => {
    setIsOpen(false);
    setDropdownOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" onClick={closeMenus} className="text-2xl font-serif font-bold text-rose-600">
            WedPlan
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-rose-500 transition">Home</Link>
            <Link to="/planners" className="text-gray-700 hover:text-rose-500 transition">Planners</Link>
            <Link to="/packages" className="text-gray-700 hover:text-rose-500 transition">Packages</Link>
            <Link to="/about" className="text-gray-700 hover:text-rose-500 transition">About</Link>
            <Link to="/contact" className="text-gray-700 hover:text-rose-500 transition">Contact</Link>
          </div>

          {/* Right buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login" className="text-gray-700 hover:text-rose-500 transition">Login</Link>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="bg-rose-600 text-white px-4 py-2 rounded-full hover:bg-rose-700 transition"
              >
                Get Started
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <Link to="/register/client" onClick={closeMenus} className="block px-4 py-2 text-gray-700 hover:bg-rose-50">User Register</Link>
                  <Link to="/register/planner" onClick={closeMenus} className="block px-4 py-2 text-gray-700 hover:bg-rose-50">Planner Register</Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 py-2">
          <div className="flex flex-col space-y-2 px-4 pb-4">
            <Link to="/" onClick={closeMenus} className="text-gray-700 hover:text-rose-500">Home</Link>
            <Link to="/planners" onClick={closeMenus} className="text-gray-700 hover:text-rose-500">Planners</Link>
            <Link to="/packages" onClick={closeMenus} className="text-gray-700 hover:text-rose-500">Packages</Link>
            <Link to="/about" onClick={closeMenus} className="text-gray-700 hover:text-rose-500">About</Link>
            <Link to="/contact" onClick={closeMenus} className="text-gray-700 hover:text-rose-500">Contact</Link>
            <Link to="/login" onClick={closeMenus} className="text-gray-700 hover:text-rose-500">Login</Link>
            <Link to="/register/client" onClick={closeMenus} className="bg-rose-600 text-white text-center px-4 py-2 rounded-full">User Register</Link>
            <Link to="/register/planner" onClick={closeMenus} className="bg-rose-600 text-white text-center px-4 py-2 rounded-full">Planner Register</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
