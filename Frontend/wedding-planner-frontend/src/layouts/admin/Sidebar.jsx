// src/layouts/admin/Sidebar.jsx

import { NavLink, useNavigate } from "react-router-dom";

const navItems = [
  {
    path: "/admin/dashboard",
    label: "Dashboard",
    icon: "▦",
  },
  {
    path: "/admin/clients",
    label: "Manage Clients",
    icon: "♟",
  },
  {
    path: "/admin/planners",
    label: "Manage Planners",
    icon: "♟",
  },
  {
    path: "/admin/packages",
    label: "Manage Packages",
    icon: "▣",
  },
  {
    path: "/admin/bookings",
    label: "Manage Bookings",
    icon: "☷",
  },
  {
    path: "/admin/payments",
    label: "Monitor Payments",
    icon: "₹",
  },
  {
    path: "/admin/reports",
    label: "Feedback & Reports",
    icon: "✉",
  },
];

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {
  const navigate = useNavigate();

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const logout = () => {
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          onClick={closeSidebar}
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 z-40 h-screen w-64
          transform border-r bg-white shadow-lg
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0
        `}
      >
        <div className="flex h-full flex-col">

          {/* Logo Section */}
          <div className="border-b p-5">

            <div className="flex items-center">

              {/* Heart Icon - Tailwind/Text Only */}
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-100">
                <span className="text-xl text-rose-500">
                  ♥
                </span>
              </div>

              {/* Logo Text */}
              <div className="ml-3">
                <h2 className="text-lg font-bold text-gray-800">
                  WedPlan
                </h2>

                <p className="text-xs text-gray-500">
                  Admin Panel
                </p>
              </div>

              {/* Close Button - Mobile */}
              <button
                type="button"
                onClick={closeSidebar}
                className="ml-auto flex h-8 w-8 items-center justify-center rounded-lg text-xl text-gray-600 hover:bg-gray-100 lg:hidden"
                aria-label="Close sidebar"
              >
                ×
              </button>

            </div>

          </div>

          {/* Admin Information */}
          <div className="m-4 rounded-xl bg-rose-50 p-4">

            <p className="text-xs uppercase text-rose-500">
              Administrator
            </p>

            <h3 className="mt-2 font-semibold text-gray-800">
              Admin
            </h3>

            <p className="text-sm text-gray-500">
              admin@example.com
            </p>

          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3">

            {navItems.map(({ path, label, icon }) => (
              <NavLink
                key={path}
                to={path}
                onClick={closeSidebar}
                className={({ isActive }) =>
                  `mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    isActive
                      ? "bg-rose-500 text-white shadow-sm"
                      : "text-gray-600 hover:bg-rose-50 hover:text-rose-500"
                  }`
                }
              >
                {/* Navigation Icon */}
                <span className="flex h-5 w-5 items-center justify-center text-lg font-semibold">
                  {icon}
                </span>

                {/* Navigation Label */}
                <span>
                  {label}
                </span>
              </NavLink>
            ))}

          </nav>

          {/* Logout */}
          <div className="border-t p-4">

            <button
              type="button"
              onClick={logout}
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-rose-300 py-3 text-rose-500 transition hover:bg-rose-500 hover:text-white"
            >
              {/* Logout Icon */}
              <span className="text-lg">
                ↪
              </span>

              <span>
                Logout
              </span>
            </button>

          </div>

        </div>
      </aside>
    </>
  );
}