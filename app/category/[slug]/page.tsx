import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogCard from "@/components/BlogCard";
import JsonLd from "@/components/JsonLd";
import { SITE, absoluteUrl, OG_DEFAULTS } from "@/lib/seo";
import { getAllCategories, getCategoryBySlug, getBlogsByCategory, getServiceForCategory } from "@/lib/content";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
    const categories = await getAllCategories();
    return categories.map((category) => ({
        slug: category.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    if (!category) {
        return {
            title: "Category Not Found",
        };
    }

    const description = category.metaDescription || category.description || `Read articles about ${category.name}`;
    const title = category.metaTitle || category.name;

    return {
        title,
        description,
        alternates: { canonical: `/category/${slug}` },
        openGraph: { ...OG_DEFAULTS,
            title,
            description,
            url: `/category/${slug}`,
            type: "website",
            images: [getBlogsByCategory(slug).find((b) => b.coverImage)?.coverImage ?? "/images/logo-square.webp"],
        },
    };
}

export default async function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    const blogs = await getBlogsByCategory(category.slug);
    const relatedService = getServiceForCategory(category.slug);
    const otherCategories = getAllCategories().filter((c) => c.slug !== category.slug);

    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: category.name,
        description: category.description || `Articles about ${category.name}`,
        url: absoluteUrl(`/category/${slug}`),
        inLanguage: "en-IN",
        isPartOf: { "@id": `${SITE.url}/#website` },
        mainEntity: {
            "@type": "ItemList",
            numberOfItems: blogs.length,
            itemListElement: blogs.map((b, i) => ({
                "@type": "ListItem",
                position: i + 1,
                url: absoluteUrl(`/${b.slug}`),
                name: b.title,
            })),
        },
    };

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-[#EEEEF7] via-white to-[#EEEEF7] section">
                    <div className="container">
                        <Breadcrumbs
                            className="mb-6 [&_ol]:justify-center"
                            items={[
                                { name: "Blog", href: "/blogs" },
                                { name: category.name },
                            ]}
                        />
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="heading-hero mb-6">{category.name}</h1>
                            {category.description && (
                                <p className="text-lg text-[#4B5563] leading-relaxed">{category.description}</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Blogs Grid */}
                <section className="section bg-white">
                    <div className="container">
                        {blogs && blogs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {blogs.map((blog) => (
                                    <BlogCard key={blog.slug} blog={blog} showCategory={false} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-[#4B5563] mb-4">No articles in this category yet.</p>
                                <Link href="/blogs" className="btn-primary">View All Articles</Link>
                            </div>
                        )}
                    </div>
                </section>

                {/* Service + sibling-topic cross-links */}
                <section className="section bg-[#F6F6FB]">
                    <div className="container max-w-5xl">
                        {relatedService && (
                            <div className="rounded-2xl border border-[#DCDCEC] bg-white p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-12">
                                <div>
                                    <p className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">Need Treatment?</p>
                                    <h2 className="text-xl font-semibold text-[#1F2933] mt-1">{relatedService.title} at Home</h2>
                                    <p className="text-[#4B5563] text-sm mt-1">{relatedService.metaDescription}</p>
                                </div>
                                <Link href={`/service/${relatedService.slug}`} className="btn-primary whitespace-nowrap">
                                    Explore Service <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        )}
                        <h2 className="heading-subsection mb-6 text-center">Explore Other Topics</h2>
                        <div className="flex flex-wrap justify-center gap-3">
                            {otherCategories.map((c) => (
                                <Link
                                    key={c.slug}
                                    href={`/category/${c.slug}`}
                                    className="rounded-full border border-[#DCDCEC] bg-white px-4 py-2 text-sm font-medium text-[#1F2933] hover:border-[#3B3B6D] hover:text-[#3B3B6D] transition-colors"
                                >
                                    {c.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>
            </main>

            <JsonLd data={collectionSchema} />

            <Footer />
            <CTABar />
        </div>
    );
}
