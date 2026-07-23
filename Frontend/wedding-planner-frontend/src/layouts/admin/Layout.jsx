import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-gray-50">

      {/* ================= SIDEBAR ================= */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />


      {/* ================= MAIN AREA ================= */}
      <div className="h-screen lg:ml-[264px]">

        {/* ================= MOBILE HEADER ================= */}
        <header className="flex h-16 items-center border-b border-gray-200 bg-white px-5 lg:hidden">

          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-xl text-gray-700 hover:bg-gray-100"
          >
            ☰
          </button>

          <h1 className="ml-4 text-lg font-semibold text-gray-800">
            WedPlan Admin
          </h1>

        </header>


        {/* ================= PAGE CONTENT ================= */}
        <main className="h-full overflow-y-auto">

          <Outlet />

        </main>

      </div>

    </div>
  );
}