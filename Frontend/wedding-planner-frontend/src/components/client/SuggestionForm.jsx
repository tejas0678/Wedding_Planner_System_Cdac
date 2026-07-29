import { useState } from 'react'
import {
  MdRestaurant,
  MdColorLens,
  MdMusicNote,
  MdLocationOn,
  MdCameraAlt,
  MdNotes,
} from 'react-icons/md'

const initialForm = {
  wedding: '',
  foodMenu: {
    cuisinePreferences: '',
    dietaryRestrictions: '',
    specialDishes: '',
  },
  decoration: {
    theme: '',
    colors: '',
    flowerPreferences: '',
    setupStyle: '',
  },
  entertainment: {
    music: '',
    dance: '',
    performances: '',
    dj: '',
  },
  venue: {
    indoorOutdoor: '',
    seatingArrangement: '',
    specialRequirements: '',
  },
  photography: {
    style: '',
    specialMoments: '',
    candidOrTraditional: '',
  },
  otherRequests: '',
}

function SectionCard({ icon, title, description, children }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-[#EC0B72]">{icon}</span>
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
      </div>
      {description && (
        <p className="text-xs text-gray-400 mb-4">{description}</p>
      )}
      <div className={`space-y-4 ${description ? '' : 'mt-4'}`}>{children}</div>
    </div>
  )
}

function TextField({ label, name, value, onChange, placeholder }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#EC0B72] mb-1.5">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#EC0B72] focus:ring-1 focus:ring-[#EC0B72]/20"
      />
    </div>
  )
}

function TextAreaField({ label, name, value, onChange, placeholder, rows = 2 }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#EC0B72] mb-1.5">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm resize-y focus:outline-none focus:border-[#EC0B72] focus:ring-1 focus:ring-[#EC0B72]/20"
      />
    </div>
  )
}

function SelectField({ label, name, value, onChange, options }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[#EC0B72] mb-1.5">{label}</label>
      <div className="relative">
        <select
          name={name}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 appearance-none focus:outline-none focus:border-[#EC0B72] focus:ring-1 focus:ring-[#EC0B72]/20 bg-white"
        >
          <option value="">No preference</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">▾</span>
      </div>
    </div>
  )
}

export default function SuggestionForm({ weddings = [], onSubmit }) {
  const [form, setForm] = useState(initialForm)

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.includes('.')) {
      const [section, field] = name.split('.')
      setForm((prev) => ({
        ...prev,
        [section]: { ...prev[section], [field]: value },
      }))
    } else {
      setForm((prev) => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (onSubmit) {
      onSubmit(form)
    }
    setForm(initialForm)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-3xl">
      {/* Wedding */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
        <label className="block text-xs font-semibold text-[#EC0B72] mb-1.5">Wedding</label>
        <div className="relative">
          <select
            name="wedding"
            value={form.wedding}
            onChange={handleChange}
            required
            className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-700 appearance-none focus:outline-none focus:border-[#EC0B72] focus:ring-1 focus:ring-[#EC0B72]/20 bg-white"
          >
            <option value="">Select wedding</option>
            {weddings.length === 0 ? (
              <option value="" disabled>No bookings available</option>
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

      {/* Food Menu */}
      <SectionCard
        icon={<MdRestaurant size={18} />}
        title="Food Menu"
        description="Tell us about your cuisine preferences and dietary needs."
      >
        <TextAreaField
          label="Cuisine Preferences"
          name="foodMenu.cuisinePreferences"
          value={form.foodMenu.cuisinePreferences}
          onChange={handleChange}
          placeholder="e.g. North Indian, Continental, Chinese..."
        />
        <TextAreaField
          label="Dietary Restrictions"
          name="foodMenu.dietaryRestrictions"
          value={form.foodMenu.dietaryRestrictions}
          onChange={handleChange}
          placeholder="e.g. Vegetarian, Vegan, Jain, nut allergies..."
        />
        <TextAreaField
          label="Special Dishes"
          name="foodMenu.specialDishes"
          value={form.foodMenu.specialDishes}
          onChange={handleChange}
          placeholder="Any must-have dishes for your menu..."
        />
      </SectionCard>

      {/* Decoration */}
      <SectionCard
        icon={<MdColorLens size={18} />}
        title="Decoration"
        description="Share the look and feel you're going for."
      >
        <TextField
          label="Theme"
          name="decoration.theme"
          value={form.decoration.theme}
          onChange={handleChange}
          placeholder="e.g. Royal, Boho, Minimalist..."
        />
        <TextField
          label="Colors"
          name="decoration.colors"
          value={form.decoration.colors}
          onChange={handleChange}
          placeholder="e.g. Blush pink and gold"
        />
        <TextField
          label="Flower Preferences"
          name="decoration.flowerPreferences"
          value={form.decoration.flowerPreferences}
          onChange={handleChange}
          placeholder="e.g. Roses, marigolds, orchids..."
        />
        <TextAreaField
          label="Setup Style"
          name="decoration.setupStyle"
          value={form.decoration.setupStyle}
          onChange={handleChange}
          placeholder="Describe your preferred stage/mandap/entrance setup..."
        />
      </SectionCard>

      {/* Entertainment */}
      <SectionCard
        icon={<MdMusicNote size={18} />}
        title="Entertainment"
        description="Let us know how you'd like guests to be entertained."
      >
        <TextField
          label="Music"
          name="entertainment.music"
          value={form.entertainment.music}
          onChange={handleChange}
          placeholder="e.g. Live band, Bollywood playlist..."
        />
        <TextField
          label="Dance"
          name="entertainment.dance"
          value={form.entertainment.dance}
          onChange={handleChange}
          placeholder="e.g. Sangeet choreography, folk dance..."
        />
        <TextField
          label="Performances"
          name="entertainment.performances"
          value={form.entertainment.performances}
          onChange={handleChange}
          placeholder="e.g. Singer, magician, fireworks..."
        />
        <SelectField
          label="DJ"
          name="entertainment.dj"
          value={form.entertainment.dj}
          onChange={handleChange}
          options={['Required', 'Not Required']}
        />
      </SectionCard>

      {/* Venue */}
      <SectionCard
        icon={<MdLocationOn size={18} />}
        title="Venue"
        description="Tell us about your venue setup preferences."
      >
        <SelectField
          label="Indoor / Outdoor"
          name="venue.indoorOutdoor"
          value={form.venue.indoorOutdoor}
          onChange={handleChange}
          options={['Indoor', 'Outdoor', 'Both']}
        />
        <TextAreaField
          label="Seating Arrangement"
          name="venue.seatingArrangement"
          value={form.venue.seatingArrangement}
          onChange={handleChange}
          placeholder="e.g. Round tables, banquet style, lounge seating..."
        />
        <TextAreaField
          label="Special Requirements"
          name="venue.specialRequirements"
          value={form.venue.specialRequirements}
          onChange={handleChange}
          placeholder="e.g. Wheelchair access, parking, generator backup..."
        />
      </SectionCard>

      {/* Photography */}
      <SectionCard
        icon={<MdCameraAlt size={18} />}
        title="Photography"
        description="Share your photography and videography preferences."
      >
        <SelectField
          label="Candid / Traditional"
          name="photography.candidOrTraditional"
          value={form.photography.candidOrTraditional}
          onChange={handleChange}
          options={['Candid', 'Traditional', 'Both']}
        />
        <TextField
          label="Style"
          name="photography.style"
          value={form.photography.style}
          onChange={handleChange}
          placeholder="e.g. Cinematic, vintage, drone shots..."
        />
        <TextAreaField
          label="Special Moments to Capture"
          name="photography.specialMoments"
          value={form.photography.specialMoments}
          onChange={handleChange}
          placeholder="e.g. Ring exchange, first dance, family portraits..."
        />
      </SectionCard>

      {/* Other Requests */}
      <SectionCard icon={<MdNotes size={18} />} title="Other Requests">
        <TextAreaField
          label="Any other special requests or suggestions"
          name="otherRequests"
          value={form.otherRequests}
          onChange={handleChange}
          placeholder="Anything else you'd like your planner to know..."
          rows={4}
        />
      </SectionCard>

      <button
        type="submit"
        className="bg-[#EC0B72] text-white text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-[#c9005f] transition-colors duration-200"
      >
        Submit Suggestions
      </button>
    </form>
  )
}
