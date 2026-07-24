import React from 'react';
import PackageCard from './PackageCard';

const PopularPackagesSection = ({ packages = [] }) => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-gray-800">
          Popular Wedding Packages
        </h2>
        <p className="text-center text-gray-600 mt-2">Choose the perfect package for your celebration</p>

        {packages.length === 0 ? (
          <p className="mt-12 text-center text-gray-400">No packages to display yet.</p>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <PackageCard key={pkg.id} packageData={pkg} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PopularPackagesSection;
