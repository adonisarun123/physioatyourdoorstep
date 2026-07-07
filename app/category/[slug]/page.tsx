import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import BlogCard from "@/components/BlogCard";
import JsonLd from "@/components/JsonLd";
import { SITE, absoluteUrl } from "@/lib/seo";
import { getAllCategories, getCategoryBySlug, getBlogsByCategory } from "@/lib/content";
import Link from "next/link";
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

    const description = category.description || `Read articles about ${category.name}`;

    return {
        title: `${category.name} | Physio At Your Doorstep`,
        description,
        alternates: { canonical: `/category/${slug}` },
        openGraph: { title: category.name, description, url: `/category/${slug}`, type: "website" },
    };
}

export default async function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    const blogs = await getBlogsByCategory(category.slug);

    const collectionSchema = {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: category.name,
        description: category.description || `Articles about ${category.name}`,
        url: absoluteUrl(`/category/${slug}`),
        isPartOf: { "@type": "WebSite", name: SITE.name, url: SITE.url },
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
            </main>

            <JsonLd data={collectionSchema} />

            <Footer />
            <CTABar />
        </div>
    );
}
