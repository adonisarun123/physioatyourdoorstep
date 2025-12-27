import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Calendar } from "lucide-react";
import Link from "next/link";
import { getAllBlogs } from "@/lib/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Physiotherapy Tips & Health Articles | Physio At Your Doorstep",
    description: "Read our blog for expert physiotherapy tips, health advice, treatment guides, and wellness information. Stay informed about your health and recovery.",
};

export default async function BlogsPage() {
    const blogs = await getAllBlogs();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="container">
                        <div className="max-w-3xl mx-auto text-center">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Blog</h1>
                            <p className="text-xl text-muted-foreground">
                                Expert insights, treatment guides, and health tips from our physiotherapy professionals
                            </p>
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
                                <p className="text-muted-foreground mb-4">No blog posts available at the moment.</p>
                                <Button asChild>
                                    <Link href="/contact-us">Contact Us</Link>
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
