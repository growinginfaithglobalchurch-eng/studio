
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar, PlusCircle, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/lib/supabase';
import { departments } from '@/lib/data'; // Still needed for the dropdown

type Meeting = {
    id: number;
    title: string;
    description: string;
    date: string;
    department: string;
}

export default function AdminMeetingsPage() {
    const { toast } = useToast();
    const [meetings, setMeetings] = useState<Meeting[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newMeeting, setNewMeeting] = useState({
        title: '',
        description: '',
        date: '',
        department: '',
    });

    useEffect(() => {
        const fetchMeetings = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('meetings')
                .select('*')
                .order('date', { ascending: false });

            if (error) {
                toast({ variant: 'destructive', title: 'Error fetching meetings', description: error.message });
            } else {
                setMeetings(data || []);
            }
            setIsLoading(false);
        };
        fetchMeetings();
    }, [toast]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewMeeting(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSelectChange = (value: string) => {
        setNewMeeting(prev => ({...prev, department: value}));
    }

    const handleAddMeeting = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMeeting.title || !newMeeting.date || !newMeeting.department) {
            toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please fill out title, date, and department.',
            });
            return;
        }
        
        const { data, error } = await supabase.from('meetings').insert([newMeeting]).select();

        if (error) {
            toast({ variant: 'destructive', title: 'Error scheduling meeting', description: error.message });
        } else if (data) {
            setMeetings(prev => [data[0], ...prev]);
            setNewMeeting({
                title: '',
                description: '',
                date: '',
                department: '',
            });
            toast({
                title: 'Meeting Scheduled',
                description: `"${newMeeting.title}" has been added.`,
            });
        }
    };

    const handleDeleteMeeting = async (id: number) => {
        const { error } = await supabase.from('meetings').delete().match({ id });
        if (error) {
            toast({ variant: 'destructive', title: 'Error deleting meeting', description: error.message });
        } else {
            setMeetings(prev => prev.filter(m => m.id !== id));
            toast({
                title: 'Meeting Deleted',
                description: 'The meeting has been removed.',
            });
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold text-foreground">Manage Meetings</h1>
                <p className="text-muted-foreground">
                    Schedule meetings, trainings, and sessions for various departments.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <PlusCircle className="h-5 w-5 text-accent" />
                        Schedule New Meeting
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddMeeting} className="grid gap-6">
                        <div className="grid md:grid-cols-2 gap-6">
                             <div className="space-y-2">
                                <Label htmlFor="title">Meeting Title</Label>
                                <Input id="title" name="title" value={newMeeting.title} onChange={handleInputChange} placeholder="e.g., Weekly Training Session" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="date">Date & Time</Label>
                                <Input id="date" name="date" type="datetime-local" value={newMeeting.date} onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Select onValueChange={handleSelectChange} value={newMeeting.department}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Assign to a department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map(dept => (
                                        <SelectItem key={dept.name} value={dept.name}>{dept.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description / Agenda</Label>
                            <Textarea id="description" name="description" value={newMeeting.description} onChange={handleInputChange} placeholder="Details about the meeting..." />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Schedule Meeting
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-accent" />
                        Scheduled Meetings
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {isLoading ? (
                        <div className="flex justify-center items-center p-4"><Loader2 className="animate-spin h-6 w-6"/></div>
                    ) : meetings.length > 0 ? meetings.map(m => (
                        <div key={m.id} className="flex flex-col md:flex-row gap-4 rounded-lg border p-4">
                           <div className="flex-grow">
                                <p className="text-sm text-muted-foreground">{new Date(m.date).toLocaleString()} &bull; {m.department}</p>
                                <h3 className="font-bold text-lg text-foreground mt-1">{m.title}</h3>
                               <p className="text-sm text-muted-foreground mt-2">{m.description}</p>
                           </div>
                           <div className="flex-shrink-0">
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteMeeting(m.id)}>
                                    <Trash2 className="h-4 w-4" />
                                    <span className="ml-2">Delete</span>
                                </Button>
                           </div>
                        </div>
                    )) : (
                        <p className="text-muted-foreground text-center">No meetings scheduled yet.</p>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
