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
    /** Plain-text answer (used for FAQPage structured data). */
    a: string;
    /** Original markdown answer (used for on-page rendering, keeps links). */
    md: string;
}

/** Strips inline markdown (links, emphasis) down to plain text. */
function toPlainText(md: string): string {
    return md
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/(\*\*|__|\*|_)(.+?)\1/g, "$2")
        .replace(/\s+/g, " ")
        .trim();
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

/**
 * A service x area page (e.g. "Orthopaedic Physiotherapy in Haralur").
 * These localise a global service page for one neighbourhood and sit
 * beneath that neighbourhood's location pillar page. Kept in their own
 * collection so /locations and the nearby-area links stay area-only.
 */
export interface ServiceAreaContent {
    slug: string;
    title: string;
    city: string;
    area: string;
    /** Slug of the global service page this page localises. */
    service: string;
    /** Display name of that global service. */
    serviceName: string;
    /** Slug of the location pillar page for this area. */
    pillar: string;
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
    faqs: FaqItem[];
}

export interface CategoryContent {
    id: number;
    slug: string;
    name: string;
    description: string;
    /** SEO <title>; falls back to name. */
    metaTitle?: string;
    /** SEO meta description (120–160 chars); falls back to description. */
    metaDescription?: string;
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
    { id: 1, slug: "physiotherapy", name: "Physiotherapy", description: "General physiotherapy articles and information", metaTitle: "Physiotherapy Blog: Expert Guides, Exercises & Tips", metaDescription: "Expert physiotherapy articles: conditions, treatment techniques, home exercises and recovery advice from the physiotherapists at Physio At Your Doorstep." },
    { id: 2, slug: "neurological-physiotherapy", name: "Neurological Physiotherapy", description: "Neurological conditions and treatments", metaTitle: "Neurological Physiotherapy Articles & Recovery Guides", metaDescription: "Guides on neurological physiotherapy for stroke, Parkinson’s, multiple sclerosis, facial palsy and nerve injuries: assessment, techniques and home exercises." },
    { id: 3, slug: "geriatric-physiotherapy", name: "Geriatric Physiotherapy", description: "Physiotherapy for elderly patients", metaTitle: "Geriatric Physiotherapy Articles: Elderly Care Guides", metaDescription: "Physiotherapy guides for elderly patients: arthritis, balance and fall prevention, mobility, cardiac rehab and safe home exercise programmes for seniors." },
    { id: 4, slug: "pediatric-physiotherapy", name: "Pediatric Physiotherapy", description: "Physiotherapy for children", metaTitle: "Pediatric Physiotherapy Articles: Guides for Parents", metaDescription: "Pediatric physiotherapy guides for parents: developmental delays, torticollis, Erb’s palsy, chest physiotherapy and how home therapy supports your child." },
    { id: 5, slug: "pulmonary-physiotherapy", name: "Pulmonary Physiotherapy", description: "Respiratory and lung-related physiotherapy", metaTitle: "Pulmonary Physiotherapy Articles: Breathing & Lung Care", metaDescription: "Pulmonary physiotherapy guides: COPD, pneumonia, breathing techniques such as ACBT, airway clearance and exercise to improve lung function at home." },
    { id: 6, slug: "post-surgical-physiotherapy", name: "Post-Surgical Physiotherapy", description: "Rehabilitation after surgery", metaTitle: "Post-Surgical Physiotherapy Articles & Rehab Guides", metaDescription: "Rehab guides after surgery: knee and hip replacement, ACL reconstruction, spine, cardiac and fracture surgery, with phase-by-phase physiotherapy plans." },
    { id: 7, slug: "physiotherapy-at-pregnancy", name: "Physiotherapy at Pregnancy", description: "Physiotherapy during and after pregnancy", metaTitle: "Pregnancy Physiotherapy Articles: Prenatal & Postnatal", metaDescription: "Physiotherapy during and after pregnancy: back and pelvic pain, safe exercises, pelvic floor recovery, postnatal rehab and preparing your body for birth." },
    { id: 8, slug: "orthopaedic-physiotherapy", name: "Orthopaedic Physiotherapy", description: "Musculoskeletal and bone-related physiotherapy", metaTitle: "Orthopaedic Physiotherapy Articles: Joint & Spine Guides", metaDescription: "Orthopaedic physiotherapy guides for back and neck pain, disc problems, arthritis, frozen shoulder, tennis elbow and other joint and muscle conditions." },
    { id: 9, slug: "sports-physiotherapy", name: "Sports Physiotherapy", description: "Sports injuries and athletic performance", metaTitle: "Sports Physiotherapy Articles: Injury Rehab Guides", metaDescription: "Sports physiotherapy guides: ACL, ligament and muscle injuries, return-to-sport rehab, injury prevention and performance training for active people." },
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
    const match = md.match(/^##[ \t]+Frequently Asked Questions[^\n]*\r?\n([\s\S]*?)(?=\n##[ \t](?!#)|$(?![\s\S]))/im);
    if (!match) return { body: md, faqs };

    const section = match[1];
    for (const m of section.matchAll(/###\s+(.+?)\n+([\s\S]*?)(?=\n###\s|$)/g)) {
        const q = toPlainText(m[1]);
        const md = m[2].trim();
        const a = toPlainText(md);
        if (q && a) faqs.push({ q, a, md });
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

// ---------------- service areas ----------------

let _serviceAreas: ServiceAreaContent[] | null = null;

export function getAllServiceAreas(): ServiceAreaContent[] {
    if (_serviceAreas) return _serviceAreas;
    _serviceAreas = readDir("service-areas")
        .map((slug) => {
            const raw = fs.readFileSync(path.join(CONTENT_DIR, "service-areas", `${slug}.md`), "utf8");
            const { data, content } = matter(raw);
            const { body, faqs } = extractFaqs(content.trim());
            const service: string = data.service ?? "";
            return {
                slug,
                title: data.title ?? slug.replace(/-/g, " "),
                city: data.city ?? "Bangalore",
                area: data.area ?? "",
                service,
                serviceName: data.serviceName ?? getServiceTitle(service) ?? "Physiotherapy",
                pillar: data.pillar ?? "",
                metaTitle: data.metaTitle ?? null,
                metaDescription: data.metaDescription ?? null,
                content: body,
                faqs,
            } satisfies ServiceAreaContent;
        })
        .sort((a, b) => (a.area === b.area ? a.serviceName.localeCompare(b.serviceName) : a.area.localeCompare(b.area)));
    return _serviceAreas;
}

export function getServiceAreaBySlug(slug: string): ServiceAreaContent | undefined {
    return getAllServiceAreas().find((s) => s.slug === slug);
}

/** All service pages for one area, used to cross-link siblings and to let the pillar list its children. */
export function getServiceAreasByArea(area: string): ServiceAreaContent[] {
    return getAllServiceAreas().filter((s) => s.area.toLowerCase() === area.toLowerCase());
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
            // Non-destructive: pull FAQ Q/A pairs for FAQPage schema while
            // leaving the FAQ section visible in the rendered body.
            const { faqs } = extractFaqs(content.trim());
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
                faqs,
            } satisfies BlogContent;
        })
        .sort((a, b) => b.publishedAt.getTime() - a.publishedAt.getTime());
    return _blogs;
}

export function getBlogBySlug(slug: string): BlogContent | undefined {
    return getAllBlogs().find((b) => b.slug === slug);
}

/**
 * Picks `count` neighbours of `slug` from `items`, wrapping around the list.
 * Unlike "first N", every item ends up linked from N others, so internal
 * links are spread evenly instead of piling onto the same few pages.
 */
export function pickNeighbours<T extends { slug: string }>(items: T[], slug: string, count: number): T[] {
    const start = Math.max(0, items.findIndex((i) => i.slug === slug));
    return pickWindow(items.filter((i) => i.slug !== slug), start, count);
}

/** Returns `count` items starting at `start`, wrapping around the list. */
export function pickWindow<T>(items: T[], start: number, count: number): T[] {
    if (items.length <= count) return items;
    return Array.from({ length: count }, (_, k) => items[(start + k) % items.length]);
}

export function getBlogsByCategory(categorySlug: string): BlogContent[] {
    return getAllBlogs().filter((b) => b.categorySlug === categorySlug);
}

// ---------------- services ----------------

/** Static service index: slug order controls display order. */
const SERVICE_INDEX: Array<{ slug: string; file: string; title: string; description: string; metaTitle: string }> = [
    { slug: "orthopaedic-physiotherapy", file: "orthopaedic-physiotherapy", title: "Orthopaedic Physiotherapy", description: "Expert treatment for musculoskeletal conditions, joint pain, and mobility issues.", metaTitle: "Orthopaedic Physiotherapy at Home | Joint & Back Pain Care" },
    { slug: "neurological-physiotherapy", file: "neurological-physiotherapy", title: "Neurological Physiotherapy", description: "Comprehensive care for neurological conditions to improve function and quality of life.", metaTitle: "Neurological Physiotherapy at Home | Stroke & Neuro Rehab" },
    { slug: "sports-physiotherapy", file: "sports-physiotherapy", title: "Sports Physiotherapy", description: "Specialized care for athletes and sports injuries to enhance performance and recovery.", metaTitle: "Sports Physiotherapy at Home | Injury Rehab in Bangalore" },
    { slug: "geriatric-physiotherapy", file: "geriatric-physiotherapy", title: "Geriatric Physiotherapy", description: "Specialized care for elderly patients focusing on mobility, balance, and independence.", metaTitle: "Geriatric Physiotherapy at Home | Elderly Care Bangalore" },
    { slug: "post-surgical-physiotherapy", file: "post-surgical-physiotherapy", title: "Post Surgical Physiotherapy", description: "Rehabilitation programs designed to accelerate recovery after surgical procedures.", metaTitle: "Post-Surgical Physiotherapy at Home | Rehab in Bangalore" },
    { slug: "pediatric-physiotherapy", file: "pediatric-physiotherapy", title: "Pediatric Physiotherapy", description: "Gentle, engaging physiotherapy that supports your child's development and mobility.", metaTitle: "Pediatric Physiotherapy at Home for Children | Bangalore" },
    { slug: "physiotherapy-in-pregnancy", file: "physiotherapy-during-pregnancy", title: "Physiotherapy in Pregnancy", description: "Safe, supportive care for back pain, pelvic health, and fitness through pregnancy.", metaTitle: "Physiotherapy During Pregnancy | Prenatal & Postnatal Care" },
    { slug: "pulmonary-physiotherapy", file: "pulmonary-physiotherapy", title: "Pulmonary Physiotherapy", description: "Breathing exercises and techniques to improve respiratory function and lung capacity.", metaTitle: "Pulmonary Physiotherapy at Home | Breathing & Lung Rehab" },
    { slug: "corporate-wellness-physiotherapy-program", file: "corporate-wellness-physiotherapy", title: "Corporate Wellness Physiotherapy Program", description: "Workplace ergonomics and wellness programs that keep your teams pain-free and productive.", metaTitle: "Corporate Wellness Physiotherapy Program in Bangalore" },
    { slug: "online-physiotherapy-consultation-india", file: "online-physiotherapy-consultation", title: "Online Physiotherapy", description: "Expert physiotherapy consultations from anywhere in India, over video.", metaTitle: "Online Physiotherapy Consultation in India | Video Sessions" },
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

/** SEO <title> for a global service page (the markdown H1 is too long for SERPs). */
export function getServiceMetaTitle(slug: string): string | undefined {
    return SERVICE_INDEX.find((s) => s.slug === slug)?.metaTitle;
}

/** Display title for a global service slug. */
export function getServiceTitle(slug: string): string | undefined {
    return SERVICE_INDEX.find((s) => s.slug === slug)?.title;
}
