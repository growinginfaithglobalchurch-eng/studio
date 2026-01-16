'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ScrollAnimator } from '@/components/scroll-animator';

export default function VolunteerPage() {
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        availability: '',
        skills: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({ ...prev, availability: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone || !formData.availability) {
            toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please fill out all required fields.',
            });
            return;
        }
        
        toast({
            title: 'Volunteer Application Submitted!',
            description: "Thank you for your interest in volunteering. We're excited about what God can do through you and will be in touch shortly.",
        });
        
        // Reset form
        setFormData({
            name: '',
            email: '',
            phone: '',
            availability: '',
            skills: '',
            message: ''
        });
    };

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <ScrollAnimator>
              <div>
                  <div className="flex items-center gap-3 mb-2">
                      <Users className="h-8 w-8 text-accent" />
                      <h1 className="text-3xl font-headline font-bold text-foreground">Volunteer with Royal Life TV</h1>
                  </div>
                  <p className="text-muted-foreground">
                    Use your gifts and talents to serve in the ministry.
                  </p>
              </div>
            </ScrollAnimator>

            <ScrollAnimator>
              <Card>
                  <CardHeader>
                      <CardTitle>Volunteer Application</CardTitle>
                      <CardDescription>
                          Join our team of dedicated volunteers and be a part of what God is doing.
                      </CardDescription>
                  </CardHeader>
                  <CardContent>
                      <form onSubmit={handleSubmit} className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                  <Label htmlFor="name">Full Name</Label>
                                  <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" required />
                              </div>
                              <div className="space-y-2">
                                  <Label htmlFor="email">Email</Label>
                                  <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" required />
                              </div>
                          </div>
                           <div className="grid md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                  <Label htmlFor="phone">Phone Number</Label>
                                  <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="(555) 123-4567" required />
                              </div>
                              <div className="space-y-2">
                                  <Label htmlFor="availability">Availability</Label>
                                  <Select onValueChange={handleSelectChange} value={formData.availability} required>
                                      <SelectTrigger><SelectValue placeholder="Select your availability" /></SelectTrigger>
                                      <SelectContent>
                                          <SelectItem value="1-5">1-5 hours/week</SelectItem>
                                          <SelectItem value="5-10">5-10 hours/week</SelectItem>
                                          <SelectItem value="10+">10+ hours/week</SelectItem>
                                          <SelectItem value="project-based">Project-based</SelectItem>
                                      </SelectContent>
                                  </Select>
                              </div>
                          </div>
                           <div className="space-y-2">
                              <Label>Areas of Interest</Label>
                              <p className="text-sm text-muted-foreground">e.g., Media, Hospitality, Prayer, Administration, etc. Please list them below.</p>
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="skills">Skills & Experience</Label>
                              <Textarea id="skills" name="skills" value={formData.skills} onChange={handleInputChange} placeholder="List any relevant skills, gifts, or experience (e.g., graphic design, video editing, intercession)..." />
                          </div>
                          <div className="space-y-2">
                              <Label htmlFor="message">Why do you want to volunteer?</Label>
                              <Textarea id="message" name="message" value={formData.message} onChange={handleInputChange} placeholder="Share a little about your heart to serve..." />
                          </div>
                          <div className="flex justify-end">
                              <Button type="submit">
                                  <Send className="mr-2 h-4 w-4" />
                                  Submit Application
                              </Button>
                          </div>
                      </form>
                  </CardContent>
              </Card>
            </ScrollAnimator>
        </div>
    );
}
