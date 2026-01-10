
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { globalDirectives as initialGlobalDirectives, regionalTowers as initialRegionalTowers } from '@/lib/data';
import { Globe, PlusCircle, Trash2, Edit, Save, Shield, TowerControl } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminGlobalPrayerHubPage() {
    const { toast } = useToast();
    const [directives, setDirectives] = useState(initialGlobalDirectives);
    const [towers, setTowers] = useState(initialRegionalTowers);

    const [newDirective, setNewDirective] = useState({ title: '', description: '', scripture: '' });
    const [newTower, setNewTower] = useState({ region: '', focus: '', leader: '' });

    const handleDirectiveChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewDirective(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handleTowerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewTower(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleAddDirective = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newDirective.title) {
            toast({ variant: 'destructive', title: 'Missing Title', description: 'Please provide a title for the directive.' });
            return;
        }
        setDirectives(prev => [newDirective, ...prev]);
        setNewDirective({ title: '', description: '', scripture: '' });
        toast({ title: 'Directive Added', description: `"${newDirective.title}" has been posted.` });
    };
    
    const handleAddTower = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTower.region || !newTower.focus || !newTower.leader) {
            toast({ variant: 'destructive', title: 'Missing Fields', description: 'Please fill out all fields for the tower.' });
            return;
        }
        setTowers(prev => [...prev, newTower]);
        setNewTower({ region: '', focus: '', leader: '' });
        toast({ title: 'Tower Added', description: `The watch tower for ${newTower.region} has been established.` });
    };

    const handleDeleteDirective = (title: string) => {
        setDirectives(prev => prev.filter(d => d.title !== title));
        toast({ title: 'Directive Deleted', description: `"${title}" has been removed.` });
    };
    
    const handleDeleteTower = (region: string) => {
        setTowers(prev => prev.filter(t => t.region !== region));
        toast({ title: 'Tower Removed', description: `The watch tower for ${region} has been removed.` });
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold text-foreground">Manage Global Prayer Hub</h1>
                <p className="text-muted-foreground">
                    Create prayer directives, manage regional towers, and post prayer assignments.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><PlusCircle className="h-5 w-5 text-accent" />Add New Prayer Directive</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddDirective} className="grid gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="d_title">Title</Label>
                            <Input id="d_title" name="title" value={newDirective.title} onChange={handleDirectiveChange} placeholder="e.g., Economic Stability" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="d_description">Description</Label>
                            <Textarea id="d_description" name="description" value={newDirective.description} onChange={handleDirectiveChange} placeholder="Description of the prayer focus..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="d_scripture">Foundation Scripture</Label>
                            <Input id="d_scripture" name="scripture" value={newDirective.scripture} onChange={handleDirectiveChange} placeholder="e.g., Deuteronomy 8:18" />
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit"><PlusCircle className="mr-2 h-4 w-4" /> Add Directive</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

             <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5 text-accent" />Existing Directives</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                    {directives.map(d => (
                        <div key={d.title} className="flex justify-between items-start rounded-lg border p-4">
                            <div>
                                <h3 className="font-bold text-lg">{d.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{d.description}</p>
                                <p className="text-xs font-mono text-accent mt-2">{d.scripture}</p>
                            </div>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteDirective(d.title)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                    ))}
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><PlusCircle className="h-5 w-5 text-accent" />Add New Watch Tower</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddTower} className="grid md:grid-cols-3 gap-6 items-end">
                        <div className="space-y-2">
                            <Label htmlFor="t_region">Region</Label>
                            <Input id="t_region" name="region" value={newTower.region} onChange={handleTowerChange} placeholder="e.g., North America" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="t_focus">Focus</Label>
                            <Input id="t_focus" name="focus" value={newTower.focus} onChange={handleTowerChange} placeholder="Current prayer focus..." />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="t_leader">Leader</Label>
                            <Input id="t_leader" name="leader" value={newTower.leader} onChange={handleTowerChange} placeholder="e.g., Watchman John" />
                        </div>
                         <div className="col-span-3 flex justify-end">
                            <Button type="submit"><PlusCircle className="mr-2 h-4 w-4" /> Add Tower</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="flex items-center gap-2"><TowerControl className="h-5 w-5 text-accent" />Existing Watch Towers</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                     {towers.map(t => (
                        <div key={t.region} className="flex justify-between items-start rounded-lg border p-4">
                            <div>
                                <h3 className="font-bold text-lg">{t.region}</h3>
                                <p className="text-sm text-muted-foreground mt-1">Focus: {t.focus}</p>
                                <p className="text-sm text-muted-foreground mt-1">Leader: {t.leader}</p>
                            </div>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteTower(t.region)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
