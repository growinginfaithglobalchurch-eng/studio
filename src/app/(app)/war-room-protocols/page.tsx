
'use client';

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Scale, Shield, Users, AlertTriangle, CheckCircle, Handshake, Info, XCircle } from 'lucide-react';
import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const sections = [
    { 
        title: "Nature of the War Room", 
        icon: <Info className="h-6 w-6 text-accent" />,
        points: [
            "Operates under the Lordship of Jesus Christ.",
            "All warfare is conducted from Christ’s victory, not human emotion.",
            "Functions by order, submission, and alignment.",
            "No activity is permitted outside approved protocols."
        ],
        quote: "Disorder weakens authority. Order multiplies power."
    },
    { 
        title: "Who May Enter the War Room", 
        icon: <Users className="h-6 w-6 text-accent" />,
        points: [
            "Registered members with activated Spirit Warfare profile.",
            "Tribe-assigned members (Eagle, Lion, Marine, or All Tribes).",
            "Approved leaders, moderators, and intercessors."
        ],
        restrictions: [
            "No unregistered users.",
            "No anonymous participation.",
            "Kids and minors are restricted from advanced warfare rooms.",
            "Observers may enter only with admin approval."
        ]
    },
    { 
        title: "War Room Code of Conduct",
        icon: <Handshake className="h-6 w-6 text-accent" />,
        subSections: [
            {
                title: "Christ-Centered Language Only",
                points: ["No fear-based, aggressive, or emotional outbursts.", "No glorifying darkness or evil entities.", "No unnecessary naming or exalting of demonic powers."],
                quote: "Authority is expressed calmly, not emotionally."
            },
            {
                title: "Chain of Command",
                points: ["Every session has a Lead Commander, Assigned Tribal Leaders, and Designated Intercessors.", "Instructions must be followed without debate during operations."],
                quote: "Warfare is not democracy; it is command."
            },
            {
                title: "No Unauthorized Declarations",
                points: ["No personal prophecies during warfare unless permitted.", "No independent prayers outside assigned focus.", "No shifting targets mid-operation."],
                quote: "Focus protects effectiveness."
            }
        ]
    },
    {
        title: "War Room Session Protocol",
        icon: <Scale className="h-6 w-6 text-accent" />,
        description: "Each War Room session follows six sacred phases:",
        phases: [
            { num: 1, name: "Alignment Phase", details: ["Silence or worship", "Heart examination", "Submission to Christ’s authority"] },
            { num: 2, name: "Legal Clearance Phase (Courts of Heaven)", details: ["Repentance where necessary", "Renunciation of legal grounds", "Invocation of the Blood of Jesus"], quote: "No war begins without legal standing." },
            { num: 3, name: "Intelligence Phase", details: ["Briefing by leadership", "Declaration of assignment", "Clarification of target, time, and tribe"] },
            { num: 4, name: "Engagement Phase", details: ["Coordinated prayer and declarations", "Scripture-based enforcement", "Tribe-specific operations only"] },
            { num: 5, name: "Sealing Phase", details: ["Thanksgiving", "Sealing decrees by the Blood of Jesus", "Declaration of victory"] },
            { num: 6, name: "Triumph Phase", details: ["Worship", "Proclamation of Christ’s victory", "No further engagement after closure"], quote: "Victory must be honored, not prolonged." }
        ]
    },
     { 
        title: "Forbidden Practices", 
        icon: <XCircle className="h-6 w-6 text-destructive" />,
        points: [
            "Shouting without authority",
            "Repeating words without instruction",
            "Emotional venting",
            "Fear-driven prayers",
            "Mixing doctrines or practices",
            "Personal deliverance during group warfare"
        ],
        consequences: "Violations result in: Warning, Temporary restriction, or Removal from War Room."
    },
];

export default function WarRoomProtocolsPage() {
    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <BookOpen className="h-8 w-8 text-accent" />
                    <h1 className="text-3xl font-headline font-bold text-foreground">The War Room: Protocols & Rules</h1>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                   “Let all things be done decently and in order.” — 1 Corinthians 14:40
                </p>
                <p className="mt-2 text-lg font-semibold">The War Room is not a chat room. It is a spiritual command center for disciplined, lawful, Christ-centered warfare.</p>
            </div>

            {sections.map(section => (
                <Card key={section.title}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3">{section.icon} {section.title}</CardTitle>
                        {section.description && <CardDescription>{section.description}</CardDescription>}
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {section.points && <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                            {section.points.map(point => <li key={point}>{point}</li>)}
                        </ul>}
                        
                        {section.restrictions && (
                            <div>
                                <h4 className="font-semibold text-foreground mb-2">Restrictions:</h4>
                                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                                    {section.restrictions.map(point => <li key={point}>{point}</li>)}
                                </ul>
                            </div>
                        )}

                        {section.subSections && section.subSections.map(sub => (
                            <div key={sub.title} className="p-4 border rounded-lg">
                                <h4 className="font-bold text-lg text-foreground">{sub.title}</h4>
                                <ul className="list-disc pl-5 space-y-1 text-muted-foreground mt-2">
                                    {sub.points.map(p => <li key={p}>{p}</li>)}
                                </ul>
                                {sub.quote && <p className="mt-3 text-sm italic text-accent font-semibold">“{sub.quote}”</p>}
                            </div>
                        ))}

                        {section.phases && section.phases.map(phase => (
                             <div key={phase.num} className="p-4 border rounded-lg">
                                <h4 className="font-bold text-lg text-foreground">{phase.num}. {phase.name}</h4>
                                <ul className="list-disc pl-5 space-y-1 text-muted-foreground mt-2">
                                    {phase.details.map(d => <li key={d}>{d}</li>)}
                                </ul>
                                {phase.quote && <p className="mt-3 text-sm italic text-accent font-semibold">“{phase.quote}”</p>}
                            </div>
                        ))}

                        {section.quote && <p className="mt-2 text-md italic text-accent font-semibold">“{section.quote}”</p>}

                        {section.consequences && (
                             <Alert variant="destructive">
                                <AlertTriangle className="h-4 w-4" />
                                <AlertTitle>Consequences for Violations</AlertTitle>
                                <AlertDescription>
                                    {section.consequences}
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>
            ))}
             <Card>
                <CardHeader><CardTitle className="flex items-center gap-3"><Shield className="h-6 w-6 text-accent"/>Governing Declaration</CardTitle></CardHeader>
                <CardContent>
                     <p className="text-lg italic text-muted-foreground">
                        “I acknowledge that I enter the War Room under the authority of Jesus Christ. I submit to order, discipline, and leadership. I renounce fear, pride, and disorder. I engage from victory, not struggle. I walk in Christ’s triumphal procession.”
                    </p>
                </CardContent>
                <CardFooter>
                    <Button>I Agree & Submit</Button>
                </CardFooter>
             </Card>

        </div>
    )
}
