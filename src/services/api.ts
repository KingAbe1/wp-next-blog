// Base API configuration
const WORDPRESS_API_URL = process.env.NEXT_PUBLIC_BASE_URL;

if (!WORDPRESS_API_URL) {
  throw new Error('WordPress API URL is not configured. Please set NEXT_PUBLIC_BASE_URL in your environment variables.');
}

// Base fetch function with error handling
async function apiRequest<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const url = `${WORDPRESS_API_URL}${endpoint}`;
  
  const response = await fetch(url, {
    headers: {
      'Accept': 'application/json',
      ...options.headers,
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status} ${response.statusText}`);
  }

  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    throw new Error('API returned non-JSON response. Please check your WORDPRESS_API_URL.');
  }

  return response.json();
}

export { apiRequest };
