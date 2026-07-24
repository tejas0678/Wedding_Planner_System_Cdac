import React from 'react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: '🔍',
      title: 'Search & Browse',
      description: 'Explore our curated selection of expert wedding planners and beautiful packages tailored to your vision.',
    },
    {
      icon: '📅',
      title: 'Book Your Planner',
      description: 'Connect with the perfect planner or package that matches your style, budget, and wedding dreams.',
    },
    {
      icon: '💍',
      title: 'Your Dream Wedding',
      description: 'Sit back and let the experts handle every detail while you enjoy the journey to your special day.',
    },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-gray-800">
          How It Works
        </h2>
        <p className="text-center text-gray-600 mt-2 text-lg">Three simple steps to your perfect wedding</p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-10">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-rose-100 rounded-full flex items-center justify-center text-4xl shadow-md">
                  {step.icon}
                </div>
              </div>
              <h3 className="mt-4 text-xl font-semibold text-gray-800">{step.title}</h3>
              <p className="mt-2 text-gray-600 max-w-xs mx-auto">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
