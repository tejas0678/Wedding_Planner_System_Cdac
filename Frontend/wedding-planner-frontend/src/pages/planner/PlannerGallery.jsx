import React, { useState, useEffect } from 'react';
import DashboardLayout from './DashboardLayout';
import { getPlannerPortfolio, createPortfolioItem, deletePortfolioItem } from '../../services/plannerService';
import { LoadingSpinner, EmptyState, ErrorAlert } from '../../components/common/StateFeedback';

export const PlannerGallery = () => {
  const [portfolioList, setPortfolioList] = useState([]);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPortfolio = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getPlannerPortfolio();
      setPortfolioList(data || []);
    } catch (err) {
      console.error("Error loading planner portfolio:", err);
      setError("Unable to load image gallery.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const addImage = async (e) => {
    e.preventDefault();
    if (!url) return;
    try {
      const created = await createPortfolioItem({
        title: title || "Portfolio Shot",
        imageUrl: url,
        category: "Decoration"
      });
      setPortfolioList((prev) => [created, ...prev]);
      setUrl('');
      setTitle('');
    } catch (err) {
      console.error("Error adding portfolio item:", err);
    }
  };

  const removeImage = async (id) => {
    try {
      await deletePortfolioItem(id);
      setPortfolioList((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Error deleting portfolio item:", err);
    }
  };

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Image Gallery</h1>
      
      <form onSubmit={addImage} className="flex flex-col sm:flex-row gap-3 mb-6 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
        <input 
          placeholder="Title (e.g. Mandap Setup)..." 
          value={title} 
          onChange={e => setTitle(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <input 
          placeholder="Paste image URL..." 
          value={url} 
          onChange={e => setUrl(e.target.value)}
          required
          className="flex-1 rounded-lg border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        <button type="submit" className="bg-pink-600 text-white px-6 py-2 rounded-lg font-semibold text-sm hover:bg-pink-700 transition flex items-center justify-center gap-2 cursor-pointer shrink-0">
          <span>➕</span> Add Image
        </button>
      </form>

      {loading && <LoadingSpinner text="Loading gallery photos..." />}

      {error && !loading && <ErrorAlert message={error} onRetry={fetchPortfolio} />}

      {!loading && !error && (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {portfolioList.map((item) => (
              <div key={item.id || item.image_id} className="relative group rounded-2xl overflow-hidden border border-gray-200 shadow-xs bg-gray-100">
                <img src={item.imageUrl || item.image_url} alt={item.title || "Gallery"} className="w-full h-48 object-cover group-hover:scale-105 transition duration-300" />
                <button 
                  onClick={() => removeImage(item.id || item.image_id)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition text-sm cursor-pointer shadow-md"
                >
                  🗑️
                </button>
                {item.title && (
                  <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-xs p-2 text-white text-xs font-semibold truncate">
                    {item.title}
                  </div>
                )}
              </div>
            ))}
          </div>

          {portfolioList.length === 0 && (
            <EmptyState title="No Portfolio Photos" message="Add image links to showcase your studio's wedding decor and events." />
          )}
        </>
      )}
    </DashboardLayout>
  );
};