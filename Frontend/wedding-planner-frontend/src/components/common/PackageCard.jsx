import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createBooking } from '../../services/bookingService';

const PackageCard = ({ packageData }) => {
  const navigate = useNavigate();
  const { id, title, name, price, vendor, plannerName, image, imageUrl, capacity } = packageData;
  const pkgTitle = title || name || 'Royal Heritage Package';

  const handleBookClick = async (e) => {
    if (e) e.stopPropagation();
    const token = localStorage.getItem('authToken');

    if (!token) {
      alert('Please sign in to continue.');
      navigate('/login');
      return;
    }

    try {
      await createBooking({
        packageId: id,
        plannerId: packageData.plannerId || 1,
        packageName: pkgTitle,
        amount: price,
        plannerName: plannerName || vendor || "Royal Touch Weddings Studio",
        guestCount: capacity || "300 Guests"
      });
      alert(`Booking Request for "${pkgTitle}" Created Successfully! Redirecting to your Client Dashboard...`);
      navigate('/client/dashboard');
    } catch (err) {
      console.error("Booking error:", err);
      alert("Failed to create booking. Please try again.");
    }
  };

  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col h-full border border-rose-100/40">
      {/* Top Image */}
      <div className="h-64 w-full overflow-hidden bg-gray-100">
        <img
          src={image || imageUrl || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&auto=format&fit=crop'}
          alt={pkgTitle}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Content Container */}
      <div className="p-7 flex-1 flex flex-col justify-between">
        <div>
          {/* Vendor Tag */}
          <span className="text-[11px] font-extrabold tracking-wider text-[#EC3664] uppercase block mb-1">
            {vendor || plannerName || 'ROYAL TOUCH WEDDINGS'}
          </span>

          {/* Package Title */}
          <h3 className="font-serif text-2xl font-bold text-gray-900 leading-snug">
            {pkgTitle}
          </h3>

          {/* Price */}
          <p className="font-serif text-3xl font-bold text-[#EC3664] mt-3">
            {price}
          </p>
        </div>

        {/* Action Buttons Row */}
        <div className="mt-8 pt-4 flex items-center gap-3">
          <button
            onClick={handleBookClick}
            className="flex-1 bg-[#EC3664] hover:bg-[#d42d57] text-white text-center py-3 rounded-full text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
          >
            Book Package
          </button>
          <button
            onClick={handleBookClick}
            className="flex-1 bg-[#FFF0F3] hover:bg-[#FCE7F0] text-[#EC3664] text-center py-3 rounded-full text-xs font-bold transition-colors cursor-pointer"
          >
            Customize
          </button>
        </div>

      </div>
    </div>
  );
};

export default PackageCard;
