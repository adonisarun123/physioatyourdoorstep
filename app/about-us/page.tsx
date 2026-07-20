import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Link from "next/link";
import { Award, Heart, Target, Users, GraduationCap, Stethoscope, BadgeCheck, HandHeart } from "lucide-react";
import { SITE } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | Meet Dr. Atharva Mishra & Dr. Manasvi Kanjolia",
    description: "Meet the expert physiotherapists behind Physio At Your Doorstep — Dr. Atharva Mishra (Bangalore) and Dr. Manasvi Kanjolia (Pune). Professional home physiotherapy, available 24×7.",
    alternates: { canonical: "/about-us" },
    openGraph: { title: "About Us | Physio At Your Doorstep", url: "/about-us", type: "website", images: ["/images/logo-square.webp"], },
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

const whyChooseUs = [
    {
        icon: "/images/about-icon-convenience.png",
        title: "Convenience",
        description: "We bring expert physiotherapists directly to you — at home, at work, or any location of your choice.",
    },
    {
        icon: "/images/about-icon-save-time.png",
        title: "Save Money & Time",
        description: "Schedule your appointment at your convenience with no stress of travelling and waiting.",
    },
    {
        icon: "/images/about-icon-holistic-healing.png",
        title: "Holistic Healing",
        description: "We focus on overall wellness — recovering from injury while improving long-term physical health and mobility.",
    },
    {
        icon: "/images/about-icon-individualized-care.png",
        title: "Individualized Care",
        description: "Every patient is different. You get a personalized care plan that caters to your specific needs.",
    },
    {
        icon: "/images/about-icon-patient-centric.png",
        title: "Patient-Centric Approach",
        description: "We build a therapeutic relationship with you and your family through effective communication for better outcomes.",
    },
];

const atharvaSpecialties = [
    "ACL Rehabilitation",
    "Post-Surgical Physiotherapy",
    "Post-Operative Stiffness",
    "Sports Injuries",
    "Shoulder Rehabilitation",
    "Manual Therapy & Mobilization",
    "Stroke Rehabilitation",
    "Vestibular Rehabilitation",
    "Spinal Manipulation",
];

const manasviSpecialties = [
    "Post-Surgical Rehabilitation",
    "Neurological Rehabilitation",
    "Musculoskeletal Physiotherapy",
    "Orthopaedic Rehabilitation",
    "Pain Management",
    "Mobility Restoration",
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
                            <h1 className="heading-hero mt-4 mb-4 whitespace-nowrap max-[420px]:whitespace-normal">
                                Care that comes <span className="text-[#3B3B6D]">to you</span>
                            </h1>
                            <p className="tagline mb-4">&ldquo;{SITE.tagline}&rdquo;</p>
                            <p className="text-lg text-[#4B5563] leading-relaxed">
                                Bringing professional physiotherapy to your doorstep across Bangalore and Pune — with
                                expertise, compassion, and convenience, 24×7.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Story + Image */}
                <section className="section bg-white">
                    <div className="container">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
                            <div className="img-frame shadow-soft">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src="/images/about-hero.webp"
                                    alt="Physiotherapist treating a patient at home"
                                    className="w-full h-auto object-cover"
                                />
                            </div>
                            <div>
                                <span className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">Our Story</span>
                                <h2 className="heading-section mt-4 mb-6 text-[#1F2933]">
                                    Best Physiotherapists in <span className="text-[#3B3B6D]">Bangalore &amp; Pune, at Home</span>
                                </h2>
                                <div className="space-y-4 text-[#4B5563] leading-relaxed">
                                    <p>
                                        Welcome to <strong>Physio at Your Doorstep</strong>, where we believe in making
                                        high-quality physiotherapy accessible, convenient, and tailored to your unique
                                        needs. Founded by <strong>Dr. Atharva Mishra</strong>, our mission is to bring
                                        personalized, professional care directly to your home.
                                    </p>
                                    <p>
                                        Whether you&apos;re recovering from surgery, managing chronic pain, or looking to
                                        improve mobility, our team brings expertise, modern equipment, and evidence-based
                                        treatment protocols to every session — so you can move better, feel better, and
                                        live better.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Mission & Vision */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                <div className="w-12 h-12 rounded-xl bg-[#FDECEC] flex items-center justify-center mb-4">
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
                    </div>
                </section>

                {/* Why Choose Us */}
                <section className="section bg-[#EEEEF7]/50">
                    <div className="container">
                        <div className="text-center mb-12">
                            <span className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">Why Choose Us</span>
                            <h2 className="heading-section mt-4 text-[#1F2933]">
                                We Are Committed to <span className="text-[#3B3B6D]">Your Health</span>
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {whyChooseUs.map((item) => (
                                <div key={item.title} className="card-physio text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-[#EEEEF7] flex items-center justify-center mx-auto mb-4">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src={item.icon} alt={item.title} className="w-9 h-9 object-contain" loading="lazy" />
                                    </div>
                                    <h3 className="text-xl font-semibold text-[#1F2933] mb-2">{item.title}</h3>
                                    <p className="text-[#4B5563] text-sm leading-relaxed">{item.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Meet Our Doctors */}
                <section className="section bg-white">
                    <div className="container">
                        <div className="text-center mb-12">
                            <span className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">Our Team</span>
                            <h2 className="heading-section mt-4 text-[#1F2933]">
                                Meet Our <span className="text-[#3B3B6D]">Expert Physiotherapists</span>
                            </h2>
                        </div>

                        {/* Dr. Atharva Mishra */}
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start mb-16">
                            <div className="lg:col-span-2">
                                <div className="img-frame shadow-soft sticky top-28">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/images/about-dr-atharva-mishra.webp"
                                        alt="Dr. Atharva Mishra — Founder & Chief Physiotherapist, Physio At Your Doorstep"
                                        className="w-full h-auto object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                            <div className="lg:col-span-3">
                                <h3 className="text-2xl md:text-3xl font-bold text-[#1F2933]">Dr. Atharva Mishra</h3>
                                <div className="text-[#E31E24] font-semibold mt-1 mb-5">
                                    Founder &amp; Chief Physiotherapist — Bangalore
                                </div>
                                <div className="space-y-4 text-[#4B5563] leading-relaxed">
                                    <p>
                                        Dr. Atharva Mishra is the Founder and Chief Physiotherapist at Physio At Your
                                        Doorstep. He is passionate about helping people come out of long-standing pain —
                                        his philosophy is that people are more fulfilled and happy, both professionally
                                        and personally, when they are free of pain.
                                    </p>
                                    <div className="card-soft !p-5">
                                        <div className="flex items-center gap-2 font-semibold text-[#1F2933] mb-2">
                                            <GraduationCap className="h-5 w-5 text-[#3B3B6D]" /> Credentials &amp; Qualifications
                                        </div>
                                        <p className="text-sm">
                                            Bachelor of Physiotherapy (BPT), Govt. Physiotherapy College, Jodhpur (RUHS) ·
                                            Masters in Sports Physiotherapy, Jaipur Physiotherapy College (MVGU) ·
                                            Certified in Dry Needling (DNT), Kinesiotaping (KTP), Kinetic Chain Activation
                                            Technique (KCAT) and BFRT.
                                        </p>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 font-semibold text-[#1F2933] mb-3">
                                            <Stethoscope className="h-5 w-5 text-[#3B3B6D]" /> Specializations
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {atharvaSpecialties.map((sp) => (
                                                <span key={sp} className="pill bg-[#EEEEF7] text-[#2A2A57] !py-1.5 !px-3 text-xs font-medium">
                                                    {sp}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <BadgeCheck className="h-5 w-5 text-[#3B3B6D] flex-shrink-0 mt-0.5" />
                                        <span>
                                            Active member of the Rajasthan Physiotherapy Association (RPA) and the NGO
                                            ASHRAYE — An Initiative by Physios.
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dr. Manasvi Kanjolia */}
                        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 items-start">
                            <div className="lg:col-span-2 lg:order-2">
                                <div className="img-frame shadow-soft sticky top-28">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    <img
                                        src="/images/about-dr-manasvi-kanjolia.jpg"
                                        alt="Dr. Manasvi Kanjolia — Chief Physiotherapist (Pune), Physio At Your Doorstep"
                                        className="w-full h-auto object-cover"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                            <div className="lg:col-span-3 lg:order-1">
                                <h3 className="text-2xl md:text-3xl font-bold text-[#1F2933]">Dr. Manasvi Kanjolia</h3>
                                <div className="text-[#E31E24] font-semibold mt-1 mb-5">
                                    Chief Physiotherapist — Pune
                                </div>
                                <div className="space-y-4 text-[#4B5563] leading-relaxed">
                                    <p>
                                        Dr. Manasvi Kanjolia is the Chief Physiotherapist for the Pune region at Physio At
                                        Your Doorstep. She holds a Bachelor&apos;s degree in Physiotherapy (B.P.T.) and brings
                                        extensive expertise in post-surgical, neurological, musculoskeletal, and orthopaedic
                                        rehabilitation.
                                    </p>
                                    <p>
                                        Known for her patient-centered approach, Dr. Manasvi focuses on restoring mobility,
                                        managing pain, and enhancing overall quality of life through evidence-based
                                        physiotherapy. Her strength lies in designing personalized treatment plans that
                                        deliver measurable and lasting results — helping every patient regain independence
                                        and confidence in movement, in the comfort of their own home.
                                    </p>
                                    <div>
                                        <div className="flex items-center gap-2 font-semibold text-[#1F2933] mb-3">
                                            <HandHeart className="h-5 w-5 text-[#3B3B6D]" /> Areas of Expertise
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {manasviSpecialties.map((sp) => (
                                                <span key={sp} className="pill bg-[#EEEEF7] text-[#2A2A57] !py-1.5 !px-3 text-xs font-medium">
                                                    {sp}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="section bg-[#EEEEF7]/50">
                    <div className="container">
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
                            Join thousands of satisfied patients who have experienced professional physiotherapy at their doorstep.
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
