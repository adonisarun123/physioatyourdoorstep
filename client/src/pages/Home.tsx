import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SEO, { generateBreadcrumbSchema, generateOrganizationSchema } from "@/components/SEO";
import { trpc } from "@/lib/trpc";
import { Activity, Award, Clock, Heart, Home as HomeIcon, Shield, Users } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const { data: services } = trpc.services.list.useQuery();

  const features = [
    {
      icon: HomeIcon,
      title: "Doorstep Service",
      description: "Professional physiotherapy at your home, office, or preferred location",
    },
    {
      icon: Users,
      title: "Expert Therapists",
      description: "Qualified and experienced physiotherapists with proven track records",
    },
    {
      icon: Clock,
      title: "Flexible Scheduling",
      description: "Book appointments at your convenience, 7 days a week",
    },
    {
      icon: Shield,
      title: "Safe & Hygienic",
      description: "Strict safety protocols and sanitized equipment for your peace of mind",
    },
    {
      icon: Activity,
      title: "Personalized Care",
      description: "Customized treatment plans tailored to your specific needs",
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Evidence-based treatments with measurable outcomes",
    },
  ];

  const whatsappNumber = "918233787737";

  const structuredData = [
    generateOrganizationSchema(),
    generateBreadcrumbSchema([
      { name: 'Home', url: 'https://physioatyourdoorstep.com/' },
    ]),
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Physio At Your Doorstep | Professional Home Physiotherapy Services in India"
        description="Expert physiotherapy services delivered to your home across India. Professional treatment for sports injuries, post-surgical rehabilitation, neurological conditions, and more. Book now!"
        canonical="https://physioatyourdoorstep.com/"
        structuredData={structuredData}
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-20 md:py-32">
          <div className="container">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
                Professional <span className="text-primary">Physiotherapy</span> at Your{" "}
                <span className="text-secondary">Doorstep</span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Expert physiotherapy services delivered to your home. Convenient, professional, and
                personalized care for faster recovery and better health.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/booking">Book Appointment</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a
                    href={`https://wa.me/${whatsappNumber}?text=Hi, I would like to know more about your services`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Heart className="mr-2 h-5 w-5" />
                    WhatsApp Us
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose Us</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We bring professional healthcare to your doorstep with convenience, expertise, and care
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle>{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Services</h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Comprehensive physiotherapy services for all your healthcare needs
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {services?.slice(0, 6).map((service) => (
                <Card key={service.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="mb-4">
                      {service.metaDescription?.slice(0, 120)}...
                    </CardDescription>
                    <Button variant="outline" asChild>
                      <Link href={`/service/${service.slug}`}>Learn More</Link>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="text-center">
              <Button size="lg" variant="outline" asChild>
                <Link href="/service">View All Services</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Start Your Recovery?</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Book your first session today and experience professional physiotherapy in the comfort of
              your home
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/booking">Book Now</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link href="/contact-us">Contact Us</Link>
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
