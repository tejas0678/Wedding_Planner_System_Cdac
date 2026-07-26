import { useState, useEffect } from 'react'
import SuggestionForm from '../../components/client/SuggestionForm'

export default function Suggestions() {
  const [weddings, setWeddings] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch user's bookings from API
  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/user/bookings')
        // const data = await response.json()
        // setWeddings(data)

        // For now, using empty array
        setWeddings([])
        setLoading(false)
      } catch (error) {
        console.error('Error fetching weddings:', error)
        setLoading(false)
      }
    }

    fetchWeddings()
  }, [])

  const handleSuggestionSubmit = async (suggestionData) => {
    try {
      // Replace with actual API call
      // const response = await fetch('/api/suggestions', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(suggestionData)
      // })
      // const data = await response.json()

      console.log('Suggestion submitted:', suggestionData)
      alert('Your suggestions have been submitted successfully!')
    } catch (error) {
      console.error('Error submitting suggestion:', error)
      alert('Failed to submit suggestions. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading...</div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">Wedding Arrangement Suggestions</h2>
      <p className="text-sm text-gray-400 mb-6">
        Share your preferences for food, decoration, entertainment, venue and photography so your planner can bring your vision to life.
      </p>
      <SuggestionForm weddings={weddings} onSubmit={handleSuggestionSubmit} />
    </div>
  )
}
