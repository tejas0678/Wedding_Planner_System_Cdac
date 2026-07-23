export default function StatCard({
  title,
  value,
  symbol,
  bg,
  text,
}) {
  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 p-5 flex items-center gap-4">
      <div
        className={`w-14 h-14 rounded-full flex items-center justify-center text-2xl ${bg} ${text}`}
      >
        {symbol}
      </div>

      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
    </div>
  );
}