'use client';

import { useState } from 'react';
import { useCategories, usePostsWithPagination } from '@/hooks';
import PostCard from '@/components/PostCard';
import SearchBar from '@/components/SearchBar';
import ItemsPerPageSelector from '@/components/ItemsPerPageSelector';
import Pagination from '@/components/Pagination';
import Link from 'next/link';

export default function CategoriesPage() {
  const [selectedCategories, setSelectedCategories] = useState<number[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);
  
  // Fetch categories
  const { data: categories = [], isLoading: categoriesLoading, error: categoriesError } = useCategories();
  
  // Fetch posts based on selected categories
  const { 
    data: postsData, 
    isLoading: postsLoading, 
    error: postsError 
  } = usePostsWithPagination({ 
    per_page: itemsPerPage,
    page: currentPage,
    categories: selectedCategories[0] 
  });

  const posts = postsData?.posts || [];
  const totalPages = postsData?.totalPages || 1;
  const totalPosts = postsData?.totalPosts || 0;

  const loading = categoriesLoading || postsLoading;
  const error = categoriesError || postsError;

  const handleSearchToggle = (searching: boolean) => {
    setIsSearching(searching);
  };

    const handleCategoryToggle = (categoryId: number) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
        setCurrentPage(1); // Reset to first page when filtering
    };

    const clearFilters = () => {
        setSelectedCategories([]);
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleItemsPerPageChange = (newItemsPerPage: number) => {
        setItemsPerPage(newItemsPerPage);
        setCurrentPage(1); // Reset to first page when changing items per page
    };

    if (loading && categories.length === 0) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Header Skeleton */}
                    <div className="mb-8 text-center">
                        <div className="h-12 w-80 bg-gray-200 rounded animate-pulse mx-auto mb-4"></div>
                        <div className="h-6 w-96 bg-gray-200 rounded animate-pulse mx-auto"></div>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Categories Sidebar Skeleton */}
                        <div className="lg:w-80 flex-shrink-0">
                            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="h-6 w-24 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                                </div>

                                <div className="space-y-3">
                                    {[...Array(8)].map((_, i) => (
                                        <div key={i} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50">
                                            <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center justify-between">
                                                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                                                    <div className="h-5 w-6 bg-gray-200 rounded-full animate-pulse"></div>
                                                </div>
                                                <div className="h-3 w-28 bg-gray-200 rounded animate-pulse mt-1"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Posts Grid Skeleton */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-6">
                                <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
                                <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="bg-white rounded-3xl shadow-lg p-6 animate-pulse">
                                        <div className="h-48 bg-gray-200 rounded-2xl mb-4"></div>
                                        <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                        <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                                        <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Error Loading Content</h1>
            <p className="text-gray-600 mb-8">{error instanceof Error ? error.message : 'An error occurred'}</p>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700"
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {/* Header */}
                <div className="mb-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                        Browse by Category
                    </h1>
                    <p className="text-xl text-gray-600">
                        Filter posts by selecting categories below
                    </p>
                </div>

                {/* Search Bar */}
                <div className="mb-8">
                    <SearchBar onSearchToggle={handleSearchToggle} />
                </div>

                {/* Content - Hidden when searching */}
                {!isSearching && (
                    <div className="flex flex-col lg:flex-row gap-8">
                        {/* Categories Sidebar */}
                        <div className="lg:w-80 flex-shrink-0">
                            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-xl font-bold text-gray-900">Categories</h2>
                                    {selectedCategories.length > 0 && (
                                        <button
                                            onClick={clearFilters}
                                            className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                                        >
                                            Clear all
                                        </button>
                                    )}
                                </div>

                                {categories.length > 0 ? (
                                    <div className="space-y-3">
                                        {categories.map((category) => (
                                            <label
                                                key={category.id}
                                                className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer group"
                                            >
                                                <input
                                                    type="checkbox"
                                                    checked={selectedCategories.includes(category.id)}
                                                    onChange={() => handleCategoryToggle(category.id)}
                                                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between">
                                                        <span className="text-sm font-medium text-gray-900 group-hover:text-blue-600">
                                                            {category.name}
                                                        </span>
                                                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                                                            {category.count}
                                                        </span>
                                                    </div>
                                                    {category.description && (
                                                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                                                            {category.description}
                                                        </p>
                                                    )}
                                                </div>
                                            </label>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                            <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                                            </svg>
                                        </div>
                                        <p className="text-sm text-gray-500">No categories available</p>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Posts Grid */}
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-2xl font-bold text-gray-900">
                                    {selectedCategories.length > 0 ? 'Filtered Posts' : 'All Posts'}
                                </h2>
                                <div className="flex items-center justify-between">
                                    {selectedCategories.length > 0 && (
                                        <span className="text-sm text-gray-500">
                                            {totalPosts} post{totalPosts !== 1 ? 's' : ''} found
                                        </span>
                                    )}
                                    
                                    {/* Items Per Page Selector */}
                                    <ItemsPerPageSelector
                                        value={itemsPerPage}
                                        onChange={handleItemsPerPageChange}
                                    />
                                </div>
                            </div>

                            {loading ? (
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="bg-white rounded-3xl shadow-lg p-6 animate-pulse">
                                            <div className="h-48 bg-gray-200 rounded-2xl mb-4"></div>
                                            <div className="h-4 bg-gray-200 rounded mb-2"></div>
                                            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
                                            <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                                        </div>
                                    ))}
                                </div>
                            ) : posts.length > 0 ? (
                                <>
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                        {posts.map((post) => (
                                            <PostCard key={post.id} post={post} />
                                        ))}
                                    </div>
                                    
                                    {/* Pagination */}
                                    <Pagination
                                        currentPage={currentPage}
                                        totalPages={totalPages}
                                        onPageChange={handlePageChange}
                                        totalItems={totalPosts}
                                        className="mt-12"
                                    />
                                </>
                            ) : (
                                <div className="text-center py-16">
                                    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-4">No Posts Found</h3>
                                    <p className="text-gray-600 max-w-md mx-auto mb-8">
                                        {selectedCategories.length > 0
                                            ? 'No posts found for the selected categories. Try selecting different categories or clear the filters.'
                                            : 'No posts are available at the moment.'
                                        }
                                    </p>
                                    {selectedCategories.length > 0 && (
                                        <button
                                            onClick={clearFilters}
                                            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700"
                                        >
                                            Clear Filters
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
