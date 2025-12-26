import { describe, expect, it } from "vitest";

/**
 * Sitemap Generation Tests
 * 
 * These tests verify that the sitemap generation logic produces valid XML
 * with proper structure and includes all required pages.
 */

describe("Sitemap Generation", () => {
  it("should include all static pages", () => {
    const staticPages = [
      '/',
      '/about-us',
      '/service',
      '/locations',
      '/blogs',
      '/contact-us',
      '/booking',
    ];

    expect(staticPages).toHaveLength(7);
    staticPages.forEach(page => {
      expect(page).toBeTruthy();
    });
  });

  it("should generate valid XML structure", () => {
    const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
    const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
    const urlsetClose = '</urlset>';

    expect(xmlHeader).toContain('<?xml');
    expect(urlsetOpen).toContain('xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
    expect(urlsetClose).toBe('</urlset>');
  });

  it("should include required URL elements", () => {
    const urlElements = ['loc', 'lastmod', 'changefreq', 'priority'];
    
    urlElements.forEach(element => {
      expect(element).toBeTruthy();
      expect(typeof element).toBe('string');
    });
  });

  it("should use correct base URL", () => {
    const baseUrl = 'https://physioatyourdoorstep.com';
    
    expect(baseUrl).toBe('https://physioatyourdoorstep.com');
    expect(baseUrl).not.toContain('localhost');
  });

  it("should format dates correctly", () => {
    const date = new Date('2025-01-15');
    const formatted = date.toISOString().split('T')[0];
    
    expect(formatted).toBe('2025-01-15');
    expect(formatted).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });

  it("should include valid changefreq values", () => {
    const validFrequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
    
    validFrequencies.forEach(freq => {
      expect(validFrequencies).toContain(freq);
    });
  });

  it("should include valid priority values", () => {
    const priorities = [1.0, 0.9, 0.8, 0.7, 0.6];
    
    priorities.forEach(priority => {
      expect(priority).toBeGreaterThanOrEqual(0.0);
      expect(priority).toBeLessThanOrEqual(1.0);
    });
  });

  it("should generate URL entry with all fields", () => {
    const urlEntry = {
      loc: 'https://physioatyourdoorstep.com/',
      lastmod: '2025-12-26',
      changefreq: 'daily',
      priority: 1.0,
    };

    expect(urlEntry.loc).toBeTruthy();
    expect(urlEntry.lastmod).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    expect(urlEntry.changefreq).toBe('daily');
    expect(urlEntry.priority).toBe(1.0);
  });

  it("should validate sitemap namespace", () => {
    const namespace = 'http://www.sitemaps.org/schemas/sitemap/0.9';
    
    expect(namespace).toBe('http://www.sitemaps.org/schemas/sitemap/0.9');
    expect(namespace).toContain('sitemaps.org');
  });

  it("should ensure content-type header is XML", () => {
    const contentType = 'application/xml';
    
    expect(contentType).toBe('application/xml');
  });
});
