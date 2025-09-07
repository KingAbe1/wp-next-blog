import { useQuery } from '@tanstack/react-query';
import { fetchCategories, fetchCategoryBySlug } from '@/services/categories';

// Query keys
export const categoriesKeys = {
  all: ['categories'] as const,
  lists: () => [...categoriesKeys.all, 'list'] as const,
  details: () => [...categoriesKeys.all, 'detail'] as const,
  detail: (slug: string) => [...categoriesKeys.details(), slug] as const,
};

// Fetch categories hook
export function useCategories() {
  return useQuery({
    queryKey: categoriesKeys.lists(),
    queryFn: fetchCategories,
  });
}

// Fetch single category hook
export function useCategory(slug: string) {
  return useQuery({
    queryKey: categoriesKeys.detail(slug),
    queryFn: () => fetchCategoryBySlug(slug),
    enabled: !!slug,
  });
}
