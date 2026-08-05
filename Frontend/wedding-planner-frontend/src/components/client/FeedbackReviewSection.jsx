import React, { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FiEdit, FiTrash2, FiUploadCloud, FiCheck, FiMessageCircle, FiPlus } from 'react-icons/fi';

export default function FeedbackReviewSection() {
  const [reviews, setReviews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingReviewId, setEditingReviewId] = useState(null);

  // Form State
  const [weddingName, setWeddingName] = useState('');
  const [plannerName, setPlannerName] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveReview = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      alert('Please fill in the title and review description.');
      return;
    }

    if (editingReviewId) {
      // Edit Review
      setReviews(
        reviews.map((r) =>
          r.id === editingReviewId
            ? {
              ...r,
              rating,
              title,
              description,
              image: imagePreview || r.image,
            }
            : r
        )
      );
      alert('Review updated successfully!');
    } else {
      // Create Review
      const newRev = {
        id: Date.now(),
        weddingName,
        plannerName,
        rating,
        title,
        description,
        date: new Date().toISOString().split('T')[0],
        image: imagePreview || 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600&auto=format&fit=crop',
        plannerReply: null,
      };
      setReviews([newRev, ...reviews]);
      alert('Thank you! Your review has been published.');
    }

    // Reset Form
    setTitle('');
    setDescription('');
    setImagePreview(null);
    setEditingReviewId(null);
    setShowForm(false);
  };

  const handleEditClick = (review) => {
    setEditingReviewId(review.id);
    setRating(review.rating);
    setTitle(review.title);
    setDescription(review.description);
    setImagePreview(review.image);
    setShowForm(true);
  };

  const handleDeleteClick = (id) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter((r) => r.id !== id));
    }
  };

  // Calculate dynamic stats
  const averageRating = reviews.length > 0
    ? (reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length).toFixed(1)
    : 0;

  return (
    <div className="space-y-8">

      {/* 1. OVERVIEW & AVERAGE RATING BANNER */}
      <div className="bg-white rounded-3xl border border-rose-100/80 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <span className="text-[10px] font-extrabold tracking-widest text-[#EC3664] uppercase block mb-1">
            CLIENT FEEDBACK & RATING HISTORY
          </span>
          <h2 className="font-serif text-3xl font-bold text-gray-900">
            Reviews & Planning Experience
          </h2>
          <p className="text-gray-500 text-xs sm:text-sm font-light mt-1">
            Share your feedback for completed wedding bookings & view planner ratings.
          </p>
        </div>

        {/* Average Rating Capsule */}
        {reviews.length > 0 && (
          <div className="flex items-center gap-4 bg-[#FFF9FA] border border-rose-100 p-4 rounded-2xl shrink-0">
            <div className="text-center">
              <span className="font-serif text-4xl font-bold text-gray-900 block">{averageRating}</span>
              <div className="flex items-center gap-1 text-amber-400 text-xs mt-0.5 justify-center">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className={`w-3.5 h-3.5 ${i < Math.round(averageRating) ? 'text-amber-400' : 'text-gray-200'}`} />
                ))}
              </div>
            </div>
            <div className="border-l border-rose-200/60 pl-4 text-xs">
              <span className="font-bold text-gray-800 block">Verified Planner Score</span>
              <span className="text-gray-500 font-light">Based on {reviews.length} verified review{reviews.length === 1 ? '' : 's'}</span>
            </div>
          </div>
        )}
      </div>

      {/* 2. WRITE REVIEW BUTTON / TOGGLE */}
      <div className="flex justify-between items-center">
        <h3 className="font-serif text-2xl font-bold text-gray-900">
          Your Submitted Reviews ({reviews.length})
        </h3>

        <button
          onClick={() => {
            setEditingReviewId(null);
            setTitle('');
            setDescription('');
            setImagePreview(null);
            setShowForm(!showForm);
          }}
          className="bg-[#EC3664] hover:bg-[#d42d57] text-white px-5 py-2.5 rounded-full text-xs font-bold shadow-md transition flex items-center gap-1.5 cursor-pointer"
        >
          <FiPlus className="w-4 h-4" />
          <span>{showForm ? 'Cancel Review' : 'Write A New Review'}</span>
        </button>
      </div>

      {/* 3. REVIEW FORM (CREATE / EDIT) */}
      {showForm && (
        <div className="bg-white rounded-3xl border border-rose-200 p-6 sm:p-8 shadow-md animate-in fade-in zoom-in-95 duration-200 space-y-6">
          <h3 className="font-serif text-2xl font-bold text-gray-900 border-b border-gray-100 pb-3">
            {editingReviewId ? 'Edit Your Review' : 'Write Feedback for Completed Booking'}
          </h3>

          <form onSubmit={handleSaveReview} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Booking/Event Name</label>
                <input
                  type="text"
                  value={weddingName}
                  onChange={(e) => setWeddingName(e.target.value)}
                  placeholder="e.g. Destination Wedding Package"
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-800 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Planner/Studio Name</label>
                <input
                  type="text"
                  value={plannerName}
                  onChange={(e) => setPlannerName(e.target.value)}
                  placeholder="e.g. Touch Weddings Studio"
                  className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-800 focus:outline-none"
                />
              </div>

              {/* Interactive Star Rating */}
              <div>
                <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Rating (1 to 5 Stars)</label>
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="text-2xl transition hover:scale-125 cursor-pointer"
                    >
                      <FaStar className={star <= rating ? 'text-amber-400' : 'text-gray-200'} />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-gray-700 ml-2">{rating} / 5 Stars</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Review Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Magnificent Royal Mandap & Flawless Coordination!"
                className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl px-3.5 py-2.5 text-xs font-medium text-gray-800 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Detailed Feedback & Experience</label>
              <textarea
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your wedding experience, decor quality, hospitality, and planner service..."
                className="w-full bg-[#FFF9FA] border border-rose-100 rounded-xl p-3.5 text-xs text-gray-800 focus:outline-none"
              />
            </div>

            {/* Image Upload UI */}
            <div>
              <label className="block text-xs font-bold text-gray-700 uppercase mb-1">Upload Event Photos (Optional)</label>
              <div className="flex items-center gap-4">
                <label className="bg-[#FFF0F3] hover:bg-[#FCE7F0] border border-rose-200 text-[#EC3664] px-4 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 cursor-pointer">
                  <FiUploadCloud className="w-4 h-4" />
                  <span>Choose Photos</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>

                {imagePreview && (
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden border border-rose-200">
                    <img src={imagePreview} alt="Upload preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                className="bg-[#EC3664] hover:bg-[#d42d57] text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md transition cursor-pointer"
              >
                {editingReviewId ? 'Update Review' : 'Publish Review'}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-full text-xs font-bold transition cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 4. REVIEWS LIST */}
      <div className="space-y-6">
        {reviews.map((rev) => (
          <div
            key={rev.id}
            className="bg-white rounded-3xl border border-rose-100/80 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row justify-between gap-6"
          >
            <div className="flex-1 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(rev.rating)].map((_, i) => (
                    <FaStar key={i} className="w-4 h-4" />
                  ))}
                </div>
                <span className="text-xs text-gray-400 font-light">{rev.date}</span>
              </div>

              <h4 className="font-serif text-xl font-bold text-gray-900 leading-snug">
                {rev.title}
              </h4>

              <p className="text-xs sm:text-sm text-gray-600 font-light leading-relaxed">
                {rev.description}
              </p>

              <div className="text-xs font-semibold text-[#EC3664] pt-1">
                Studio: {rev.plannerName} • {rev.weddingName}
              </div>

              {/* Planner Reply Container */}
              {rev.plannerReply && (
                <div className="bg-[#FFF9FA] border-l-4 border-[#EC3664] p-3.5 rounded-r-2xl text-xs text-gray-700 mt-3">
                  <span className="font-bold text-[#EC3664] block mb-0.5">Response from Studio:</span>
                  <p className="font-light italic">{rev.plannerReply}</p>
                </div>
              )}
            </div>

            {/* Right Photo & Actions */}
            <div className="flex md:flex-col justify-between items-end gap-4 shrink-0">
              {rev.image && (
                <img
                  src={rev.image}
                  alt="Review photo"
                  className="w-24 h-24 rounded-2xl object-cover border border-rose-100 shadow-2xs"
                />
              )}

              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleEditClick(rev)}
                  className="bg-rose-50 hover:bg-rose-100 text-[#EC3664] px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <FiEdit className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>
                <button
                  onClick={() => handleDeleteClick(rev.id)}
                  className="bg-red-50 hover:bg-red-100 text-red-600 px-3 py-1.5 rounded-full text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                >
                  <FiTrash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
