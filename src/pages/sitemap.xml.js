import { siteInfo } from '../data/siteInfo.js';

export async function GET() {
  // Use the base URL from our central data store
  const baseUrl = siteInfo.url;
  
  // Define the routes and their properties
  const routes = [
    {
      url: '/',
      lastmod: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      url: '/ueber-uns/',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: '/services/',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.9
    },
    {
      url: '/kontakt/',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'monthly',
      priority: 0.8
    },
    {
      url: '/impressum/',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'yearly',
      priority: 0.5
    },
    {
      url: '/datenschutz/',
      lastmod: new Date().toISOString().split('T')[0],
      changefreq: 'yearly',
      priority: 0.5
    }
  ];

  // Generate the sitemap XML content
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.url}</loc>
    <lastmod>${route.lastmod}</lastmod>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  // Return the sitemap
  return new Response(sitemap, {
    headers: {
      'Content-Type': 'application/xml'
    }
  });
} 