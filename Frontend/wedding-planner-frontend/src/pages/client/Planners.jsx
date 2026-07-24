import { useState, useEffect } from 'react'
import { MdSearch } from 'react-icons/md'
import PlannerCard from '../../components/client/PlannerCard'

// Categories will be fetched from database
const categories = ['All', 'Luxury Weddings', 'Garden Weddings', 'Destination Weddings', 'Classic Ballroom', 'Beach Weddings']

export default function Planners() {
  const [planners, setPlanners] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [selectedPlanner, setSelectedPlanner] = useState(null)

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
    return matchesSearch && matchesCategory
  })

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
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400 text-sm">
          {planners.length === 0 ? 'No planners available yet. Please check back later.' : 'No planners found for your search.'}
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