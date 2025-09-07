export default function LoadingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20">
        {/* Hero Section Skeleton */}
        <div className="text-center mb-20">
          <div className="mb-8">
            <div className="inline-flex items-center px-4 py-2 bg-gray-200 rounded-full w-32 h-8 animate-pulse mx-auto mb-6"></div>
            <div className="h-16 w-96 bg-gray-200 rounded animate-pulse mx-auto mb-6"></div>
            <div className="h-6 w-full max-w-3xl bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
        </div>

        {/* Search Bar Skeleton */}
        <div className="w-full max-w-4xl mx-auto mb-12">
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/20 p-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                <div className="w-6 h-6 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
              <div className="w-full pl-16 pr-24 py-5">
                <div className="h-6 w-full bg-gray-200 rounded animate-pulse"></div>
              </div>
              <div className="absolute right-2 top-2 bottom-2 w-20 bg-gray-200 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Posts Grid Skeleton */}
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
      </div>
    </div>
  );
}
