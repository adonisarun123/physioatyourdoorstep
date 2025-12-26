import { Request, Response } from "express";
import { getDb } from "./db";
import { blogs, categories, locations, services } from "../drizzle/schema";

/**
 * Sitemap Generator
 * 
 * Generates a dynamic XML sitemap including all static pages,
 * services, locations, and blog posts for search engine indexing.
 */

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const BASE_URL = 'https://physioatyourdoorstep.com';

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function generateUrlEntry(url: SitemapUrl): string {
  let entry = `  <url>\n`;
  entry += `    <loc>${url.loc}</loc>\n`;
  if (url.lastmod) {
    entry += `    <lastmod>${url.lastmod}</lastmod>\n`;
  }
  if (url.changefreq) {
    entry += `    <changefreq>${url.changefreq}</changefreq>\n`;
  }
  if (url.priority !== undefined) {
    entry += `    <priority>${url.priority.toFixed(1)}</priority>\n`;
  }
  entry += `  </url>\n`;
  return entry;
}

export async function generateSitemap(req: Request, res: Response) {
  try {
    const db = await getDb();
    
    if (!db) {
      res.status(503).send('Database not available');
      return;
    }

    const urls: SitemapUrl[] = [];
    const today = formatDate(new Date());

    // Static pages
    const staticPages = [
      { path: '/', priority: 1.0, changefreq: 'daily' as const },
      { path: '/about-us', priority: 0.8, changefreq: 'monthly' as const },
      { path: '/service', priority: 0.9, changefreq: 'weekly' as const },
      { path: '/locations', priority: 0.9, changefreq: 'weekly' as const },
      { path: '/blogs', priority: 0.8, changefreq: 'daily' as const },
      { path: '/contact-us', priority: 0.7, changefreq: 'monthly' as const },
      { path: '/booking', priority: 0.9, changefreq: 'monthly' as const },
    ];

    staticPages.forEach(page => {
      urls.push({
        loc: `${BASE_URL}${page.path}`,
        lastmod: today,
        changefreq: page.changefreq,
        priority: page.priority,
      });
    });

    // Service pages
    const serviceList = await db.select().from(services);
    serviceList.forEach(service => {
      urls.push({
        loc: `${BASE_URL}/service/${service.slug}`,
        lastmod: service.updatedAt ? formatDate(new Date(service.updatedAt)) : today,
        changefreq: 'monthly',
        priority: 0.8,
      });
    });

    // Location pages
    const locationList = await db.select().from(locations);
    locationList.forEach(location => {
      urls.push({
        loc: `${BASE_URL}/${location.slug}`,
        lastmod: location.updatedAt ? formatDate(new Date(location.updatedAt)) : today,
        changefreq: 'monthly',
        priority: 0.7,
      });
    });

    // Blog pages
    const blogList = await db.select().from(blogs);
    blogList.forEach(blog => {
      urls.push({
        loc: `${BASE_URL}/${blog.slug}`,
        lastmod: blog.updatedAt ? formatDate(new Date(blog.updatedAt)) : formatDate(new Date(blog.publishedAt)),
        changefreq: 'monthly',
        priority: 0.6,
      });
    });

    // Category pages
    const categoryList = await db.select().from(categories);
    categoryList.forEach(category => {
      urls.push({
        loc: `${BASE_URL}/category/${category.slug}`,
        lastmod: today,
        changefreq: 'weekly',
        priority: 0.6,
      });
    });

    // Generate XML
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    urls.forEach(url => {
      xml += generateUrlEntry(url);
    });
    
    xml += '</urlset>';

    // Set headers
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, max-age=3600'); // Cache for 1 hour
    res.send(xml);
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).send('Error generating sitemap');
  }
}
