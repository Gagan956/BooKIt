"use client";

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ExperienceCard from '@/components/ExperienceCard';
import { fetchExperiences } from '@/store/slices/experiencesSlice';
import type { RootState, AppDispatch } from '@/store/store';
import Navbar from '@/components/Navbar';

export default function HomePage() {
  const dispatch = useDispatch<AppDispatch>();
  const { items, filteredItems, loading, error, initialized, searchQuery } = useSelector((s: RootState) => s.experiences);
  const [mounted, setMounted] = useState(false);

  // ✅ Use items if no search, filteredItems if searching
  const displayItems = searchQuery ? filteredItems : items;

  useEffect(() => {
    setMounted(true);
    
    // ✅ Only fetch if not initialized or items are empty
    if (!initialized || items.length === 0) {
      dispatch(fetchExperiences());
    }
  }, [dispatch, initialized, items.length]);

  // ✅ Show loading state only on initial load
  if (!mounted || (loading && !initialized)) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
                <div className="h-52 w-full bg-gray-300"></div>
                <div className="p-4">
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-3 bg-gray-300 rounded mb-4"></div>
                  <div className="flex justify-between">
                    <div className="h-4 bg-gray-300 rounded w-20"></div>
                    <div className="h-8 bg-gray-300 rounded w-24"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    );
  }

  // ✅ Show error state if any
  if (error && items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Navbar />
        <main className="max-w-7xl mx-auto px-6 py-10">
          <div className="text-center py-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Failed to load experiences</h2>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={() => dispatch(fetchExperiences())}
              className="bg-[#FFD740] hover:bg-[#FBC02D] text-black px-4 py-2 rounded-md font-medium"
            >
              Try Again
            </button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10">
        {/* Show search results info */}
        {/* {searchQuery && (
          <div className="mb-6">
            <p className="text-gray-600">
              {filteredItems.length > 0 
                ? `Found ${filteredItems.length} experience${filteredItems.length > 1 ? 's' : ''} for "${searchQuery}"`
                : `No experiences found for "${searchQuery}"`
              }
            </p>
          </div>
        )} */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayItems.length > 0 ? (
            displayItems.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp} />
            ))
          ) : (
            // ✅ Show empty state only when truly empty (not loading)
            !loading && (
              <div className="col-span-full text-center py-10">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No experiences found</h3>
                <p className="text-gray-600">Try adjusting your search or check back later.</p>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  );
}