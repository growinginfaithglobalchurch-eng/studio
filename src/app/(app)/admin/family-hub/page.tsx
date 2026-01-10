
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { communityUsers } from '@/lib/data';
import { Home, PlusCircle, Trash2, Edit, Save, User as UserIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';

type FamilyGroup = {
    id: number;
    fatherId: number;
    motherId: number;
    childrenIds: number[];
    monthlyFocus: string;
};

const initialFamilyGroups: FamilyGroup[] = [
    {
        id: 1,
        fatherId: 1,
        motherId: 2,
        childrenIds: [3, 4],
        monthlyFocus: 'Unity & Vision',
    }
];

export default function AdminFamilyHubPage() {
    const { toast } = useToast();
    const [familyGroups, setFamilyGroups] = useState(initialFamilyGroups);
    const [newGroup, setNewGroup] = useState({
        fatherId: '',
        motherId: '',
        child1Id: '',
        child2Id: '',
        monthlyFocus: ''
    });
    const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
    const [editedFocus, setEditedFocus] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewGroup(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setNewGroup(prev => ({ ...prev, [name]: value }));
    };

    const handleAddGroup = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGroup.fatherId || !newGroup.motherId) {
            toast({ variant: 'destructive', title: 'Missing Fields', description: 'Please select a father and mother.' });
            return;
        }

        const newId = familyGroups.length > 0 ? Math.max(...familyGroups.map(g => g.id)) + 1 : 1;
        const childrenIds = [newGroup.child1Id, newGroup.child2Id].filter(Boolean).map(id => parseInt(id, 10));

        const newFamilyGroup: FamilyGroup = {
            id: newId,
            fatherId: parseInt(newGroup.fatherId, 10),
            motherId: parseInt(newGroup.motherId, 10),
            childrenIds: childrenIds,
            monthlyFocus: newGroup.monthlyFocus || 'Not Set'
        };

        setFamilyGroups(prev => [newFamilyGroup, ...prev]);
        setNewGroup({ fatherId: '', motherId: '', child1Id: '', child2Id: '', monthlyFocus: '' });
        toast({ title: 'Family Group Created', description: `A new family group has been successfully created.` });
    };

    const handleDeleteGroup = (id: number) => {
        setFamilyGroups(prev => prev.filter(group => group.id !== id));
        toast({ title: 'Group Deleted', description: 'The family group has been removed.' });
    };

    const handleStartEdit = (group: FamilyGroup) => {
        setEditingGroupId(group.id);
        setEditedFocus(group.monthlyFocus);
    };

    const handleSaveEdit = (id: number) => {
        setFamilyGroups(prev => prev.map(group => group.id === id ? { ...group, monthlyFocus: editedFocus } : group));
        setEditingGroupId(null);
        toast({ title: 'Update Successful', description: 'Monthly focus has been updated.' });
    };

    const getUserById = (id: number) => communityUsers.find(user => user.id === id);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold text-foreground">Manage Family Hubs</h1>
                <p className="text-muted-foreground">Create, edit, and manage family groups on the platform.</p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><PlusCircle className="h-5 w-5 text-accent" /> Create New Family Group</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddGroup} className="grid gap-6">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                            <div><Label>Father</Label><Select value={newGroup.fatherId} onValueChange={(val) => handleSelectChange('fatherId', val)}><SelectTrigger><SelectValue placeholder="Select Father" /></SelectTrigger><SelectContent>{communityUsers.map(u => <SelectItem key={u.id} value={u.id.toString()}>{u.name}</SelectItem>)}</SelectContent></Select></div>
                            <div><Label>Mother</Label><Select value={newGroup.motherId} onValueChange={(val) => handleSelectChange('motherId', val)}><SelectTrigger><SelectValue placeholder="Select Mother" /></SelectTrigger><SelectContent>{communityUsers.map(u => <SelectItem key={u.id} value={u.id.toString()}>{u.name}</SelectItem>)}</SelectContent></Select></div>
                            <div><Label>Child 1</Label><Select value={newGroup.child1Id} onValueChange={(val) => handleSelectChange('child1Id', val)}><SelectTrigger><SelectValue placeholder="Select Child" /></SelectTrigger><SelectContent>{communityUsers.map(u => <SelectItem key={u.id} value={u.id.toString()}>{u.name}</SelectItem>)}</SelectContent></Select></div>
                            <div><Label>Child 2</Label><Select value={newGroup.child2Id} onValueChange={(val) => handleSelectChange('child2Id', val)}><SelectTrigger><SelectValue placeholder="Select Child" /></SelectTrigger><SelectContent>{communityUsers.map(u => <SelectItem key={u.id} value={u.id.toString()}>{u.name}</SelectItem>)}</SelectContent></Select></div>
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="monthlyFocus">Monthly Focus</Label>
                            <Input id="monthlyFocus" name="monthlyFocus" value={newGroup.monthlyFocus} onChange={handleInputChange} placeholder="e.g., Prayer & Intercession" />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit"><PlusCircle className="mr-2 h-4 w-4" /> Create Group</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Home className="h-5 w-5 text-accent" /> Existing Family Groups</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {familyGroups.map(group => {
                        const father = getUserById(group.fatherId);
                        const mother = getUserById(group.motherId);
                        const children = group.childrenIds.map(id => getUserById(id)).filter(Boolean);
                        
                        return (
                            <div key={group.id} className="rounded-lg border p-4">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg text-foreground">Family Group ID: {group.id}</h3>
                                        <div className="flex items-center gap-4 mt-2">
                                            {father && <div className="flex items-center gap-2 text-sm"><UserIcon className="h-4 w-4"/> F: {father.name}</div>}
                                            {mother && <div className="flex items-center gap-2 text-sm"><UserIcon className="h-4 w-4"/> M: {mother.name}</div>}
                                        </div>
                                         <p className="text-sm mt-1">Children: {children.map(c => c?.name).join(', ') || 'None'}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm" onClick={() => handleStartEdit(group)}><Edit className="h-4 w-4 mr-1"/> Edit</Button>
                                        <Button variant="destructive" size="sm" onClick={() => handleDeleteGroup(group.id)}><Trash2 className="h-4 w-4 mr-1"/> Delete</Button>
                                    </div>
                                </div>
                                {editingGroupId === group.id ? (
                                    <div className="mt-4 flex items-end gap-2">
                                        <div className="grid w-full gap-1.5">
                                            <Label htmlFor="edit-focus">Monthly Focus</Label>
                                            <Input id="edit-focus" value={editedFocus} onChange={(e) => setEditedFocus(e.target.value)} />
                                        </div>
                                        <Button size="sm" onClick={() => handleSaveEdit(group.id)}><Save className="h-4 w-4"/></Button>
                                    </div>
                                ) : (
                                     <p className="text-sm text-muted-foreground mt-2">Focus: {group.monthlyFocus}</p>
                                )}
                            </div>
                        )
                    })}
                </CardContent>
            </Card>

        </div>
    );
}
