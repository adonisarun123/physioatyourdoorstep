import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "wouter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand & Contact */}
          <div className="space-y-4">
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary">Physio</span>
              <span className="text-xl font-bold text-secondary">@YourDoorstep</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Professional physiotherapy services at your doorstep. Expert care, convenient location.
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 text-primary" />
                <a href="tel:+918233787737" className="hover:text-primary">
                  +91 82337 87737
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 text-primary" />
                <a href="mailto:physioatyourdoorstep24x7@gmail.com" className="hover:text-primary break-all">
                  physioatyourdoorstep24x7@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-primary" />
                <span className="text-muted-foreground">
                  Serving Bangalore & Pune
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about-us" className="text-muted-foreground hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/service" className="text-muted-foreground hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/locations" className="text-muted-foreground hover:text-primary">
                  Locations
                </Link>
              </li>
              <li>
                <Link href="/blogs" className="text-muted-foreground hover:text-primary">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/contact-us" className="text-muted-foreground hover:text-primary">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/service/sports-physiotherapy" className="text-muted-foreground hover:text-primary">
                  Sports Physiotherapy
                </Link>
              </li>
              <li>
                <Link href="/service/orthopaedic-physiotherapy" className="text-muted-foreground hover:text-primary">
                  Orthopaedic Physiotherapy
                </Link>
              </li>
              <li>
                <Link href="/service/neurological-physiotherapy" className="text-muted-foreground hover:text-primary">
                  Neurological Physiotherapy
                </Link>
              </li>
              <li>
                <Link href="/service/geriatric-physiotherapy" className="text-muted-foreground hover:text-primary">
                  Geriatric Physiotherapy
                </Link>
              </li>
              <li>
                <Link href="/service/pediatric-physiotherapy" className="text-muted-foreground hover:text-primary">
                  Pediatric Physiotherapy
                </Link>
              </li>
            </ul>
          </div>

          {/* Cities Served */}
          <div>
            <h3 className="font-semibold mb-4">Cities We Serve</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Bangalore</li>
              <li className="text-muted-foreground ml-4">• Bellandur</li>
              <li className="text-muted-foreground ml-4">• Whitefield</li>
              <li className="text-muted-foreground ml-4">• Koramangala</li>
              <li className="text-muted-foreground ml-4">• HSR Layout</li>
              <li className="text-muted-foreground ml-4">• Marathahalli</li>
              <li className="text-muted-foreground">Pune</li>
              <li className="text-muted-foreground ml-4">• Baner</li>
              <li className="text-muted-foreground ml-4">• Hinjewadi</li>
              <li className="text-muted-foreground ml-4">• Wakad</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Physio At Your Doorstep. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
