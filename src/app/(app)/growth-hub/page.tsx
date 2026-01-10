
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckSquare, Sunrise, BookOpen, UserCircle, MessageSquare, Shield, Sunset, Check } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";

const dailyPractices = [
  {
    id: "morning",
    icon: <Sunrise className="h-6 w-6 text-accent" />,
    title: "Morning Alignment & Declaration",
    description: "Start your day by aligning your spirit with God's will and declaring His promises: 'Glory, power, immortality is my portion, now and forever amen.'",
    href: "#",
    cta: "Declare Now"
  },
  {
    id: "word",
    icon: <BookOpen className="h-6 w-6 text-accent" />,
    title: "Word & Truth Intake",
    description: "Engage with Scripture through the daily reading plan.",
    href: "/bible-reading-plan",
    cta: "Read Today's Word"
  },
  {
    id: "identity",
    icon: <UserCircle className="h-6 w-6 text-accent" />,
    title: "Identity Consciousness & Reflection",
    description: "Reflect on who you are in Christ. Journal your thoughts and revelations.",
    href: "/identity-journal",
    cta: "Journal"
  },
  {
    id: "speech",
    icon: <MessageSquare className="h-6 w-6 text-accent" />,
    title: "Kingdom Speech Tracking",
    description: "Practice speaking life and aligning your words with God's truth.",
    href: "#",
    cta: "Log Speech"
  },
  {
    id: "warfare",
    icon: <Shield className="h-6 w-6 text-accent" />,
    title: "Warfare Readiness Check",
    description: "Assess your spiritual readiness and prepare for engagement.",
    href: "/spirit-warfare",
    cta: "Assess Readiness"
  },
  {
    id: "night",
    icon: <Sunset className="h-6 w-6 text-accent" />,
    title: "Night Reflection & Review",
    description: "Review your day, give thanks, and commit your night to the Lord with this closing declaration: 'God's goodness and mercy will follow me all the days of my life, as I dwell in the house of the Lord for ever and ever amen.'",
    href: "#",
    cta: "Review Day"
  }
];

export default function FaithGrowthHubPage() {
  const { toast } = useToast();

  const handleComplete = (title: string) => {
    toast({
        title: "Practice Completed!",
        description: `You've completed: ${title}.`
    });
    // In a real app, this would update user progress in Firebase.
  };
  
  const handleActionClick = (practiceId: string, title: string) => {
    let toastTitle = "Action Logged!";
    let toastDescription = `Your action for "${title}" has been logged.`;
    
    if (practiceId === 'morning') {
      toastTitle = "Declaration Made!";
      toastDescription = "Your morning alignment has been declared in the spirit.";
    } else if (practiceId === 'speech') {
      toastTitle = "Speech Logged!";
      toastDescription = `Your declaration of faith has been noted. Keep speaking life!`;
    }

    toast({
        title: toastTitle,
        description: toastDescription,
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
            <CheckSquare className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">Daily Kingdom Practices</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          A structured spiritual growth center designed for believers at every level.
        </p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Your Daily Checklist</CardTitle>
            <CardDescription>Complete these practices daily to build a consistent spiritual lifestyle.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            {dailyPractices.map((practice) => (
                <div key={practice.title} className="flex flex-col sm:flex-row items-start gap-4 p-4 rounded-lg border bg-card">
                    <div className="flex-shrink-0">{practice.icon}</div>
                    <div className="flex-grow">
                        <h3 className="font-bold text-lg text-card-foreground">{practice.title}</h3>
                        <p className="text-sm text-muted-foreground mt-1">{practice.description}</p>
                        <div className="mt-3 flex gap-2">
                            {practice.id === 'morning' || practice.id === 'speech' ? (
                                <Button variant="outline" onClick={() => handleActionClick(practice.id, practice.title)}>
                                    {practice.cta}
                                </Button>
                            ) : (
                                <Button asChild variant="outline">
                                    <Link href={practice.href}>{practice.cta}</Link>
                                </Button>
                            )}
                            <Button variant="ghost" onClick={() => handleComplete(practice.title)}>
                                <Check className="mr-2 h-4 w-4" />
                                Mark as Complete
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </CardContent>
      </Card>
    </div>
  );
}
