import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { trpc } from "@/lib/trpc";
import { MapPin, Phone } from "lucide-react";
import { Link, useParams } from "wouter";

export default function LocationDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: location, isLoading } = trpc.locations.getBySlug.useQuery({ slug: slug || "" });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading location details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!location) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Location Not Found</h1>
            <p className="text-muted-foreground mb-6">The location you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/locations">View All Locations</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const phoneNumber = "+918233787737";

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-2 text-muted-foreground mb-4">
                <MapPin className="h-5 w-5" />
                <span>{location.city}</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{location.title}</h1>
              <p className="text-xl text-muted-foreground mb-8">
                Professional physiotherapy services in {location.area}, {location.city}. Expert care
                delivered to your doorstep.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/booking">Book Appointment</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href={`tel:${phoneNumber}`}>
                    <Phone className="mr-2 h-5 w-5" />
                    Call Now
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {location.content && (
                <div 
                  className="prose prose-lg max-w-none mb-12"
                  dangerouslySetInnerHTML={{ __html: location.content }}
                />
              )}

              {/* Services Available */}
              <Card className="mb-12">
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-4">Services Available in {location.area}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Sports Physiotherapy</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Orthopaedic Physiotherapy</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Neurological Physiotherapy</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Geriatric Physiotherapy</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Post-Surgical Rehabilitation</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <span className="text-primary">✓</span>
                      <span>Pediatric Physiotherapy</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* FAQs */}
              {location.faqs && location.faqs.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-3xl font-bold mb-8">
                    Frequently Asked Questions - {location.area}
                  </h2>
                  <Accordion type="single" collapsible className="w-full">
                    {location.faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger className="text-left">{faq.q}</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{faq.a}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Book Your Physiotherapy Session in {location.area}
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Get professional physiotherapy care at your home in {location.area}. Our expert
              therapists are ready to help you recover and feel better.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/booking">Book Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link href="/service">View Services</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CTABar />
    </div>
  );
}
