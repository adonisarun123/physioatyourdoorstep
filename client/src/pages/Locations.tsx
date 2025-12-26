import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { trpc } from "@/lib/trpc";
import { MapPin } from "lucide-react";
import { Link } from "wouter";

export default function Locations() {
  const { data: locations, isLoading } = trpc.locations.list.useQuery();

  // Group locations by city
  const locationsByCity = locations?.reduce((acc, location) => {
    if (!acc[location.city]) {
      acc[location.city] = [];
    }
    acc[location.city].push(location);
    return acc;
  }, {} as Record<string, typeof locations>);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Locations</h1>
              <p className="text-xl text-muted-foreground">
                We serve multiple locations across Bangalore and Pune, bringing professional
                physiotherapy care right to your doorstep
              </p>
            </div>
          </div>
        </section>

        {/* Locations Grid */}
        <section className="py-16 md:py-24">
          <div className="container">
            {isLoading ? (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Loading locations...</p>
              </div>
            ) : locationsByCity && Object.keys(locationsByCity).length > 0 ? (
              <div className="space-y-12">
                {Object.entries(locationsByCity).map(([city, cityLocations]) => (
                  <div key={city}>
                    <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
                      <MapPin className="h-8 w-8 text-primary" />
                      {city}
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {cityLocations?.map((location) => (
                        <Card key={location.id} className="hover:shadow-lg transition-shadow">
                          <CardHeader>
                            <CardTitle className="text-lg">{location.area}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <CardDescription className="mb-4">
                              Professional physiotherapy services in {location.area}, {location.city}
                            </CardDescription>
                            <Button variant="outline" className="w-full" asChild>
                              <Link href={`/${location.slug}`}>View Details</Link>
                            </Button>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground mb-4">Location information coming soon.</p>
                <Button asChild>
                  <Link href="/contact-us">Contact Us</Link>
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 md:py-24 bg-primary text-primary-foreground">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Don't See Your Area Listed?
            </h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              We're constantly expanding our service areas. Contact us to check if we can serve your
              location or to request service in your area.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact-us">Contact Us</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link href="/booking">Book Appointment</Link>
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
