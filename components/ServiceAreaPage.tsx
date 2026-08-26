import Breadcrumbs from "@/components/Breadcrumbs";
import JsonLd from "@/components/JsonLd";
import { MarkdownContent } from "@/components/MarkdownContent";
import { localBusinessSchema, serviceSchema, faqSchema, SITE } from "@/lib/seo";
import { getServiceAreasByArea, getLocationBySlug, type ServiceAreaContent } from "@/lib/content";
import {
    MapPin,
    ArrowRight,
    Calendar,
    MessageCircle,
    Phone,
    ShieldCheck,
    Home,
    Clock,
    Check,
} from "lucide-react";
import Link from "next/link";

/**
 * Template for a service x area page — one global service localised to one
 * neighbourhood. Mirrors the location page shell but links up to the area's
 * location pillar and sideways to its sibling services.
 */
export default function ServiceAreaPage({ data }: { data: ServiceAreaContent }) {
    const siblings = getServiceAreasByArea(data.area).filter((s) => s.slug !== data.slug);
    const pillar = data.pillar ? getLocationBySlug(data.pillar) : undefined;

    const whatsappHref = `https://wa.me/${SITE.phoneRaw.replace("+", "")}?text=${encodeURIComponent(
        `Hi, I would like to book ${data.serviceName.toLowerCase()} at home in ${data.area}.`
    )}`;

    return (
        <main className="flex-1">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-[#EEEEF7] via-white to-[#EEEEF7] section">
                <div className="container">
                    <div className="max-w-4xl mx-auto">
                        <Breadcrumbs
                            className="mb-6"
                            items={[
                                { name: "Locations", href: "/locations" },
                                ...(pillar ? [{ name: pillar.area, href: `/${pillar.slug}` }] : []),
                                { name: data.serviceName },
                            ]}
                        />
                        <div className="flex items-center gap-2 text-[#4B5563] mb-4">
                            <MapPin className="h-5 w-5 text-[#E31E24]" />
                            <span>
                                {data.area}, {data.city}
                            </span>
                        </div>
                        <h1 className="heading-hero mb-5">{data.title}</h1>
                        {data.metaDescription && (
                            <p className="text-lg text-[#4B5563] leading-relaxed mb-8">{data.metaDescription}</p>
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

            {/* Content + sidebar */}
            <section className="section bg-white">
                <div className="container">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        <div className="lg:col-span-2 min-w-0">
                            {data.content && <MarkdownContent>{data.content}</MarkdownContent>}

                            {data.faqs && data.faqs.length > 0 && (
                                <div className="mt-16">
                                    <h2 className="heading-subsection mb-8">Frequently Asked Questions</h2>
                                    <div className="space-y-4">
                                        {data.faqs.map((faq, index) => (
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
                                <div className="rounded-2xl bg-gradient-to-br from-[#3B3B6D] to-[#2A2A57] p-6 text-white shadow-float">
                                    <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium mb-4">
                                        <MapPin className="h-3.5 w-3.5" /> {data.area}, {data.city}
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">
                                        Book {data.serviceName} at Home in {data.area}
                                    </h3>
                                    <p className="text-sm opacity-90 mb-5">
                                        Certified physiotherapists at your doorstep, 24×7. Same-day slots available.
                                    </p>
                                    <div className="space-y-3">
                                        <Link href="/booking" className="btn-primary w-full">
                                            <Calendar className="h-4 w-4" /> Book an Appointment
                                        </Link>
                                        <a
                                            href={`tel:${SITE.phoneRaw}`}
                                            className="flex w-full items-center justify-center gap-2 rounded-full bg-white/10 border border-white/25 px-4 py-2.5 font-semibold hover:bg-white/20 transition-colors"
                                        >
                                            <Phone className="h-4 w-4" /> {SITE.phone}
                                        </a>
                                        <a
                                            href={whatsappHref}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 font-semibold text-white hover:opacity-90 transition-opacity"
                                        >
                                            <MessageCircle className="h-4 w-4" /> WhatsApp Now
                                        </a>
                                    </div>
                                </div>

                                {siblings.length > 0 && (
                                    <div className="card-physio !p-6">
                                        <h3 className="font-semibold text-[#1F2933] mb-4">
                                            Other Services in {data.area}
                                        </h3>
                                        <ul className="space-y-1">
                                            {siblings.map((s) => (
                                                <li key={s.slug}>
                                                    <Link
                                                        href={`/${s.slug}`}
                                                        className="group flex items-center justify-between gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-[#1F2933] hover:bg-[#EEEEF7] hover:text-[#3B3B6D] transition-colors"
                                                    >
                                                        <span className="flex items-center gap-2">
                                                            <Check className="h-4 w-4 text-[#3B3B6D] flex-shrink-0" />
                                                            {s.serviceName}
                                                        </span>
                                                        <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                        {pillar && (
                                            <Link
                                                href={`/${pillar.slug}`}
                                                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-[#E31E24]"
                                            >
                                                All physiotherapy in {data.area} <ArrowRight className="h-4 w-4" />
                                            </Link>
                                        )}
                                    </div>
                                )}

                                {data.service && (
                                    <div className="card-physio !p-6">
                                        <h3 className="font-semibold text-[#1F2933] mb-2">
                                            {data.serviceName} across Bangalore &amp; Pune
                                        </h3>
                                        <p className="text-sm text-[#4B5563] mb-4">
                                            Read how we deliver {data.serviceName.toLowerCase()} everywhere we operate.
                                        </p>
                                        <Link
                                            href={`/service/${data.service}`}
                                            className="inline-flex items-center gap-1 text-sm font-medium text-[#E31E24]"
                                        >
                                            View the full service <ArrowRight className="h-4 w-4" />
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </aside>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="section bg-[#2A2A57] text-white">
                <div className="container text-center max-w-3xl">
                    <h2 className="heading-section mb-4">
                        Book {data.serviceName} in {data.area}
                    </h2>
                    <p className="text-lg mb-8 opacity-90">
                        Professional physiotherapy delivered to your doorstep in {data.area}, {data.city}.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/booking" className="btn-primary">
                            Book Appointment
                        </Link>
                        <a href={`tel:${SITE.phoneRaw}`} className="btn-secondary">
                            Call {SITE.phone}
                        </a>
                    </div>
                </div>
            </section>

            <JsonLd
                data={[
                    localBusinessSchema({ area: data.area, city: data.city, url: `/${data.slug}` }),
                    serviceSchema({
                        name: `${data.serviceName} in ${data.area}`,
                        description: data.metaDescription ?? data.title,
                        url: `/${data.slug}`,
                    }),
                    ...(data.faqs && data.faqs.length > 0 ? [faqSchema(data.faqs)] : []),
                ]}
            />
        </main>
    );
}
