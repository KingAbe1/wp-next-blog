'use client';

import { useState } from 'react';
import { WordPressPost } from '@/types/wordpress';
import PostCard from './PostCard';
import SearchBar from './SearchBar';
import ItemsPerPageSelector from './ItemsPerPageSelector';
import Pagination from './Pagination';

interface HomeContentProps {
  posts: WordPressPost[];
  totalPages: number;
  totalPosts: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (value: number) => void;
  isLoading: boolean;
}

export default function HomeContent({ 
  posts, 
  totalPages, 
  totalPosts, 
  currentPage, 
  itemsPerPage, 
  onPageChange, 
  onItemsPerPageChange,
  isLoading 
}: HomeContentProps) {
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchToggle = (searching: boolean) => {
    setIsSearching(searching);
  };

  return (
    <>
      {/* Search Bar */}
      <SearchBar onSearchToggle={handleSearchToggle} />

      {/* Posts Content - Hidden when searching */}
      {!isSearching && (
        <>
          {/* Posts Header with Items Per Page */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">
              Latest Posts
            </h2>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                {totalPosts} post{totalPosts !== 1 ? 's' : ''} found
              </span>
              <ItemsPerPageSelector
                value={itemsPerPage}
                onChange={onItemsPerPageChange}
              />
            </div>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {[...Array(itemsPerPage)].map((_, i) => (
                <div key={i} className="bg-white rounded-3xl shadow-lg p-6 animate-pulse">
                  <div className="h-48 bg-gray-200 rounded-2xl mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-8">
                <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Content Available</h3>
              <p className="text-lg text-gray-600 max-w-md mx-auto">
                There are no blog posts available at the moment. Check back soon for new content.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {posts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>
              
              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={onPageChange}
                totalItems={totalPosts}
                className="mt-12"
              />
            </>
          )}
        </>
      )}
    </>
  );
}
