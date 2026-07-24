import { useEffect, useState } from "react";
import StatusBadge from "../../components/admin/StatusBadge";
import EmptyState from "../../components/admin/EmptyState";
import { getPayments } from "../../services/adminService";

export default function MonitorPayments() {
  const [payments, setPayments] = useState([]);

  const [summary, setSummary] = useState({
    totalRevenue: 0,
    pendingAmount: 0,
    failedAmount: 0,
    totalPayments: 0,
  });

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const data = await getPayments();

      const paymentData = data || [];

      setPayments(paymentData);

      let totalRevenue = 0;
      let pendingAmount = 0;
      let failedAmount = 0;

      paymentData.forEach((payment) => {
        const amount = Number(payment.amount) || 0;

        if (payment.status === "Paid") {
          totalRevenue += amount;
        } else if (payment.status === "Pending") {
          pendingAmount += amount;
        } else if (payment.status === "Failed") {
          failedAmount += amount;
        }
      });

      setSummary({
        totalRevenue,
        pendingAmount,
        failedAmount,
        totalPayments: paymentData.length,
      });
    } catch (error) {
      console.error("Error loading payments:", error);

      setPayments([]);

      setSummary({
        totalRevenue: 0,
        pendingAmount: 0,
        failedAmount: 0,
        totalPayments: 0,
      });
    }
  };


  // ================= SUMMARY CARDS =================

  const cards = [
    {
      title: "Total Revenue",
      value: `₹${summary.totalRevenue.toLocaleString()}`,
      bg: "bg-green-50",
      iconBg: "bg-green-100",
      text: "text-green-600",
      icon: "₹",
    },
    {
      title: "Pending Amount",
      value: `₹${summary.pendingAmount.toLocaleString()}`,
      bg: "bg-yellow-50",
      iconBg: "bg-yellow-100",
      text: "text-yellow-600",
      icon: "⏳",
    },
    {
      title: "Failed Amount",
      value: `₹${summary.failedAmount.toLocaleString()}`,
      bg: "bg-red-50",
      iconBg: "bg-red-100",
      text: "text-red-600",
      icon: "×",
    },
    {
      title: "Total Payments",
      value: summary.totalPayments,
      bg: "bg-blue-50",
      iconBg: "bg-blue-100",
      text: "text-blue-600",
      icon: "✓",
    },
  ];


  return (
    <div className="space-y-6 px-4 py-4 sm:px-6 lg:px-8">

      {/* ================= HEADER ================= */}

      <div className="mb-7">

        <h1 className="text-3xl font-bold text-gray-900">
          Monitor Payments
        </h1>

        <p className="mt-2 text-base text-gray-500">
          Track all payment transactions.
        </p>

      </div>


      {/* ================= SUMMARY CARDS ================= */}

      <div className="grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">

        {cards.map((card) => (

          <div
            key={card.title}
            className="
              flex
              items-center
              justify-between
              rounded-xl
              border
              border-gray-200
              bg-white
              p-5
              shadow-sm
              transition
              hover:-translate-y-1
              hover:shadow-md
            "
          >

            {/* Card Text */}

            <div>

              <p className="text-sm font-medium text-gray-500">
                {card.title}
              </p>

              <h2 className="mt-2 text-2xl font-bold text-gray-800">
                {card.value}
              </h2>

            </div>


            {/* Card Icon */}

            <div
              className={`
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-full
                ${card.iconBg}
                ${card.text}
              `}
            >

              <span className="text-xl font-bold">
                {card.icon}
              </span>

            </div>

          </div>

        ))}

      </div>


      {/* ================= PAYMENTS TABLE ================= */}

      <div className="max-w-7xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">

        <div className="overflow-x-auto">

          <table className="min-w-[900px] w-full">

            {/* Table Header */}

            <thead className="bg-gray-50">

              <tr>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Payment ID
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Wedding ID
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Client
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Wedding Date
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Amount
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Status
                </th>

                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">
                  Payment Date
                </th>

              </tr>

            </thead>


            {/* Table Body */}

            <tbody>

              {payments.length === 0 ? (

                <tr>

                  <td
                    colSpan="7"
                    className="px-5 py-12"
                  >
                    <EmptyState message="No payments found." />
                  </td>

                </tr>

              ) : (

                payments.map((payment) => (

                  <tr
                    key={payment.id}
                    className="
                      border-t
                      border-gray-100
                      transition
                      hover:bg-rose-50/30
                    "
                  >

                    {/* Payment ID */}

                    <td className="px-5 py-4 text-sm font-medium text-gray-800">
                      #{payment.id}
                    </td>


                    {/* Wedding ID */}

                    <td className="px-5 py-4 text-sm text-gray-700">
                      #{payment.weddingId}
                    </td>


                    {/* Client */}

                    <td className="px-5 py-4 text-sm text-gray-700">
                      {payment.client}
                    </td>


                    {/* Wedding Date */}

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {payment.weddingDate}
                    </td>


                    {/* Amount */}

                    <td className="px-5 py-4 text-sm font-semibold text-gray-800">
                      ₹{Number(payment.amount || 0).toLocaleString()}
                    </td>


                    {/* Status */}

                    <td className="px-5 py-4">
                      <StatusBadge status={payment.status} />
                    </td>


                    {/* Payment Date */}

                    <td className="px-5 py-4 text-sm text-gray-600">
                      {payment.paymentDate}
                    </td>

                  </tr>

                ))

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}