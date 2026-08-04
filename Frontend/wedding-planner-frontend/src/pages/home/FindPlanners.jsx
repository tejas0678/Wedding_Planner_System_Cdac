import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { FiSearch, FiMapPin, FiStar, FiCalendar, FiMessageSquare } from 'react-icons/fi';
import { getPlanners, getCities } from '../../services/plannerService';
import { SkeletonCard, EmptyState, ErrorAlert } from '../../components/common/StateFeedback';

export default function FindPlanners() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('All');
  const [plannersList, setPlannersList] = useState([]);
  const [citiesList, setCitiesList] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCitiesData = async () => {
      try {
        const cities = await getCities();
        if (cities && cities.length > 0) {
          const uniqueCityNames = Array.from(new Set(cities.map((c) => c.name).filter(Boolean)));
          setCitiesList(['All', ...uniqueCityNames]);
        }
      } catch (err) {
        console.error("Error loading cities list:", err);
      }
    };
    fetchCitiesData();
  }, []);

  const loadPlanners = async (city, search) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPlanners(city, search);
      setPlannersList(data || []);
    } catch (err) {
      console.error("Error loading planners list:", err);
      setError("Unable to load planner directory.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      loadPlanners(selectedCity, searchTerm);
    }, 200);

    return () => clearTimeout(delayDebounceFn);
  }, [selectedCity, searchTerm]);

  // Navigate to planner's specific packages page
  const handleConnectStudio = (e, planner) => {
    e.stopPropagation();
    if (!planner || !planner.id) return;
    navigate(`/planner/${planner.id}/packages`);
  };

  return (
    <div className="min-h-screen bg-[#FFF8F9] flex flex-col font-sans">
      <Navbar />

      {/* Hero Header */}
      <div className="bg-[#4E0A1A] py-16 px-4 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-bold tracking-[0.2em] text-[#E2B13C] uppercase block mb-2">
            PREMIER WEDDING STUDIOS
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Find Your Dream Wedding Planner
          </h1>
          <p className="text-rose-100/80 text-sm sm:text-base max-w-xl mx-auto mb-8 font-light">
            Discover verified luxury wedding planners, palace decor experts, and beach romance specialists across India.
          </p>

          {/* Search & Filter Bar */}
          <div className="bg-white rounded-full p-2 max-w-2xl mx-auto shadow-lg flex items-center gap-2">
            <div className="flex items-center gap-2 pl-4 flex-1 text-gray-700">
              <FiSearch className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search studio name, planner, or city..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none text-sm text-gray-800 focus:outline-none placeholder-gray-400"
              />
            </div>
            
            <div className="border-l border-gray-200 pl-2 pr-2">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="bg-transparent text-xs font-bold text-gray-700 focus:outline-none cursor-pointer pr-2"
              >
                {citiesList.map((c) => (
                  <option key={c} value={c} className="text-gray-900">{c}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {error && !loading && <ErrorAlert message={error} onRetry={() => loadPlanners(selectedCity, searchTerm)} />}

        {!loading && !error && plannersList.length === 0 && (
          <EmptyState
            title="No Planners Found"
            message={selectedCity !== 'All' ? `No planners found in ${selectedCity}.` : "No planners match your search criteria."}
          />
        )}

        {!loading && !error && plannersList.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {plannersList.map((planner) => (
              <div
                key={planner.id}
                className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition duration-300 overflow-hidden flex flex-col group cursor-pointer"
                onClick={(e) => handleConnectStudio(e, planner)}
              >
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={planner.avatarUrl || planner.coverImageUrl || planner.image || "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop"}
                    alt={planner.businessName || planner.fullName}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold text-gray-800 flex items-center gap-1 shadow-xs">
                    <FiStar className="w-3.5 h-3.5 fill-[#E2B13C] text-[#E2B13C]" />
                    <span>{planner.rating || 4.9}</span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-rose-600 font-bold uppercase tracking-wider mb-1">
                      <FiMapPin className="w-3.5 h-3.5" />
                      <span>{planner.city || "India"} • {planner.experience || "8 Years"}</span>
                    </div>
                    <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-[#EC3664] transition">
                      {planner.businessName || planner.fullName}
                    </h3>
                    <p className="text-gray-500 text-xs mt-2 line-clamp-2">
                      {planner.description || "Premier wedding planning studio."}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-400 block font-semibold uppercase">Starting From</span>
                      <span className="text-base font-bold text-gray-900">{planner.startingPrice || "₹1,50,000"}</span>
                    </div>

                    <button
                      onClick={(e) => handleConnectStudio(e, planner)}
                      className="bg-[#EC3664] hover:bg-[#d42d57] text-white px-4 py-2 rounded-full text-xs font-bold shadow-xs transition"
                    >
                      Connect Studio
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
