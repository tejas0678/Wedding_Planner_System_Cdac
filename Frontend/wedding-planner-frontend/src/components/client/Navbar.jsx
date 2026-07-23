import { useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { MdMenu, MdNotifications } from 'react-icons/md'
import { FaUserCircle } from 'react-icons/fa'
import { useAppData } from '../../context/client/AppDataContext'  

const pageTitles = {
  '/client/dashboard': 'Dashboard',
  '/client/planners': 'Browse Planners',
  '/client/packages': 'Packages',
  '/client/bookings': 'My Bookings',
  '/client/payments': 'Payments',
  '/client/feedback': 'Feedback & Rating',
  '/client/profile': 'My Profile',
}

function formatRelativeTime(dateString) {
  if (!dateString) return ''
  const date = new Date(dateString)
  if (Number.isNaN(date.getTime())) return dateString

  const diffMs = Date.now() - date.getTime()
  const diffMins = Math.round(diffMs / 60000)
  if (diffMins < 60) return `${Math.max(diffMins, 0)}m ago`
  const diffHours = Math.round(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  const diffDays = Math.round(diffHours / 24)
  return `${diffDays}d ago`
}

export default function Navbar({ onMenuToggle }) {
  const location = useLocation()
  const navigate = useNavigate()
  const { notifications } = useAppData()  
  const title = pageTitles[location.pathname] || 'Dashboard'
  const [showNotifications, setShowNotifications] = useState(false)
  const notificationsRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(event) {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <header className="bg-white border-b border-gray-100 px-4 lg:px-6 py-3 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-3">
        {/* for mobile view*/}
        <button
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          aria-label="Toggle menu"
        >
          <MdMenu size={22} />
        </button>

        <div>
          <h1 className="text-base font-semibold text-gray-900">{title}</h1>
          <p className="text-xs text-gray-400 hidden sm:block">Welcome back, Olivia</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* Notification */}
        <div className="relative" ref={notificationsRef}>
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
            aria-label="Notifications"
          >
            <MdNotifications size={22} />
            {notifications.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EC0B72] rounded-full"></span>
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg border border-gray-100 z-20 overflow-hidden">
              <div className="px-4 py-2.5 border-b border-gray-100">
                <p className="text-sm font-semibold text-gray-900">Notifications</p>
              </div>
              {notifications.length === 0 ? (
                <p className="px-4 py-6 text-sm text-gray-400 text-center">No notifications yet.</p>
              ) : (
                <ul className="max-h-72 overflow-y-auto">
                  {notifications.map((n) => (
                    <li key={n.id} className="px-4 py-3 border-b border-gray-50 last:border-b-0 hover:bg-gray-50">
                      <p className="text-sm text-gray-700">{n.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{formatRelativeTime(n.time)}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* Avatar */}
        <button
          onClick={() => navigate('/client/profile')}
          className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
          <FaUserCircle size={28} className="text-[#EC0B72]" />
          <span className="text-sm font-medium text-gray-700 hidden md:block">Olivia J.</span>
        </button>
      </div>
    </header>
  )
}