import React, { useState, useEffect } from 'react';
import ProfileForm from '../../components/client/ProfileForm';
import { getClientProfile, updateClientProfile } from '../../services/clientService';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const data = await getClientProfile();
        setUserData(data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileUpdate = async (updatedData) => {
    try {
      const data = await updateClientProfile(updatedData);
      setUserData(data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-gray-400">Loading profile...</div>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">My Profile</h2>
      <ProfileForm userData={userData} onUpdate={handleProfileUpdate} />
    </div>
  );
}