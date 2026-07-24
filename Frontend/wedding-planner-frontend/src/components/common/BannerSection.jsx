import React from 'react';
import { Link } from 'react-router-dom';

const BannerSection = () => {
  return (
    <section className="relative bg-gradient-to-r from-rose-50 to-pink-50 py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-gray-800 leading-tight">
              Plan Your Dream <br />
              <span className="text-rose-600">Beautiful Wedding</span> <br />
              With Confidence
            </h1>
            <p className="mt-6 text-lg text-gray-600 max-w-lg">
              Connect with expert wedding planners and curated packages to create an unforgettable celebration of your love story.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/login"
                className="bg-rose-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-rose-700 transition shadow-md hover:shadow-lg"
              >
                Find Your Planner
              </Link>
              <Link
                to="/login"
                className="bg-white text-rose-600 px-8 py-3 rounded-full text-lg font-medium border-2 border-rose-600 hover:bg-rose-50 transition shadow-md hover:shadow-lg"
              >
                Browse Packages
              </Link>
            </div>
          </div>

          {/* Right image */}
          <div className="flex justify-center">
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop"
              alt="Wedding celebration"
              className="rounded-2xl shadow-2xl object-cover w-full max-w-md h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerSection;
