import { Mail, MapPin, Phone, Clock, Linkedin, Instagram, Youtube } from "lucide-react";
import Link from "next/link";
import { SITE } from "@/lib/seo";

const quickLinks = [
  { name: "About Us", href: "/about-us" },
  { name: "Our Services", href: "/service" },
  { name: "Blogs", href: "/blogs" },
  { name: "Locations", href: "/locations" },
  { name: "Contact Us", href: "/contact-us" },
  { name: "Book an Appointment", href: "/booking" },
];

const footerServices = [
  { name: "Orthopaedic Physiotherapy", href: "/service/orthopaedic-physiotherapy" },
  { name: "Neurological Physiotherapy", href: "/service/neurological-physiotherapy" },
  { name: "Sports Physiotherapy", href: "/service/sports-physiotherapy" },
  { name: "Post Surgical Physiotherapy", href: "/service/post-surgical-physiotherapy" },
  { name: "Geriatric Physiotherapy", href: "/service/geriatric-physiotherapy" },
  { name: "Physiotherapy in Pregnancy", href: "/service/physiotherapy-in-pregnancy" },
];

const socials = [
  // Each icon uses the platform's official brand colour.
  { name: "LinkedIn", href: SITE.socials.linkedin, icon: Linkedin, bg: "bg-[#0A66C2]" },
  {
    name: "Instagram",
    href: SITE.socials.instagram,
    icon: Instagram,
    bg: "bg-[radial-gradient(circle_at_30%_110%,#FDF497_0%,#FD5949_45%,#D6249F_60%,#285AEB_90%)]",
  },
  { name: "YouTube", href: SITE.socials.youtube, icon: Youtube, bg: "bg-[#FF0000]" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#23234A] text-white">
      {/* CTA Strip */}
      <div className="bg-[#3B3B6D] py-6">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm opacity-90">Book Appointment</div>
                <a href={`tel:${SITE.phoneRaw}`} className="text-lg font-semibold hover:underline">
                  {SITE.phone}
                </a>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm opacity-90">Working Hours</div>
                <div className="text-lg font-semibold">Available 24×7, All Days</div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#E31E24] flex items-center justify-center flex-shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm opacity-90">Emergency No.</div>
                <a href={`tel:${SITE.phoneRaw}`} className="text-lg font-semibold hover:underline">
                  {SITE.phone}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.webp" alt={SITE.name} className="h-10 w-10 rounded bg-white p-0.5" />
              <h3 className="font-semibold text-lg">{SITE.name}</h3>
            </div>
            <p className="text-sm italic text-[#FFB4B6] font-medium mb-3">
              &ldquo;{SITE.tagline}&rdquo;
            </p>
            <p className="text-sm text-white/80 leading-relaxed mb-4">
              Expert physiotherapists at your home across Bangalore &amp; Pune — on call 24×7 for
              pain relief, rehabilitation, and recovery.
            </p>
            <div className="flex items-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className={`w-9 h-9 rounded-full ${s.bg} flex items-center justify-center transition-transform hover:scale-110 hover:brightness-110`}
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-white/80 hover:text-white transition-colors">
                    {l.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              {footerServices.map((s) => (
                <li key={s.href}>
                  <Link href={s.href} className="text-white/80 hover:text-white transition-colors">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href={`tel:${SITE.phoneRaw}`} className="text-white/80 hover:text-white transition-colors">
                  {SITE.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href={`mailto:${SITE.email}`} className="text-white/80 hover:text-white transition-colors break-all">
                  {SITE.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">
                  Serving Bangalore &amp; Pune
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">Open 24 hours, 7 days a week</span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-white/60">
          <p>© {currentYear} {SITE.name}. All Rights Reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
