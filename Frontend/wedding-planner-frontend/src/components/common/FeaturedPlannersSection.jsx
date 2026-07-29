import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PlannerCard from './PlannerCard';
import { HiChevronRight } from 'react-icons/hi2';
import { getPlanners } from '../../services/plannerService';
import { SkeletonCard, ErrorAlert } from './StateFeedback';

const FeaturedPlannersSection = ({ planners = [] }) => {
  const [plannerList, setPlannerList] = useState(planners);
  const [loading, setLoading] = useState(planners.length === 0);
  const [error, setError] = useState(null);

  const fetchPlannersData = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPlanners();
      setPlannerList(data);
    } catch (err) {
      console.error("Failed to load featured planners:", err);
      setError("Unable to load featured wedding planners.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (planners.length > 0) {
      setPlannerList(planners);
      setLoading(false);
    } else {
      fetchPlannersData();
    }
  }, [planners]);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Tag & Header Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-xs font-bold tracking-[0.2em] text-[#EC3664] uppercase block mb-1">
              VERIFIED EXPERTS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900">
              Featured Wedding Planners
            </h2>
          </div>

          <Link
            to="/find-planners"
            className="inline-flex items-center gap-1 bg-[#FFF0F3] hover:bg-[#FCE7F0] text-[#EC3664] px-6 py-2.5 rounded-full text-xs font-bold transition shadow-xs"
          >
            <span>View All Planners</span>
            <HiChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {/* Error State */}
        {error && !loading && <ErrorAlert message={error} onRetry={fetchPlannersData} />}

        {/* Cards Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {plannerList.slice(0, 4).map((planner) => (
              <PlannerCard key={planner.id} planner={planner} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default FeaturedPlannersSection;
