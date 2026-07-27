import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { articleSchema, faqSchema } from "@/lib/seo";
import { MarkdownContent } from "@/components/MarkdownContent";
import BlogCard from "@/components/BlogCard";
import { getAllBlogs, getBlogBySlug, getBlogsByCategory, getAllServices } from "@/lib/content";
import { Calendar, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

/** Maps a blog category slug to the closest service page for contextual cross-links. */
const CATEGORY_TO_SERVICE: Record<string, string> = {
    "orthopaedic-physiotherapy": "orthopaedic-physiotherapy",
    "neurological-physiotherapy": "neurological-physiotherapy",
    "geriatric-physiotherapy": "geriatric-physiotherapy",
    "pediatric-physiotherapy": "pediatric-physiotherapy",
    "pulmonary-physiotherapy": "pulmonary-physiotherapy",
    "post-surgical-physiotherapy": "post-surgical-physiotherapy",
    "physiotherapy-at-pregnancy": "physiotherapy-in-pregnancy",
    "sports-physiotherapy": "sports-physiotherapy",
    "physiotherapy": "orthopaedic-physiotherapy",
};

export async function generateStaticParams() {
    const blogs = await getAllBlogs();
    return blogs.map((blog) => ({
        slug: blog.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        return {
            title: "Blog Post Not Found",
        };
    }

    const description = blog.metaDescription || blog.excerpt || `Read about ${blog.title}`;

    return {
        // Strip any brand suffix baked into content metaTitles — the layout template re-adds it.
        title: (blog.metaTitle || blog.title).replace(/\s*\|\s*Physio At Your Doorstep\s*$/i, ""),
        description,
        alternates: { canonical: `/${slug}` },
        openGraph: {
            title: blog.metaTitle || blog.title,
            description,
            url: `/${slug}`,
            type: "article",
            ...(blog.coverImage ? { images: [blog.coverImage] } : {}),
        },
    };
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    const relatedBlogs = getBlogsByCategory(blog.categorySlug)
        .filter((b) => b.slug !== blog.slug)
        .slice(0, 3);
    const relatedServiceSlug = CATEGORY_TO_SERVICE[blog.categorySlug] ?? "orthopaedic-physiotherapy";
    const relatedService = getAllServices().find((s) => s.slug === relatedServiceSlug);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-[#EEEEF7] via-white to-[#EEEEF7] section">
                    <div className="container">
                        <div className="max-w-4xl mx-auto">
                            <Breadcrumbs
                                className="mb-6"
                                items={[
                                    { name: "Blog", href: "/blogs" },
                                    { name: blog.title },
                                ]}
                            />
                            <div className="flex items-center gap-2 text-sm text-[#4B5563] mb-4">
                                <Calendar className="h-4 w-4 text-[#3B3B6D]" />
                                {new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                })}
                            </div>
                            <h1 className="heading-hero mb-6">{blog.title}</h1>
                            {blog.excerpt && (
                                <p className="text-lg text-[#4B5563] leading-relaxed">{blog.excerpt}</p>
                            )}
                            {blog.coverImage && (
                                <div className="mt-8 img-frame shadow-soft relative aspect-[16/9] max-h-[420px]">
                                    <Image
                                        src={blog.coverImage}
                                        alt={blog.title}
                                        fill
                                        priority
                                        sizes="(max-width: 896px) 100vw, 896px"
                                        className="object-cover"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="section bg-white">
                    <div className="container max-w-4xl">
                        {blog.content && <MarkdownContent>{blog.content}</MarkdownContent>}
                    </div>
                </section>

                {/* Related service cross-link */}
                {relatedService && (
                    <section className="bg-white pb-4">
                        <div className="container max-w-4xl">
                            <div className="rounded-2xl border border-[#DCDCEC] bg-[#EEEEF7]/40 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <p className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">Related Service</p>
                                    <h2 className="text-xl font-semibold text-[#1F2933] mt-1">{relatedService.title} at Home</h2>
                                    <p className="text-[#4B5563] text-sm mt-1">
                                        Book a certified physiotherapist for {relatedService.title.toLowerCase()} across Bangalore &amp; Pune.
                                    </p>
                                </div>
                                <Link href={`/service/${relatedService.slug}`} className="btn-primary whitespace-nowrap">
                                    Explore Service <ArrowRight className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* Related Articles */}
                {relatedBlogs.length > 0 && (
                    <section className="section bg-white">
                        <div className="container">
                            <div className="text-center mb-12">
                                <span className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">Keep Reading</span>
                                <h2 className="heading-section mt-4">
                                    Related <span className="text-[#3B3B6D]">Articles</span>
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedBlogs.map((b) => (
                                    <BlogCard key={b.slug} blog={b} />
                                ))}
                            </div>
                            <div className="text-center mt-10">
                                <Link href={`/category/${blog.categorySlug}`} className="btn-secondary">
                                    More in {blog.category}
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA */}
                <section className="section bg-[#2A2A57] text-white">
                    <div className="container text-center max-w-3xl">
                        <h2 className="heading-section mb-4">Need Professional Help?</h2>
                        <p className="text-lg mb-8 opacity-90">
                            Our expert physiotherapists are here to help you recover and stay healthy.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/booking" className="btn-primary">Book Appointment</Link>
                            <Link href="/blogs" className="btn-secondary">Read More Articles</Link>
                        </div>
                    </div>
                </section>
            </main>

            <JsonLd
                data={[
                    articleSchema({
                        title: blog.title,
                        description: blog.metaDescription || blog.excerpt || blog.title,
                        url: `/${slug}`,
                        image: blog.coverImage,
                        datePublished: new Date(blog.publishedAt).toISOString(),
                    }),
                    ...(blog.faqs.length > 0 ? [faqSchema(blog.faqs)] : []),
                ]}
            />

            <Footer />
            <CTABar />
        </div>
    );
}
