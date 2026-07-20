import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { localBusinessSchema, faqSchema } from "@/lib/seo";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getAllLocations, getLocationBySlug } from "@/lib/content";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export async function generateStaticParams() {
    const locations = await getAllLocations();
    return locations.map((location) => ({
        location: [location.slug],
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ location: string[] }> }): Promise<Metadata> {
    const { location } = await params;
    const slug = location.join("/");
    const locationData = await getLocationBySlug(slug);

    if (!locationData) {
        return {
            title: "Location Not Found",
        };
    }

    const description =
        locationData.metaDescription ||
        `Professional physiotherapy services in ${locationData.area}, ${locationData.city}`;

    return {
        // Strip any brand suffix baked into content metaTitles — the layout template re-adds it.
        title: (locationData.metaTitle || locationData.title).replace(/\s*\|\s*Physio At Your Doorstep\s*$/i, ""),
        description,
        alternates: { canonical: `/${slug}` },
        openGraph: { title: locationData.title, description, url: `/${slug}`, type: "website" },
    };
}

export default async function LocationDetailPage({ params }: { params: Promise<{ location: string[] }> }) {
    const { location } = await params;
    const slug = location.join("/");
    const locationData = await getLocationBySlug(slug);

    if (!locationData) {
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
                                    { name: "Locations", href: "/locations" },
                                    { name: locationData.title },
                                ]}
                            />
                            <div className="flex items-center gap-2 text-[#4B5563] mb-4">
                                <MapPin className="h-5 w-5 text-[#E31E24]" />
                                <span>{locationData.area}, {locationData.city}</span>
                            </div>
                            <h1 className="heading-hero mb-6">{locationData.title}</h1>
                            {locationData.metaDescription && (
                                <p className="text-lg text-[#4B5563] leading-relaxed">{locationData.metaDescription}</p>
                            )}
                        </div>
                    </div>
                </section>

                {/* Content Section */}
                <section className="section bg-white">
                    <div className="container max-w-4xl">
                        {locationData.content && <MarkdownContent>{locationData.content}</MarkdownContent>}

                        {/* FAQs */}
                        {locationData.faqs && locationData.faqs.length > 0 && (
                            <div className="mt-16">
                                <h2 className="heading-subsection mb-8">Frequently Asked Questions</h2>
                                <div className="space-y-4">
                                    {locationData.faqs.map((faq, index) => (
                                        <div key={index} className="card-physio">
                                            <h3 className="text-lg font-semibold text-[#1F2933] mb-2">{faq.q}</h3>
                                            <p className="text-[#4B5563] leading-relaxed">{faq.a}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                {/* CTA */}
                <section className="section bg-[#2A2A57] text-white">
                    <div className="container text-center max-w-3xl">
                        <h2 className="heading-section mb-4">Book Your Appointment in {locationData.area}</h2>
                        <p className="text-lg mb-8 opacity-90">
                            Professional physiotherapy delivered to your doorstep in {locationData.area}, {locationData.city}.
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
                    localBusinessSchema({ area: locationData.area, city: locationData.city, url: `/${slug}` }),
                    ...(locationData.faqs && locationData.faqs.length > 0 ? [faqSchema(locationData.faqs)] : []),
                ]}
            />

            <Footer />
            <CTABar />
        </div>
    );
}
