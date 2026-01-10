
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Handshake, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function ContactPage() {
    const { toast } = useToast();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        ministryName: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

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
            description: 'Thank you for your inquiry. Our partnerships team will get back to you shortly.',
        });
        
        setFormData({
            name: '',
            email: '',
            ministryName: '',
            message: ''
        });
    };

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <Handshake className="h-8 w-8 text-accent" />
                    <h1 className="text-3xl font-headline font-bold text-foreground">Contact Our Partnerships Team</h1>
                </div>
                <p className="text-muted-foreground">
                    We're excited to explore how we can partner together to advance the Kingdom.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Partnership Inquiry</CardTitle>
                    <CardDescription>
                        Please fill out the form below and a member of our team will be in touch.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
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
                            <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us a little about your ministry and how you'd like to partner with us..." required className="text-white" />
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
