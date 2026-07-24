import React from 'react';

const CustomerReviews = ({ reviews = [] }) => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-serif font-bold text-center text-gray-800">
          What Our Couples Say
        </h2>

        {reviews.length === 0 ? (
          <p className="mt-12 text-center text-gray-400">No reviews to display yet.</p>
        ) : (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-50 p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                <div className="flex items-center">
                  <img
                    src={review.image || 'https://via.placeholder.com/60?text=User'}
                    alt={review.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div className="ml-4">
                    <h4 className="font-semibold text-gray-800">{review.name}</h4>
                    <p className="text-sm text-gray-500">{review.location}</p>
                  </div>
                </div>
                <div className="mt-3 flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                  ))}
                </div>
                <p className="mt-3 text-gray-600 italic">"{review.review}"</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default CustomerReviews;
