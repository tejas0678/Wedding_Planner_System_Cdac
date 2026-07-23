import React, { useState } from "react";
import { Link } from "react-router-dom";

const PlannerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    experience: "",
    specialization: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Password validation
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log("Planner Registration Details:", formData);

    // API call can be added here
    alert("Planner Registered Successfully!");
  };

  return (
    <div className="min-h-screen bg-[#f8f4f0] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 text-3xl font-bold text-gray-900">
            <span className="text-pink-500">♥</span>
            WedPlan
          </div>
        </div>

        {/* Registration Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">

          <h1 className="text-3xl font-semibold text-center text-gray-900 mb-8">
            Create Planner Account
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>

              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                name="password"
                placeholder="Create your password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Confirm Password
              </label>

              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Experience
              </label>

              <input
                type="text"
                name="experience"
                placeholder="e.g. 5 Years"
                value={formData.experience}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Specialization */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Specialization
              </label>

              <input
                type="text"
                name="specialization"
                placeholder="e.g. Wedding Decoration"
                value={formData.specialization}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Register Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-pink-600 py-3 text-white font-semibold hover:bg-pink-700 duration-200"
            >
              Register as Planner
            </button>

          </form>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <a
              href="user-login"
              className="text-pink-600 font-semibold hover:underline"
            >
              Login
            </a>
          </p>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6"></div>

          {/* User Registration Link */}
          <div className="flex justify-center">
            <a
              href="/user-register"
              className="text-sm font-medium text-gray-600 hover:text-pink-600"
            >
              Register as User Instead
            </a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PlannerRegister;