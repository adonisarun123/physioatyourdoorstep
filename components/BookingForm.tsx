"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { submitBooking } from "@/app/actions";
import { useState, useTransition } from "react";
import { toast } from "sonner";

interface BookingFormProps {
    services: Array<{ id: number; title: string; slug: string }>;
}

export function BookingForm({ services }: BookingFormProps) {
    const [isPending, startTransition] = useTransition();
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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formDataObj = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await submitBooking(formDataObj);

            if (result.success) {
                toast.success(result.message);
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
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
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
                                name="name"
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
                                name="email"
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
                                name="phone"
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
                            name="serviceId"
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
                            name="locationArea"
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
                                name="preferredDate"
                                type="date"
                                value={formData.preferredDate}
                                onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
                            />
                        </div>

                        <div>
                            <Label htmlFor="time">Preferred Time</Label>
                            <Select
                                name="preferredTime"
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
                            name="condition"
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
                            name="notes"
                            value={formData.notes}
                            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                            placeholder="Any additional information you'd like to share"
                            rows={4}
                        />
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                        {isPending ? "Submitting..." : "Submit Booking Request"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
