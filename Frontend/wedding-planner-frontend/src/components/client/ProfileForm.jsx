import React, { useState, useEffect } from 'react';
import { FiSave, FiUser, FiMail, FiPhone } from 'react-icons/fi';
import { HiSparkles } from 'react-icons/hi2';

export default function ProfileForm({ userData, onUpdate }) {
  const [form, setForm] = useState({
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400',
    fullName: 'TEJASSAYANE067',
    partnerName: 'Meera Kapoor',
    email: 'tejassayane067@gmail.com',
    phone: '+91 98765 43210',
    emergencyPhone: '+91 98765 99999',
  });

  useEffect(() => {
    if (userData) {
      setForm((prev) => ({
        ...prev,
        fullName: userData.fullName || userData.name || prev.fullName,
        partnerName: userData.partnerName || prev.partnerName,
        email: userData.email || prev.email,
        phone: userData.phone || prev.phone,
        emergencyPhone: userData.emergencyPhone || prev.emergencyPhone,
        avatarUrl: userData.avatarUrl || prev.avatarUrl,
      }));
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onUpdate) {
      onUpdate(form);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-rose-100/60 p-6 sm:p-10 shadow-xs max-w-4xl mx-auto">
      
      {/* Header */}
      <div className="mb-8 pb-6 border-b border-gray-100">
        <h2 className="font-serif text-3xl font-bold text-gray-900">
          My Profile & Settings
        </h2>
        <p className="text-gray-500 text-sm mt-1 font-light">
          Update your personal profile, partner details, and contact numbers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Section 2: Personal & Contact Details */}
        <div>
          <h3 className="font-serif text-xl font-bold text-gray-900 mb-6">
            Personal & Contact Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-2">
                Full Name
              </label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl px-4 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#EC3664] focus:bg-white transition"
              />
            </div>

            {/* Partner Name */}
            <div>
              <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-2">
                Partner Name (Groom / Bride)
              </label>
              <input
                type="text"
                name="partnerName"
                value={form.partnerName}
                onChange={handleChange}
                className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl px-4 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#EC3664] focus:bg-white transition"
              />
            </div>

            {/* Email Address */}
            <div>
              <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl px-4 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#EC3664] focus:bg-white transition"
              />
            </div>

            {/* Primary Phone Number */}
            <div>
              <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-2">
                Primary Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl px-4 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#EC3664] focus:bg-white transition"
              />
            </div>

            {/* Emergency Contact Phone */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-gray-700 tracking-wider uppercase mb-2">
                Emergency Contact Phone
              </label>
              <input
                type="text"
                name="emergencyPhone"
                value={form.emergencyPhone}
                onChange={handleChange}
                className="w-full bg-[#FFF9FA] border border-rose-100 rounded-2xl px-4 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:border-[#EC3664] focus:bg-white transition"
              />
            </div>

          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 flex justify-center">
          <button
            type="submit"
            className="bg-[#EC3664] hover:bg-[#d42d57] text-white px-10 py-3.5 rounded-full font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center gap-2 cursor-pointer"
          >
            <FiSave className="w-4 h-4" />
            <span>Save Profile Updates</span>
          </button>
        </div>

      </form>
    </div>
  );
}