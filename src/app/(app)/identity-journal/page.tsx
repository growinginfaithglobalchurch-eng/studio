
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { BookUser, Save } from "lucide-react";
import { ScrollAnimator } from '@/components/scroll-animator';

type JournalEntry = {
    id: number;
    date: string;
    content: string;
};

const initialEntries: JournalEntry[] = [
    {
        id: 1,
        date: new Date(Date.now() - 86400000).toISOString(),
        content: "Today I reflected on 1 Peter 2:9, 'But you are a chosen people, a royal priesthood, a holy nation, God’s special possession...' It hit me that my identity isn't based on my performance, but on His choice. I am His possession. This changes everything."
    }
];

export default function IdentityJournalPage() {
    const { toast } = useToast();
    const [entries, setEntries] = useState(initialEntries);
    const [newEntry, setNewEntry] = useState('');

    const handleSaveEntry = () => {
        if (!newEntry.trim()) {
            toast({
                variant: 'destructive',
                title: 'Empty Entry',
                description: 'Please write something before saving.'
            });
            return;
        }

        const newId = entries.length > 0 ? Math.max(...entries.map(e => e.id)) + 1 : 1;
        const entryToAdd: JournalEntry = {
            id: newId,
            date: new Date().toISOString(),
            content: newEntry
        };

        setEntries(prev => [entryToAdd, ...prev]);
        setNewEntry('');
        toast({
            title: 'Journal Entry Saved',
            description: 'Your reflections have been recorded.'
        });
    };

    return (
        <div className="space-y-8 max-w-3xl mx-auto">
            <ScrollAnimator>
              <div>
                  <div className="flex items-center gap-3 mb-2">
                      <BookUser className="h-8 w-8 text-accent" />
                      <h1 className="text-3xl font-headline font-bold text-foreground">Identity Journal</h1>
                  </div>
                  <p className="text-muted-foreground">
                      A sacred space to reflect on who you are in Christ and journal your thoughts and revelations.
                  </p>
              </div>
            </ScrollAnimator>

            <ScrollAnimator>
              <Card>
                  <CardHeader>
                      <CardTitle>New Journal Entry</CardTitle>
                      <CardDescription>What is God revealing to you about your identity today?</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                      <div className="grid w-full gap-1.5">
                          <Label htmlFor="message">Your thoughts</Label>
                          <Textarea 
                              placeholder="Type your reflections here..." 
                              id="message"
                              value={newEntry}
                              onChange={(e) => setNewEntry(e.target.value)}
                              rows={6}
                          />
                      </div>
                      <Button onClick={handleSaveEntry}>
                          <Save className="mr-2 h-4 w-4" />
                          Save Entry
                      </Button>
                  </CardContent>
              </Card>
            </ScrollAnimator>
            
            <ScrollAnimator>
              <Card>
                  <CardHeader>
                      <CardTitle>Past Entries</CardTitle>
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
            </ScrollAnimator>
        </div>
    );
}
