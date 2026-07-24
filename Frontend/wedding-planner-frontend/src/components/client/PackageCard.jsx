import { MdCheck } from 'react-icons/md'

export default function PackageCard({ pkg, featured, onSelect }) {
  const { name, price, description, services } = pkg

  const handleSelect = () => {
    if (onSelect) {
      onSelect()
    }
  }

  return (
    <div className={`bg-white rounded-2xl border p-6 shadow-sm transition-all duration-200 hover:shadow-lg hover:-translate-y-1
      ${featured ? 'border-[#EC0B72] ring-1 ring-[#EC0B72]/30' : 'border-gray-100'}
    `}>
      {featured && (
        <div className="inline-block bg-[#EC0B72] text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
          Most Popular
        </div>
      )}

      <h3 className="text-lg font-bold text-gray-900 mb-1">{name}</h3>
      <p className="text-xl font-bold text-[#EC0B72] mb-3">{price}</p>
      <p className="text-sm text-gray-500 mb-5 leading-relaxed">{description}</p>

      <div className="mb-5">
        <p className="text-sm font-semibold text-gray-900 mb-3">Includes:</p>
        <ul className="space-y-2">
          {services?.map((service, idx) => (
            <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
              <MdCheck size={16} className="text-[#EC0B72] flex-shrink-0" />
              {service}
            </li>
          ))}
        </ul>
      </div>

      <button 
        onClick={handleSelect}
        className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200
          ${featured
            ? 'bg-[#EC0B72] text-white hover:bg-[#c9005f]'
            : 'border border-[#EC0B72] text-[#EC0B72] hover:bg-pink-50'
          }`}
      >
        Select Package
      </button>
    </div>
  )
}