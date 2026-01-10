'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Wrench, Code, GitBranch, Rocket, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { CodeBlock } from '@/components/code-block';
import Link from 'next/link';

const techStack = [
    "Next.js & React",
    "TypeScript",
    "Tailwind CSS",
    "Shadcn UI",
    "Genkit (for AI features)",
    "Firebase (for backend services)"
];

const currentProjects = [
    {
        title: "Mobile App Development",
        description: "Building the native mobile experience for iOS and Android to provide on-the-go access to all platform features.",
        status: "In Development"
    },
    {
        title: "AI-Powered Mentorship Matching",
        description: "Developing an algorithm to connect mentors and mentees based on spiritual gifts, interests, and experience.",
        status: "Planned"
    },
    {
        title: "Live Stream Platform Upgrade",
        description: "Enhancing our live streaming capabilities with interactive features like live chat, Q&A, and prayer requests.",
        status: "In Development"
    }
];

export default function ProgrammingPage() {
    const { toast } = useToast();

    const handleJoin = () => {
        toast({
            title: "Request to Join Sent!",
            description: "Your request to join the Programming Department has been submitted. A team lead will be in touch."
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <Code className="h-8 w-8 text-accent" />
                    <h1 className="text-3xl font-headline font-bold text-foreground">Programming Department</h1>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                    Developing and managing the church's digital platforms and tools to expand our global reach.
                </p>
            </div>

            <Card className="bg-secondary/30">
                <CardHeader className="flex-row items-center gap-4">
                    <Rocket className="h-8 w-8 text-accent" />
                    <div>
                        <CardTitle>Our Mission</CardTitle>
                        <CardDescription>
                            To build and maintain a world-class digital ecosystem that equips believers, fosters community, and advances the Kingdom of God through technology.
                        </CardDescription>
                    </div>
                </CardHeader>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><GitBranch className="h-5 w-5 text-accent" />Current Projects</CardTitle>
                            <CardDescription>A look at what we're currently building.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {currentProjects.map(project => (
                                <div key={project.title} className="p-3 rounded-lg border">
                                    <div className="flex justify-between items-center">
                                        <h3 className="font-semibold text-foreground">{project.title}</h3>
                                        <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">{project.status}</span>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Wrench className="h-5 w-5 text-accent" />Our Tech Stack</CardTitle>
                        </CardHeader>
                        <CardContent>
                           <CodeBlock code={techStack.join('\n')} />
                        </CardContent>
                    </Card>

                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><UserPlus className="h-5 w-5 text-accent" />Get Involved</CardTitle>
                            <CardDescription>Have a passion for technology and a heart for the Kingdom? We need you!</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <p className="text-sm text-muted-foreground mb-4">We are looking for developers, designers, project managers, and QA testers to join our team.</p>
                            <Button className="w-full" onClick={handleJoin}>Join the Team</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
