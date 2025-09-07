# WordPress Next.js Blog

A modern, responsive blog website built with Next.js that consumes the WordPress REST API. Features server-side rendering (SSR) for optimal SEO performance.

## Features

- 🏠 **Home Page** - Displays latest blog posts with title, image, and excerpt
- 📄 **Post Detail Page** - Shows full article content with author and published date
- 📂 **Category Page** - Filter posts by category with pagination
- 🚀 **Server-Side Rendering (SSR)** - Optimized for SEO and performance
- 📱 **Responsive Design** - Works perfectly on all devices
- ⚡ **Fast Loading** - Optimized images and caching
- 🎨 **Modern UI** - Clean, professional design with Tailwind CSS

## Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **WordPress REST API** - Content management
- **Server-Side Rendering** - SEO optimization

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
   - Copy `env.example` to `.env.local`
   - Update the WordPress API URL:
   ```bash
   cp env.example .env.local
   ```

4. Edit `.env.local` and add your WordPress site URL:
```env
NEXT_PUBLIC_BASE_URL=https://your-wordpress-site.com/wp-json/wp/v2
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

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
│   ├── page.tsx           # Home page
│   ├── post/[slug]/       # Dynamic post pages
│   ├── category/[slug]/   # Dynamic category pages
│   └── layout.tsx         # Root layout
├── components/            # Reusable components
│   ├── Header.tsx         # Navigation header
│   ├── Footer.tsx         # Site footer
│   ├── PostCard.tsx       # Post preview card
│   └── Loading.tsx        # Loading skeleton
└── lib/
    └── wordpress.ts       # WordPress API utilities
```

## API Integration

The app uses the WordPress REST API v2 to fetch:

- **Posts** - Latest blog posts with embedded data
- **Categories** - For navigation and filtering
- **Authors** - Post author information
- **Featured Images** - Post thumbnails and hero images

### Caching

- Posts are cached for 1 hour (`revalidate: 3600`)
- Categories are cached for 1 hour
- Static pages are pre-generated at build time

## Customization

### Styling

The app uses Tailwind CSS with custom components. Key files:
- `src/app/globals.css` - Global styles and prose typography
- `tailwind.config.js` - Tailwind configuration

### Content

Modify the WordPress API integration in `src/lib/wordpress.ts`:
- Change API endpoints
- Add custom fields
- Modify data transformation

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_BASE_URL` | Your WordPress REST API URL (recommended) | Yes* |
| `WORDPRESS_API_URL` | Alternative WordPress REST API URL | Yes* |

*Either `NEXT_PUBLIC_BASE_URL` or `WORDPRESS_API_URL` is required

## Performance

- **Lighthouse Score**: 90+ on all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: Next.js automatic image optimization
- **Caching**: Strategic caching for API responses

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details.

## Support

For issues and questions:
1. Check the [Issues](https://github.com/your-repo/issues) page
2. Create a new issue with detailed information
3. Include your WordPress site URL (if public) for debugging

---

Built with ❤️ using Next.js and WordPress
