
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Megaphone, PlusCircle, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

type Announcement = {
    id: number;
    title: string;
    content: string;
    category: string;
    date: string;
}

export default function AdminAnnouncementsPage() {
    const { toast } = useToast();
    const [announcements, setAnnouncements] = useState<Announcement[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newAnnouncement, setNewAnnouncement] = useState({
        title: '',
        content: '',
        category: '',
    });

    useEffect(() => {
        const fetchAnnouncements = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('announcements')
                .select('*')
                .order('date', { ascending: false });

            if (error) {
                toast({
                    variant: 'destructive',
                    title: 'Error fetching data',
                    description: error.message,
                });
            } else {
                setAnnouncements(data || []);
            }
            setIsLoading(false);
        };

        fetchAnnouncements();
    }, [toast]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewAnnouncement(prev => ({ ...prev, [name]: value }));
    };

    const handleAddAnnouncement = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newAnnouncement.title || !newAnnouncement.content) {
            toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please fill out all fields.',
            });
            return;
        }

        const newAnnData = {
            ...newAnnouncement,
            date: new Date().toISOString().split('T')[0],
        };

        const { data, error } = await supabase
            .from('announcements')
            .insert([newAnnData])
            .select();

        if (error) {
            toast({
                variant: 'destructive',
                title: 'Error posting announcement',
                description: error.message,
            });
        } else if (data) {
            setAnnouncements(prev => [data[0], ...prev]);
            setNewAnnouncement({
                title: '',
                content: '',
                category: '',
            });
            toast({
                title: 'Announcement Posted',
                description: `"${newAnnouncement.title}" has been successfully posted.`,
            });
        }
    };

    const handleDeleteAnnouncement = async (id: number) => {
        const { error } = await supabase
            .from('announcements')
            .delete()
            .match({ id });
            
        if (error) {
             toast({
                variant: 'destructive',
                title: 'Error Deleting',
                description: error.message,
            });
        } else {
            setAnnouncements(prev => prev.filter(ann => ann.id !== id));
            toast({
                title: 'Announcement Deleted',
                description: 'The announcement has been removed.',
            });
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold text-foreground">Manage Announcements</h1>
                <p className="text-muted-foreground">
                    Create, edit, or remove announcements for the community.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <PlusCircle className="h-5 w-5 text-accent" />
                        Create New Announcement
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddAnnouncement} className="grid gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" value={newAnnouncement.title} onChange={handleInputChange} placeholder="e.g., Platform Maintenance" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Input id="category" name="category" value={newAnnouncement.category} onChange={handleInputChange} placeholder="e.g., Platform Update, New Content" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea id="content" name="content" value={newAnnouncement.content} onChange={handleInputChange} placeholder="Write the announcement details here..." />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Post Announcement
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Megaphone className="h-5 w-5 text-accent" />
                        Posted Announcements
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isLoading ? (
                        <div className="flex items-center justify-center p-8">
                            <Loader2 className="h-8 w-8 animate-spin" />
                            <p className="ml-2">Loading announcements...</p>
                        </div>
                    ) : announcements.length > 0 ? (
                        announcements.map(ann => (
                            <div key={ann.id} className="flex flex-col md:flex-row gap-4 rounded-lg border p-4">
                               <div className="flex-grow">
                                    <p className="text-sm text-muted-foreground">{ann.date} &bull; {ann.category}</p>
                                    <h3 className="font-bold text-lg text-foreground mt-1">{ann.title}</h3>
                                   <p className="text-sm text-muted-foreground mt-2">{ann.content}</p>
                               </div>
                               <div className="flex-shrink-0 flex flex-col gap-2">
                                    <Button variant="destructive" size="sm" onClick={() => handleDeleteAnnouncement(ann.id)}>
                                        <Trash2 className="h-4 w-4" />
                                        <span className="ml-2">Delete</span>
                                    </Button>
                               </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-muted-foreground">No announcements found. Post one to get started!</p>
                    )}
                </CardContent>
            </Card>

        </div>
    );
}
