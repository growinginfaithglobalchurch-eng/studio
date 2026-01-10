
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { serviceElements as initialServiceElements } from '@/lib/data';
import { ClipboardList, PlusCircle, Trash2, Edit, Save, Waves, Sparkles, Wind, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ServiceElement = {
    id: number;
    title: string;
    description: string;
    details: string;
};

const iconMap: { [key: string]: React.ReactNode } = {
  "Atmosphere": <Waves className="h-6 w-6 text-accent" />,
  "Revelation": <Sparkles className="h-6 w-6 text-accent" />,
  "Impartation": <Wind className="h-6 w-6 text-accent" />,
  "Commissioning": <Users className="h-6 w-6 text-accent" />,
  "Default": <ClipboardList className="h-6 w-6 text-accent" />,
};

const getIcon = (title: string) => {
    if (title.includes('Atmosphere')) return iconMap['Atmosphere'];
    if (title.includes('Revelation')) return iconMap['Revelation'];
    if (title.includes('Impartation')) return iconMap['Impartation'];
    if (title.includes('Closing')) return iconMap['Commissioning'];
    return iconMap['Default'];
}


export default function AdminProgrammingPage() {
    const { toast } = useToast();
    const [serviceElements, setServiceElements] = useState<ServiceElement[]>(initialServiceElements);
    const [newElement, setNewElement] = useState({ title: '', description: '', details: '' });
    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedData, setEditedData] = useState({ title: '', description: '', details: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewElement(prev => ({ ...prev, [name]: value }));
    };

    const handleAddElement = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newElement.title || !newElement.description) {
            toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please fill out at least title and description.',
            });
            return;
        }
        const newId = serviceElements.length > 0 ? Math.max(...serviceElements.map(e => e.id)) + 1 : 1;
        setServiceElements(prev => [...prev, { id: newId, ...newElement }]);
        setNewElement({ title: '', description: '', details: '' });
        toast({
            title: 'Service Element Added',
            description: `"${newElement.title}" has been added to the service flow.`,
        });
    };

    const handleDeleteElement = (id: number) => {
        setServiceElements(prev => prev.filter(e => e.id !== id));
        toast({ title: 'Element Deleted', description: 'The service element has been removed.' });
    };

    const handleStartEdit = (element: ServiceElement) => {
        setEditingId(element.id);
        setEditedData({ title: element.title, description: element.description, details: element.details });
    };

    const handleCancelEdit = () => {
        setEditingId(null);
    };

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveEdit = (id: number) => {
        if (!editedData.title) {
            toast({ variant: 'destructive', title: 'Missing Title', description: 'Title cannot be empty.' });
            return;
        }
        setServiceElements(prev => prev.map(el =>
            el.id === id ? { ...el, ...editedData } : el
        ));
        setEditingId(null);
        toast({ title: 'Update Successful', description: 'The service element has been updated.' });
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold text-foreground">Manage Service Programming</h1>
                <p className="text-muted-foreground">
                    Add, edit, or remove elements from the church service flow.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <PlusCircle className="h-5 w-5 text-accent" />
                        Add New Service Element
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddElement} className="grid gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" value={newElement.title} onChange={handleInputChange} placeholder="e.g., 4. Closing & Commissioning" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Input id="description" name="description" value={newElement.description} onChange={handleInputChange} placeholder="e.g., Sending the church out into the world..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="details">Key Components (comma-separated)</Label>
                            <Textarea id="details" name="details" value={newElement.details} onChange={handleInputChange} placeholder="e.g., Closing Announcements, Benediction & Blessing, Fellowship" />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Element
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <ClipboardList className="h-5 w-5 text-accent" />
                        Service Flow Elements
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {serviceElements.map((item) => (
                        <Card key={item.id} className="p-4">
                             {editingId === item.id ? (
                                <div className="space-y-4">
                                     <div className="space-y-2">
                                        <Label htmlFor="edit-title">Title</Label>
                                        <Input id="edit-title" name="title" value={editedData.title} onChange={handleEditChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-description">Description</Label>
                                        <Input id="edit-description" name="description" value={editedData.description} onChange={handleEditChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-details">Key Components (comma-separated)</Label>
                                        <Textarea id="edit-details" name="details" value={editedData.details} onChange={handleEditChange} />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" onClick={() => handleSaveEdit(item.id)}>
                                            <Save className="h-4 w-4 mr-2" /> Save
                                        </Button>
                                        <Button size="sm" variant="ghost" onClick={handleCancelEdit}>Cancel</Button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div className="flex items-start gap-3">
                                        {getIcon(item.title)}
                                        <div>
                                            <h3 className="font-headline font-bold text-xl">{item.title}</h3>
                                            <p className="text-muted-foreground">{item.description}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pl-9">
                                        <h4 className="font-semibold text-foreground mb-2">Key Components:</h4>
                                        <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                                        {item.details.split(',').map(detail => detail.trim()).map(d => <li key={d}>{d}</li>)}
                                        </ul>
                                    </div>
                                     <div className="flex gap-2 border-t pt-4 mt-4 pl-9">
                                         <Button variant="outline" size="sm" onClick={() => handleStartEdit(item)}>
                                            <Edit className="h-4 w-4 mr-2" />
                                            Edit
                                        </Button>
                                         <Button variant="destructive" size="sm" onClick={() => handleDeleteElement(item.id)}>
                                            <Trash2 className="h-4 w-4 mr-2" />
                                            Delete
                                        </Button>
                                     </div>
                                </div>
                            )}
                        </Card>
                    ))}
                </CardContent>
            </Card>

        </div>
    );
}
