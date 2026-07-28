import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { FiCheck, FiSearch, FiSliders } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

const demoPackages = [
  {
    id: 1,
    tag: '300 GUESTS MAX',
    category: 'Royal Destination',
    vendor: 'ROYAL TOUCH WEDDINGS STUDIO',
    title: 'Royal Heritage Destination Package',
    price: '₹7,65,600',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop',
    features: [
      '300 Guests 5-Star Royal Catering',
      'Lakeside Palace Mandap & Royal Chandeliers',
      '4K Cinematic Drone & Pre-Wedding Film',
      'Celebrity DJ, Concert Stage & Fog Machines',
      'Cold Pyros Fireworks Bridal Entry',
    ],
  },
  {
    id: 2,
    tag: '200 GUESTS MAX',
    category: 'Beach Romance',
    vendor: 'DESTINATION FOREVER PLANNERS',
    title: 'Sunset Beach Romance Package',
    price: '₹7,20,000',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop',
    features: [
      '200 Guests Seafood & Continental Buffet',
      'Barefoot Seaside Floral Gazebo Mandap',
      'Live Acoustic Band & Beachside Fairy Lights',
      'Drone Aerial Photo & Video Coverage',
      'Welcome Drinks & Sunset Cocktail Bar',
    ],
  },
  {
    id: 3,
    tag: '400 GUESTS MAX',
    category: 'Traditional Sangeet',
    vendor: 'VEDIC SUTRA CELEBRATIONS',
    title: 'Grand Palace Sangeet Spectacle',
    price: '₹8,50,000',
    image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&auto=format&fit=crop',
    features: [
      '400 Guests Authentic Rajasthani Thali & Desserts',
      'Grand Fort Stage with LED Wall Backdrop',
      'Folk Dancers, Dhol Troupe & Shehnai Stage',
      'Royal Doli Carriage & Horse Baraat Setup',
      'Comprehensive Multi-Cam Photography',
    ],
  },
  {
    id: 4,
    tag: '150 GUESTS MAX',
    category: 'Eco Intimate',
    vendor: 'AURA LUXURY WEDDINGS',
    title: 'Eco Intimate Glasshouse Garden Setup',
    price: '₹4,50,000',
    image: 'https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=800&auto=format&fit=crop',
    features: [
      '150 Guests Farm-to-Table Organic Banquet',
      'Glasshouse Canopy & Fresh Rose Archways',
      'Unplugged Acoustic Guitar & Violins',
      'Sustainable Floral Styling & Keepsakes',
      'Full Day Candid Photography Package',
    ],
  },
  {
    id: 5,
    tag: '500 GUESTS MAX',
    category: 'Royal Destination',
    vendor: 'BLISSFUL KNOT EVENTS',
    title: 'Maharaja Destination Celebration',
    price: '₹12,00,000',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&auto=format&fit=crop',
    features: [
      '500 Guests Multi-Cuisine Live Buffet Counters',
      'Palace Courtyard Mandap & Vintage Car Entry',
      'Full 3-Day Event Coverage (Haldi, Mehendi, Sangeet)',
      'Celebrity Choreographer & Anchor Team',
      'Customized Royal Invitation Hampers',
    ],
  },
  {
    id: 6,
    tag: '250 GUESTS MAX',
    category: 'Beach Romance',
    vendor: 'VELVET PETAL CONCIERGE',
    title: 'Coastal Sunset Horizon Experience',
    price: '₹6,80,000',
    image: 'https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=800&auto=format&fit=crop',
    features: [
      '250 Guests Beachside BBQ & International Bar',
      'Pastel Floral Canopy with Ocean Backdrop',
      'Live Saxophone & Percussion Performance',
      'Cinematic Drone Video & Photobook',
      'Bridal Beauty Spa & Stylist Concierge',
    ],
  },
];

export default function PublicPackages() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const handlePackageAction = (e, actionName = 'Book Package') => {
    e.stopPropagation();
    const token = localStorage.getItem('authToken');

    if (!token) {
      alert('Please sign in to continue.');
      navigate('/login');
    } else {
      navigate('/client/dashboard');
    }
  };

  const filteredPackages = demoPackages.filter((pkg) => {
    const matchesCategory = selectedCategory === 'All' || pkg.category === selectedCategory;
    const matchesSearch = pkg.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          pkg.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FFF8F9] flex flex-col font-sans">
      <Navbar />

      {/* 1. HERO HEADER SECTION */}
      <section className="bg-[#4E0A1A] py-16 px-4 text-center text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto relative z-10">
          <span className="inline-flex items-center gap-1.5 bg-[#E2B13C]/20 border border-[#E2B13C]/40 text-[#E2B13C] text-[11px] font-extrabold px-4 py-1 rounded-full uppercase tracking-wider mb-4">
            <HiSparkles className="w-3.5 h-3.5" />
            <span>ALL-INCLUSIVE WEDDING DEALS</span>
          </span>

          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">
            Curated Wedding Packages
          </h1>

          <p className="text-rose-100/80 text-sm sm:text-base font-light max-w-2xl mx-auto mb-8">
            Explore turnkey luxury wedding packages created by India's top verified planners. Transparent pricing with full customization.
          </p>

          {/* Search Bar */}
          <div className="bg-white p-3 rounded-2xl sm:rounded-full shadow-2xl max-w-xl mx-auto flex items-center gap-3 text-gray-800">
            <FiSearch className="w-5 h-5 text-[#EC3664] ml-3 shrink-0" />
            <input
              type="text"
              placeholder="Search packages by title or vendor..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-transparent text-xs sm:text-sm font-medium focus:outline-none pr-3"
            />
          </div>

        </div>
      </section>

      {/* 2. PACKAGES MAIN SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1">
        
        {/* Category Filters Row */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10">
          {['All', 'Royal Destination', 'Beach Romance', 'Traditional Sangeet', 'Eco Intimate'].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-5 py-2.5 rounded-full text-xs font-bold transition shrink-0 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#EC3664] text-white shadow-md'
                  : 'bg-white border border-gray-200 text-gray-700 hover:border-rose-300'
              }`}
            >
              {cat === 'All' ? 'All Packages' : cat}
            </button>
          ))}
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 border border-rose-100/60 flex flex-col justify-between"
            >
              <div>
                {/* Image */}
                <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                  <img
                    src={pkg.image}
                    alt={pkg.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 bg-white/95 backdrop-blur-md text-[#EC3664] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider border border-rose-100 shadow-sm">
                    {pkg.tag}
                  </span>
                </div>

                {/* Content Body */}
                <div className="p-7">
                  <span className="text-[10px] font-extrabold tracking-widest text-[#EC3664] uppercase block mb-1">
                    {pkg.vendor}
                  </span>

                  <h3 className="font-serif text-2xl font-bold text-gray-900 leading-snug">
                    {pkg.title}
                  </h3>

                  <p className="font-serif text-3xl font-bold text-[#EC3664] mt-3 mb-6">
                    {pkg.price}
                  </p>

                  <ul className="space-y-2.5 text-xs text-gray-600 font-light border-t border-rose-100/60 pt-5">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <FiCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Actions Footer */}
              <div className="px-7 py-5 bg-[#FFF9FA] border-t border-rose-100/60 flex items-center gap-3">
                <button
                  onClick={(e) => handlePackageAction(e, 'Book Package')}
                  className="flex-1 bg-[#EC3664] hover:bg-[#d42d57] text-white py-3 rounded-full text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer text-center"
                >
                  Book Package
                </button>

                <button
                  onClick={(e) => handlePackageAction(e, 'Customize')}
                  className="flex-1 bg-[#FFF0F3] hover:bg-[#FCE7F0] text-[#EC3664] py-3 rounded-full text-xs font-bold transition-colors cursor-pointer text-center"
                >
                  Customize
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>

      <Footer />
    </div>
  );
}
