import { useState, useEffect } from 'react'
import ProfileForm from '../../components/client/ProfileForm'

export default function Profile() {
  const [userData, setUserData] = useState(null)
  const [loading, setLoading] = useState(true)

  // Fetch user profile from API
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('/api/user/profile')
        // const data = await response.json()
        // setUserData(data)
        
        // For demo, using default values
        setUserData({
          name: 'Pratiksha Chikane',
          email: 'pdchikane21@gmail.com',
          password: '••••••••'
        })
        setLoading(false)
      } catch (error) {
        console.error('Error fetching profile:', error)
        setLoading(false)
      }
    }

    fetchProfile()
  }, [])

  const handleProfileUpdate = async (updatedData) => {
    try {
      // Replace with actual API call
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(updatedData)
      // })
      // const data = await response.json()
      // setUserData(data)
      
      console.log('Profile updated:', updatedData)
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile. Please try again.')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading profile...</div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">My Profile</h2>
      <ProfileForm userData={userData} onUpdate={handleProfileUpdate} />
    </div>
  )
}