// WordPress API configuration and utilities
import { WordPressPost, WordPressCategory } from '@/types/wordpress';

const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_BASE_URL

// Fetch posts from WordPress API
export async function fetchPosts(params: {
  per_page?: number;
  page?: number;
  categories?: number;
  search?: string;
  _embed?: boolean;
} = {}): Promise<WordPressPost[]> {
  if (!WORDPRESS_API_URL) {
    throw new Error('WordPress API URL is not configured. Please set NEXT_PUBLIC_BASE_URL or WORDPRESS_API_URL in your environment variables.');
  }

  const searchParams = new URLSearchParams();
  
  searchParams.set('per_page', (params.per_page || 10).toString());
  searchParams.set('page', (params.page || 1).toString());
  searchParams.set('_embed', 'true');
  
  if (params.categories) {
    searchParams.set('categories', params.categories.toString());
  }
  
  if (params.search) {
    searchParams.set('search', params.search);
  }

  try {
    const response = await fetch(`${WORDPRESS_API_URL}/article?${searchParams}`, {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('WordPress API returned non-JSON response. Please check your WORDPRESS_API_URL.');
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`WordPress API error: ${error.message}`);
    }
    throw new Error('Unknown error occurred while fetching posts');
  }
}

// Fetch a single post by slug
export async function fetchPostBySlug(slug: string): Promise<WordPressPost> {
  if (!WORDPRESS_API_URL) {
    throw new Error('WordPress API URL is not configured. Please set NEXT_PUBLIC_BASE_URL or WORDPRESS_API_URL in your environment variables.');
  }

  try {
    const response = await fetch(`${WORDPRESS_API_URL}/article?slug=${slug}&_embed=true`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch post: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('WordPress API returned non-JSON response. Please check your WORDPRESS_API_URL.');
    }

    const posts = await response.json();
    
    if (posts.length === 0) {
      throw new Error('Post not found');
    }

    return posts[0];
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`WordPress API error: ${error.message}`);
    }
    throw new Error('Unknown error occurred while fetching post');
  }
}

// Fetch categories
export async function fetchCategories(): Promise<WordPressCategory[]> {
  if (!WORDPRESS_API_URL) {
    throw new Error('WordPress API URL is not configured. Please set NEXT_PUBLIC_BASE_URL or WORDPRESS_API_URL in your environment variables.');
  }

  try {
    const response = await fetch(`${WORDPRESS_API_URL}/categories?per_page=100`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText}`);
    }

    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      throw new Error('WordPress API returned non-JSON response. Please check your WORDPRESS_API_URL.');
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`WordPress API error: ${error.message}`);
    }
    throw new Error('Unknown error occurred while fetching categories');
  }
}

// Fetch posts by category
export async function fetchPostsByCategory(categoryId: number, page: number = 1): Promise<WordPressPost[]> {
  return fetchPosts({ categories: categoryId, page, _embed: true });
}

// Get featured image URL from post
export function getFeaturedImageUrl(post: WordPressPost): string | null {
  if (post._embedded?.['wp:featuredmedia']?.[0]?.source_url) {
    return post._embedded['wp:featuredmedia'][0].source_url;
  }
  return null;
}

// Get featured image alt text
export function getFeaturedImageAlt(post: WordPressPost): string {
  if (post._embedded?.['wp:featuredmedia']?.[0]?.alt_text) {
    return post._embedded['wp:featuredmedia'][0].alt_text;
  }
  return post.title.rendered;
}

// Get post categories
export function getPostCategories(post: WordPressPost): Array<{ id: number; name: string; slug: string }> {
  if (post._embedded?.['wp:term']?.[0]) {
    return post._embedded['wp:term'][0].map(term => ({
      id: term.id,
      name: term.name,
      slug: term.slug,
    }));
  }
  return [];
}

// Get post author
export function getPostAuthor(post: WordPressPost): { id: number; name: string; slug: string } | null {
  if (post._embedded?.author?.[0]) {
    return {
      id: post._embedded.author[0].id,
      name: post._embedded.author[0].name,
      slug: post._embedded.author[0].slug,
    };
  }
  return null;
}

// Format date
export function formatDate(dateString: string): string {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// Strip HTML tags from content
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, '').trim();
}
