
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Globe, PlusCircle, Trash2, Edit, Save, Shield, TowerControl, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';

type Directive = {
    id: number;
    title: string;
    description: string;
    scripture: string;
}

type Tower = {
    id: number;
    region: string;
    focus: string;
    leader: string;
}

export default function AdminGlobalPrayerHubPage() {
    const { toast } = useToast();
    const [directives, setDirectives] = useState<Directive[]>([]);
    const [towers, setTowers] = useState<Tower[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [newDirective, setNewDirective] = useState({ title: '', description: '', scripture: '' });
    const [newTower, setNewTower] = useState({ region: '', focus: '', leader: '' });

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const directivesRes = await supabase.from('global_prayer_directives').select('*');
            const towersRes = await supabase.from('regional_watch_towers').select('*');

            if (directivesRes.error) {
                toast({ variant: 'destructive', title: 'Error fetching directives', description: directivesRes.error.message });
            } else {
                setDirectives(directivesRes.data || []);
            }
            if (towersRes.error) {
                toast({ variant: 'destructive', title: 'Error fetching towers', description: towersRes.error.message });
            } else {
                setTowers(towersRes.data || []);
            }
            setIsLoading(false);
        }
        fetchData();
    }, [toast]);

    const handleDirectiveChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewDirective(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    
    const handleTowerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewTower(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleAddDirective = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newDirective.title) {
            toast({ variant: 'destructive', title: 'Missing Title', description: 'Please provide a title for the directive.' });
            return;
        }
        const { data, error } = await supabase.from('global_prayer_directives').insert([newDirective]).select();
        if (error) {
            toast({ variant: 'destructive', title: 'Error adding directive', description: error.message });
        } else if (data) {
            setDirectives(prev => [data[0], ...prev]);
            setNewDirective({ title: '', description: '', scripture: '' });
            toast({ title: 'Directive Added', description: `"${newDirective.title}" has been posted.` });
        }
    };
    
    const handleAddTower = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newTower.region || !newTower.focus || !newTower.leader) {
            toast({ variant: 'destructive', title: 'Missing Fields', description: 'Please fill out all fields for the tower.' });
            return;
        }
        const { data, error } = await supabase.from('regional_watch_towers').insert([newTower]).select();
        if (error) {
            toast({ variant: 'destructive', title: 'Error adding tower', description: error.message });
        } else if (data) {
            setTowers(prev => [data[0], ...prev]);
            setNewTower({ region: '', focus: '', leader: '' });
            toast({ title: 'Tower Added', description: `The watch tower for ${newTower.region} has been established.` });
        }
    };

    const handleDeleteDirective = async (id: number) => {
        const { error } = await supabase.from('global_prayer_directives').delete().match({ id });
        if(error) {
            toast({ variant: 'destructive', title: 'Error deleting directive', description: error.message });
        } else {
            setDirectives(prev => prev.filter(d => d.id !== id));
            toast({ title: 'Directive Deleted', description: `The directive has been removed.` });
        }
    };
    
    const handleDeleteTower = async (id: number) => {
        const { error } = await supabase.from('regional_watch_towers').delete().match({ id });
        if (error) {
            toast({ variant: 'destructive', title: 'Error deleting tower', description: error.message });
        } else {
            setTowers(prev => prev.filter(t => t.id !== id));
            toast({ title: 'Tower Removed', description: `The watch tower has been removed.` });
        }
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
                     {isLoading ? (
                        <div className="flex justify-center items-center p-4"><Loader2 className="animate-spin h-6 w-6"/></div>
                    ) : directives.map(d => (
                        <div key={d.id} className="flex justify-between items-start rounded-lg border p-4">
                            <div>
                                <h3 className="font-bold text-lg">{d.title}</h3>
                                <p className="text-sm text-muted-foreground mt-1">{d.description}</p>
                                <p className="text-xs font-mono text-accent mt-2">{d.scripture}</p>
                            </div>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteDirective(d.id)}><Trash2 className="h-4 w-4" /></Button>
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
                     {isLoading ? (
                        <div className="flex justify-center items-center p-4"><Loader2 className="animate-spin h-6 w-6"/></div>
                    ) : towers.map(t => (
                        <div key={t.id} className="flex justify-between items-start rounded-lg border p-4">
                            <div>
                                <h3 className="font-bold text-lg">{t.region}</h3>
                                <p className="text-sm text-muted-foreground mt-1">Focus: {t.focus}</p>
                                <p className="text-sm text-muted-foreground mt-1">Leader: {t.leader}</p>
                            </div>
                            <Button variant="destructive" size="sm" onClick={() => handleDeleteTower(t.id)}><Trash2 className="h-4 w-4" /></Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
