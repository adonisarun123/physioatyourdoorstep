import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { localBusinessSchema, faqSchema, SITE } from "@/lib/seo";
import { MarkdownContent } from "@/components/MarkdownContent";
import { getAllLocations, getLocationBySlug, getAllServices } from "@/lib/content";
import { MapPin, ArrowRight, Calendar, MessageCircle, Phone, ShieldCheck, Home, Clock, Check } from "lucide-react";
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

    const nearbyLocations = getAllLocations()
        .filter((l) => l.city === locationData.city && l.slug !== locationData.slug)
        .slice(0, 6);
    const services = getAllServices();

    const whatsappHref = `https://wa.me/${SITE.phoneRaw.replace("+", "")}?text=${encodeURIComponent(
        `Hi, I would like to book a home physiotherapy session in ${locationData.area}.`
    )}`;

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
                            <h1 className="heading-hero mb-5">{locationData.title}</h1>
                            {locationData.metaDescription && (
                                <p className="text-lg text-[#4B5563] leading-relaxed mb-8">{locationData.metaDescription}</p>
                            )}
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/booking" className="btn-primary">
                                    <Calendar className="h-4 w-4" /> Book a Home Visit
                                </Link>
                                <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn-secondary">
                                    <MessageCircle className="h-4 w-4 text-[#25D366]" /> WhatsApp Us
                                </a>
                                <a href={`tel:${SITE.phoneRaw}`} className="btn-secondary">
                                    <Phone className="h-4 w-4 text-[#3B3B6D]" /> Call Now
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
                    </div>
                </section>

                {/* Content + Sidebar */}
                <section className="section bg-white">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                            <div className="lg:col-span-2 min-w-0">
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

                            <aside className="lg:col-span-1">
                                <div className="sticky top-28 space-y-6">
                                    {/* Booking CTA card */}
                                    <div className="rounded-2xl bg-gradient-to-br from-[#3B3B6D] to-[#2A2A57] p-6 text-white shadow-float">
                                        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium mb-4">
                                            <MapPin className="h-3.5 w-3.5" /> {locationData.area}, {locationData.city}
                                        </div>
                                        <h3 className="text-xl font-bold mb-2">Book Physiotherapy at Home in {locationData.area}</h3>
                                        <p className="text-sm opacity-90 mb-5">
                                            Certified physiotherapists at your doorstep, 24×7. Same-day slots available.
                                        </p>
                                        <div className="space-y-3">
                                            <Link href="/booking" className="btn-primary w-full">
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

                                    {/* Services we offer */}
                                    <div className="card-physio !p-6">
                                        <h3 className="font-semibold text-[#1F2933] mb-4">Services We Offer in {locationData.area}</h3>
                                        <ul className="space-y-1">
                                            {services.map((s) => (
                                                <li key={s.slug}>
                                                    <Link
                                                        href={`/service/${s.slug}`}
                                                        className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[#1F2933] hover:bg-[#EEEEF7] hover:text-[#3B3B6D] transition-colors"
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            <Check className="h-4 w-4 text-[#3B3B6D] flex-shrink-0" />
                                                            {s.title}
                                                        </span>
                                                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
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

                {/* Nearby areas */}
                {nearbyLocations.length > 0 && (
                    <section className="section bg-[#EEEEF7]/40">
                        <div className="container max-w-4xl">
                            <h2 className="heading-subsection mb-6">
                                Physiotherapy in Other {locationData.city} Areas
                            </h2>
                            <div className="flex flex-wrap gap-3">
                                {nearbyLocations.map((l) => (
                                    <Link
                                        key={l.slug}
                                        href={`/${l.slug}`}
                                        className="inline-flex items-center gap-1.5 rounded-full bg-[#EEEEF7] px-4 py-2 text-sm font-medium text-[#3B3B6D] hover:bg-[#DCDCEC] transition-colors"
                                    >
                                        <MapPin className="h-4 w-4" /> {l.area}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </section>
                )}

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
