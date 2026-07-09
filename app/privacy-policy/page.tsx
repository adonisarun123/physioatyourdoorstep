import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { SITE } from "@/lib/seo";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy | Physio At Your Doorstep",
    description: "How Physio At Your Doorstep collects, uses, and protects your personal information.",
    alternates: { canonical: "/privacy-policy" },
    robots: { index: true, follow: true },
};

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">
                <section className="relative bg-gradient-to-br from-[#EEEEF7] via-white to-[#EEEEF7] section-sm">
                    <div className="container max-w-3xl">
                        <h1 className="heading-hero">Privacy <span className="text-[#E31E24]">Policy</span></h1>
                        <p className="text-[#4B5563] mt-3">Last updated: July 2026</p>
                    </div>
                </section>
                <section className="section-sm bg-white">
                    <div className="container max-w-3xl space-y-8 text-[#4B5563] leading-relaxed">
                        <div>
                            <h2 className="heading-subsection text-[#1F2933] mb-3">Who We Are</h2>
                            <p>
                                {SITE.name} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) provides home physiotherapy services across
                                Bangalore and Pune, India. This policy explains how we handle the personal information you
                                share with us through this website ({SITE.url}), by phone, or on WhatsApp.
                            </p>
                        </div>
                        <div>
                            <h2 className="heading-subsection text-[#1F2933] mb-3">Information We Collect</h2>
                            <p>
                                When you book an appointment or contact us, we collect the details you provide: your name,
                                email address, phone number, area/location, preferred appointment date and time, and any
                                description of your condition or concern that you choose to share. We also use Google
                                Analytics to understand how visitors use our website in aggregate.
                            </p>
                        </div>
                        <div>
                            <h2 className="heading-subsection text-[#1F2933] mb-3">How We Use It</h2>
                            <p>
                                We use your information only to respond to your enquiry, schedule and deliver physiotherapy
                                services, assign the right physiotherapist for your needs, and communicate with you about
                                your appointments. We do not sell your personal information, and we do not share it with
                                third parties except our own treating physiotherapists and the service providers that host
                                this website and store form submissions.
                            </p>
                        </div>
                        <div>
                            <h2 className="heading-subsection text-[#1F2933] mb-3">Health Information</h2>
                            <p>
                                Any details about your medical condition that you share with us are treated as confidential,
                                are used solely to plan and deliver your treatment, and are accessible only to the
                                physiotherapists involved in your care.
                            </p>
                        </div>
                        <div>
                            <h2 className="heading-subsection text-[#1F2933] mb-3">Data Retention &amp; Your Rights</h2>
                            <p>
                                We keep your information only as long as needed to provide services and meet our legal
                                obligations. You may request access to, correction of, or deletion of your personal
                                information at any time by writing to us at{" "}
                                <a href={`mailto:${SITE.email}`} className="text-[#E31E24] font-medium">{SITE.email}</a> or
                                calling <a href={`tel:${SITE.phoneRaw}`} className="text-[#E31E24] font-medium">{SITE.phone}</a>.
                            </p>
                        </div>
                        <div>
                            <h2 className="heading-subsection text-[#1F2933] mb-3">Cookies &amp; Analytics</h2>
                            <p>
                                This website uses Google Analytics cookies to measure site usage. You can block cookies in
                                your browser settings without affecting your ability to browse the site or contact us.
                            </p>
                        </div>
                        <div>
                            <h2 className="heading-subsection text-[#1F2933] mb-3">Changes to This Policy</h2>
                            <p>
                                We may update this policy from time to time. The latest version will always be available on
                                this page.
                            </p>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
            <CTABar />
        </div>
    );
}
