
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Globe, Eye, TowerControl, Shield, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const globalDirectives = [
    {
        title: "Economic Stability",
        description: "Pray against spirits of inflation and economic collapse. Decree wisdom for global financial leaders and the release of Kingdom-based economic solutions.",
        scripture: "Deuteronomy 8:18"
    },
    {
        title: "Governmental Righteousness",
        description: "Intercede for national leaders, praying for righteous governance, the exposure of corruption, and the alignment of nations with God's purposes.",
        scripture: "Proverbs 14:34"
    },
    {
        title: "Global Revival & Harvest",
        description: "Contend for a global outpouring of the Holy Spirit, the salvation of souls, and the advancement of the Gospel in unreached areas.",
        scripture: "Acts 2:17"
    }
];

const regionalTowers = [
    { region: "North America", focus: "Spiritual awakening and repentance.", leader: "Watchman John" },
    { region: "Europe", focus: "Re-evangelization and contending against ancient idolatrous spirits.", leader: "Watchman Maria" },
    { region: "Asia", focus: "Protection for the persecuted church and open doors for the Gospel.", leader: "Watchman Daniel" },
    { region: "Africa", focus: "Breaking cycles of poverty and corruption; raising righteous leaders.", leader: "Watchman Esther" },
    { region: "South America", focus: "Unity in the body of Christ and deliverance from political instability.", leader: "Watchman Carlos" },
    { region: "Oceania", focus: "Revival among indigenous peoples and a new wave of missionaries.", leader: "Watchman Sarah" },
];

export default function GlobalPrayerHubPage() {
    const { toast } = useToast();

    const handleJoinWatch = (region: string) => {
        toast({
            title: "Watch Joined",
            description: `You have been added to the prayer watch for ${region}. Further instructions will be sent.`
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <Globe className="h-8 w-8 text-accent" />
                    <h1 className="text-3xl font-headline font-bold text-foreground">Global Prayer Hub</h1>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                    The Realm of the Watchers: Strategic Intercession for Nations.
                </p>
            </div>
            
             <Card className="bg-card">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-card-foreground flex items-center gap-3">
                        <Eye className="h-6 w-6 text-accent" />
                        The Mandate of the Watcher
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground">
                        "This matter is by the decree of the watchers, and the demand by the word of the holy ones: to the intent that the living may know that the most High ruleth in the kingdom of men..." - Daniel 4:17
                    </blockquote>
                    <p className="text-muted-foreground mt-4">As watchers, we are spiritual gatekeepers and intercessors assigned to observe, discern, and legislate Heaven's purposes over nations and territories through prayer and prophetic decrees.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5 text-accent" />
                        Current Global Prayer Directives
                    </CardTitle>
                    <CardDescription>Unified prayer assignments for all watchers.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {globalDirectives.map((directive) => (
                        <div key={directive.title} className="p-4 rounded-lg border bg-card/50">
                            <h3 className="font-bold text-lg text-foreground">{directive.title}</h3>
                            <p className="text-sm text-muted-foreground mt-1">{directive.description}</p>
                            <p className="text-xs text-accent font-mono mt-2">{directive.scripture}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TowerControl className="h-5 w-5 text-accent" />
                        Regional Watch Towers
                    </CardTitle>
                    <CardDescription>Join a prayer watch for a specific region.</CardDescription>
                </CardHeader>
                <CardContent>
                     <Accordion type="single" collapsible className="w-full">
                        {regionalTowers.map((tower) => (
                            <AccordionItem value={tower.region} key={tower.region}>
                                <AccordionTrigger className="text-lg font-semibold hover:no-underline text-card-foreground">
                                   {tower.region}
                                </AccordionTrigger>
                                <AccordionContent className="p-4 bg-secondary/30 rounded-md">
                                    <p className="font-semibold text-foreground">Current Focus: <span className="font-normal text-muted-foreground">{tower.focus}</span></p>
                                    <p className="font-semibold text-foreground mt-2">Regional Lead: <span className="font-normal text-muted-foreground">{tower.leader}</span></p>
                                    <Button className="mt-4" onClick={() => handleJoinWatch(tower.region)}>Join This Watch</Button>
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Send className="h-5 w-5 text-accent" />
                        Submit Prophetic Intelligence
                    </CardTitle>
                    <CardDescription>
                        Have you received a word, vision, or strategic insight concerning a nation or region? Submit your report for review by the apostolic and prophetic council.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Button asChild>
                        <Link href="/contact?type=prophetic-intelligence">Submit Report</Link>
                    </Button>
                </CardContent>
            </Card>

        </div>
    );
}
