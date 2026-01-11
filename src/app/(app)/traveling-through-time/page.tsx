
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, BookOpen, CheckCircle, Printer, Rewind, Play, FastForward, Shield, Quote, Zap } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const programSections = [
    { 
        id: "past",
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
        id: "present",
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
        id: "future",
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

const ezekielSections = [
    {
        title: "SECTION 1: THE HAND OF THE LORD — THE GATEWAY TO TIME TRAVEL",
        scripture: "Ezekiel 37:1 — “The hand of the LORD was upon me…”",
        content: "The prophetic journey begins when the hand of God rests upon a man. This hand is not physical—it is a realm, a dimension, a portal, and an activation point.",
        details: {
            "What the Hand of the LORD Represents": [
                "Empowerment: Ability to function beyond human limitation.",
                "Divine Transportation: The hand becomes the vehicle that pulls one out of ordinary consciousness.",
                "Spiritual Permission: You do not travel in the spirit without authorization. God’s hand grants access."
            ]
        },
        revelation: "When the hand of the LORD comes upon a person, time bends, realms open, and eternal information becomes accessible.\nIt means God is about to:\nReveal what was\nCorrect what is\nAnd align what will be\nThis is the prophetic framework for time travel."
    },
    {
        title: "SECTION 2: CARRIED INTO THE SPIRIT — EXITING CHRONOLOGICAL TIME",
        scripture: "“…and carried me out in the spirit of the LORD…”",
        content: "Time travel always involves a carrying.\nTo be carried means:\nYou are lifted from the natural\nYou are shifted into the supernatural\nYou are moved into realms that do not obey earthly laws",
        details: {
            "Two Realms of Time": [
                "Chronos — human, measurable time",
                "Kairos — divine, eternal, timeless dimension"
            ]
        },
        revelation: "When Ezekiel is carried by the Spirit, he enters Kairos, where past, present, and future are open at once.\nThis is why he could:\nWitness a past tragedy\nDiagnose a present condition\nAnd prophesy a future outcome\nAll in one encounter.\n\nTo travel through time spiritually, the Spirit must:\nExtract you from your earthly time\nPlace you into God’s timeline\nShow you the events He wants you to influence\nThis is not imagination—it is spiritual relocation."
    },
    {
        title: "SECTION 3: THE VALLEY OF DRY BONES — TIMELINES THAT DIED",
        scripture: "“…and set me down in the midst of the valley which was full of bones.”",
        content: "The valley represents altars of memory, places of past battles, wounded seasons, dead opportunities, and unfinished journeys. The bones are the evidence of ruined timelines.",
        details: {
            "Bones Represent": [
                "Past failures", "Killed destinies", "Abandoned callings", "Dismantled identities",
                "Purposes destroyed by sin or warfare", "Generational assignments that collapsed"
            ]
        },
        revelation: "Why God Shows Ezekiel Bones\nBecause before God restores your future, He must reveal:\nWhere the break happened\nWhen the death occurred\nHow the enemy entered\nWhat timeline was corrupted\nIt is impossible to restore what you cannot see.\n\nProphetic Depth\nThe bones were “very dry,” meaning those events died long ago.\nThis reveals:\nTime does not heal spiritual wounds—prophecy does.\nWhat died in your great-grandfather can still affect you.\nLost timelines do not disappear—they wait for a prophet to resurrect them."
    },
    {
        title: "SECTION 4: THE DIVINE QUESTION — CAN THE TIMELINE BE REPAIRED?",
        scripture: "“Son of man, can these bones live?”",
        content: "God is asking Ezekiel:\nCan you see beyond history?\nCan you see beyond defeat?\nCan you see a future inside a ruined past?",
        details: {
            "Prophetic Insight": ["Time travel requires prophetic sight. If you cannot see a possibility, you cannot prophesy it."],
            "Why God Asked the Question": ["To measure Ezekiel’s faith", "To measure Ezekiel’s vision", "To measure Ezekiel’s alignment with eternity"]
        },
        revelation: "The prophet answers:\n“O Lord God, You know.”\nThis is the posture of all who operate in the spirit:\nThey trust God’s eternal knowledge\nThey do not speak from earth\nThey speak from heaven’s point of view"
    },
    {
        title: "SECTION 5: THE COMMAND — “PROPHESY TO THE BONES”",
        content: "Here is the mystery:\nGod did not speak to the bones Himself.\nHe told Ezekiel to speak.\nBecause prophecy is the technology by which man influences time.",
        details: {
            "Why Prophecy Is the Tool of Time Travel": [
                "Prophecy corrects the past. Dead bones—past events—respond to prophetic command.",
                "Prophecy transforms the present.",
                "Prophecy constructs the future.",
                "Prophecy brings God’s eternal will into human time."
            ]
        },
        revelation: "Prophecy is the only language that bones can hear.\nYour past cannot hear your crying.\nYour past cannot hear your complaining.\nYour past cannot hear your regret.\nYour past hears only one thing:\nTHE WORD OF THE LORD."
    },
    {
        title: "SECTION 6: THE SOUND — THE TIMELINE BEGINS TO SHIFT",
        scripture: "“And there was a noise…”",
        content: "When Ezekiel prophesied, the unseen realm reacted. Before manifestation, there is movement.",
        details: {
            "Noise Represents": ["Spiritual systems rearranging", "Angelic activity", "Judicial rewiring of timelines", "Scattered pieces returning to their appointed order"],
            "Shaking Represents": ["Old laws being broken", "Altars collapsing", "Covenants reversing", "Ancestral patterns losing power", "Spiritual verdicts being overturned"],
            "Bones Coming Together": ["Lost years", "Lost relationships", "Lost mantles", "Lost opportunities", "Lost favor", "Lost identity", "Lost positions", "Lost health"]
        }
    },
    {
        title: "SECTION 7: THE SECOND LEVEL OF PROPHECY — CALLING THE BREATH",
        content: "Ezekiel prophesies again, this time to the breath (the spirit dimension).",
        details: {
            "Bones = Structure (External Timeline)": ["Events", "Circumstances", "Opportunities", "Seasons", "Relationships"],
            "Breath = Life (Internal Timeline)": ["Purpose", "Destiny", "Mandate", "Anointing", "Identity", "Divine functionality"]
        },
        revelation: "The bones stood, but they were not alive.\nThis means:\nYour life can be organized but dead\nYour marriage can be structured but lifeless\nYour ministry can exist but not breathe\nYour destiny can be rebuilt but not activated\nThe breath is the activation of destiny."
    },
    {
        title: "SECTION 8: THE MIGHTY ARMY — THE FUTURE MANIFESTING IN THE PRESENT",
        scripture: "“And they lived, and stood up upon their feet, an exceeding great army.”",
        content: "This is the ultimate proof of prophetic time travel: A dead past becomes a living future. A broken history becomes a powerful destiny. What collapsed becomes what stands. What died rises as an army.",
        revelation: "Ezekiel did not just witness resurrection—\nHe rewrote history and reshaped the future.\nThis is your assignment:\nTo travel into timelines where the enemy killed something…\n…and to resurrect, restore, reframe, and realign them with God’s eternal design."
    }
];

const ezekielPrayerPoints = [
    "Spirit of God, carry me into the timelines where my destiny was corrupted.",
    "I command every dry bone in my life—LIVE!",
    "Whatever died in my family line, resurrect now!",
    "Every scattered part of my destiny, come together by fire!",
    "I call breath, life, purpose, and power into every dead assignment.",
    "I reverse evil timelines planted in my dreams, childhood, or ancestry.",
    "My future, appear! My destiny, arise! My purpose, manifest!",
    "I align my life with the eternal timeline of God."
];


export default function TravelingThroughTimePage() {
    const { toast } = useToast();

    const handleActivate = (declaration: string) => {
        toast({
            title: "Declaration Activated!",
            description: `You have declared: "${declaration}"`,
        })
    }

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

             {programSections.map(section => (
                <Card key={section.title}>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl flex items-center gap-3">{section.icon} {section.title}</CardTitle>
                        <CardDescription>{section.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-3">
                            <h4 className="font-semibold text-foreground">Action Points:</h4>
                            {section.points.map((point, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                    <Checkbox id={`${section.id}-${index}`} />
                                    <Label htmlFor={`${section.id}-${index}`} className="text-muted-foreground">{point}</Label>
                                </div>
                            ))}
                        </div>
                         <Alert className="mt-4 bg-secondary">
                            <Quote className="h-4 w-4 text-accent"/>
                            <AlertTitle className="text-accent">Declaration of Authority</AlertTitle>
                            <AlertDescription className="italic text-foreground mt-2">
                                "{section.declaration}"
                            </AlertDescription>
                        </Alert>
                        <Button className="mt-4" onClick={() => handleActivate(section.declaration)}>
                            <Play className="mr-2 h-4 w-4" /> Activate Declaration
                        </Button>
                    </CardContent>
                </Card>
            ))}

            <div className="my-12 text-center">
                <h2 className="text-3xl font-headline font-bold text-foreground">Prophetic Deep Dive: The Ezekiel 37 Timeline Restoration Model</h2>
                <p className="mt-2 text-lg text-muted-foreground">By Joseph Tryson</p>
            </div>

            {ezekielSections.map(section => (
                <Card key={section.title}>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">{section.title}</CardTitle>
                        {section.scripture && <CardDescription className="italic">"{section.scripture}"</CardDescription>}
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {section.content && <p className="text-muted-foreground whitespace-pre-wrap">{section.content}</p>}
                        
                        {section.details && Object.entries(section.details).map(([key, value]) => (
                             <div key={key}>
                                <h4 className="font-semibold text-accent mb-2">{key}:</h4>
                                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                    {value.map((p: string) => <li key={p}>{p}</li>)}
                                </ul>
                            </div>
                        ))}
                        
                        {section.revelation && (
                            <Alert className="mt-4 bg-secondary">
                                <Zap className="h-4 w-4 text-accent"/>
                                <AlertTitle className="text-accent">Revelation</AlertTitle>
                                <AlertDescription className="text-foreground whitespace-pre-wrap">
                                    {section.revelation}
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>
            ))}

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Shield className="h-6 w-6 text-accent" />Prayer Points for Activation</CardTitle>
                </CardHeader>
                <CardContent>
                     <ul className="space-y-3">
                        {ezekielPrayerPoints.map(point => (
                            <li key={point} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-muted-foreground">{point}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>


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

    
