import React, { useState } from 'react';
import Navbar from '../../components/common/Navbar';
import BannerSection from '../../components/common/BannerSection';
import StatisticsSection from '../../components/common/StatisticsSection';
import HowItWorksSection from '../../components/common/HowItWorksSection';
import FeaturedPlannersSection from '../../components/common/FeaturedPlannersSection';
import PopularPackagesSection from '../../components/common/PopularPackagesSection';
import CustomerReviews from '../../components/common/CustomerReviews';
import Footer from '../../components/common/Footer';

const Home = () => {
  // State for data from the database (wire these up to your API/fetch calls)
  const [planners] = useState([]);
  const [packages] = useState([]);
  const [reviews] = useState([]);
  const [statistics] = useState({});

  // Example of how you might load real data once a backend is connected:
  //
  // useEffect(() => {
  //   fetch('/api/planners/featured').then(res => res.json()).then(setPlanners);
  //   fetch('/api/packages/popular').then(res => res.json()).then(setPackages);
  //   fetch('/api/reviews').then(res => res.json()).then(setReviews);
  //   fetch('/api/statistics').then(res => res.json()).then(setStatistics);
  // }, []);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <BannerSection />
      <StatisticsSection statistics={statistics} />
      <HowItWorksSection />
      <FeaturedPlannersSection planners={planners} />
      <PopularPackagesSection packages={packages} />
      <CustomerReviews reviews={reviews} />
      <Footer />
    </div>
  );
};

export default Home;
