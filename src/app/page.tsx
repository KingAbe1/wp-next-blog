'use client';

import { useState } from 'react';
import { usePostsWithPagination } from '@/hooks';
import HomeContent from "@/components/HomeContent";

export default function Home() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(12);

  const { 
    data: postsData, 
    isLoading, 
    error 
  } = usePostsWithPagination({ 
    per_page: itemsPerPage,
    page: currentPage,
    _embed: true 
  });

  const posts = postsData?.posts || [];
  const totalPages = postsData?.totalPages || 1;
  const totalPosts = postsData?.totalPosts || 0;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleItemsPerPageChange = (newItemsPerPage: number) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30 flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            {/* Premium Error Header */}
            <div className="mb-12">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 19.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">Something Went Wrong</h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We&apos;re having trouble loading the latest posts. Please try refreshing the page or check back later.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 rounded-full text-sm font-semibold text-blue-700 mb-6">
              <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Latest Posts
            </div>
            <h1 className="text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Blog Posts
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover amazing content and stay updated with the latest posts from our blog.
              Explore insights, tutorials, and articles that matter to you.
            </p>
          </div>
        </div>

        {/* Posts Content with Search */}
        <HomeContent 
          posts={posts} 
          totalPages={totalPages}
          totalPosts={totalPosts}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={handlePageChange}
          onItemsPerPageChange={handleItemsPerPageChange}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
