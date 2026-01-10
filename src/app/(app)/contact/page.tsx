
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Handshake, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const partnershipType = searchParams.get('type');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        ministryName: '',
        message: '',
        partnershipType: ''
    });

    useEffect(() => {
        let type = 'General';
        if (partnershipType === 'church') {
            type = 'Partner Church';
        } else if (partnershipType === 'ministry') {
            type = 'Ministry Partner';
        } else if (partnershipType === 'visiting-program') {
            type = 'Visiting Program Application';
        }
        setFormData(prev => ({...prev, partnershipType: type}));
    }, [partnershipType]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please fill out all required fields.',
            });
            return;
        }
        
        toast({
            title: 'Message Sent!',
            description: 'Thank you for your inquiry. Our team will get back to you shortly.',
        });
        
        let type = 'General';
        if (partnershipType === 'church') {
            type = 'Partner Church';
        } else if (partnershipType === 'ministry') {
            type = 'Ministry Partner';
        } else if (partnershipType === 'visiting-program') {
            type = 'Visiting Program Application';
        }

        setFormData({
            name: '',
            email: '',
            ministryName: '',
            message: '',
            partnershipType: type
        });
    };

    const getTitle = () => {
        if (partnershipType === 'church') return "Partner Church Inquiry";
        if (partnershipType === 'ministry') return "Ministry Partner Inquiry";
        if (partnershipType === 'visiting-program') return "Visiting Program Application";
        return "Partnership Inquiry";
    }

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <Handshake className="h-8 w-8 text-accent" />
                    <h1 className="text-3xl font-headline font-bold text-foreground">Contact Us</h1>
                </div>
                <p className="text-muted-foreground">
                    We're excited to explore how we can partner together to advance the Kingdom.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>{getTitle()}</CardTitle>
                    <CardDescription>
                        Please fill out the form below and a member of our team will be in touch.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                         <div className="space-y-2">
                            <Label htmlFor="partnershipType">Inquiry Type</Label>
                            <Input id="partnershipType" name="partnershipType" value={formData.partnershipType} readOnly className="text-white bg-secondary" />
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Your Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" required className="text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Your Email</Label>
                                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" required className="text-white" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="ministryName">Church / Ministry Name (if applicable)</Label>
                            <Input id="ministryName" name="ministryName" value={formData.ministryName} onChange={handleInputChange} placeholder="e.g., Grace Chapel" className="text-white" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="message">Message</Label>
                            <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us a little about yourself and your interest in the program..." required className="text-white" />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">
                                <Send className="mr-2 h-4 w-4" />
                                Send Message
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
