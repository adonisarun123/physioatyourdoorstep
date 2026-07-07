import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import {
    Check, Heart, Users, Stethoscope, Phone, Zap, MapPin, Star, ArrowRight,
    Activity, Bone, Brain, Baby, HeartPulse, Wind, Video,
} from "lucide-react";
import Link from "next/link";
import { getAllServices } from "@/lib/content";
import type { Metadata } from "next";

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

export const metadata: Metadata = {
    title: "Best Physiotherapist in Bangalore | Physio at your Doorstep",
    description: "Physio at your Doorstep – Bangalore's trusted home physiotherapy experts. Personalized care for pain relief, recovery, and mobility, right at your doorstep",
    openGraph: {
        title: "Best Physiotherapist in Bangalore | Physio at your Doorstep",
        description: "Physio at your Doorstep – Bangalore's trusted home physiotherapy experts.",
    },
};

export default async function HomePage() {
    const services = getAllServices();
    const featuredServices = services.slice(0, 6);

    const featureHighlights = [
        {
            icon: Users,
            title: "Expert Therapists",
            description: "Certified physiotherapists with proven expertise in various specializations.",
        },
        {
            icon: Zap,
            title: "24/7 Availability",
            description: "Our doctors are on call 24/7. You may be anywhere, our physio will be there.",
        },
        {
            icon: Heart,
            title: "Personalized Care",
            description: "Tailored treatment plans designed to meet your unique recovery needs.",
        },
    ];

    const aboutFeatures = [
        "Orthopedic Physiotherapy",
        "Neurological Physiotherapy",
        "Pregnancy Physiotherapy",
        "Sports Physiotherapy",
    ];

    const bookingSteps = [
        {
            icon: "/images/step-connect.png",
            title: "Connect",
            description: "Call or WhatsApp us with your location and requirements.",
        },
        {
            icon: "/images/step-calendar.png",
            title: "Appointment",
            description: "We appoint the best suited physiotherapist for your needs. The physio contacts you to arrange a convenient time slot.",
        },
        {
            icon: "/images/step-confirmation.png",
            title: "Confirmed",
            description: "Confirmed! Your physiotherapist arrives at your doorstep at the scheduled time.",
        },
    ];

    const whyChooseFeatures = [
        "Experienced and certified physiotherapists",
        "Personalized treatment plans",
        "Convenient home-based care",
        "Latest advancements in physical therapy",
        "Same day appointments",
        "Serving Bangalore and Pune",
    ];

    const testimonials = [
        {
            quote: "Loved the way the doctor handled the issue and understood the problem. Being a sportsperson, I regularly face tissue pains and Dr. Atharva helps me get over them — it's not medicine he prefers, it's the exercises that help me recover faster.",
            name: "Prateek Mathur",
            role: "Computer Engineer, Accenture",
        },
        {
            quote: "Dr. Atharva Mishra helped me with physio after my MPFL surgery. He is very helpful and encouraging, which helped me recover fast. Within a week of physio I gained a lot of improvement in my knee. Strongly recommended!",
            name: "Pavithra",
            role: "MBA Scholar",
        },
        {
            quote: "I was suffering from severe back pain from the early stage of my pregnancy. Dr. Atharva came to my home for the treatment along with simple exercises, and was so friendly and worked around my convenience. Thank you doctor!",
            name: "Leela S",
            role: "Homemaker",
        },
    ];

    const servingAreas = [
        "JP Nagar",
        "BTM Layout",
        "Jayanagar",
        "Koramangala",
        "HSR Layout",
        "Whitefield",
        "Bellandur",
        "Marathahalli",
        "Indiranagar",
        "Electronic City",
    ];

    const stats = [
        { value: "500+", label: "Patients Treated" },
        { value: "98%", label: "Success Rate" },
        { value: "10+", label: "Years Experience" },
    ];

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-[#EEEEF7] via-white to-[#EEEEF7] section">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="pill bg-[#3B3B6D]/10 text-[#2A2A57] border border-[#DCDCEC]">
                                    Best Physiotherapist in Bangalore
                                </span>
                                <h1 className="heading-hero mt-6 mb-6">
                                    You may be anywhere, <span className="text-[#E31E24]">our physio</span> will be there
                                </h1>
                                <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                                    Our doctors are on call 24/7. Professional physiotherapy delivered to your home across Bangalore and Pune — convenient, expert care for faster recovery and better health.
                                </p>
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <Link href="/booking" className="btn-primary">
                                        Book an Appointment
                                    </Link>
                                    <Link href="/service" className="btn-secondary">
                                        Explore Services
                                    </Link>
                                </div>
                                {/* Trust strip */}
                                <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
                                    <div className="flex items-center gap-2">
                                        <div className="flex">
                                            {[...Array(5)].map((_, i) => (
                                                <Star key={i} className="h-4 w-4 fill-[#F5A623] text-[#F5A623]" />
                                            ))}
                                        </div>
                                        <span className="text-sm font-medium text-[#1F2933]">Trusted by 500+ patients</span>
                                    </div>
                                    <div className="h-8 w-px bg-[#DCDCEC] hidden sm:block" />
                                    <div className="flex items-center gap-2 text-sm text-[#4B5563]">
                                        <Check className="h-4 w-4 text-[#3B3B6D]" />
                                        <span>10+ years experience</span>
                                    </div>
                                </div>
                            </div>
                            <div className="relative hidden lg:block">
                                <div className="img-frame shadow-float">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/images/hero-home.webp"
                                        alt="Physiotherapist helping a patient with rehabilitation at home"
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                                <a href="tel:+918233787737" className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-float block">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-full bg-[#E31E24] flex items-center justify-center">
                                            <Phone className="h-6 w-6 text-white" />
                                        </div>
                                        <div>
                                            <div className="text-sm text-[#4B5563]">24/7 Available</div>
                                            <div className="font-semibold text-[#1F2933]">+91 82337 87737</div>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Feature Highlights */}
                <section className="section bg-white">
                    <div className="container">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {featureHighlights.map((feature, index) => (
                                <div key={index} className="card-physio text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-[#EEEEF7] flex items-center justify-center mx-auto mb-4">
                                        <feature.icon className="h-8 w-8 text-[#3B3B6D]" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-[#1F2933] mb-3">{feature.title}</h3>
                                    <p className="text-[#4B5563]">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="section bg-[#EEEEF7]/50">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">About Us</span>
                                <h2 className="heading-section mt-4 mb-6">
                                    Best Physiotherapist in <span className="text-[#3B3B6D]">Bangalore at Home</span>
                                </h2>
                                <p className="text-[#4B5563] mb-6 leading-relaxed">
                                    At Physio At Your Doorstep, we bring the best Physiotherapists to your home, ensuring comfort, convenience, and effective treatment. Founded by Dr. Atharva Mishra, our platform provides specialized physiotherapy services across Bangalore and Pune, tailored to meet your unique needs.
                                </p>
                                <p className="text-[#4B5563] mb-6 leading-relaxed">
                                    We offer a wide range of treatments, including:
                                </p>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                                    {aboutFeatures.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-[#3B3B6D] flex items-center justify-center flex-shrink-0">
                                                <Check className="h-4 w-4 text-white" />
                                            </div>
                                            <span className="text-[#1F2933] font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                                <Link href="/about-us" className="btn-primary">
                                    Learn More About Us
                                </Link>
                            </div>
                            <div className="relative">
                                <div className="img-frame shadow-soft">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/images/about-hero.webp"
                                        alt="Physiotherapy exercise session"
                                        loading="lazy"
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                                <div className="mt-6 card-physio">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-full bg-[#EEEEF7] flex items-center justify-center">
                                            <Stethoscope className="h-8 w-8 text-[#3B3B6D]" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-[#1F2933]">Dr. Atharva Mishra</div>
                                            <div className="text-sm text-[#4B5563]">Founder &amp; Lead Physiotherapist</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 3 Steps to Book */}
                <section className="section bg-white">
                    <div className="container">
                        <div className="text-center mb-12">
                            <span className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">How It Works</span>
                            <h2 className="heading-section mt-4">
                                3 Steps to <span className="text-[#3B3B6D]">Book</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {bookingSteps.map((step, index) => (
                                <div key={index} className="card-physio text-center relative">
                                    <div className="absolute top-4 right-6 text-5xl font-bold text-[#EEEEF7]">{index + 1}</div>
                                    <div className="w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={step.icon} alt={step.title} className="w-16 h-16 object-contain" loading="lazy" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-[#1F2933] mb-3">{step.title}</h3>
                                    <p className="text-[#4B5563]">{step.description}</p>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-10">
                            <Link href="/booking" className="btn-primary">Book an Appointment</Link>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="section bg-[#EEEEF7]/50">
                    <div className="container">
                        <div className="text-center mb-12">
                            <span className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">Our Services</span>
                            <h2 className="heading-section mt-4">
                                Comprehensive <span className="text-[#3B3B6D]">Physiotherapy Services</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {featuredServices.map((service) => {
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
                                            <p className="text-[#4B5563] mb-4 text-sm leading-relaxed flex-1">{service.metaDescription}</p>
                                            <span className="inline-flex items-center gap-1 text-[#E31E24] font-medium">
                                                Know More
                                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                            </span>
                                        </div>
                                    </Link>
                                );
                            })}
                        </div>
                        <div className="text-center mt-10">
                            <Link href="/service" className="btn-secondary">
                                View All {services.length} Services
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="section bg-white">
                    <div className="container">
                        <div className="rounded-3xl bg-gradient-to-br from-[#3B3B6D] to-[#2A2A57] px-8 py-14 md:px-16 md:py-16 text-white shadow-float">
                            <div className="text-center mb-12">
                                <span className="text-sm font-semibold text-[#F5A623] uppercase tracking-wide">Our Track Record</span>
                                <h2 className="heading-section mt-4">
                                    We Empower You to Achieve Better Results
                                </h2>
                                <p className="opacity-85 mt-4 max-w-3xl mx-auto">
                                    By leveraging the latest advancements in physical therapy, we help you move better, perform better, and focus more on what truly matters.
                                </p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/15">
                                {stats.map((stat, index) => (
                                    <div key={index} className="text-center pt-8 first:pt-0 md:pt-0">
                                        <div className="text-5xl md:text-6xl font-bold mb-2">{stat.value}</div>
                                        <div className="opacity-90 font-medium">{stat.label}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="section bg-[#EEEEF7]/50">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div className="img-frame shadow-soft order-2 lg:order-1">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/images/why-choose-us.webp"
                                    alt="Woman in a physical rehabilitation session"
                                    loading="lazy"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div className="order-1 lg:order-2">
                                <span className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">Why Choose Us</span>
                                <h2 className="heading-section mt-4 mb-8">
                                    Excellence In <span className="text-[#3B3B6D]">Care and Rehabilitation</span>
                                </h2>
                                <div className="space-y-4">
                                    {whyChooseFeatures.map((feature, index) => (
                                        <div key={index} className="flex items-start gap-3 p-3 rounded-xl hover:bg-white transition-colors">
                                            <div className="w-6 h-6 rounded-full bg-[#3B3B6D] flex items-center justify-center flex-shrink-0 mt-1">
                                                <Check className="h-4 w-4 text-white" />
                                            </div>
                                            <span className="text-[#1F2933] font-medium">{feature}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="section bg-white">
                    <div className="container">
                        <div className="text-center mb-12">
                            <span className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">Testimonials</span>
                            <h2 className="heading-section mt-4">
                                What Our <span className="text-[#3B3B6D]">Patients Say</span>
                            </h2>
                        </div>
                        <TestimonialsCarousel testimonials={testimonials} />
                    </div>
                </section>

                {/* Serving Areas Section */}
                <section className="section bg-[#EEEEF7]/50">
                    <div className="container">
                        <div className="text-center mb-12">
                            <span className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">Serving Areas</span>
                            <h2 className="heading-section mt-4">
                                Wherever You Are, <span className="text-[#3B3B6D]">We&apos;re There</span>
                            </h2>
                            <p className="text-[#4B5563] mt-4 max-w-3xl mx-auto">
                                We proudly serve areas across Bangalore and Pune. Expert physiotherapy care is just a call away.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {servingAreas.map((area, index) => (
                                <Link key={index} href="/locations" className="card-physio text-center hover:bg-white block">
                                    <div className="w-12 h-12 rounded-full bg-[#EEEEF7] flex items-center justify-center mx-auto mb-3">
                                        <MapPin className="h-6 w-6 text-[#3B3B6D]" />
                                    </div>
                                    <div className="text-sm font-medium text-[#1F2933]">{area}</div>
                                </Link>
                            ))}
                        </div>
                        <div className="text-center mt-10">
                            <Link href="/locations" className="btn-secondary">View All Locations</Link>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="section bg-[#2A2A57] text-white">
                    <div className="container text-center">
                        <h2 className="heading-section mb-4">Ready to Start Your Recovery?</h2>
                        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                            Book your first session today and experience professional physiotherapy in the comfort of your home
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/booking" className="btn-primary">
                                Book Now
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
