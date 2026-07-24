import React from 'react';
import PlannerCard from './PlannerCard';

const FeaturedPlannersSection = ({ planners = [] }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-gray-800">
          Featured Wedding Planners
        </h2>
        <p className="text-center text-gray-600 mt-2">Meet some of our most celebrated planners</p>

        {planners.length === 0 ? (
          <p className="mt-12 text-center text-gray-400">No planners to display yet.</p>
        ) : (
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {planners.map((planner) => (
              <PlannerCard key={planner.id} planner={planner} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPlannersSection;
