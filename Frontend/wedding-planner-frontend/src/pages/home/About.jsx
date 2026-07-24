import React from 'react';
import SimplePage from '../../components/common/SimplePage';

const About = () => {
  return (
    <SimplePage title="About WedPlan" subtitle="Your trusted partner in wedding planning since 2018">
      <div className="bg-white rounded-2xl shadow-sm p-8 space-y-4 text-gray-600 leading-relaxed">
        <p>
          WedPlan connects couples with a curated network of expert wedding planners and
          all-inclusive packages, taking the stress out of planning your special day.
        </p>
        <p>
          Since 2018, we've helped hundreds of couples across the country bring their vision
          to life &mdash; from intimate backyard ceremonies to grand destination celebrations.
        </p>
        <p>
          Our mission is simple: match every couple with the right planner, at the right price,
          so they can focus on what matters most &mdash; each other.
        </p>
      </div>
    </SimplePage>
  );
};

export default About;
