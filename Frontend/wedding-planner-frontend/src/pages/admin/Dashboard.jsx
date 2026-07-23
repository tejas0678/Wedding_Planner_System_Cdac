import { useEffect, useState } from "react";
import StatCard from "../../components/admin/StatCard";
import EmptyState from "../../components/admin/EmptyState";
import { getDashboardStats } from "../../services/adminService";

export default function Dashboard() {

  // =========================
  // Dashboard State
  // =========================

  const [stats, setStats] = useState({
    totalClients: 0,
    totalPlanners: 0,
    totalWeddings: 0,
    totalPackages: 0,
    pendingBookings: 0,
    recentActivities: [],
    topPlanners: [],
  });


  // =========================
  // Load Dashboard Data
  // =========================

  useEffect(() => {
    loadDashboard();
  }, []);


  const loadDashboard = async () => {
    try {

      const data = await getDashboardStats();

      // Make sure data is available
      setStats({
        totalClients: data?.totalClients || 0,
        totalPlanners: data?.totalPlanners || 0,
        totalWeddings: data?.totalWeddings || 0,
        totalPackages: data?.totalPackages || 0,
        pendingBookings: data?.pendingBookings || 0,
        recentActivities: data?.recentActivities || [],
        topPlanners: data?.topPlanners || [],
      });

    } catch (error) {

      console.error(
        "Error loading dashboard data:",
        error
      );

    }
  };


  // =========================
  // Dashboard Cards
  // =========================

  const cards = [
    {
      title: "Total Clients",
      value: stats.totalClients,
      symbol: "👥",
      bg: "bg-blue-100",
      text: "text-blue-600",
    },
    {
      title: "Total Planners",
      value: stats.totalPlanners,
      symbol: "💼",
      bg: "bg-purple-100",
      text: "text-purple-600",
    },
    {
      title: "Total Weddings",
      value: stats.totalWeddings,
      symbol: "💍",
      bg: "bg-rose-100",
      text: "text-rose-600",
    },
    {
      title: "Total Packages",
      value: stats.totalPackages,
      symbol: "📦",
      bg: "bg-green-100",
      text: "text-green-600",
    },
    {
      title: "Pending Bookings",
      value: stats.pendingBookings,
      symbol: "⏳",
      bg: "bg-yellow-100",
      text: "text-yellow-600",
    },
  ];


  // =========================
  // Page UI
  // =========================

  return (
    <div className="space-y-8 px-6 py-6 lg:px-10 lg:py-8">


      {/* ================= HEADER ================= */}

      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-900">
          📊 Dashboard
        </h1>

        {/* Keep this constant */}
        <p className="mt-2 text-base text-gray-500">
          👋 Welcome back, Administrator
        </p>

      </div>


      {/* ================= STATS CARDS ================= */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-5">

        {cards.map((card) => (

          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            symbol={card.symbol}
            bg={card.bg}
            text={card.text}
          />

        ))}

      </div>


      {/* ================= RECENT ACTIVITIES & TOP PLANNERS ================= */}

      <div className="grid gap-6 lg:grid-cols-2">


        {/* ================= RECENT ACTIVITIES ================= */}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          {/* Card Header */}

          <div className="border-b border-gray-200 p-5">

            <h2 className="text-xl font-semibold text-gray-800">
              🔔 Recent Activities
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Latest booking activities
            </p>

          </div>


          {/* Card Body */}

          <div>

            {stats.recentActivities.length === 0 ? (

              <EmptyState
                message="No recent activity available."
              />

            ) : (

              stats.recentActivities.map((activity) => (

                <div
                  key={activity.id}
                  className="border-b border-gray-100 p-5 last:border-none hover:bg-gray-50"
                >

                  {/* Client Name */}

                  <h4 className="font-semibold text-gray-800">
                    👤 {activity.clientName}
                  </h4>


                  {/* Planner Name */}

                  <p className="mt-1 text-sm text-gray-500">
                    💼 {activity.plannerName}
                  </p>


                  {/* Status */}

                  <span className="mt-3 inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
                    {activity.status}
                  </span>

                </div>

              ))

            )}

          </div>

        </div>


        {/* ================= TOP PLANNERS ================= */}

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

          {/* Card Header */}

          <div className="border-b border-gray-200 p-5">

            <h2 className="text-xl font-semibold text-gray-800">
              ⭐ Top Planners
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Best performing wedding planners
            </p>

          </div>


          {/* Card Body */}

          <div>

            {stats.topPlanners.length === 0 ? (

              <EmptyState
                message="No planner data available."
              />

            ) : (

              stats.topPlanners.map((planner) => (

                <div
                  key={planner.id}
                  className="flex items-center justify-between border-b border-gray-100 p-5 last:border-none hover:bg-gray-50"
                >

                  {/* Planner Information */}

                  <div>

                    <h4 className="font-semibold text-gray-800">
                      👤 {planner.name}
                    </h4>


                    <p className="mt-1 text-sm text-gray-500">
                      🎯 {planner.specialization}
                    </p>

                  </div>


                  {/* Rating */}

                  <span className="rounded-full bg-yellow-50 px-3 py-1 text-sm font-semibold text-yellow-600">
                    ⭐ {planner.rating}
                  </span>

                </div>

              ))

            )}

          </div>

        </div>


      </div>


    </div>
  );
}