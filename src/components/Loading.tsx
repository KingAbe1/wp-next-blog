export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Hero Section Skeleton */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-gray-200 rounded-full w-32 h-8 mx-auto mb-6"></div>
            <div className="h-16 bg-gray-200 rounded-2xl w-96 mx-auto mb-6"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-2/3 mx-auto"></div>
          </div>
        </div>

        {/* Posts Grid Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-xl border border-gray-100/60 overflow-hidden">
              {/* Image skeleton */}
              <div className="h-64 bg-gradient-to-br from-gray-200 to-gray-300"></div>
              
              <div className="p-8">
                {/* Categories skeleton */}
                <div className="flex gap-3 mb-6">
                  <div className="h-7 bg-gray-200 rounded-full w-20"></div>
                  <div className="h-7 bg-gray-200 rounded-full w-24"></div>
                </div>

                {/* Title skeleton */}
                <div className="space-y-3 mb-6">
                  <div className="h-7 bg-gray-200 rounded-lg"></div>
                  <div className="h-7 bg-gray-200 rounded-lg w-4/5"></div>
                </div>

                {/* Excerpt skeleton */}
                <div className="space-y-3 mb-8">
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>

                {/* Meta skeleton */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="h-5 bg-gray-200 rounded w-24"></div>
                    <div className="h-5 bg-gray-200 rounded w-28"></div>
                  </div>
                  <div className="h-5 bg-gray-200 rounded w-20"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
