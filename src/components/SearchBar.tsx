'use client';

import { useState, useEffect } from 'react';
import { usePosts } from '@/hooks';
import PostCard from './PostCard';

interface SearchBarProps {
  onSearchToggle?: (isSearching: boolean) => void;
}

export default function SearchBar({ onSearchToggle }: SearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');

  const { data: searchResults = [], isLoading, error } = usePosts({
    search: searchTerm,
    per_page: 12
  });

  // Notify parent component when search state changes
  useEffect(() => {
    onSearchToggle?.(isSearching);
  }, [isSearching, onSearchToggle]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSearchTerm(searchQuery.trim());
      setIsSearching(true);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchTerm('');
    setIsSearching(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto mb-12">
      {/* Search Form */}
      <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-2">
        <form onSubmit={handleSearch} className="relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
              <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <svg className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for amazing content..."
              className="w-full pl-16 pr-20 py-5 text-lg bg-transparent border-0 focus:outline-none placeholder-gray-500 text-gray-900"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute inset-y-0 right-20 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <div className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center">
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </button>
            )}
          </div>
          <button
            type="submit"
            className="absolute right-2 top-2 bottom-2 px-8 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl hover:from-blue-700 hover:to-blue-800 font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105"
          >
            Search
          </button>
        </form>
      </div>

      {/* Search Results */}
      {isSearching && (
        <div className="mt-8 animate-in slide-in-from-top-4 duration-300">
          {/* Search Header */}
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Search Results
                    {searchTerm && (
                      <span className="text-lg font-normal text-gray-600 ml-2">
                        for &quot;{searchTerm}&quot;
                      </span>
                    )}
                  </h2>
                  <p className="text-sm text-gray-500">Found {searchResults.length} result{searchResults.length !== 1 ? 's' : ''}</p>
                </div>
              </div>
              <button
                onClick={clearSearch}
                className="px-4 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium bg-blue-50 hover:bg-blue-100 rounded-xl transition-colors duration-200"
              >
                Clear search
              </button>
            </div>
          </div>

          {/* Search Content - Full Width */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl shadow-lg p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Search Error</h3>
              <p className="text-gray-600">Failed to search posts. Please try again.</p>
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No Results Found</h3>
              <p className="text-gray-600">
                No posts found for &quot;{searchTerm}&quot;. Try different keywords.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-8">
              {searchResults.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
