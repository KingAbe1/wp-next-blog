export default function PostLoading() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb Skeleton */}
      <div className="mb-8">
        <div className="flex items-center space-x-2">
          <div className="h-4 w-12 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-1 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Featured Image Skeleton */}
      <div className="relative h-64 md:h-96 w-full mb-8 rounded-2xl bg-gray-200 animate-pulse"></div>

      {/* Post Header Skeleton */}
      <div className="mb-8">
        {/* Categories Skeleton */}
        <div className="flex gap-2 mb-6">
          <div className="h-6 w-16 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-6 w-20 bg-gray-200 rounded-full animate-pulse"></div>
        </div>

        {/* Title Skeleton */}
        <div className="mb-6">
          <div className="h-12 w-full bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-12 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Meta Info Skeleton */}
        <div className="flex flex-wrap items-center gap-6">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
            <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="space-y-4">
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
        <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
      </div>

      {/* Footer Skeleton */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
            <div className="flex space-x-2">
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
