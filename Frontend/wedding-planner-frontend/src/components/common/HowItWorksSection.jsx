import React from 'react';
import { Link } from 'react-router-dom';
import { HiArrowRight } from 'react-icons/hi2';

const HowItWorksSection = () => {
  const styles = [
    {
      icon: '👑',
      title: 'Royal Destination',
      description: 'Palace & Heritage Mandaps in Udaipur & Jaipur',
      bgColor: 'bg-[#FFFDEB]',
      borderColor: 'border-[#FDE68A]',
      textColor: 'text-[#92400E]',
      category: 'Destination Wedding',
    },
    {
      icon: '🏖️',
      title: 'Beach Romance',
      description: 'Sunset barefoot celebrations along Goa shores',
      bgColor: 'bg-[#FFF0F3]',
      borderColor: 'border-[#FECDD3]',
      textColor: 'text-[#BE123C]',
      category: 'Beach Romance',
    },
    {
      icon: '🪔',
      title: 'Traditional Sangeet',
      description: 'Vibrant cultural rituals with authentic decor',
      bgColor: 'bg-[#FCF0FA]',
      borderColor: 'border-[#F5D0FE]',
      textColor: 'text-[#86198F]',
      category: 'Traditional Sangeet',
    },
    {
      icon: '🌿',
      title: 'Eco Intimate',
      description: 'Aesthetic garden ceremonies for under 150 guests',
      bgColor: 'bg-[#F0FAF5]',
      borderColor: 'border-[#A7F3D0]',
      textColor: 'text-[#047857]',
      category: 'Eco Intimate',
    },
  ];

  return (
    <section className="py-20 bg-[#FAF8F9]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-gray-900 tracking-tight">
            Explore Wedding Styles
          </h2>
          <p className="mt-3 text-base sm:text-lg text-gray-600 font-light">
            Select a style to view top verified wedding planners.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {styles.map((item, idx) => (
            <div
              key={idx}
              className={`${item.bgColor} border ${item.borderColor} rounded-2xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg`}
            >
              <div>
                <div className="text-3xl mb-5">{item.icon}</div>
                <h3 className="font-serif text-2xl font-bold text-gray-900 leading-snug">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm text-gray-600 leading-relaxed font-light">
                  {item.description}
                </p>
              </div>

              <div className="mt-8 pt-4">
                <Link
                  to={`/find-planners?type=${encodeURIComponent(item.category)}`}
                  className={`inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase ${item.textColor} hover:opacity-80 transition-opacity`}
                >
                  <span>EXPLORE CATEGORY</span>
                  <HiArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
