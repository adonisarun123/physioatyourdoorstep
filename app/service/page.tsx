import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
    Activity, Bone, Brain, Heart, Stethoscope, Baby,
    HeartPulse, Wind, Users, Video, ArrowRight, Home, Clock, ShieldCheck,
} from "lucide-react";
import Link from "next/link";
import { getAllServices } from "@/lib/content";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Our Services | Professional Physiotherapy Treatments | Physio At Your Doorstep",
    description: "Comprehensive physiotherapy services including sports physiotherapy, post-surgical rehabilitation, neurological care, geriatric therapy, and more. Expert treatment at your home.",
    alternates: { canonical: "/service" },
    openGraph: { title: "Our Services | Physio At Your Doorstep", url: "/service", type: "website" },
};

// Icons keyed to the real service slugs from lib/content.
const serviceIcons: Record<string, typeof Activity> = {
    "orthopaedic-physiotherapy": Bone,
    "neurological-physiotherapy": Brain,
    "sports-physiotherapy": Activity,
    "geriatric-physiotherapy": Heart,
    "post-surgical-physiotherapy": Stethoscope,
    "pediatric-physiotherapy": Baby,
    "physiotherapy-in-pregnancy": HeartPulse,
    "pulmonary-physiotherapy": Wind,
    "corporate-wellness-physiotherapy-program": Users,
    "online-physiotherapy-consultation-india": Video,
};

const whyChoose = [
    {
        icon: Users,
        title: "Expert Therapists",
        description: "Qualified, experienced physiotherapists dedicated to your recovery.",
    },
    {
        icon: Heart,
        title: "Personalized Care",
        description: "Treatment plans tailored to your specific condition and goals.",
    },
    {
        icon: Home,
        title: "Home Convenience",
        description: "Professional treatment in the comfort and safety of your own home.",
    },
    {
        icon: Clock,
        title: "Same-Day Appointments",
        description: "Fast scheduling with physios on call across Bangalore and Pune.",
    },
];

export default async function ServicesPage() {
    const services = getAllServices();

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-[#EEEEF7] via-white to-[#EEEEF7] section">
                    <div className="container">
                        <div className="max-w-3xl mx-auto text-center">
                            <span className="pill bg-[#3B3B6D]/10 text-[#2A2A57] border border-[#DCDCEC]">
                                Our Services
                            </span>
                            <h1 className="heading-hero mt-6 mb-6">
                                Physiotherapy Care for <span className="text-[#E31E24]">Every Need</span>
                            </h1>
                            <p className="text-lg text-[#4B5563] leading-relaxed">
                                From sports injuries to post-surgical rehabilitation, our specialists deliver
                                expert, personalized physiotherapy right at your doorstep across Bangalore and Pune.
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-[#4B5563]">
                                <span className="inline-flex items-center gap-2">
                                    <ShieldCheck className="h-5 w-5 text-[#3B3B6D]" /> Certified specialists
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <Home className="h-5 w-5 text-[#3B3B6D]" /> Home visits
                                </span>
                                <span className="inline-flex items-center gap-2">
                                    <Clock className="h-5 w-5 text-[#3B3B6D]" /> Same-day slots
                                </span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Grid */}
                <section className="section bg-white">
                    <div className="container">
                        <div className="text-center mb-12">
                            <span className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">
                                What We Treat
                            </span>
                            <h2 className="heading-section mt-4">
                                Comprehensive <span className="text-[#3B3B6D]">Physiotherapy Services</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {services.map((service) => {
                                const Icon = serviceIcons[service.slug] ?? Activity;
                                return (
                                    <Link
                                        key={service.slug}
                                        href={`/service/${service.slug}`}
                                        className="card-physio overflow-hidden !p-0 group flex flex-col"
                                    >
                                        <div className="relative aspect-[16/10] overflow-hidden bg-[#EEEEF7]">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img
                                                src={service.heroImage ?? "/images/hero-home.webp"}
                                                alt={service.title}
                                                loading="lazy"
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />
                                            <div className="absolute bottom-3 left-3 w-11 h-11 rounded-xl bg-white shadow-md flex items-center justify-center">
                                                <Icon className="h-6 w-6 text-[#3B3B6D]" />
                                            </div>
                                        </div>
                                        <div className="p-6 flex flex-col flex-1">
                                            <h3 className="text-xl font-semibold text-[#1F2933] mb-2 group-hover:text-[#3B3B6D] transition-colors">
                                                {service.title}
                                            </h3>
                                            <p className="text-[#4B5563] mb-4 text-sm leading-relaxed line-clamp-3 flex-1">
                                                {service.metaDescription}
                                            </p>
                                            <span className="inline-flex items-center gap-1 text-[#E31E24] font-medium">
                                                Know More
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="section bg-[#EEEEF7]/50">
                    <div className="container">
                        <div className="text-center mb-12">
                            <span className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">
                                Why Choose Us
                            </span>
                            <h2 className="heading-section mt-4">
                                Professional Care, <span className="text-[#3B3B6D]">Personal Touch</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {whyChoose.map((item, index) => (
                                <div key={index} className="card-physio text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-[#EEEEF7] flex items-center justify-center mx-auto mb-4">
                                        <item.icon className="h-8 w-8 text-[#3B3B6D]" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#1F2933] mb-2">{item.title}</h3>
                                    <p className="text-[#4B5563] text-sm leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="section bg-[#2A2A57] text-white">
                    <div className="container text-center">
                        <h2 className="heading-section mb-4">Not Sure Which Service You Need?</h2>
                        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                            Contact us for a free consultation. Our experts will assess your condition and
                            recommend the best treatment plan for you.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/booking" className="btn-primary">
                                Book Consultation
                            </Link>
                            <a href="tel:+918233787737" className="btn-secondary">
                                Call +91 82337 87737
                            </a>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <CTABar />
        </div>
    );
}
