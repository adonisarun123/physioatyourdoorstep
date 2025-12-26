import { Button } from "@/components/ui/button";
import { MessageCircle, Phone } from "lucide-react";

export default function CTABar() {
  const phoneNumber = "+918233787737";
  const whatsappNumber = "918233787737";

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background border-t shadow-lg">
      <div className="container py-3 flex gap-2">
        <Button variant="outline" className="flex-1" asChild>
          <a href={`tel:${phoneNumber}`}>
            <Phone className="mr-2 h-4 w-4" />
            Call Now
          </a>
        </Button>
        <Button className="flex-1" asChild>
          <a
            href={`https://wa.me/${whatsappNumber}?text=Hi, I would like to book a physiotherapy session`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <MessageCircle className="mr-2 h-4 w-4" />
            WhatsApp
          </a>
        </Button>
      </div>
    </div>
  );
}
