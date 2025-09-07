export default function CategoriesLoading() {
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
