import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin, FiSearch } from 'react-icons/fi';
import { HiSparkles, HiOutlineHeart } from 'react-icons/hi2';

const BannerSection = () => {
  const navigate = useNavigate();
  const [city, setCity] = useState('All Cities');
  const [budget, setBudget] = useState('Any Budget');
  const [weddingType, setWeddingType] = useState('All Types');

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/find-planners?city=${encodeURIComponent(city)}&budget=${encodeURIComponent(budget)}&type=${encodeURIComponent(weddingType)}`);
  };

  return (
    <section className="relative bg-[#4E0A1A] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#6A0C24] via-[#4E0A1A] to-[#2F040F] text-white pt-20 pb-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Floral Overlay / Pattern */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1519741497674-611481863552?w=1600&auto=format&fit=crop')`
        }}
      />

      <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center z-10">
        
        {/* Top Badge */}
        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#E2B13C]/40 text-[#E2B13C] text-xs sm:text-sm font-semibold tracking-wide shadow-inner mb-8">
          <HiSparkles className="w-4 h-4 text-[#E2B13C]" />
          <span>India's Most Trusted Wedding Planning Network</span>
        </div>

        {/* Hero Title */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-[1.15] max-w-4xl">
          Turn Your Dream Wedding <br className="hidden sm:inline" />
          Into A <span className="text-[#E2B13C]">Royal</span> Masterpiece
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-base sm:text-lg md:text-xl text-rose-100/90 max-w-2xl font-light leading-relaxed">
          Discover luxury wedding planners, top-rated decorators, and tailored royal packages for Udaipur, Goa, Jaipur & all over India.
        </p>

        {/* Floating Search / Filter Bar */}
        <div className="w-full max-w-4xl mt-12 bg-white rounded-3xl p-4 sm:p-5 shadow-2xl text-gray-800 border border-rose-100/20">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
            
            {/* Filter 1: City / Location */}
            <div className="md:col-span-3 text-left px-3 py-1 border-b md:border-b-0 md:border-r border-gray-100">
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-1">
                <FiMapPin className="w-3.5 h-3.5 text-[#EC3664]" />
                <span>City / Location</span>
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full bg-transparent font-semibold text-gray-800 focus:outline-none text-sm cursor-pointer"
              >
                <option value="All Cities">All Cities</option>
                <option value="Udaipur">Udaipur</option>
                <option value="Goa">Goa</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Delhi">Delhi</option>
              </select>
            </div>

            {/* Filter 2: Max Budget */}
            <div className="md:col-span-3 text-left px-3 py-1 border-b md:border-b-0 md:border-r border-gray-100">
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-1">
                <span className="text-[#E2B13C] font-bold text-xs">₹</span>
                <span>Max Budget</span>
              </label>
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full bg-transparent font-semibold text-gray-800 focus:outline-none text-sm cursor-pointer"
              >
                <option value="Any Budget">Any Budget</option>
                <option value="Under ₹5 Lakhs">Under ₹5 Lakhs</option>
                <option value="₹5 Lakhs - ₹10 Lakhs">₹5 Lakhs - ₹10 Lakhs</option>
                <option value="₹10 Lakhs - ₹20 Lakhs">₹10 Lakhs - ₹20 Lakhs</option>
                <option value="Above ₹20 Lakhs">Above ₹20 Lakhs</option>
              </select>
            </div>

            {/* Filter 3: Wedding Type */}
            <div className="md:col-span-3 text-left px-3 py-1">
              <label className="flex items-center gap-1.5 text-[11px] font-bold text-gray-500 tracking-wider uppercase mb-1">
                <HiOutlineHeart className="w-3.5 h-3.5 text-[#EC3664]" />
                <span>Wedding Type</span>
              </label>
              <select
                value={weddingType}
                onChange={(e) => setWeddingType(e.target.value)}
                className="w-full bg-transparent font-semibold text-gray-800 focus:outline-none text-sm cursor-pointer"
              >
                <option value="All Types">All Types</option>
                <option value="Destination Wedding">Destination Wedding</option>
                <option value="Beach Romance">Beach Romance</option>
                <option value="Traditional Sangeet">Traditional Sangeet</option>
                <option value="Eco Intimate">Eco Intimate</option>
              </select>
            </div>

            {/* Action Button */}
            <div className="md:col-span-3">
              <button
                type="submit"
                className="w-full bg-[#EC3664] hover:bg-[#d42d57] text-white font-bold py-3.5 px-6 rounded-2xl md:rounded-full flex items-center justify-center gap-2 shadow-lg shadow-rose-500/25 transition-all cursor-pointer group"
              >
                <FiSearch className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="text-sm">Explore Planners</span>
              </button>
            </div>

          </form>
        </div>

      </div>
    </section>
  );
};

export default BannerSection;
