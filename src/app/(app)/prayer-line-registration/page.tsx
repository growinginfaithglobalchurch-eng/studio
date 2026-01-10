'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Phone, Send } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PrayerLineRegistrationPage() {
    const { toast } = useToast();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        request: '',
        timeSlot: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value: string) => {
        setFormData(prev => ({ ...prev, timeSlot: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.phone || !formData.timeSlot) {
            toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please fill out all required fields.',
            });
            return;
        }
        
        toast({
            title: 'Registration Submitted!',
            description: 'You have been registered for the prayer line. A minister will contact you at your selected time.',
        });
        
        setFormData({
            name: '',
            email: '',
            phone: '',
            request: '',
            timeSlot: ''
        });
    };

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <Phone className="h-8 w-8 text-accent" />
                    <h1 className="text-3xl font-headline font-bold text-foreground">Prayer Line Registration</h1>
                </div>
                <p className="text-muted-foreground">
                    Register for a personal prayer session with one of our ministers.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Schedule Your Prayer Call</CardTitle>
                    <CardDescription>
                        Please fill out the form below. All information is confidential.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Your Full Name</Label>
                                <Input id="name" name="name" value={formData.name} onChange={handleInputChange} placeholder="John Doe" required className="text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Your Email</Label>
                                <Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} placeholder="you@example.com" required className="text-white" />
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} placeholder="+1 (555) 123-4567" required className="text-white" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="timeSlot">Preferred Time Slot</Label>
                                <Select onValueChange={handleSelectChange} value={formData.timeSlot} required>
                                    <SelectTrigger className="text-white">
                                        <SelectValue placeholder="Select a time" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="morning">Morning (9am - 12pm EST)</SelectItem>
                                        <SelectItem value="afternoon">Afternoon (1pm - 5pm EST)</SelectItem>
                                        <SelectItem value="evening">Evening (7pm - 9pm EST)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="request">Brief Prayer Request (Optional)</Label>
                            <Textarea id="request" name="request" value={formData.request} onChange={handleInputChange} placeholder="Briefly describe what you would like prayer for..." className="text-white" />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">
                                <Send className="mr-2 h-4 w-4" />
                                Register for Prayer
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
