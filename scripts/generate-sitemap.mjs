import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import 'dotenv/config';

// --- Configuration ---
const SITE_URL = 'https://libracredito.com.br';
const PUBLIC_DIR = path.resolve(process.cwd(), 'public');
const SITEMAP_PATH = path.join(PUBLIC_DIR, 'sitemap.xml');

// Supabase credentials from environment variables
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseAnonKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Supabase URL or Anon Key is missing. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in your .env file.'
  );
  process.exit(1);
}

// --- Main Function ---
async function generateSitemap() {
  console.log('🚀 Starting sitemap generation...');

  try {
    const supabase = createClient(supabaseUrl, supabaseAnonKey);

    // 1. Fetch dynamic routes (blog posts)
    console.log('Fetching blog posts from Supabase...');
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, updated_at')
      .eq('published', true);

    if (error) {
      throw new Error(`Supabase error: ${error.message}`);
    }
    console.log(`✅ Found ${posts.length} published blog posts.`);

    // 2. Define static routes
    const staticPages = [
      { url: '/', changefreq: 'daily', priority: '1.0' },
      { url: '/vantagens', changefreq: 'monthly', priority: '0.8' },
      { url: '/quem-somos', changefreq: 'monthly', priority: '0.7' },
      { url: '/blog', changefreq: 'weekly', priority: '0.9' },
      { url: '/parceiros', changefreq: 'monthly', priority: '0.7' },
      { url: '/simulacao', changefreq: 'weekly', priority: '0.9' },
      { url: '/politica-privacidade', changefreq: 'yearly', priority: '0.3' },
      { url: '/politica-cookies', changefreq: 'yearly', priority: '0.3' },
    ];
    console.log(`✅ Defined ${staticPages.length} static pages.`);

    // 3. Generate XML content
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `<url>
    <loc>${SITE_URL}${page.url}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join('')}
  ${posts
    .map(
      (post) => `<url>
    <loc>${SITE_URL}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at || Date.now()).toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`
    )
    .join('')}
</urlset>`;

    // 4. Write the file
    fs.writeFileSync(SITEMAP_PATH, sitemapXml);
    console.log(`✅ Sitemap successfully generated at ${SITEMAP_PATH}`);
  } catch (err) {
    console.error('❌ Error generating sitemap:', err);
    process.exit(1);
  }
}

generateSitemap();
