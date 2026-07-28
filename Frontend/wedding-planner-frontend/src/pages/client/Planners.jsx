import { useState, useEffect } from 'react'
import { MdSearch, MdLocationOn, MdClose } from 'react-icons/md'
import PlannerCard from '../../components/client/PlannerCard'

// Categories will be fetched from database
const categories = ['All', 'Luxury Weddings', 'Garden Weddings', 'Destination Weddings', 'Classic Ballroom', 'Beach Weddings']

export default function Planners() {
  const [planners, setPlanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedPlanner, setSelectedPlanner] = useState(null)
  const [locationInput, setLocationInput] = useState('')
  const [locationFilter, setLocationFilter] = useState('')

  // Fetch planners from API/database
  useEffect(() => {
    const fetchPlanners = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/planners')
        // const data = await response.json()
        // setPlanners(data)
        
        // For now, using empty array to show no data state
        setPlanners([])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching planners:', error)
        setLoading(false)
      }
    }

    fetchPlanners()
  }, [])

  const filtered = planners.filter((p) => {
    const matchesSearch =
      p.name?.toLowerCase().includes(search.toLowerCase()) ||
      p.city?.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === 'All' || p.category === category
    const matchesLocation =
      !locationFilter || p.city?.toLowerCase().includes(locationFilter.toLowerCase())
    return matchesSearch && matchesCategory && matchesLocation
  })

  const handleLocationKeyDown = (e) => {
    if (e.key === 'Enter') {
      setLocationFilter(locationInput.trim())
    }
  }

  const handleClearLocation = () => {
    setLocationInput('')
    setLocationFilter('')
  }

  const handleViewProfile = (planner) => {
    setSelectedPlanner(planner)
    // Navigate to planner profile or open modal
    // navigate(`/client/planners/${planner.id}`)
    console.log('Viewing planner profile:', planner)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading planners...</div>
      </div>
    )
  }

  return (
    <div>
      {/* Heading */}
      <div className="mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Browse Wedding Planners</h2>
        <p className="text-gray-400 text-sm mt-1">Find the perfect planner for your dream wedding.</p>
      </div>

      {/* Search + Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-7">
        <div className="relative flex-1">
          <MdSearch size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search planners..."
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:border-[#EC0B72] focus:ring-1 focus:ring-[#EC0B72]/20"
          />
        </div>
        <div className="relative sm:w-40">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm bg-white appearance-none focus:outline-none focus:border-[#EC0B72] focus:ring-1 focus:ring-[#EC0B72]/20 text-gray-700"
          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">▾</span>
        </div>
        <div className="relative flex-1">
          <MdLocationOn size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={locationInput}
            onChange={(e) => setLocationInput(e.target.value)}
            onKeyDown={handleLocationKeyDown}
            placeholder="Press Enter to search by location"
            className="w-full border border-gray-200 rounded-xl pl-10 pr-4 py-2.5 text-sm bg-white focus:outline-none focus:border-[#EC0B72] focus:ring-1 focus:ring-[#EC0B72]/20"
          />
        </div>
      </div>

      {/* Active location filter */}
      {locationFilter && (
        <div className="flex items-center gap-2 mb-5 -mt-3">
          <span className="inline-flex items-center gap-1.5 bg-[#EC0B72]/10 text-[#EC0B72] text-xs font-semibold px-3 py-1.5 rounded-full">
            <MdLocationOn size={14} />
            Filtering by: {locationFilter}
          </span>
          <button
            onClick={handleClearLocation}
            className="inline-flex items-center gap-1 text-xs font-semibold text-gray-500 hover:text-gray-700 px-2 py-1"
          >
            <MdClose size={14} />
            Clear
          </button>
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400 text-sm">
          {planners.length === 0
            ? 'No planners available yet. Please check back later.'
            : locationFilter
            ? `No planners found in "${locationFilter}".`
            : 'No planners found for your search.'}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((planner) => (
            <PlannerCard 
              key={planner.id} 
              planner={planner} 
              onViewProfile={handleViewProfile}
            />
          ))}
        </div>
      )}
    </div>
  )
}