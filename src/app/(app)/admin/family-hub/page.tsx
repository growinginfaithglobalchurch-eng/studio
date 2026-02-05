
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { communityUsers } from '@/lib/data';
import { Home, PlusCircle, Trash2, Edit, Save, User as UserIcon, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FamilyGroup } from '@/lib/types';
import { supabase } from '@/lib/supabase';

// Redefine FamilyGroup to match database structure
type DbFamilyGroup = {
    id: number;
    father_id: number;
    mother_id: number;
    monthly_focus: string;
    unity_score: string;
    children?: { user_id: number }[];
};

export default function AdminFamilyHubPage() {
    const { toast } = useToast();
    const [familyGroups, setFamilyGroups] = useState<DbFamilyGroup[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newGroup, setNewGroup] = useState({
        fatherId: '',
        motherId: '',
        child1Id: '',
        child2Id: '',
        monthlyFocus: ''
    });
    const [editingGroupId, setEditingGroupId] = useState<number | null>(null);
    const [editedFocus, setEditedFocus] = useState('');

    useEffect(() => {
        const fetchFamilyGroups = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('family_groups')
                .select(`
                    *,
                    family_group_children (
                        child_id
                    )
                `);

            if (error) {
                toast({ variant: 'destructive', title: 'Error fetching family groups', description: error.message });
            } else {
                 const formattedData = data.map(group => ({
                    ...group,
                    // The structure from Supabase might be different, adjust as needed.
                    // This assumes `family_group_children` is an array of objects with `child_id`.
                    children: group.family_group_children.map((c: any) => ({ user_id: c.child_id }))
                }));
                setFamilyGroups(formattedData || []);
            }
            setIsLoading(false);
        };
        fetchFamilyGroups();
    }, [toast]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewGroup(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setNewGroup(prev => ({ ...prev, [name]: value }));
    };

    const handleAddGroup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newGroup.fatherId || !newGroup.motherId) {
            toast({ variant: 'destructive', title: 'Missing Fields', description: 'Please select a father and mother.' });
            return;
        }

        const newFamilyGroupData = {
            father_id: parseInt(newGroup.fatherId, 10),
            mother_id: parseInt(newGroup.motherId, 10),
            monthly_focus: newGroup.monthlyFocus || 'Not Set',
            unity_score: 'Inactive',
        };

        const { data: groupData, error: groupError } = await supabase
            .from('family_groups')
            .insert(newFamilyGroupData)
            .select()
            .single();

        if (groupError) {
            toast({ variant: 'destructive', title: 'Error creating group', description: groupError.message });
            return;
        }

        if (groupData) {
            const childrenIds = [newGroup.child1Id, newGroup.child2Id].filter(Boolean).map(id => parseInt(id, 10));
            if (childrenIds.length > 0) {
                const childrenData = childrenIds.map(child_id => ({ group_id: groupData.id, child_id }));
                const { error: childrenError } = await supabase.from('family_group_children').insert(childrenData);
                if (childrenError) {
                    toast({ variant: 'destructive', title: 'Error adding children', description: childrenError.message });
                }
            }
            // Refetch to get the latest data with children
            const { data: newData, error: newError } = await supabase
                .from('family_groups')
                .select(`*, family_group_children (child_id)`)
                .eq('id', groupData.id)
                .single();

            if (newData) setFamilyGroups(prev => [newData, ...prev]);

            setNewGroup({ fatherId: '', motherId: '', child1Id: '', child2Id: '', monthlyFocus: '' });
            toast({ title: 'Family Group Created', description: `A new family group has been successfully created.` });
        }
    };

    const handleDeleteGroup = async (id: number) => {
        const { error } = await supabase.from('family_groups').delete().match({ id });
        if(error) {
            toast({ variant: 'destructive', title: 'Error deleting group', description: error.message });
        } else {
            setFamilyGroups(prev => prev.filter(group => group.id !== id));
            toast({ title: 'Group Deleted', description: 'The family group has been removed.' });
        }
    };

    const handleStartEdit = (group: DbFamilyGroup) => {
        setEditingGroupId(group.id);
        setEditedFocus(group.monthly_focus);
    };

    const handleSaveEdit = async (id: number) => {
        const { data, error } = await supabase
            .from('family_groups')
            .update({ monthly_focus: editedFocus })
            .match({ id })
            .select()
            .single();

        if (error) {
            toast({ variant: 'destructive', title: 'Error updating focus', description: error.message });
        } else if (data) {
            setFamilyGroups(prev => prev.map(group => group.id === id ? { ...group, monthly_focus: data.monthly_focus } : group));
            setEditingGroupId(null);
            toast({ title: 'Update Successful', description: 'Monthly focus has been updated.' });
        }
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
                     {isLoading ? (
                        <div className="flex items-center justify-center p-8">
                            <Loader2 className="h-8 w-8 animate-spin" />
                            <p className="ml-2">Loading groups...</p>
                        </div>
                    ) : familyGroups.length > 0 ? (
                        familyGroups.map(group => {
                            const father = getUserById(group.father_id);
                            const mother = getUserById(group.mother_id);
                            const children = group.children?.map(c => getUserById(c.user_id)).filter(Boolean) || [];
                            
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
                                         <p className="text-sm text-muted-foreground mt-2">Focus: {group.monthly_focus}</p>
                                    )}
                                </div>
                            )
                        })
                    ) : (
                        <p className="text-center text-muted-foreground">No family groups found.</p>
                    )}
                </CardContent>
            </Card>

        </div>
    );
}
