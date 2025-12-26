import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import CTABar from "@/components/CTABar";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import SEO, { generateBreadcrumbSchema } from "@/components/SEO";
import { trpc } from "@/lib/trpc";
import { useState } from "react";
import { toast } from "sonner";

export default function Booking() {
  const { data: services } = trpc.services.list.useQuery();
  const createBooking = trpc.booking.create.useMutation();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    serviceId: "",
    locationArea: "",
    preferredDate: "",
    preferredTime: "",
    condition: "",
    notes: "",
  });

  const structuredData = [
    generateBreadcrumbSchema([
      { name: 'Home', url: 'https://physioatyourdoorstep.com/' },
      { name: 'Book Appointment', url: 'https://physioatyourdoorstep.com/booking' },
    ]),
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createBooking.mutateAsync({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        serviceId: formData.serviceId ? parseInt(formData.serviceId) : undefined,
        locationArea: formData.locationArea || undefined,
        preferredDate: formData.preferredDate || undefined,
        preferredTime: formData.preferredTime || undefined,
        condition: formData.condition || undefined,
        notes: formData.notes || undefined,
      });
      
      toast.success("Booking request submitted successfully! We'll contact you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        serviceId: "",
        locationArea: "",
        preferredDate: "",
        preferredTime: "",
        condition: "",
        notes: "",
      });
    } catch (error) {
      toast.error("Failed to submit booking. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <SEO
        title="Book Appointment | Schedule Your Physiotherapy Session | Physio At Your Doorstep"
        description="Book your home physiotherapy appointment online. Choose your service, preferred date and time. Professional physiotherapists at your doorstep."
        canonical="https://physioatyourdoorstep.com/booking"
        structuredData={structuredData}
      />
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-primary/10 to-secondary/10">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">Book an Appointment</h1>
              <p className="text-xl text-muted-foreground">
                Fill out the form below and our team will contact you to confirm your appointment
              </p>
            </div>
          </div>
        </section>

        {/* Booking Form */}
        <section className="py-16 md:py-24">
          <div className="container max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
                <CardDescription>
                  Please provide your information and we'll get back to you shortly
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  {/* Service Selection */}
                  <div>
                    <Label htmlFor="service">Select Service</Label>
                    <Select
                      value={formData.serviceId}
                      onValueChange={(value) => setFormData({ ...formData, serviceId: value })}
                    >
                      <SelectTrigger id="service">
                        <SelectValue placeholder="Choose a service" />
                      </SelectTrigger>
                      <SelectContent>
                        {services?.map((service) => (
                          <SelectItem key={service.id} value={service.id.toString()}>
                            {service.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Location */}
                  <div>
                    <Label htmlFor="location">Your Area/Location</Label>
                    <Input
                      id="location"
                      value={formData.locationArea}
                      onChange={(e) => setFormData({ ...formData, locationArea: e.target.value })}
                      placeholder="e.g., Koramangala, Bangalore"
                    />
                  </div>

                  {/* Preferred Date & Time */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Preferred Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                      />
                    </div>

                    <div>
                      <Label htmlFor="time">Preferred Time</Label>
                      <Select
                        value={formData.preferredTime}
                        onValueChange={(value) => setFormData({ ...formData, preferredTime: value })}
                      >
                        <SelectTrigger id="time">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="morning">Morning (8 AM - 12 PM)</SelectItem>
                          <SelectItem value="afternoon">Afternoon (12 PM - 4 PM)</SelectItem>
                          <SelectItem value="evening">Evening (4 PM - 8 PM)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Condition */}
                  <div>
                    <Label htmlFor="condition">Your Condition/Concern</Label>
                    <Input
                      id="condition"
                      value={formData.condition}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                      placeholder="e.g., Back pain, Sports injury"
                    />
                  </div>

                  {/* Additional Notes */}
                  <div>
                    <Label htmlFor="notes">Additional Notes</Label>
                    <Textarea
                      id="notes"
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="Any additional information you'd like to share"
                      rows={4}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg" disabled={createBooking.isPending}>
                    {createBooking.isPending ? "Submitting..." : "Submit Booking Request"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>
                By submitting this form, you agree to be contacted by our team regarding your
                appointment.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <CTABar />
    </div>
  );
}
