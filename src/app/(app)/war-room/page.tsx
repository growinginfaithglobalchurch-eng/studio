
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Globe, Target, Calendar, Radio, Users, Feather, Crown, Anchor } from "lucide-react";
import { Countdown } from "@/components/countdown";
import Link from "next/link";

const assignments = [
    {
        title: "Decree for National Righteousness",
        description: "Targeted intercession for government leaders and policy-making.",
        tribe: "Lions"
    },
    {
        title: "Atmospheric Cleansing",
        description: "Prophetic declarations to clear spiritual airwaves over major cities.",
        tribe: "Eagles"
    },
    {
        title: "Uprooting Ancient Covenants",
        description: "Addressing foundational bloodline issues affecting community progress.",
        tribe: "Marines"
    }
];

export default function WarRoomPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">The War Room</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          The strategic command center for global spiritual engagement.
        </p>
      </div>

       <Card className="bg-destructive/20 border-destructive">
            <CardHeader>
                 <div className="flex items-center justify-between">
                     <CardTitle className="flex items-center gap-3 text-destructive">
                        <Radio className="h-6 w-6 animate-pulse" />
                        LIVE OPERATION IN PROGRESS
                    </CardTitle>
                    <Countdown />
                 </div>
            </CardHeader>
            <CardContent>
                <h3 className="text-lg font-bold text-foreground">Operation: Midnight Cry</h3>
                <p className="text-muted-foreground mb-4">Urgent intercession for the protection of missionaries in sensitive regions.</p>
                <Button variant="destructive">
                    <Shield className="mr-2 h-4 w-4" />
                    Join Live Prayer
                </Button>
            </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Globe className="h-5 w-5 text-accent"/>Strategic Briefing</CardTitle>
                        <CardDescription>Current global focus and objectives.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">Our current unified focus is on breaking the spirit of division within the global church. All tribes are to engage in prayers of unity, reconciliation, and honor. Reference Ephesians 4:1-3. Specific assignments are listed below.</p>
                    </CardContent>
                </Card>
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Target className="h-5 w-5 text-accent"/>Targeted Assignments</CardTitle>
                        <CardDescription>Your specific mission, should you choose to accept it.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {assignments.map(item => (
                            <div key={item.title} className="flex items-start justify-between p-3 rounded-lg border">
                                <div>
                                    <p className="font-semibold text-foreground">{item.title}</p>
                                    <p className="text-sm text-muted-foreground">{item.description}</p>
                                </div>
                                <Button variant="secondary" size="sm">Engage</Button>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <div className="space-y-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-accent"/>Tribal Operations</CardTitle>
                        <CardDescription>Access your tribe-specific command center.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        <Button variant="outline" className="w-full justify-start gap-2 text-white">
                            <Feather className="h-4 w-4 text-accent" /> Eagle Room
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2 text-white">
                            <Crown className="h-4 w-4 text-accent" /> Lion Room
                        </Button>
                        <Button variant="outline" className="w-full justify-start gap-2 text-white">
                            <Anchor className="h-4 w-4 text-accent" /> Marine Room
                        </Button>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-accent"/>Courts of Heaven</CardTitle>
                        <CardDescription>Upcoming judicial sessions.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="text-sm text-muted-foreground">
                            <p className="font-semibold text-foreground">Next Session:</p>
                            <p>Case of Generational Curses</p>
                            <p>August 5, 2024 @ 9:00 PM EST</p>
                        </div>
                        <Button variant="link" className="p-0 mt-2" asChild>
                            <Link href="/courts-of-heaven">View Full Calendar</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    </div>
  )
}

    