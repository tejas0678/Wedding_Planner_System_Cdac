import { MdLocationOn, MdStar } from 'react-icons/md'

export default function PlannerCard({ planner, onViewProfile }) {
  const { name, category, city, experience, rating, image } = planner

  const handleViewProfile = () => {
    if (onViewProfile) {
      onViewProfile(planner)
    }
  }

  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm card-hover transition-all duration-200 hover:shadow-lg hover:-translate-y-1">
      {/* Image */}
      <div className="h-52 overflow-hidden bg-gray-100">
        <img
          src={image || 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80'}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&q=80'
          }}
        />
      </div>

      {/* Info */}
      <div className="p-4">
        <h3 className="font-bold text-gray-900 text-base leading-snug mb-1">{name}</h3>
        <p className="text-sm text-[#EC0B72] font-medium mb-3">{category}</p>

        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span className="flex items-center gap-1">
            <MdLocationOn size={14} className="text-gray-400" />
            {city}
          </span>
          <span className="flex items-center gap-1 font-semibold text-amber-500">
            <MdStar size={16} />
            {rating}
          </span>
        </div>

        <p className="text-xs text-gray-400 mb-4">{experience} Years experience</p>

        <button 
          onClick={handleViewProfile}
          className="w-full bg-[#EC0B72] text-white text-sm font-semibold py-2.5 rounded-xl hover:bg-[#c9005f] transition-colors duration-200"
        >
          View Profile
        </button>
      </div>
    </div>
  )
}