'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { conferences as initialConferences } from '@/lib/data';
import { Calendar, PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function AdminConferencesPage() {
    const { toast } = useToast();
    const [conferences, setConferences] = useState(initialConferences);
    const [newConference, setNewConference] = useState({
        title: '',
        description: '',
        dates: '',
        location: '',
        imageUrl: '',
        imageHint: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewConference(prev => ({ ...prev, [name]: value }));
    };

    const handleAddConference = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newConference.title || !newConference.dates || !newConference.location) {
            toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please fill out at least title, dates, and location.',
            });
            return;
        }
        const newId = conferences.length > 0 ? Math.max(...conferences.map(c => c.id)) + 1 : 1;
        const newConf = {
            id: newId,
            ...newConference,
            image: {
                id: `conf-${newId}`,
                imageUrl: newConference.imageUrl || 'https://picsum.photos/seed/1/1280/720',
                description: newConference.title,
                imageHint: newConference.imageHint || 'conference event'
            }
        };
        setConferences(prev => [newConf, ...prev]);
        setNewConference({
            title: '',
            description: '',
            dates: '',
            location: '',
            imageUrl: '',
            imageHint: ''
        });
        toast({
            title: 'Conference Added',
            description: `"${newConference.title}" has been successfully added.`,
        });
    };

    const handleDeleteConference = (id: number) => {
        setConferences(prev => prev.filter(conf => conf.id !== id));
        toast({
            title: 'Conference Deleted',
            description: 'The conference has been removed.',
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold text-foreground">Manage Conferences</h1>
                <p className="text-muted-foreground">
                    Add, edit, or remove major conference events.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <PlusCircle className="h-5 w-5 text-accent" />
                        Add New Conference
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddConference} className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="title">Conference Title</Label>
                            <Input id="title" name="title" value={newConference.title} onChange={handleInputChange} placeholder="e.g., Global Impact Conference 2025" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="dates">Dates</Label>
                            <Input id="dates" name="dates" value={newConference.dates} onChange={handleInputChange} placeholder="e.g., October 10-12, 2025" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="location">Location</Label>
                            <Input id="location" name="location" value={newConference.location} onChange={handleInputChange} placeholder="e.g., Atlanta, GA & Online" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" value={newConference.description} onChange={handleInputChange} placeholder="A brief description of the conference..." />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="imageUrl">Image URL</Label>
                            <Input id="imageUrl" name="imageUrl" value={newConference.imageUrl} onChange={handleInputChange} placeholder="https://... (optional, uses placeholder if blank)" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="imageHint">Image AI Hint</Label>
                            <Input id="imageHint" name="imageHint" value={newConference.imageHint} onChange={handleInputChange} placeholder="e.g., conference event" />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <Button type="submit">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Conference
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-accent" />
                        Existing Conferences
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {conferences.map(conf => (
                        <div key={conf.id} className="flex flex-col md:flex-row gap-4 rounded-lg border p-4">
                           {conf.image && (
                               <div className="relative w-full md:w-48 h-32 md:h-auto flex-shrink-0 overflow-hidden rounded-md">
                                    <Image src={conf.image.imageUrl} alt={conf.title} fill className="object-cover" data-ai-hint={conf.image.imageHint} />
                               </div>
                           )}
                           <div className="flex-grow">
                                <h3 className="font-bold text-lg text-foreground">{conf.title}</h3>
                               <p className="text-sm text-muted-foreground">{conf.dates} &bull; {conf.location}</p>
                               <p className="text-sm text-muted-foreground mt-2">{conf.description}</p>
                           </div>
                           <div className="flex-shrink-0 flex flex-col gap-2">
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteConference(conf.id)}>
                                    <Trash2 className="h-4 w-4" />
                                    <span className="ml-2">Delete</span>
                                </Button>
                           </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

        </div>
    );
}
