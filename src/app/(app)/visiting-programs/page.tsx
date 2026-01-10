
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Globe, User, Users, Calendar, CheckSquare, Award, Plane, BookOpen, Clock, Shield, Flame, Briefcase, Handshake, GitBranch, Home, AlertTriangle, Workflow, MapPin, Utensils, Phone, Star } from "lucide-react";
import Link from "next/link";
import { CodeBlock } from '@/components/code-block';

const programStructure = [
    { 
        value: "registration", 
        title: "Registration & Preparation",
        icon: <CheckSquare className="h-5 w-5 text-accent" />,
        content: [
            "Online application via the app or website.",
            "Identity verification & Kingdom Citizenship check.",
            "Authority tier review (to determine program access).",
            "Pre-visit materials: culture guide, declarations, teaching modules."
        ],
        firebase: `Visitors/
  {visitorId}/
    type: "International | Local"
    status: "Registered | Confirmed | Attended"
    assignedMentorId: "userId"
    programSchedule: [eventIds]`
    },
    { 
        value: "duration", 
        title: "Program Duration Options",
        icon: <Calendar className="h-5 w-5 text-accent" />,
        content: [
            "Short Visit: 1–3 days (introductory exposure)",
            "Intensive Visit: 7–14 days (deep immersion & training)",
            "Global Exchange Program: 1 month (international collaboration & leadership mentoring)"
        ]
    },
    { 
        value: "daily-structure", 
        title: "Daily Structure for Visitors",
        icon: <Clock className="h-5 w-5 text-accent" />,
        content: [
            "Morning Kingdom Alignment & Declaration",
            "Teaching & Workshop Sessions (Kingdom Culture, Authority Tier Guidance, War Room Observation, Courts of Heaven Simulation)",
            "Mentorship & Feedback Sessions with assigned mentor",
            "Evening Reflection & Worship",
            "Optional Global Collaboration Sessions (International only)"
        ]
    },
    { 
        value: "special-programs", 
        title: "Special Programs",
        icon: <Star className="h-5 w-5 text-accent" />,
        content: [
            "Leadership Track: For Tier 3+ visitors or those showing leadership potential.",
            "Warrior Track: Spiritual Warfare immersion and Tribe-based activities.",
            "Family/Youth Track: Focused on family & kids culture practices for groups."
        ]
    }
];

const logistics = [
    { title: "Accommodation recommendations", icon: <Home className="h-4 w-4" /> },
    { title: "Transport guidance", icon: <MapPin className="h-4 w-4" /> },
    { title: "Meal & schedule coordination", icon: <Utensils className="h-4 w-4" /> },
    { title: "Emergency contacts", icon: <Phone className="h-4 w-4" /> },
];

export default function VisitingProgramsPage() {
    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <Globe className="h-8 w-8 text-accent" />
                    <h1 className="text-3xl font-headline font-bold text-foreground">Visiting Programs</h1>
                </div>
                <p className="text-muted-foreground max-w-3xl">
                    Experiencing the Kingdom Firsthand. A structured ministry engagement and Kingdom experience system for both international and local participants.
                </p>
                <blockquote className="mt-4 pl-4 border-l-2 border-accent italic text-muted-foreground">
                    “Go therefore and make disciples of all nations…” — Matthew 28:19
                </blockquote>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Purpose of the Program</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
                        <li className="flex items-center gap-3"><Users className="h-5 w-5 text-accent" /> Immerse visitors in Kingdom culture.</li>
                        <li className="flex items-center gap-3"><Briefcase className="h-5 w-5 text-accent" /> Provide spiritual mentorship and exposure.</li>
                        <li className="flex items-center gap-3"><Handshake className="h-5 w-5 text-accent" /> Strengthen identity as Kingdom citizens.</li>
                        <li className="flex items-center gap-3"><Flame className="h-5 w-5 text-accent" /> Offer practical engagement in War Rooms & Courts.</li>
                        <li className="flex items-center gap-3"><GitBranch className="h-5 w-5 text-accent" /> Build local and international networks.</li>
                    </ul>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Plane className="h-5 w-5 text-accent"/> International Visitors</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-muted-foreground">From other countries seeking Kingdom exposure, participating virtually or physically. Access to translation support, housing info, and guided experiences.</p>
                    </CardContent>
                    <div className="p-6 pt-0">
                         <Button asChild>
                            <Link href="/contact?type=visiting-program">Apply Now</Link>
                        </Button>
                    </div>
                </Card>
                 <Card className="flex flex-col">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-accent"/> Local Visitors</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-muted-foreground">From within the country with easier access to physical programs, focused on deep spiritual integration and community mentorship.</p>
                    </CardContent>
                    <div className="p-6 pt-0">
                         <Button asChild>
                            <Link href="/contact?type=visiting-program">Apply Now</Link>
                        </Button>
                    </div>
                </Card>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Workflow className="h-6 w-6 text-accent"/> Program Structure</CardTitle>
                </CardHeader>
                <CardContent>
                     <Accordion type="single" collapsible className="w-full">
                        {programStructure.map(item => (
                            <AccordionItem value={item.value} key={item.value}>
                                <AccordionTrigger className="text-lg font-headline hover:no-underline p-4 hover:bg-muted/50 rounded-md">
                                    <div className="flex items-center gap-3">
                                        {item.icon} {item.title}
                                    </div>
                                </AccordionTrigger>
                                <AccordionContent className="pl-8">
                                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                        {item.content.map(point => <li key={point}>{point}</li>)}
                                    </ul>
                                    {item.firebase && (
                                        <div className="mt-4">
                                            <h4 className="font-semibold text-sm text-foreground mb-2">Firebase Integration:</h4>
                                            <CodeBlock code={item.firebase} />
                                        </div>
                                    )}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-accent"/> Logistics & Special Notes</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                             <h4 className="font-semibold text-foreground mb-2">Logistics Support</h4>
                            <ul className="space-y-2 text-muted-foreground">
                                {logistics.map(item => <li key={item.title} className="flex items-center gap-2">{item.icon}{item.title}</li>)}
                            </ul>
                             <h4 className="font-semibold text-foreground mt-4 mb-2">Firebase Integration:</h4>
                             <CodeBlock code={`Visitors/{visitorId}/logistics:
  accommodation: "Hotel/Hostel"
  transport: "Pick-up service"
  mealPlan: "Standard / Special"`} />
                        </div>
                        <div className="border-t pt-4">
                            <h4 className="font-semibold text-foreground mb-2">Special Notes for International Visitors</h4>
                            <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                <li>Visa & travel advice (if physical visit)</li>
                                <li>Time-zone synchronized virtual sessions</li>
                                <li>Translated materials & app notifications</li>
                                <li>Cultural orientation modules</li>
                            </ul>
                        </div>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-accent"/> Feedback & Certification</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            <li><strong>Daily Feedback:</strong> Short survey after sessions.</li>
                            <li><strong>Completion Certificate:</strong> Digital Kingdom Visitor Certificate.</li>
                            <li><strong>Authority Badge (optional):</strong> Based on program engagement and assigned via your profile.</li>
                        </ul>
                        <h4 className="font-semibold text-foreground mt-4 mb-2">Firebase Integration:</h4>
                        <CodeBlock code={`Visitors/{visitorId}/completion:
  certificateIssued: true
  authorityBadge: "Visitor Engaged"
  feedbackScore: 4.8/5`} />
                    </CardContent>
                </Card>
            </div>
            
            <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="font-headline">Program Laws & Protocols</AlertTitle>
                <AlertDescription>
                    <ul className="list-disc pl-5 mt-2 space-y-1">
                        <li>Visitors must respect Kingdom culture & protocols.</li>
                        <li>War Room & Court participation is strictly tier-dependent.</li>
                        <li>Violations may result in expulsion or temporary in-app restrictions.</li>
                        <li>All visitors must align daily with Kingdom Declarations and Daily Practices.</li>
                    </ul>
                </AlertDescription>
            </Alert>
            
            <Card className="text-center p-8 bg-secondary/30">
                <CardTitle className="font-headline text-2xl">Ready to Experience the Kingdom?</CardTitle>
                <CardDescription className="mt-2 mb-6 max-w-xl mx-auto">
                    Submit your application to begin your journey of immersion, mentorship, and activation.
                </CardDescription>
                <Button size="lg" asChild>
                    <Link href="/contact?type=visiting-program">Apply Now</Link>
                </Button>
            </Card>

        </div>
    );
}
