import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const SimplePage = ({ title, subtitle, children }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <section className="py-16 bg-gray-50 flex-1">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-center text-gray-800">
            {title}
          </h1>
          {subtitle && (
            <p className="text-center text-gray-600 mt-2">{subtitle}</p>
          )}
          <div className="mt-10">{children}</div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default SimplePage;
