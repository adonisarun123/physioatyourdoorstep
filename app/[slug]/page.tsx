import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { articleSchema } from "@/lib/seo";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getAllBlogs, getBlogBySlug } from "@/lib/content";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

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
                                <div className="mt-8 img-frame shadow-soft">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src={blog.coverImage}
                                        alt={blog.title}
                                        className="w-full max-h-[420px] object-cover"
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
                data={articleSchema({
                    title: blog.title,
                    description: blog.metaDescription || blog.excerpt || blog.title,
                    url: `/${slug}`,
                    image: blog.coverImage,
                    datePublished: new Date(blog.publishedAt).toISOString(),
                })}
            />

            <Footer />
            <CTABar />
        </div>
    );
}
