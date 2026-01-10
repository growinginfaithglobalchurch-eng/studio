
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Shield, BookOpen, Handshake, Users, Globe, Target, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectItem
} from '@/components/ui/select';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { CodeBlock } from "@/components/code-block";
import { cn } from "@/lib/utils";

const trainingSchedule = [
    {
        day: "Day 1: Foundations & Kingdom Culture",
        icon: <Shield className="h-6 w-6 text-accent" />,
        sessions: [
            { 
                title: "Session 1: Kingdom Protocols & Honor", 
                description: "Understanding the culture of honor, submission, and spiritual order.",
                content: {
                    scriptures: ["Romans 12:10", "Hebrews 13:17", "1 Peter 2:17"],
                    points: [
                        "Honor is the currency of the Kingdom.",
                        "Submission to spiritual authority is for protection and alignment, not control.",
                        "Order precedes power; God moves in structured environments."
                    ],
                    application: "During your visit, practice greeting leaders and members with honor. Listen more than you speak in initial meetings."
                }
            },
            { 
                title: "Session 2: Core Doctrines Overview", 
                description: "A refresher on the foundational beliefs of our faith and ministry.",
                content: {
                    scriptures: ["1 Corinthians 15:3-4", "John 3:16", "Ephesians 2:8-9"],
                    points: [
                        "The centrality of Christ's death, burial, and resurrection.",
                        "Salvation by grace through faith.",
                        "The inerrancy and authority of Scripture."
                    ],
                    application: "Write down one core doctrine you want to understand more deeply during your visit."
                }
            },
            { 
                title: "Session 3: Introduction to Spirit Warfare", 
                description: "The believer's authority and the rules of engagement.",
                content: {
                    scriptures: ["Ephesians 6:12", "Luke 10:19", "2 Corinthians 10:4-5"],
                    points: [
                        "We fight from a position of victory, not for victory.",
                        "Our authority is delegated by Christ.",
                        "Warfare is about legislation and enforcement, not emotional struggle."
                    ],
                    application: "Begin to identify any thoughts or beliefs you hold that are contrary to your identity in Christ."
                }
            },
        ]
    },
    {
        day: "Day 2: Identity & Purpose",
        icon: <Target className="h-6 w-6 text-accent" />,
        sessions: [
            { 
                title: "Session 1: Your Identity in Christ", 
                description: "Deep dive into who you are as a citizen of the Kingdom.",
                content: {
                    scriptures: ["2 Corinthians 5:17", "1 Peter 2:9", "Galatians 2:20"],
                    points: [
                        "You are a new creation; the old has passed away.",
                        "You are part of a chosen people, a royal priesthood.",
                        "It is no longer you who live, but Christ who lives in you."
                    ],
                    application: "Memorize 1 Peter 2:9 and declare it over yourself throughout the day."
                }
            },
            { 
                title: "Session 2: Discovering Your Tribe", 
                description: "Identifying your primary spiritual function (Eagle, Lion, Marine).",
                content: {
                    scriptures: ["1 Corinthians 12:4-7", "Romans 12:6-8"],
                    points: [
                        "Eagles: Prophetic, visionary, operate in the heavens (air).",
                        "Lions: Authoritative, governmental, establish order on the earth (land).",
                        "Marines: Foundational, break cycles, operate in deep places (sea)."
                    ],
                    application: "Go to the Spirit Warfare page and prayerfully consider which tribe resonates most with your spirit. This is a key part of your integration."
                }
            },
            { 
                title: "Session 3: The Courts of Heaven Simulation", 
                description: "A practical workshop on spiritual legislation.",
                content: {
                    scriptures: ["Job 1:6", "Zechariah 3:1-7", "Revelation 12:10"],
                    points: [
                        "Understanding the roles: Judge, Advocate, Accuser.",
                        "Presenting your case based on the Word and the Blood of Jesus.",
                        "Repentance as a key to revoking the enemy's legal rights."
                    ],
                    application: "Practice writing a simple petition for a personal issue, using scripture as your legal basis."
                }
            },
        ]
    },
    {
        day: "Day 3: Engagement & Mission",
        icon: <Globe className="h-6 w-6 text-accent" />,
        sessions: [
            { 
                title: "Session 1: The War Room: Rules of Engagement", 
                description: "Preparing for effective and disciplined corporate intercession.",
                content: {
                    scriptures: ["1 Corinthians 14:40", "Amos 3:3"],
                    points: [
                        "The importance of unity and agreement.",
                        "Following the designated leader of the prayer watch.",
                        "Staying on the assigned prayer target without deviation."
                    ],
                    application: "Read the War Room Protocols page thoroughly before your first session."
                }
            },
            { 
                title: "Session 2: Community Integration & Service", 
                description: "How to engage with the community and find your place to serve.",
                content: {
                    scriptures: ["Galatians 5:13", "1 Peter 4:10"],
                    points: [
                        "The fastest way to belong is to serve.",
                        "Identify needs and offer your gifts.",
                        "Connect with department leaders to express your interest."
                    ],
                    application: "Browse the 'Departments' page and identify two or three areas where you would be interested in serving during your visit."
                }
            },
            { 
                title: "Session 3: Final Q&A and Commissioning", 
                description: "Final questions and a prayer of impartation for your visit.",
                content: {
                    scriptures: ["Acts 1:8", "Mark 16:15"],
                    points: [
                        "Clarifying any remaining questions about protocols or schedules.",
                        "Receiving a prayer of blessing and commissioning for your visit.",
                        "Understanding the expectation of impartation and transformation."
                    ],
                    application: "Prepare one or two final questions you have for the Q&A session. Come with an open heart, ready to receive."
                }
            },
        ]
    }
]


export default function VisitorTrainingProgramPage() {
    const router = useRouter();
    const [supportType, setSupportType] = useState('');

    const handleContactSupport = () => {
        if (supportType) {
            router.push(`/contact?type=${supportType}`);
        }
    }

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

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-card-foreground">Why This Training is Required</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">To ensure unity, safety, and maximum impact, it is essential that all visitors are aligned with our Kingdom culture and protocols before arriving. This training equips you with the foundational understanding needed to fully participate in and receive from all that God is doing in our midst.</p>
                </CardContent>
            </Card>

            <div>
                <h2 className="text-2xl font-headline font-bold mb-4 text-foreground">Training Curriculum</h2>
                <Accordion type="single" collapsible defaultValue="Day 1: Foundations & Kingdom Culture" className="w-full">
                    {trainingSchedule.map((day) => (
                        <AccordionItem value={day.day} key={day.day}>
                            <AccordionTrigger className="text-xl font-headline hover:no-underline text-foreground">
                                <div className="flex items-center gap-3">
                                    {day.icon}
                                    {day.day}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="pl-4 border-l-2 border-accent ml-4">
                                <div className="space-y-2 pt-4">
                                    {day.sessions.map(session => (
                                        <Accordion key={session.title} type="single" collapsible>
                                            <AccordionItem value={session.title}>
                                                <AccordionTrigger className={cn("font-bold text-lg hover:no-underline", "text-card-foreground")}>{session.title}</AccordionTrigger>
                                                <AccordionContent className="p-4 bg-card rounded-md">
                                                    <div className="space-y-4">
                                                        <div>
                                                            <h5 className="font-semibold text-accent">Key Scriptures</h5>
                                                            <CodeBlock code={session.content.scriptures.join('\n')} />
                                                        </div>
                                                         <div>
                                                            <h5 className="font-semibold text-accent">Teaching Points</h5>
                                                            <ul className="list-disc pl-5 text-muted-foreground">
                                                                {session.content.points.map(p => <li key={p}>{p}</li>)}
                                                            </ul>
                                                        </div>
                                                        <div>
                                                            <h5 className="font-semibold text-accent">Practical Application</h5>
                                                            <p className="text-muted-foreground">{session.content.application}</p>
                                                        </div>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </Accordion>
                                    ))}
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </div>

            <Card>
                <CardHeader className="flex-row items-center gap-4">
                    <ClipboardCheck className="h-8 w-8 text-accent" />
                    <div>
                        <CardTitle>Mandatory Pre-Arrival Training</CardTitle>
                        <CardDescription>
                            This training covers our core values, Kingdom protocols, and prepares you for a powerful time of immersion. Details will be provided upon acceptance.
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                     <Button asChild>
                        <Link href="/visitor-training-program">View Training Curriculum</Link>
                    </Button>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-card-foreground">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        Completion & Support
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">Upon successful completion of this training, all visitors will be given their certification and final visit confirmation. We look forward to welcoming you!</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                         <Button asChild>
                            <Link href="/login">Access Training Portal</Link>
                        </Button>
                        <div className="flex gap-2">
                            <Select onValueChange={setSupportType} value={supportType}>
                                <SelectTrigger className="w-[240px]">
                                    <SelectValue placeholder="Select Support Type" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="local-visitor-support">Local Visitor Support</SelectItem>
                                    <SelectItem value="international-visitor-support">International Visitor Support</SelectItem>
                                </SelectContent>
                            </Select>
                            <Button variant="outline" onClick={handleContactSupport} disabled={!supportType}>
                                Contact Support
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
