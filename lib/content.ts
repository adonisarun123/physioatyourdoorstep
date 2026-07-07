import fs from "fs";
import path from "path";
import matter from "gray-matter";

/**
 * File-based content layer.
 * All site content (services, locations, blogs) lives in /content and /markdown
 * as version-controlled files — no database required to render the site.
 */

const CONTENT_DIR = path.join(process.cwd(), "content");

export interface FaqItem {
    q: string;
    a: string;
}

export interface LocationContent {
    slug: string;
    title: string;
    city: string;
    area: string;
    metaTitle: string | null;
    metaDescription: string | null;
    content: string; // markdown
    faqs: FaqItem[];
}

export interface BlogContent {
    slug: string;
    title: string;
    metaTitle: string | null;
    metaDescription: string | null;
    excerpt: string | null;
    coverImage: string | null;
    category: string;
    categorySlug: string;
    content: string; // markdown
    publishedAt: Date;
}

export interface CategoryContent {
    id: number;
    slug: string;
    name: string;
    description: string;
}

export interface ServiceSummary {
    id: number;
    slug: string;
    title: string;
    metaDescription: string | null;
    heroImage: string | null;
}

// ---------------- categories ----------------

export const CATEGORIES: CategoryContent[] = [
    { id: 1, slug: "physiotherapy", name: "Physiotherapy", description: "General physiotherapy articles and information" },
    { id: 2, slug: "neurological-physiotherapy", name: "Neurological Physiotherapy", description: "Neurological conditions and treatments" },
    { id: 3, slug: "geriatric-physiotherapy", name: "Geriatric Physiotherapy", description: "Physiotherapy for elderly patients" },
    { id: 4, slug: "pediatric-physiotherapy", name: "Pediatric Physiotherapy", description: "Physiotherapy for children" },
    { id: 5, slug: "pulmonary-physiotherapy", name: "Pulmonary Physiotherapy", description: "Respiratory and lung-related physiotherapy" },
    { id: 6, slug: "post-surgical-physiotherapy", name: "Post-Surgical Physiotherapy", description: "Rehabilitation after surgery" },
    { id: 7, slug: "physiotherapy-at-pregnancy", name: "Physiotherapy at Pregnancy", description: "Physiotherapy during and after pregnancy" },
    { id: 8, slug: "orthopaedic-physiotherapy", name: "Orthopaedic Physiotherapy", description: "Musculoskeletal and bone-related physiotherapy" },
    { id: 9, slug: "sports-physiotherapy", name: "Sports Physiotherapy", description: "Sports injuries and athletic performance" },
];

const categoryByName = new Map(CATEGORIES.map((c) => [c.name.toLowerCase(), c]));

export function getAllCategories(): CategoryContent[] {
    return CATEGORIES;
}

export function getCategoryBySlug(slug: string): CategoryContent | undefined {
    return CATEGORIES.find((c) => c.slug === slug);
}

// ---------------- shared helpers ----------------

function readDir(dir: string): string[] {
    const full = path.join(CONTENT_DIR, dir);
    if (!fs.existsSync(full)) return [];
    return fs
        .readdirSync(full)
        .filter((f) => f.endsWith(".md"))
        .map((f) => f.replace(/\.md$/, ""));
}

/** Extract "## Frequently Asked Questions" section into structured FAQs. */
function extractFaqs(md: string): { body: string; faqs: FaqItem[] } {
    const faqs: FaqItem[] = [];
    const match = md.match(/^##\s+Frequently Asked Questions[^\n]*\n([\s\S]*?)(?=\n##\s(?!#)|$)/im);
    if (!match) return { body: md, faqs };

    const section = match[1];
    for (const m of section.matchAll(/###\s+(.+?)\n+([\s\S]*?)(?=\n###\s|$)/g)) {
        const q = m[1].replace(/\*\*/g, "").trim();
        const a = m[2].replace(/\n+/g, " ").replace(/\s+/g, " ").trim();
        if (q && a) faqs.push({ q, a });
    }
    const body = md.replace(match[0], "").trim();
    return { body: faqs.length > 0 ? body : md, faqs };
}

// ---------------- locations ----------------

let _locations: LocationContent[] | null = null;

export function getAllLocations(): LocationContent[] {
    if (_locations) return _locations;
    _locations = readDir("locations")
        .map((slug) => {
            const raw = fs.readFileSync(path.join(CONTENT_DIR, "locations", `${slug}.md`), "utf8");
            const { data, content } = matter(raw);
            const { body, faqs } = extractFaqs(content.trim());
            return {
                slug,
                title: data.title ?? slug.replace(/-/g, " "),
                city: data.city ?? "Bangalore",
                area: data.area ?? "",
                metaTitle: data.metaTitle ?? null,
                metaDescription: data.metaDescription ?? null,
                content: body,
                faqs,
            } satisfies LocationContent;
        })
        .sort((a, b) => (a.city === b.city ? a.area.localeCompare(b.area) : a.city.localeCompare(b.city)));
    return _locations;
}

export function getLocationBySlug(slug: string): LocationContent | undefined {
    return getAllLocations().find((l) => l.slug === slug);
}

// ---------------- blogs ----------------

let _blogs: BlogContent[] | null = null;

export function getAllBlogs(): BlogContent[] {
    if (_blogs) return _blogs;
    _blogs = readDir("blogs")
        .map((slug) => {
            const raw = fs.readFileSync(path.join(CONTENT_DIR, "blogs", `${slug}.md`), "utf8");
            const { data, content } = matter(raw);
            const categoryName: string = data.category ?? "Physiotherapy";
            const cat = categoryByName.get(categoryName.toLowerCase()) ?? CATEGORIES[0];
            // Drop the leading H1 if it duplicates the title (rendered separately in hero)
            const body = content.trim().replace(/^#\s+.+\n+/, "");
            return {
                slug,
                title: data.title ?? slug.replace(/-/g, " "),
                metaTitle: data.metaTitle ?? null,
                metaDescription: data.metaDescription ?? null,
                excerpt: data.excerpt ?? null,
                coverImage: data.coverImage ?? null,
                category: cat.name,
                categorySlug: cat.slug,
                content: body,
                publishedAt: data.date ? new Date(data.date) : new Date(),
            } satisfies BlogContent;
        })
        .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
    return _blogs;
}

export function getBlogBySlug(slug: string): BlogContent | undefined {
    return getAllBlogs().find((b) => b.slug === slug);
}

export function getBlogsByCategory(categorySlug: string): BlogContent[] {
    return getAllBlogs().filter((b) => b.categorySlug === categorySlug);
}

// ---------------- services ----------------

/** Static service index: slug order controls display order. */
const SERVICE_INDEX: Array<{ slug: string; file: string; title: string; description: string }> = [
    { slug: "orthopaedic-physiotherapy", file: "orthopaedic-physiotherapy", title: "Orthopaedic Physiotherapy", description: "Expert treatment for musculoskeletal conditions, joint pain, and mobility issues." },
    { slug: "neurological-physiotherapy", file: "neurological-physiotherapy", title: "Neurological Physiotherapy", description: "Comprehensive care for neurological conditions to improve function and quality of life." },
    { slug: "sports-physiotherapy", file: "sports-physiotherapy", title: "Sports Physiotherapy", description: "Specialized care for athletes and sports injuries to enhance performance and recovery." },
    { slug: "geriatric-physiotherapy", file: "geriatric-physiotherapy", title: "Geriatric Physiotherapy", description: "Specialized care for elderly patients focusing on mobility, balance, and independence." },
    { slug: "post-surgical-physiotherapy", file: "post-surgical-physiotherapy", title: "Post Surgical Physiotherapy", description: "Rehabilitation programs designed to accelerate recovery after surgical procedures." },
    { slug: "pediatric-physiotherapy", file: "pediatric-physiotherapy", title: "Pediatric Physiotherapy", description: "Gentle, engaging physiotherapy that supports your child's development and mobility." },
    { slug: "physiotherapy-in-pregnancy", file: "physiotherapy-during-pregnancy", title: "Physiotherapy in Pregnancy", description: "Safe, supportive care for back pain, pelvic health, and fitness through pregnancy." },
    { slug: "pulmonary-physiotherapy", file: "pulmonary-physiotherapy", title: "Pulmonary Physiotherapy", description: "Breathing exercises and techniques to improve respiratory function and lung capacity." },
    { slug: "corporate-wellness-physiotherapy-program", file: "corporate-wellness-physiotherapy", title: "Corporate Wellness Physiotherapy Program", description: "Workplace ergonomics and wellness programs that keep your teams pain-free and productive." },
    { slug: "online-physiotherapy-consultation-india", file: "online-physiotherapy-consultation", title: "Online Physiotherapy", description: "Expert physiotherapy consultations from anywhere in India, over video." },
];

export function getAllServices(): ServiceSummary[] {
    return SERVICE_INDEX.map((s, i) => ({
        id: i + 1,
        slug: s.slug,
        title: s.title,
        metaDescription: s.description,
        heroImage: `/images/services/${s.slug}.webp`,
    }));
}

/** Maps a service URL slug to its markdown file name under /markdown. */
export function getServiceFile(slug: string): string | undefined {
    return SERVICE_INDEX.find((s) => s.slug === slug)?.file;
}
