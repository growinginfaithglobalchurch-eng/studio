
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/lib/supabase';
import { Handshake, PlusCircle, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { iconMap } from '../../departments/page';

type Department = {
    id: number;
    name: string;
    description: string;
    icon: string;
}

export default function AdminDepartmentsPage() {
    const { toast } = useToast();
    const [departments, setDepartments] = useState<Department[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newDepartment, setNewDepartment] = useState({
        name: '',
        description: '',
        icon: 'Users',
    });

    useEffect(() => {
        const fetchDepartments = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('departments')
                .select('*')
                .order('name', { ascending: true });

            if (error) {
                toast({
                    variant: 'destructive',
                    title: 'Error fetching departments',
                    description: error.message,
                });
            } else {
                setDepartments(data || []);
            }
            setIsLoading(false);
        };

        fetchDepartments();
    }, [toast]);


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewDepartment(prev => ({ ...prev, [name]: value }));
    };

    const handleIconChange = (value: string) => {
        setNewDepartment(prev => ({ ...prev, icon: value }));
    };

    const handleAddDepartment = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newDepartment.name || !newDepartment.description) {
            toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please fill out all fields.',
            });
            return;
        }
        
        const { data, error } = await supabase
            .from('departments')
            .insert([newDepartment])
            .select();

        if (error) {
             toast({
                variant: 'destructive',
                title: 'Error adding department',
                description: error.message,
            });
        } else if (data) {
            setDepartments(prev => [...prev, data[0]].sort((a, b) => a.name.localeCompare(b.name)));
            setNewDepartment({
                name: '',
                description: '',
                icon: 'Users'
            });
            toast({
                title: 'Department Added',
                description: `"${newDepartment.name}" has been successfully added.`,
            });
        }
    };

    const handleDeleteDepartment = async (id: number) => {
        const { error } = await supabase
            .from('departments')
            .delete()
            .match({ id });
            
        if (error) {
            toast({
                variant: 'destructive',
                title: 'Error Deleting',
                description: error.message,
            });
        } else {
            setDepartments(prev => prev.filter(dept => dept.id !== id));
            toast({
                title: 'Department Deleted',
                description: `The department has been removed.`,
            });
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold text-foreground">Manage Departments</h1>
                <p className="text-muted-foreground">
                    Create, edit, or remove church departments.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <PlusCircle className="h-5 w-5 text-accent" />
                        Create New Department
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddDepartment} className="grid gap-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Department Name</Label>
                                <Input id="name" name="name" value={newDepartment.name} onChange={handleInputChange} placeholder="e.g., Praise & Worship" />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="icon">Icon</Label>
                                <Select onValueChange={handleIconChange} value={newDepartment.icon}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select an icon" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(iconMap).map(iconKey => (
                                            <SelectItem key={iconKey} value={iconKey}>
                                                <div className="flex items-center gap-2">
                                                    {iconMap[iconKey]}
                                                    <span>{iconKey}</span>
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" value={newDepartment.description} onChange={handleInputChange} placeholder="Write a brief description of the department's purpose..." />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Department
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Handshake className="h-5 w-5 text-accent" />
                        Existing Departments
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     {isLoading ? (
                        <div className="flex items-center justify-center p-8">
                            <Loader2 className="h-8 w-8 animate-spin" />
                            <p className="ml-2">Loading departments...</p>
                        </div>
                    ) : departments.length > 0 ? (
                        departments.map(dept => (
                            <div key={dept.id} className="flex flex-col md:flex-row gap-4 rounded-lg border p-4 items-start">
                            <div className="bg-muted p-3 rounded-md mt-1">
                                    {iconMap[dept.icon]}
                            </div>
                            <div className="flex-grow">
                                    <h3 className="font-bold text-lg text-foreground">{dept.name}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{dept.description}</p>
                            </div>
                            <div className="flex-shrink-0 flex flex-col gap-2">
                                    <Button variant="destructive" size="sm" onClick={() => handleDeleteDepartment(dept.id)}>
                                        <Trash2 className="h-4 w-4" />
                                        <span className="ml-2">Delete</span>
                                    </Button>
                            </div>
                            </div>
                        ))
                     ) : (
                        <p className="text-center text-muted-foreground">No departments found. Add one to get started!</p>
                    )}
                </CardContent>
            </Card>

        </div>
    );
}
