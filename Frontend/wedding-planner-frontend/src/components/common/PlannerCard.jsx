import React from 'react';
import { Link } from 'react-router-dom';

const PlannerCard = ({ planner }) => {
  const { id, name, experience, rating, reviews, city, specialization, image } = planner;

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
      <img
        src={image || 'https://via.placeholder.com/300x200?text=Planner'}
        alt={name}
        className="w-full h-48 object-cover"
      />
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-sm text-gray-500">{specialization}</p>
        <div className="mt-2 flex items-center text-sm text-gray-600">
          <span className="font-medium">{experience}</span>
          <span className="mx-2">•</span>
          <span className="flex items-center">
            <span className="text-yellow-400 mr-1">★</span>
            {rating} ({reviews} reviews)
          </span>
        </div>
        <p className="mt-2 text-sm text-gray-500">{city}</p>
        <Link
          to={`/planner/${id}`}
          className="mt-4 inline-block w-full text-center bg-rose-600 text-white py-2 rounded-full hover:bg-rose-700 transition"
        >
          View Profile
        </Link>
      </div>
    </div>
  );
};

export default PlannerCard;
