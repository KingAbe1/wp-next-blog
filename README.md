# WordPress Next.js Blog

A modern, responsive blog website built with Next.js that consumes the WordPress REST API. Features client-side rendering with TanStack Query for optimal performance and user experience.

## Features

- 🏠 **Home Page** - Displays latest blog posts with search, pagination, and items per page
- 📄 **Post Detail Page** - Shows full article content with author, published date, and reading time
- 📂 **Categories Page** - Interactive category filtering with sidebar and pagination
- 🔍 **Search Functionality** - Real-time post search with instant results
- 📄 **Pagination** - Smart pagination with customizable items per page
- 🎨 **Premium UI** - Modern, clean design with glass morphism effects
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Fast Loading** - Optimized with TanStack Query caching
- 🎯 **TypeScript** - Full type safety throughout the application

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **TanStack Query** - Data fetching and caching
- **WordPress REST API** - Content management
- **Client-Side Rendering** - Interactive user experience

## Getting Started

### Prerequisites

- Node.js 18+ 
- A WordPress site with REST API enabled

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd wp-next-blog
```

2. Install dependencies:
```bash
npm install
```

3. Configure WordPress API:
   - Create a `.env.local` file in the root directory
   - Add your WordPress site URL:
```env
NEXT_PUBLIC_BASE_URL=https://your-wordpress-site.com/wp-json/wp/v2
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## WordPress Setup

Make sure your WordPress site has:

1. **REST API enabled** (default in WordPress 4.7+)
2. **Public posts** - The API will only return published posts
3. **Featured images** - For better visual presentation
4. **Categories** - For post organization

### Testing with WordPress.com

You can test with any public WordPress.com site:
```env
NEXT_PUBLIC_BASE_URL=https://yourblog.wordpress.com/wp-json/wp/v2
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Home page with pagination
│   ├── post/[slug]/       # Dynamic post pages
│   ├── categories/        # Categories page with filtering
│   ├── loading.tsx        # Loading skeletons
│   └── layout.tsx         # Root layout with QueryProvider
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── PostCard.tsx       # Post preview card
│   ├── SearchBar.tsx      # Search functionality
│   ├── Pagination.tsx     # Pagination controls
│   ├── ItemsPerPageSelector.tsx # Items per page selector
│   └── HomeContent.tsx    # Home page content
├── services/              # API services
│   ├── api.ts            # Base API configuration
│   ├── posts.ts          # Posts API with pagination
│   └── categories.ts     # Categories API
├── hooks/                 # Custom React hooks
│   ├── usePosts.ts       # Posts data fetching
│   └── useCategories.ts  # Categories data fetching
├── types/                 # TypeScript type definitions
│   ├── wordpress.ts      # WordPress data types
│   ├── posts.ts          # Posts API types
│   ├── categories.ts     # Categories types
│   ├── author.ts         # Author types
│   └── media.ts          # Media types
└── providers/
    └── QueryProvider.tsx # TanStack Query provider
```

## API Integration

The app uses the WordPress REST API v2 with TanStack Query for:

- **Posts** - Latest blog posts with pagination and search
- **Categories** - For navigation and filtering
- **Authors** - Post author information
- **Featured Images** - Post thumbnails and hero images
- **Search** - Real-time post search functionality

### Data Management

- **TanStack Query** - Client-side data fetching and caching
- **Automatic Refetching** - Data updates when parameters change
- **Loading States** - Skeleton loading for better UX
- **Error Handling** - Graceful error states and retry logic

## Customization

### Styling

The app uses Tailwind CSS with custom components. Key files:
- `src/app/globals.css` - Global styles and prose typography
- `tailwind.config.js` - Tailwind configuration

### Content

Modify the API integration in the `src/services/` directory:
- `posts.ts` - Posts API with pagination and search
- `categories.ts` - Categories API
- `api.ts` - Base API configuration

### UI Components

Customize the design in the `src/components/` directory:
- `Pagination.tsx` - Pagination controls
- `SearchBar.tsx` - Search functionality
- `PostCard.tsx` - Post preview cards
- `Header.tsx` & `Footer.tsx` - Navigation

---

Built with ❤️ using Next.js, TanStack Query, and WordPress
