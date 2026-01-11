
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, Printer, Shield, Zap } from "lucide-react";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const sections = [
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
        revelation: "When the hand of the LORD comes upon a person, time bends, realms open, and eternal information becomes accessible. It means God is about to: Reveal what was, Correct what is, And align what will be. This is the prophetic framework for time travel."
    },
    {
        title: "SECTION 2: CARRIED INTO THE SPIRIT — EXITING CHRONOLOGICAL TIME",
        scripture: "“…and carried me out in the spirit of the LORD…”",
        content: "Time travel always involves a carrying. To be carried means: You are lifted from the natural, You are shifted into the supernatural, You are moved into realms that do not obey earthly laws.",
        details: {
            "Two Realms of Time": [
                "Chronos — human, measurable time",
                "Kairos — divine, eternal, timeless dimension"
            ]
        },
        revelation: "When Ezekiel is carried by the Spirit, he enters Kairos, where past, present, and future are open at once. This is why he could: Witness a past tragedy, Diagnose a present condition, And prophesy a future outcome all in one encounter. To travel through time spiritually, the Spirit must: Extract you from your earthly time, Place you into God’s timeline, Show you the events He wants you to influence. This is not imagination—it is spiritual relocation."
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
        revelation: "Why God Shows Ezekiel Bones: Because before God restores your future, He must reveal: Where the break happened, When the death occurred, How the enemy entered, What timeline was corrupted. It is impossible to restore what you cannot see.\nProphetic Depth: The bones were “very dry,” meaning those events died long ago. This reveals: Time does not heal spiritual wounds—prophecy does. What died in your great-grandfather can still affect you. Lost timelines do not disappear—they wait for a prophet to resurrect them."
    },
    {
        title: "SECTION 4: THE DIVINE QUESTION — CAN THE TIMELINE BE REPAIRED?",
        scripture: "“Son of man, can these bones live?”",
        content: "God is asking Ezekiel: Can you see beyond history? Can you see beyond defeat? Can you see a future inside a ruined past?",
        details: {
            "Prophetic Insight": ["Time travel requires prophetic sight. If you cannot see a possibility, you cannot prophesy it."],
            "Why God Asked the Question": ["To measure Ezekiel’s faith", "To measure Ezekiel’s vision", "To measure Ezekiel’s alignment with eternity"]
        },
        revelation: "The prophet answers: “O Lord God, You know.” This is the posture of all who operate in the spirit: They trust God’s eternal knowledge, They do not speak from earth, They speak from heaven’s point of view."
    },
    {
        title: "SECTION 5: THE COMMAND — “PROPHESY TO THE BONES”",
        content: "Here is the mystery: God did not speak to the bones Himself. He told Ezekiel to speak. Because prophecy is the technology by which man influences time.",
        details: {
            "Why Prophecy Is the Tool of Time Travel": [
                "Prophecy corrects the past. Dead bones—past events—respond to prophetic command.",
                "Prophecy transforms the present.",
                "Prophecy constructs the future.",
                "Prophecy brings God’s eternal will into human time."
            ]
        },
        revelation: "Prophecy is the only language that bones can hear. Your past cannot hear your crying. Your past cannot hear your complaining. Your past cannot hear your regret. Your past hears only one thing: THE WORD OF THE LORD."
    },
    {
        title: "SECTION 6: THE SOUND — THE TIMELINE BEGINS TO SHIFT",
        scripture: "“And there was a noise…”",
        content: "When Ezekiel prophesied, the unseen realm reacted. Before manifestation, there is movement.",
        details: {
            "Noise Represents": ["Spiritual systems rearranging", "Angelic activity", "Judicial rewiring of timelines", "Scattered pieces returning to their appointed order"],
            "Shaking Represents": ["Old laws being broken", "Altars collapsing", "Covenants reversing", "Ancestral patterns losing power", "Spiritual verdicts being overturned"],
            "Bones Coming Together": ["This is the prophetic gathering of: Lost years, Lost relationships, Lost mantles, Lost opportunities, Lost favor, Lost identity, Lost positions, Lost health. The timeline begins to heal itself."]
        }
    },
    {
        title: "SECTION 7: THE SECOND LEVEL OF PROPHECY — CALLING THE BREATH",
        content: "Ezekiel prophesies again, this time to the breath (the spirit dimension).",
        details: {
            "Bones = Structure (External Timeline)": ["Events", "Circumstances", "Opportunities", "Seasons", "Relationships"],
            "Breath = Life (Internal Timeline)": ["Purpose", "Destiny", "Mandate", "Anointing", "Identity", "Divine functionality"]
        },
        revelation: "The bones stood, but they were not alive. This means: Your life can be organized but dead. Your marriage can be structured but lifeless. Your ministry can exist but not breathe. Your destiny can be rebuilt but not activated. The breath is the activation of destiny."
    },
    {
        title: "SECTION 8: THE MIGHTY ARMY — THE FUTURE MANIFESTING IN THE PRESENT",
        scripture: "“And they lived, and stood up upon their feet, an exceeding great army.”",
        content: "This is the ultimate proof of prophetic time travel: A dead past becomes a living future. A broken history becomes a powerful destiny. What collapsed becomes what stands. What died rises as an army.",
        revelation: "Ezekiel did not just witness resurrection—He rewrote history and reshaped the future. This is your assignment: To travel into timelines where the enemy killed something… …and to resurrect, restore, reframe, and realign them with God’s eternal design."
    }
];

const prayerPoints = [
    "Spirit of God, carry me into the timelines where my destiny was corrupted.",
    "I command every dry bone in my life—LIVE!",
    "Whatever died in my family line, resurrect now!",
    "Every scattered part of my destiny, come together by fire!",
    "I call breath, life, purpose, and power into every dead assignment.",
    "I reverse evil timelines planted in my dreams, childhood, or ancestry.",
    "My future, appear! My destiny, arise! My purpose, manifest!",
    "I align my life with the eternal timeline of God."
];

export default function TravelingThroughTimeEzekiel37Page() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
             <div className="text-center">
                <h1 className="text-3xl font-headline font-bold text-foreground">CHAPTER ONE: THE MYSTERY OF PROPHETIC TIME TRAVEL IN EZEKIEL 37</h1>
                <p className="mt-2 text-lg text-muted-foreground">A Prophetic Teaching</p>
                <p className="mt-1 text-sm text-muted-foreground">By Joseph Tryson</p>
            </div>
            
             <div className="flex justify-end">
                <Button variant="outline" onClick={() => window.print()}>
                    <Printer className="mr-2 h-4 w-4" />
                    Print / Save as PDF
                </Button>
            </div>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Zap className="h-6 w-6 text-accent" />INTRODUCTION: THE PROPHETIC SCIENCE OF TIME TRAVEL IN THE SPIRIT</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground">Ezekiel 37 is not just a vision of resurrection—it is a prophetic journey through time. In this chapter, the Spirit of God transports Ezekiel out of the present and into a different timeline, showing him a future reality and empowering him to alter it by prophecy. This is the essence of spiritual time travel:</p>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                        <li>Seeing what God has ordained in eternity</li>
                        <li>Entering the timelines where death, dryness, disorder, and defeat were planted</li>
                        <li>Prophesying to align those timelines with God’s intention</li>
                        <li>Returning to the present with the authority to manifest the future</li>
                    </ul>
                    <p className="font-semibold text-foreground">Ezekiel becomes a traveler between what is and what is to come.</p>
                </CardContent>
            </Card>

             {sections.map(section => (
                <Card key={section.title}>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">{section.title}</CardTitle>
                        {section.scripture && <CardDescription className="italic">"{section.scripture}"</CardDescription>}
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {section.content && <p className="text-muted-foreground">{section.content}</p>}
                        
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
                        {prayerPoints.map(point => (
                            <li key={point} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-muted-foreground">{point}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}

    