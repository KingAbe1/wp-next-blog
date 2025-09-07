import { useQuery } from '@tanstack/react-query';
import { fetchPosts, fetchPostBySlug, fetchPostsByCategory } from '@/services/posts';
import { FetchPostsParams } from '@/types/posts';

// Query keys
export const postsKeys = {
  all: ['posts'] as const,
  lists: () => [...postsKeys.all, 'list'] as const,
  list: (params: FetchPostsParams) => [...postsKeys.lists(), params] as const,
  details: () => [...postsKeys.all, 'detail'] as const,
  detail: (slug: string) => [...postsKeys.details(), slug] as const,
  byCategory: (categoryId: number) => [...postsKeys.all, 'category', categoryId] as const,
};

// Fetch posts hook
export function usePosts(params: FetchPostsParams = {}) {
  return useQuery({
    queryKey: postsKeys.list(params),
    queryFn: () => fetchPosts(params),
  });
}

// Fetch single post hook
export function usePost(slug: string) {
  return useQuery({
    queryKey: postsKeys.detail(slug),
    queryFn: () => fetchPostBySlug(slug),
    enabled: !!slug,
  });
}

// Fetch posts by category hook
export function usePostsByCategory(categoryId: number, page: number = 1) {
  return useQuery({
    queryKey: [...postsKeys.byCategory(categoryId), page],
    queryFn: () => fetchPostsByCategory(categoryId, page),
    enabled: !!categoryId,
  });
}

