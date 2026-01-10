
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollText, BookOpen, CheckCircle, Printer, Shield } from "lucide-react";
import { CodeBlock } from "@/components/code-block";
import React from "react";

const prayerSections = [
    {
        title: "Opening Alignment",
        points: [
            "Father, as I step into 2026, I submit the year into Your hands—You who change times and seasons, take full authority over this year.",
            "By the Blood of Jesus, I sanctify 2026 and remove every contamination, evil projection, and satanic forecast assigned to it.",
            "I disconnect 2026 from every negative cycle, ancestral pattern, and repeated error from previous years."
        ]
    },
    {
        title: "Coding 2026 with Heaven’s Script",
        points: [
            "I decree that 2026 is coded with divine purpose, clarity, order, and fulfillment in the name of Jesus.",
            "Let the handwriting of heaven overwrite every hidden code of delay, loss, confusion, or failure in 2026.",
            "Father, program 2026 with wisdom, favor, discernment, and accurate decision-making.",
            "I reject every demonic algorithm designed to manipulate my time, focus, and destiny in 2026."
        ]
    },
    {
        title: "Programming Seasons, Days, and Months",
        points: [
            "I speak into the days, weeks, and months of 2026—align with God’s calendar and divine schedule.",
            "Every month of 2026, release your assignment of progress, increase, and fulfillment.",
            "I cancel wasted days, aborted weeks, and fruitless seasons in 2026.",
            "Let every season in 2026 serve my destiny and advance God’s purpose in my life."
        ]
    },
    {
        title: "Destiny, Calling, and Assignment Coding",
        points: [
            "Father, encode 2026 with destiny fulfillment and the manifestation of my calling.",
            "I decree that my gifts, graces, and divine assignments will locate me in 2026.",
            "Every destiny diversion programmed by darkness—be erased now.",
            "Let 2026 respond to me with alignment, accuracy, and open doors."
        ]
    },
    {
        title: "Restoration & Acceleration Programming",
        points: [
            "According to Joel 2:25, I program 2026 as a year of restoration of years, time, and opportunities.",
            "Let Ezekiel 37 realities manifest—every dry area of my life receives breath in 2026.",
            "I decree accelerated recovery for everything delayed, stolen, or aborted in previous years.",
            "2026, carry divine speed without stress and progress without sorrow."
        ]
    },
    {
        title: "Family, Marriage, and Relationships",
        points: [
            "I program 2026 with peace, unity, love, and order in my marriage and family.",
            "Every code of separation, misunderstanding, or emotional distance—be deleted.",
            "Let generational healing and alignment manifest in my bloodline in 2026."
        ]
    },
    {
        title: "Finances, Career, and Wealth Systems",
        points: [
            "I code 2026 with favor, promotion, opportunities, and financial wisdom.",
            "Let divine ideas, strategies, and solutions be released to me in 2026.",
            "Every system of financial leakage, loss, and stagnation—be shut down.",
            "I decree generational wealth, prosperity, and abundance according to God’s covenant."
        ]
    },
    {
        title: "Health, Life, and Protection",
        points: [
            "I program 2026 with divine health, strength, longevity, and vitality.",
            "No sickness, accident, or premature death shall be coded into my timeline in 2026.",
            "Let angels of protection be assigned to every day of 2026 concerning me and my household."
        ]
    },
    {
        title: "Authority, Dominion, and Spiritual Growth",
        points: [
            "I decree that 2026 is programmed with spiritual growth, clarity, and deeper intimacy with God.",
            "I walk in sonship, authority, dominion, and boldness throughout 2026.",
            "Every satanic resistance to my spiritual advancement—be neutralized."
        ]
    },
    {
        title: "Cities, Communities, and Nations",
        points: [
            "I program 2026 with righteous leadership, peace, and divine intervention over cities and nations.",
            "Let the purposes of God rise above confusion, darkness, and corruption in 2026.",
            "Father, use me as a vessel of influence, light, and transformation in my generation."
        ]
    }
];

export default function PropheticPrayerPoints2026Page() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center">
                <h1 className="text-3xl font-headline font-bold text-foreground">Prophetic Prayer Points for Coding & Programming 2026</h1>
                <p className="mt-2 text-lg text-muted-foreground">Entering the New Year with Divine Alignment, Authority, and Dominion</p>
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
                    <CardTitle className="flex items-center gap-3"><BookOpen className="h-6 w-6 text-accent" />Foundation Scriptures</CardTitle>
                </CardHeader>
                <CardContent>
                    <CodeBlock code={
`Ecclesiastes 3:1 – Times and seasons
Daniel 2:21–22 – God changes times and seasons
Isaiah 45:2–3 – God goes before us
Job 22:28 – Decrees established
Psalm 65:11 – Crowned with goodness`
                    } />
                </CardContent>
            </Card>

            {prayerSections.map(section => (
                <Card key={section.title}>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3 text-xl font-headline"><ScrollText className="h-5 w-5 text-accent" />{section.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-3">
                            {section.points.map(point => (
                                <li key={point} className="flex items-start gap-3">
                                    <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                    <span className="text-muted-foreground">{point}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Shield className="h-6 w-6 text-accent" />Sealing Declaration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p className="flex items-start gap-3 text-muted-foreground"><CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />I seal 2026 with the Blood of Jesus, the authority of the Word, and the witness of the Holy Spirit.</p>
                    <p className="flex items-start gap-3 text-muted-foreground"><CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />No evil shall be rewritten, no blessing shall be stolen, and no destiny shall be altered.</p>
                    <p className="flex items-start gap-3 text-muted-foreground"><CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />2026, hear the Word of the Lord—you are programmed for my lifting, fulfillment, and testimony.</p>
                </CardContent>
            </Card>

            <Card className="bg-primary/10 border-primary/20">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-accent font-headline">Final Prophetic Decree</CardTitle>
                </CardHeader>
                 <CardContent>
                    <blockquote className="border-l-4 border-accent pl-4 italic text-foreground">
                        “By divine authority, I have coded and programmed 2026 according to heaven’s design.
                        My times and seasons are aligned.
                        My destiny is preserved.
                        My days are fruitful.
                        My year is blessed.
                        2026 will deliver everything God has written concerning me.
                        I enter the new year in power, peace, and dominion.
                        In Jesus’ name. Amen.”
                    </blockquote>
                </CardContent>
            </Card>
        </div>
    );
}
