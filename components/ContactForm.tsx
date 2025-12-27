"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContact } from "@/app/actions";
import { useState, useTransition } from "react";
import { toast } from "sonner";

export function ContactForm() {
    const [isPending, startTransition] = useTransition();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formDataObj = new FormData(e.currentTarget);

        startTransition(async () => {
            const result = await submitContact(formDataObj);

            if (result.success) {
                toast.success(result.message);
                setFormData({
                    name: "",
                    email: "",
                    phone: "",
                    subject: "",
                    message: "",
                });
            } else {
                toast.error(result.message);
            }
        });
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                    Fill out the form below and we'll get back to you as soon as possible
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
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
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            placeholder="+91 98765 43210"
                        />
                    </div>

                    <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            placeholder="What is this regarding?"
                        />
                    </div>

                    <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                            id="message"
                            name="message"
                            required
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            placeholder="Tell us how we can help you"
                            rows={6}
                        />
                    </div>

                    <Button type="submit" className="w-full" size="lg" disabled={isPending}>
                        {isPending ? "Sending..." : "Send Message"}
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
