import { fetchPosts } from "@/services/posts";
import { WordPressPost } from "@/types/wordpress";
import PostCard from "@/components/PostCard";

export default async function Home() {
  let posts: WordPressPost[] = [];
  let error: string | null = null;

  try {
    posts = await fetchPosts({ per_page: 12, _embed: true });
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch posts';
    console.error('Error fetching posts:', err);
  }

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

        {posts.length === 0 ? (
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
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
