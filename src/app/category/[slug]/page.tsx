import { notFound } from 'next/navigation';
import Link from 'next/link';
import { fetchCategories, fetchPostsByCategory, getPostCategories } from '@/lib/wordpress';
import PostCard from '@/components/PostCard';
import { Metadata } from 'next';

interface CategoryPageProps {
  params: {
    slug: string;
  };
  searchParams: {
    page?: string;
  };
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  try {
    const categories = await fetchCategories();
    const category = categories.find(cat => cat.slug === params.slug);
    
    if (!category) {
      return {
        title: 'Category Not Found',
        description: 'The requested category could not be found.',
      };
    }

    return {
      title: `${category.name} - Blog Posts`,
      description: category.description || `Browse all posts in the ${category.name} category.`,
      openGraph: {
        title: `${category.name} - Blog Posts`,
        description: category.description || `Browse all posts in the ${category.name} category.`,
        type: 'website',
      },
    };
  } catch (error) {
    return {
      title: 'Category Not Found',
      description: 'The requested category could not be found.',
    };
  }
}

export async function generateStaticParams() {
  try {
    const categories = await fetchCategories();
    return categories.map((category) => ({
      slug: category.slug,
    }));
  } catch (error) {
    console.error('Error generating static params for categories:', error);
    return [];
  }
}

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const currentPage = parseInt(searchParams.page || '1', 10);
  const postsPerPage = 12;

  let category;
  let posts = [];
  let totalPages = 0;
  let error = null;

  try {
    // Fetch all categories to find the current one
    const categories = await fetchCategories();
    category = categories.find(cat => cat.slug === params.slug);
    
    if (!category) {
      notFound();
    }

    // Fetch posts for this category
    const postsData = await fetchPostsByCategory(category.id, currentPage);
    posts = postsData;
    
    // Calculate total pages (WordPress API doesn't provide total count easily)
    // For now, we'll assume there are more pages if we get the full page size
    totalPages = posts.length === postsPerPage ? currentPage + 1 : currentPage;
  } catch (err) {
    error = err instanceof Error ? err.message : 'Failed to fetch category data';
    console.error('Error fetching category data:', err);
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Category Error</h1>
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-red-800">
              Unable to load category posts. Please try again later.
            </p>
            <p className="text-red-600 text-sm mt-2">
              Error: {error}
            </p>
          </div>
          <Link
            href="/"
            className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Breadcrumb */}
      <nav className="mb-8">
        <ol className="flex items-center space-x-2 text-sm text-gray-500">
          <li>
            <Link href="/" className="hover:text-blue-600 transition-colors">
              Home
            </Link>
          </li>
          <li>/</li>
          <li className="text-gray-900 font-medium">
            {category.name}
          </li>
        </ol>
      </nav>

      {/* Category Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {category.name}
        </h1>
        {category.description && (
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {category.description}
          </p>
        )}
        <div className="mt-4 text-sm text-gray-500">
          {category.count} {category.count === 1 ? 'post' : 'posts'} in this category
        </div>
      </div>

      {/* Posts Grid */}
      {posts.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-500 mb-4">
            There are no posts in the {category.name} category yet.
          </p>
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to all posts
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <nav className="flex items-center space-x-2">
                {currentPage > 1 && (
                  <Link
                    href={`/category/${params.slug}?page=${currentPage - 1}`}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Previous
                  </Link>
                )}
                
                <span className="px-3 py-2 text-sm font-medium text-gray-700 bg-blue-50 border border-blue-300 rounded-md">
                  Page {currentPage}
                </span>
                
                {currentPage < totalPages && (
                  <Link
                    href={`/category/${params.slug}?page=${currentPage + 1}`}
                    className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                  >
                    Next
                  </Link>
                )}
              </nav>
            </div>
          )}
        </>
      )}
    </div>
  );
}
