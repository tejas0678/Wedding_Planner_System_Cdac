import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { FiCheck, FiSearch, FiMapPin, FiStar } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { getPublicPackages, getPackageFilters } from '../../services/clientService';
import { getPackagesByPlannerId, getPlannerById } from '../../services/plannerService';
import { SkeletonCard, EmptyState, ErrorAlert } from '../../components/common/StateFeedback';
import BookingModal from '../../components/common/BookingModal';

export default function PublicPackages() {
  const navigate = useNavigate();
  const { plannerId: pathPlannerId } = useParams();
  const [searchParams] = useSearchParams();
  const queryPlannerId = searchParams.get('plannerId');
  const activePlannerId = pathPlannerId || queryPlannerId;

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEventType, setSelectedEventType] = useState('All');
  const [selectedTheme, setSelectedTheme] = useState('All');
  const [selectedCity, setSelectedCity] = useState('All');
  const [selectedPlanner, setSelectedPlanner] = useState('All');

  const [filterOptions, setFilterOptions] = useState({
    eventTypes: ['All'],
    themes: ['All'],
    cities: ['All'],
    planners: []
  });

  const [packagesList, setPackagesList] = useState([]);
  const [plannerInfo, setPlannerInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch filter options dynamically on mount
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const res = await getPackageFilters();
        if (res) {
          setFilterOptions({
            eventTypes: ['All', ...(res.eventTypes || [])],
            themes: ['All', ...(res.themes || [])],
            cities: ['All', ...(res.cities || [])],
            planners: res.planners || []
          });
        }
      } catch (err) {
        console.error("Error loading package filters:", err);
      }
    };
    fetchOptions();
  }, []);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(null);

      const targetPlannerId = activePlannerId || (selectedPlanner !== 'All' ? selectedPlanner : null);

      if (activePlannerId && !plannerInfo) {
        const pDetails = await getPlannerById(activePlannerId);
        if (pDetails) setPlannerInfo(pDetails);
      }

      const data = await getPublicPackages({
        plannerId: targetPlannerId,
        eventType: selectedEventType,
        theme: selectedTheme,
        city: selectedCity,
        keyword: searchTerm
      });

      setPackagesList(data || []);
    } catch (err) {
      console.error("Error loading packages list:", err);
      setError("Unable to load package catalog.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchPackages();
    }, 200);

    return () => clearTimeout(delayDebounce);
  }, [activePlannerId, selectedEventType, selectedTheme, selectedCity, selectedPlanner, searchTerm]);

  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);

  const handleSelectPackage = (e, pkg) => {
    if (e) e.stopPropagation();

    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Please sign in to customize and book this package.');
      navigate('/login');
      return;
    }

    const targetPlannerId = pkg.plannerId || activePlannerId;
    const targetPlannerName = plannerInfo?.businessName || plannerInfo?.fullName || pkg.plannerName || pkg.vendor || "Wedding Planner Studio";

    setSelectedPackage({
      id: pkg.id,
      packageName: pkg.packageName || pkg.title || pkg.name,
      price: pkg.price ? `₹${Number(pkg.price).toLocaleString('en-IN')}` : "Price on Request",
      plannerId: targetPlannerId,
      plannerName: targetPlannerName,
      capacity: pkg.capacity || "As per package",
      eventType: pkg.eventType,
    });
    setIsBookingModalOpen(true);
  };

  const handleResetFilters = () => {
    setSelectedPlanner('All');
  };

  const displayedPackages = packagesList;

  return (
    <div className="min-h-screen bg-[#FFF8F9] flex flex-col font-sans">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-[#4E0A1A] py-14 px-4 text-white text-center">
        <div className="max-w-6xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E2B13C]/20 border border-[#E2B13C]/40 text-[#E2B13C] text-xs font-bold uppercase mb-3">
            <HiSparkles className="w-4 h-4 text-[#E2B13C]" />
            <span>ALL-INCLUSIVE WEDDING BUNDLES</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight mb-3">
            {plannerInfo ? `${plannerInfo.businessName || plannerInfo.fullName} Packages` : 'Curated Wedding Packages'}
          </h1>
          <p className="text-rose-100/80 text-xs sm:text-base max-w-xl mx-auto font-light mb-8">
            {plannerInfo ? `Explore exclusive wedding packages offered by ${plannerInfo.businessName || plannerInfo.fullName} in ${plannerInfo.city || 'India'}.` : 'Filter packages dynamically by Studio.'}
          </p>

          {/* Multi-Criteria Filter Bar */}
          <div className="bg-white rounded-2xl p-4 shadow-xl text-gray-800 max-w-md mx-auto text-left">
            {/* Planner Dropdown */}
            <div className="px-3 py-2 bg-gray-50 rounded-xl border border-gray-200 flex flex-col justify-center">
              <label className="text-[9px] font-extrabold uppercase text-gray-400 tracking-wider block">Planner Studio</label>
              <select
                value={selectedPlanner}
                onChange={(e) => setSelectedPlanner(e.target.value)}
                disabled={Boolean(activePlannerId)}
                className="bg-transparent text-xs font-bold text-gray-800 focus:outline-none cursor-pointer w-full disabled:opacity-60"
              >
                <option value="All">All Planners</option>
                {filterOptions.planners.map((p) => (
                  <option key={p.id} value={p.id} className="text-gray-900">{p.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        {plannerInfo && (
          <div className="bg-white border border-rose-100 rounded-2xl p-5 mb-8 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <img
                src={plannerInfo.avatarUrl || "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop"}
                alt={plannerInfo.businessName || plannerInfo.fullName}
                className="w-12 h-12 rounded-full object-cover border border-rose-200"
              />
              <div>
                <span className="text-[10px] uppercase font-bold text-rose-600 tracking-wider block">STUDIO PACKAGES</span>
                <h2 className="font-serif text-xl font-bold text-gray-900">{plannerInfo.businessName || plannerInfo.fullName}</h2>
                <p className="text-xs text-gray-500">{plannerInfo.city} • {plannerInfo.experience || "8 Years Experience"}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/find-planners')}
              className="text-xs font-bold text-[#EC3664] hover:underline self-start sm:self-center"
            >
              ← Back to All Planners
            </button>
          </div>
        )}

        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {error && !loading && <ErrorAlert message={error} onRetry={fetchPackages} />}

        {!loading && !error && displayedPackages.length === 0 && (
          <div className="text-center py-12">
            <EmptyState
              title="No Packages Found"
              message={plannerInfo ? `No packages available for ${plannerInfo.businessName || plannerInfo.fullName} matching your criteria.` : "No packages match your search and filter criteria."}
            />
            <button
              onClick={handleResetFilters}
              className="mt-4 px-4 py-2 bg-rose-100 text-rose-700 rounded-full text-xs font-bold hover:bg-rose-200 transition"
            >
              Reset Filters
            </button>
          </div>
        )}

        {!loading && !error && displayedPackages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayedPackages.map((pkg) => {
              const pTitle = pkg.packageName || pkg.title || pkg.name;
              const pPrice = typeof pkg.price === 'number' ? `₹${pkg.price.toLocaleString('en-IN')}` : (pkg.price || "Price on Request");
              const pServices = pkg.servicesIncluded ? pkg.servicesIncluded.split(', ') : (pkg.features || []);

              return (
                <div
                  key={pkg.id}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition duration-300 overflow-hidden flex flex-col group"
                >
                  <div className="relative h-56 overflow-hidden bg-gray-100">
                    <img
                      src={pkg.image || pkg.imageUrl || "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop"}
                      alt={pTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-[#EC3664] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-xs">
                      {pkg.category || pkg.tag || "Featured Package"}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[10px] font-extrabold text-[#C9972C] tracking-wider uppercase block mb-1">
                        {plannerInfo?.businessName || pkg.plannerName || "Wedding Planner Package"}
                      </span>
                      <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-[#EC3664] transition">
                        {pTitle}
                      </h3>
                      <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                        {pkg.description || "All-inclusive luxury wedding package."}
                      </p>

                      <div className="mt-4 space-y-2">
                        {pServices.slice(0, 4).map((feat, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-gray-700">
                            <div className="w-4 h-4 rounded-full bg-rose-50 text-[#EC3664] flex items-center justify-center shrink-0">
                              <FiCheck className="w-3 h-3" />
                            </div>
                            <span className="truncate">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] text-gray-400 block font-semibold uppercase">Total Price</span>
                        <span className="text-xl font-serif font-bold text-[#EC3664]">{pPrice}</span>
                      </div>

                      <button
                        onClick={(e) => handleSelectPackage(e, pkg)}
                        className="bg-[#EC3664] hover:bg-[#d42d57] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xs transition cursor-pointer"
                      >
                        Book Package
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />

      <BookingModal
        isOpen={isBookingModalOpen}
        pkg={selectedPackage}
        onClose={() => setIsBookingModalOpen(false)}
      />
    </div>
  );
}
