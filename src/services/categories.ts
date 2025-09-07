import { apiRequest } from './api';
import { WordPressCategory } from '@/types/wordpress';

// Fetch categories
export async function fetchCategories(): Promise<WordPressCategory[]> {
  return apiRequest<WordPressCategory[]>('/categories?per_page=100', {
    next: { revalidate: 3600 },
  });
}

// Fetch a single category by slug
export async function fetchCategoryBySlug(slug: string): Promise<WordPressCategory> {
  const categories = await apiRequest<WordPressCategory[]>(`/categories?slug=${slug}`, {
    next: { revalidate: 3600 },
  });
  
  if (categories.length === 0) {
    throw new Error('Category not found');
  }

  return categories[0];
}
