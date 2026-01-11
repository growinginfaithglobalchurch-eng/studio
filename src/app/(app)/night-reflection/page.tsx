
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Sunset, Save, Quote } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

type ReflectionEntry = {
    id: number;
    date: string;
    content: string;
};

const initialEntries: ReflectionEntry[] = [
    {
        id: 1,
        date: new Date(Date.now() - 86400000).toISOString(),
        content: "Reflecting on today, I'm thankful for the unexpected conversation with a coworker. It was a small opportunity to show kindness. I commit my rest to the Lord tonight, trusting His goodness and mercy."
    }
];

export default function NightReflectionPage() {
    const { toast } = useToast();
    const [entries, setEntries] = useState(initialEntries);
    const [newReflection, setNewReflection] = useState('');

    const handleSaveReflection = () => {
        if (!newReflection.trim()) {
            toast({
                variant: 'destructive',
                title: 'Empty Reflection',
                description: 'Please write something before saving.'
            });
            return;
        }

        const newId = entries.length > 0 ? Math.max(...entries.map(e => e.id)) + 1 : 1;
        const entryToAdd: ReflectionEntry = {
            id: newId,
            date: new Date().toISOString(),
            content: newReflection
        };

        setEntries(prev => [entryToAdd, ...prev]);
        setNewReflection('');
        toast({
            title: 'Reflection Saved',
            description: 'Your thoughts for the day have been recorded.'
        });
    };

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <Sunset className="h-8 w-8 text-accent" />
                    <h1 className="text-3xl font-headline font-bold text-foreground">Night Reflection & Review</h1>
                </div>
                <p className="text-muted-foreground">
                    Review your day, give thanks, and commit your night to the Lord.
                </p>
            </div>

            <Alert className="bg-secondary">
                <Quote className="h-4 w-4 text-accent"/>
                <AlertTitle className="text-accent font-bold">Closing Declaration</AlertTitle>
                <AlertDescription className="italic text-foreground mt-2">
                    "God's goodness and mercy will follow me all the days of my life, as I dwell in the house of the Lord for ever and ever amen."
                </AlertDescription>
            </Alert>

            <Card>
                <CardHeader>
                    <CardTitle>New Reflection</CardTitle>
                    <CardDescription>How did you see God's hand at work today? What are you thankful for?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="reflection">Your Reflection</Label>
                        <Textarea 
                            placeholder="Type your reflections here..." 
                            id="reflection"
                            value={newReflection}
                            onChange={(e) => setNewReflection(e.target.value)}
                            rows={6}
                        />
                    </div>
                     <Button onClick={handleSaveReflection}>
                        <Save className="mr-2 h-4 w-4" />
                        Save Reflection
                    </Button>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Past Reflections</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {entries.map(entry => (
                        <div key={entry.id} className="p-4 rounded-lg border bg-secondary/50">
                            <p className="text-xs text-muted-foreground mb-2">
                                {new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                            <p className="text-sm text-foreground">{entry.content}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
