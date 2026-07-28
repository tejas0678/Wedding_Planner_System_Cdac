import React from 'react';
import { Link } from 'react-router-dom';
import PlannerCard from './PlannerCard';
import { HiChevronRight } from 'react-icons/hi2';

const defaultPlanners = [
  {
    id: 1,
    name: 'Royal Touch Weddings',
    city: 'Mumbai',
    experience: '8 Years Exp.',
    rating: 4.9,
    reviews: 128,
    tagline: 'Crafting Royal Dreams into Reality',
    price: '₹2,50,000',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Vedic Sutra Celebrations',
    city: 'Udaipur',
    experience: '12 Years Exp.',
    rating: 4.8,
    reviews: 95,
    tagline: 'Traditional Elegance & Contemporary Charm',
    price: '₹3,00,000',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Destination Forever Planners',
    city: 'Goa',
    experience: '6 Years Exp.',
    rating: 4.9,
    reviews: 110,
    tagline: 'Exquisite Beach & Luxury Destination Weddings',
    price: '₹2,80,000',
    image: 'https://images.unsplash.com/photo-1544078751-58fee2d8a03b?w=800&auto=format&fit=crop',
  },
  {
    id: 4,
    name: 'Blissful Knot Events',
    city: 'Jaipur',
    experience: '10 Years Exp.',
    rating: 4.7,
    reviews: 84,
    tagline: 'Palace Weddings & Grand Cultural Decor',
    price: '₹3,50,000',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&auto=format&fit=crop',
  },
];

const FeaturedPlannersSection = ({ planners = [] }) => {
  const displayPlanners = planners.length > 0 ? planners : defaultPlanners;

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

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {displayPlanners.map((planner) => (
            <PlannerCard key={planner.id} planner={planner} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturedPlannersSection;
