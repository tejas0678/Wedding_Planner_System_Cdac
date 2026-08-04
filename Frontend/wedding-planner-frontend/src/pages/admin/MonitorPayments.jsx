import { useEffect, useState } from "react";
import StatusBadge from "../../components/admin/StatusBadge";
import EmptyState from "../../components/admin/EmptyState";
import { getPayments, getPaymentsSummary } from "../../services/adminService";
import { FiX } from "react-icons/fi";

const STATUS_FILTERS = ["All", "Paid", "Pending", "Failed", "Refunded"];

export default function MonitorPayments() {
  const [payments, setPayments] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [summary, setSummary] = useState({
    totalRevenue: 0,
    todayRevenue: 0,
    monthlyRevenue: 0,
    pendingAmount: 0,
    failedAmount: 0,
    totalPayments: 0,
  });

  useEffect(() => {
    loadSummary();
  }, []);

  useEffect(() => {
    loadPayments();
  }, [statusFilter]);

  const loadPayments = async () => {
    setLoading(true);
    try {
      const data = await getPayments(statusFilter);
      setPayments(data || []);
    } catch (error) {
      console.error("Error loading payments:", error);
      setPayments([]);
    } finally {
      setLoading(false);
    }
  };

  const loadSummary = async () => {
    try {
      const data = await getPaymentsSummary();
      if (data) setSummary(data);
    } catch (error) {
      console.error("Error loading payments summary:", error);
    }
  };

  const cards = [
    { title: "Total Revenue", value: `₹${Number(summary.totalRevenue || 0).toLocaleString()}`, bg: "bg-green-50", iconBg: "bg-green-100", text: "text-green-600", icon: "₹" },
    { title: "Today's Revenue", value: `₹${Number(summary.todayRevenue || 0).toLocaleString()}`, bg: "bg-teal-50", iconBg: "bg-teal-100", text: "text-teal-600", icon: "☀" },
    { title: "Monthly Revenue", value: `₹${Number(summary.monthlyRevenue || 0).toLocaleString()}`, bg: "bg-emerald-50", iconBg: "bg-emerald-100", text: "text-emerald-600", icon: "📅" },
    { title: "Pending Payments", value: `₹${Number(summary.pendingAmount || 0).toLocaleString()}`, bg: "bg-yellow-50", iconBg: "bg-yellow-100", text: "text-yellow-600", icon: "⏳" },
    { title: "Failed Payments", value: `₹${Number(summary.failedAmount || 0).toLocaleString()}`, bg: "bg-rose-50", iconBg: "bg-rose-100", text: "text-rose-600", icon: "✕" },
    { title: "Total Transactions", value: summary.totalPayments || 0, bg: "bg-blue-50", iconBg: "bg-blue-100", text: "text-blue-600", icon: "✓" },
  ];

  return (
    <div className="space-y-6 px-4 py-4 sm:px-6 lg:px-8">
      <div className="mb-7">
        <h1 className="text-3xl font-bold text-gray-900">Monitor Payments</h1>
        <p className="mt-2 text-base text-gray-500">Track all payment transactions.</p>
      </div>

      {/* SUMMARY CARDS */}
      <div className="grid max-w-7xl grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((card) => (
          <div key={card.title} className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
            <div>
              <p className="text-sm font-medium text-gray-500">{card.title}</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-800">{card.value}</h2>
            </div>
            <div className={`flex h-12 w-12 items-center justify-center rounded-full ${card.iconBg} ${card.text}`}>
              <span className="text-xl font-bold">{card.icon}</span>
            </div>
          </div>
        ))}
      </div>

      {/* FILTERS */}
      <div className="max-w-7xl flex items-center gap-2 overflow-x-auto pb-1">
        {STATUS_FILTERS.map((status) => (
          <button
            key={status}
            type="button"
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
              statusFilter === status ? "bg-[#EC3664] text-white shadow-xs" : "bg-white border border-gray-200 text-gray-600 hover:bg-rose-50 hover:text-[#EC3664]"
            }`}
          >
            {status}
          </button>
        ))}
      </div>

      {/* PAYMENTS TABLE */}
      <div className="max-w-7xl overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-[1000px] w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">Payment ID</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">Booking ID</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">Client</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">Planner</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">Amount</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">Method</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                <th className="px-5 py-4 text-left text-sm font-semibold text-gray-700">Payment Date</th>
                <th className="px-5 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="9" className="px-5 py-12 text-center text-gray-400">Loading payments...</td>
                </tr>
              ) : payments.length === 0 ? (
                <tr>
                  <td colSpan="9" className="px-5 py-12">
                    <EmptyState message="No payments found." />
                  </td>
                </tr>
              ) : (
                payments.map((payment) => (
                  <tr key={payment.id} className="border-t border-gray-100 transition hover:bg-rose-50/30">
                    <td className="px-5 py-4 text-sm font-medium text-gray-800">{payment.paymentNumber || `#${payment.id}`}</td>
                    <td className="px-5 py-4 text-sm text-gray-700">{payment.bookingNumber}</td>
                    <td className="px-5 py-4 text-sm text-gray-700">{payment.clientName}</td>
                    <td className="px-5 py-4 text-sm text-gray-700">{payment.plannerName}</td>
                    <td className="px-5 py-4 text-sm font-semibold text-gray-800">₹{Number(payment.amount || 0).toLocaleString()}</td>
                    <td className="px-5 py-4 text-sm text-gray-600">{payment.gateway}</td>
                    <td className="px-5 py-4"><StatusBadge status={payment.status} /></td>
                    <td className="px-5 py-4 text-sm text-gray-600">{payment.paymentDate}</td>
                    <td className="px-5 py-4 text-center">
                      <button
                        type="button"
                        onClick={() => setSelectedPayment(payment)}
                        className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-100 cursor-pointer"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* PAYMENT DETAILS MODAL */}
      {selectedPayment && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-rose-100 space-y-5">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-[10px] font-extrabold text-[#EC3664] uppercase tracking-wider block">Payment Details</span>
                <h3 className="text-2xl font-bold text-gray-900 mt-0.5">{selectedPayment.paymentNumber}</h3>
              </div>
              <button type="button" onClick={() => setSelectedPayment(null)} className="text-gray-400 hover:text-gray-700 p-1 cursor-pointer">
                <FiX className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs text-gray-700">
              <div className="bg-[#FFF9FA] p-4 rounded-2xl border border-rose-100 space-y-2">
                <div className="flex justify-between"><span className="text-gray-500">Booking ID:</span><span className="font-bold text-gray-900">{selectedPayment.bookingNumber}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Client:</span><span className="font-bold text-gray-900">{selectedPayment.clientName}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Planner:</span><span className="font-bold text-gray-900">{selectedPayment.plannerName}</span></div>
              </div>

              <div className="bg-gray-50 p-4 rounded-2xl border border-gray-200 space-y-2">
                <div className="flex justify-between"><span className="text-gray-500">Amount:</span><span className="font-bold text-[#EC3664] text-sm">₹{Number(selectedPayment.amount || 0).toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Type:</span><span className="font-bold text-gray-900">{selectedPayment.type}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Payment Method:</span><span className="font-bold text-gray-900">{selectedPayment.gateway}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Transaction ID:</span><span className="font-bold text-gray-900">{selectedPayment.transactionId || "N/A"}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Payment Date:</span><span className="font-bold text-gray-900">{selectedPayment.paymentDate}</span></div>
                <div className="flex justify-between items-center"><span className="text-gray-500">Status:</span><StatusBadge status={selectedPayment.status} /></div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedPayment(null)}
              className="w-full bg-[#EC3664] hover:bg-[#d42d57] text-white py-3 rounded-full font-bold text-xs shadow-md transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
