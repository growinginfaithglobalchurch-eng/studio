
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gavel, FileText, Calendar, PlusCircle } from "lucide-react";

const upcomingSessions = [
    {
        case: "Case of Generational Curses vs. The Bloodline of David",
        date: "August 5, 2024 @ 9:00 PM EST",
    },
    {
        case: "Petition for the Release of Regional Healing Angels",
        date: "August 12, 2024 @ 9:00 PM EST",
    }
];

const caseFiles = [
    {
        id: "CF001",
        title: "Verdict: Generational Poverty Broken",
        status: "Closed",
        date: "2024-07-15"
    },
    {
        id: "CF002",
        title: "Petition: Release of Financial Destiny",
        status: "Open",
        date: "2024-07-28"
    }
];

export default function CourtsOfHeavenPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
            <Gavel className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">Courts of Heaven</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          The judicial realm for spiritual legislation, where believers can petition the Righteous Judge.
        </p>
      </div>
      
      <Card>
          <CardHeader>
              <CardTitle className="flex items-center gap-2"><PlusCircle className="h-5 w-5 text-accent"/>Submit a New Petition</CardTitle>
              <CardDescription>Bring your case before the courts of heaven. Prepare your petition based on scripture and present it with a clean heart.</CardDescription>
          </CardHeader>
          <CardContent>
              <Button>File New Petition</Button>
          </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-accent"/>Upcoming Judicial Sessions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {upcomingSessions.map(session => (
                        <div key={session.case} className="p-3 rounded-lg border bg-card">
                            <p className="font-semibold text-foreground">{session.case}</p>
                            <p className="text-sm text-muted-foreground">{session.date}</p>
                             <Button variant="secondary" size="sm" className="mt-2">Join Session</Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5 text-accent"/>Case Files & Verdicts</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {caseFiles.map(file => (
                         <div key={file.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                             <div>
                                <p className="font-semibold text-foreground">{file.title}</p>
                                <p className="text-xs text-muted-foreground">Case ID: {file.id} | {file.date}</p>
                             </div>
                            <Button variant="outline" size="sm">View Details</Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
      </div>

    </div>
  )
}

    