// Posts-related types

export interface FetchPostsParams {
  per_page?: number;
  page?: number;
  categories?: number;
  search?: string;
  _embed?: boolean;
}
