import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { getAllCategories, getCategoryBySlug, getBlogsByCategory } from "@/lib/db";
import { Calendar } from "lucide-react";
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

    return {
        title: `${category.name} | Physio At Your Doorstep`,
        description: category.description || `Read articles about ${category.name}`,
    };
}

export default async function CategoryDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    const blogs = await getBlogsByCategory(category.id);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="container">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">{category.name}</h1>
                            {category.description && (
                                <p className="text-xl text-muted-foreground">{category.description}</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Blogs Grid */}
                <section className="py-16 md:py-24">
                    <div className="container">
                        {blogs && blogs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {blogs.map((blog) => (
                                    <Card key={blog.id} className="hover:shadow-lg transition-shadow">
                                        <CardHeader>
                                            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                                                <Calendar className="h-4 w-4" />
                                                {new Date(blog.publishedAt).toLocaleDateString('en-IN', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}
                                            </div>
                                            <CardTitle className="text-xl">{blog.title}</CardTitle>
                                        </CardHeader>
                                        <CardContent>
                                            <CardDescription className="mb-4">
                                                {blog.excerpt || blog.metaDescription?.slice(0, 150)}...
                                            </CardDescription>
                                            <Button variant="outline" className="w-full" asChild>
                                                <Link href={`/${blog.slug}`}>
                                                    Read More
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-muted-foreground mb-4">No articles in this category yet.</p>
                                <Button asChild>
                                    <Link href="/blogs">View All Articles</Link>
                                </Button>
                            </div>
                        )}
                    </div>
                </section>
            </main>

            <Footer />
            <CTABar />
        </div>
    );
}
