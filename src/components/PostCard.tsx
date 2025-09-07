import Link from 'next/link';
import Image from 'next/image';
import { WordPressPost } from '@/types/wordpress';
import { getFeaturedImageUrl, getFeaturedImageAlt, getPostCategories, getPostAuthor, formatDate, stripHtml } from '@/lib/wordpress';

interface PostCardProps {
  post: WordPressPost;
}

export default function PostCard({ post }: PostCardProps) {
  const featuredImageUrl = getFeaturedImageUrl(post);
  const featuredImageAlt = getFeaturedImageAlt(post);
  const categories = getPostCategories(post);
  const author = getPostAuthor(post);
  const excerpt = post.excerpt?.rendered ? stripHtml(post.excerpt.rendered) : '';

  return (
    <article className="group bg-white rounded-3xl shadow-lg border border-gray-100/50 overflow-hidden hover:shadow-2xl hover:border-gray-200/50">
      {featuredImageUrl && (
        <div className="relative h-56 w-full overflow-hidden">
          <Image
            src={featuredImageUrl}
            alt={featuredImageAlt}
            fill
            className="object-cover group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          
          {/* Categories overlay */}
          <div className="absolute top-4 left-4 flex flex-wrap gap-2">
            {categories.slice(0, 2).map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="px-3 py-1 bg-white/90 backdrop-blur-sm text-gray-800 text-xs font-semibold rounded-full"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}
      
      <div className="p-6">
        {/* Author and Date */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {author && (
              <>
                <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                  <span className="text-gray-600 text-sm font-bold">
                    {author.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{author.name}</p>
                  <p className="text-xs text-gray-500">{formatDate(post.date)}</p>
                </div>
              </>
            )}
          </div>
          
          <div className="flex items-center text-gray-400">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="ml-1 text-xs font-medium">5 min read</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 leading-tight group-hover:text-blue-600">
          <Link href={`/post/${post.slug}`}>
            {stripHtml(post.title.rendered)}
          </Link>
        </h2>

        {/* Excerpt */}
        {excerpt && (
          <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
            {excerpt}
          </p>
        )}

        {/* Read More Link */}
        <div className="flex items-center justify-between">
          <Link
            href={`/post/${post.slug}`}
            className="inline-flex items-center text-blue-600 font-semibold text-sm group-hover:text-blue-700"
          >
            Read article
            <svg className="w-4 h-4 ml-1 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  );
}
