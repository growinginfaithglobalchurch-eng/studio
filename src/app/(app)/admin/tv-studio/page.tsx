
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tv, Video, Mic, Power, Image as ImageIcon, PlusCircle, Trash2, Edit, Volume2, VolumeX, Radio, GitMerge, MoveRight } from 'lucide-react';
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
import { cn } from '@/lib/utils';


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
    { id: 'scripture', name: 'Scripture Graphic', type: 'image', sourceUrl: 'https://picsum.photos/seed/scripture/1280/720', dataAiHint: 'bible scripture' },
    { id: 'lower-third', name: 'Lower Third', type: 'image', sourceUrl: 'https://picsum.photos/seed/lowerthird/1280/720', dataAiHint: 'lower third graphic' },
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
    
    const [previewScene, setPreviewScene] = useState<Scene>(scenes[1]);
    const [programScene, setProgramScene] = useState<Scene>(scenes[0]);

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

    const handleSceneToPreview = (scene: Scene) => {
        setPreviewScene(scene);
        toast({ title: "Preview Updated", description: `"${scene.name}" is now in preview.` });
    };
    
    const handleTransition = (type: 'cut' | 'fade') => {
        if (!previewScene) {
            toast({ variant: 'destructive', title: 'No Preview Scene', description: 'Select a scene for preview first.' });
            return;
        }
        setProgramScene(previewScene);
        toast({ title: `Transition: ${type.toUpperCase()}`, description: `"${previewScene.name}" is now live.`});
    }

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
        if (programScene.id === id || previewScene.id === id) {
            toast({ variant: 'destructive', title: 'Cannot delete active scene.' });
            return;
        }
        setScenes(prev => prev.filter(s => s.id !== id));
    };

    const SceneMonitor = ({ scene, title, isLive }: { scene: Scene, title: string, isLive?: boolean }) => (
        <div className="flex flex-col h-full">
            <CardHeader className="p-2">
                 <CardTitle className={cn("text-lg flex items-center gap-2", isLive ? "text-destructive" : "text-foreground")}>
                    {isLive && <Radio className="h-5 w-5 animate-pulse" />}
                    {title}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow p-2">
                 <AspectRatio ratio={16 / 9} className="bg-black rounded-md overflow-hidden h-full">
                    {scene.type === 'image' ? (
                        <Image src={scene.sourceUrl} alt={scene.name} fill className="object-contain" data-ai-hint={scene.dataAiHint} />
                    ) : (
                         <Image src={scene.sourceUrl} alt={scene.name} fill className="object-cover" data-ai-hint={scene.dataAiHint} />
                    )}
                    <div className="absolute bottom-1 left-2 bg-black/50 text-white px-2 py-1 rounded-md text-sm font-semibold">
                        {scene.name}
                    </div>
                 </AspectRatio>
            </CardContent>
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-3xl font-headline font-bold text-foreground flex items-center gap-2">
                        <Tv className="h-8 w-8 text-accent" />
                        Royal Life TV Studio
                    </h1>
                    <p className="text-muted-foreground">Live Stream Production Control Room</p>
                </div>
                 <Button size="lg" onClick={handleGoLive} variant={isLive ? 'destructive' : 'default'} className="flex items-center gap-2">
                    <Power className="h-5 w-5" />
                    <span>{isLive ? 'End Stream' : 'Go Live'}</span>
                    <div className={cn("h-3 w-3 rounded-full transition-colors", isLive ? "bg-white animate-pulse" : "bg-green-800")}></div>
                </Button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 h-[65vh]">
                {/* Program & Preview Monitors */}
                <div className="xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card><SceneMonitor scene={previewScene} title="Preview" /></Card>
                    <Card><SceneMonitor scene={programScene} title="Program" isLive={isLive} /></Card>
                </div>

                {/* Controls */}
                <Card className="flex flex-col">
                     <CardHeader><CardTitle>Controls</CardTitle></CardHeader>
                     <CardContent className="flex-grow flex flex-col justify-between">
                         <div>
                            <Label className="text-xs font-semibold text-muted-foreground">Transitions</Label>
                            <div className="flex gap-2 mt-1">
                                <Button variant="outline" className="flex-1" onClick={() => handleTransition('cut')}>
                                    <MoveRight className="mr-2 h-4 w-4"/> Cut
                                </Button>
                                <Button variant="outline" className="flex-1" onClick={() => handleTransition('fade')}>
                                    <GitMerge className="mr-2 h-4 w-4"/> Fade
                                </Button>
                            </div>
                         </div>
                         <div className="mt-4">
                             <Label className="text-xs font-semibold text-muted-foreground">Audio Mixer</Label>
                             <div className="space-y-3 mt-1">
                                {audioSources.map(source => (
                                    <div key={source.id} className="flex items-center gap-3">
                                        <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => handleMuteToggle(source.id)}>
                                            {source.isMuted ? <VolumeX className="h-4 w-4 text-destructive" /> : <Volume2 className="h-4 w-4" />}
                                        </Button>
                                        <div className="flex-grow">
                                            <Label className="text-xs text-muted-foreground">{source.name}</Label>
                                            <Slider value={[source.volume]} max={100} step={1} onValueChange={(val) => handleVolumeChange(source.id, val)} disabled={source.isMuted}/>
                                        </div>
                                        <span className="text-xs font-mono w-8">{source.isMuted ? 'MUTED' : `${source.volume}%`}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                     </CardContent>
                </Card>
            </div>

            {/* Input Grid */}
            <Card>
                <CardHeader>
                     <div className="flex justify-between items-center">
                        <CardTitle>Inputs</CardTitle>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add Input
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader><DialogTitle>Add New Input Source</DialogTitle></DialogHeader>
                                <form onSubmit={handleAddScene} className="space-y-4">
                                    <div className="space-y-2"><Label>Input Name</Label><Input value={newScene.name} onChange={(e) => setNewScene({...newScene, name: e.target.value})} placeholder="e.g., Guest Camera" /></div>
                                    <div className="space-y-2"><Label>Source URL</Label><Input value={newScene.sourceUrl} onChange={(e) => setNewScene({...newScene, sourceUrl: e.target.value})} placeholder="https://..." /></div>
                                    <Button type="submit" className="w-full">Add Input</Button>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </CardHeader>
                <CardContent className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    {scenes.map(scene => (
                        <div key={scene.id} className="relative group">
                            <AspectRatio ratio={16/9} className={cn("bg-black rounded-md overflow-hidden border-2 cursor-pointer", 
                                previewScene.id === scene.id && "border-green-500",
                                programScene.id === scene.id && "border-destructive"
                                )} onClick={() => handleSceneToPreview(scene)}>
                                {scene.type === 'image' ? <Image src={scene.sourceUrl} alt={scene.name} fill className="object-contain" /> : <Image src={scene.sourceUrl} alt={scene.name} fill className="object-cover" />}
                                <div className="absolute bottom-0 left-0 right-0 p-1 bg-black/50 text-white text-xs text-center truncate">{scene.name}</div>
                            </AspectRatio>
                            <Button size="icon" variant="destructive" className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => { e.stopPropagation(); handleDeleteScene(scene.id); }}>
                                <Trash2 className="h-3 w-3"/>
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
