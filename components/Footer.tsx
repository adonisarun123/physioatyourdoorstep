import { Mail, MapPin, Phone, Clock } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1F3F35] text-white">
      {/* CTA Strip */}
      <div className="bg-[#4F8F7A] py-6">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm opacity-90">Book Appointment</div>
                <a href="tel:+918233787737" className="text-lg font-semibold hover:underline">
                  +91 82337 87737
                </a>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm opacity-90">Working Hours</div>
                <div className="text-lg font-semibold">Mon to Fri: 10:00 To 6:00</div>
              </div>
            </div>
            <div className="flex flex-col md:flex-row items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                <Phone className="h-6 w-6" />
              </div>
              <div>
                <div className="text-sm opacity-90">Emergency No.</div>
                <a href="tel:+918233787737" className="text-lg font-semibold hover:underline">
                  +91 82337 87737
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
            <h3 className="font-semibold text-lg mb-4">About</h3>
            <p className="text-sm text-white/80 leading-relaxed">
              We understand that injuries and acute pain can happen unexpectedly. Our emergency physiotherapy.
            </p>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Working Hours</h3>
            <ul className="space-y-2 text-sm text-white/80">
              <li className="flex justify-between">
                <span>Mon to Fri:</span>
                <span>10:00 AM to 6:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sat:</span>
                <span>10:00 AM to 3:00 PM</span>
              </li>
              <li className="flex justify-between">
                <span>Sun:</span>
                <span>Closed</span>
              </li>
            </ul>
          </div>

          {/* More Services */}
          <div>
            <h3 className="font-semibold text-lg mb-4">More Services</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/service" className="text-white/80 hover:text-white transition-colors">
                  Manual Therapy
                </Link>
              </li>
              <li>
                <Link href="/service" className="text-white/80 hover:text-white transition-colors">
                  Chronic Pain
                </Link>
              </li>
              <li>
                <Link href="/service" className="text-white/80 hover:text-white transition-colors">
                  Hand Therapy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href="tel:+918233787737" className="text-white/80 hover:text-white transition-colors">
                  +91 82337 87737
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <a href="mailto:physioatyourdoorstep24x7@gmail.com" className="text-white/80 hover:text-white transition-colors break-all">
                  physioatyourdoorstep24x7@gmail.com
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                <span className="text-white/80">
                  Serving Bangalore & Pune
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-sm text-white/60">
          <p>© {currentYear} Physiocare. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
