import React from 'react';
import PackageCard from './PackageCard';

const defaultPackages = [
  {
    id: 1,
    vendor: 'ROYAL TOUCH WEDDINGS',
    name: 'Royal Heritage Package',
    price: '₹5,50,000',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    vendor: 'DESTINATION FOREVER PLANNERS',
    name: 'Sunset Beach Romance',
    price: '₹7,20,000',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    vendor: 'BLISSFUL KNOT EVENTS',
    name: 'Modern Minimalist Elegance',
    price: '₹2,80,000',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop',
  },
];

const PopularPackagesSection = ({ packages = [] }) => {
  const displayPackages = packages.length > 0 ? packages : defaultPackages;

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

        {/* Packages Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayPackages.map((pkg) => (
            <PackageCard key={pkg.id} packageData={pkg} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default PopularPackagesSection;
