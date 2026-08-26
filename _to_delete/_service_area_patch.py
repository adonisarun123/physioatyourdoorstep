import io, os, sys

D = sys.argv[1]
p = os.path.join(D, "lib", "content.ts")
src = io.open(p, encoding="utf-8").read()

if "getAllServiceAreas" in src:
    print("content.ts already patched — skipping")
    sys.exit(0)

# 1. Interface, inserted after LocationContent
iface_anchor = """export interface BlogContent {"""
iface_new = """/**
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

export interface BlogContent {"""
assert iface_anchor in src
src = src.replace(iface_anchor, iface_new, 1)

# 2. Loader, inserted before the blogs section
loader_anchor = "// ---------------- blogs ----------------"
loader_new = """// ---------------- service areas ----------------

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

// ---------------- blogs ----------------"""
assert loader_anchor in src
src = src.replace(loader_anchor, loader_new, 1)

# 3. getServiceTitle helper, appended next to getServiceFile
tail_anchor = """/** Maps a service URL slug to its markdown file name under /markdown. */
export function getServiceFile(slug: string): string | undefined {
    return SERVICE_INDEX.find((s) => s.slug === slug)?.file;
}"""
tail_new = tail_anchor + """

/** Display title for a global service slug. */
export function getServiceTitle(slug: string): string | undefined {
    return SERVICE_INDEX.find((s) => s.slug === slug)?.title;
}"""
assert tail_anchor in src
src = src.replace(tail_anchor, tail_new, 1)

io.open(p, "w", encoding="utf-8").write(src)
print("patched lib/content.ts")

# 4. sitemap
sp = os.path.join(D, "app", "sitemap.ts")
s = io.open(sp, encoding="utf-8").read()
if "getAllServiceAreas" not in s:
    s = s.replace(
        "    getAllLocations,\n",
        "    getAllLocations,\n    getAllServiceAreas,\n",
        1,
    )
    anchor = """    const categories: MetadataRoute.Sitemap = getAllCategories().map((c) => ({"""
    add = """    const serviceAreas: MetadataRoute.Sitemap = getAllServiceAreas().map((s) => ({
        url: `${BASE_URL}/${s.slug}`,
        lastModified: now,
        changeFrequency: "monthly",
        priority: 0.8,
    }));

""" + anchor
    assert anchor in s
    s = s.replace(anchor, add, 1)
    s = s.replace(
        "return [...staticPages, ...services, ...locations, ...categories, ...blogs];",
        "return [...staticPages, ...services, ...locations, ...serviceAreas, ...categories, ...blogs];",
        1,
    )
    io.open(sp, "w", encoding="utf-8").write(s)
    print("patched app/sitemap.ts")
else:
    print("sitemap already patched")
