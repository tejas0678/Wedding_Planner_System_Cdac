import React, { useState, useEffect } from 'react';
import { getReviews } from '../../services/reviewService';

const CustomerReviews = ({ reviews = [] }) => {
  const [reviewList, setReviewList] = useState(reviews);
  const [loading, setLoading] = useState(reviews.length === 0);

  useEffect(() => {
    if (reviews.length > 0) {
      setReviewList(reviews);
      setLoading(false);
    } else {
      async function loadReviews() {
        try {
          setLoading(true);
          const data = await getReviews();
          if (data && data.length > 0) {
            setReviewList(data.map((r) => ({
              id: r.id,
              quote: r.comment,
              author: r.clientName || 'Happy Couple'
            })));
          }
        } catch (err) {
          console.error("Failed to load reviews:", err);
        } finally {
          setLoading(false);
        }
      }
      loadReviews();
    }
  }, [reviews]);

  return (
    <section className="bg-[#4E0A1A] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#6A0C24] via-[#4E0A1A] to-[#2F040F] text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center tracking-tight text-white mb-14">
          Loved by Brides & Grooms
        </h2>

        {/* Loading */}
        {loading && (
          <div className="text-center text-rose-200/80 font-medium py-8">
            Loading testimonials...
          </div>
        )}

        {/* 3 Translucent Cards */}
        {!loading && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviewList.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:bg-white/10 transition-all duration-300"
              >
                <p className="text-rose-100/90 italic font-light leading-relaxed text-sm sm:text-base">
                  "{item.quote || item.comment}"
                </p>
                
                <div className="mt-8 pt-4 border-t border-white/10">
                  <h4 className="font-semibold text-white text-base">
                    {item.author || item.clientName}
                  </h4>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default CustomerReviews;
