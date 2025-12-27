import { Button } from "@/components/ui/button";
import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { MarkdownContent } from "@/components/MarkdownContent";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import { getServiceMarkdown, getAllServiceSlugs } from "@/lib/markdown";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
    const slugs = getAllServiceSlugs();
    return slugs.map((slug) => ({
        slug: slug,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const serviceContent = await getServiceMarkdown(slug);

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
        openGraph: {
            title: serviceContent.title,
            description: description,
            type: 'website',
        },
    };
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const serviceContent = await getServiceMarkdown(slug);

    if (!serviceContent) {
        notFound();
    }

    // Extract hero content (first paragraph after H1)
    const contentParts = serviceContent.content.split('\n\n');
    const heroSubheadline = contentParts.find(part => !part.startsWith('#') && part.trim().length > 0);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
                    <div className="container">
                        <div className="max-w-4xl mx-auto">
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                {serviceContent.title}
                            </h1>
                            {heroSubheadline && (
                                <p className="text-xl text-muted-foreground leading-relaxed">
                                    {heroSubheadline}
                                </p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="py-16 md:py-24">
                    <div className="container max-w-4xl">
                        <MarkdownContent>
                            {serviceContent.content}
                        </MarkdownContent>
                    </div>
                </section>

                {/* FAQs Section */}
                {serviceContent.faqs && serviceContent.faqs.length > 0 && (
                    <section className="py-16 md:py-24 bg-muted/30">
                        <div className="container max-w-4xl">
                            <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
                            <ServiceFAQ faqs={serviceContent.faqs} />
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className="py-16 md:py-24">
                    <div className="container max-w-4xl">
                        <div className="p-8 md:p-12 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-lg text-center">
                            <h3 className="text-2xl md:text-3xl font-bold mb-4">Ready to Get Started?</h3>
                            <p className="text-muted-foreground mb-6 text-lg">
                                Book your appointment today and experience professional physiotherapy at your doorstep
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <Button size="lg" asChild>
                                    <Link href="/booking">Book Appointment</Link>
                                </Button>
                                <Button size="lg" variant="outline" asChild>
                                    <Link href="/contact-us">Contact Us</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* Schema Markup */}
            {serviceContent.schema && (
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceContent.schema) }}
                />
            )}

            <Footer />
            <CTABar />
        </div>
    );
}
