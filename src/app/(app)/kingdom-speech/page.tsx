
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { MessageSquare, Save } from "lucide-react";

type DeclarationEntry = {
    id: number;
    date: string;
    content: string;
};

const initialDeclarations: DeclarationEntry[] = [
    {
        id: 1,
        date: new Date(Date.now() - 86400000 * 2).toISOString(),
        content: "I declare that I am the righteousness of God in Christ Jesus. I walk in divine health and favor today."
    }
];

export default function KingdomSpeechPage() {
    const { toast } = useToast();
    const [declarations, setDeclarations] = useState(initialDeclarations);
    const [newDeclaration, setNewDeclaration] = useState('');

    const handleSaveDeclaration = () => {
        if (!newDeclaration.trim()) {
            toast({
                variant: 'destructive',
                title: 'Empty Declaration',
                description: 'Please write something before saving.'
            });
            return;
        }

        const newId = declarations.length > 0 ? Math.max(...declarations.map(e => e.id)) + 1 : 1;
        const entryToAdd: DeclarationEntry = {
            id: newId,
            date: new Date().toISOString(),
            content: newDeclaration
        };

        setDeclarations(prev => [entryToAdd, ...prev]);
        setNewDeclaration('');
        toast({
            title: 'Declaration Logged!',
            description: 'Your words of faith have been recorded.'
        });
    };

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <MessageSquare className="h-8 w-8 text-accent" />
                    <h1 className="text-3xl font-headline font-bold text-foreground">Kingdom Speech Practice</h1>
                </div>
                <p className="text-muted-foreground">
                    A dedicated space to practice speaking life and aligning your words with God's truth.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Log New Declaration</CardTitle>
                    <CardDescription>What words of life, faith, and authority are you speaking today?</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid w-full gap-1.5">
                        <Label htmlFor="declaration">Your Declaration</Label>
                        <Textarea 
                            placeholder="e.g., 'I am more than a conqueror through Him who loves me...'" 
                            id="declaration"
                            value={newDeclaration}
                            onChange={(e) => setNewDeclaration(e.target.value)}
                            rows={4}
                        />
                    </div>
                     <Button onClick={handleSaveDeclaration}>
                        <Save className="mr-2 h-4 w-4" />
                        Log Declaration
                    </Button>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Past Declarations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {declarations.map(entry => (
                        <div key={entry.id} className="p-4 rounded-lg border bg-secondary/50">
                            <p className="text-xs text-muted-foreground mb-2">
                                {new Date(entry.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                            </p>
                            <p className="text-sm text-foreground italic">"{entry.content}"</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
