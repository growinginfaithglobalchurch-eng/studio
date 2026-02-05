
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { communityUsers } from '@/lib/data';
import { Users, PlusCircle, Trash2, UserCheck, Link as LinkIcon, UserPlus, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';

type PersonalDiscipleship = {
    id: number;
    disciple_id: number;
    discipler_id: number;
}

type GeneralDiscipleship = {
    id: number;
    title: string;
    description: string;
}

export default function AdminDiscipleshipPage() {
    const { toast } = useToast();
    const [personal, setPersonal] = useState<PersonalDiscipleship[]>([]);
    const [general, setGeneral] = useState<GeneralDiscipleship[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [newPersonal, setNewPersonal] = useState({ discipleId: '', disciplerId: '' });
    const [newGeneral, setNewGeneral] = useState({ title: '', description: ''});

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const personalRes = await supabase.from('discipleship_personal').select('*');
            const generalRes = await supabase.from('discipleship_general').select('*');
            
            if (personalRes.error) {
                toast({ variant: 'destructive', title: 'Error fetching personal discipleship', description: personalRes.error.message });
            } else {
                setPersonal(personalRes.data || []);
            }
            if (generalRes.error) {
                toast({ variant: 'destructive', title: 'Error fetching general discipleship', description: generalRes.error.message });
            } else {
                setGeneral(generalRes.data || []);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [toast]);

    const handlePersonalChange = (type: 'discipleId' | 'disciplerId', value: string) => {
        setNewPersonal(prev => ({ ...prev, [type]: value }));
    };
    
    const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewGeneral(prev => ({ ...prev, [name]: value }));
    };

    const handleAddPersonal = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPersonal.discipleId || !newPersonal.disciplerId) {
            toast({ variant: 'destructive', title: 'Missing Fields', description: 'Please select a disciple and a discipler.' });
            return;
        }
        if (newPersonal.discipleId === newPersonal.disciplerId) {
            toast({ variant: 'destructive', title: 'Invalid Assignment', description: 'A user cannot disciple themselves.' });
            return;
        }
        
        const newPairing = {
            disciple_id: parseInt(newPersonal.discipleId, 10),
            discipler_id: parseInt(newPersonal.disciplerId, 10),
        };

        const { data, error } = await supabase.from('discipleship_personal').insert([newPairing]).select();
        
        if (error) {
            toast({ variant: 'destructive', title: 'Error creating relationship', description: error.message });
        } else if (data) {
            setPersonal(prev => [data[0], ...prev]);
            setNewPersonal({ discipleId: '', disciplerId: '' });
            toast({ title: 'Relationship Added', description: `New discipleship relationship has been created.` });
        }
    };

    const handleAddGeneral = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGeneral.title) {
            toast({ variant: 'destructive', title: 'Missing Field', description: 'Please provide a title for the class.' });
            return;
        }
        const { data, error } = await supabase.from('discipleship_general').insert([newGeneral]).select();
        if (error) {
            toast({ variant: 'destructive', title: 'Error adding class', description: error.message });
        } else if (data) {
            setGeneral(prev => [data[0], ...prev]);
            setNewGeneral({ title: '', description: '' });
            toast({ title: 'Class Added', description: `"${newGeneral.title}" has been successfully added.` });
        }
    };

    const handleDeletePersonal = async (id: number) => {
        const { error } = await supabase.from('discipleship_personal').delete().match({ id });
        if (error) {
            toast({ variant: 'destructive', title: 'Error removing relationship', description: error.message });
        } else {
            setPersonal(prev => prev.filter(p => p.id !== id));
            toast({ title: 'Relationship Removed', description: 'The discipleship relationship has been removed.' });
        }
    };
    
    const handleDeleteGeneral = async (id: number) => {
        const { error } = await supabase.from('discipleship_general').delete().match({ id });
        if (error) {
            toast({ variant: 'destructive', title: 'Error deleting class', description: error.message });
        } else {
            setGeneral(prev => prev.filter(g => g.id !== id));
            toast({ title: 'Class Deleted', description: 'The general discipleship class has been removed.' });
        }
    };

    const getUserById = (id: number) => communityUsers.find(user => user.id === id);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold text-foreground">Making of Disciples Program</h1>
                <p className="text-muted-foreground">
                    Manage personal and general discipleship tracks based on Matthew 4:19 and Matthew 28:18-20.
                </p>
            </div>

            <Tabs defaultValue="personal">
                <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
                    <TabsTrigger value="personal"><UserCheck className="mr-2 h-4 w-4" /> Personal</TabsTrigger>
                    <TabsTrigger value="general"><Users className="mr-2 h-4 w-4" /> General</TabsTrigger>
                </TabsList>
                <TabsContent value="personal">
                     <div className="space-y-8">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <UserPlus className="h-5 w-5 text-accent" />
                                    Assign Personal Discipleship
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleAddPersonal} className="grid gap-6 md:grid-cols-3">
                                    <div className="space-y-2">
                                        <Label>Select Disciple</Label>
                                        <Select onValueChange={(val) => handlePersonalChange('discipleId', val)} value={newPersonal.discipleId}>
                                            <SelectTrigger><SelectValue placeholder="Select a disciple" /></SelectTrigger>
                                            <SelectContent>{communityUsers.map(user => <SelectItem key={user.id} value={user.id.toString()}>{user.name}</SelectItem>)}</SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Select Discipler</Label>
                                         <Select onValueChange={(val) => handlePersonalChange('disciplerId', val)} value={newPersonal.disciplerId}>
                                            <SelectTrigger><SelectValue placeholder="Select a discipler" /></SelectTrigger>
                                            <SelectContent>{communityUsers.map(user => <SelectItem key={user.id} value={user.id.toString()}>{user.name}</SelectItem>)}</SelectContent>
                                        </Select>
                                    </div>
                                    <div className="flex items-end">
                                        <Button type="submit" className="w-full">
                                            <LinkIcon className="mr-2 h-4 w-4" />
                                            Assign
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Existing Relationships</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                {isLoading ? (
                                    <div className="flex justify-center items-center p-4"><Loader2 className="animate-spin h-6 w-6"/></div>
                                ) : personal.length > 0 ? (
                                    personal.map(p => {
                                        const disciple = getUserById(p.disciple_id);
                                        const discipler = getUserById(p.discipler_id);
                                        if (!disciple || !discipler) return null;
                                        return (
                                            <div key={p.id} className="flex items-center justify-between rounded-lg border p-4">
                                                <div className="flex items-center gap-4">
                                                    <Avatar><AvatarImage src={discipler.avatar.imageUrl} /><AvatarFallback>{discipler.name.charAt(0)}</AvatarFallback></Avatar>
                                                    <div><p className="font-semibold">{discipler.name}</p><p className="text-xs text-muted-foreground">Discipler</p></div>
                                                </div>
                                                <LinkIcon className="h-5 w-5 text-accent" />
                                                <div className="flex items-center gap-4">
                                                    <Avatar><AvatarImage src={disciple.avatar.imageUrl} /><AvatarFallback>{disciple.name.charAt(0)}</AvatarFallback></Avatar>
                                                    <div><p className="font-semibold">{disciple.name}</p><p className="text-xs text-muted-foreground">Disciple</p></div>
                                                </div>
                                                <Button variant="destructive" size="sm" onClick={() => handleDeletePersonal(p.id)}><Trash2 className="h-4 w-4" /></Button>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <p className="text-muted-foreground text-center">No personal discipleship relationships found.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
                <TabsContent value="general">
                    <div className="space-y-8">
                        <Card>
                            <CardHeader><CardTitle className="flex items-center gap-2"><PlusCircle className="h-5 w-5 text-accent" />Create General Class/Meeting</CardTitle></CardHeader>
                            <CardContent>
                                <form onSubmit={handleAddGeneral} className="grid gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="title">Title</Label>
                                        <Input id="title" name="title" value={newGeneral.title} onChange={handleGeneralChange} placeholder="e.g., Wednesday Bible Study" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea id="description" name="description" value={newGeneral.description} onChange={handleGeneralChange} placeholder="Details about the meeting, schedule, etc." />
                                    </div>
                                    <div className="flex justify-end">
                                        <Button type="submit"><PlusCircle className="mr-2 h-4 w-4" /> Add Class</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardHeader><CardTitle>Existing General Classes</CardTitle></CardHeader>
                            <CardContent className="space-y-4">
                                 {isLoading ? (
                                    <div className="flex justify-center items-center p-4"><Loader2 className="animate-spin h-6 w-6"/></div>
                                ) : general.length > 0 ? (
                                    general.map(g => (
                                        <div key={g.id} className="flex justify-between items-start rounded-lg border p-4">
                                            <div>
                                                <h3 className="font-bold text-lg">{g.title}</h3>
                                                <p className="text-sm text-muted-foreground mt-1">{g.description}</p>
                                            </div>
                                            <Button variant="destructive" size="sm" onClick={() => handleDeleteGeneral(g.id)}><Trash2 className="h-4 w-4" /></Button>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-muted-foreground text-center">No general classes found.</p>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}

    