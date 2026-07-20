import type { MetadataRoute } from "next";
import {
    getAllServices,
    getAllLocations,
    getAllBlogs,
    getAllCategories,
} from "@/lib/content";

const BASE_URL = "https://www.physioatyourdoorstep.com";

export default function sitemap(): MetadataRoute.Sitemap {
    const now = new Date();

    const staticPages: MetadataRoute.Sitemap = [
        { url: `${BASE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
        { url: `${BASE_URL}/about-us`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/contact-us`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/booking`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/service`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/locations`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/blogs`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/privacy-policy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
        { url: `${BASE_URL}/terms-of-service`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    ];

    const services: MetadataRoute.Sitemap = getAllServices().map((s) => ({
        url: `${BASE_URL}/service/${s.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.9,
    }));

    const locations: MetadataRoute.Sitemap = getAllLocations().map((l) => ({
        url: `${BASE_URL}/${l.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
    }));

    const categories: MetadataRoute.Sitemap = getAllCategories().map((c) => ({
        url: `${BASE_URL}/category/${c.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
    }));

    const blogs: MetadataRoute.Sitemap = getAllBlogs().map((b) => ({
        url: `${BASE_URL}/${b.slug}`,
        lastModified: b.publishedAt ? new Date(b.publishedAt) : now,
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    return [...staticPages, ...services, ...locations, ...categories, ...blogs];
}
