
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { annualCalendar as initialAnnualCalendar } from '@/lib/data';
import { Calendar, PlusCircle, Trash2, Edit, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

type MonthlyEvent = {
    month: string;
    theme: string;
    purpose: string;
    activities: string[];
}

export default function AdminEventsPage() {
    const { toast } = useToast();
    const [annualCalendar, setAnnualCalendar] = useState<MonthlyEvent[]>(initialAnnualCalendar);
    const [newMonthEvent, setNewMonthEvent] = useState({
        month: '',
        theme: '',
        purpose: '',
        activities: ''
    });

    const [editingMonth, setEditingMonth] = useState<string | null>(null);
    const [editedData, setEditedData] = useState({ theme: '', purpose: '', activities: '' });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewMonthEvent(prev => ({ ...prev, [name]: value }));
    };

    const handleAddMonth = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newMonthEvent.month || !newMonthEvent.theme) {
            toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please fill out at least month and theme.',
            });
            return;
        }
        if (annualCalendar.some(event => event.month.toLowerCase() === newMonthEvent.month.toLowerCase())) {
            toast({
                variant: 'destructive',
                title: 'Month Exists',
                description: `An entry for ${newMonthEvent.month} already exists.`,
            });
            return;
        }
        const newEvent = {
            ...newMonthEvent,
            activities: newMonthEvent.activities.split(',').map(s => s.trim()),
        };
        setAnnualCalendar(prev => [...prev, newEvent]);
        setNewMonthEvent({
            month: '',
            theme: '',
            purpose: '',
            activities: ''
        });
        toast({
            title: 'Monthly Theme Added',
            description: `The theme for ${newMonthEvent.month} has been added.`,
        });
    };

    const handleDeleteMonth = (month: string) => {
        setAnnualCalendar(prev => prev.filter(m => m.month !== month));
        toast({
            title: 'Monthly Theme Deleted',
            description: `The theme for ${month} has been removed.`,
        });
    };
    
    const handleStartEdit = (event: MonthlyEvent) => {
        setEditingMonth(event.month);
        setEditedData({
            theme: event.theme,
            purpose: event.purpose,
            activities: event.activities.join(', ')
        });
    };

    const handleCancelEdit = () => {
        setEditingMonth(null);
    };
    
    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setEditedData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSaveEdit = (month: string) => {
        if (!editedData.theme) {
             toast({
                variant: 'destructive',
                title: 'Missing Theme',
                description: 'Theme cannot be empty.',
            });
            return;
        }
        setAnnualCalendar(prev => prev.map(event => 
            event.month === month 
            ? { 
                ...event, 
                theme: editedData.theme,
                purpose: editedData.purpose,
                activities: editedData.activities.split(',').map(s => s.trim())
              } 
            : event
        ));
        setEditingMonth(null);
        toast({
            title: 'Update Successful',
            description: `The theme for ${month} has been updated.`,
        });
    };


    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold text-foreground">Manage Annual Calendar</h1>
                <p className="text-muted-foreground">
                    Add, edit, or remove themes from the 12-month ministry calendar.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <PlusCircle className="h-5 w-5 text-accent" />
                        Add New Monthly Theme
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddMonth} className="grid gap-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="month">Month</Label>
                                <Input id="month" name="month" value={newMonthEvent.month} onChange={handleInputChange} placeholder="e.g., January" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="theme">Theme</Label>
                                <Input id="theme" name="theme" value={newMonthEvent.theme} onChange={handleInputChange} placeholder="e.g., Evangelism & Outreach Core" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="purpose">Purpose</Label>
                            <Input id="purpose" name="purpose" value={newMonthEvent.purpose} onChange={handleInputChange} placeholder="e.g., Winning souls, territorial harvest..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="activities">Activities (comma-separated)</Label>
                            <Textarea id="activities" name="activities" value={newMonthEvent.activities} onChange={handleInputChange} placeholder="e.g., Street evangelism, Community crusades..." />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Month
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-accent" />
                        Annual Ministry Calendar
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                    {annualCalendar.map((item) => (
                        <AccordionItem value={item.month} key={item.month}>
                        <AccordionTrigger className="text-lg font-headline hover:no-underline">
                           <span>{item.month}: <span className="ml-2 font-normal text-muted-foreground">{item.theme}</span></span>
                        </AccordionTrigger>
                        <AccordionContent className="p-4 bg-secondary/30 rounded-md space-y-4">
                            {editingMonth === item.month ? (
                                <div className="space-y-4">
                                     <div className="space-y-2">
                                        <Label htmlFor="edit-theme">Theme</Label>
                                        <Input id="edit-theme" name="theme" value={editedData.theme} onChange={handleEditChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-purpose">Purpose</Label>
                                        <Input id="edit-purpose" name="purpose" value={editedData.purpose} onChange={handleEditChange} />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="edit-activities">Activities (comma-separated)</Label>
                                        <Textarea id="edit-activities" name="activities" value={editedData.activities} onChange={handleEditChange} />
                                    </div>
                                    <div className="flex gap-2">
                                        <Button size="sm" onClick={() => handleSaveEdit(item.month)}>
                                            <Save className="h-4 w-4 mr-2" /> Save
                                        </Button>
                                        <Button size="sm" variant="ghost" onClick={handleCancelEdit}>Cancel</Button>
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <p className="font-semibold text-foreground">Purpose: <span className="font-normal text-muted-foreground">{item.purpose}</span></p>
                                    <h4 className="font-semibold text-foreground mt-4 mb-2">Key Activities:</h4>
                                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                                    {item.activities.map(activity => <li key={activity}>{activity}</li>)}
                                    </ul>
                                </div>
                            )}

                             <div className="flex gap-2 border-t pt-4 mt-4">
                                 <Button variant="outline" size="sm" onClick={() => handleStartEdit(item)}>
                                    <Edit className="h-4 w-4 mr-2" />
                                    Edit
                                </Button>
                                 <Button variant="destructive" size="sm" onClick={() => handleDeleteMonth(item.month)}>
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                </Button>
                             </div>
                        </AccordionContent>
                        </AccordionItem>
                    ))}
                    </Accordion>
                </CardContent>
            </Card>

        </div>
    );
}
