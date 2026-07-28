import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { FiSearch, FiMapPin, FiStar, FiCalendar, FiMessageSquare } from 'react-icons/fi';

const demoPlanners = [
  {
    id: 1,
    name: 'Royal Touch Weddings Studio',
    city: 'Mumbai',
    experience: '8 Years Exp.',
    rating: 4.9,
    reviews: 128,
    tagline: 'Crafting Royal Dreams & Palace Mandaps into Reality',
    price: '₹2,50,000',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop',
    specialties: ['Royal Destination', 'Mandap Decor', 'Celebrity Artist'],
  },
  {
    id: 2,
    name: 'Vedic Sutra Celebrations',
    city: 'Udaipur',
    experience: '12 Years Exp.',
    rating: 4.8,
    reviews: 95,
    tagline: 'Traditional Elegance & Contemporary Palace Weddings',
    price: '₹3,00,000',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop',
    specialties: ['Heritage Palaces', 'Shehnai Stage', 'Royal Feast'],
  },
  {
    id: 3,
    name: 'Destination Forever Planners',
    city: 'Goa',
    experience: '6 Years Exp.',
    rating: 4.9,
    reviews: 110,
    tagline: 'Exquisite Barefoot Beach & Luxury Destination Weddings',
    price: '₹2,80,000',
    image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&auto=format&fit=crop',
    specialties: ['Sunset Beach', 'Gazebo Mandap', 'Acoustic Band'],
  },
  {
    id: 4,
    name: 'Blissful Knot Events',
    city: 'Jaipur',
    experience: '10 Years Exp.',
    rating: 4.7,
    reviews: 84,
    tagline: 'Fort Weddings & Grand Rajasthani Cultural Decor',
    price: '₹3,50,000',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&auto=format&fit=crop',
    specialties: ['Fort Venues', 'Folk Dancers', 'Royal Baraat'],
  },
  {
    id: 5,
    name: 'Velvet Petal Concierge',
    city: 'Delhi',
    experience: '7 Years Exp.',
    rating: 4.9,
    reviews: 142,
    tagline: 'High-Fashion Modern Floral Layouts & Farmhouse Mandaps',
    price: '₹4,00,000',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop',
    specialties: ['Farmhouse Decor', 'LED Truss', 'Gourmet Catering'],
  },
  {
    id: 6,
    name: 'Aura Luxury Weddings',
    city: 'Bangalore',
    experience: '9 Years Exp.',
    rating: 4.8,
    reviews: 76,
    tagline: 'Eco-Friendly Intimate Glasshouse & Floral Canopies',
    price: '₹2,20,000',
    image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&auto=format&fit=crop',
    specialties: ['Eco Intimate', 'Glasshouse Mandap', 'Drone 4K'],
  },
];

export default function FindPlanners() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');

  // Handle Planner Action Clicks (Auth Redirect Logic)
  const handlePlannerAction = (e, planner) => {
    e.stopPropagation();
    const token = localStorage.getItem('authToken');

    if (!token) {
      // Prompt message and redirect to Login Page for unauthenticated visitors
      alert('Please sign in to continue.');
      navigate('/login');
    } else {
      // Direct authenticated users to Client Dashboard
      navigate('/client/dashboard');
    }
  };

  // Filter logic
  const filteredPlanners = demoPlanners.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          p.tagline.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCity = selectedCity === 'All' || p.city.toLowerCase() === selectedCity.toLowerCase();
    return matchesSearch && matchesCity;
  });

  return (
    <div className="min-h-screen bg-[#FFF8F9] flex flex-col font-sans">
      <Navbar />

      {/* 1. HERO HEADER SECTION */}
      <section className="bg-[#4E0A1A] py-16 px-4 text-center text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-block bg-[#E2B13C]/20 border border-[#E2B13C]/40 text-[#E2B13C] text-[11px] font-extrabold px-4 py-1 rounded-full uppercase tracking-wider mb-4">
            ✨ INDIA'S MOST TRUSTED WEDDING NETWORK
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Find Expert Wedding Planners
          </h1>
          <p className="text-rose-100/80 text-sm sm:text-base font-light max-w-2xl mx-auto mb-8">
            Browse verified luxury planning studios, view portfolios, pricing, and connect directly for your dream celebration.
          </p>

          {/* Search & Filter Bar */}
          <div className="bg-white p-3 rounded-2xl sm:rounded-full shadow-2xl max-w-3xl mx-auto flex flex-col sm:flex-row items-center gap-3 text-gray-800">
            <div className="flex items-center gap-2 px-4 flex-1 w-full">
              <FiSearch className="w-5 h-5 text-[#EC3664]" />
              <input
                type="text"
                placeholder="Search planner name, style or venue..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none"
              />
            </div>

            <div className="border-t sm:border-t-0 sm:border-l border-gray-200 px-4 py-1 w-full sm:w-auto">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full bg-transparent text-xs sm:text-sm font-bold text-gray-800 focus:outline-none cursor-pointer"
              >
                <option value="All">All Cities</option>
                <option value="Mumbai">Mumbai</option>
                <option value="Udaipur">Udaipur</option>
                <option value="Goa">Goa</option>
                <option value="Jaipur">Jaipur</option>
                <option value="Delhi">Delhi</option>
                <option value="Bangalore">Bangalore</option>
              </select>
            </div>
          </div>

        </div>
      </section>

      {/* 2. PLANNER CARDS GRID SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 flex-1">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="font-serif text-3xl font-bold text-gray-900">
              Verified Wedding Planners
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm font-light mt-1">
              Showing {filteredPlanners.length} top rated planning studios
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPlanners.map((planner) => (
            <div
              key={planner.id}
              onClick={(e) => handlePlannerAction(e, planner)}
              className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 border border-rose-100/60 flex flex-col justify-between cursor-pointer group"
            >
              
              <div>
                {/* Top Image Container */}
                <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                  <img
                    src={planner.image}
                    alt={planner.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  
                  {/* Rating Badge */}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-full text-xs font-bold text-gray-800 shadow-md flex items-center gap-1.5 border border-gray-100">
                    <FiStar className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{planner.rating}</span>
                    <span className="text-gray-400 font-normal">({planner.reviews})</span>
                  </div>

                  {/* Specialties Pills */}
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                    {planner.specialties.map((spec, i) => (
                      <span key={i} className="bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-6">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#EC3664] mb-1.5">
                    <FiMapPin className="w-3.5 h-3.5" />
                    <span>{planner.city} • {planner.experience}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-gray-900 group-hover:text-[#EC3664] transition-colors leading-snug">
                    {planner.name}
                  </h3>

                  <p className="mt-2 text-xs text-gray-500 font-light leading-relaxed line-clamp-2">
                    {planner.tagline}
                  </p>
                </div>
              </div>

              {/* Card Actions Footer */}
              <div className="px-6 py-4 bg-[#FFF9FA] border-t border-rose-100/60 flex items-center justify-between gap-2">
                <div>
                  <span className="block text-[9px] font-extrabold tracking-wider text-gray-400 uppercase">
                    STARTS FROM
                  </span>
                  <span className="font-serif text-lg font-bold text-[#EC3664]">
                    {planner.price}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => handlePlannerAction(e, planner)}
                    className="bg-[#FFF0F3] hover:bg-[#FCE7F0] text-[#EC3664] px-3.5 py-2 rounded-full text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <FiMessageSquare className="w-3.5 h-3.5" />
                    <span>Contact</span>
                  </button>

                  <button
                    onClick={(e) => handlePlannerAction(e, planner)}
                    className="bg-[#EC3664] hover:bg-[#d42d57] text-white px-4 py-2 rounded-full text-xs font-bold shadow-xs hover:shadow-md transition cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>

      </section>

      <Footer />
    </div>
  );
}
