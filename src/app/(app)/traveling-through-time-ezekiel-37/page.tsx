
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, CheckCircle, Printer, Rewind, Play, FastForward, Shield, Quote, Wind, Zap } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const chapters = [
    {
        title: "CHAPTER 1: THE SPIRIT REALM AS THE TRUE TIMELINE",
        scripture: `Ezekiel 37:1 — “The hand of the LORD was upon me… and carried me out in the spirit.”`,
        content: "Time travel begins with the hand of the LORD—His empowerment, His influence, and His pull into the eternal realm.",
        revelations: [
            "The Spirit realm is outside human time.",
            "When God carries a man “in the spirit,” He removes him from chronological limitation.",
            "Your destiny is older than your age.",
            "Ezekiel saw a future event that already existed in God.",
            "The Spirit is a transporter.",
            "The Spirit can carry you backward to origins or forward to outcomes."
        ],
        application: "Ask the Holy Spirit in prayer:\n“Lift me above time. Carry me into the timelines where my destiny has been spoken.”"
    },
    {
        title: "CHAPTER 2: THE VALLEY OF DRY BONES — A PAST AND FUTURE COLLISION",
        content: "Ezekiel is taken to a valley filled with bones. These bones represented: A past timeline where something died, A present timeline of dryness, A future timeline God wanted to restore. The valley shows the prophetic truth: Every life has valleys of old failures, old covenants, old trauma, and old timelines buried in the spirit.",
        revelations: [
            "Bones carry memories of what once lived.",
            "Dry bones represent unfinished destinies and aborted purposes.",
            "God brings you face to face with the root.",
            "To fix the future, Ezekiel had to confront what died in the past.",
            "Time is layered.",
            `The bones were “very dry”—this is the measurement of time.`
        ],
        application: "Ask God to reveal:\n“The dry bones in my timeline—places where destiny died, opportunities buried, and purposes abandoned.”"
    },
    {
        title: "CHAPTER 3: THE QUESTION — “CAN THESE BONES LIVE?”",
        content: `God asks Ezekiel: “Son of man, can these bones live?” This is not a question of possibility but a question of spiritual sight. Heaven asks: Can you see beyond the current timeline? Can you see resurrection where there is decay? Can you travel into the future God has ordained?`,
        revelations: [
            "Prophets answer from the eternal mind, not the human mind.",
            "Ezekiel says, “O Lord God, You know.”",
            "Time travel requires surrender.",
            "You must let God redefine what is “possible.”"
        ]
    },
    {
        title: "CHAPTER 4: THE COMMAND TO PROPHESY — CHANGING THE TIMELINE",
        content: `God tells Ezekiel: “Prophesy upon these bones…” This is the moment Ezekiel becomes a timeline activator. Prophecy is the force that: Breaks old timelines, Rewrites spiritual laws, Restores what died, Summons future realities into the present.`,
        revelations: [
            "Prophecy is a legislative tool.",
            "It rewrites laws that have been written over your life.",
            "Prophecy speaks into the past without entering it.",
            "The bones are past events.",
            "Yet Ezekiel speaks into them, commanding them to change.",
            "Prophecy summons the future into the now."
        ],
        application: "Speak over your life daily:\n“I command every dry bone in my timeline to hear the Word of the Lord.”"
    },
    {
        title: "CHAPTER 5: THE SOUND — THE EARTH RESPONDS TO PROPHECY",
        content: `“There was a noise, a shaking…” The moment Ezekiel prophesied, the timeline shifted.`,
        revelations: [
            "Prophecy creates movement in realms you cannot see yet.",
            "The noise happens before the miracle appears.",
            "The spirit realm shakes when you speak.",
            "Bones come together because prophecy finds what belongs to you: Lost relationships, Lost opportunities, Lost gifts, Lost identity, Lost mantles, Lost finances, Lost years.",
            "Prophecy gathers your scattered timeline."
        ]
    },
    {
        title: "CHAPTER 6: THE TWO PROPHETIC DIMENSIONS — BONES AND BREATH",
        content: `Ezekiel prophesies twice: To the bones — structural restoration. To the breath — life restoration. These represent the two levels of time travel: 1. Chronological Restoration: Fixing events, relationships, mistakes, lost opportunities. 2. Destiny Restoration: Breathing life into what God planned before you were born.`,
        revelations: [
            "The bones are what you lost.",
            "The breath is who you were meant to become."
        ]
    },
    {
        title: "CHAPTER 7: THE MIGHTY ARMY — THE FUTURE MANIFESTING",
        content: `At the end of the chapter: The bones stand as a mighty army. This is the evidence of time travel: The broken becomes whole. The scattered becomes united. The dead becomes alive. The defeated becomes an army.`,
        revelations: [
            "Time travel in the spirit is not about curiosity—it is about restoration, alignment, and dominion.",
            "God used Ezekiel to: See the future, Enter the future, Speak the future, And return carrying the future into the present.",
            "This is the prophetic life."
        ]
    }
];

const prayerPoints = [
    "Holy Spirit, take me into the timelines where my destiny was tampered with.",
    "By prophecy, I call back every scattered bone in my life.",
    "Every evil timeline—break by fire!",
    "Every dry bone in my destiny, hear the Word of the Lord—LIVE!",
    "I pull my future into manifestation by the power of the Spirit.",
    "I command breath, life, and strength to enter every dying assignment.",
    "I align my days, my seasons, and my years to God’s eternal plan."
];


export default function TravelingThroughTimeEzekiel37Page() {

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
             <div className="text-center">
                <h1 className="text-3xl font-headline font-bold text-foreground">TRAVELING THROUGH TIME — Ezekiel 37</h1>
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
                    <CardTitle className="flex items-center gap-3"><Wind className="h-6 w-6 text-accent" />INTRODUCTION: THE PROPHETIC SCIENCE OF TIME TRAVEL IN THE SPIRIT</CardTitle>
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

             {chapters.map(chapter => (
                <Card key={chapter.title}>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">{chapter.title}</CardTitle>
                        {chapter.scripture && <CardDescription className="italic">"{chapter.scripture}"</CardDescription>}
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {chapter.content && <p className="text-muted-foreground">{chapter.content}</p>}
                        
                        {chapter.revelations && (
                            <div>
                                <h4 className="font-semibold text-accent mb-2">Key Revelations:</h4>
                                <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                                    {chapter.revelations.map(p => <li key={p}>{p}</li>)}
                                </ul>
                            </div>
                        )}
                        
                        {chapter.application && (
                            <Alert className="mt-4 bg-secondary">
                                <Zap className="h-4 w-4 text-accent"/>
                                <AlertTitle className="text-accent">Practical Application</AlertTitle>
                                <AlertDescription className="text-foreground whitespace-pre-wrap">
                                    {chapter.application}
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardContent>
                </Card>
            ))}

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Shield className="h-6 w-6 text-accent" />Prayer Points</CardTitle>
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
