import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { serviceSchema, faqSchema } from "@/lib/seo";
import { getServiceMarkdown } from "@/lib/markdown";
import { getAllServices, getServiceFile } from "@/lib/content";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

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

    // Generate description from first paragraph
    const descMatch = serviceContent.content.match(/^(?!#)(.+?)(?=\n\n|$)/m);
    const description = descMatch ? descMatch[1].substring(0, 160) : `Professional ${serviceContent.title} services at your doorstep`;

    return {
        title: `${serviceContent.title} | Physio At Your Doorstep`,
        description: description,
        alternates: { canonical: `/service/${slug}` },
        openGraph: {
            title: serviceContent.title,
            description: description,
            url: `/service/${slug}`,
            type: "article",
        },
    };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const serviceContent = await getServiceMarkdown(getServiceFile(slug) ?? slug);

    if (!serviceContent) {
        notFound();
    }

    // Extract hero content (first paragraph after H1)
    const contentParts = serviceContent.content.split("\n\n");
    const heroSubheadline = contentParts.find((part) => !part.startsWith("#") && part.trim().length > 0);
    const description = heroSubheadline?.substring(0, 160) ?? `Professional ${serviceContent.title} at your doorstep`;

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
                                    { name: "Services", href: "/service" },
                                    { name: serviceContent.title },
                                ]}
                            />
                            <h1 className="heading-hero mb-6">{serviceContent.title}</h1>
                            {heroSubheadline && (
                                <p className="text-lg text-[#4B5563] leading-relaxed">{heroSubheadline}</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="section bg-white">
                    <div className="container max-w-4xl">
                        <MarkdownContent>{serviceContent.content}</MarkdownContent>
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

                {/* CTA Section */}
                <section className="section bg-[#2A2A57] text-white">
                    <div className="container text-center max-w-3xl">
                        <h2 className="heading-section mb-4">Ready to Get Started?</h2>
                        <p className="text-lg mb-8 opacity-90">
                            Book your appointment today and experience professional physiotherapy at your doorstep.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/booking" className="btn-primary">Book Appointment</Link>
                            <a href="tel:+918233787737" className="btn-secondary">Call +91 82337 87737</a>
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
