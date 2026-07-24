import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-serif font-bold text-rose-400">WedPlan</h3>
            <p className="mt-3 text-gray-400 text-sm">
              Making your dream wedding a reality. Expert planners, curated packages, and seamless coordination.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="mt-3 space-y-2 text-gray-400 text-sm">
              <li><Link to="/" className="hover:text-rose-400 transition">Home</Link></li>
              <li><Link to="/planners" className="hover:text-rose-400 transition">Planners</Link></li>
              <li><Link to="/packages" className="hover:text-rose-400 transition">Packages</Link></li>
              <li><Link to="/about" className="hover:text-rose-400 transition">About</Link></li>
              <li><Link to="/contact" className="hover:text-rose-400 transition">Contact</Link></li>
            </ul>
          </div>

          {/* Portals */}
          <div>
            <h4 className="text-lg font-semibold text-white">Portals</h4>
            <ul className="mt-3 space-y-2 text-gray-400 text-sm">
              <li><Link to="/client" className="hover:text-rose-400 transition">Client Portal</Link></li>
              <li><Link to="/planner-portal" className="hover:text-rose-400 transition">Planner Portal</Link></li>
              <li><Link to="/admin" className="hover:text-rose-400 transition">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-semibold text-white">Contact</h4>
            <ul className="mt-3 space-y-2 text-gray-400 text-sm">
              <li>Email: <a href="mailto:hello@wedplan.com" className="hover:text-rose-400">hello@wedplan.com</a></li>
              <li>Phone: <a href="tel:+18005559333" className="hover:text-rose-400">+1 (800) 555-9333</a></li>
              <li>Address: 123 Bridal Ave, New York, NY 10001</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} WedPlan. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
