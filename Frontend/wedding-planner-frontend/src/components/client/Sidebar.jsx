import { NavLink, useNavigate } from 'react-router-dom'
import {
  MdDashboard,
  MdPeople,
  MdCardGiftcard,
  MdCalendarToday,
  MdPayment,
  MdFeedback,
  MdPerson,
  MdLogout,
} from 'react-icons/md'
import { FaHeart } from 'react-icons/fa'

const menuItems = [
  { label: 'Dashboard', icon: <MdDashboard size={18} />, to: '/client/dashboard' },
  { label: 'Browse Planners', icon: <MdPeople size={18} />, to: '/client/planners' },
  { label: 'Packages', icon: <MdCardGiftcard size={18} />, to: '/client/packages' },
  { label: 'My Bookings', icon: <MdCalendarToday size={18} />, to: '/client/bookings' },
  { label: 'Payments', icon: <MdPayment size={18} />, to: '/client/payments' },
  { label: 'Feedback', icon: <MdFeedback size={18} />, to: '/client/feedback' },
  { label: 'Profile', icon: <MdPerson size={18} />, to: '/client/profile' },
]

export default function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/')
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-20 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full w-56 bg-white z-30 flex flex-col shadow-lg
          transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:z-auto lg:shadow-none lg:border-r lg:border-gray-100
        `}
      >
        {/* Logo */}
        <div className="px-5 py-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <FaHeart className="text-[#EC0B72]" size={16} />
            <span className="text-xl font-bold text-gray-900 tracking-tight">WedPlan</span>
          </div>
        </div>

        {/* User info */}
        <div className="mx-3 mt-4 mb-2 bg-pink-50 rounded-xl p-3">
          <p className="text-[10px] font-semibold text-[#EC0B72] uppercase tracking-widest mb-1">Client</p>
          <p className="text-sm font-bold text-gray-900 leading-tight">Olivia Johnson</p>
          <p className="text-[11px] text-gray-400 mt-0.5 truncate">client@example.com</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-2 py-3 overflow-y-auto">
          <ul className="space-y-0.5">
            {menuItems.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150
                    ${isActive
                      ? 'bg-pink-50 text-[#EC0B72]'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`
                  }
                >
                  <span className="flex-shrink-0">{item.icon}</span>
                  <span>{item.label}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* Logout */}
        <div className="px-2 py-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 hover:bg-red-50 hover:text-red-500 transition-all duration-150"
          >
            <MdLogout size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
