import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiSearch, FiLogOut } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { FaHeart } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [userRole, setUserRole] = useState(localStorage.getItem('userRole'));
  const [userName, setUserName] = useState(localStorage.getItem('userName'));

  useEffect(() => {
    setAuthToken(localStorage.getItem('authToken'));
    setUserRole(localStorage.getItem('userRole'));
    setUserName(localStorage.getItem('userName'));
  }, [location]);

  const closeMenus = () => {
    setIsOpen(false);
    setDropdownOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setAuthToken(null);
    setUserRole(null);
    setUserName(null);
    closeMenus();
    navigate('/login');
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <Link to="/" onClick={closeMenus} className="flex items-center gap-3 group">
            <div className="w-11 h-11 rounded-full bg-[#EC3664] flex items-center justify-center text-white shadow-md transition-transform group-hover:scale-105">
              <FaHeart className="w-5 h-5" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-serif text-2xl font-bold tracking-tight text-[#1F191D]">
                Royal Bliss
              </span>
              <span className="text-[10px] font-bold tracking-[0.2em] text-[#C9972C] uppercase mt-0.5">
                WEDDING PLANNERS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
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
              <HiSparkles className="w-4 h-4 text-[#C9972C]" />
              <span>Packages</span>
            </Link>
          </div>

          {/* Right Section: Auth Pill or Sign In / Get Started */}
          <div className="hidden md:flex items-center space-x-6">
            {authToken ? (
              <div className="flex items-center gap-3">
                <Link
                  to={userRole === 'PLANNER' ? '/planner-dashboard' : userRole === 'ADMIN' ? '/admin/dashboard' : '/client/dashboard'}
                  className="bg-rose-50/80 border border-rose-100/80 rounded-full px-4 py-1.5 flex items-center gap-2.5 shadow-2xs hover:border-rose-300 transition"
                >
                  <div className="w-7 h-7 rounded-full bg-[#EC3664] text-white flex items-center justify-center text-xs font-bold shadow-xs">
                    {(userName || 'U')[0].toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-gray-800 tracking-wide uppercase">
                    {userName || userRole || 'Dashboard'}
                  </span>
                </Link>

                <button
                  onClick={handleLogout}
                  title="Logout"
                  className="text-gray-400 hover:text-[#EC3664] transition-colors p-2 cursor-pointer"
                >
                  <FiLogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="text-sm font-semibold text-[#EC3664] hover:text-[#d42d57] transition-colors"
                >
                  Sign In
                </Link>
                
                <div className="relative">
                  <button
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="bg-[#EC3664] hover:bg-[#d42d57] text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-sm hover:shadow-md transition-all cursor-pointer"
                  >
                    Get Started
                  </button>
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <Link 
                        to="/user-register" 
                        onClick={closeMenus} 
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-rose-50 hover:text-[#EC3664] transition"
                      >
                        User Register
                      </Link>
                      <Link 
                        to="/planner-register" 
                        onClick={closeMenus} 
                        className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-rose-50 hover:text-[#EC3664] transition"
                      >
                        Planner Register
                      </Link>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 p-2 rounded-lg hover:bg-gray-100 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 py-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-3">
            <Link to="/home" onClick={closeMenus} className="text-gray-800 hover:text-[#EC3664] font-medium py-2">Home</Link>
            <Link to="/find-planners" onClick={closeMenus} className="flex items-center gap-2 text-gray-800 hover:text-[#EC3664] font-medium py-2">
              <FiSearch className="w-4 h-4 text-[#EC3664]" /> Find Planners
            </Link>
            <Link to="/packages" onClick={closeMenus} className="flex items-center gap-2 text-gray-800 hover:text-[#EC3664] font-medium py-2">
              <HiSparkles className="w-4 h-4 text-[#C9972C]" /> Packages
            </Link>
            
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
              {authToken ? (
                <button 
                  onClick={handleLogout}
                  className="bg-[#EC3664] text-white text-center py-2.5 rounded-full font-semibold"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" onClick={closeMenus} className="text-[#EC3664] font-semibold py-2">Sign In</Link>
                  <Link to="/user-register" onClick={closeMenus} className="bg-[#EC3664] text-white text-center py-2.5 rounded-full font-semibold">User Register</Link>
                  <Link to="/planner-register" onClick={closeMenus} className="border border-[#EC3664] text-[#EC3664] text-center py-2.5 rounded-full font-semibold">Planner Register</Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
