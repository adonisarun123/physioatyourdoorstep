import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SEO, { generateBreadcrumbSchema, generateFAQSchema, generateServiceSchema } from "@/components/SEO";
import { trpc } from "@/lib/trpc";
import { Link, useParams } from "wouter";

export default function ServiceDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: service, isLoading } = trpc.services.getBySlug.useQuery({ slug: slug || "" });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Loading service details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Service Not Found</h1>
            <p className="text-muted-foreground mb-6">The service you're looking for doesn't exist.</p>
            <Button asChild>
              <Link href="/service">View All Services</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const structuredData = [
    generateServiceSchema({
      name: service.title,
      description: service.metaDescription || '',
      url: `https://physioatyourdoorstep.com/service/${service.slug}`,
    }),
    generateBreadcrumbSchema([
      { name: 'Home', url: 'https://physioatyourdoorstep.com/' },
      { name: 'Services', url: 'https://physioatyourdoorstep.com/service' },
      { name: service.title, url: `https://physioatyourdoorstep.com/service/${service.slug}` },
    ]),
    ...(service.faqs && service.faqs.length > 0 ? [generateFAQSchema(service.faqs)] : []),
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title={service.metaTitle || `${service.title} | Physio At Your Doorstep`}
        description={service.metaDescription || ''}
        canonical={`https://physioatyourdoorstep.com/service/${service.slug}`}
        structuredData={structuredData}
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">{service.title}</h1>
              {service.heroSubheadline && (
                <p className="text-xl text-muted-foreground mb-8">{service.heroSubheadline}</p>
              )}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/booking">Book This Service</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact-us">Ask Questions</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {service.content && (
                <div 
                  className="prose prose-lg max-w-none mb-12"
                  dangerouslySetInnerHTML={{ __html: service.content }}
                />
              )}

              {/* FAQs */}
              {service.faqs && service.faqs.length > 0 && (
                <div className="mt-16">
                  <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>
                  <Accordion type="single" collapsible className="w-full">
                    {service.faqs.map((faq, index) => (
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
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Book your appointment today and experience professional {service.title.toLowerCase()} at your doorstep
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/booking">Book Appointment</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/service">View All Services</Link>
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
