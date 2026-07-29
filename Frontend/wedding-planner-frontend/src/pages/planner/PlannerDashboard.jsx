import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import { 
  FiBriefcase, 
  FiImage, 
  FiGrid, 
  FiFileText, 
  FiTag, 
  FiCalendar, 
  FiCheckCircle, 
  FiEdit, 
  FiUpload, 
  FiPlus, 
  FiEye, 
  FiTrash2, 
  FiCopy, 
  FiCheck,
  FiPhone,
  FiMail,
  FiMapPin,
  FiStar,
  FiUsers,
  FiDollarSign,
  FiActivity
} from 'react-icons/fi';
import { 
  getPlannerDashboardStats, 
  getPlannerProfile, 
  getPlannerPackages, 
  getPlannerServices, 
  getPlannerPortfolio 
} from '../../services/plannerService';

export const PlannerDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile'); // 'overview' | 'profile' | 'portfolio' | 'services' | 'packages' | 'customization' | 'calendar' | 'bookings'
  
  const [profileForm, setProfileForm] = useState({
    businessName: 'Royal Touch Weddings Studio',
    ownerName: 'Priya Sharma',
    email: 'priya@royaltouchweddings.com',
    phone: '+91 98765 43210',
    gstNumber: '27AAAAA0000A1Z5',
    description: 'Premier wedding planning studio specializing in regal setups, celebrity weddings, palace mandaps, and high-production destination events.',
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  React.useEffect(() => {
    async function loadPlannerData() {
      try {
        const profile = await getPlannerProfile();
        if (profile) {
          setProfileForm({
            businessName: profile.businessName || 'Royal Touch Weddings Studio',
            ownerName: profile.ownerName || 'Priya Sharma',
            email: profile.email || 'priya@royaltouchweddings.com',
            phone: profile.phone || '+91 98765 43210',
            gstNumber: profile.gstNumber || '27AAAAA0000A1Z5',
            description: profile.description || 'Premier wedding planning studio specializing in regal setups, celebrity weddings, palace mandaps, and high-production destination events.',
          });
        }
        const packages = await getPlannerPackages();
        if (packages && packages.length > 0) setPackagesList(packages);

        const services = await getPlannerServices();
        if (services && services.length > 0) setServicesList(services);

        const portfolio = await getPlannerPortfolio();
        if (portfolio && portfolio.length > 0) setPortfolioItems(portfolio);
      } catch (err) {
        console.error("Error loading planner profile data:", err);
      }
    }
    loadPlannerData();
  }, []);

  // Portfolio state
  const [portfolioCategory, setPortfolioCategory] = useState('ALL');
  const [portfolioItems, setPortfolioItems] = useState([
    {
      id: 1,
      title: 'Regal Udaipur Palace Mandap',
      category: 'Decoration',
      description: 'Grand lakeside mandap with red roses, royal chandeliers, and live Shehnai stage.',
      location: 'Udaipur • Royal Destination',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'Sunset Beach Canopy Setup',
      category: 'Venue',
      description: 'Barefoot seaside Mandap with pastel pink roses and floral entrance archway.',
      location: 'Goa • Beach Wedding',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop',
    },
    {
      id: 3,
      title: 'Gourmet Royal Feast Catering',
      category: 'Catering',
      description: '5-Course authentic Rajasthani & International live food stations.',
      location: 'Jaipur • Traditional Hindu',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=800&auto=format&fit=crop',
    },
    {
      id: 4,
      title: 'Fairytale Grand Bridal Entry',
      category: 'Bridal Entry',
      description: 'Cold pyros fireworks entry with floral Doli carriage and folk dancers.',
      location: 'Mumbai • Modern Luxury',
      image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&auto=format&fit=crop',
    },
  ]);

  // Services state
  const [servicesList, setServicesList] = useState([
    {
      id: 1,
      category: 'DECORATION',
      status: 'Enabled',
      name: 'Royal Mandap & Floral Decor',
      description: 'Grand traditional and contemporary floral mandap designs with import flowers and LED lighting.',
      price: '₹1,50,000',
      pricingType: '(Fixed)',
    },
    {
      id: 2,
      category: 'CATERING',
      status: 'Enabled',
      name: 'Gourmet Buffet Catering',
      description: 'Multi-cuisine live buffet counters (Indian, Continental, Oriental & Live Dessert Bar).',
      price: '₹1,200',
      pricingType: '(Per Guest)',
    },
    {
      id: 3,
      category: 'PHOTOGRAPHY',
      status: 'Enabled',
      name: '4K Cinematic Drone Photography',
      description: 'Full day candid photo coverage, cinematic 4K video, drone aerial shots, and pre-wedding film.',
      price: '₹65,000',
      pricingType: '(Per Day)',
    },
    {
      id: 4,
      category: 'DJ & SOUND',
      status: 'Enabled',
      name: 'Sangeet DJ & Concert Stage',
      description: 'Concert grade truss lighting, LED wall backdrop, fog machines, and top celebrity DJ performance.',
      price: '₹45,000',
      pricingType: '(Fixed)',
    },
  ]);

  // Packages state
  const [packagesList, setPackagesList] = useState([
    {
      id: 1,
      tag: '300 GUESTS MAX',
      status: 'Published',
      title: 'Royal Heritage Package',
      price: '₹5,50,000',
      features: [
        '300 Guests Catering',
        'Grand Royal Mandap',
        '4K Cinematic Video',
        'DJ & Stage Lights',
      ],
    },
    {
      id: 2,
      tag: '200 GUESTS MAX',
      status: 'Published',
      title: 'Sunset Beach Romance',
      price: '₹7,20,000',
      features: [
        '200 Guests Beach Dinner',
        'Floral Gazebo Mandap',
        'Drone Photo Coverage',
        'Live Acoustic Band',
      ],
    },
  ]);

  // Handle Profile Save
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setIsEditingProfile(false);
    alert('Business Profile updated successfully!');
  };

  // Handle Delete Portfolio Item
  const handleDeletePortfolio = (id) => {
    setPortfolioItems(portfolioItems.filter((item) => item.id !== id));
  };

  // Handle Duplicate Package
  const handleDuplicatePackage = (pkg) => {
    const newPkg = {
      ...pkg,
      id: Date.now(),
      title: `${pkg.title} (Copy)`,
    };
    setPackagesList([...packagesList, newPkg]);
    alert(`Duplicated package: ${newPkg.title}`);
  };

  // Filtered Portfolio
  const filteredPortfolio = portfolioCategory === 'ALL'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category.toUpperCase() === portfolioCategory.toUpperCase());

  return (
    <DashboardLayout>
      <div className="space-y-8">
        
        {/* 1. STUDIO HERO HEADER CARD */}
        <div className="bg-[#4E0A1A] rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 border border-rose-100/10">
          
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-rose-200 shadow-md shrink-0 bg-gray-800">
              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=300"
                alt="Studio Banner"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-2 mb-2">
                <span className="bg-[#E2B13C]/20 border border-[#E2B13C]/40 text-[#E2B13C] text-[10px] font-extrabold uppercase px-3 py-1 rounded-full">
                  VERIFIED VENDOR
                </span>
                <span className="bg-white/10 text-rose-100 text-[10px] font-bold px-3 py-1 rounded-full">
                  Mumbai Studio
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white">
                {profileForm.businessName}
              </h1>

              <p className="text-rose-100/80 text-xs sm:text-sm font-light mt-1">
                Managed by <span className="font-semibold text-white">{profileForm.ownerName}</span> • 8 Years Experience
              </p>
            </div>
          </div>

          {/* Revenue Card */}
          <div className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-5 text-center min-w-[220px] shrink-0">
            <span className="text-[10px] font-extrabold tracking-widest text-rose-100 uppercase block mb-1">
              TOTAL REVENUE EARNED
            </span>
            <span className="font-serif text-4xl sm:text-5xl font-bold text-[#E2B13C]">
              ₹85.0 Lakhs
            </span>
          </div>

        </div>

        {/* 2. STATS COUNTER ROW (8 CARDS) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          
          <div className="bg-white border border-rose-100/80 rounded-2xl p-4 text-center shadow-xs">
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block mb-1">
              TODAY'S
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#EC3664]">
              2
            </span>
          </div>

          <div className="bg-white border border-rose-100/80 rounded-2xl p-4 text-center shadow-xs">
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block mb-1">
              UPCOMING
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
              8
            </span>
          </div>

          <div className="bg-white border border-rose-100/80 rounded-2xl p-4 text-center shadow-xs">
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block mb-1">
              PENDING
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
              4
            </span>
          </div>

          <div className="bg-white border border-rose-100/80 rounded-2xl p-4 text-center shadow-xs">
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block mb-1">
              CONFIRMED
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-600">
              18
            </span>
          </div>

          <div className="bg-white border border-rose-100/80 rounded-2xl p-4 text-center shadow-xs">
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block mb-1">
              REVENUE
            </span>
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#EC3664]">
              ₹85.0L
            </span>
          </div>

          <div className="bg-white border border-rose-100/80 rounded-2xl p-4 text-center shadow-xs">
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block mb-1">
              CLIENTS
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
              124
            </span>
          </div>

          <div className="bg-white border border-rose-100/80 rounded-2xl p-4 text-center shadow-xs">
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block mb-1">
              RATING
            </span>
            <div className="flex items-center justify-center gap-1 font-serif text-xl sm:text-2xl font-bold text-amber-500">
              <span>4.9</span>
              <FiStar className="w-4 h-4 fill-amber-400" />
            </div>
          </div>

          <div className="bg-white border border-rose-100/80 rounded-2xl p-4 text-center shadow-xs">
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block mb-1">
              REVIEWS
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
              128
            </span>
          </div>

        </div>

        {/* 3. SECONDARY NAVIGATION BAR (TABS) */}
        <div className="bg-white shadow-xs border border-rose-100/60 rounded-2xl p-2 flex flex-wrap items-center gap-2">
          
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'bg-[#EC3664] text-white shadow-sm'
                : 'text-gray-700 hover:text-[#EC3664] hover:bg-rose-50/50'
            }`}
          >
            <FiBriefcase className="w-4 h-4" />
            <span>Business Profile</span>
          </button>

          <button
            onClick={() => setActiveTab('portfolio')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'portfolio'
                ? 'bg-[#EC3664] text-white shadow-sm'
                : 'text-gray-700 hover:text-[#EC3664] hover:bg-rose-50/50'
            }`}
          >
            <FiImage className="w-4 h-4" />
            <span>Portfolio ({portfolioItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'services'
                ? 'bg-[#EC3664] text-white shadow-sm'
                : 'text-gray-700 hover:text-[#EC3664] hover:bg-rose-50/50'
            }`}
          >
            <FiGrid className="w-4 h-4" />
            <span>Services ({servicesList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('packages')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'packages'
                ? 'bg-[#EC3664] text-white shadow-sm'
                : 'text-gray-700 hover:text-[#EC3664] hover:bg-rose-50/50'
            }`}
          >
            <FiFileText className="w-4 h-4" />
            <span>Packages ({packagesList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('customization')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'customization'
                ? 'bg-[#EC3664] text-white shadow-sm'
                : 'text-gray-700 hover:text-[#EC3664] hover:bg-rose-50/50'
            }`}
          >
            <FiTag className="w-4 h-4" />
            <span>Customization Requests (2)</span>
          </button>

          <button
            onClick={() => setActiveTab('calendar')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'calendar'
                ? 'bg-[#EC3664] text-white shadow-sm'
                : 'text-gray-700 hover:text-[#EC3664] hover:bg-rose-50/50'
            }`}
          >
            <FiCalendar className="w-4 h-4" />
            <span>Availability Calendar</span>
          </button>

          <button
            onClick={() => setActiveTab('bookings')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'bookings'
                ? 'bg-[#EC3664] text-white shadow-sm'
                : 'text-gray-700 hover:text-[#EC3664] hover:bg-rose-50/50'
            }`}
          >
            <FiCheckCircle className="w-4 h-4" />
            <span>Bookings (2)</span>
          </button>

        </div>

        {/* 4. TAB CONTENTS */}

        {/* TAB 1: BUSINESS PROFILE (MATCHES SCREENSHOT 1 & 2) */}
        {activeTab === 'profile' && (
          <div className="bg-white rounded-3xl border border-rose-100/80 p-6 sm:p-10 shadow-xs">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
              <div>
                <h2 className="font-serif text-3xl font-bold text-gray-900">
                  Planner Business Profile
                </h2>
                <p className="text-gray-500 text-sm mt-1 font-light">
                  Manage your brand logo, cover banner, contact details, GST, and service cities.
                </p>
              </div>

              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="bg-[#EC3664] hover:bg-[#d42d57] text-white px-6 py-2.5 rounded-full font-bold text-xs shadow-md transition flex items-center gap-2 self-start sm:self-auto cursor-pointer"
              >
                <FiEdit className="w-4 h-4" />
                <span>{isEditingProfile ? 'Cancel Edit' : 'Edit Profile'}</span>
              </button>
            </div>

            <form onSubmit={handleProfileSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Business Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-2">
                    Business Name
                  </label>
                  <input
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.businessName}
                    onChange={(e) => setProfileForm({ ...profileForm, businessName: e.target.value })}
                    className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl px-4 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#EC3664] focus:bg-white disabled:opacity-90"
                  />
                </div>

                {/* Owner Name */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-2">
                    Owner Name
                  </label>
                  <input
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.ownerName}
                    onChange={(e) => setProfileForm({ ...profileForm, ownerName: e.target.value })}
                    className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl px-4 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#EC3664] focus:bg-white disabled:opacity-90"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    disabled={!isEditingProfile}
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl px-4 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#EC3664] focus:bg-white disabled:opacity-90"
                  />
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-2">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.phone}
                    onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                    className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl px-4 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#EC3664] focus:bg-white disabled:opacity-90"
                  />
                </div>

                {/* GST Number */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-2">
                    GST Registration Number
                  </label>
                  <input
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.gstNumber}
                    onChange={(e) => setProfileForm({ ...profileForm, gstNumber: e.target.value })}
                    className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl px-4 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#EC3664] focus:bg-white disabled:opacity-90"
                  />
                </div>

                {/* Business Description */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-2">
                    Business Description
                  </label>
                  <textarea
                    rows={4}
                    disabled={!isEditingProfile}
                    value={profileForm.description}
                    onChange={(e) => setProfileForm({ ...profileForm, description: e.target.value })}
                    className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl p-4 text-sm font-light text-gray-900 leading-relaxed focus:outline-none focus:border-[#EC3664] focus:bg-white disabled:opacity-90"
                  />
                </div>

              </div>

              {isEditingProfile && (
                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="bg-[#EC3664] hover:bg-[#d42d57] text-white px-8 py-3 rounded-full font-bold text-xs shadow-md transition cursor-pointer"
                  >
                    Save Profile Changes
                  </button>
                </div>
              )}

            </form>

          </div>
        )}

        {/* TAB 2: WORK PORTFOLIO (MATCHES SCREENSHOT 3) */}
        {activeTab === 'portfolio' && (
          <div className="space-y-8">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl font-bold text-gray-900">
                  Work Portfolio
                </h2>
                <p className="text-gray-500 text-sm mt-1 font-light">
                  Upload and organize wedding work photos & videos by categories.
                </p>
              </div>

              <button 
                onClick={() => alert('Work photo upload dialog opened!')}
                className="bg-[#EC3664] hover:bg-[#d42d57] text-white px-6 py-2.5 rounded-full font-bold text-xs shadow-md transition flex items-center gap-2 self-start sm:self-auto cursor-pointer"
              >
                <FiUpload className="w-4 h-4" />
                <span>Upload Work Photo</span>
              </button>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2">
              {['ALL', 'Decoration', 'Venue', 'Catering', 'Bridal Entry', 'Reception', 'Mehendi', 'Haldi', 'Sangeet', 'Drone'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPortfolioCategory(cat)}
                  className={`px-5 py-2 rounded-full text-xs font-bold transition shrink-0 cursor-pointer ${
                    portfolioCategory === cat
                      ? 'bg-[#EC3664] text-white shadow-xs'
                      : 'bg-white border border-gray-200 text-gray-700 hover:border-rose-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredPortfolio.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition border border-rose-100/40 flex flex-col justify-between"
                >
                  <div>
                    {/* Image */}
                    <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <span className="absolute top-3 left-3 bg-[#EC3664] text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
                        {item.category}
                      </span>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                      <h3 className="font-serif text-xl font-bold text-gray-900 leading-snug">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-xs text-gray-500 font-light leading-relaxed">
                        {item.description}
                      </p>
                      <span className="block mt-3 text-xs font-bold text-[#EC3664]">
                        {item.location}
                      </span>
                    </div>
                  </div>

                  {/* Footer Actions */}
                  <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between text-gray-400">
                    <button 
                      onClick={() => alert(`Viewing ${item.title}`)}
                      className="hover:text-[#EC3664] p-1 cursor-pointer"
                    >
                      <FiEye className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeletePortfolio(item.id)}
                      className="hover:text-red-500 p-1 cursor-pointer"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </div>

                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 3: SERVICES CATALOG (MATCHES SCREENSHOT 4) */}
        {activeTab === 'services' && (
          <div className="space-y-8">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl font-bold text-gray-900">
                  Services Catalog
                </h2>
                <p className="text-gray-500 text-sm mt-1 font-light">
                  Manage individual service offerings, starting prices, and availability status.
                </p>
              </div>

              <button 
                onClick={() => alert('Add New Service modal opened!')}
                className="bg-[#EC3664] hover:bg-[#d42d57] text-white px-6 py-2.5 rounded-full font-bold text-xs shadow-md transition flex items-center gap-2 self-start sm:self-auto cursor-pointer"
              >
                <FiPlus className="w-4 h-4" />
                <span>Add New Service</span>
              </button>
            </div>

            {/* 4 Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {servicesList.map((service) => (
                <div
                  key={service.id}
                  className="bg-white rounded-3xl p-7 border border-rose-100/60 shadow-xs hover:shadow-lg transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="bg-rose-50 text-[#EC3664] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase border border-rose-100">
                        {service.category}
                      </span>
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                        {service.status}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl font-bold text-gray-900">
                      {service.name}
                    </h3>
                    <p className="mt-2 text-xs text-gray-500 font-light leading-relaxed">
                      {service.description}
                    </p>

                    <div className="mt-4 flex items-baseline gap-1.5">
                      <span className="font-serif text-2xl font-bold text-[#EC3664]">
                        {service.price}
                      </span>
                      <span className="text-xs text-gray-400 font-light">
                        {service.pricingType}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
                    <button 
                      onClick={() => alert(`Edit service: ${service.name}`)}
                      className="bg-[#FFF0F3] hover:bg-[#FCE7F0] text-[#EC3664] px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 4: CUSTOM WEDDING PACKAGES (MATCHES SCREENSHOT 5) */}
        {activeTab === 'packages' && (
          <div className="space-y-8">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-3xl font-bold text-gray-900">
                  Custom Wedding Packages
                </h2>
                <p className="text-gray-500 text-sm mt-1 font-light">
                  Create and publish all-inclusive packages for clients.
                </p>
              </div>

              <button 
                onClick={() => alert('Create Package modal opened!')}
                className="bg-[#EC3664] hover:bg-[#d42d57] text-white px-6 py-2.5 rounded-full font-bold text-xs shadow-md transition flex items-center gap-2 self-start sm:self-auto cursor-pointer"
              >
                <FiPlus className="w-4 h-4" />
                <span>Create Package</span>
              </button>
            </div>

            {/* Packages Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {packagesList.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-white rounded-3xl p-8 border border-rose-100/60 shadow-xs hover:shadow-lg transition flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-extrabold text-[#EC3664] uppercase tracking-wider">
                        {pkg.tag}
                      </span>
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                        {pkg.status}
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl font-bold text-gray-900">
                      {pkg.title}
                    </h3>
                    
                    <p className="font-serif text-3xl font-bold text-[#EC3664] mt-2 mb-6">
                      {pkg.price}
                    </p>

                    <ul className="space-y-2.5 text-xs text-gray-600 font-light border-t border-gray-100 pt-5">
                      {pkg.features.map((feat, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <FiCheck className="w-4 h-4 text-emerald-500 shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 pt-4 border-t border-gray-100 flex justify-start">
                    <button
                      onClick={() => handleDuplicatePackage(pkg)}
                      className="bg-[#FFF0F3] hover:bg-[#FCE7F0] text-[#EC3664] px-5 py-2.5 rounded-full text-xs font-bold transition flex items-center gap-2 cursor-pointer"
                    >
                      <FiCopy className="w-4 h-4" />
                      <span>Duplicate</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 5: CUSTOMIZATION REQUESTS */}
        {activeTab === 'customization' && (
          <div className="bg-white rounded-3xl border border-rose-100/80 p-8 shadow-xs">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">
              Pending Customization Requests
            </h2>
            <p className="text-gray-500 text-sm font-light mb-8">
              Review custom package requests sent by clients.
            </p>

            <div className="space-y-4">
              <div className="bg-[#FFF9FA] border border-rose-100 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#EC3664]">REQUEST #CR-9921 • TEJASSAYANE067</span>
                  <h4 className="font-serif text-xl font-bold text-gray-900 mt-1">Udaipur Mandap & Drone Add-on</h4>
                  <p className="text-xs text-gray-500 mt-1">Requested Guest Count: 500 Guests • Custom Quote: ₹7,65,600</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => alert('Approved quotation request!')} className="bg-[#EC3664] text-white px-5 py-2 rounded-full text-xs font-bold shadow-xs">Approve Quote</button>
                  <button onClick={() => alert('Opened request chat')} className="bg-gray-100 text-gray-700 px-5 py-2 rounded-full text-xs font-bold">Review Details</button>
                </div>
              </div>

              <div className="bg-[#FFF9FA] border border-rose-100 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="text-xs font-bold text-[#EC3664]">REQUEST #CR-9922 • Rahul Kulkarni</span>
                  <h4 className="font-serif text-xl font-bold text-gray-900 mt-1">Goa Sunset Beach Mandap setup</h4>
                  <p className="text-xs text-gray-500 mt-1">Requested Guest Count: 300 Guests • Custom Quote: ₹7,20,000</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => alert('Approved quotation request!')} className="bg-[#EC3664] text-white px-5 py-2 rounded-full text-xs font-bold shadow-xs">Approve Quote</button>
                  <button onClick={() => alert('Opened request chat')} className="bg-gray-100 text-gray-700 px-5 py-2 rounded-full text-xs font-bold">Review Details</button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: AVAILABILITY CALENDAR */}
        {activeTab === 'calendar' && (
          <div className="bg-white rounded-3xl border border-rose-100/80 p-8 shadow-xs">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">
              Availability Calendar
            </h2>
            <p className="text-gray-500 text-sm font-light mb-8">
              Manage dates, blocked periods, and confirmed event schedules for 2026.
            </p>

            <div className="grid grid-cols-7 gap-2 text-center text-xs font-bold text-gray-500 mb-4">
              <span>SUN</span><span>MON</span><span>TUE</span><span>WED</span><span>THU</span><span>FRI</span><span>SAT</span>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {[...Array(31)].map((_, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-2xl text-center text-xs font-bold border ${
                    i === 14 || i === 22
                      ? 'bg-rose-50 border-[#EC3664] text-[#EC3664]'
                      : 'bg-white border-gray-100 text-gray-700 hover:border-rose-200'
                  }`}
                >
                  <span>{i + 1}</span>
                  {i === 14 && <span className="block text-[9px] font-normal mt-1">Udaipur</span>}
                  {i === 22 && <span className="block text-[9px] font-normal mt-1">Goa</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 7: BOOKINGS MANAGEMENT */}
        {activeTab === 'bookings' && (
          <div className="bg-white rounded-3xl border border-rose-100/80 p-8 shadow-xs">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">
              Client Bookings Management
            </h2>
            <p className="text-gray-500 text-sm font-light mb-8">
              View confirmed bookings, dates, and client communication channels.
            </p>

            <div className="space-y-4">
              <div className="p-6 rounded-2xl border border-gray-100 bg-[#FFF9FA] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">Confirmed</span>
                  <h4 className="font-serif text-2xl font-bold text-gray-900 mt-2">Royal Heritage Destination Package</h4>
                  <p className="text-xs text-gray-500 mt-1">Client: TEJASSAYANE067 & Meera Kapoor • Date: Nov 20, 2026</p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-2xl font-bold text-[#EC3664]">₹7,65,600</span>
                  <button onClick={() => alert('Viewing client booking details')} className="block mt-2 bg-[#EC3664] text-white px-5 py-2 rounded-full text-xs font-bold">Manage Booking</button>
                </div>
              </div>

              <div className="p-6 rounded-2xl border border-gray-100 bg-[#FFF9FA] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase">Confirmed</span>
                  <h4 className="font-serif text-2xl font-bold text-gray-900 mt-2">Sunset Beach Romance Package</h4>
                  <p className="text-xs text-gray-500 mt-1">Client: Rahul & Divya Kulkarni • Date: Dec 15, 2026</p>
                </div>
                <div className="text-right">
                  <span className="font-serif text-2xl font-bold text-[#EC3664]">₹7,20,000</span>
                  <button onClick={() => alert('Viewing client booking details')} className="block mt-2 bg-[#EC3664] text-white px-5 py-2 rounded-full text-xs font-bold">Manage Booking</button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </DashboardLayout>
  );
};