
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, CheckCircle, Printer, Scale, Send, Shield } from 'lucide-react';
import { CodeBlock } from '@/components/code-block';
import React from 'react';

const sections = [
    { 
        title: "SESSION ONE: SUMMONS TO THE COURT OF MERCY",
        scripture: "Let us come boldly...",
        content: `By faith, we enter the Mercy City—not timidly, not fearfully, but legally and confidently, clothed in the righteousness of Christ.`,
        declaration: {
            title: 'Declaration of Access',
            scripture: 'Romans 5:1–2 - "...through whom also we have access by faith into this grace…"',
            points: ['We are qualified by the Blood', 'We are authorized by sonship', 'We are welcomed by grace']
        }
    },
    {
        title: "SESSION TWO: PRESENTING OUR CASE BEFORE THE JUDGE",
        content: "We present before the Throne of Grace all affected timelines: Past timelines (childhood, ancestry, foundations), Present timelines (current struggles, delays, stagnation), Future timelines (destiny, purpose, legacy).",
        reviewAreas: [
            "Destinies", "Marriages and relationships", "Families and bloodlines", "Ministries and callings",
            "Careers and vocations", "Governments and leadership roles", "Communities, cities, and nations",
            "Finances, generational wealth, and inheritance", "Health, longevity, and divine protection",
            "Honor, glory, peace, and righteousness", "Sonship, dominion, authority, thrones, and assignments"
        ]
    },
    {
        title: "SESSION THREE: PLEA FOR MERCY, NOT JUSTICE ALONE",
        scripture: "Lamentations 3:22–23 - “It is of the Lord’s mercies that we are not consumed…”",
        content: "In this court, we do not plead merit—we plead mercy. We acknowledge: Known and unknown sins, Ancestral failures, Covenant breaches, Disobedience in seasons past, Ignorance that opened doors to loss.",
        corporateConfession: '“Father, we repent for every action, decision, and agreement that corrupted our timelines. Let mercy speak for us now.”'
    },
    {
        title: "SESSION FOUR: THE BLOOD SPEAKS A BETTER VERDICT",
        scripture: "Hebrews 12:24 - '…to Jesus the Mediator of the new covenant, and to the blood of sprinkling that speaks better things…'",
        content: "The Blood of Jesus now speaks: Mercy over judgment, Restoration over loss, Life over death, Order over chaos, Fulfillment over abortion of destiny. Every accusation is silenced. Every legal claim of the enemy is overturned."
    },
    {
        title: "SESSION FIVE: CALLING THE HOLY SPIRIT AS EXECUTOR OF RESTORATION",
        scripture: "John 14:26",
        content: "The Holy Spirit is called to manifest power, not theory. We invite the Holy Spirit to: Breathe upon dry bones (Ezekiel 37), Restore wasted years (Joel 2:25), Reconnect scattered destinies, Realign broken timelines, Reassemble fragmented identities, Revive dead marriages, ministries, and visions, Reinstall stolen authority and dominion."
    },
    {
        title: "SESSION SIX: THE VERDICT OF THE COURT",
        verdict: {
            title: "DIVINE VERDICT DECLARED",
            decrees: [
                "What was stolen is restored", "What was killed is resurrected", "What was destroyed is rebuilt",
                "What was delayed is accelerated", "What was aborted is reissued", "What was scattered is regathered"
            ],
            scriptures: ["Joel 2:25 - “I will restore the years…”", "Ezekiel 37:10 - '…they lived and stood upon their feet, an exceeding great army.'"]
        }
    },
    {
        title: "SESSION SEVEN: RECLAMATION AND REPOSSESSION",
        content: "We now legally reclaim: Destinies and divine assignments, Marriages and family structures, Ministries and callings, Careers and professions, Generational wealth and inheritance, Riches, prosperity, and success, Long life and divine health, Power, glory, and honor, Peace and divine protection, Increase and multiplication, Sonship and identity, Dominion and authority, Thrones, cities, communities, and nations. Everything assigned by God is repossessed."
    },
    {
        title: "SESSION EIGHT: SEALING THE VERDICT",
        content: "The verdict is sealed by: The Blood of Jesus, The authority of the Word, The witness of the Holy Spirit. No appeal from darkness is accepted.",
        scripture: "Ecclesiastes 3:14 - 'Whatever God does, it shall be forever…'"
    }
];

export default function MercyCitySessionPage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
             <div className="text-center">
                <h1 className="text-3xl font-headline font-bold text-foreground">THE MERCY CITY SESSION</h1>
                <p className="mt-2 text-lg text-muted-foreground">Entering the Throne of Grace for Total Restoration of Timelines and Destinies</p>
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
                    <CardTitle className="flex items-center gap-3"><BookOpen className="h-6 w-6 text-accent" />FOUNDATIONAL SCRIPTURE</CardTitle>
                </CardHeader>
                <CardContent>
                    <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground text-lg">
                        “Let us therefore come boldly to the throne of grace, that we may obtain mercy and find grace to help in time of need.”
                    </blockquote>
                    <p className="text-right text-sm text-foreground mt-2">- Hebrews 4:16</p>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                     <CardTitle className="flex items-center gap-3"><Scale className="h-6 w-6 text-accent" />UNDERSTANDING THE MERCY CITY</CardTitle>
                </CardHeader>
                <CardContent>
                     <p className="text-muted-foreground mb-4">This session is not a prayer of begging—it is a judicial approach into what we call The Mercy City, the realm of God’s Throne of Grace, where mercy speaks louder than accusation, and grace overrules judgment. In the Mercy City, time is reviewed, destinies are restored, verdicts are issued, and losses are reversed. The Mercy City is the judicial dimension of heaven where:</p>
                    <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                        <li>God sits as Righteous Judge</li>
                        <li>Jesus stands as Advocate and Mediator</li>
                        <li>The Holy Spirit appears as Witness, Executor, and Restorer</li>
                        <li>The Blood of Jesus speaks better things (Hebrews 12:24)</li>
                        <li>Verdicts are released that override satanic claims</li>
                    </ul>
                     <p className="mt-4 font-semibold text-foreground">This court does not condemn the redeemed; it restores the broken.</p>
                </CardContent>
            </Card>

             {sections.map(section => (
                <Card key={section.title}>
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">{section.title}</CardTitle>
                        {section.scripture && <CardDescription>{section.scripture}</CardDescription>}
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {section.content && <p className="text-muted-foreground">{section.content}</p>}
                        {section.declaration && (
                            <div className="p-4 border rounded-lg bg-secondary/50">
                                <h4 className="font-bold text-lg text-foreground">{section.declaration.title}</h4>
                                <CodeBlock code={section.declaration.scripture}/>
                                <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                                    {section.declaration.points.map(p => <li key={p}>{p}</li>)}
                                </ul>
                            </div>
                        )}
                        {section.reviewAreas && (
                             <div className="p-4 border rounded-lg bg-secondary/50">
                                <h4 className="font-bold text-lg text-foreground">Areas Presented for Judicial Review</h4>
                                 <ul className="columns-1 md:columns-2 list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                                    {section.reviewAreas.map(area => <li key={area}>{area}</li>)}
                                 </ul>
                            </div>
                        )}
                         {section.corporateConfession && <p className="italic text-accent">“{section.corporateConfession}”</p>}
                         {section.verdict && (
                             <div className="p-4 border rounded-lg bg-secondary/50">
                                <h4 className="font-bold text-lg text-foreground">{section.verdict.title}</h4>
                                <ul className="list-disc pl-5 mt-2 space-y-1 text-muted-foreground">
                                    {section.verdict.decrees.map(d => <li key={d}>{d}</li>)}
                                </ul>
                                <div className="mt-4 space-y-1">
                                    {section.verdict.scriptures.map(s => <CodeBlock key={s} code={s} />)}
                                </div>
                            </div>
                         )}
                    </CardContent>
                </Card>
            ))}

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-xl">FINAL PROPHETIC DECLARATION</CardTitle>
                </CardHeader>
                <CardContent>
                    <blockquote className="border-l-4 border-accent pl-4 italic text-foreground text-lg space-y-2">
                        <p>“By the mercy of God, my timelines are restored.</p>
                        <p>By the verdict of heaven, my destiny is realigned.</p>
                        <p>By the power of the Holy Spirit, dry bones live again.</p>
                        <p>What was lost is returned, what was delayed is released, and what was broken is healed.</p>
                        <p>I reclaim all God assigned to me— my life, my family, my calling, my authority, my inheritance.</p>
                        <p>I rise in sonship, dominion, and glory.</p>
                        <p>The Mercy City has spoken.</p>
                        <p>It is done. Amen.”</p>
                    </blockquote>
                </CardContent>
            </Card>

        </div>
    );
}
