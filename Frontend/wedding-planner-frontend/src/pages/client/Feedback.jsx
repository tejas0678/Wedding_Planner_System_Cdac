import { useState, useEffect } from 'react'
import FeedbackForm from '../../components/client/FeedbackForm'

export default function Feedback() {
  const [weddings, setWeddings] = useState([])
  const [loading, setLoading] = useState(true)

  // Fetch user's completed weddings from API
  useEffect(() => {
    const fetchWeddings = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/user/completed-weddings')
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

  const handleFeedbackSubmit = async (feedbackData) => {
    try {
      // Replace with actual API call
      // const response = await fetch('/api/feedback', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(feedbackData)
      // })
      // const data = await response.json()
      
      console.log('Feedback submitted:', feedbackData)
      alert('Feedback submitted successfully!')
    } catch (error) {
      console.error('Error submitting feedback:', error)
      alert('Failed to submit feedback. Please try again.')
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
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">Feedback &amp; Rating</h2>
      <FeedbackForm weddings={weddings} onSubmit={handleFeedbackSubmit} />
    </div>
  )
}