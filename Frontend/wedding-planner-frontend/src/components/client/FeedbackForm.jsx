import { useState } from 'react'

export default function FeedbackForm({ weddings, onSubmit }) {
  const [form, setForm] = useState({
    wedding: '',
    rating: '5',
    comment: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(form)
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm max-w-lg mx-auto">
      <p className="text-sm text-gray-400 mb-5 leading-relaxed">
        You can leave feedback after your wedding is completed.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Wedding */}
        <div>
          <label className="block text-xs font-semibold text-[#EC0B72] mb-1.5">Wedding</label>
          <div className="relative">
            <select
              name="wedding"
              value={form.wedding}
              onChange={handleChange}
              required
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 appearance-none focus:outline-none focus:border-[#EC0B72] focus:ring-1 focus:ring-[#EC0B72]/20 bg-white"
            >
              <option value="">Select completed wedding</option>
              {weddings.length === 0 ? (
                <option value="" disabled>No completed weddings available</option>
              ) : (
                weddings.map((wedding) => (
                  <option key={wedding.id} value={wedding.id}>
                    {wedding.name} - {wedding.date}
                  </option>
                ))
              )}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-xs font-semibold text-[#EC0B72] mb-1.5">Rating</label>
          <div className="relative">
            <select
              name="rating"
              value={form.rating}
              onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 appearance-none focus:outline-none focus:border-[#EC0B72] focus:ring-1 focus:ring-[#EC0B72]/20 bg-white"
            >
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>{r} — {'★'.repeat(r)}</option>
              ))}
            </select>
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
          </div>
        </div>

        {/* Comment */}
        <div>
          <label className="block text-xs font-semibold text-[#EC0B72] mb-1.5">Comment</label>
          <textarea
            name="comment"
            value={form.comment}
            onChange={handleChange}
            rows={4}
            placeholder="Share your experience..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm resize-y focus:outline-none focus:border-[#EC0B72] focus:ring-1 focus:ring-[#EC0B72]/20"
          />
        </div>

        <button
          type="submit"
          className="bg-[#EC0B72] text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-[#c9005f] transition-colors duration-200"
        >
          Submit Feedback
        </button>
      </form>
    </div>
  )
}