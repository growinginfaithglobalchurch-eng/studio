
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tv, Video, Mic, Power, Image as ImageIcon, PlusCircle, Trash2, Edit, Volume2, VolumeX, Radio } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


type Scene = {
    id: string;
    name: string;
    type: 'image' | 'video';
    sourceUrl: string;
    dataAiHint?: string;
}

type AudioSource = {
    id: string;
    name: string;
    volume: number;
    isMuted: boolean;
}

const initialScenes: Scene[] = [
    { id: 'cam1', name: 'Main Camera', type: 'video', sourceUrl: 'https://picsum.photos/seed/cam1/1280/720', dataAiHint: 'video camera feed' },
    { id: 'cam2', name: 'Wide Angle', type: 'video', sourceUrl: 'https://picsum.photos/seed/cam2/1280/720', dataAiHint: 'wide angle stage' },
    { id: 'intro', name: 'Intro Video', type: 'video', sourceUrl: 'https://picsum.photos/seed/intro/1280/720', dataAiHint: 'countdown intro' },
    { id: 'logo', name: 'Logo Screen', type: 'image', sourceUrl: PlaceHolderImages.find(p => p.id === 'ministry-logo-1')?.imageUrl || '', dataAiHint: 'ministry logo' },
];

const initialAudioSources: AudioSource[] = [
    { id: 'host-mic', name: 'Host Mic', volume: 75, isMuted: false },
    { id: 'guest-mic', name: 'Guest Mic', volume: 75, isMuted: true },
    { id: 'background-music', name: 'Background Music', volume: 20, isMuted: true },
];

export default function TvStudioPage() {
    const { toast } = useToast();
    const [isLive, setIsLive] = useState(false);
    const [scenes, setScenes] = useState(initialScenes);
    const [audioSources, setAudioSources] = useState(initialAudioSources);
    const [activeScene, setActiveScene] = useState<Scene>(scenes[0]);
    const [newScene, setNewScene] = useState({ name: '', type: 'image', sourceUrl: '' });
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const handleGoLive = () => {
        setIsLive(!isLive);
        toast({
            title: isLive ? "Stream Ended" : "You are LIVE!",
            description: isLive ? "The broadcast has been stopped." : "Your stream has started successfully.",
            variant: isLive ? 'destructive' : 'default'
        });
    };

    const handleSceneSelect = (scene: Scene) => {
        setActiveScene(scene);
        toast({ title: "Scene Changed", description: `Switched to "${scene.name}".` });
    };

    const handleVolumeChange = (id: string, value: number[]) => {
        setAudioSources(prev => prev.map(s => s.id === id ? { ...s, volume: value[0] } : s));
    };

    const handleMuteToggle = (id: string) => {
        setAudioSources(prev => prev.map(s => s.id === id ? { ...s, isMuted: !s.isMuted } : s));
    };

    const handleAddScene = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newScene.name || !newScene.sourceUrl) {
            toast({ variant: 'destructive', title: 'Missing fields' });
            return;
        }
        const sceneToAdd: Scene = { id: `scene-${Date.now()}`, ...newScene };
        setScenes(prev => [...prev, sceneToAdd]);
        setNewScene({ name: '', type: 'image', sourceUrl: '' });
        setIsDialogOpen(false);
        toast({ title: 'Scene Added', description: `"${sceneToAdd.name}" is now available.` });
    };

    const handleDeleteScene = (id: string) => {
        if (activeScene.id === id) {
            toast({ variant: 'destructive', title: 'Cannot delete active scene.' });
            return;
        }
        setScenes(prev => prev.filter(s => s.id !== id));
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-headline font-bold text-foreground flex items-center gap-2">
                        <Tv className="h-8 w-8 text-accent" />
                        Royal Life TV Studio
                    </h1>
                    <p className="text-muted-foreground">Your live stream production control room.</p>
                </div>
                <div className="flex items-center gap-4">
                     <div className={`flex items-center gap-2 font-semibold ${isLive ? 'text-destructive' : 'text-muted-foreground'}`}>
                        {isLive && <Radio className="h-5 w-5 animate-pulse" />}
                        <span>{isLive ? 'LIVE' : 'OFFLINE'}</span>
                    </div>
                    <Button size="lg" onClick={handleGoLive} variant={isLive ? 'destructive' : 'default'}>
                        <Power className="mr-2 h-5 w-5" />
                        {isLive ? 'End Stream' : 'Go Live'}
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Live Preview</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <AspectRatio ratio={16 / 9} className="bg-black rounded-md overflow-hidden">
                                {activeScene.type === 'image' ? (
                                    <Image src={activeScene.sourceUrl} alt={activeScene.name} fill className="object-contain" data-ai-hint={activeScene.dataAiHint} />
                                ) : (
                                     <Image src={activeScene.sourceUrl} alt={activeScene.name} fill className="object-cover" data-ai-hint={activeScene.dataAiHint} />
                                )}
                                <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-xs">
                                    ON AIR: {activeScene.name}
                                </div>
                             </AspectRatio>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader>
                            <CardTitle>Audio Mixer</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {audioSources.map(source => (
                                <div key={source.id} className="flex items-center gap-4">
                                    <Button variant="outline" size="icon" onClick={() => handleMuteToggle(source.id)}>
                                        {source.isMuted ? <VolumeX className="h-5 w-5 text-destructive" /> : <Volume2 className="h-5 w-5 text-foreground" />}
                                    </Button>
                                    <div className="flex-grow">
                                        <Label className="text-sm text-muted-foreground">{source.name}</Label>
                                        <div className="flex items-center gap-2">
                                            <Slider value={[source.volume]} max={100} step={1} onValueChange={(val) => handleVolumeChange(source.id, val)} disabled={source.isMuted}/>
                                            <span className="text-xs font-mono w-8">{source.isMuted ? 'MUTED' : `${source.volume}%`}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </div>
                <div>
                     <Card>
                        <CardHeader>
                            <CardTitle>Scenes</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            {scenes.map(scene => (
                                <div key={scene.id} className="flex items-center gap-2 p-2 rounded-md hover:bg-secondary">
                                    {scene.type === 'image' ? <ImageIcon className="h-5 w-5 text-muted-foreground" /> : <Video className="h-5 w-5 text-muted-foreground" />}
                                    <span className="flex-grow text-sm font-medium">{scene.name}</span>
                                    <Button size="sm" variant={activeScene.id === scene.id ? "default" : "outline"} onClick={() => handleSceneSelect(scene)} disabled={activeScene.id === scene.id}>
                                       {activeScene.id === scene.id ? 'Live' : 'Activate'}
                                    </Button>
                                    <Button size="sm" variant="ghost" onClick={() => handleDeleteScene(scene.id)}><Trash2 className="h-4 w-4"/></Button>
                                </div>
                            ))}
                            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                <DialogTrigger asChild>
                                    <Button className="w-full mt-4">
                                        <PlusCircle className="mr-2 h-4 w-4" /> Add Scene
                                    </Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Scene</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handleAddScene} className="space-y-4">
                                        <div className="space-y-2">
                                            <Label>Scene Name</Label>
                                            <Input value={newScene.name} onChange={(e) => setNewScene({...newScene, name: e.target.value})} placeholder="e.g., Guest Camera" />
                                        </div>
                                         <div className="space-y-2">
                                            <Label>Source URL</Label>
                                            <Input value={newScene.sourceUrl} onChange={(e) => setNewScene({...newScene, sourceUrl: e.target.value})} placeholder="https://..." />
                                        </div>
                                        <Button type="submit" className="w-full">Add Scene</Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
