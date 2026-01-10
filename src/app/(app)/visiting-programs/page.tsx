
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Globe, User, Users, Calendar, CheckSquare, Award, Plane, BookOpen, Clock, Shield, Flame, Briefcase, Handshake, GitBranch, Home, AlertTriangle, Workflow, MapPin, Utensils, Phone, Star, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const dailySchedule = [
    { time: "9:00 AM", activity: "Morning Alignment & Declaration" },
    { time: "10:00 AM", activity: "Workshop: Kingdom Culture" },
    { time: "12:00 PM", activity: "Lunch & Fellowship" },
    { time: "2:00 PM", activity: "War Room Observation" },
    { time: "4:00 PM", activity: "Mentor Feedback Session" },
];

const programTracks = [
    { 
        title: "Leadership Track", 
        icon: <Briefcase className="h-5 w-5 text-accent" />,
        description: "For Tier 3+ visitors. Includes advanced War Room exercises and leadership mentoring.",
        cta: "View Track"
    },
    { 
        title: "Warrior Track", 
        icon: <Shield className="h-5 w-5 text-accent" />,
        description: "Spiritual Warfare immersion with Tribe-based activities and deliverance case studies.",
        cta: "View Track"
    },
];

const resourceLinks = [
    { href: "/admin/teachings", title: "Workshop & Teaching Details", icon: <BookOpen className="h-5 w-5 text-accent" />},
    { href: "/war-room", title: "War Room & Court Access", icon: <Shield className="h-5 w-5 text-accent" />},
]

export default function VisitingProgramsPage() {
    const { toast } = useToast();
    const handleFeedback = () => {
        toast({
            title: "Feedback Submitted",
            description: "Thank you for your valuable input!",
        });
    };
    
    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <Globe className="h-8 w-8 text-accent" />
                    <h1 className="text-3xl font-headline font-bold text-foreground">Visitor Dashboard</h1>
                </div>
                <p className="text-muted-foreground max-w-3xl">
                    Welcome! Here is your hub for the Visiting Program.
                </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Calendar className="h-5 w-5 text-accent" />
                                Today's Schedule
                            </CardTitle>
                            <CardDescription>Your participation overview for today.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <ul className="space-y-3">
                                {dailySchedule.map(item => (
                                    <li key={item.activity} className="flex items-center gap-4 p-3 rounded-lg bg-secondary/50">
                                        <span className="font-bold text-accent w-20">{item.time}</span>
                                        <span className="text-foreground">{item.activity}</span>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Users className="h-5 w-5 text-accent" />
                                Program Tracks
                            </CardTitle>
                            <CardDescription>Explore available program specializations.</CardDescription>
                        </CardHeader>
                        <CardContent className="grid md:grid-cols-2 gap-4">
                            {programTracks.map(track => (
                                <Card key={track.title} className="bg-card">
                                    <CardHeader>
                                        <CardTitle className="flex items-center gap-2 text-lg">{track.icon} {track.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">{track.description}</p>
                                    </CardContent>
                                    <div className="p-6 pt-0">
                                        <Button variant="outline" className="w-full text-white">{track.cta}</Button>
                                    </div>
                                </Card>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <User className="h-5 w-5 text-accent" />
                                Mentor Assignment
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-muted-foreground mb-4">Your assigned mentor is <span className="font-bold text-foreground">Prophetess Norah Tryson</span>.</p>
                            <Button asChild className="w-full">
                                <Link href="/chat">
                                    <MessageSquare className="mr-2 h-4 w-4"/>
                                    Chat with Mentor
                                </Link>
                            </Button>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <BookOpen className="h-5 w-5 text-accent" />
                                Quick Access
                            </CardTitle>
                        </CardHeader>
                         <CardContent className="space-y-3">
                            {resourceLinks.map(link => (
                                <Button key={link.href} variant="outline" asChild className="w-full justify-start gap-2 text-white">
                                    <Link href={link.href}>
                                        {link.icon} {link.title}
                                    </Link>
                                </Button>
                            ))}
                        </CardContent>
                    </Card>
                    <Card>
                         <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Award className="h-5 w-5 text-accent" />
                                Feedback & Certificates
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             <Button className="w-full" onClick={handleFeedback}>Submit Daily Feedback</Button>
                             <Button variant="secondary" className="w-full" asChild>
                                 <Link href="/certificates">View My Certificates</Link>
                             </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
            
            <Alert>
                <AlertTriangle className="h-4 w-4" />
                <AlertTitle className="font-headline">Program Registration</AlertTitle>
                <AlertDescription>
                   New to the program?
                   <Button asChild variant="link" className="p-1 h-auto ml-1">
                        <Link href="/contact?type=visiting-program">Register here</Link>
                   </Button> 
                   to select your program track and get started.
                </AlertDescription>
            </Alert>
        </div>
    );
}
