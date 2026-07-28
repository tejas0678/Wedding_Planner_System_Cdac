import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiMapPin } from 'react-icons/fi';
import { FaStar } from 'react-icons/fa';

const PlannerCard = ({ planner }) => {
  const navigate = useNavigate();
  const { name, experience, rating, reviews, city, tagline, specialization, image, price } = planner;

  const handleCardClick = (e) => {
    if (e) e.stopPropagation();
    const token = localStorage.getItem('authToken');

    if (!token) {
      alert('Please sign in to continue.');
      navigate('/login');
    } else {
      navigate('/client/dashboard');
    }
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col border border-rose-100/40 cursor-pointer group"
    >
      {/* Top Image Container */}
      <div className="relative h-60 w-full overflow-hidden bg-gray-100">
        <img
          src={image || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Rating Pill Top Right */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-md flex items-center gap-1.5 border border-gray-100">
          <FaStar className="w-3.5 h-3.5 text-amber-400" />
          <span>{rating || '4.9'}</span>
          <span className="text-gray-500 font-normal">({reviews || 128})</span>
        </div>
      </div>

      {/* Content Container (Light Blush Tint) */}
      <div className="bg-[#FFF6F8] p-6 flex-1 flex flex-col justify-between">
        <div>
          {/* Location & Experience Tag */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#EC3664]">
            <FiMapPin className="w-3.5 h-3.5" />
            <span>{city || 'Mumbai'} • {experience || '8 Years Exp.'}</span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-2xl font-bold text-gray-900 mt-2 leading-snug group-hover:text-[#EC3664] transition-colors">
            {name}
          </h3>

          {/* Subtitle / Description */}
          <p className="mt-1.5 text-xs text-gray-500 font-light line-clamp-2">
            {tagline || specialization || 'Crafting Royal Dreams into Reality'}
          </p>
        </div>

        {/* Card Footer: Price & View Profile */}
        <div className="mt-6 pt-4 border-t border-rose-200/40 flex items-center justify-between">
          <div>
            <span className="block text-[10px] font-bold tracking-wider text-gray-400 uppercase">
              STARTS FROM
            </span>
            <span className="text-sm font-extrabold text-gray-900">
              {price || '₹2,50,000'}
            </span>
          </div>

          <button
            onClick={handleCardClick}
            className="bg-[#EC3664] hover:bg-[#d42d57] text-white px-5 py-2 rounded-full text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            View Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlannerCard;
