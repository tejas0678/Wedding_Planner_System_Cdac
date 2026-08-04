import React, { useState, useEffect } from 'react';
import { 
  FiPieChart, 
  FiClock, 
  FiSend
} from 'react-icons/fi';
import { submitCustomizationRequest } from '../../services/bookingService';

export default function PackageCustomizerPage({ booking, onSubmitCustomization }) {
  // Extract base price from booking
  const basePrice = booking?.totalAmount || 450000;

  // 1. Food Preference State
  const [foodPreference, setFoodPreference] = useState('Pure Veg');

  // 2. Welcome Drink State
  const [welcomeDrink, setWelcomeDrink] = useState(false);
  const [drinkName, setDrinkName] = useState('Fresh Lime');
  const [drinkQuantity, setDrinkQuantity] = useState(100);

  // 3. Photography State
  const [preWeddingShoot, setPreWeddingShoot] = useState(false);
  const [shootLocation, setShootLocation] = useState('Goa');
  const [shootDuration, setShootDuration] = useState('1 Day');
  const [cinematicVideo, setCinematicVideo] = useState(false);

  // 4. DJ & Entertainment State
  const [djRequired, setDjRequired] = useState(false);
  const [djType, setDjType] = useState('Basic DJ');

  // Dynamic Price State
  const [updatedPrice, setUpdatedPrice] = useState(basePrice);

  // Request Submission Status
  const [submittedStatus, setSubmittedStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Dynamic Price Calculation
  useEffect(() => {
    let price = basePrice;
    
    // Food Preference logic
    if (foodPreference === 'Non-Veg') price += 25000;
    if (foodPreference === 'Pure Veg & Jain') price += 10000;

    // Welcome Drink logic
    if (welcomeDrink) {
      price += 8000; // base flat rate for drinks
    }

    // Pre-Wedding Shoot logic
    if (preWeddingShoot) {
      price += 25000; // base for shoot
      if (cinematicVideo) price += 15000; // Extra for cinematic
    }

    // DJ logic
    if (djRequired) {
      if (djType === 'Basic DJ') price += 15000;
      if (djType === 'Premium DJ') price += 20000;
      if (djType === 'Live Band') price += 40000;
      if (djType === 'Celebrity DJ') price += 100000;
    }

    setUpdatedPrice(price);
  }, [
    basePrice,
    foodPreference,
    welcomeDrink,
    drinkName,
    preWeddingShoot,
    shootLocation,
    cinematicVideo,
    djRequired,
    djType
  ]);


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!booking) {
      alert("No booking selected for customization.");
      return;
    }

    setSubmittedStatus('Pending');

    try {
      setIsSubmitting(true);
      await submitCustomizationRequest(booking.id, {
        foodPreference,
        welcomeDrink,
        drinkName: welcomeDrink ? drinkName : null,
        drinkQuantity: welcomeDrink ? drinkQuantity : null,
        preWeddingShoot,
        shootLocation: preWeddingShoot ? shootLocation : null,
        shootDuration: preWeddingShoot ? shootDuration : null,
        cinematicVideo: preWeddingShoot ? cinematicVideo : null,
        djRequired,
        djType: djRequired ? djType : null,
        updatedPrice
      });
      alert(`Package Customization Request submitted successfully! Total Estimated Quote: ₹${updatedPrice.toLocaleString('en-IN')}. Added to your pending requests!`);
      if (onSubmitCustomization) {
        onSubmitCustomization({
          status: 'Pending',
          updatedPrice
        });
      }
    } catch (err) {
      console.error("Customization error:", err);
      alert("Failed to submit request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      
      {/* HEADER CARD */}
      <div className="bg-white rounded-3xl border border-rose-100/80 p-6 sm:p-10 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-rose-50 flex items-center justify-center text-[#EC3664] shrink-0">
            <FiPieChart className="w-7 h-7" />
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold text-gray-900">
              Wedding Package Customizer
            </h2>
            <p className="text-gray-500 text-xs sm:text-sm font-light mt-1">
              Customize your booking: {booking?.packageName || 'Selected Package'}
            </p>
          </div>
        </div>

        {submittedStatus && (
          <div className="bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-2xl text-xs font-bold flex items-center gap-2">
            <FiClock className="w-4 h-4 text-amber-600 animate-spin" />
            <span>Planner Approval Status: <strong className="uppercase">{submittedStatus}</strong></span>
          </div>
        )}
      </div>

      <form onSubmit={handleFormSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* MAIN FORM SECTIONS */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 1. FOOD PREFERENCE */}
          <div className="bg-white rounded-3xl border border-rose-100/80 p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="font-serif text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4">
              1. Food Preference
            </h3>
            <div>
              <select 
                value={foodPreference} 
                onChange={(e) => setFoodPreference(e.target.value)}
                className="w-full sm:w-1/2 bg-[#FFF9FA] border border-rose-100 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-800 focus:outline-none"
              >
                <option value="Pure Veg">Pure Veg</option>
                <option value="Non-Veg">Non-Veg</option>
                <option value="Pure Veg & Jain">Pure Veg & Jain</option>
              </select>
            </div>
          </div>

          {/* 2. WELCOME DRINK */}
          <div className="bg-white rounded-3xl border border-rose-100/80 p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="font-serif text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4">
              2. Welcome Drink
            </h3>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Include Welcome Drinks?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" checked={welcomeDrink} onChange={() => setWelcomeDrink(true)} className="accent-[#EC3664]" />
                  Yes
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" checked={!welcomeDrink} onChange={() => setWelcomeDrink(false)} className="accent-[#EC3664]" />
                  No
                </label>
              </div>
            </div>

            {welcomeDrink && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Drink Name</label>
                  <select 
                    value={drinkName} 
                    onChange={(e) => setDrinkName(e.target.value)}
                    className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-800 focus:outline-none"
                  >
                    <option value="Fresh Lime">Fresh Lime</option>
                    <option value="Mango Juice">Mango Juice</option>
                    <option value="Fruit Punch">Fruit Punch</option>
                    <option value="Mocktail">Mocktail</option>
                    <option value="Soft Drink">Soft Drink</option>
                    <option value="Welcome Cocktail">Welcome Cocktail</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Quantity (Optional)</label>
                  <input 
                    type="number"
                    value={drinkQuantity}
                    onChange={(e) => setDrinkQuantity(Number(e.target.value))}
                    className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-800 focus:outline-none"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 3. PHOTOGRAPHY */}
          <div className="bg-white rounded-3xl border border-rose-100/80 p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="font-serif text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4">
              3. Photography & Cinematic Video
            </h3>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">Pre-Wedding Shoot?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" checked={preWeddingShoot} onChange={() => setPreWeddingShoot(true)} className="accent-[#EC3664]" />
                  Yes
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" checked={!preWeddingShoot} onChange={() => setPreWeddingShoot(false)} className="accent-[#EC3664]" />
                  No
                </label>
              </div>
            </div>

            {preWeddingShoot && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-gray-50">
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Shoot Location</label>
                  <select 
                    value={shootLocation} 
                    onChange={(e) => setShootLocation(e.target.value)}
                    className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-800 focus:outline-none"
                  >
                    <option value="Goa">Goa</option>
                    <option value="Lonavala">Lonavala</option>
                    <option value="Mahabaleshwar">Mahabaleshwar</option>
                    <option value="Udaipur">Udaipur</option>
                    <option value="Jaipur">Jaipur</option>
                    <option value="Custom Location">Custom Location</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Shoot Duration</label>
                  <input 
                    type="text"
                    value={shootDuration}
                    onChange={(e) => setShootDuration(e.target.value)}
                    className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-800 focus:outline-none"
                    placeholder="e.g. 1 Day"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="flex items-center gap-2 text-sm cursor-pointer mt-2 font-bold text-gray-700">
                    <input type="checkbox" checked={cinematicVideo} onChange={(e) => setCinematicVideo(e.target.checked)} className="accent-[#EC3664]" />
                    Add Cinematic Video Recording
                  </label>
                </div>
              </div>
            )}
          </div>

          {/* 4. ENTERTAINMENT */}
          <div className="bg-white rounded-3xl border border-rose-100/80 p-6 sm:p-8 shadow-xs space-y-6">
            <h3 className="font-serif text-2xl font-bold text-gray-900 border-b border-gray-100 pb-4">
              4. Entertainment
            </h3>
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-2">DJ & Sound System?</label>
              <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" checked={djRequired} onChange={() => setDjRequired(true)} className="accent-[#EC3664]" />
                  Yes
                </label>
                <label className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="radio" checked={!djRequired} onChange={() => setDjRequired(false)} className="accent-[#EC3664]" />
                  No
                </label>
              </div>
            </div>

            {djRequired && (
              <div className="pt-4 border-t border-gray-50">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">DJ Type</label>
                <select 
                  value={djType} 
                  onChange={(e) => setDjType(e.target.value)}
                  className="w-full sm:w-1/2 bg-[#FFF9FA] border border-rose-100 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-800 focus:outline-none"
                >
                  <option value="Basic DJ">Basic DJ</option>
                  <option value="Premium DJ">Premium DJ</option>
                  <option value="Live Band">Live Band</option>
                  <option value="Celebrity DJ">Celebrity DJ</option>
                </select>
              </div>
            )}
          </div>

        </div>

        {/* 5. PRICE SUMMARY & SUBMISSION */}
        <div className="lg:col-span-4">
          <div className="bg-[#4E0A1A] rounded-3xl p-6 sm:p-8 text-white shadow-xl sticky top-28 space-y-6 border border-rose-100/10">
            <div>
              <span className="text-[10px] font-extrabold tracking-widest text-[#E2B13C] uppercase block mb-1">
                UPDATED PACKAGE TOTAL
              </span>
              <h3 className="font-serif text-4xl font-bold text-white transition-all duration-300">
                ₹{updatedPrice.toLocaleString('en-IN')}
              </h3>
            </div>

            <ul className="space-y-2.5 text-xs text-rose-100/80 border-t border-white/10 pt-4">
              <li className="flex justify-between">
                <span>Base Package</span>
                <span className="font-semibold text-white">₹{basePrice.toLocaleString('en-IN')}</span>
              </li>
              <li className="flex justify-between">
                <span>Food Preference</span>
                <span className="font-semibold text-white">{foodPreference}</span>
              </li>
              {welcomeDrink && (
                <li className="flex justify-between">
                  <span>Welcome Drink</span>
                  <span className="font-semibold text-[#E2B13C]">{drinkName}</span>
                </li>
              )}
              {preWeddingShoot && (
                <li className="flex justify-between">
                  <span>Shoot Location</span>
                  <span className="font-semibold text-white">{shootLocation}</span>
                </li>
              )}
              {djRequired && (
                <li className="flex justify-between">
                  <span>DJ Type</span>
                  <span className="font-semibold text-[#E2B13C]">{djType}</span>
                </li>
              )}
            </ul>

            <button 
              type="submit"
              disabled={isSubmitting}
              className={`w-full text-white py-3.5 rounded-full font-bold text-xs shadow-md transition flex items-center justify-center gap-2 ${isSubmitting ? 'bg-gray-500 cursor-not-allowed' : 'bg-[#EC3664] hover:bg-[#d42d57] cursor-pointer'}`}
            >
              <FiSend className="w-4 h-4" />
              <span>{isSubmitting ? 'Submitting...' : 'Submit Customization Request'}</span>
            </button>
          </div>
        </div>

      </form>

    </div>
  );
}
