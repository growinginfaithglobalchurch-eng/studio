
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Plane, User, Shield, Briefcase, Upload, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function InternationalVisitorRegistrationPage() {
    const { toast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        toast({
            title: 'Application Submitted!',
            description: 'Thank you for registering. Our team will review your application and be in touch shortly.',
        });
        // In a real app, you would collect and send form data here.
    };

    return (
        <div className="min-h-screen bg-secondary p-4 sm:p-8 flex items-center justify-center">
            <Card className="w-full max-w-4xl">
                <CardHeader className="text-center">
                    <div className="flex items-center justify-center gap-3 mb-2">
                        <Plane className="h-8 w-8 text-accent" />
                        <h1 className="text-3xl font-headline font-bold text-foreground">International Visitor Registration</h1>
                    </div>
                    <CardDescription>
                        Please complete all sections of the form to apply for the visiting program.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-12">

                        {/* Personal Information */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b pb-2">
                                <User className="h-6 w-6 text-accent" />
                                <h2 className="text-xl font-bold font-headline text-foreground">Personal Information</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2"><Label htmlFor="fullName">Full Name</Label><Input id="fullName" required className="text-white" /></div>
                                <div className="space-y-2"><Label>Gender</Label><Select required><SelectTrigger><SelectValue placeholder="Select gender" /></SelectTrigger><SelectContent><SelectItem value="male">Male</SelectItem><SelectItem value="female">Female</SelectItem><SelectItem value="other">Other</SelectItem></SelectContent></Select></div>
                                <div className="space-y-2"><Label htmlFor="dob">Date of Birth</Label><Input id="dob" type="date" required className="text-white" /></div>
                                <div className="space-y-2"><Label htmlFor="nationality">Nationality</Label><Input id="nationality" required className="text-white" /></div>
                                <div className="space-y-2"><Label htmlFor="passportNumber">Passport Number</Label><Input id="passportNumber" required className="text-white" /></div>
                                <div className="space-y-2"><Label htmlFor="passportExpiry">Passport Expiry Date</Label><Input id="passportExpiry" type="date" required className="text-white" /></div>
                                <div className="space-y-2"><Label htmlFor="email">Email Address</Label><Input id="email" type="email" required className="text-white" /></div>
                                <div className="space-y-2"><Label htmlFor="phone">Phone Number</Label><Input id="phone" type="tel" required className="text-white" /></div>
                            </div>
                            <div className="space-y-2"><Label htmlFor="address">Full Address</Label><Textarea id="address" required className="text-white" /></div>
                            <div className="space-y-4 rounded-lg border p-4">
                                <h3 className="font-semibold text-foreground">Emergency Contact</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="space-y-2"><Label htmlFor="emergencyName">Contact Name</Label><Input id="emergencyName" required className="text-white" /></div>
                                    <div className="space-y-2"><Label htmlFor="emergencyRelationship">Relationship</Label><Input id="emergencyRelationship" required className="text-white" /></div>
                                    <div className="space-y-2"><Label htmlFor="emergencyPhone">Contact Phone</Label><Input id="emergencyPhone" type="tel" required className="text-white" /></div>
                                </div>
                            </div>
                        </section>

                        {/* Kingdom Information */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b pb-2">
                                <Shield className="h-6 w-6 text-accent" />
                                <h2 className="text-xl font-bold font-headline text-foreground">Kingdom Information</h2>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Checkbox id="kingdomCitizen" />
                                <Label htmlFor="kingdomCitizen">Are you a Kingdom Citizen?</Label>
                            </div>
                            <div className="space-y-2"><Label htmlFor="kingdomID">Kingdom ID (if applicable)</Label><Input id="kingdomID" className="text-white" /></div>
                            <div className="space-y-2"><Label>Tribe Preference</Label><Select><SelectTrigger><SelectValue placeholder="Select tribe" /></SelectTrigger><SelectContent><SelectItem value="eagle">Eagle</SelectItem><SelectItem value="lion">Lion</SelectItem><SelectItem value="marine">Marine</SelectItem><SelectItem value="all">All Tribes</SelectItem></SelectContent></Select></div>
                            <div className="space-y-2"><Label htmlFor="previousPrograms">Previous Programs Attended (comma-separated)</Label><Input id="previousPrograms" className="text-white" /></div>
                        </section>

                        {/* Program Selection */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b pb-2">
                                <Briefcase className="h-6 w-6 text-accent" />
                                <h2 className="text-xl font-bold font-headline text-foreground">Program Selection</h2>
                            </div>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2"><Label>Program Track</Label><Select required><SelectTrigger><SelectValue placeholder="Select track" /></SelectTrigger><SelectContent><SelectItem value="leadership">Leadership</SelectItem><SelectItem value="warrior">Warrior</SelectItem><SelectItem value="family-youth">Family & Youth</SelectItem></SelectContent></Select></div>
                                <div className="space-y-2"><Label>Desired Duration</Label><Select required><SelectTrigger><SelectValue placeholder="Select duration" /></SelectTrigger><SelectContent><SelectItem value="7-14">7-14 days</SelectItem><SelectItem value="15-30">15-30 days</SelectItem><SelectItem value="30+">30+ days</SelectItem></SelectContent></Select></div>
                                <div className="space-y-2"><Label htmlFor="startDate">Preferred Start Date</Label><Input id="startDate" type="date" required className="text-white" /></div>
                                <div className="space-y-2"><Label htmlFor="endDate">Preferred End Date</Label><Input id="endDate" type="date" required className="text-white" /></div>
                                <div className="space-y-2"><Label>Mode of Participation</Label><Select required><SelectTrigger><SelectValue placeholder="Select mode" /></SelectTrigger><SelectContent><SelectItem value="physical">Physical</SelectItem><SelectItem value="virtual">Virtual</SelectItem></SelectContent></Select></div>
                                <div className="spacey-2"><Label>Primary Language</Label><Input defaultValue="English" className="text-white" /></div>
                            </div>
                             <div className="space-y-2"><Label htmlFor="dietaryRequirements">Dietary Requirements or Allergies</Label><Textarea id="dietaryRequirements" placeholder="e.g., Vegetarian, gluten-free" className="text-white" /></div>
                        </section>

                         {/* Document Upload */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b pb-2">
                                <Upload className="h-6 w-6 text-accent" />
                                <h2 className="text-xl font-bold font-headline text-foreground">Document Uploads</h2>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2"><Label htmlFor="passportCopy">Passport Copy</Label><Input id="passportCopy" type="file" required /></div>
                                <div className="space-y-2"><Label htmlFor="visaDocuments">Visa Documents (if applicable)</Label><Input id="visaDocuments" type="file" /></div>
                                <div className="space-y-2"><Label htmlFor="profilePhoto">Profile Photo</Label><Input id="profilePhoto" type="file" required /></div>
                            </div>
                        </section>

                         {/* Agreements */}
                        <section className="space-y-6">
                            <div className="flex items-center gap-3 border-b pb-2">
                                <CheckCircle className="h-6 w-6 text-accent" />
                                <h2 className="text-xl font-bold font-headline text-foreground">Agreements</h2>
                            </div>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-2"><Checkbox id="kingdomProtocols" required /><div className="grid gap-1.5 leading-none"><Label htmlFor="kingdomProtocols">I agree to abide by all Kingdom Protocols.</Label></div></div>
                                <div className="flex items-start space-x-2"><Checkbox id="mentorMonitoring" required /><div className="grid gap-1.5 leading-none"><Label htmlFor="mentorMonitoring">I consent to mentor monitoring and feedback.</Label></div></div>
                                <div className="flex items-start space-x-2"><Checkbox id="dailyFeedback" required /><div className="grid gap-1.5 leading-none"><Label htmlFor="dailyFeedback">I commit to providing daily feedback during the program.</Label></div></div>
                            </div>
                            <div className="space-y-2"><Label>Mentor Preference</Label><RadioGroup defaultValue="auto" className="flex flex-col md:flex-row gap-4"><div className="flex items-center space-x-2"><RadioGroupItem value="auto" id="auto" /><Label htmlFor="auto">Automatic Assignment</Label></div><div className="flex items-center space-x-2"><RadioGroupItem value="request" id="request" /><Label htmlFor="request">Request a Specific Mentor</Label></div></RadioGroup></div>
                        </section>
                        
                        <div className="flex justify-end pt-8">
                            <Button type="submit" size="lg">Submit Application</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
