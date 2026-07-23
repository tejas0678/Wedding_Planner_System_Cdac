import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!loginData.role) {
      alert("Please select a role.");
      return;
    }

    console.log("Login Details:", loginData);

    // Add your API call here
    // alert(`${loginData.role} Login Successful!`);

    // Redirect based on role
    if (loginData.role === "PLANNER") {
      // Store user info in localStorage (for authentication)
      localStorage.setItem("authToken", "mock-token-planner");
      localStorage.setItem("userRole", "PLANNER");
      localStorage.setItem("userName", "John Doe");
      
      // Navigate to planner dashboard
      navigate("/planner-dashboard");
    } else if (loginData.role === "USER") {
      // Redirect to user dashboard (if you have one)
      localStorage.setItem("authToken", "mock-token-user");
      localStorage.setItem("userRole", "USER");
      alert("User login - Redirect to user dashboard");
      // navigate("/user-dashboard");
    } else if (loginData.role === "ADMIN") {
      // Redirect to admin dashboard (if you have one)
      localStorage.setItem("authToken", "mock-token-admin");
      localStorage.setItem("userRole", "ADMIN");
      alert("Admin login - Redirect to admin dashboard");
      // navigate("/admin-dashboard");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f4f0] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 text-3xl font-bold text-gray-900">
            <span className="text-pink-500">♥</span>
            WedPlan
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h1 className="text-3xl font-semibold text-center text-gray-900 mb-8">
            Welcome Back
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Login As */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Login As
              </label>

              <div className="grid grid-cols-3 gap-3">
                {/* USER */}
                <div
                  onClick={() =>
                    setLoginData({ ...loginData, role: "USER" })
                  }
                  className={`cursor-pointer rounded-xl border p-3 text-center font-semibold transition-all duration-200 ${
                    loginData.role === "USER"
                      ? "bg-pink-600 text-white border-pink-600"
                      : "bg-white text-gray-700 hover:border-pink-500"
                  }`}
                >
                  User
                </div>

                {/* PLANNER */}
                <div
                  onClick={() =>
                    setLoginData({ ...loginData, role: "PLANNER" })
                  }
                  className={`cursor-pointer rounded-xl border p-3 text-center font-semibold transition-all duration-200 ${
                    loginData.role === "PLANNER"
                      ? "bg-pink-600 text-white border-pink-600"
                      : "bg-white text-gray-700 hover:border-pink-500"
                  }`}
                >
                  Planner
                </div>

                {/* ADMIN */}
                <div
                  onClick={() =>
                    setLoginData({ ...loginData, role: "ADMIN" })
                  }
                  className={`cursor-pointer rounded-xl border p-3 text-center font-semibold transition-all duration-200 ${
                    loginData.role === "ADMIN"
                      ? "bg-pink-600 text-white border-pink-600"
                      : "bg-white text-gray-700 hover:border-pink-500"
                  }`}
                >
                  Admin
                </div>
              </div>
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
                value={loginData.email}
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
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleChange}
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="w-full rounded-xl bg-pink-600 py-3 text-white font-semibold hover:bg-pink-700 duration-200"
            >
              Login
            </button>
          </form>

          {/* Forgot Password */}
          <p className="text-center mt-5">
            <a
              href="/forgot-password"
              className="text-pink-600 hover:underline font-medium"
            >
              Forgot Password?
            </a>
          </p>

          {/* Divider */}
          <div className="border-t border-gray-200 my-6" />

          {/* Registration Links */}
          <p className="text-center text-gray-600 mb-3">
            Don't have an account?
          </p>

          <div className="flex justify-center">
            <a
              href="/user-register"
              className="text-sm font-medium text-gray-600 hover:text-pink-600"
            >
              Register as User
            </a>
          </div>

          <div className="flex justify-center mt-2">
            <a
              href="/planner-register"
              className="text-sm font-medium text-gray-600 hover:text-pink-600"
            >
              Register as Planner
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;