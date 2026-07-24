import { useState, useEffect } from 'react'

export default function ProfileForm({ userData, onUpdate }) {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
  })

  useEffect(() => {
    if (userData) {
      setForm({
        name: userData.name || '',
        email: userData.email || '',
        password: userData.password || '••••••••',
      })
    }
  }, [userData])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onUpdate) {
      onUpdate(form)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div>
          <label className="block text-xs font-semibold text-[#EC0B72] mb-1.5">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#EC0B72] focus:ring-1 focus:ring-[#EC0B72]/20"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-xs font-semibold text-[#EC0B72] mb-1.5">Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#EC0B72] focus:ring-1 focus:ring-[#EC0B72]/20"
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-xs font-semibold text-[#EC0B72] mb-1.5">Password</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Enter new password"
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#EC0B72] focus:ring-1 focus:ring-[#EC0B72]/20"
          />
          <p className="text-xs text-gray-400 mt-1">Leave blank to keep current password</p>
        </div>

        <button
          type="submit"
          className="bg-[#EC0B72] text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-[#c9005f] transition-colors duration-200 mt-2"
        >
          Save Changes
        </button>
      </form>
    </div>
  )
}