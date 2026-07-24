import React from 'react';
import { Link } from 'react-router-dom';

const PackageCard = ({ packageData }) => {
  const { id, name, price, description, services, image } = packageData;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      <img
        src={image || 'https://via.placeholder.com/400x250?text=Package'}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-6 flex-1 flex flex-col">
        <h3 className="text-2xl font-bold text-gray-800">{name}</h3>
        <p className="text-xl text-rose-600 font-semibold mt-1">{price}</p>
        <p className="mt-3 text-gray-600 text-sm flex-1">{description}</p>
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700">Includes:</p>
          <ul className="mt-2 space-y-1 text-sm text-gray-600">
            {services?.slice(0, 4).map((service, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-rose-500 mr-2">✓</span>
                {service}
              </li>
            ))}
            {services?.length > 4 && (
              <li className="text-gray-400 text-xs">+ more</li>
            )}
          </ul>
        </div>
        <Link
          to={`/package/${id}`}
          className="mt-6 inline-block w-full text-center bg-rose-600 text-white py-2 rounded-full hover:bg-rose-700 transition"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default PackageCard;
