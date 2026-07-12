import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import GoogleReviews from "@/components/GoogleReviews";
import YouTubeSection from "@/components/YouTubeSection";
import { ServiceFAQ } from "@/components/ServiceFAQ";
import JsonLd from "@/components/JsonLd";
import { faqSchema } from "@/lib/seo";
import {
    Check, Heart, Users, Stethoscope, Phone, Zap, MapPin, Star, ArrowRight,
    Activity, Bone, Brain, Baby, HeartPulse, Wind, Video,
} from "lucide-react";
import Link from "next/link";
import BlogCard from "@/components/BlogCard";
import { getAllServices, getAllBlogs } from "@/lib/content";
import { SITE } from "@/lib/seo";
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
    alternates: { canonical: "/" },
    openGraph: {
        title: "Best Physiotherapist in Bangalore | Physio at your Doorstep",
        description: "Physio at your Doorstep – Bangalore's trusted home physiotherapy experts.",
        url: "/",
        type: "website", images: ["/images/logo-square.webp"],
    },
};

export default async function HomePage() {
    const services = getAllServices();
    const featuredServices = services.slice(0, 6);
    const latestBlogs = getAllBlogs().slice(0, 3);

    const doctors = [
        {
            name: "Dr. Atharva Mishra",
            role: "Founder & Chief Physiotherapist — Bangalore",
            image: "/images/about-dr-atharva-mishra.webp",
            highlights: "BPT, MPT (Sports) · ACL & Post-Surgical Rehab · Sports Injuries · Manual Therapy",
        },
        {
            name: "Dr. Manasvi Kanjolia",
            role: "Chief Physiotherapist — Pune",
            image: "/images/about-dr-manasvi-kanjolia.jpg",
            highlights: "BPT · Post-Surgical, Neurological, Musculoskeletal & Orthopaedic Rehab",
        },
    ];

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

    const journeySteps = [
        {
            icon: "/images/step-connect.png",
            title: "Tell Us Your Problem",
            description: "Call or WhatsApp us and describe your pain, condition, and location — it takes less than a minute.",
        },
        {
            icon: "/images/step-calendar.png",
            title: "Get Matched With the Right Physio",
            description: "We assign the physiotherapist best suited to your condition, who contacts you to fix a convenient slot.",
        },
        {
            icon: "/images/step-confirmation.png",
            title: "Start Recovery at Home",
            description: "Your physiotherapist arrives at your doorstep at the scheduled time and your recovery begins.",
        },
    ];

    const faqs = [
        {
            question: "Do you really provide physiotherapy at home?",
            answer: "Yes. Our certified physiotherapists come to your home, office, or any location of your choice across Bangalore and Pune, with all the equipment needed for your session.",
        },
        {
            question: "Which areas do you serve?",
            answer: "We serve 40+ areas across Bangalore (Koramangala, HSR Layout, Whitefield, Indiranagar, JP Nagar, Electronic City and more) and Pune (Baner, Wakad, Hinjewadi, Kothrud and more).",
        },
        {
            question: "How do I book an appointment?",
            answer: "Call or WhatsApp us at +91 82337 87737, or fill the booking form on this website. We confirm your slot the same day and match you with the right specialist.",
        },
        {
            question: "Do you provide same-day visits?",
            answer: "Yes. We offer same-day home visits across Bangalore and Pune, subject to physiotherapist availability in your area. Call or WhatsApp us at +91 82337 87737 and we will do our best to start your treatment the very same day — urgent visits can also be arranged.",
        },
        {
            question: "Do you treat elderly patients?",
            answer: "Yes. Geriatric physiotherapy is one of our core services. Our physiotherapists are experienced in treating arthritis, joint pain, balance problems, post-stroke recovery, Parkinson's, and age-related mobility issues — with gentle, home-based sessions designed around each senior's comfort and pace.",
        },
        {
            question: "Are your physiotherapists qualified?",
            answer: "Yes. Every physiotherapist on our team holds at least a Bachelor of Physiotherapy (BPT) degree, and our senior team holds postgraduate specializations. Our founder, Dr. Atharva Mishra, is a Masters in Sports Physiotherapy.",
        },
        {
            question: "What conditions do you treat?",
            answer: "Back and neck pain, sports injuries, post-surgical rehabilitation, neurological conditions like stroke and Parkinson's, arthritis and geriatric care, pediatric conditions, pregnancy-related pain, and respiratory conditions.",
        },
        {
            question: "Are you available on weekends and at night?",
            answer: "Yes — we are available 24×7, all days of the week, including weekends and public holidays. Emergency home visits can also be arranged.",
        },
        {
            question: "Do you issue invoices?",
            answer: "Yes. We issue a proper invoice for every session or treatment package, which you can use for reimbursement or insurance claims where your policy covers physiotherapy. Just ask your physiotherapist or message us on WhatsApp for a copy.",
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
        { value: "2000+", label: "Patients Treated" },
        { value: "10000+", label: "Home Sessions Delivered" },
        { value: "98%", label: "Success Rate" },
        { value: "40+", label: "Areas Served" },
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
                                <h1 className="heading-hero mt-4 mb-4">
                                    You may be anywhere,<br />
                                    <span className="text-[#3B3B6D]">our physio</span> will be there
                                </h1>
                                <p className="tagline mb-4">&ldquo;{SITE.tagline}&rdquo;</p>
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
                                        <span className="text-sm font-medium text-[#1F2933]">Trusted by 2000+ patients</span>
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

                {/* Trust Bar */}
                <section className="bg-gradient-to-r from-[#3B3B6D] to-[#2A2A57] text-white py-8">
                    <div className="container">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:divide-x divide-white/15 text-center">
                            {stats.map((stat, index) => (
                                <div key={index}>
                                    <div className="text-3xl md:text-4xl font-bold">{stat.value}</div>
                                    <div className="text-sm opacity-90 font-medium mt-1">{stat.label}</div>
                                </div>
                            ))}
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

                {/* Patient Journey */}
                <section className="section bg-white">
                    <div className="container">
                        <div className="text-center mb-12">
                            <span className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">Patient Journey</span>
                            <h2 className="heading-section mt-4">
                                Your Recovery in <span className="text-[#3B3B6D]">3 Simple Steps</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {journeySteps.map((step, index) => (
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

                {/* Meet Our Experts */}
                <section className="section bg-[#EEEEF7]/50">
                    <div className="container">
                        <div className="text-center mb-12">
                            <span className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">Meet Our Experts</span>
                            <h2 className="heading-section mt-4">
                                The Doctors Behind <span className="text-[#3B3B6D]">Your Recovery</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {doctors.map((doc) => (
                                <Link key={doc.name} href="/about-us" className="card-physio !p-0 overflow-hidden group flex flex-col">
                                    <div className="aspect-[4/3] overflow-hidden bg-[#EEEEF7]">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img
                                            src={doc.image}
                                            alt={doc.name}
                                            loading="lazy"
                                            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-105"
                                        />
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-xl font-semibold text-[#1F2933] group-hover:text-[#3B3B6D] transition-colors">{doc.name}</h3>
                                        <div className="text-sm font-medium text-[#E31E24] mt-1 mb-3">{doc.role}</div>
                                        <p className="text-sm text-[#4B5563] leading-relaxed">{doc.highlights}</p>
                                        <span className="inline-flex items-center gap-1 text-[#3B3B6D] font-medium mt-4 text-sm">
                                            Know More <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="section bg-white">
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

                {/* Google Reviews */}
                <section className="section bg-white">
                    <div className="container">
                        <div className="text-center mb-12">
                            <span className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">Google Reviews</span>
                            <h2 className="heading-section mt-4">
                                What Our <span className="text-[#3B3B6D]">Patients Say</span>
                            </h2>
                        </div>
                        <GoogleReviews />
                    </div>
                </section>

                {/* YouTube Videos */}
                <section className="section bg-gradient-to-br from-[#2A2A57] to-[#23234A] text-white">
                    <div className="container">
                        <div className="text-center mb-12">
                            <span className="text-sm font-semibold text-[#FF6B6E] uppercase tracking-wide">Recovery Stories</span>
                            <h2 className="heading-section mt-4 text-white">
                                Watch Real <span className="text-[#F5A623]">Patient Journeys</span>
                            </h2>
                            <p className="mt-4 max-w-3xl mx-auto opacity-90">
                                Real recoveries, documented on our YouTube channel — from post-surgery rehab to getting back in the game.
                            </p>
                        </div>
                        <YouTubeSection />
                    </div>
                </section>

                {/* FAQ */}
                <section className="section bg-[#EEEEF7]/50">
                    <div className="container max-w-4xl">
                        <div className="text-center mb-12">
                            <span className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">FAQ</span>
                            <h2 className="heading-section mt-4">
                                Frequently Asked <span className="text-[#3B3B6D]">Questions</span>
                            </h2>
                        </div>
                        <ServiceFAQ faqs={faqs} />
                    </div>
                </section>

                {/* Serving Areas Section */}
                <section className="section bg-white">
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

                {/* From Our Blog */}
                <section className="section bg-[#EEEEF7]/50">
                    <div className="container">
                        <div className="text-center mb-12">
                            <span className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">Our Blog</span>
                            <h2 className="heading-section mt-4">
                                Health Tips &amp; <span className="text-[#3B3B6D]">Insights</span>
                            </h2>
                            <p className="text-[#4B5563] mt-4 max-w-3xl mx-auto">
                                Expert advice from our physiotherapists to help you stay pain-free and recover faster.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {latestBlogs.map((blog) => (
                                <BlogCard key={blog.slug} blog={blog} />
                            ))}
                        </div>
                        <div className="text-center mt-10">
                            <Link href="/blogs" className="btn-secondary">View All Articles</Link>
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

            <JsonLd data={[faqSchema(faqs.map((f) => ({ q: f.question, a: f.answer })))]} />

            <Footer />
            <CTABar />
        </div>
    );
}
