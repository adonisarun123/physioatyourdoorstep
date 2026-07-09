import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import BlogCard from "@/components/BlogCard";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { serviceSchema, faqSchema, SITE } from "@/lib/seo";
import { getServiceMarkdown } from "@/lib/markdown";
import { getAllServices, getServiceFile, getBlogsByCategory } from "@/lib/content";
import { ArrowRight, Calendar, Check, Clock, Home, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

/** Maps a service slug to the blog category that best matches it. */
const SERVICE_TO_CATEGORY: Record<string, string> = {
    "orthopaedic-physiotherapy": "orthopaedic-physiotherapy",
    "neurological-physiotherapy": "neurological-physiotherapy",
    "sports-physiotherapy": "sports-physiotherapy",
    "geriatric-physiotherapy": "geriatric-physiotherapy",
    "post-surgical-physiotherapy": "post-surgical-physiotherapy",
    "pediatric-physiotherapy": "pediatric-physiotherapy",
    "physiotherapy-in-pregnancy": "physiotherapy-at-pregnancy",
    "pulmonary-physiotherapy": "pulmonary-physiotherapy",
    "corporate-wellness-physiotherapy-program": "physiotherapy",
    "online-physiotherapy-consultation-india": "physiotherapy",
};

export async function generateStaticParams() {
    return getAllServices().map((service) => ({
        slug: service.slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const serviceContent = await getServiceMarkdown(getServiceFile(slug) ?? slug);

    if (!serviceContent) {
        return {
            title: "Service Not Found",
        };
    }

    const descMatch = serviceContent.content.match(/^(?!#)(.+?)(?=\n\n|$)/m);
    const description = descMatch ? descMatch[1].substring(0, 160) : `Professional ${serviceContent.title} services at your doorstep`;
    const summary = getAllServices().find((s) => s.slug === slug);

    return {
        title: `${serviceContent.title} | Physio At Your Doorstep`,
        description: description,
        alternates: { canonical: `/service/${slug}` },
        openGraph: {
            title: serviceContent.title,
            description: description,
            url: `/service/${slug}`,
            type: "article",
            images: [summary?.heroImage ?? "/images/logo-square.webp"],
        },
    };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const serviceContent = await getServiceMarkdown(getServiceFile(slug) ?? slug);

    if (!serviceContent) {
        notFound();
    }

    const allServices = getAllServices();
    const summary = allServices.find((s) => s.slug === slug);
    const otherServices = allServices.filter((s) => s.slug !== slug).slice(0, 6);
    const relatedBlogs = getBlogsByCategory(SERVICE_TO_CATEGORY[slug] ?? "physiotherapy").slice(0, 3);

    const whatsappHref = `https://wa.me/${SITE.phoneRaw.replace("+", "")}?text=${encodeURIComponent(
        `Hi, I would like to book a ${serviceContent.title} session at home.`
    )}`;
    const bookingHref = `/booking?service=${slug}`;

    // Extract hero content (first paragraph after H1)
    const contentParts = serviceContent.content.split("\n\n");
    const heroSubheadline = contentParts.find((part) => !part.startsWith("#") && part.trim().length > 0);
    const description = heroSubheadline?.substring(0, 160) ?? `Professional ${serviceContent.title} at your doorstep`;

    // The hero already renders the H1 and intro paragraph — remove them from the body
    // so they don't appear twice.
    let bodyContent = serviceContent.content.replace(/^#\s+.+\n+/, "");
    if (heroSubheadline) {
        bodyContent = bodyContent.replace(heroSubheadline, "").replace(/^\n+/, "").replace(/^---\n+/, "");
    }

    // Short display name for CTAs (the markdown H1 is a long SEO title).
    const shortTitle = summary?.title ?? serviceContent.title;

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-[#EEEEF7] via-white to-[#EEEEF7] section">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <Breadcrumbs
                                    className="mb-6"
                                    items={[
                                        { name: "Services", href: "/service" },
                                        { name: serviceContent.title },
                                    ]}
                                />
                                <h1 className="heading-hero mb-5">{serviceContent.title}</h1>
                                {heroSubheadline && (
                                    <p className="text-lg text-[#4B5563] leading-relaxed mb-8">{heroSubheadline}</p>
                                )}
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href={bookingHref} className="btn-primary">
                                        <Calendar className="h-4 w-4" /> Book This Service
                                    </Link>
                                    <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                                        <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp Us
                                    </a>
                                </div>
                                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#4B5563]">
                                    <span className="inline-flex items-center gap-2">
                                        <ShieldCheck className="h-5 w-5 text-[#3B3B6D]" /> Certified physios
                                    </span>
                                    <span className="inline-flex items-center gap-2">
                                        <Home className="h-5 w-5 text-[#3B3B6D]" /> At your home
                                    </span>
                                    <span className="inline-flex items-center gap-2">
                                        <Clock className="h-5 w-5 text-[#3B3B6D]" /> Available 24×7
                                    </span>
                                </div>
                            </div>
                            {summary?.heroImage && (
                                <div className="hidden lg:block">
                                    <div className="img-frame shadow-float">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={summary.heroImage}
                                            alt={serviceContent.title}
                                            className="w-full h-auto object-cover"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* Content + Sidebar */}
                <section className="section bg-white">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2 min-w-0">
                                <MarkdownContent>{bodyContent}</MarkdownContent>
                            </div>

                            <aside className="lg:col-span-1">
                                <div className="sticky top-28 space-y-6">
                                    {/* Booking CTA card */}
                                    <div className="rounded-2xl bg-gradient-to-br from-[#3B3B6D] to-[#2A2A57] p-6 text-white shadow-float">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={`/images/services/${slug}-2.webp`}
                                            alt={`${serviceContent.title} session at home`}
                                            loading="lazy"
                                            className="w-full h-36 object-cover rounded-xl mb-5"
                                        />
                                        <h3 className="text-xl font-bold mb-2">Book {shortTitle} at Home</h3>
                                        <p className="text-sm opacity-90 mb-5">
                                            Expert care at your home, 24×7 across Bangalore &amp; Pune. Same-day slots available.
                                        </p>
                                        <div className="space-y-3">
                                            <Link href={bookingHref} className="btn-primary w-full">
                                                <Calendar className="h-4 w-4" /> Book an Appointment
                                            </Link>
                                            <a href={`tel:${SITE.phoneRaw}`} className="flex w-full items-center justify-center gap-2 rounded-full bg-white/10 border border-white/25 px-4 py-2.5 font-semibold hover:bg-white/20 transition-colors">
                                                <Phone className="h-4 w-4" /> {SITE.phone}
                                            </a>
                                            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 font-semibold text-white hover:opacity-90 transition-opacity">
                                                <MessageCircle className="h-4 w-4" /> WhatsApp Now
                                            </a>
                                        </div>
                                    </div>

                                    {/* Other services */}
                                    <div className="card-physio !p-6">
                                        <h3 className="font-semibold text-[#1F2933] mb-4">Other Services</h3>
                                        <ul className="space-y-1">
                                            {otherServices.map((s) => (
                                                <li key={s.slug}>
                                                    <Link
                                                        href={`/service/${s.slug}`}
                                                        className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[#1F2933] hover:bg-[#EEEEF7] hover:text-[#3B3B6D] transition-colors"
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            <Check className="h-4 w-4 text-[#3B3B6D] flex-shrink-0" />
                                                            {s.title}
                                                        </span>
                                                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                        <Link href="/service" className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#E31E24]">
                                            View all services <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                </div>
                            </aside>
                        </div>
                    </div>
                </section>

                {/* FAQs Section */}
                {serviceContent.faqs && serviceContent.faqs.length > 0 && (
                    <section className="section bg-[#EEEEF7]/50">
                        <div className="container max-w-4xl">
                            <div className="text-center mb-12">
                                <span className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">FAQ</span>
                                <h2 className="heading-section mt-4">Frequently Asked Questions</h2>
                            </div>
                            <ServiceFAQ faqs={serviceContent.faqs} />
                        </div>
                    </section>
                )}

                {/* Related Blogs */}
                {relatedBlogs.length > 0 && (
                    <section className="section bg-white">
                        <div className="container">
                            <div className="text-center mb-12">
                                <span className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">Learn More</span>
                                <h2 className="heading-section mt-4">
                                    Related <span className="text-[#3B3B6D]">Articles</span>
                                </h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {relatedBlogs.map((blog) => (
                                    <BlogCard key={blog.slug} blog={blog} />
                                ))}
                            </div>
                            <div className="text-center mt-10">
                                <Link href="/blogs" className="btn-secondary">View All Articles</Link>
                            </div>
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="section bg-[#2A2A57] text-white">
                    <div className="container text-center max-w-3xl">
                        <h2 className="heading-section mb-4">Ready to Get Started?</h2>
                        <p className="text-lg mb-8 opacity-90">
                            Book your {shortTitle.toLowerCase()} session today and experience professional
                            physiotherapy at your doorstep.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href={bookingHref} className="btn-primary">Book Appointment</Link>
                            <a href={`tel:${SITE.phoneRaw}`} className="btn-secondary">Call {SITE.phone}</a>
                        </div>
                    </div>
                </section>
            </main>

            <JsonLd
                data={[
                    serviceSchema({ name: serviceContent.title, description, url: `/service/${slug}` }),
                    ...(serviceContent.faqs && serviceContent.faqs.length > 0
                        ? [faqSchema(serviceContent.faqs.map((f) => ({ q: f.question, a: f.answer })))]
                        : []),
                ]}
            />

            <Footer />
            <CTABar />
        </div>
    );
}
