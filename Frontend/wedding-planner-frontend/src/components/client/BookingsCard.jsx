import { MdCalendarToday, MdPerson, MdCardGiftcard } from 'react-icons/md'

const statusColors = {
  Confirmed: 'bg-green-100 text-green-700',
  Pending: 'bg-yellow-100 text-yellow-700',
  Cancelled: 'bg-red-100 text-red-700',
  Completed: 'bg-blue-100 text-blue-700',
}

export default function BookingCard({ booking }) {
  const { id, planner, package: pkg, date, status, amount } = booking

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-xs text-gray-400 font-medium mb-1">Booking #{id}</p>
          <h3 className="font-semibold text-gray-900">{planner}</h3>
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${statusColors[status] || 'bg-gray-100 text-gray-600'}`}>
          {status}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-500">
        <div className="flex items-center gap-2">
          <MdCalendarToday size={15} className="text-[#EC0B72]" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <MdCardGiftcard size={15} className="text-[#EC0B72]" />
          <span>{pkg}</span>
        </div>
        <div className="flex items-center gap-2">
          <MdPerson size={15} className="text-[#EC0B72]" />
          <span className="font-semibold text-gray-800">{amount}</span>
        </div>
      </div>
    </div>
  )
}
