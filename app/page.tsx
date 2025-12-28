import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import {
    Activity, Award, Check, Clock, Heart, Home as HomeIcon,
    Shield, Users, Stethoscope, Phone, Zap, Target,
    Brain, HandMetal, Dumbbell, Wind, Droplet, Sparkles, MapPin
} from "lucide-react";
import Link from "next/link";
import { getAllServices } from "@/lib/db";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Best Physiotherapist in Bangalore | Physio at your Doorstep",
    description: "Physio at your Doorstep – Bangalore's trusted home physiotherapy experts. Personalized care for pain relief, recovery, and mobility, right at your doorstep",
    openGraph: {
        title: "Best Physiotherapist in Bangalore | Physio at your Doorstep",
        description: "Physio at your Doorstep – Bangalore's trusted home physiotherapy experts.",
    },
};

export default async function HomePage() {
    const services = await getAllServices();

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

    const servicesList = [
        {
            icon: Dumbbell,
            title: "Sports Physiotherapy",
            description: "Specialized care for athletes and sports injuries to enhance performance and recovery.",
        },
        {
            icon: HandMetal,
            title: "Orthopaedic Physiotherapy",
            description: "Expert treatment for musculoskeletal conditions, joint pain, and mobility issues.",
        },
        {
            icon: Brain,
            title: "Neurological Physiotherapy",
            description: "Comprehensive care for neurological conditions to improve function and quality of life.",
        },
        {
            icon: Heart,
            title: "Geriatric Physiotherapy",
            description: "Specialized care for elderly patients focusing on mobility, balance, and independence.",
        },
        {
            icon: Activity,
            title: "Post Surgical Physiotherapy",
            description: "Rehabilitation programs designed to accelerate recovery after surgical procedures.",
        },
        {
            icon: Wind,
            title: "Pulmonary Physiotherapy",
            description: "Breathing exercises and techniques to improve respiratory function and lung capacity.",
        },
    ];

    const whyChooseFeatures = {
        left: [
            "Experienced and certified physiotherapists",
            "Personalized treatment plans",
            "Convenient home-based care",
        ],
        right: [
            "Latest advancements in physical therapy",
            "Comprehensive range of services",
            "Serving multiple areas across Bangalore",
        ],
    };

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
    ];

    const stats = [
        { value: "500+", label: "Patients Treated" },
        { value: "98%", label: "Success Rate" },
        { value: "10+", label: "Years Experience" },
    ];

    const whatsappNumber = "918233787737";

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-[#EAF5F1] via-white to-[#EAF5F1] section">
                    <div className="container">
                        <div className="max-w-3xl">
                            <span className="pill bg-[#6FAF9C]/10 text-[#2E5E50] border border-[#CFE7DD]">
                                Best Physiotherapist in Bangalore
                            </span>
                            <h1 className="heading-hero mt-6 mb-6">
                                You may be anywhere <span className="text-[#4F8F7A]">our physio</span> will be there
                            </h1>
                            <p className="text-lg text-[#4B5563] mb-8 leading-relaxed">
                                Our doctors are on call 24/7. Professional physiotherapy services delivered to your home across Bangalore. Convenient, expert care for faster recovery and better health.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4">
                                <Link href="/service" className="btn-primary">
                                    Explore Services
                                </Link>
                                <Link href="/booking" className="btn-secondary">
                                    Book Appointment
                                </Link>
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
                                    <div className="w-16 h-16 rounded-2xl bg-[#EAF5F1] flex items-center justify-center mx-auto mb-4">
                                        <feature.icon className="h-8 w-8 text-[#4F8F7A]" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-[#1F2933] mb-3">{feature.title}</h3>
                                    <p className="text-[#4B5563]">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section className="section bg-[#EAF5F1]/50">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                            <div>
                                <span className="text-sm font-semibold text-[#4F8F7A] uppercase tracking-wide">About Us</span>
                                <h2 className="heading-section mt-4 mb-6">
                                    Best Physiotherapist in <span className="text-[#4F8F7A]">Bangalore at Home</span>
                                </h2>
                                <p className="text-[#4B5563] mb-6 leading-relaxed">
                                    At Physio At Your Doorstep, we bring the best Physiotherapists at your home, ensuring comfort, convenience, and effective treatment. Founded by Dr. Atharva Mishra, our platform provides specialized physiotherapy services across Bangalore, tailored to meet your unique needs.
                                </p>
                                <p className="text-[#4B5563] mb-6 leading-relaxed">
                                    We offer a wide range of treatments, including:
                                </p>
                                <div className="grid grid-cols-2 gap-4 mb-8">
                                    {aboutFeatures.map((feature, index) => (
                                        <div key={index} className="flex items-center gap-2">
                                            <div className="w-6 h-6 rounded-full bg-[#4F8F7A] flex items-center justify-center flex-shrink-0">
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
                                <div className="card-soft">
                                    <div className="text-center py-8">
                                        <div className="text-6xl font-bold text-[#4F8F7A] mb-2">10+</div>
                                        <div className="text-lg text-[#2E5E50] font-semibold">Years of Experience</div>
                                    </div>
                                </div>
                                <div className="mt-6 card-physio">
                                    <div className="flex items-center gap-4">
                                        <div className="w-16 h-16 rounded-full bg-[#EAF5F1] flex items-center justify-center">
                                            <Stethoscope className="h-8 w-8 text-[#4F8F7A]" />
                                        </div>
                                        <div>
                                            <div className="font-semibold text-[#1F2933]">Dr. Atharva Mishra</div>
                                            <div className="text-sm text-[#4B5563]">Founder & Lead Physiotherapist</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Services Section */}
                <section className="section bg-white">
                    <div className="container">
                        <div className="text-center mb-12">
                            <span className="text-sm font-semibold text-[#4F8F7A] uppercase tracking-wide">Our Services</span>
                            <h2 className="heading-section mt-4">
                                Comprehensive <span className="text-[#4F8F7A]">Physiotherapy Services</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {servicesList.map((service, index) => (
                                <div key={index} className="card-physio">
                                    <div className="w-14 h-14 rounded-xl bg-[#EAF5F1] flex items-center justify-center mb-4">
                                        <service.icon className="h-7 w-7 text-[#4F8F7A]" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-[#1F2933] mb-3">{service.title}</h3>
                                    <p className="text-[#4B5563] mb-4">{service.description}</p>
                                    <Link href="/service" className="text-[#4F8F7A] font-medium hover:underline">
                                        Learn More →
                                    </Link>
                                </div>
                            ))}
                        </div>
                        <div className="text-center mt-8">
                            <Link href="/service" className="btn-primary">
                                View All Services
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="section bg-[#EAF5F1]/50">
                    <div className="container">
                        <div className="text-center mb-12">
                            <span className="text-sm font-semibold text-[#4F8F7A] uppercase tracking-wide">Our Track Record</span>
                            <h2 className="heading-section mt-4">
                                We Empower You to Achieve <span className="text-[#4F8F7A]">Better Results</span>
                            </h2>
                            <p className="text-[#4B5563] mt-4 max-w-3xl mx-auto">
                                By leveraging the latest advancements in physical therapy, we help you move better, perform better, and focus more on what truly matters.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {stats.map((stat, index) => (
                                <div key={index} className="card-physio text-center">
                                    <div className="text-5xl font-bold text-[#4F8F7A] mb-2">{stat.value}</div>
                                    <div className="text-[#1F2933] font-medium">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="section bg-white">
                    <div className="container">
                        <div className="text-center mb-12">
                            <span className="text-sm font-semibold text-[#4F8F7A] uppercase tracking-wide">Why Choose Us</span>
                            <h2 className="heading-section mt-4">
                                Excellence In <span className="text-[#4F8F7A]">Care and Rehabilitation</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <div className="space-y-4">
                                {whyChooseFeatures.left.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl hover:bg-[#EAF5F1] transition-colors">
                                        <div className="w-6 h-6 rounded-full bg-[#4F8F7A] flex items-center justify-center flex-shrink-0 mt-1">
                                            <Check className="h-4 w-4 text-white" />
                                        </div>
                                        <span className="text-[#1F2933] font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="space-y-4">
                                {whyChooseFeatures.right.map((feature, index) => (
                                    <div key={index} className="flex items-start gap-3 p-4 rounded-xl hover:bg-[#EAF5F1] transition-colors">
                                        <div className="w-6 h-6 rounded-full bg-[#4F8F7A] flex items-center justify-center flex-shrink-0 mt-1">
                                            <Check className="h-4 w-4 text-white" />
                                        </div>
                                        <span className="text-[#1F2933] font-medium">{feature}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Serving Areas Section */}
                <section className="section bg-[#EAF5F1]/50">
                    <div className="container">
                        <div className="text-center mb-12">
                            <span className="text-sm font-semibold text-[#4F8F7A] uppercase tracking-wide">Serving Areas in Bangalore</span>
                            <h2 className="heading-section mt-4">
                                Wherever You Are, <span className="text-[#4F8F7A]">We're There</span>
                            </h2>
                            <p className="text-[#4B5563] mt-4 max-w-3xl mx-auto">
                                We proudly serve several areas across Bangalore. Expert physiotherapy care is just a call away.
                            </p>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                            {servingAreas.map((area, index) => (
                                <div key={index} className="card-physio text-center hover:bg-[#EAF5F1] cursor-pointer">
                                    <div className="w-12 h-12 rounded-full bg-[#EAF5F1] flex items-center justify-center mx-auto mb-3">
                                        <MapPin className="h-6 w-6 text-[#4F8F7A]" />
                                    </div>
                                    <div className="text-sm font-medium text-[#1F2933]">{area}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="section bg-[#2E5E50] text-white">
                    <div className="container text-center">
                        <h2 className="heading-section mb-4">Ready to Start Your Recovery?</h2>
                        <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
                            Book your first session today and experience professional physiotherapy in the comfort of your home
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/booking" className="btn-primary">
                                Book Now
                            </Link>
                            <Link href="/contact-us" className="btn-secondary">
                                Contact Us
                            </Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <CTABar />
        </div>
    );
}
