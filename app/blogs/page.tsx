import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import Link from "next/link";
import { getAllBlogs } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | Physiotherapy Tips & Health Articles | Physio At Your Doorstep",
    description: "Read our blog for expert physiotherapy tips, health advice, treatment guides, and wellness information. Stay informed about your health and recovery.",
    alternates: { canonical: "/blogs" },
    openGraph: { title: "Blog | Physio At Your Doorstep", url: "/blogs", type: "website", images: ["/images/logo-square.webp"], },
};

export default async function BlogsPage() {
    const blogs = await getAllBlogs();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-[#EEEEF7] via-white to-[#EEEEF7] section">
                    <div className="container">
                        <div className="max-w-3xl mx-auto text-center">
                            <span className="pill bg-[#3B3B6D]/10 text-[#2A2A57] border border-[#DCDCEC]">
                                Our Blog
                            </span>
                            <h1 className="heading-hero mt-6 mb-6">
                                Physiotherapy Tips & <span className="text-[#E31E24]">Health Insights</span>
                            </h1>
                            <p className="text-lg text-[#4B5563] leading-relaxed">
                                Expert insights, treatment guides, and health tips from our physiotherapy professionals.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Blogs Grid */}
                <section className="section bg-white">
                    <div className="container">
                        {blogs && blogs.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {blogs.map((blog) => (
                                    <BlogCard key={blog.slug} blog={blog} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12">
                                <p className="text-[#4B5563] mb-4">No blog posts available at the moment.</p>
                                <Link href="/contact-us" className="btn-primary">Contact Us</Link>
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
