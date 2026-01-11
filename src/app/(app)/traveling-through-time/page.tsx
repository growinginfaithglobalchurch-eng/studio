
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, CheckCircle, Printer, Rewind, Play, FastForward, Shield, Quote } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import React from "react";

const sections = [
    { 
        title: "Engaging the Past: Timeline Redemption",
        icon: <Rewind className="h-6 w-6 text-accent" />,
        description: "Apply the Blood of Jesus to your personal and generational history to cleanse foundations and nullify demonic legal rights established in the past.",
        points: [
            "Identify key moments of trauma, sin, or covenant-breaking in your life and bloodline.",
            "By faith, stand in the gap and apply the Blood of Jesus to those specific moments.",
            "Renounce any agreements made with darkness, consciously or unconsciously.",
            "Declare that the past no longer has power over your present or future."
        ],
        declaration: "By the Blood of Jesus, I redeem my past. Every faulty foundation is rebuilt on Christ. Every evil covenant is nullified. My history is now His story."
    },
    { 
        title: "Engaging the Present: Seizing Kairos",
        icon: <Play className="h-6 w-6 text-accent" />,
        description: "Live fully in your present moment, discerning God's appointed opportunities (Kairos) and walking in obedience.",
        points: [
            "Ask the Holy Spirit for discernment to recognize God-ordained moments.",
            "Practice immediate obedience to divine instructions.",
            "Declare that you are living in the 'now' of God's timing, not under the oppression of regret (past) or anxiety (future).",
            "Dedicate your daily activities to the glory of God, turning the mundane into the holy."
        ],
        declaration: "I am fully present in this day. I have the wisdom to discern my Kairos moments and the courage to act. I will not miss what God has for me today."
    },
    { 
        title: "Engaging the Future: Destiny Programming",
        icon: <FastForward className="h-6 w-6 text-accent" />,
        description: "Use your prophetic and kingly authority to decree God's written destiny over your future, coding your timeline with Heaven's script.",
        points: [
            "Find God's promises for your life in His Word.",
            "Speak those promises over your future days, weeks, and years.",
            "Forbid any demonic interference or satanic detours from your divine path.",
            "Release angels to prepare the way and orchestrate divine appointments."
        ],
        declaration: "My future is programmed by Heaven. I decree that my days are filled with purpose, favor, and the manifestation of God's promises. I call forth my destiny in the name of Jesus."
    }
];

export default function TravelingThroughTimePage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
             <div className="text-center">
                <h1 className="text-3xl font-headline font-bold text-foreground">Traveling Through Time Program</h1>
                <p className="mt-2 text-lg text-muted-foreground">Redeeming Timelines and Restoring Destinies Through Spiritual Authority</p>
            </div>
            
             <div className="flex justify-end">
                <Button variant="outline" onClick={() => window.print()}>
                    <Printer className="mr-2 h-4 w-4" />
                    Print / Save as PDF
                </Button>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><BookOpen className="h-6 w-6 text-accent" />Theological Foundation</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">God exists outside of time. He is the "I AM," the beginning and the end. For Him, past, present, and future are one eternal now. As believers seated with Christ in heavenly places (Ephesians 2:6), we are granted access to operate from this timeless dimension. Time travel, in this context, is not a physical act but a spiritual one—using our authority in Christ to apply His finished work to our past and legislate His prophetic word into our future.</p>
                    <CodeBlock code={
`Revelation 1:8 - "I am the Alpha and the Omega, the beginning and the ending," says the Lord.
Ephesians 5:16 - "...redeeming the time, because the days are evil."
Joel 2:25 - "So I will restore to you the years that the swarming locust has eaten..."`
                    } />
                </CardContent>
            </Card>

             {sections.map(section => (
                <Card key={section.title}>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl flex items-center gap-3">{section.icon} {section.title}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                         <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            {section.points.map(point => <li key={point}>{point}</li>)}
                        </ul>
                         <Alert className="mt-4">
                            <Quote className="h-4 w-4"/>
                            <AlertTitle>Declaration of Authority</AlertTitle>
                            <AlertDescription className="italic text-foreground">
                                {section.declaration}
                            </AlertDescription>
                        </Alert>
                    </CardContent>
                </Card>
            ))}

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Shield className="h-6 w-6 text-accent" />Governing Principles</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                     <p className="flex items-start gap-3 text-muted-foreground"><CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />All timeline engagement must be done under the Lordship of Jesus Christ and through the power of the Holy Spirit.</p>
                     <p className="flex items-start gap-3 text-muted-foreground"><CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />This is not an escape from present reality, but an empowerment to transform it.</p>
                     <p className="flex items-start gap-3 text-muted-foreground"><CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />The goal is always to align our lives more fully with God's perfect, written will.</p>
                </CardContent>
            </Card>

        </div>
    );
}
