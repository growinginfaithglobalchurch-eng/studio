
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, BookOpen, Handshake, Users, Globe, Target } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const trainingSchedule = [
    {
        day: "Day 1: Foundations & Kingdom Culture",
        icon: <Shield className="h-6 w-6 text-accent" />,
        sessions: [
            { title: "Session 1: Kingdom Protocols & Honor", description: "Understanding the culture of honor, submission, and spiritual order." },
            { title: "Session 2: Core Doctrines Overview", description: "A refresher on the foundational beliefs of our faith and ministry." },
            { title: "Session 3: Introduction to Spirit Warfare", description: "The believer's authority and the rules of engagement." },
        ]
    },
    {
        day: "Day 2: Identity & Purpose",
        icon: <Target className="h-6 w-6 text-accent" />,
        sessions: [
            { title: "Session 1: Your Identity in Christ", description: "Deep dive into who you are as a citizen of the Kingdom." },
            { title: "Session 2: Discovering Your Tribe", description: "Identifying your primary spiritual function (Eagle, Lion, Marine)." },
            { title: "Session 3: The Courts of Heaven Simulation", description: "A practical workshop on spiritual legislation." },
        ]
    },
    {
        day: "Day 3: Engagement & Mission",
        icon: <Globe className="h-6 w-6 text-accent" />,
        sessions: [
            { title: "Session 1: The War Room: Rules of Engagement", description: "Preparing for effective and disciplined corporate intercession." },
            { title: "Session 2: Community Integration & Service", description: "How to engage with the community and find your place to serve." },
            { title: "Session 3: Final Q&A and Commissioning", description: "Final questions and a prayer of impartation for your visit." },
        ]
    }
]


export default function VisitorTrainingProgramPage() {

    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="h-8 w-8 text-accent" />
                    <h1 className="text-3xl font-headline font-bold text-foreground">Visitor Training Program</h1>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                    Mandatory 3-Day Pre-Arrival Training to prepare you for a powerful immersion experience.
                </p>
            </div>

            <Card className="bg-secondary/30">
                <CardHeader>
                    <CardTitle className="font-headline">Why This Training is Required</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">To ensure unity, safety, and maximum impact, it is essential that all visitors are aligned with our Kingdom culture and protocols before arriving. This training equips you with the foundational understanding needed to fully participate in and receive from all that God is doing in our midst.</p>
                </CardContent>
            </Card>

            <div>
                <h2 className="text-2xl font-headline font-bold mb-4">Training Curriculum</h2>
                <Accordion type="single" collapsible defaultValue="Day 1" className="w-full">
                    {trainingSchedule.map((day) => (
                        <AccordionItem value={day.day} key={day.day}>
                            <AccordionTrigger className="text-lg font-headline hover:no-underline">
                                <div className="flex items-center gap-3">
                                    {day.icon}
                                    {day.day}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                                <div className="space-y-4 pl-8 pt-4">
                                    {day.sessions.map(session => (
                                        <div key={session.title} className="pb-4 border-b border-border last:border-b-0">
                                            <h4 className="font-bold text-foreground">{session.title}</h4>
                                            <p className="text-muted-foreground mt-1">{session.description}</p>
                                        </div>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        Completion & Next Steps
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">Upon successful completion of this training, you will receive a certificate and your final visit confirmation. We look forward to welcoming you!</p>
                    <div className="flex gap-4">
                         <Button asChild>
                            <Link href="/login">Access Training Portal</Link>
                        </Button>
                        <Button asChild variant="outline">
                            <Link href="/contact" className="text-white">Contact Support</Link>
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
