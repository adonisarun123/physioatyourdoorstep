import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import { Award, Heart, Target, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Professional Home Physiotherapy Services | Physio At Your Doorstep",
    description: "Learn about Physio At Your Doorstep - your trusted partner for professional home physiotherapy services. Expert care, convenient service, proven results.",
    alternates: { canonical: "/about-us" },
    openGraph: { title: "About Us | Physio At Your Doorstep", url: "/about-us", type: "website" },
};

const values = [
    {
        icon: Award,
        title: "Excellence",
        description: "We maintain the highest standards of professional care and continuously update our skills with the latest evidence-based practices.",
    },
    {
        icon: Heart,
        title: "Compassion",
        description: "We treat every patient with empathy, respect, and genuine care, understanding that healing involves both body and mind.",
    },
    {
        icon: Users,
        title: "Integrity",
        description: "We operate with complete transparency, honesty, and ethical practices in all our interactions and treatments.",
    },
];

export default function AboutUsPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-br from-[#EEEEF7] via-white to-[#EEEEF7] section">
                    <div className="container">
                        <div className="max-w-3xl mx-auto text-center">
                            <span className="pill bg-[#3B3B6D]/10 text-[#2A2A57] border border-[#DCDCEC]">
                                About Us
                            </span>
                            <h1 className="heading-hero mt-6 mb-6">
                                Care That Comes <span className="text-[#E31E24]">to You</span>
                            </h1>
                            <p className="text-lg text-[#4B5563] leading-relaxed">
                                Bringing professional physiotherapy to your doorstep with expertise, compassion, and convenience.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Mission & Vision */}
                <section className="section bg-white">
                    <div className="container">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                            <div className="card-physio">
                                <div className="w-12 h-12 rounded-xl bg-[#EEEEF7] flex items-center justify-center mb-4">
                                    <Target className="h-6 w-6 text-[#3B3B6D]" />
                                </div>
                                <h2 className="heading-subsection text-[#1F2933] mb-4">Our Mission</h2>
                                <p className="text-[#4B5563] leading-relaxed">
                                    To provide accessible, high-quality physiotherapy services at your doorstep, making
                                    professional healthcare convenient and effective for everyone. We believe that recovery
                                    should not be hindered by travel or accessibility challenges.
                                </p>
                            </div>

                            <div className="card-physio">
                                <div className="w-12 h-12 rounded-xl bg-[#EEEEF7] flex items-center justify-center mb-4">
                                    <Heart className="h-6 w-6 text-[#E31E24]" />
                                </div>
                                <h2 className="heading-subsection text-[#1F2933] mb-4">Our Vision</h2>
                                <p className="text-[#4B5563] leading-relaxed">
                                    To become the most trusted name in home-based physiotherapy across India, setting new
                                    standards for quality, convenience, and patient-centered care — a future where everyone
                                    has access to expert physiotherapy in their comfort zone.
                                </p>
                            </div>
                        </div>

                        {/* Story Section */}
                        <div className="max-w-4xl mx-auto mb-16">
                            <h2 className="heading-section text-[#1F2933] mb-6 text-center">Our Story</h2>
                            <div className="space-y-5 text-[#4B5563] text-lg leading-relaxed">
                                <p>
                                    Physio At Your Doorstep was founded with a simple yet powerful vision: to make
                                    professional physiotherapy accessible to everyone, regardless of their mobility or
                                    location constraints. We recognized that many patients struggle to visit clinics due to
                                    pain, transportation issues, or busy schedules.
                                </p>
                                <p>
                                    Our team of experienced physiotherapists brings years of clinical expertise directly to
                                    your home, equipped with modern equipment and evidence-based treatment protocols. We
                                    serve patients across Bangalore and Pune, treating a wide range of conditions from sports
                                    injuries to post-surgical rehabilitation, neurological conditions to geriatric care.
                                </p>
                                <p>
                                    What sets us apart is our commitment to personalized care. Every treatment plan is
                                    tailored to your specific needs, lifestyle, and recovery goals. We empower our patients
                                    through education, ensuring they understand their condition and actively participate in
                                    their recovery journey.
                                </p>
                            </div>
                        </div>

                        {/* Values */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {values.map((v) => (
                                <div key={v.title} className="card-physio text-center">
                                    <div className="w-14 h-14 rounded-2xl bg-[#EEEEF7] flex items-center justify-center mb-4 mx-auto">
                                        <v.icon className="h-7 w-7 text-[#3B3B6D]" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-[#1F2933] mb-2">{v.title}</h3>
                                    <p className="text-[#4B5563] text-sm leading-relaxed">{v.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="section bg-[#2A2A57] text-white">
                    <div className="container text-center max-w-3xl">
                        <h2 className="heading-section mb-4">Experience the Difference</h2>
                        <p className="text-lg mb-8 opacity-90">
                            Join hundreds of satisfied patients who have experienced professional physiotherapy at their doorstep.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/booking" className="btn-primary">Book Appointment</Link>
                            <Link href="/contact-us" className="btn-secondary">Contact Us</Link>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
            <CTABar />
        </div>
    );
}
