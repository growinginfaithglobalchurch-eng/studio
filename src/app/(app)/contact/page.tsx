
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
import { ScrollAnimator } from '@/components/scroll-animator';

export default function ContactPage() {
    const { toast } = useToast();
    const searchParams = useSearchParams();
    const inquiryTypeParam = searchParams.get('type');

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        ministryName: '',
        message: '',
        inquiryType: ''
    });

    useEffect(() => {
        let type = 'General Inquiry';
        switch (inquiryTypeParam) {
            case 'church':
                type = 'Partner Church Inquiry';
                break;
            case 'ministry':
                type = 'Ministry Partner Inquiry';
                break;
            case 'visiting-program':
                type = 'Visiting Program Application';
                break;
            case 'local-visitor-support':
                type = 'Local Visitor Support';
                break;
            case 'international-visitor-support':
                type = 'International Visitor Support';
                break;
        }
        setFormData(prev => ({...prev, inquiryType: type}));
    }, [inquiryTypeParam]);

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
            description: 'Thank you for your inquiry. Our team will get back to you shortly.',
        });
        
        // Reset form but keep inquiry type
        setFormData(prev => ({
            name: '',
            email: '',
            ministryName: '',
            message: '',
            inquiryType: prev.inquiryType
        }));
    };

    const getTitle = () => {
        switch (inquiryTypeParam) {
            case 'church': return "Partner Church Inquiry";
            case 'ministry': return "Ministry Partner Inquiry";
            case 'visiting-program': return "Visiting Program Application";
            case 'local-visitor-support': return "Local Visitor Support";
            case 'international-visitor-support': return "International Visitor Support";
            default: return "Contact Us";
        }
    }

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <ScrollAnimator>
              <div>
                  <div className="flex items-center gap-3 mb-2">
                      <Handshake className="h-8 w-8 text-accent" />
                      <h1 className="text-3xl font-headline font-bold text-foreground">{getTitle()}</h1>
                  </div>
                  <p className="text-muted-foreground">
                      We're excited to explore how we can partner together to advance the Kingdom.
                  </p>
              </div>
            </ScrollAnimator>

            <ScrollAnimator>
              <Card>
                  <CardHeader>
                      <CardTitle>{formData.inquiryType}</CardTitle>
                      <CardDescription>
                          Please fill out the form below and a member of our team will be in touch.
                      </CardDescription>
                  </CardHeader>
                  <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="space-y-2">
                              <Label htmlFor="inquiryType">Inquiry Type</Label>
                              <Input id="inquiryType" name="inquiryType" value={formData.inquiryType} readOnly className="bg-secondary" />
                          </div>
                          <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                  <Label htmlFor="name">Your Name</Label>
                                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" required />
                              </div>
                              <div className="space-y-2">
                                  <Label htmlFor="email">Your Email</Label>
                                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" required />
                              </div>
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="ministryName">Church / Ministry Name (if applicable)</Label>
                              <Input id="ministryName" name="ministryName" value={formData.ministryName} onChange={handleInputChange} placeholder="e.g., Grace Chapel" />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="message">Message</Label>
                              <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us a little about yourself and your interest in the program..." required />
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
            </ScrollAnimator>
        </div>
    );
}
