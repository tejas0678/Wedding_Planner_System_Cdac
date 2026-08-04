import React, { useState } from 'react';
import DashboardLayout from './DashboardLayout';
import ImageUpload from '../../components/common/ImageUpload';
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
  updatePlannerProfile,
  getPlannerPackages, 
  getPlannerServices, 
  getPlannerPortfolio,
  createPortfolioItem,
  deletePortfolioItem,
  getPlannerCustomizations,
  updateCustomizationStatus,
  updateCustomizationRequest,
  sendCustomizationQuotation,
  getPlannerBookings,
  acceptBooking,
  rejectBooking,
  updateBookingStatus,
  createPlannerService,
  updatePlannerService,
  deletePlannerService,
  createPlannerPackage,
  updatePlannerPackage,
  deletePlannerPackage
} from '../../services/plannerService';
import { getPlannerPayments } from '../../services/paymentService';

export const PlannerDashboard = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [customizationsList, setCustomizationsList] = useState([]);
  
  // Customization Modals State
  const [isCustomizationViewOpen, setIsCustomizationViewOpen] = useState(false);
  const [isCustomizationEditOpen, setIsCustomizationEditOpen] = useState(false);
  const [selectedCustomization, setSelectedCustomization] = useState(null);
  const [customizationEditForm, setCustomizationEditForm] = useState({ updatedPrice: '' });
  const [packagesList, setPackagesList] = useState([]);
  const [servicesList, setServicesList] = useState([]);
  const [portfolioItems, setPortfolioItems] = useState([]);
  const [portfolioCategory, setPortfolioCategory] = useState('ALL');
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);
  const [portfolioForm, setPortfolioForm] = useState({
    title: '',
    category: 'Decoration',
    description: '',
    location: '',
    imageUrl: '',
    imagePublicId: ''
  });
  const [bookingsList, setBookingsList] = useState([]);
  const [paymentsList, setPaymentsList] = useState([]);

  // Bookings Modal State
  const [isBookingViewOpen, setIsBookingViewOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  const [dashboardStats, setDashboardStats] = useState({
    totalEarnings: '₹0',
    activeWeddings: 0,
    pendingQuotes: 0,
    rating: 0,
    reviewsCount: 0,
    totalPackages: 0,
    totalServices: 0,
    completedWeddings: 0,
    businessName: '',
    ownerName: ''
  });
  
  const [profileForm, setProfileForm] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    gstNumber: '27AAAAA0000A1Z5',
    description: '',
    avatarUrl: '',
    avatarPublicId: '',
    brandLogoUrl: '',
    brandLogoPublicId: '',
    coverBannerUrl: '',
    serviceCities: '',
    verificationDocumentUrl: '',
    verificationDocumentPublicId: '',
  });
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Package Modal State
  const [isPackageModalOpen, setIsPackageModalOpen] = useState(false);
  const [editingPackageId, setEditingPackageId] = useState(null);
  const [packageForm, setPackageForm] = useState({
    packageName: '',
    description: '',
    eventType: 'Wedding',
    theme: 'Royal',
    city: '',
    venue: '',
    guestCapacity: '',
    image: '',
    imagePublicId: '',
    status: 'Active',
    price: '',
    advancePaymentPercentage: '',
    cancellationPolicy: '',
    foodPreference: 'Pure Veg',
    welcomeDrink: false,
    photography: false,
    cinematicVideo: false,
    preWeddingShoot: false,
    dj: false,
    liveBand: false,
    danceFloor: false,
    fireworks: false,
    makeup: false,
    mehendiArtist: false,
    invitationCards: false,
    transportation: false,
    accommodation: false
  });
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    name: '',
    category: 'DECORATION',
    status: 'Enabled',
    price: '',
    pricingType: '(Fixed)',
    description: ''
  });

  React.useEffect(() => {
    async function loadPlannerData() {
      try {
        const profileRes = await getPlannerProfile();
        const profile = profileRes?.data || profileRes;
        if (profile) {
          setProfileForm({
            businessName: profile.businessName || 'Royal Touch Weddings Studio',
            ownerName: profile.ownerName || profile.fullName || 'Priya Sharma',
            email: profile.email || 'priya@royaltouchweddings.com',
            phone: profile.phone || '+91 98765 43210',
            gstNumber: profile.gstNumber || '27AAAAA0000A1Z5',
            description: profile.description || 'Premier wedding planning studio specializing in regal setups, celebrity weddings, palace mandaps, and high-production destination events.',
            avatarUrl: profile.avatarUrl || '',
            avatarPublicId: profile.avatarPublicId || '',
            brandLogoUrl: profile.brandLogoUrl || '',
            brandLogoPublicId: profile.brandLogoPublicId || '',
            coverBannerUrl: profile.coverBannerUrl || '',
            serviceCities: profile.serviceCities || 'Mumbai, Delhi, Goa',
            verificationDocumentUrl: profile.verificationDocumentUrl || '',
            verificationDocumentPublicId: profile.verificationDocumentPublicId || '',
          });
        }
        const packages = await getPlannerPackages();
        if (packages) setPackagesList(packages);

        const services = await getPlannerServices();
        if (services) setServicesList(services);

        const portfolio = await getPlannerPortfolio();
        if (portfolio) setPortfolioItems(portfolio);

        const customizations = await getPlannerCustomizations();
        if (customizations) setCustomizationsList(customizations);

        const bookings = await getPlannerBookings();
        if (bookings) setBookingsList(bookings);

        const payments = await getPlannerPayments();
        if (payments) setPaymentsList(payments);

        const stats = await getPlannerDashboardStats();
        if (stats) setDashboardStats(stats);
      } catch (err) {
        console.error("Error loading planner profile data:", err);
      }
    }
    loadPlannerData();
  }, []);

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...profileForm,
        fullName: profileForm.ownerName // Map ownerName to fullName for the backend User entity
      };
      await updatePlannerProfile(payload);
      setIsEditingProfile(false);
      alert('Profile updated successfully!');
      
      const profileRes = await getPlannerProfile();
      const profile = profileRes?.data || profileRes;
      if (profile) {
        setProfileForm({
          businessName: profile.businessName || 'Royal Touch Weddings Studio',
          ownerName: profile.ownerName || profile.fullName || 'Priya Sharma',
          email: profile.email || 'priya@royaltouchweddings.com',
          phone: profile.phone || '+91 98765 43210',
          gstNumber: profile.gstNumber || '27AAAAA0000A1Z5',
          description: profile.description || 'Premier wedding planning studio specializing in regal setups, celebrity weddings, palace mandaps, and high-production destination events.',
          avatarUrl: profile.avatarUrl || '',
          avatarPublicId: profile.avatarPublicId || '',
          brandLogoUrl: profile.brandLogoUrl || '',
          brandLogoPublicId: profile.brandLogoPublicId || '',
          coverBannerUrl: profile.coverBannerUrl || '',
          serviceCities: profile.serviceCities || 'Mumbai, Delhi, Goa',
          verificationDocumentUrl: profile.verificationDocumentUrl || '',
          verificationDocumentPublicId: profile.verificationDocumentPublicId || '',
        });
      }
    } catch (err) {
      console.error(err);
      alert('Failed to update profile.');
    }
  };

  const handleUpdateCustomizationStatus = async (id, status) => {
    try {
      await updateCustomizationStatus(id, status);
      alert(`Customization request ${status.toLowerCase()}!`);
      const updated = await getPlannerCustomizations();
      setCustomizationsList(updated || []);
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const handleViewCustomization = (req) => {
    setSelectedCustomization(req);
    setIsCustomizationViewOpen(true);
  };

  const handleEditCustomization = (req) => {
    setSelectedCustomization(req);
    setCustomizationEditForm({ 
      updatedPrice: req.updatedPrice || '',
      plannerNotes: req.plannerNotes || '',
      foodPreference: req.foodPreference || '',
      djRequired: req.djRequired || false,
      djType: req.djType || '',
      cinematicVideo: req.cinematicVideo || false,
      preWeddingShoot: req.preWeddingShoot || false,
      shootLocation: req.shootLocation || '',
      shootDuration: req.shootDuration || '',
      welcomeDrink: req.welcomeDrink || false,
      drinkName: req.drinkName || '',
      drinkQuantity: req.drinkQuantity || 0
    });
    setIsCustomizationEditOpen(true);
  };

  const handleUpdateCustomizationSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCustomization) return;
    try {
      await updateCustomizationRequest(selectedCustomization.id, customizationEditForm);
      alert('Customization quote updated!');
      setIsCustomizationEditOpen(false);
      const updated = await getPlannerCustomizations();
      setCustomizationsList(updated || []);
    } catch (err) {
      console.error(err);
      alert('Failed to update customization.');
    }
  };

  const handleSendQuotation = async (id) => {
    if(window.confirm('Are you sure you want to send this quotation to the client?')) {
      try {
        await sendCustomizationQuotation(id);
        alert('Quotation sent successfully!');
      } catch (err) {
        console.error(err);
        alert('Failed to send quotation.');
      }
    }
  };

  const handleViewBooking = (booking) => {
    setSelectedBooking(booking);
    setIsBookingViewOpen(true);
  };

  const handleAcceptBooking = async (id) => {
    try {
      await acceptBooking(id);
      alert('Booking Confirmed successfully!');
      setIsBookingViewOpen(false);
      const updated = await getPlannerBookings();
      setBookingsList(updated || []);
    } catch (err) {
      console.error(err);
      alert('Failed to accept booking.');
    }
  };

  const handleRejectBooking = async (id) => {
    if(window.confirm('Are you sure you want to reject this booking? This cannot be undone.')) {
      try {
        await rejectBooking(id);
        alert('Booking Rejected.');
        setIsBookingViewOpen(false);
        const updated = await getPlannerBookings();
        setBookingsList(updated || []);
      } catch (err) {
        console.error(err);
        alert('Failed to reject booking.');
      }
    }
  };

  // Removed hardcoded states



  // Handle Delete Portfolio Item
  const handleDeletePortfolio = async (id) => {
    if (window.confirm('Are you sure you want to delete this photo?')) {
      try {
        await deletePortfolioItem(id);
        const portfolio = await getPlannerPortfolio();
        setPortfolioItems(portfolio);
        alert('Photo deleted.');
      } catch (err) {
        console.error(err);
        alert('Failed to delete photo.');
      }
    }
  };

  const handleAddPortfolioClick = () => {
    setPortfolioForm({
      title: '',
      category: 'Decoration',
      description: '',
      location: '',
      imageUrl: '',
      imagePublicId: ''
    });
    setIsPortfolioModalOpen(true);
  };

  const handlePortfolioSubmit = async (e) => {
    e.preventDefault();
    if (!portfolioForm.imageUrl) {
      alert('Please upload a photo before saving.');
      return;
    }
    try {
      await createPortfolioItem(portfolioForm);
      const portfolio = await getPlannerPortfolio();
      setPortfolioItems(portfolio);
      setIsPortfolioModalOpen(false);
      alert('Portfolio photo uploaded successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to upload portfolio photo.');
    }
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

  // --- Packages CRUD Handlers ---
  const handleAddPackageClick = () => {
    setEditingPackageId(null);
    setPackageForm({
      packageName: '',
      description: '',
      eventType: 'Wedding',
      theme: 'Royal',
      city: '',
      venue: '',
      guestCapacity: '',
      image: '',
      imagePublicId: '',
      status: 'Active',
      price: '',
      advancePaymentPercentage: '',
      cancellationPolicy: '',
      foodPreference: 'Pure Veg',
      welcomeDrink: false,
      photography: false,
      cinematicVideo: false,
      preWeddingShoot: false,
      dj: false,
      liveBand: false,
      danceFloor: false,
      fireworks: false,
      makeup: false,
      mehendiArtist: false,
      invitationCards: false,
      transportation: false,
      accommodation: false
    });
    setIsPackageModalOpen(true);
  };

  const handleEditPackageClick = (pkg) => {
    setEditingPackageId(pkg.id);
    setPackageForm({
      packageName: pkg.packageName || '',
      description: pkg.description || '',
      eventType: pkg.eventType || 'Wedding',
      theme: pkg.theme || 'Royal',
      city: pkg.city || '',
      venue: pkg.venue || '',
      guestCapacity: pkg.guestCapacity || '',
      image: pkg.image || '',
      imagePublicId: pkg.imagePublicId || '',
      status: pkg.status || 'Active',
      price: pkg.price || '',
      advancePaymentPercentage: pkg.advancePaymentPercentage || '',
      cancellationPolicy: pkg.cancellationPolicy || '',
      foodPreference: pkg.foodPreference || 'Pure Veg',
      welcomeDrink: pkg.welcomeDrink || false,
      photography: pkg.photography || false,
      cinematicVideo: pkg.cinematicVideo || false,
      preWeddingShoot: pkg.preWeddingShoot || false,
      dj: pkg.dj || false,
      liveBand: pkg.liveBand || false,
      danceFloor: pkg.danceFloor || false,
      fireworks: pkg.fireworks || false,
      makeup: pkg.makeup || false,
      mehendiArtist: pkg.mehendiArtist || false,
      invitationCards: pkg.invitationCards || false,
      transportation: pkg.transportation || false,
      accommodation: pkg.accommodation || false
    });
    setIsPackageModalOpen(true);
  };

  const handlePackageSubmit = async (e) => {
    e.preventDefault();
    if (!packageForm.image) {
      alert('Please upload a package image before saving.');
      return;
    }
    try {
      if (editingPackageId) {
        await updatePlannerPackage(editingPackageId, packageForm);
      } else {
        await createPlannerPackage(packageForm);
      }
      
      const packages = await getPlannerPackages();
      setPackagesList(packages);
      
      const stats = await getPlannerDashboardStats();
      setDashboardStats(stats);
      
      setIsPackageModalOpen(false);
      alert('Package saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save package.');
    }
  };

  const handleDeletePackage = async (id) => {
    if (window.confirm('Are you sure you want to delete this package?')) {
      try {
        await deletePlannerPackage(id);
        setPackagesList(packagesList.filter(p => p.id !== id));
        const stats = await getPlannerDashboardStats();
        setDashboardStats(stats);
        alert('Package deleted successfully!');
      } catch (err) {
        console.error(err);
        alert('Failed to delete package.');
      }
    }
  };

  // --- Services CRUD Handlers ---
  const handleAddServiceClick = () => {
    setEditingServiceId(null);
    setServiceForm({
      name: '',
      category: 'DECORATION',
      status: 'Enabled',
      price: '',
      pricingType: '(Fixed)',
      description: ''
    });
    setIsServiceModalOpen(true);
  };

  const handleEditServiceClick = (service) => {
    setEditingServiceId(service.id);
    setServiceForm({
      name: service.name || '',
      category: service.category || 'DECORATION',
      status: service.status || 'Enabled',
      price: service.price || '',
      pricingType: service.pricingType || '(Fixed)',
      description: service.description || ''
    });
    setIsServiceModalOpen(true);
  };

  const handleServiceSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingServiceId) {
        await updatePlannerService(editingServiceId, serviceForm);
      } else {
        await createPlannerService(serviceForm);
      }
      
      const services = await getPlannerServices();
      setServicesList(services);
      
      const stats = await getPlannerDashboardStats();
      setDashboardStats(stats);
      
      setIsServiceModalOpen(false);
      alert('Service saved successfully!');
    } catch (err) {
      console.error(err);
      alert('Failed to save service.');
    }
  };

  const handleDeleteService = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await deletePlannerService(id);
        setServicesList(servicesList.filter(s => s.id !== id));
        const stats = await getPlannerDashboardStats();
        setDashboardStats(stats);
        alert('Service deleted successfully!');
      } catch (err) {
        console.error(err);
        alert('Failed to delete service.');
      }
    }
  };

  // Filtered Portfolio
  const filteredPortfolio = portfolioCategory === 'ALL'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category.toUpperCase() === portfolioCategory.toUpperCase());

  const pendingCustomizationsCount = customizationsList.filter(req => req.status === 'PENDING').length;

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
              {dashboardStats.totalEarnings}
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
              {dashboardStats.pendingQuotes}
            </span>
          </div>

          <div className="bg-white border border-rose-100/80 rounded-2xl p-4 text-center shadow-xs">
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block mb-1">
              UPCOMING
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
              {dashboardStats.activeWeddings}
            </span>
          </div>

          <div className="bg-white border border-rose-100/80 rounded-2xl p-4 text-center shadow-xs">
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block mb-1">
              COMPLETED
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
              {dashboardStats.completedWeddings}
            </span>
          </div>

          <div className="bg-white border border-rose-100/80 rounded-2xl p-4 text-center shadow-xs">
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block mb-1">
              SERVICES
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-emerald-600">
              {dashboardStats.totalServices}
            </span>
          </div>

          <div className="bg-white border border-rose-100/80 rounded-2xl p-4 text-center shadow-xs">
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block mb-1">
              PACKAGES
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-[#EC3664]">
              {dashboardStats.totalPackages}
            </span>
          </div>

          <div className="bg-white border border-rose-100/80 rounded-2xl p-4 text-center shadow-xs">
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block mb-1">
              CLIENTS
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
              {dashboardStats.completedWeddings + dashboardStats.activeWeddings}
            </span>
          </div>

          <div className="bg-white border border-rose-100/80 rounded-2xl p-4 text-center shadow-xs">
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block mb-1">
              RATING
            </span>
            <div className="flex items-center justify-center gap-1 font-serif text-xl sm:text-2xl font-bold text-amber-500">
              <span>{dashboardStats.rating}</span>
              <FiStar className="w-4 h-4 fill-amber-400" />
            </div>
          </div>

          <div className="bg-white border border-rose-100/80 rounded-2xl p-4 text-center shadow-xs">
            <span className="text-[10px] font-extrabold text-gray-400 tracking-wider uppercase block mb-1">
              REVIEWS
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-gray-900">
              {dashboardStats.reviewsCount}
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
            <span>Customization Requests ({pendingCustomizationsCount})</span>
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
            <span>Bookings ({bookingsList.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
              activeTab === 'payments'
                ? 'bg-[#EC3664] text-white shadow-sm'
                : 'text-gray-700 hover:text-[#EC3664] hover:bg-rose-50/50'
            }`}
          >
            <FiDollarSign className="w-4 h-4" />
            <span>Payments ({paymentsList.length})</span>
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

                {/* Profile Photo */}
                <div>
                  <ImageUpload
                    label="Profile Photo"
                    folder="wedding-planner/planner/profile"
                    disabled={!isEditingProfile}
                    value={{ imageUrl: profileForm.avatarUrl, publicId: profileForm.avatarPublicId }}
                    onChange={({ imageUrl, publicId }) => setProfileForm({ ...profileForm, avatarUrl: imageUrl, avatarPublicId: publicId })}
                  />
                </div>

                {/* Studio Logo */}
                <div>
                  <ImageUpload
                    label="Studio Logo"
                    folder="wedding-planner/planner/logo"
                    disabled={!isEditingProfile}
                    value={{ imageUrl: profileForm.brandLogoUrl, publicId: profileForm.brandLogoPublicId }}
                    onChange={({ imageUrl, publicId }) => setProfileForm({ ...profileForm, brandLogoUrl: imageUrl, brandLogoPublicId: publicId })}
                  />
                </div>

                {/* Verification Document (optional) */}
                <div>
                  <ImageUpload
                    label="Verification Document (Optional)"
                    folder="wedding-planner/planner/verification"
                    disabled={!isEditingProfile}
                    value={{ imageUrl: profileForm.verificationDocumentUrl, publicId: profileForm.verificationDocumentPublicId }}
                    onChange={({ imageUrl, publicId }) => setProfileForm({ ...profileForm, verificationDocumentUrl: imageUrl, verificationDocumentPublicId: publicId })}
                  />
                </div>

                {/* Cover Banner URL */}
                <div>
                  <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-2">
                    Cover Banner URL
                  </label>
                  <input
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.coverBannerUrl}
                    onChange={(e) => setProfileForm({ ...profileForm, coverBannerUrl: e.target.value })}
                    placeholder="https://example.com/banner.jpg"
                    className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl px-4 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#EC3664] focus:bg-white disabled:opacity-90"
                  />
                </div>

                {/* Service Cities */}
                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-2">
                    Service Cities (Comma separated)
                  </label>
                  <input
                    type="text"
                    disabled={!isEditingProfile}
                    value={profileForm.serviceCities}
                    onChange={(e) => setProfileForm({ ...profileForm, serviceCities: e.target.value })}
                    placeholder="Mumbai, Delhi, Goa"
                    className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl px-4 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#EC3664] focus:bg-white disabled:opacity-90"
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
                onClick={handleAddPortfolioClick}
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
                        src={item.imageUrl}
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
                onClick={handleAddServiceClick}
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

                  <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end gap-2">
                    <button 
                      onClick={() => handleEditServiceClick(service)}
                      className="bg-[#FFF0F3] hover:bg-[#FCE7F0] text-[#EC3664] px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteService(service.id)}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer"
                    >
                      Delete
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
                onClick={handleAddPackageClick}
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
                    {pkg.image && (
                      <div className="h-48 rounded-2xl mb-4 overflow-hidden border border-gray-100">
                        <img src={pkg.image} alt={pkg.packageName} className="w-full h-full object-cover" />
                      </div>
                    )}
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-extrabold text-[#EC3664] uppercase tracking-wider">
                        {pkg.category || pkg.eventType}
                      </span>
                      <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-3 py-1 rounded-full">
                        {pkg.status}
                      </span>
                    </div>

                    <h3 className="font-serif text-3xl font-bold text-gray-900">
                      {pkg.packageName}
                    </h3>
                    
                    <p className="font-serif text-3xl font-bold text-[#EC3664] mt-2 mb-6">
                      ₹{pkg.price}
                    </p>

                    <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <button 
                      onClick={() => alert(`Previewing ${pkg.packageName}`)}
                      className="text-gray-400 hover:text-[#EC3664] transition flex items-center gap-1 text-xs font-bold uppercase tracking-wider cursor-pointer"
                    >
                      <FiEye className="w-4 h-4" />
                      Preview
                    </button>

                    <div className="flex gap-2">
                      <button 
                        onClick={() => handleEditPackageClick(pkg)}
                        className="bg-[#FFF0F3] hover:bg-[#FCE7F0] text-[#EC3664] px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer"
                      >
                        Edit
                      </button>
                      <button 
                        onClick={() => handleDeletePackage(pkg.id)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2 rounded-full text-xs font-bold transition cursor-pointer"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        )}

        {/* TAB 5: CUSTOMIZATION REQUESTS */}
        {activeTab === 'customization' && (
          <div className="bg-white rounded-3xl border border-rose-100/80 p-8 shadow-xs overflow-x-auto">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">
              Pending Customization Requests
            </h2>
            <p className="text-gray-500 text-sm font-light mb-8">
              Review custom package requests sent by clients.
            </p>

            <div className="min-w-[800px]">
              {(!customizationsList || customizationsList.length === 0) ? (
                <p className="text-gray-500">No pending customization requests.</p>
              ) : (
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-xs text-gray-400 uppercase tracking-wider">
                      <th className="py-4 px-4 font-bold">Booking ID</th>
                      <th className="py-4 px-4 font-bold">Client</th>
                      <th className="py-4 px-4 font-bold">Wedding Date</th>
                      <th className="py-4 px-4 font-bold">Request Date</th>
                      <th className="py-4 px-4 font-bold">Status</th>
                      <th className="py-4 px-4 font-bold text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {customizationsList.map((req) => {
                      const booking = bookingsList.find((b) => b.id === req.bookingId);
                      const bookingIdStr = booking && booking.bookingNumber ? booking.bookingNumber : `WPB-${req.bookingId || req.id}`;
                      const weddingDate = booking && booking.eventDate ? new Date(booking.eventDate).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'TBD';
                      const requestDate = req.createdAt ? new Date(req.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : 'N/A';
                      
                      return (
                        <tr key={req.id} className="hover:bg-rose-50/30 transition">
                          <td className="py-4 px-4 text-sm font-bold text-gray-900">{bookingIdStr}</td>
                          <td className="py-4 px-4 text-sm font-medium text-gray-700">{req.clientName || 'Client'}</td>
                          <td className="py-4 px-4 text-sm text-gray-600">{weddingDate}</td>
                          <td className="py-4 px-4 text-sm text-gray-600">{requestDate}</td>
                          <td className="py-4 px-4">
                            <span className={`text-[10px] font-bold px-3 py-1 rounded-full uppercase ${
                              req.status === 'PENDING' ? 'bg-amber-100 text-amber-700' :
                              req.status === 'ACCEPTED' ? 'bg-indigo-100 text-indigo-700' :
                              req.status === 'APPROVED_BY_CLIENT' ? 'bg-emerald-100 text-emerald-700' :
                              (req.status === 'REJECTED' || req.status === 'REJECTED_BY_CLIENT') ? 'bg-red-100 text-red-700' :
                              'bg-amber-100 text-amber-700'
                            }`}>
                              {req.status === 'PENDING' ? 'New' :
                               req.status === 'ACCEPTED' ? 'Under Review' :
                               req.status === 'APPROVED_BY_CLIENT' ? 'Approved' :
                               (req.status === 'REJECTED' || req.status === 'REJECTED_BY_CLIENT') ? 'Rejected' :
                               'Pending'}
                            </span>
                          </td>
                          <td className="py-4 px-4 text-center">
                            {req.status === 'PENDING' ? (
                              <div className="flex items-center justify-center gap-2">
                                <button onClick={() => handleViewCustomization(req)} className="text-gray-500 hover:text-gray-900 text-xs font-bold transition cursor-pointer">View</button>
                                <span className="text-gray-300">·</span>
                                <button onClick={() => handleUpdateCustomizationStatus(req.id, 'ACCEPTED')} className="text-emerald-600 hover:text-emerald-700 text-xs font-bold transition cursor-pointer">Approve</button>
                                <span className="text-gray-300">·</span>
                                <button onClick={() => handleUpdateCustomizationStatus(req.id, 'REJECTED')} className="text-red-600 hover:text-red-700 text-xs font-bold transition cursor-pointer">Reject</button>
                              </div>
                            ) : (
                              <div className="flex items-center justify-center gap-2">
                                <button onClick={() => handleEditCustomization(req)} className="text-gray-500 hover:text-gray-900 text-xs font-bold transition cursor-pointer">Edit</button>
                                <span className="text-gray-300">·</span>
                                <button onClick={() => handleSendQuotation(req.id)} className="text-[#EC3664] hover:text-[#d42d57] text-xs font-bold transition cursor-pointer">Send Quotation</button>
                              </div>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
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
              {(!bookingsList || bookingsList.length === 0) ? (
                <p className="text-gray-500">No client bookings yet.</p>
              ) : (
                bookingsList.map((booking) => (
                  <div key={booking.id} className="p-6 rounded-2xl border border-gray-100 bg-[#FFF9FA] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${booking.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' : booking.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}>
                        {booking.status}
                      </span>
                      <h4 className="font-serif text-2xl font-bold text-gray-900 mt-2">{booking.packageName || 'Custom Package'}</h4>
                      <p className="text-xs text-gray-500 mt-1">Client: {booking.user?.fullName || 'Client'} • Date: {booking.eventDate || 'TBD'}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-serif text-2xl font-bold text-[#EC3664]">₹{booking.totalAmount || '0'}</span>
                      <button onClick={() => handleViewBooking(booking)} className="block mt-2 bg-[#EC3664] text-white px-5 py-2 rounded-full text-xs font-bold hover:bg-[#d42d57] transition cursor-pointer">
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

        {/* TAB: PAYMENTS RECEIVED */}
        {activeTab === 'payments' && (
          <div className="bg-white rounded-3xl border border-rose-100/80 p-8 shadow-xs">
            <h2 className="font-serif text-3xl font-bold text-gray-900 mb-2">
              Payments Received
            </h2>
            <p className="text-gray-500 text-sm font-light mb-8">
              Every payment a client has completed for one of your bookings, most recent first.
            </p>

            {(!paymentsList || paymentsList.length === 0) ? (
              <p className="text-gray-500">No payments received yet.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-[10px] font-bold text-gray-400 uppercase tracking-wider border-b border-gray-100">
                      <th className="pb-3 pr-4">Booking</th>
                      <th className="pb-3 pr-4">Client</th>
                      <th className="pb-3 pr-4">Package</th>
                      <th className="pb-3 pr-4">Event Date</th>
                      <th className="pb-3 pr-4">Amount Paid</th>
                      <th className="pb-3 pr-4">Payment Date</th>
                      <th className="pb-3">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentsList.map((p) => (
                      <tr key={p.paymentId} className="border-b border-gray-50 hover:bg-[#FFF9FA] transition">
                        <td className="py-3 pr-4 font-semibold text-gray-800">{p.bookingNumber || `#${p.bookingId}`}</td>
                        <td className="py-3 pr-4 text-gray-600">{p.clientName || 'Client'}</td>
                        <td className="py-3 pr-4 text-gray-600">{p.packageName || '—'}</td>
                        <td className="py-3 pr-4 text-gray-600">{p.eventDate || 'TBD'}</td>
                        <td className="py-3 pr-4 font-bold text-[#EC3664]">₹{Number(p.amount || 0).toLocaleString('en-IN')}</td>
                        <td className="py-3 pr-4 text-gray-600">
                          {p.transactionDate ? new Date(p.transactionDate).toLocaleDateString('en-IN') : '—'}
                        </td>
                        <td className="py-3">
                          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                            p.status === 'Paid' ? 'bg-emerald-100 text-emerald-700' :
                            p.status === 'Failed' ? 'bg-rose-100 text-rose-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {p.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

      </div>

      {/* SERVICE MODAL */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative my-8">
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6">
              {editingServiceId ? 'Edit Service' : 'Add New Service'}
            </h3>
            
            <form onSubmit={handleServiceSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Service Name</label>
                <input 
                  type="text" 
                  value={serviceForm.name}
                  onChange={(e) => setServiceForm({...serviceForm, name: e.target.value})}
                  required
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC3664]/50 focus:border-[#EC3664] transition"
                  placeholder="e.g. Royal Mandap & Floral Decor"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Category</label>
                  <select 
                    value={serviceForm.category}
                    onChange={(e) => setServiceForm({...serviceForm, category: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC3664]/50 focus:border-[#EC3664] transition"
                  >
                    <option value="DECORATION">Decoration</option>
                    <option value="CATERING">Catering</option>
                    <option value="PHOTOGRAPHY">Photography</option>
                    <option value="DJ & SOUND">DJ & Sound</option>
                    <option value="VENUE">Venue</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Status</label>
                  <select 
                    value={serviceForm.status}
                    onChange={(e) => setServiceForm({...serviceForm, status: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC3664]/50 focus:border-[#EC3664] transition"
                  >
                    <option value="Enabled">Enabled</option>
                    <option value="Disabled">Disabled</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Price (₹)</label>
                  <input 
                    type="number" 
                    value={serviceForm.price}
                    onChange={(e) => setServiceForm({...serviceForm, price: e.target.value})}
                    required
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC3664]/50 focus:border-[#EC3664] transition"
                    placeholder="e.g. 150000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Pricing Type</label>
                  <select 
                    value={serviceForm.pricingType}
                    onChange={(e) => setServiceForm({...serviceForm, pricingType: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC3664]/50 focus:border-[#EC3664] transition"
                  >
                    <option value="(Fixed)">(Fixed)</option>
                    <option value="(Per Guest)">(Per Guest)</option>
                    <option value="(Per Day)">(Per Day)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Description</label>
                <textarea 
                  value={serviceForm.description}
                  onChange={(e) => setServiceForm({...serviceForm, description: e.target.value})}
                  required
                  rows="3"
                  className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC3664]/50 focus:border-[#EC3664] transition resize-none"
                  placeholder="Service description..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-[#EC3664] hover:bg-[#d42d57] transition cursor-pointer"
                >
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* PACKAGE MODAL */}
      {isPackageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-4xl shadow-2xl relative my-8 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6 sticky top-0 bg-white z-10 pb-4 border-b border-gray-100">
              {editingPackageId ? 'Edit Package' : 'Create Package'}
            </h3>
            
            <form onSubmit={handlePackageSubmit} className="space-y-6">
              
              {/* Basic Information */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-800">Basic Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Package Name *</label>
                    <input 
                      type="text" 
                      value={packageForm.packageName}
                      onChange={(e) => setPackageForm({...packageForm, packageName: e.target.value})}
                      required
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC3664]/50 focus:border-[#EC3664] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Event Type *</label>
                    <select 
                      value={packageForm.eventType}
                      onChange={(e) => setPackageForm({...packageForm, eventType: e.target.value})}
                      required
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC3664]/50 focus:border-[#EC3664] transition"
                    >
                      <option value="Wedding">Wedding</option>
                      <option value="Engagement">Engagement</option>
                      <option value="Reception">Reception</option>
                      <option value="Haldi">Haldi</option>
                      <option value="Mehendi">Mehendi</option>
                      <option value="Sangeet">Sangeet</option>
                      <option value="Destination Wedding">Destination Wedding</option>
                      <option value="Anniversary">Anniversary</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Theme *</label>
                    <select 
                      value={packageForm.theme}
                      onChange={(e) => setPackageForm({...packageForm, theme: e.target.value})}
                      required
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC3664]/50 focus:border-[#EC3664] transition"
                    >
                      <option value="Royal">Royal</option>
                      <option value="Traditional">Traditional</option>
                      <option value="Modern">Modern</option>
                      <option value="Beach">Beach</option>
                      <option value="Garden">Garden</option>
                      <option value="Luxury">Luxury</option>
                      <option value="Vintage">Vintage</option>
                      <option value="Custom">Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">City *</label>
                    <input 
                      type="text" 
                      value={packageForm.city}
                      onChange={(e) => setPackageForm({...packageForm, city: e.target.value})}
                      required
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC3664]/50 focus:border-[#EC3664] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Venue *</label>
                    <input 
                      type="text" 
                      value={packageForm.venue}
                      onChange={(e) => setPackageForm({...packageForm, venue: e.target.value})}
                      required
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC3664]/50 focus:border-[#EC3664] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Max Guest Capacity *</label>
                    <input 
                      type="number" 
                      value={packageForm.guestCapacity}
                      onChange={(e) => setPackageForm({...packageForm, guestCapacity: e.target.value})}
                      required
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC3664]/50 focus:border-[#EC3664] transition"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Description *</label>
                    <textarea 
                      value={packageForm.description}
                      onChange={(e) => setPackageForm({...packageForm, description: e.target.value})}
                      required
                      rows="3"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC3664]/50 focus:border-[#EC3664] transition resize-none"
                    ></textarea>
                  </div>
                  <div className="sm:col-span-2">
                    <ImageUpload
                      label="Package Image *"
                      folder="wedding-planner/planner/packages"
                      value={{ imageUrl: packageForm.image, publicId: packageForm.imagePublicId }}
                      onChange={({ imageUrl, publicId }) => setPackageForm({ ...packageForm, image: imageUrl, imagePublicId: publicId })}
                    />
                  </div>
                </div>
              </div>

              {/* Pricing & Policy */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-800 border-t border-gray-100 pt-6">Package Pricing & Policy</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Base Price (₹) *</label>
                    <input 
                      type="number" 
                      value={packageForm.price}
                      onChange={(e) => setPackageForm({...packageForm, price: e.target.value})}
                      required
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC3664]/50 focus:border-[#EC3664] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Advance % *</label>
                    <input 
                      type="number" 
                      value={packageForm.advancePaymentPercentage}
                      onChange={(e) => setPackageForm({...packageForm, advancePaymentPercentage: e.target.value})}
                      required
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC3664]/50 focus:border-[#EC3664] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Availability</label>
                    <select 
                      value={packageForm.status}
                      onChange={(e) => setPackageForm({...packageForm, status: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC3664]/50 focus:border-[#EC3664] transition"
                    >
                      <option value="Active">Available</option>
                      <option value="Inactive">Not Available</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-3">
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Cancellation Policy</label>
                    <textarea 
                      value={packageForm.cancellationPolicy}
                      onChange={(e) => setPackageForm({...packageForm, cancellationPolicy: e.target.value})}
                      rows="2"
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC3664]/50 focus:border-[#EC3664] transition resize-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Catering */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-800 border-t border-gray-100 pt-6">Catering</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Food Preference</label>
                    <select 
                      value={packageForm.foodPreference}
                      onChange={(e) => setPackageForm({...packageForm, foodPreference: e.target.value})}
                      className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC3664]/50 focus:border-[#EC3664] transition"
                    >
                      <option value="Pure Veg">Pure Veg</option>
                      <option value="Non-Veg">Non-Veg</option>
                      <option value="Pure Veg & Jain">Pure Veg & Jain</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <input 
                      type="checkbox" 
                      checked={packageForm.welcomeDrink}
                      onChange={(e) => setPackageForm({...packageForm, welcomeDrink: e.target.checked})}
                      className="w-5 h-5 accent-[#EC3664]"
                    />
                    <label className="text-sm font-bold text-gray-700">Includes Welcome Drink</label>
                  </div>
                </div>
              </div>

              {/* Toggles / Checkboxes for Included Services */}
              <div className="space-y-4">
                <h4 className="text-lg font-bold text-gray-800 border-t border-gray-100 pt-6">Included Services</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-4 gap-x-6">
                  {/* Photography */}
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={packageForm.photography} onChange={(e) => setPackageForm({...packageForm, photography: e.target.checked})} className="w-5 h-5 accent-[#EC3664]" />
                    <label className="text-sm font-bold text-gray-700">Photography</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={packageForm.cinematicVideo} onChange={(e) => setPackageForm({...packageForm, cinematicVideo: e.target.checked})} className="w-5 h-5 accent-[#EC3664]" />
                    <label className="text-sm font-bold text-gray-700">Cinematic Video</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={packageForm.preWeddingShoot} onChange={(e) => setPackageForm({...packageForm, preWeddingShoot: e.target.checked})} className="w-5 h-5 accent-[#EC3664]" />
                    <label className="text-sm font-bold text-gray-700">Pre-Wedding Shoot</label>
                  </div>

                  {/* Entertainment */}
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={packageForm.dj} onChange={(e) => setPackageForm({...packageForm, dj: e.target.checked})} className="w-5 h-5 accent-[#EC3664]" />
                    <label className="text-sm font-bold text-gray-700">DJ Included</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={packageForm.liveBand} onChange={(e) => setPackageForm({...packageForm, liveBand: e.target.checked})} className="w-5 h-5 accent-[#EC3664]" />
                    <label className="text-sm font-bold text-gray-700">Live Band</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={packageForm.danceFloor} onChange={(e) => setPackageForm({...packageForm, danceFloor: e.target.checked})} className="w-5 h-5 accent-[#EC3664]" />
                    <label className="text-sm font-bold text-gray-700">Dance Floor</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={packageForm.fireworks} onChange={(e) => setPackageForm({...packageForm, fireworks: e.target.checked})} className="w-5 h-5 accent-[#EC3664]" />
                    <label className="text-sm font-bold text-gray-700">Fireworks</label>
                  </div>

                  {/* Additional */}
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={packageForm.makeup} onChange={(e) => setPackageForm({...packageForm, makeup: e.target.checked})} className="w-5 h-5 accent-[#EC3664]" />
                    <label className="text-sm font-bold text-gray-700">Makeup</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={packageForm.mehendiArtist} onChange={(e) => setPackageForm({...packageForm, mehendiArtist: e.target.checked})} className="w-5 h-5 accent-[#EC3664]" />
                    <label className="text-sm font-bold text-gray-700">Mehendi Artist</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={packageForm.invitationCards} onChange={(e) => setPackageForm({...packageForm, invitationCards: e.target.checked})} className="w-5 h-5 accent-[#EC3664]" />
                    <label className="text-sm font-bold text-gray-700">Invitation Cards</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={packageForm.transportation} onChange={(e) => setPackageForm({...packageForm, transportation: e.target.checked})} className="w-5 h-5 accent-[#EC3664]" />
                    <label className="text-sm font-bold text-gray-700">Transportation</label>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" checked={packageForm.accommodation} onChange={(e) => setPackageForm({...packageForm, accommodation: e.target.checked})} className="w-5 h-5 accent-[#EC3664]" />
                    <label className="text-sm font-bold text-gray-700">Accommodation</label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t border-gray-100 sticky bottom-0 bg-white">
                <button 
                  type="button" 
                  onClick={() => setIsPackageModalOpen(false)}
                  className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-8 py-2.5 rounded-full text-sm font-bold text-white bg-[#EC3664] hover:bg-[#d42d57] transition shadow-lg shadow-rose-200 cursor-pointer"
                >
                  Save Package
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CUSTOMIZATION VIEW MODAL */}
      {isCustomizationViewOpen && selectedCustomization && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative my-8">
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6">
              Customization Details
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="font-bold text-gray-500 block text-xs">Food Preference</span>{selectedCustomization.foodPreference || 'N/A'}</div>
                <div><span className="font-bold text-gray-500 block text-xs">Welcome Drink</span>{selectedCustomization.welcomeDrink ? `${selectedCustomization.drinkName} (x${selectedCustomization.drinkQuantity})` : 'No'}</div>
                <div><span className="font-bold text-gray-500 block text-xs">Pre-Wed Shoot</span>{selectedCustomization.preWeddingShoot ? `${selectedCustomization.shootLocation} (${selectedCustomization.shootDuration})` : 'No'}</div>
                <div><span className="font-bold text-gray-500 block text-xs">DJ / Sound</span>{selectedCustomization.djRequired ? selectedCustomization.djType : 'No'}</div>
                <div className="col-span-2"><span className="font-bold text-gray-500 block text-xs">Custom Quote</span>₹{selectedCustomization.updatedPrice ? selectedCustomization.updatedPrice.toLocaleString('en-IN') : '0'}</div>
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-100">
              <button onClick={() => setIsCustomizationViewOpen(false)} className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition cursor-pointer">Close</button>
            </div>
          </div>
        </div>
      )}

      {/* CUSTOMIZATION EDIT MODAL */}
      {isCustomizationEditOpen && selectedCustomization && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl relative my-8">
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6">
              Edit Customization Quote
            </h3>
            <form onSubmit={handleUpdateCustomizationSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Updated Price (₹)</label>
                  <input 
                    type="number" 
                    value={customizationEditForm.updatedPrice}
                    onChange={(e) => setCustomizationEditForm({...customizationEditForm, updatedPrice: e.target.value})}
                    required
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC3664]/50 focus:border-[#EC3664] transition"
                    placeholder="e.g. 500000"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Food Preference</label>
                  <select 
                    value={customizationEditForm.foodPreference}
                    onChange={(e) => setCustomizationEditForm({...customizationEditForm, foodPreference: e.target.value})}
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC3664]/50 focus:border-[#EC3664] transition"
                  >
                    <option value="">Select Option</option>
                    <option value="Veg">Veg</option>
                    <option value="Non-Veg">Non-Veg</option>
                    <option value="Both">Both</option>
                  </select>
                </div>

                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <input 
                    type="checkbox" 
                    id="djRequiredEdit"
                    checked={customizationEditForm.djRequired}
                    onChange={(e) => setCustomizationEditForm({...customizationEditForm, djRequired: e.target.checked})}
                    className="w-5 h-5 text-[#EC3664] rounded focus:ring-[#EC3664]"
                  />
                  <label htmlFor="djRequiredEdit" className="text-sm font-bold text-gray-700 cursor-pointer">DJ / Sound System</label>
                </div>
                
                <div className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl border border-gray-200">
                  <input 
                    type="checkbox" 
                    id="cinematicVideoEdit"
                    checked={customizationEditForm.cinematicVideo}
                    onChange={(e) => setCustomizationEditForm({...customizationEditForm, cinematicVideo: e.target.checked})}
                    className="w-5 h-5 text-[#EC3664] rounded focus:ring-[#EC3664]"
                  />
                  <label htmlFor="cinematicVideoEdit" className="text-sm font-bold text-gray-700 cursor-pointer">Cinematic Video</label>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider mb-2">Planner Notes & Quotation Details</label>
                  <textarea 
                    value={customizationEditForm.plannerNotes}
                    onChange={(e) => setCustomizationEditForm({...customizationEditForm, plannerNotes: e.target.value})}
                    rows="3"
                    className="w-full bg-gray-50 border border-gray-200 text-gray-900 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#EC3664]/50 focus:border-[#EC3664] transition"
                    placeholder="Enter breakdown of costs or a message for the client..."
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsCustomizationEditOpen(false)} className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition cursor-pointer">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-[#EC3664] hover:bg-[#d42d57] transition cursor-pointer">Save Quote</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BOOKING VIEW MODAL */}
      {isBookingViewOpen && selectedBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-2xl shadow-2xl relative my-8">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="font-serif text-3xl font-bold text-gray-900">
                  Booking {selectedBooking.bookingNumber}
                </h3>
                <span className={`inline-block mt-2 text-[10px] font-bold px-3 py-1 rounded-full uppercase ${selectedBooking.status === 'CONFIRMED' ? 'bg-emerald-100 text-emerald-700' : selectedBooking.status === 'PENDING' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-700'}`}>
                  {selectedBooking.status}
                </span>
              </div>
              <div className="text-right">
                <span className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Total Amount</span>
                <span className="font-serif text-3xl font-bold text-[#EC3664]">₹{selectedBooking.totalAmount ? selectedBooking.totalAmount.toLocaleString('en-IN') : '0'}</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Client Name</span>
                  <span className="font-medium text-gray-900">{selectedBooking.user?.fullName || 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Client Email</span>
                  <span className="font-medium text-gray-900">{selectedBooking.user?.email || 'N/A'}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Package Selected</span>
                  <span className="font-medium text-gray-900">{selectedBooking.packageName || 'Custom'}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Event Date</span>
                  <span className="font-medium text-gray-900">{selectedBooking.eventDate || 'TBD'}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Venue</span>
                  <span className="font-medium text-gray-900">{selectedBooking.venueName || 'TBD'}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Guest Count</span>
                  <span className="font-medium text-gray-900">{selectedBooking.guestCount || 'TBD'}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Paid Amount</span>
                  <span className="font-medium text-emerald-600">₹{selectedBooking.paidAmount ? selectedBooking.paidAmount.toLocaleString('en-IN') : '0'}</span>
                </div>
                <div>
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">Payment Status</span>
                  <span className="font-medium text-gray-900">{selectedBooking.paymentStatus}</span>
                </div>
              </div>

              {selectedBooking.notes && (
                <div className="pt-4 border-t border-gray-200">
                  <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Client Notes</span>
                  <p className="text-sm text-gray-700 bg-white p-4 rounded-xl border border-gray-100">{selectedBooking.notes}</p>
                </div>
              )}
            </div>

            <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-gray-100">
              <button onClick={() => setIsBookingViewOpen(false)} className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition cursor-pointer">
                Close
              </button>
              {selectedBooking.status === 'PENDING' && (
                <>
                  <button onClick={() => handleRejectBooking(selectedBooking.id)} className="px-6 py-2.5 rounded-full text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 transition cursor-pointer">
                    Reject Booking
                  </button>
                  <button onClick={() => handleAcceptBooking(selectedBooking.id)} className="px-8 py-2.5 rounded-full text-sm font-bold text-white bg-[#EC3664] hover:bg-[#d42d57] transition shadow-lg shadow-rose-200 cursor-pointer">
                    Confirm Booking
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* PORTFOLIO UPLOAD MODAL */}
      {isPortfolioModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl p-6 sm:p-8 w-full max-w-lg shadow-2xl relative my-8">
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-6">Upload Work Photo</h3>
            <form onSubmit={handlePortfolioSubmit} className="space-y-5">
              
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Photo Title</label>
                <input 
                  type="text" required
                  value={portfolioForm.title}
                  onChange={(e) => setPortfolioForm({...portfolioForm, title: e.target.value})}
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#EC3664]"
                  placeholder="e.g. Royal Palace Mandap"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Category</label>
                <select 
                  value={portfolioForm.category}
                  onChange={(e) => setPortfolioForm({...portfolioForm, category: e.target.value})}
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#EC3664]"
                >
                  <option value="Decoration">Decoration</option>
                  <option value="Venue">Venue</option>
                  <option value="Catering">Catering</option>
                  <option value="Bridal Entry">Bridal Entry</option>
                  <option value="Reception">Reception</option>
                  <option value="Mehendi">Mehendi</option>
                  <option value="Haldi">Haldi</option>
                  <option value="Sangeet">Sangeet</option>
                  <option value="Drone">Drone</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Location / Venue</label>
                <input 
                  type="text" 
                  value={portfolioForm.location}
                  onChange={(e) => setPortfolioForm({...portfolioForm, location: e.target.value})}
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-4 py-3 text-sm font-semibold focus:outline-none focus:border-[#EC3664]"
                  placeholder="e.g. Umaid Bhawan Palace, Jodhpur"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Description</label>
                <textarea 
                  rows="3"
                  value={portfolioForm.description}
                  onChange={(e) => setPortfolioForm({...portfolioForm, description: e.target.value})}
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-4 py-3 text-sm font-light focus:outline-none focus:border-[#EC3664]"
                  placeholder="Brief details about the setup..."
                />
              </div>

              <div>
                <ImageUpload
                  label="Portfolio Photo *"
                  folder="wedding-planner/planner/portfolio"
                  value={{ imageUrl: portfolioForm.imageUrl, publicId: portfolioForm.imagePublicId }}
                  onChange={({ imageUrl, publicId }) => setPortfolioForm({ ...portfolioForm, imageUrl, imagePublicId: publicId })}
                />
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button type="button" onClick={() => setIsPortfolioModalOpen(false)} className="px-6 py-2.5 rounded-full text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 transition cursor-pointer">Cancel</button>
                <button type="submit" className="px-6 py-2.5 rounded-full text-sm font-bold text-white bg-[#EC3664] hover:bg-[#d42d57] transition shadow-lg shadow-rose-200 cursor-pointer">Upload Photo</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </DashboardLayout>
  );
};