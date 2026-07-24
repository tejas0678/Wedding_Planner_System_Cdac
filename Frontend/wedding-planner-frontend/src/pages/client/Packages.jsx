import { useState, useEffect } from 'react'
import PackageCard from '../../components/client/PackageCard'

export default function Packages() {
  const [packages, setPackages] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch packages from API/database
  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/packages')
        // const data = await response.json()
        // setPackages(data)
        
        // For now, using empty array to show no data state
        setPackages([])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching packages:', error)
        setLoading(false)
      }
    }

    fetchPackages()
  }, [])

  const handleSelectPackage = (pkg) => {
    // Handle package selection - navigate to booking or open modal
    console.log('Selected package:', pkg)
    // navigate('/client/bookings', { state: { package: pkg } })
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading packages...</div>
      </div>
    )
  }

  return (
    <div>
      {/* Heading */}
      <div className="mb-8 text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Choose Your Wedding Package</h2>
        <p className="text-gray-400 text-sm mt-2">Simple, transparent packages: Silver, Gold and Premium.</p>
      </div>

      {/* Package cards */}
      {packages.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400 text-sm max-w-5xl mx-auto">
          No packages available yet. Please check back later.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {packages.map((pkg) => (
            <PackageCard 
              key={pkg.id} 
              pkg={pkg} 
              featured={pkg.featured} 
              onSelect={() => handleSelectPackage(pkg)}
            />
          ))}
        </div>
      )}
    </div>
  )
}