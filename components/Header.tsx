"use client";

import { Button } from "@/components/ui/button";
import { Menu, Phone, X, Mail, Clock } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About Us", href: "/about-us" },
  { name: "Our Service", href: "/service" },
  { name: "Blogs", href: "/blogs" },
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
      <div className="bg-[#EEEEF7] border-b border-[#DCDCEC]">
        <div className="container">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="hidden md:flex items-center gap-6">
              <a href={`mailto:${email}`} className="flex items-center gap-2 text-[#2A2A57] hover:text-[#3B3B6D] transition-colors">
                <Mail className="h-4 w-4" />
                <span>{email}</span>
              </a>
              <a href={`tel:${phoneNumber}`} className="flex items-center gap-2 text-[#2A2A57] hover:text-[#3B3B6D] transition-colors">
                <Phone className="h-4 w-4" />
                <span>{phoneNumber}</span>
              </a>
            </div>
            <div className="flex items-center gap-2 ml-auto font-semibold text-[#E31E24]">
              <Clock className="h-4 w-4" />
              <span>Available 24×7</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container flex h-20 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.webp" alt="Physio At Your Doorstep" className="h-12 w-12" />
          <div className="flex flex-col">
            <span className="text-xl font-bold text-[#3B3B6D]">Physio At Your Doorstep</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium uppercase tracking-wide transition-colors hover:text-[#3B3B6D] ${pathname === item.href
                ? "text-[#3B3B6D]"
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
        <div className="md:hidden border-t border-[#DCDCEC]">
          <div className="container py-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-2 text-base font-medium ${pathname === item.href
                  ? "text-[#3B3B6D]"
                  : "text-[#1F2933]"
                  }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t border-[#DCDCEC]">
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
