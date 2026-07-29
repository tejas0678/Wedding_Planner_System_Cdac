import React, { useState } from 'react';
import { 
  FiPieChart, 
  FiCheckCircle, 
  FiSliders, 
  FiClock, 
  FiSend,
  FiDollarSign,
  FiGift,
  FiCamera,
  FiMusic,
  FiMapPin
} from 'react-icons/fi';
import { createBooking } from '../../services/bookingService';

export default function PackageCustomizerPage({ addedCustomItems = [], onSubmitCustomization }) {
  // 1. Catering State
  const [foodType, setFoodType] = useState('Pure Veg & Jain Available');
  const [cuisine, setCuisine] = useState('North Indian & Continental');
  const [welcomeDrinks, setWelcomeDrinks] = useState('Botanical Mocktails & Fresh Juices');
  const [breakfastMenu, setBreakfastMenu] = useState('South Indian Tiffin & Live Paratha Counter');
  const [lunchMenu, setLunchMenu] = useState('Royal Rajasthani Thali & International Buffet');
  const [dinnerMenu, setDinnerMenu] = useState('5-Star Gourmet Barbeque & Mughlai Feast');
  const [dessertMenu, setDessertMenu] = useState('Belgian Gelato & Live Jalebi-Rabri Station');
  const [liveCounters, setLiveCounters] = useState(['Wood-Fired Pizza & Pasta', 'Chaat Counter']);
  const [guestCount, setGuestCount] = useState(500);
  const [budgetLimit, setBudgetLimit] = useState(800000);
  const [specialInstructions, setSpecialInstructions] = useState('Please ensure organic ingredients for Jain guest counter.');

  // 2. Decoration State
  const [decorTheme, setDecorTheme] = useState('Royal Heritage Palace');
  const [stageDecor, setStageDecor] = useState('Carved Wooden Palace Mandap Stage');
  const [floralDecor, setFloralDecor] = useState('Fresh Rose & Dutch Orchid Garlands');
  const [lightingSetup, setLightingSetup] = useState('Chandelier Trusses & Ambient Fairy Lights');
  const [entranceStyle, setEntranceStyle] = useState('Royal Elephant Archway with Mirror Walkway');
  const [mandapDesign, setMandapDesign] = useState('Lakeside Floating Golden Mandap');
  const [seatingStyle, setSeatingStyle] = useState('Royal Velvet Lounges & Round Banquets');
  const [colorPalette, setColorPalette] = useState('Crimson Red & Royal Gold');

  // 3. Photography State
  const [preWeddingShoot, setPreWeddingShoot] = useState('Udaipur Outstation Palace Shoot');
  const [droneCoverage, setDroneCoverage] = useState('4K Dual FPV Aerial Drone');
  const [traditionalPhoto, setTraditionalPhoto] = useState('Full Stage & Ritual Coverage');
  const [cinematicVideo, setCinematicVideo] = useState('Full Length Feature Film + 3-Min Teaser');
  const [reelsPackage, setReelsPackage] = useState('5 Same-Day Instagram Reels');
  const [albumType, setAlbumType] = useState('Flush Mount Leatherette Boxed Album');

  // 4. Entertainment State
  const [djSound, setDjSound] = useState('Celebrity DJ & Line Array Concert Sound');
  const [liveBand, setLiveBand] = useState('5-Piece Live Sufi Fusion Ensemble');
  const [dancePerform, setDancePerform] = useState('Sangeet Choreography Troupe');
  const [celebrityApp, setCelebrityApp] = useState('Emcee / Anchor Hosted');
  const [fireworksShow, setFireworksShow] = useState('Cold Pyros Bridal Entry & 3-Min Fireworks');

  // 5. Venue State
  const [venueType, setVenueType] = useState('Lawn + Banquet Hall Combo');
  const [seatingCap, setSeatingCap] = useState('750 Guests Seating');
  const [acType, setAcType] = useState('Fully Centralized Air-Conditioned');
  const [parkingCap, setParkingCap] = useState('Valet Parking for 200 Cars');
  const [roomsRequired, setRoomsRequired] = useState('25 Deluxe Suites');

  // Request Submission Status
  const [submittedStatus, setSubmittedStatus] = useState(null);

  const calculateCustomPrice = () => {
    let base = 550000;
    base += (guestCount - 250) * 750;
    if (liveCounters.length > 0) base += liveCounters.length * 15000;
    if (droneCoverage.includes('4K')) base += 25000;
    if (liveBand.includes('Live')) base += 50000;
    if (preWeddingShoot.includes('Palace')) base += 35000;
    
    // Add addedCustomItems cost
    addedCustomItems.forEach((item) => {
      const val = parseInt(item.price.replace(/[^0-9]/g, '')) || 0;
      base += val;
    });

    return base;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const finalPrice = calculateCustomPrice();
    setSubmittedStatus('Pending');

    try {
      await createBooking({
        packageName: `${decorTheme} Custom Package`,
        amount: `₹${finalPrice.toLocaleString('en-IN')}`,
        plannerName: 'Royal Touch Weddings Studio',
        guestCount: `${guestCount} Guests`,
        venue: stageDecor,
        location: 'Udaipur, Rajasthan'
      });
      alert(`Package Customization & Booking Request submitted successfully! Total Estimated Quote: ₹${finalPrice.toLocaleString('en-IN')}. Added to your Booking History!`);
      if (onSubmitCustomization) {
        onSubmitCustomization({
          status: 'Pending',
          estimatedCost: `₹${finalPrice.toLocaleString('en-IN')}`,
          guestCount,
          decorTheme,
        });
      }
    } catch (err) {
      console.error("Customization booking error:", err);
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
              Customize catering menus, mandap themes, photography, entertainment & venue setups.
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
          
          {/* SECTION 1: CATERING CUSTOMIZATION */}
          <div className="bg-white rounded-3xl border border-rose-100/80 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
              <span className="text-xl">🍽️</span>
              <h3 className="font-serif text-2xl font-bold text-gray-900">1. Catering Customization</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Food Preference</label>
                <select 
                  value={foodType} 
                  onChange={(e) => setFoodType(e.target.value)}
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-800 focus:outline-none"
                >
                  <option value="Pure Veg & Jain Available">Pure Veg & Jain Available</option>
                  <option value="Veg & Non-Veg Multi-Cuisine">Veg & Non-Veg Multi-Cuisine</option>
                  <option value="Exclusive Organic Farm Menu">Exclusive Organic Farm Menu</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Primary Cuisine</label>
                <select 
                  value={cuisine} 
                  onChange={(e) => setCuisine(e.target.value)}
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-800 focus:outline-none"
                >
                  <option value="North Indian & Continental">North Indian & Continental</option>
                  <option value="Authentic Rajasthani & Marwari">Authentic Rajasthani & Marwari</option>
                  <option value="South Indian Royal Feast">South Indian Royal Feast</option>
                  <option value="Italian & Pan-Asian Fusion">Italian & Pan-Asian Fusion</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Welcome Drinks</label>
                <input
                  type="text"
                  value={welcomeDrinks}
                  onChange={(e) => setWelcomeDrinks(e.target.value)}
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Dinner Buffet</label>
                <input
                  type="text"
                  value={dinnerMenu}
                  onChange={(e) => setDinnerMenu(e.target.value)}
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-800 focus:outline-none"
                />
              </div>
            </div>

            {/* Guest Count Slider */}
            <div className="bg-[#FFF9FA] border border-rose-100 p-5 rounded-2xl">
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-gray-800 uppercase">Estimated Guest Count</label>
                <span className="text-base font-bold text-[#EC3664]">{guestCount} Guests</span>
              </div>
              <input
                type="range"
                min="100"
                max="1200"
                step="50"
                value={guestCount}
                onChange={(e) => setGuestCount(Number(e.target.value))}
                className="w-full accent-[#EC3664] cursor-pointer"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Special Dietary Instructions</label>
              <textarea
                rows={2}
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                placeholder="Mention any allergies or specific dietary guidelines..."
                className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl p-3 text-xs text-gray-800 focus:outline-none"
              />
            </div>
          </div>

          {/* SECTION 2: DECORATION & THEME */}
          <div className="bg-white rounded-3xl border border-rose-100/80 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
              <span className="text-xl">🌺</span>
              <h3 className="font-serif text-2xl font-bold text-gray-900">2. Decoration & Mandap Design</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Decor Theme</label>
                <select 
                  value={decorTheme} 
                  onChange={(e) => setDecorTheme(e.target.value)}
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-800 focus:outline-none"
                >
                  <option value="Royal Heritage Palace">Royal Heritage Palace</option>
                  <option value="Sunset Beach Romance">Sunset Beach Romance</option>
                  <option value="Traditional Floral Sangeet">Traditional Floral Sangeet</option>
                  <option value="Modern Pastel Minimalist">Modern Pastel Minimalist</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Mandap Design</label>
                <input
                  type="text"
                  value={mandapDesign}
                  onChange={(e) => setMandapDesign(e.target.value)}
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Floral Decoration</label>
                <input
                  type="text"
                  value={floralDecor}
                  onChange={(e) => setFloralDecor(e.target.value)}
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Color Palette</label>
                <input
                  type="text"
                  value={colorPalette}
                  onChange={(e) => setColorPalette(e.target.value)}
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-800 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* SECTION 3: PHOTOGRAPHY & MEDIA */}
          <div className="bg-white rounded-3xl border border-rose-100/80 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
              <span className="text-xl">📸</span>
              <h3 className="font-serif text-2xl font-bold text-gray-900">3. Photography & Cinematic Video</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Pre-Wedding Shoot</label>
                <input
                  type="text"
                  value={preWeddingShoot}
                  onChange={(e) => setPreWeddingShoot(e.target.value)}
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Drone Coverage</label>
                <select
                  value={droneCoverage}
                  onChange={(e) => setDroneCoverage(e.target.value)}
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-800 focus:outline-none"
                >
                  <option value="4K Dual FPV Aerial Drone">4K Dual FPV Aerial Drone</option>
                  <option value="Single Pilot HD Drone">Single Pilot HD Drone</option>
                  <option value="No Drone Required">No Drone Required</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 4: ENTERTAINMENT & VENUE */}
          <div className="bg-white rounded-3xl border border-rose-100/80 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
              <span className="text-xl">🎵</span>
              <h3 className="font-serif text-2xl font-bold text-gray-900">4. Entertainment & Venue Details</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">DJ & Sound System</label>
                <input
                  type="text"
                  value={djSound}
                  onChange={(e) => setDjSound(e.target.value)}
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Live Performance</label>
                <input
                  type="text"
                  value={liveBand}
                  onChange={(e) => setLiveBand(e.target.value)}
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-800 focus:outline-none"
                />
              </div>
            </div>
          </div>

        </div>

        {/* PRICE SUMMARY & APPROVAL SUBMISSION SIDEBAR */}
        <div className="lg:col-span-4">
          <div className="bg-[#4E0A1A] rounded-3xl p-6 sm:p-8 text-white shadow-xl sticky top-28 space-y-6 border border-rose-100/10">
            <div>
              <span className="text-[10px] font-extrabold tracking-widest text-[#E2B13C] uppercase block mb-1">
                ESTIMATED PACKAGE TOTAL
              </span>
              <h3 className="font-serif text-4xl font-bold text-white">
                ₹{calculateCustomPrice().toLocaleString('en-IN')}
              </h3>
            </div>

            {/* Added Custom Items List */}
            {addedCustomItems.length > 0 && (
              <div className="border-t border-white/10 pt-4">
                <span className="text-[11px] font-bold text-[#E2B13C] uppercase block mb-2">
                  Added Smart Add-ons ({addedCustomItems.length})
                </span>
                <ul className="space-y-1.5 text-xs text-rose-100/90 max-h-36 overflow-y-auto">
                  {addedCustomItems.map((item, idx) => (
                    <li key={idx} className="flex justify-between">
                      <span className="truncate pr-2">• {item.title}</span>
                      <span className="font-bold text-white shrink-0">{item.price}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <ul className="space-y-2.5 text-xs text-rose-100/80 border-t border-white/10 pt-4">
              <li className="flex justify-between">
                <span>Guest Capacity</span>
                <span className="font-semibold text-white">{guestCount} Guests</span>
              </li>
              <li className="flex justify-between">
                <span>Decor Theme</span>
                <span className="font-semibold text-[#E2B13C]">{decorTheme}</span>
              </li>
              <li className="flex justify-between">
                <span>Planning Studio</span>
                <span className="font-semibold text-white">Royal Touch Weddings</span>
              </li>
            </ul>

            <button 
              type="submit"
              className="w-full bg-[#EC3664] hover:bg-[#d42d57] text-white py-3.5 rounded-full font-bold text-xs shadow-md transition cursor-pointer flex items-center justify-center gap-2"
            >
              <FiSend className="w-4 h-4" />
              <span>Submit for Planner Approval</span>
            </button>
          </div>
        </div>

      </form>

    </div>
  );
}
