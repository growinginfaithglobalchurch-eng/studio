'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Handshake, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollAnimator } from '@/components/scroll-animator';

export default function JoinPartnershipPage() {
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        organization: '',
        country: '',
        partnershipType: '',
        commitment: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.partnershipType || !formData.commitment) {
            toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please fill out all required fields.',
            });
            return;
        }
        
        toast({
            title: 'Partnership Application Submitted!',
            description: "Thank you for your desire to partner with us. We're excited to connect with you and will be in touch shortly.",
        });
        
        setFormData({
            name: '',
            email: '',
            organization: '',
            country: '',
            partnershipType: '',
            commitment: '',
            message: ''
        });
    };

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <ScrollAnimator>
              <div>
                  <div className="flex items-center gap-3 mb-2">
                      <Handshake className="h-8 w-8 text-accent" />
                      <h1 className="text-3xl font-headline font-bold text-foreground">Join Partnership with Royal Life TV</h1>
                  </div>
                  <p className="text-muted-foreground">
                    Become a partner and join us in our mission to take the gospel to the nations.
                  </p>
              </div>
            </ScrollAnimator>

            <ScrollAnimator>
              <Card>
                  <CardHeader>
                      <CardTitle>Partnership Registration</CardTitle>
                      <CardDescription>
                          Please fill out the form below to express your interest in partnering with us.
                      </CardDescription>
                  </CardHeader>
                  <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                  <Label htmlFor="name">Your Full Name</Label>
                                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" required />
                              </div>
                              <div className="space-y-2">
                                  <Label htmlFor="email">Your Email</Label>
                                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" required />
                              </div>
                          </div>
                           <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                  <Label htmlFor="organization">Church / Organization Name (if applicable)</Label>
                                  <Input id="organization" name="organization" value={formData.organization} onChange={handleInputChange} />
                              </div>
                              <div className="space-y-2">
                                  <Label htmlFor="country">Country</Label>
                                  <Input id="country" name="country" value={formData.country} onChange={handleInputChange} placeholder="e.g., United States" required />
                              </div>
                          </div>
                          <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                  <Label htmlFor="partnershipType">I am joining as a(n)...</Label>
                                  <Select onValueChange={(val) => handleSelectChange('partnershipType', val)} value={formData.partnershipType} required>
                                      <SelectTrigger><SelectValue placeholder="Select partnership type" /></SelectTrigger>
                                      <SelectContent>
                                          <SelectItem value="individual">Individual</SelectItem>
                                          <SelectItem value="church">Church / Ministry</SelectItem>
                                          <SelectItem value="business">Business</SelectItem>
                                      </SelectContent>
                                  </Select>
                              </div>
                              <div className="space-y-2">
                                  <Label htmlFor="commitment">My Primary Commitment is...</Label>
                                  <Select onValueChange={(val) => handleSelectChange('commitment', val)} value={formData.commitment} required>
                                      <SelectTrigger><SelectValue placeholder="Select commitment type" /></SelectTrigger>
                                      <SelectContent>
                                          <SelectItem value="prayer">Prayer Support</SelectItem>
                                          <SelectItem value="financial">Financial Partnership (Monthly)</SelectItem>
                                          <SelectItem value="volunteer">Volunteering Time & Skills</SelectItem>
                                      </SelectContent>
                                  </Select>
                              </div>
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="message">Message (Optional)</Label>
                              <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us a bit about why you want to partner with us..." />
                          </div>
                          <div className="flex justify-end">
                              <Button type="submit">
                                  <Send className="mr-2 h-4 w-4" />
                                  Submit Partnership Application
                              </Button>
                          </div>
                      </form>
                  </CardContent>
              </Card>
            </ScrollAnimator>
        </div>
    );
}
