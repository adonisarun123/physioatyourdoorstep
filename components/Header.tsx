"use client";

import { Button } from "@/components/ui/button";
import { Menu, Phone, X, Mail, Facebook, Twitter, Linkedin } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Our Service", href: "/service" },
  { name: "Contact Us", href: "/contact-us" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const phoneNumber = "+918233787737";
  const whatsappNumber = "918233787737";
  const email = "physioatyourdoorstep24x7@gmail.com";

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top Utility Bar */}
      <div className="bg-[#EAF5F1] border-b border-[#CFE7DD]">
        <div className="container">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="hidden md:flex items-center gap-6">
              <a href={`mailto:${email}`} className="flex items-center gap-2 text-[#2E5E50] hover:text-[#4F8F7A] transition-colors">
                <Mail className="h-4 w-4" />
                <span>{email}</span>
              </a>
              <a href={`tel:${phoneNumber}`} className="flex items-center gap-2 text-[#2E5E50] hover:text-[#4F8F7A] transition-colors">
                <Phone className="h-4 w-4" />
                <span>{phoneNumber}</span>
              </a>
            </div>
            <div className="flex items-center gap-3 ml-auto">
              <a href="#" className="text-[#2E5E50] hover:text-[#4F8F7A] transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="text-[#2E5E50] hover:text-[#4F8F7A] transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
              <a href="#" className="text-[#2E5E50] hover:text-[#4F8F7A] transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.webp" alt="Physiocare" className="h-12 w-12" />
          <div className="flex flex-col">
            <span className="text-2xl font-bold text-[#4F8F7A]">Physiocare</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-[#4F8F7A] ${pathname === item.href
                  ? "text-[#4F8F7A]"
                  : "text-[#1F2933]"
                }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex">
          <a href={`tel:${phoneNumber}`} className="btn-primary">
            <Phone className="h-4 w-4" />
            {phoneNumber}
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden text-[#1F2933]"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#CFE7DD]">
          <div className="container py-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-2 text-base font-medium ${pathname === item.href
                    ? "text-[#4F8F7A]"
                    : "text-[#1F2933]"
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-[#CFE7DD]">
              <a href={`tel:${phoneNumber}`} className="btn-primary">
                <Phone className="h-4 w-4" />
                Call Now
              </a>
              <Link href="/booking" className="btn-secondary" onClick={() => setMobileMenuOpen(false)}>
                Book Appointment
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
