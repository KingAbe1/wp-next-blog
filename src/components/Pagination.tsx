'use client';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  className = ''
}: PaginationProps) {
  // Don't render if there's only one page or no pages
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages = [];
    
    // First page
    if (currentPage > 3) {
      pages.push(
        <button
          key={1}
          onClick={() => onPageChange(1)}
          className="flex items-center justify-center w-10 h-10 text-sm font-medium text-gray-600 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
        >
          1
        </button>
      );
      
      if (currentPage > 4) {
        pages.push(
          <span key="ellipsis1" className="flex items-center justify-center w-10 h-10 text-gray-400">
            ...
          </span>
        );
      }
    }

    // Pages around current page
    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(totalPages, currentPage + 2);
    
    for (let page = startPage; page <= endPage; page++) {
      pages.push(
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex items-center justify-center w-10 h-10 text-sm font-medium rounded-xl transition-all duration-200 ${
            page === currentPage
              ? 'bg-blue-600 text-white shadow-lg shadow-blue-200'
              : 'text-gray-600 bg-gray-50 hover:bg-blue-50 hover:text-blue-600'
          }`}
        >
          {page}
        </button>
      );
    }

    // Last page
    if (currentPage < totalPages - 2) {
      if (currentPage < totalPages - 3) {
        pages.push(
          <span key="ellipsis2" className="flex items-center justify-center w-10 h-10 text-gray-400">
            ...
          </span>
        );
      }
      
      pages.push(
        <button
          key={totalPages}
          onClick={() => onPageChange(totalPages)}
          className="flex items-center justify-center w-10 h-10 text-sm font-medium text-gray-600 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-200"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  return (
    <div className={`flex flex-col items-center space-y-3 ${className}`}>
      {/* Pagination Controls */}
      <div className="flex items-center space-x-1">
        {/* Previous Button */}
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex items-center justify-center w-10 h-10 text-gray-600 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 group"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Page Numbers */}
        <div className="flex items-center space-x-1 mx-2">
          {renderPageNumbers()}
        </div>

        {/* Next Button */}
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className="flex items-center justify-center w-10 h-10 text-gray-600 bg-gray-50 rounded-xl hover:bg-blue-50 hover:text-blue-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 group"
        >
          <svg className="w-5 h-5 group-hover:translate-x-0.5 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Page Info - Centered Below */}
      <div className="text-center">
        <p className="text-sm text-gray-500">
          Page {currentPage} of {totalPages}
          {totalItems && (
            <span className="block text-xs text-gray-400 mt-0.5">
              {totalItems} total items
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
