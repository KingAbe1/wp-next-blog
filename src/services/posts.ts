import { apiRequest } from './api';
import { WordPressPost } from '@/types/wordpress';
import { MediaData } from '@/types/media';
import { AuthorData } from '@/types/author';
import { CategoryData } from '@/types/category';
import { FetchPostsParams } from '@/types/posts';

// Fetch posts from WordPress API
export async function fetchPosts(params: FetchPostsParams = {}): Promise<WordPressPost[]> {
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

  const posts = await apiRequest<WordPressPost[]>(`/article?${searchParams}`);
  
  // Enrich posts with embedded data
  return enrichPostsWithEmbeddedData(posts);
}

// Fetch a single post by slug
export async function fetchPostBySlug(slug: string): Promise<WordPressPost> {
  const posts = await apiRequest<WordPressPost[]>(`/article?slug=${slug}&_embed=true`);
  
  if (posts.length === 0) {
    throw new Error('Post not found');
  }

  // Enrich post with embedded data
  const enrichedPosts = await enrichPostsWithEmbeddedData([posts[0]]);
  return enrichedPosts[0];
}

// Fetch posts by category
export async function fetchPostsByCategory(categoryId: number, page: number = 1): Promise<WordPressPost[]> {
  return fetchPosts({ categories: categoryId, page, _embed: true });
}

// Helper function to enrich posts with embedded data
async function enrichPostsWithEmbeddedData(posts: WordPressPost[]): Promise<WordPressPost[]> {
  const enrichedPosts = await Promise.all(
    posts.map(async (post) => {
      const embeddedData: {
        'wp:featuredmedia'?: Array<{ id: number; source_url: string; alt_text: string }>;
        author?: Array<{ id: number; name: string; slug: string }>;
        'wp:term'?: Array<Array<{ id: number; name: string; slug: string; taxonomy: string }>>;
      } = {};
      
      // Fetch featured media
      if (post.featured_media) {
        try {
          const mediaData = await apiRequest<MediaData>(`/media/${post.featured_media}`);
          embeddedData['wp:featuredmedia'] = [{
            id: mediaData.id,
            source_url: mediaData.source_url,
            alt_text: mediaData.alt_text || post.title.rendered
          }];
        } catch (error) {
          console.warn('Failed to fetch featured media:', error);
        }
      }
      
      // Fetch author data
      try {
        const authorData = await apiRequest<AuthorData>(`/users/${post.author}`);
        embeddedData.author = [{
          id: authorData.id,
          name: authorData.name,
          slug: authorData.slug
        }];
      } catch (error) {
        console.warn('Failed to fetch author:', error);
      }
      
      // Fetch categories
      if (post.categories && post.categories.length > 0) {
        try {
          const categoriesData = await apiRequest<CategoryData[]>(`/categories?post=${post.id}`);
          embeddedData['wp:term'] = [categoriesData.map((cat: CategoryData) => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            taxonomy: 'category'
          }))];
        } catch (error) {
          console.warn('Failed to fetch categories:', error);
        }
      }
      
      return {
        ...post,
        _embedded: embeddedData
      };
    })
  );
  
  return enrichedPosts;
}
