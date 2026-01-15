
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
        <div className="flex flex-col h-full bg-black border border-border/50 rounded-lg">
             <div className={cn(
                "p-2 text-center font-bold text-lg",
                isLive ? "bg-red-600 text-white" : "bg-green-600 text-white"
             )}>
                <CardTitle className="text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                    {isLive && <Radio className="h-4 w-4 animate-pulse" />}
                    {title}
                </CardTitle>
             </div>
             <div className="flex-grow p-1">
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
            </div>
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

            <div className="grid grid-cols-12 gap-4">
                <div className="col-span-5">
                    <SceneMonitor scene={previewScene} title="Preview" />
                </div>
                <div className="col-span-2">
                    <Card className="h-full">
                        <CardHeader className="p-2 text-center">
                            <CardTitle className="text-sm">Transitions</CardTitle>
                        </CardHeader>
                        <CardContent className="p-2 flex flex-col gap-2">
                            <Button variant="outline" className="w-full" onClick={() => handleTransition('cut')}>
                                <MoveRight className="mr-2 h-4 w-4"/> Cut
                            </Button>
                            <Button variant="outline" className="w-full" onClick={() => handleTransition('fade')}>
                                <GitMerge className="mr-2 h-4 w-4"/> Fade
                            </Button>
                        </CardContent>
                    </Card>
                </div>
                <div className="col-span-5">
                    <SceneMonitor scene={programScene} title="Program" isLive={isLive} />
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
                <Card className="lg:col-span-8">
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
                    <CardContent className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
                 <Card className="lg:col-span-4">
                    <CardHeader><CardTitle>Audio Mixer</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
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
                   </CardContent>
                </Card>
            </div>

        </div>
    );
}
