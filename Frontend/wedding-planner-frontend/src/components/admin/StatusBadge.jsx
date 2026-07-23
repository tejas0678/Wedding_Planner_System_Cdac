const statusColors = {
  Active: "bg-green-100 text-green-700",
  Inactive: "bg-gray-100 text-gray-700",
  Pending: "bg-yellow-100 text-yellow-700",
  Accepted: "bg-blue-100 text-blue-700",
  Rejected: "bg-red-100 text-red-700",
  Completed: "bg-purple-100 text-purple-700",
  Paid: "bg-green-100 text-green-700",
  Failed: "bg-red-100 text-red-700",
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
        statusColors[status] ||
        "bg-gray-100 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}