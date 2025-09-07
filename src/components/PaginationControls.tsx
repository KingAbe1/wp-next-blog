'use client';

import ItemsPerPageSelector from './ItemsPerPageSelector';
import Pagination from './Pagination';

interface PaginationControlsProps {
  // Pagination props
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  totalItems?: number;
  
  // Items per page props
  itemsPerPage: number;
  onItemsPerPageChange: (value: number) => void;
  itemsPerPageOptions?: number[];
  
  // Layout props
  showItemsPerPage?: boolean;
  showPagination?: boolean;
  className?: string;
  itemsPerPageClassName?: string;
  paginationClassName?: string;
}

export default function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  totalItems,
  itemsPerPage,
  onItemsPerPageChange,
  itemsPerPageOptions = [6, 12, 24, 48],
  showItemsPerPage = true,
  showPagination = true,
  className = '',
  itemsPerPageClassName = '',
  paginationClassName = ''
}: PaginationControlsProps) {
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Items Per Page Selector */}
      {showItemsPerPage && (
        <div className="flex justify-end">
          <ItemsPerPageSelector
            value={itemsPerPage}
            onChange={onItemsPerPageChange}
            options={itemsPerPageOptions}
            className={itemsPerPageClassName}
          />
        </div>
      )}
      
      {/* Pagination */}
      {showPagination && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          totalItems={totalItems}
          className={paginationClassName}
        />
      )}
    </div>
  );
}
