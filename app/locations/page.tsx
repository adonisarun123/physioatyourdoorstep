import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";
import { getAllLocations } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Locations | Home Physiotherapy Services",
    description: "We provide professional home physiotherapy services across multiple locations in Bangalore and Pune. Find a physiotherapist near you.",
    alternates: { canonical: "/locations" },
    openGraph: { title: "Our Locations | Physio At Your Doorstep", url: "/locations", type: "website", images: ["/images/logo-square.webp"], },
};

export default async function LocationsPage() {
    const locations = getAllLocations();

    // Group locations by city
    const locationsByCity = locations.reduce((acc, location) => {
        (acc[location.city] ||= []).push(location);
        return acc;
    }, {} as Record<string, typeof locations>);

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-[#EEEEF7] via-white to-[#EEEEF7] section">
                    <div className="container">
                        <div className="max-w-3xl mx-auto text-center">
                            <span className="pill bg-[#3B3B6D]/10 text-[#2A2A57] border border-[#DCDCEC]">
                                Service Areas
                            </span>
                            <h1 className="heading-hero mt-4 mb-4">
                                Physiotherapy <span className="text-[#E31E24]">Near You</span>
                            </h1>
                            <p className="text-lg text-[#4B5563] leading-relaxed">
                                Professional physiotherapy delivered to your doorstep across Bangalore and Pune.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Locations Grid */}
                <section className="section bg-white">
                    <div className="container">
                        {Object.entries(locationsByCity).map(([city, cityLocations]) => (
                            <div key={city} className="mb-14 last:mb-0">
                                <div className="flex items-center gap-3 mb-6">
                                    <h2 className="heading-subsection text-[#1F2933]">{city}</h2>
                                    <span className="text-sm text-[#4B5563]">({cityLocations.length} areas)</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {cityLocations.map((location) => (
                                        <Link
                                            key={location.slug}
                                            href={`/${location.slug}`}
                                            className="card-physio group flex flex-col"
                                        >
                                            <div className="w-12 h-12 rounded-xl bg-[#EEEEF7] flex items-center justify-center mb-4">
                                                <MapPin className="h-6 w-6 text-[#3B3B6D]" />
                                            </div>
                                            <h3 className="text-lg font-semibold text-[#1F2933] mb-2 group-hover:text-[#3B3B6D] transition-colors">
                                                {location.title}
                                            </h3>
                                            <p className="text-[#4B5563] text-sm leading-relaxed mb-4 line-clamp-2 flex-1">
                                                {location.metaDescription?.slice(0, 120)}
                                            </p>
                                            <span className="inline-flex items-center gap-1 text-[#E31E24] font-medium text-sm">
                                                View Details
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA Section */}
                <section className="section bg-[#2A2A57] text-white">
                    <div className="container text-center max-w-3xl">
                        <h2 className="heading-section mb-4">Don&apos;t See Your Location?</h2>
                        <p className="text-lg mb-8 opacity-90">
                            We&apos;re constantly expanding our service areas. Contact us to check if we can serve your location.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/contact-us" className="btn-primary">Contact Us</Link>
                            <Link href="/booking" className="btn-secondary">Book Appointment</Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <CTABar />
        </div>
    );
}
