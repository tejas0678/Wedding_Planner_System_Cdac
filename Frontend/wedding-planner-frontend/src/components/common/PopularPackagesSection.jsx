import React, { useState, useEffect } from 'react';
import PackageCard from './PackageCard';
import { getPublicPackages } from '../../services/clientService';
import { SkeletonCard, ErrorAlert } from './StateFeedback';

const PopularPackagesSection = ({ packages = [] }) => {
  const [packageList, setPackageList] = useState(packages);
  const [loading, setLoading] = useState(packages.length === 0);
  const [error, setError] = useState(null);

  const fetchPackagesData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPublicPackages();
      setPackageList(data);
    } catch (err) {
      console.error("Failed to load popular packages:", err);
      setError("Unable to load popular packages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (packages.length > 0) {
      setPackageList(packages);
      setLoading(false);
    } else {
      fetchPackagesData();
    }
  }, [packages]);

  return (
    <section className="py-20 bg-[#FAF8F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14">
          <span className="text-xs font-bold tracking-[0.2em] text-[#EC3664] uppercase block mb-1">
            CURATED DEALS
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900">
            Popular All-Inclusive Packages
          </h2>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {/* Error State */}
        {error && !loading && <ErrorAlert message={error} onRetry={fetchPackagesData} />}

        {/* Packages Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {packageList.slice(0, 3).map((pkg) => (
              <PackageCard key={pkg.id} packageData={pkg} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default PopularPackagesSection;
