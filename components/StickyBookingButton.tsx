import { Button } from "@/components/ui/button";
import { trackEvent } from "@/components/GoogleAnalytics";
import { Calendar } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "wouter";

/**
 * Sticky Booking Button Component
 * 
 * A floating call-to-action button that remains visible while scrolling.
 * Features:
 * - Appears after user scrolls down 200px
 * - Smooth fade-in/fade-out animations
 * - Hidden on mobile (CTABar handles mobile CTA)
 * - Tracks clicks for analytics
 */

export default function StickyBookingButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show button after scrolling 200px down
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    
    // Check initial scroll position
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleClick = () => {
    trackEvent('sticky_booking_button_click', {
      event_category: 'engagement',
      event_label: 'Sticky CTA Button',
    });
  };

  return (
    <div
      className={`
        fixed bottom-8 right-8 z-50
        hidden md:block
        transition-all duration-300 ease-in-out
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
      `}
    >
      <Button
        size="lg"
        className="shadow-2xl hover:shadow-3xl transition-shadow duration-200 group"
        asChild
      >
        <Link href="/booking" onClick={handleClick}>
          <Calendar className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
          Book Appointment
        </Link>
      </Button>
    </div>
  );
}
