
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardList, Waves, Wind, Sparkles, HandCoins, UserPlus, BookOpen, Mic, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const serviceElements = [
    {
        icon: <Waves className="h-6 w-6 text-accent" />,
        title: "1. The Atmosphere & Opening",
        description: "Setting a spiritual atmosphere of worship, reverence, and expectation. This is where we welcome the presence of the Holy Spirit.",
        details: ["Opening Prayer", "Praise & Worship", "Prophetic Declarations"]
    },
    {
        icon: <Sparkles className="h-6 w-6 text-accent" />,
        title: "2. Revelation & The Word",
        description: "The centerpiece of the service, where the Word of God is taught with clarity, revelation, and power.",
        details: ["Announcements & Welcome", "Tithes & Offerings Teaching", "The Sermon (Rhema Word)"]
    },
    {
        icon: <Wind className="h-6 w-6 text-accent" />,
        title: "3. Impartation & Ministry",
        description: "The time for personal ministry, where the congregation receives from God through the laying on of hands, prophecy, and prayer.",
        details: ["Altar Call (Salvation, Rededication)", "Healing & Deliverance Ministry", "Prophetic Ministry"]
    },
    {
        icon: <Users className="h-6 w-6 text-accent" />,
        title: "4. Closing & Commissioning",
        description: "Sending the church out into the world, empowered and equipped to demonstrate the Kingdom.",
        details: ["Closing Announcements", "Benediction & Blessing", "Fellowship"]
    }
];

export default function ServiceProgrammingPage() {
    const { toast } = useToast();

    const handleJoin = () => {
        toast({
            title: "Request to Join Sent!",
            description: "Your request to join the Service Planning Team has been submitted. A team lead will be in touch."
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <ClipboardList className="h-8 w-8 text-accent" />
                    <h1 className="text-3xl font-headline font-bold text-foreground">Service Programming & Flow</h1>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                    The blueprint for designing and leading a powerful, Spirit-led church service.
                </p>
            </div>

            <Card className="bg-secondary/30">
                <CardHeader className="flex-row items-center gap-4">
                    <BookOpen className="h-8 w-8 text-accent" />
                    <div>
                        <CardTitle>The Theology of Service Flow</CardTitle>
                        <CardDescription>
                            A church service is not a collection of random activities, but a spiritual journey. It is intentionally designed to lead people from the outer court (praise) into the Holy of Holies (worship & revelation) and back out to the world (commissioning).
                        </CardDescription>
                    </div>
                </CardHeader>
            </Card>

            <div className="space-y-8">
                <h2 className="text-2xl font-headline font-bold">The Four Pillars of Our Service Structure</h2>
                <div className="grid lg:grid-cols-2 gap-6">
                    {serviceElements.map(project => (
                        <Card key={project.title}>
                            <CardHeader>
                                <div className="flex items-center gap-3">
                                    {project.icon}
                                    <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
                                </div>
                                <CardDescription>{project.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <h4 className="font-semibold mb-2 text-card-foreground">Key Components:</h4>
                                <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                                    {project.details.map(detail => <li key={detail}>{detail}</li>)}
                                </ul>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><UserPlus className="h-5 w-5 text-accent" />Get Involved</CardTitle>
                    <CardDescription>Do you have a heart for crafting worship experiences or managing the flow of service? We invite you to join the team.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">We are looking for Service Leaders, Worship Leaders, Production Team members, and Service Planners.</p>
                    <Button className="w-full" onClick={handleJoin}>Join the Service Planning Team</Button>
                </CardContent>
            </Card>
        </div>
    );
}
