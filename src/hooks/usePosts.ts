import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { fetchPosts, fetchPostBySlug, fetchPostsByCategory, FetchPostsParams } from '@/services/posts';

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
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Fetch single post hook
export function usePost(slug: string) {
  return useQuery({
    queryKey: postsKeys.detail(slug),
    queryFn: () => fetchPostBySlug(slug),
    enabled: !!slug,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Fetch posts by category hook
export function usePostsByCategory(categoryId: number, page: number = 1) {
  return useQuery({
    queryKey: [...postsKeys.byCategory(categoryId), page],
    queryFn: () => fetchPostsByCategory(categoryId, page),
    enabled: !!categoryId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}

// Infinite posts hook for pagination
export function useInfinitePosts(params: Omit<FetchPostsParams, 'page'> = {}) {
  return useInfiniteQuery({
    queryKey: [...postsKeys.lists(), 'infinite', params],
    queryFn: ({ pageParam = 1 }) => fetchPosts({ ...params, page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      // If last page has fewer items than per_page, we've reached the end
      const perPage = params.per_page || 10;
      return lastPage.length === perPage ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  });
}
