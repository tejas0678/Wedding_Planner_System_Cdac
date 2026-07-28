import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-[#3A0613] text-white border-t-2 border-[#E2B13C]/60 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          
          {/* Col 1: Brand & About (4 cols) */}
          <div className="lg:col-span-4">
            <Link to="/home" className="flex items-center gap-3 group mb-6">
              <div className="w-10 h-10 rounded-full bg-[#EC3664] flex items-center justify-center text-white shadow-md">
                <FaHeart className="w-4 h-4" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-serif text-2xl font-bold tracking-tight text-white">
                  Royal Bliss
                </span>
                <span className="text-[9px] font-bold tracking-[0.2em] text-[#E2B13C] uppercase mt-0.5">
                  WEDDING PLANNERS
                </span>
              </div>
            </Link>

            <p className="text-rose-100/70 text-sm font-light leading-relaxed max-w-sm">
              India's premier wedding planning marketplace. Connecting brides and grooms with verified, world-class wedding planners, decor artists, and venues.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#EC3664] hover:bg-[#d42d57] text-white flex items-center justify-center text-sm transition-transform hover:scale-110 shadow-xs"
              >
                <FaInstagram />
              </a>
              <a
                href="#facebook"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full bg-[#EC3664] hover:bg-[#d42d57] text-white flex items-center justify-center text-sm transition-transform hover:scale-110 shadow-xs"
              >
                <FaFacebookF />
              </a>
              <a
                href="#youtube"
                aria-label="Youtube"
                className="w-9 h-9 rounded-full bg-[#EC3664] hover:bg-[#d42d57] text-white flex items-center justify-center text-sm transition-transform hover:scale-110 shadow-xs"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Col 2: Quick Links (2.5 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-lg font-bold text-[#E2B13C] mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2.5 text-sm text-rose-100/70 font-light">
              <li>
                <Link to="/planner-register" className="hover:text-white transition-colors">
                  Find Planners by City
                </Link>
              </li>
              <li>
                <Link to="/packages" className="hover:text-white transition-colors">
                  Popular Wedding Packages
                </Link>
              </li>
              <li>
                <Link to="/planner-register" className="hover:text-white transition-colors">
                  Destination Weddings
                </Link>
              </li>
              <li>
                <Link to="/planner-register" className="hover:text-white transition-colors">
                  Register as a Planner
                </Link>
              </li>
              <li>
                <Link to="/login" className="hover:text-white transition-colors">
                  Client Portal Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Popular Cities (2.5 cols) */}
          <div className="lg:col-span-2">
            <h4 className="font-serif text-lg font-bold text-[#E2B13C] mb-4">
              Popular Cities
            </h4>
            <ul className="space-y-2.5 text-sm text-rose-100/70 font-light">
              <li>
                <Link to="/planner-register?city=Udaipur" className="hover:text-white transition-colors">
                  Udaipur Weddings
                </Link>
              </li>
              <li>
                <Link to="/planner-register?city=Goa" className="hover:text-white transition-colors">
                  Goa Beach Weddings
                </Link>
              </li>
              <li>
                <Link to="/planner-register?city=Jaipur" className="hover:text-white transition-colors">
                  Jaipur Royal Weddings
                </Link>
              </li>
              <li>
                <Link to="/planner-register?city=Mumbai" className="hover:text-white transition-colors">
                  Mumbai Luxury Events
                </Link>
              </li>
              <li>
                <Link to="/planner-register?city=Pune" className="hover:text-white transition-colors">
                  Pune Garden Ceremonies
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Concierge Support (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-lg font-bold text-[#E2B13C] mb-4">
              Concierge Support
            </h4>
            <ul className="space-y-3.5 text-sm text-rose-100/70 font-light">
              <li className="flex items-start gap-3">
                <FiMapPin className="w-4 h-4 text-[#E2B13C] shrink-0 mt-1" />
                <span>CDAC Innovation Hub, Nariman Point, Mumbai - 400021</span>
              </li>
              <li className="flex items-center gap-3">
                <FiPhone className="w-4 h-4 text-[#E2B13C] shrink-0" />
                <a href="tel:+911800769252" className="hover:text-white transition-colors">
                  +91 1800-ROYAL-BLISS
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FiMail className="w-4 h-4 text-[#E2B13C] shrink-0" />
                <a href="mailto:support@royalblissweddings.com" className="hover:text-white transition-colors">
                  support@royalblissweddings.com
                </a>
              </li>
            </ul>
          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
