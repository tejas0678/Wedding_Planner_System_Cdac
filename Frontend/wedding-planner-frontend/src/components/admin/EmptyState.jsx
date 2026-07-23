export default function EmptyState({
  message = "No data available",
}) {
  return (
    <div className="flex items-center justify-center py-12">
      <p className="text-gray-500 text-base font-medium">
        {message}
      </p>
    </div>
  );
}