import { Button } from "@/components/ui/button";
import { Menu, Phone, X } from "lucide-react";
import { useState } from "react";
import { Link, useLocation } from "wouter";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about-us" },
  { name: "Services", href: "/service" },
  { name: "Locations", href: "/locations" },
  { name: "Blogs", href: "/blogs" },
  { name: "Contact", href: "/contact-us" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const phoneNumber = "+918233787737";
  const whatsappNumber = "918233787737";

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img src="/logo.webp" alt="Physio At Your Doorstep" className="h-10 w-10" />
          <div className="flex items-center">
            <span className="text-xl font-bold text-primary">Physio</span>
            <span className="text-xl font-bold text-secondary">@YourDoorstep</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location === item.href
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex md:items-center md:gap-2">
          <Button variant="outline" size="sm" asChild>
            <a href={`tel:${phoneNumber}`}>
              <Phone className="mr-2 h-4 w-4" />
              Call Now
            </a>
          </Button>
          <Button size="sm" asChild>
            <a
              href={`https://wa.me/${whatsappNumber}?text=Hi, I would like to book a physiotherapy session`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book Appointment
            </a>
          </Button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="md:hidden"
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
        <div className="md:hidden border-t">
          <div className="container py-4 space-y-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block py-2 text-base font-medium ${
                  location === item.href
                    ? "text-primary"
                    : "text-muted-foreground"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t">
              <Button variant="outline" asChild>
                <a href={`tel:${phoneNumber}`}>
                  <Phone className="mr-2 h-4 w-4" />
                  Call Now
                </a>
              </Button>
              <Button asChild>
                <a
                  href={`https://wa.me/${whatsappNumber}?text=Hi, I would like to book a physiotherapy session`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book Appointment
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
