
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { departments } from '@/lib/data';
import { BookOpen, PlusCircle, Trash2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type Teaching = {
    id: number;
    title: string;
    description: string;
    department: string;
    file?: File;
}

export default function AdminTeachingsPage() {
    const { toast } = useToast();
    const [teachings, setTeachings] = useState<Teaching[]>([]);
    const [newTeaching, setNewTeaching] = useState({
        title: '',
        description: '',
        department: '',
    });
    const [file, setFile] = useState<File | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewTeaching(prev => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (value: string) => {
        setNewTeaching(prev => ({...prev, department: value}));
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const handleAddTeaching = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTeaching.title || !newTeaching.department) {
            toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please provide a title and select a department.',
            });
            return;
        }
        const newId = teachings.length > 0 ? Math.max(...teachings.map(t => t.id)) + 1 : 1;
        const teachingToAdd: Teaching = { id: newId, ...newTeaching, file: file || undefined };
        setTeachings(prev => [teachingToAdd, ...prev]);
        setNewTeaching({
            title: '',
            description: '',
            department: '',
        });
        setFile(null);
        toast({
            title: 'Teaching Material Added',
            description: `"${newTeaching.title}" has been uploaded.`,
        });
    };

    const handleDeleteTeaching = (id: number) => {
        setTeachings(prev => prev.filter(t => t.id !== id));
        toast({
            title: 'Teaching Material Deleted',
            description: 'The material has been removed.',
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold text-foreground">Manage Teachings</h1>
                <p className="text-muted-foreground">
                    Upload and manage teaching materials, training documents, and assignments.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <PlusCircle className="h-5 w-5 text-accent" />
                        Add New Teaching Material
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddTeaching} className="grid gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" value={newTeaching.title} onChange={handleInputChange} placeholder="e.g., The Believer's Authority" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="department">Department</Label>
                            <Select onValueChange={handleSelectChange} value={newTeaching.department}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Assign to a department" />
                                </SelectTrigger>
                                <SelectContent>
                                    {departments.map(dept => (
                                        <SelectItem key={dept.name} value={dept.name}>{dept.name}</SelectItem>
                                    ))}
                                    <SelectItem value="All Departments">All Departments</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" value={newTeaching.description} onChange={handleInputChange} placeholder="A brief description of the material..." />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="file">Upload File (PDF, DOCX, etc.)</Label>
                             <Input id="file" type="file" onChange={handleFileChange} />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">
                                <Upload className="mr-2 h-4 w-4" />
                                Add Material
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-accent" />
                        Uploaded Materials
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                     {teachings.length > 0 ? teachings.map(t => (
                        <div key={t.id} className="flex flex-col md:flex-row gap-4 rounded-lg border p-4">
                           <div className="flex-grow">
                                <p className="text-sm font-semibold text-accent">{t.department}</p>
                                <h3 className="font-bold text-lg text-foreground mt-1">{t.title}</h3>
                               <p className="text-sm text-muted-foreground mt-2">{t.description}</p>
                               {t.file && <p className="text-xs text-muted-foreground mt-2">File: {t.file.name}</p>}
                           </div>
                           <div className="flex-shrink-0">
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteTeaching(t.id)}>
                                    <Trash2 className="h-4 w-4" />
                                    <span className="ml-2">Delete</span>
                                </Button>
                           </div>
                        </div>
                    )) : (
                        <p className="text-muted-foreground text-center">No teaching materials uploaded yet.</p>
                    )}
                </CardContent>
            </Card>

        </div>
    );
}
