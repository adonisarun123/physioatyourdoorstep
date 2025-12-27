import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getAllBlogs, getBlogBySlug } from "@/lib/db";
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

    return {
        title: blog.metaTitle || blog.title,
        description: blog.metaDescription || blog.excerpt || `Read about ${blog.title}`,
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
                <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="container">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                                <Calendar className="h-4 w-4" />
                                {new Date(blog.publishedAt).toLocaleDateString('en-IN', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>
                            {blog.excerpt && (
                                <p className="text-xl text-muted-foreground">{blog.excerpt}</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16 md:py-24">
                    <div className="container max-w-4xl">
                        {blog.content && (
                            <div
                                className="prose prose-lg max-w-none mb-12"
                                dangerouslySetInnerHTML={{ __html: blog.content }}
                            />
                        )}

                        {/* CTA */}
                        <div className="mt-12 p-8 bg-muted/50 rounded-lg text-center">
                            <h3 className="text-2xl font-bold mb-4">Need Professional Help?</h3>
                            <p className="text-muted-foreground mb-6">
                                Our expert physiotherapists are here to help you recover and stay healthy
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" asChild>
                                    <Link href="/booking">Book Appointment</Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="/blogs">Read More Articles</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <CTABar />
        </div>
    );
}
