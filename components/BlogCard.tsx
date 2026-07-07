import Link from "next/link";
import { Calendar, ArrowRight } from "lucide-react";
import type { BlogContent } from "@/lib/content";

interface BlogCardProps {
    blog: BlogContent;
    showCategory?: boolean;
}

/** Physiocare-styled blog card used on the blog index and category pages. */
export default function BlogCard({ blog, showCategory = true }: BlogCardProps) {
    return (
        <div className="card-physio overflow-hidden !p-0 group flex flex-col">
            {blog.coverImage && (
                <Link
                    href={`/${blog.slug}`}
                    className="block aspect-[16/9] overflow-hidden bg-[#EEEEF7]"
                >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src={blog.coverImage}
                        alt={blog.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                </Link>
            )}
            <div className="p-6 flex flex-col flex-1">
                <div className="flex flex-wrap items-center gap-2 text-sm text-[#4B5563] mb-3">
                    <Calendar className="h-4 w-4 text-[#3B3B6D]" />
                    {new Date(blog.publishedAt).toLocaleDateString("en-IN", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                    })}
                    {showCategory && blog.category && (
                        <>
                            <span aria-hidden>·</span>
                            <Link
                                href={`/category/${blog.categorySlug}`}
                                className="text-[#3B3B6D] hover:text-[#E31E24] font-medium"
                            >
                                {blog.category}
                            </Link>
                        </>
                    )}
                </div>
                <h3 className="text-xl font-semibold text-[#1F2933] mb-2 group-hover:text-[#3B3B6D] transition-colors">
                    <Link href={`/${blog.slug}`}>{blog.title}</Link>
                </h3>
                <p className="text-[#4B5563] text-sm leading-relaxed mb-4 line-clamp-3 flex-1">
                    {blog.excerpt || blog.metaDescription?.slice(0, 150)}
                </p>
                <Link
                    href={`/${blog.slug}`}
                    className="inline-flex items-center gap-1 text-[#E31E24] font-medium"
                >
                    Read More
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
        </div>
    );
}
