
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { communityUsers } from '@/lib/data';
import { UserCheck, PlusCircle, Trash2, UserCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/lib/supabase';

type MentorshipClass = {
    id: number;
    title: string;
    description: string;
    mentor_id: number;
};

export default function AdminMentorshipPage() {
    const { toast } = useToast();
    const [mentorshipClasses, setMentorshipClasses] = useState<MentorshipClass[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newClass, setNewClass] = useState({
        title: '',
        description: '',
        mentorId: ''
    });

    useEffect(() => {
        const fetchClasses = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('mentorship_classes')
                .select('*')
                .order('id', { ascending: false });

            if (error) {
                toast({ variant: 'destructive', title: 'Error fetching classes', description: error.message });
            } else {
                setMentorshipClasses(data || []);
            }
            setIsLoading(false);
        };
        fetchClasses();
    }, [toast]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewClass(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSelectChange = (value: string) => {
        setNewClass(prev => ({ ...prev, mentorId: value }));
    };

    const handleAddClass = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newClass.title || !newClass.mentorId) {
            toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please provide a title and select a mentor.',
            });
            return;
        }
        const newMentorshipClass = {
            title: newClass.title,
            description: newClass.description,
            mentor_id: parseInt(newClass.mentorId, 10),
        };

        const { data, error } = await supabase.from('mentorship_classes').insert([newMentorshipClass]).select();

        if (error) {
            toast({ variant: 'destructive', title: 'Error adding class', description: error.message });
        } else if (data) {
            setMentorshipClasses(prev => [data[0], ...prev]);
            setNewClass({
                title: '',
                description: '',
                mentorId: ''
            });
            toast({
                title: 'Mentorship Class Added',
                description: `"${newClass.title}" has been successfully added.`,
            });
        }
    };

    const handleDeleteClass = async (id: number) => {
        const { error } = await supabase.from('mentorship_classes').delete().match({ id });

        if (error) {
            toast({ variant: 'destructive', title: 'Error deleting class', description: error.message });
        } else {
            setMentorshipClasses(prev => prev.filter(c => c.id !== id));
            toast({
                title: 'Mentorship Class Deleted',
                description: 'The class has been removed.',
            });
        }
    };

    const getMentorById = (id: number) => {
        return communityUsers.find(user => user.id === id);
    }

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold text-foreground">Manage Mentorship</h1>
                <p className="text-muted-foreground">
                    Create mentorship classes and assign leaders.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <PlusCircle className="h-5 w-5 text-accent" />
                        Add New Mentorship Class
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddClass} className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="title">Class Title</Label>
                            <Input id="title" name="title" value={newClass.title} onChange={handleInputChange} placeholder="e.g., Prophetic Ministry 101" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="mentorId">Assign Mentor</Label>
                             <Select onValueChange={handleSelectChange} value={newClass.mentorId}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Select a mentor" />
                                </SelectTrigger>
                                <SelectContent>
                                    {communityUsers.map(user => (
                                        <SelectItem key={user.id} value={user.id.toString()}>
                                            <div className="flex items-center gap-2">
                                                <Avatar className="h-6 w-6">
                                                    {user.avatar && <AvatarImage src={user.avatar.imageUrl} alt={user.name} />}
                                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span>{user.name}</span>
                                            </div>
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" value={newClass.description} onChange={handleInputChange} placeholder="A brief description of the class..." />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <Button type="submit">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Class
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <UserCheck className="h-5 w-5 text-accent" />
                        Existing Classes
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     {isLoading ? (
                        <div className="flex justify-center items-center p-4"><Loader2 className="animate-spin h-6 w-6"/></div>
                    ) : mentorshipClasses.map(mc => {
                        const mentor = getMentorById(mc.mentor_id);
                        return (
                            <div key={mc.id} className="flex flex-col md:flex-row gap-4 rounded-lg border p-4">
                               <div className="flex-grow">
                                    <h3 className="font-bold text-lg text-foreground">{mc.title}</h3>
                                   {mentor && (
                                       <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                           <UserCircle className="h-4 w-4" />
                                           <span>Mentor: {mentor.name}</span>
                                       </div>
                                   )}
                                   <p className="text-sm text-muted-foreground mt-2">{mc.description}</p>
                               </div>
                               <div className="flex-shrink-0 flex flex-col gap-2">
                                    <Button variant="destructive" size="sm" onClick={() => handleDeleteClass(mc.id)}>
                                        <Trash2 className="h-4 w-4" />
                                        <span className="ml-2">Delete</span>
                                    </Button>
                               </div>
                            </div>
                        )
                    })}
                </CardContent>
            </Card>

        </div>
    );
}
