import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/common/Navbar';
import Footer from '../../components/common/Footer';
import { FiCheck, FiSearch } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';
import { getPublicPackages } from '../../services/clientService';
import { createBooking } from '../../services/bookingService';
import { SkeletonCard, EmptyState, ErrorAlert } from '../../components/common/StateFeedback';

export default function PublicPackages() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [packagesList, setPackagesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPackages = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPublicPackages();
      setPackagesList(data || []);
    } catch (err) {
      console.error("Error loading packages list:", err);
      setError("Unable to load package catalog.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleSelectPackage = async (pkg) => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert('Please sign in to customize and book this package.');
      navigate('/login');
      return;
    }
    
    try {
      await createBooking({
        packageId: pkg.id,
        plannerId: pkg.plannerId || 1,
        packageName: pkg.title || pkg.name,
        amount: pkg.price,
        plannerName: pkg.plannerName || pkg.vendor || "Royal Touch Weddings Studio",
        guestCount: pkg.capacity || "300 Guests"
      });
      alert(`Booking Request for "${pkg.title}" Created Successfully! Redirecting to your Client Dashboard...`);
      navigate('/client/dashboard');
    } catch (err) {
      console.error("Booking error:", err);
      alert("Failed to submit booking request. Please try again.");
    }
  };

  const filteredPackages = packagesList.filter((pkg) => {
    const title = pkg.title || pkg.name || '';
    const category = pkg.category || '';
    const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCat = selectedCategory === 'ALL' || category.toLowerCase().includes(selectedCategory.toLowerCase());
    return matchesSearch && matchesCat;
  });

  return (
    <div className="min-h-screen bg-[#FFF8F9] flex flex-col font-sans">
      <Navbar />

      {/* Hero Banner */}
      <div className="bg-[#4E0A1A] py-16 px-4 text-white text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#E2B13C]/20 border border-[#E2B13C]/40 text-[#E2B13C] text-xs font-bold uppercase mb-3">
            <HiSparkles className="w-4 h-4 text-[#E2B13C]" />
            <span>ALL-INCLUSIVE WEDDING BUNDLES</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight mb-4">
            Curated Wedding Packages
          </h1>
          <p className="text-rose-100/80 text-sm sm:text-base max-w-xl mx-auto font-light mb-8">
            Explore complete wedding bundles including venue decor, gourmet catering, artist bookings, and photography.
          </p>

          {/* Search & Filter Bar */}
          <div className="bg-white rounded-full p-2 max-w-2xl mx-auto shadow-lg flex items-center gap-2">
            <div className="flex items-center gap-2 pl-4 flex-1 text-gray-700">
              <FiSearch className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                type="text"
                placeholder="Search package title or style..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none text-sm text-gray-800 focus:outline-none placeholder-gray-400"
              />
            </div>

            <div className="border-l border-gray-200 pl-2 pr-2">
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-transparent text-xs font-bold text-gray-700 focus:outline-none cursor-pointer pr-2"
              >
                <option value="ALL">All Themes</option>
                <option value="Royal">Royal Destination</option>
                <option value="Beach">Beach Romance</option>
                <option value="Eco">Eco Intimate</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex-1 w-full">
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {error && !loading && <ErrorAlert message={error} onRetry={fetchPackages} />}

        {!loading && !error && filteredPackages.length === 0 && (
          <EmptyState title="No Packages Found" message="Try searching for a different term or theme category." />
        )}

        {!loading && !error && filteredPackages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {filteredPackages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition duration-300 overflow-hidden flex flex-col group cursor-pointer"
                onClick={() => handleSelectPackage(pkg)}
              >
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={pkg.imageUrl || pkg.image || "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop"}
                    alt={pkg.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-[#EC3664] text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full shadow-xs">
                    {pkg.tag || pkg.capacity || "Featured Package"}
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold text-[#C9972C] tracking-wider uppercase block mb-1">
                      {pkg.plannerName || pkg.vendor || "Royal Bliss Studio"}
                    </span>
                    <h3 className="font-serif text-xl font-bold text-gray-900 group-hover:text-[#EC3664] transition">
                      {pkg.title}
                    </h3>
                    <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                      {pkg.description || "All-inclusive luxury wedding package."}
                    </p>

                    <div className="mt-4 space-y-2">
                      {(pkg.features || []).slice(0, 4).map((feat, idx) => (
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
                      <span className="text-xl font-serif font-bold text-[#EC3664]">{pkg.price}</span>
                    </div>

                    <button
                      onClick={() => handleSelectPackage(pkg)}
                      className="bg-[#EC3664] hover:bg-[#d42d57] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-xs transition"
                    >
                      Book Package
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
