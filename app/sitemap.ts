import type { MetadataRoute } from "next";
import {
    getAllServices,
    getAllLocations,
    getAllServiceAreas,
    getAllBlogs,
    getAllCategories,
} from "@/lib/content";
import { careerPath, getAllCareerAreas } from "@/lib/careers";
import { CHANNEL_VIDEOS, videoPagePath } from "@/lib/videos";
import { GALLERY_EVENTS, galleryVideoPath } from "@/lib/gallery";

const BASE_URL = "https://www.physioatyourdoorstep.com";

// lastModified is only emitted where we know the real date (blog `date`).
// Stamping every URL with the build time teaches Google to ignore our lastmod.
export default function sitemap(): MetadataRoute.Sitemap {

    const staticPages: MetadataRoute.Sitemap = [
        { url: `${BASE_URL}/`, changeFrequency: "weekly", priority: 1 },
        { url: `${BASE_URL}/about-us`, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/contact-us`, changeFrequency: "monthly", priority: 0.7 },
        { url: `${BASE_URL}/booking`, changeFrequency: "monthly", priority: 0.9 },
        { url: `${BASE_URL}/service`, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/locations`, changeFrequency: "monthly", priority: 0.8 },
        { url: `${BASE_URL}/blogs`, changeFrequency: "weekly", priority: 0.8 },
        { url: `${BASE_URL}/media-coverage`, changeFrequency: "monthly", priority: 0.6 },
        { url: `${BASE_URL}/videos`, changeFrequency: "monthly", priority: 0.6 },
        { url: `${BASE_URL}/gallery`, changeFrequency: "monthly", priority: 0.6 },
        { url: `${BASE_URL}/careers`, changeFrequency: "weekly", priority: 0.7 },
        { url: `${BASE_URL}/privacy-policy`, changeFrequency: "yearly", priority: 0.3 },
        { url: `${BASE_URL}/terms-of-service`, changeFrequency: "yearly", priority: 0.3 },
    ];

    const services: MetadataRoute.Sitemap = getAllServices().map((s) => ({
        url: `${BASE_URL}/service/${s.slug}`,
        changeFrequency: "monthly",
        priority: 0.9,
    }));

    const locations: MetadataRoute.Sitemap = getAllLocations().map((l) => ({
        url: `${BASE_URL}/${l.slug}`,
        changeFrequency: "monthly",
        priority: 0.8,
    }));

    const serviceAreas: MetadataRoute.Sitemap = getAllServiceAreas().map((s) => ({
        url: `${BASE_URL}/${s.slug}`,
        changeFrequency: "monthly",
        priority: 0.8,
    }));

    const categories: MetadataRoute.Sitemap = getAllCategories().map((c) => ({
        url: `${BASE_URL}/category/${c.slug}`,
        changeFrequency: "weekly",
        priority: 0.6,
    }));

    const blogs: MetadataRoute.Sitemap = getAllBlogs().map((b) => ({
        url: `${BASE_URL}/${b.slug}`,
        ...(b.publishedAt ? { lastModified: new Date(b.publishedAt) } : {}),
        changeFrequency: "monthly",
        priority: 0.7,
    }));

    // One job page per hiring area (see lib/careers.ts).
    const careers: MetadataRoute.Sitemap = getAllCareerAreas().map((a) => ({
        url: `${BASE_URL}${careerPath(a.slug)}`,
        changeFrequency: "weekly",
        priority: 0.6,
    }));

    // Video watch pages — the URLs Google indexes each video on.
    const videos: MetadataRoute.Sitemap = [
        ...CHANNEL_VIDEOS.map((v) => ({
            url: `${BASE_URL}${videoPagePath(v.id)}`,
            lastModified: new Date(v.uploadDate),
            changeFrequency: "yearly" as const,
            priority: 0.5,
        })),
        ...GALLERY_EVENTS.filter((e) => e.video).map((e) => ({
            url: `${BASE_URL}${galleryVideoPath(e.slug)}`,
            lastModified: new Date(e.dateISO),
            changeFrequency: "yearly" as const,
            priority: 0.5,
        })),
    ];

    return [...staticPages, ...services, ...locations, ...serviceAreas, ...categories, ...blogs, ...careers, ...videos];
}
