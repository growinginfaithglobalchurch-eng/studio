
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { groups as initialGroups, communityUsers } from '@/lib/data';
import { Users, PlusCircle, Trash2, Edit, Save, Search } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Image from 'next/image';

export default function AdminLifeGroupsPage() {
    const { toast } = useToast();
    const [groups, setGroups] = useState(initialGroups);
    const [newGroup, setNewGroup] = useState({
        name: '',
        description: '',
        category: '',
        leaderId: '',
        imageUrl: '',
        imageHint: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewGroup(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSelectChange = (value: string) => {
        setNewGroup(prev => ({ ...prev, leaderId: value }));
    };

    const handleAddGroup = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGroup.name || !newGroup.leaderId) {
            toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please provide a name and select a leader.',
            });
            return;
        }
        const newId = groups.length > 0 ? Math.max(...groups.map(g => g.id)) + 1 : 1;
        const newLifeGroup = {
            id: newId,
            name: newGroup.name,
            description: newGroup.description,
            category: newGroup.category,
            members: 1, // Leader is the first member
            image: {
                id: `lg-${newId}`,
                imageUrl: newGroup.imageUrl || 'https://picsum.photos/seed/1/600/400',
                description: newGroup.name,
                imageHint: newGroup.imageHint || 'community group'
            }
        };
        setGroups(prev => [newLifeGroup, ...prev]);
        setNewGroup({
            name: '',
            description: '',
            category: '',
            leaderId: '',
            imageUrl: '',
            imageHint: ''
        });
        toast({
            title: 'Life Group Added',
            description: `"${newGroup.name}" has been successfully created.`,
        });
    };

    const handleDeleteGroup = (id: number) => {
        setGroups(prev => prev.filter(g => g.id !== id));
        toast({
            title: 'Life Group Deleted',
            description: 'The group has been removed.',
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold text-foreground">Manage Life Groups</h1>
                <p className="text-muted-foreground">
                    Create, edit, and manage Life Groups and their leaders.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <PlusCircle className="h-5 w-5 text-accent" />
                        Create New Life Group
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddGroup} className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="name">Group Name</Label>
                            <Input id="name" name="name" value={newGroup.name} onChange={handleInputChange} placeholder="e.g., Northside Young Adults" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="leaderId">Assign Leader</Label>
                             <Select onValueChange={handleSelectChange} value={newGroup.leaderId}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a leader" />
                                </SelectTrigger>
                                <SelectContent>
                                    {communityUsers.map(user => (
                                        <SelectItem key={user.id} value={user.id.toString()}>{user.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Input id="category" name="category" value={newGroup.category} onChange={handleInputChange} placeholder="e.g., Young Adults, Married Couples" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" value={newGroup.description} onChange={handleInputChange} placeholder="A brief description of the group's focus..." />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="imageUrl">Image URL</Label>
                            <Input id="imageUrl" name="imageUrl" value={newGroup.imageUrl} onChange={handleInputChange} placeholder="https://... (optional)" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="imageHint">Image AI Hint</Label>
                            <Input id="imageHint" name="imageHint" value={newGroup.imageHint} onChange={handleInputChange} placeholder="e.g., community group" />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <Button type="submit">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Create Group
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-accent" />
                        Existing Life Groups
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {groups.map(group => (
                        <div key={group.id} className="flex flex-col md:flex-row gap-4 rounded-lg border p-4 items-start">
                           {group.image && (
                               <div className="relative w-full md:w-40 h-24 md:h-auto flex-shrink-0 overflow-hidden rounded-md">
                                    <Image src={group.image.imageUrl} alt={group.name} fill className="object-cover" data-ai-hint={group.image.imageHint} />
                               </div>
                           )}
                           <div className="flex-grow">
                                <h3 className="font-bold text-lg text-foreground">{group.name}</h3>
                                <p className="text-sm font-semibold text-accent">{group.category}</p>
                                <p className="text-sm text-muted-foreground mt-1">{group.description}</p>
                                <p className="text-xs text-muted-foreground mt-2">{group.members} Members</p>
                           </div>
                           <div className="flex-shrink-0 flex flex-col gap-2">
                                <Button variant="outline" size="sm">
                                    <Edit className="h-4 w-4 mr-2"/> Edit
                                </Button>
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteGroup(group.id)}>
                                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                                </Button>
                           </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

        </div>
    );
}
