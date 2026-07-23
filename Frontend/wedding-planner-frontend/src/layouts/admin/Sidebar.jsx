import { NavLink, useNavigate } from "react-router-dom";

// =====================================================
// 1. NAVIGATION ITEMS
// =====================================================
// We keep all sidebar menu items inside this array.
// Later, we use map() to display them automatically.

const navItems = [
  {
    path: "/admin/dashboard",
    label: "Dashboard",
    icon: "📊",
  },
  {
    path: "/admin/clients",
    label: "Manage Clients",
    icon: "👥",
  },
  {
    path: "/admin/planners",
    label: "Manage Planners",
    icon: "💼",
  },
  {
    path: "/admin/packages",
    label: "Manage Packages",
    icon: "📦",
  },
  {
    path: "/admin/bookings",
    label: "Manage Bookings",
    icon: "📅",
  },
  {
    path: "/admin/payments",
    label: "Monitor Payments",
    icon: "💳",
  },
  {
    path: "/admin/reports",
    label: "Feedback & Reports",
    icon: "💬",
  },
];


// =====================================================
// 2. SIDEBAR COMPONENT
// =====================================================

export default function Sidebar({
  sidebarOpen,
  setSidebarOpen,
}) {

  // useNavigate is used to move the user
  // to another page using JavaScript.
  const navigate = useNavigate();


  // ===================================================
  // CLOSE SIDEBAR
  // ===================================================

  const closeSidebar = () => {
    setSidebarOpen(false);
  };


  // ===================================================
  // LOGOUT
  // ===================================================

  const logout = () => {

    // For now, simply navigate to login page.
    navigate("/login");

  };


  return (
    <>
      {/* =================================================
          MOBILE OVERLAY
          =================================================
          
          This appears only when sidebar is open
          on mobile screen.
      */}

      {sidebarOpen && (

        <div
          onClick={closeSidebar}
          className="
            fixed
            inset-0
            z-30
            bg-black/40
            lg:hidden
          "
        />

      )}


      {/* =================================================
          SIDEBAR
          ================================================= */}

      <aside
        className={`
          fixed
          left-0
          top-0
          z-40

          flex
          h-screen
          w-[264px]
          flex-col

          border-r
          border-gray-200

          bg-white

          shadow-sm

          transition-transform
          duration-300

          ${sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full"
          }

          lg:translate-x-0
        `}
      >


        {/* =================================================
            LOGO SECTION
            ================================================= */}

        <div
          className="
            flex
            h-[85px]
            items-center
            justify-between

            border-b
            border-gray-200

            px-5
          "
        >

          {/* Logo and Text */}

          <div className="flex items-center gap-3">

            {/* Heart Logo */}

            <div
              className="
                flex
                h-10
                w-10
                items-center
                justify-center

                rounded-xl

                bg-rose-100
              "
            >

              <span className="text-xl text-rose-500">
                ♥
              </span>

            </div>


            {/* Logo Text */}

            <div>

              <h2
                className="
                  text-lg
                  font-bold
                  leading-tight
                  text-gray-800
                "
              >
                WedPlan
              </h2>

              <p
                className="
                  mt-1
                  text-xs
                  text-gray-500
                "
              >
                Admin Panel
              </p>

            </div>

          </div>


          {/* =================================================
              MOBILE CLOSE BUTTON
              ================================================= */}

          <button
            type="button"
            onClick={closeSidebar}
            className="
              flex
              h-8
              w-8
              items-center
              justify-center

              rounded-lg

              text-lg
              text-gray-500

              hover:bg-gray-100

              lg:hidden
            "
          >
            ×
          </button>

        </div>


        {/* =================================================
            ADMIN PROFILE CARD
            ================================================= */}

        <div className="px-4 pt-5">

          <div
            className="
              rounded-xl

              border
              border-rose-100

              bg-rose-50

              px-4
              py-4
            "
          >

            {/* Role */}

            <p
              className="
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-rose-500
              "
            >
              Administrator
            </p>


            {/* Name */}

            <h3
              className="
                mt-2
                text-base
                font-semibold
                text-gray-800
              "
            >
              Admin
            </h3>


            {/* Email */}

            <p
              className="
                mt-1
                text-sm
                text-gray-500
              "
            >
              admin@example.com
            </p>

          </div>

        </div>


        {/* =================================================
            NAVIGATION MENU
            ================================================= */}

        <nav
          className="
            mt-5
            flex-1
            px-3
          "
        >

          {/* 
            map() loops through every item
            in navItems array.
          */}

          {navItems.map(
            ({ path, label, icon }) => (

              <NavLink
                key={path}
                to={path}
                onClick={closeSidebar}

                className={({ isActive }) =>

                  `
                    mb-1.5

                    flex
                    h-12
                    items-center
                    gap-3

                    rounded-xl

                    px-4

                    text-[15px]
                    font-medium

                    transition-all
                    duration-200

                    ${
                      isActive

                        ? `
                          bg-rose-100
                          text-rose-600
                          shadow-sm
                        `

                        : `
                          text-gray-600
                          hover:bg-rose-50
                          hover:text-rose-600
                        `
                    }
                  `
                }
              >

                {/* =================================================
                    ICON
                    ================================================= */}

                <span
                  className="
                    flex
                    w-6
                    items-center
                    justify-center

                    text-lg
                  "
                >
                  {icon}
                </span>


                {/* =================================================
                    MENU LABEL
                    ================================================= */}

                <span>
                  {label}
                </span>

              </NavLink>

            )
          )}

        </nav>


        {/* =================================================
            LOGOUT SECTION
            ================================================= */}

        <div
          className="
            border-t
            border-gray-200

            p-4
          "
        >

          <button
            type="button"
            onClick={logout}

            className="
              flex
              h-12
              w-full
              items-center
              justify-center
              gap-3

              rounded-xl

              border
              border-rose-300

              text-[15px]
              font-medium
              text-rose-500

              transition-all
              duration-200

              hover:bg-rose-500
              hover:text-white

              hover:shadow-md
            "
          >

            {/* Logout Icon */}

            <span className="text-lg">
              🚪
            </span>


            {/* Logout Text */}

            <span>
              Logout
            </span>

          </button>

        </div>

      </aside>
    </>
  );
}