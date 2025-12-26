import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SEO, { generateBreadcrumbSchema } from "@/components/SEO";
import { Award, Heart, Target, Users } from "lucide-react";
import { Link } from "wouter";

export default function AboutUs() {
  const structuredData = [
    generateBreadcrumbSchema([
      { name: 'Home', url: 'https://physioatyourdoorstep.com/' },
      { name: 'About Us', url: 'https://physioatyourdoorstep.com/about-us' },
    ]),
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="About Us | Professional Home Physiotherapy Services | Physio At Your Doorstep"
        description="Learn about Physio At Your Doorstep - your trusted partner for professional home physiotherapy services. Expert care, convenient service, proven results."
        canonical="https://physioatyourdoorstep.com/about-us"
        structuredData={structuredData}
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
              <p className="text-xl text-muted-foreground">
                Bringing professional physiotherapy care to your doorstep with expertise, compassion, and convenience
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
              <Card className="border-2 border-primary/20">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
                  <p className="text-muted-foreground">
                    To provide accessible, high-quality physiotherapy services at your doorstep, making
                    professional healthcare convenient and effective for everyone. We believe that recovery
                    should not be hindered by travel or accessibility challenges.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-secondary/20">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-secondary" />
                  </div>
                  <h2 className="text-2xl font-bold mb-4">Our Vision</h2>
                  <p className="text-muted-foreground">
                    To become the most trusted name in home-based physiotherapy services across India,
                    setting new standards for quality, convenience, and patient-centered care. We envision
                    a future where everyone has access to expert physiotherapy in their comfort zone.
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Story Section */}
            <div className="max-w-4xl mx-auto mb-16">
              <h2 className="text-3xl font-bold mb-6 text-center">Our Story</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground space-y-4">
                <p>
                  Physio At Your Doorstep was founded with a simple yet powerful vision: to make
                  professional physiotherapy accessible to everyone, regardless of their mobility or
                  location constraints. We recognized that many patients struggle to visit clinics due to
                  pain, transportation issues, or busy schedules.
                </p>
                <p>
                  Our team of experienced physiotherapists brings years of clinical expertise directly to
                  your home, equipped with modern equipment and evidence-based treatment protocols. We
                  serve patients across Bangalore and Pune, treating a wide range of conditions from sports
                  injuries to post-surgical rehabilitation, neurological conditions to geriatric care.
                </p>
                <p>
                  What sets us apart is our commitment to personalized care. Every treatment plan is
                  tailored to your specific needs, lifestyle, and recovery goals. We believe in empowering
                  our patients through education, ensuring they understand their condition and actively
                  participate in their recovery journey.
                </p>
              </div>
            </div>

            {/* Values */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Excellence</h3>
                  <p className="text-muted-foreground">
                    We maintain the highest standards of professional care and continuously update our
                    skills with the latest evidence-based practices.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4 mx-auto">
                    <Heart className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Compassion</h3>
                  <p className="text-muted-foreground">
                    We treat every patient with empathy, respect, and genuine care, understanding that
                    healing involves both body and mind.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6 text-center">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 mx-auto">
                    <Users className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Integrity</h3>
                  <p className="text-muted-foreground">
                    We operate with complete transparency, honesty, and ethical practices in all our
                    interactions and treatments.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience the Difference</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied patients who have experienced professional physiotherapy care at
              their doorstep
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/booking">Book Appointment</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
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
