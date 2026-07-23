export default function DashboardCard({ label, value, icon, subLabel }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 flex items-start justify-between shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-400 mb-2">
          {label}
        </p>
        <p className="text-2xl font-bold text-gray-900 leading-tight">{value}</p>
        {subLabel && (
          <p className="text-xs text-gray-400 mt-1">{subLabel}</p>
        )}
      </div>
      <div className="flex-shrink-0 ml-3">
        <div className="w-10 h-10 bg-pink-50 rounded-xl flex items-center justify-center text-[#EC0B72]">
          {icon}
        </div>
      </div>
    </div>
  )
}
