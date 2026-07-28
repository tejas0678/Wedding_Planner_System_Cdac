import React from 'react';

const defaultReviews = [
  {
    id: 1,
    quote: "Royal Touch Weddings transformed our dream wedding into an absolute fairytale. Every decor detail, meal, and event flow was executed with utmost perfection!",
    author: "Aarav & Meera Kapoor",
  },
  {
    id: 2,
    quote: "The sunset beach mandap and DJ party created by Destination Forever Planners were unforgettable! Our guests are still raving about the hospitality.",
    author: "Rahul & Divya Kulkarni",
  },
  {
    id: 3,
    quote: "Blissful Knot Events handled our 250 guest wedding seamlessly within our exact budget! Highly professional, punctual, and innovative.",
    author: "Siddharth & Ananya Joshi",
  },
];

const CustomerReviews = ({ reviews = [] }) => {
  const displayReviews = reviews.length > 0 ? reviews : defaultReviews;

  return (
    <section className="bg-[#4E0A1A] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#6A0C24] via-[#4E0A1A] to-[#2F040F] text-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-center tracking-tight text-white mb-14">
          Loved by Brides & Grooms
        </h2>

        {/* 3 Translucent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayReviews.map((item) => (
            <div
              key={item.id}
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 flex flex-col justify-between hover:bg-white/10 transition-all duration-300"
            >
              <p className="text-rose-100/90 italic font-light leading-relaxed text-sm sm:text-base">
                "{item.quote || item.review}"
              </p>
              
              <div className="mt-8 pt-4 border-t border-white/10">
                <h4 className="font-semibold text-white text-base">
                  {item.author || item.name}
                </h4>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CustomerReviews;
