import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { ArrowRight, CheckCircle2, MessageCircle, Phone, PhoneCall, Stethoscope, UserCheck } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Thank You | Booking Received | Physio At Your Doorstep",
    description: "Your booking request has been received. Our team will contact you shortly to confirm your appointment.",
    robots: { index: false, follow: false },
};

const WHATSAPP_NUMBER = "918233787737";
const PHONE_DISPLAY = "+91 82337 87737";
const PHONE_HREF = "tel:+918233787737";

const NEXT_STEPS = [
    {
        icon: PhoneCall,
        title: "We call you back",
        description: "Our team will contact you shortly on the number you shared to confirm your slot.",
    },
    {
        icon: UserCheck,
        title: "Physio matched to you",
        description: "We assign the physiotherapist best suited to your condition and location.",
    },
    {
        icon: Stethoscope,
        title: "Recovery begins at home",
        description: "Your physiotherapist arrives at your doorstep at the scheduled time.",
    },
];

export default async function ThankYouPage({
    searchParams,
}: {
    searchParams: Promise<{ ref?: string }>;
}) {
    const { ref } = await searchParams;
    // Only display well-formed references so arbitrary query text is never reflected.
    const reference = ref && /^PYD-\d{1,10}$/.test(ref) ? ref : null;

    const whatsappText = encodeURIComponent(
        reference
            ? `Hi, I just submitted a booking request (reference ${reference}). I'd like to confirm my appointment.`
            : "Hi, I just submitted a booking request. I'd like to confirm my appointment."
    );

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1">
                <section className="relative bg-gradient-to-br from-[#EEEEF7] via-white to-[#EEEEF7] section">
                    <div className="container">
                        <div className="max-w-2xl mx-auto text-center">
                            <span className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-green-100">
                                <CheckCircle2 className="h-11 w-11 text-green-600" />
                            </span>

                            <h1 className="heading-hero mt-6">
                                Thank <span className="text-[#E31E24]">You!</span>
                            </h1>
                            <p className="mt-4 text-lg text-[#4B5563] leading-relaxed">
                                Your booking request has been received. Our team will contact you
                                shortly to confirm your appointment.
                            </p>

                            {reference && (
                                <div className="mx-auto mt-8 max-w-md rounded-2xl border-2 border-dashed border-[#3B3B6D]/30 bg-white p-6 shadow-[0_10px_30px_rgba(35,35,74,0.08)]">
                                    <p className="text-sm font-semibold uppercase tracking-wide text-[#6B7280]">
                                        Your Booking Reference
                                    </p>
                                    <p className="mt-2 font-mono text-3xl font-bold tracking-widest text-[#2A2A57]">
                                        {reference}
                                    </p>
                                    <p className="mt-3 text-sm text-[#4B5563]">
                                        Please save this reference number — quote it in any call or
                                        message about your appointment.
                                    </p>
                                </div>
                            )}

                            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
                                <a
                                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappText}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="btn-whatsapp w-full sm:w-auto"
                                >
                                    <MessageCircle className="h-5 w-5" /> Chat on WhatsApp
                                </a>
                                <a href={PHONE_HREF} className="btn-secondary w-full sm:w-auto">
                                    <Phone className="h-5 w-5" /> Call {PHONE_DISPLAY}
                                </a>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section-sm bg-white">
                    <div className="container">
                        <div className="text-center mb-10">
                            <span className="text-sm font-semibold text-[#E31E24] uppercase tracking-wide">
                                What Happens Next
                            </span>
                            <h2 className="heading-section mt-3">
                                Your Recovery Is <span className="text-[#3B3B6D]">On Its Way</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                            {NEXT_STEPS.map((step, i) => (
                                <div key={step.title} className="card-physio text-center">
                                    <span className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#EEEEF7]">
                                        <step.icon className="h-6 w-6 text-[#3B3B6D]" />
                                    </span>
                                    <h3 className="text-lg font-semibold text-[#1F2933] mb-2">
                                        {i + 1}. {step.title}
                                    </h3>
                                    <p className="text-sm text-[#4B5563]">{step.description}</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-10 text-center">
                            <Link href="/" className="inline-flex items-center gap-2 font-semibold text-[#3B3B6D] hover:text-[#2A2A57]">
                                Back to Home <ArrowRight className="h-4 w-4" />
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
