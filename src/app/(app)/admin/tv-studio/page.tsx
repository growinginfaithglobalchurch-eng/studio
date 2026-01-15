
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tv, Video, Power, Image as ImageIcon, PlusCircle, Trash2, GitMerge, MoveRight, Radio, Camera, Film, Upload, SlidersHorizontal, Music, Clapperboard, Newspaper, Database, Rss, Play, Circle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { cn } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Slider } from '@/components/ui/slider';

type Scene = {
    id: string;
    name: string;
    type: 'image' | 'video' | 'live';
    sourceUrl: string;
    dataAiHint?: string;
}

const initialScenes: Scene[] = [
    { id: 'cam1', name: 'Main Camera', type: 'video', sourceUrl: 'https://picsum.photos/seed/cam1/1280/720', dataAiHint: 'video camera feed' },
    { id: 'intro', name: 'Intro Video', type: 'video', sourceUrl: 'https://picsum.photos/seed/intro/1280/720', dataAiHint: 'countdown intro' },
    { id: 'logo', name: 'Logo Screen', type: 'image', sourceUrl: PlaceHolderImages.find(p => p.id === 'ministry-logo-1')?.imageUrl || '', dataAiHint: 'ministry logo' },
    { id: 'scripture', name: 'Scripture Graphic', type: 'image', sourceUrl: 'https://picsum.photos/seed/scripture/1280/720', dataAiHint: 'bible scripture' },
    { id: 'game', name: 'Game Feed', type: 'video', sourceUrl: 'https://picsum.photos/seed/game/1280/720', dataAiHint: 'space shooter game' },
];

export default function TvStudioPage() {
    const { toast } = useToast();
    const [isLive, setIsLive] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [scenes, setScenes] = useState(initialScenes);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newScene, setNewScene] = useState({ name: '', type: 'image' as 'image' | 'video', sourceUrl: '' });

    const [previewScene, setPreviewScene] = useState<Scene | null>(scenes[0] || null);
    const [programScene, setProgramScene] = useState<Scene | null>(scenes[4] || null);
    
    const [useLiveCameras, setUseLiveCameras] = useState(false);

    const handleTransition = (type: 'cut' | 'fade') => {
        if (previewScene) {
            setProgramScene(previewScene);
            toast({
                title: type === 'cut' ? 'Cut!' : 'Fade Transition Complete',
                description: `"${previewScene.name}" is now live.`
            });
        }
    };
    
    const handleAddScene = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newScene.name || !newScene.sourceUrl) {
            toast({ variant: 'destructive', title: 'Missing fields' });
            return;
        }
        const sceneToAdd: Scene = { id: `scene-${Date.now()}`, ...newScene, type: newScene.type };
        setScenes(prev => [...prev, sceneToAdd]);
        setNewScene({ name: '', type: 'image', sourceUrl: '' });
        setIsDialogOpen(false);
        toast({ title: 'Scene Added', description: `"${sceneToAdd.name}" is now available.` });
    };

    return (
        <div className="space-y-4">
             <h1 className="text-2xl font-headline font-bold text-foreground flex items-center gap-2">
                <Tv className="h-6 w-6 text-accent" />
                Royal Life TV Studio
            </h1>

            {/* Monitors Section */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-4 items-center">
                {/* Preview Monitor */}
                <Card className="flex flex-col">
                    <CardHeader className="p-2 bg-secondary rounded-t-lg">
                        <CardTitle className="text-sm font-bold text-center">PREVIEW: {previewScene?.name}</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0 flex-grow relative">
                         <AspectRatio ratio={16/9} className="bg-black">
                            {previewScene && <Image src={previewScene.sourceUrl} alt={previewScene.name} fill className="object-cover" data-ai-hint={previewScene.dataAiHint} />}
                        </AspectRatio>
                    </CardContent>
                </Card>

                {/* Transition Controls */}
                <div className="flex flex-col gap-2 justify-center">
                     <Button variant="outline" onClick={() => handleTransition('cut')}>Cut</Button>
                     <Button variant="outline" onClick={() => handleTransition('fade')}>Fade</Button>
                </div>

                {/* Program Monitor */}
                <Card className="flex flex-col">
                    <CardHeader className={cn("p-2 rounded-t-lg", isLive ? "bg-red-600" : "bg-green-600")}>
                        <CardTitle className="text-sm font-bold text-white text-center">
                            PROGRAM: {programScene?.name} {isLive && '(LIVE)'}
                        </CardTitle>
                    </CardHeader>
                     <CardContent className="p-0 flex-grow relative">
                         <AspectRatio ratio={16/9} className="bg-black">
                            {programScene && <Image src={programScene.sourceUrl} alt={programScene.name} fill className="object-cover" data-ai-hint={programScene.dataAiHint} />}
                            {programScene?.id === 'game' && previewScene?.id === 'cam1' && (
                               <div className="absolute bottom-4 right-4 w-1/4 aspect-video rounded-md overflow-hidden border-2 border-accent">
                                    <Image src={previewScene.sourceUrl} alt={previewScene.name} fill className="object-cover"/>
                               </div>
                            )}
                        </AspectRatio>
                    </CardContent>
                </Card>
            </div>

            {/* Controls Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Media Manager */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Media Manager</CardTitle>
                        <div className="flex items-center gap-2">
                            <Dialog>
                                <DialogTrigger asChild><Button variant="outline" size="sm"><Upload className="mr-2 h-4 w-4" /> Upload</Button></DialogTrigger>
                                <DialogContent><DialogHeader><DialogTitle>Upload Media</DialogTitle></DialogHeader></DialogContent>
                            </Dialog>
                            <div className="flex items-center space-x-2">
                                <Switch id="live-cameras" checked={useLiveCameras} onCheckedChange={setUseLiveCameras} />
                                <Label htmlFor="live-cameras">Use Live Cameras</Label>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="scenes">
                            <TabsList className="w-full">
                                <TabsTrigger value="scenes" className="flex-1"><Clapperboard className="mr-2 h-4 w-4"/> Scenes</TabsTrigger>
                                <TabsTrigger value="cameras" className="flex-1"><Camera className="mr-2 h-4 w-4"/> Cameras</TabsTrigger>
                                <TabsTrigger value="banners" className="flex-1"><Newspaper className="mr-2 h-4 w-4"/> Banners</TabsTrigger>
                                <TabsTrigger value="music" className="flex-1"><Music className="mr-2 h-4 w-4"/> Music</TabsTrigger>
                            </TabsList>
                            <TabsContent value="scenes" className="mt-4 h-64 overflow-y-auto">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                     {scenes.map(scene => (
                                        <button key={scene.id} onClick={() => setPreviewScene(scene)} className={cn("border-2 rounded-md overflow-hidden focus:outline-none focus:ring-2 focus:ring-primary", previewScene?.id === scene.id ? 'border-primary' : 'border-transparent')}>
                                            <AspectRatio ratio={16/9} className="bg-black">
                                                <Image src={scene.sourceUrl} alt={scene.name} fill className="object-cover" />
                                            </AspectRatio>
                                            <p className="text-xs p-1 bg-black/50 text-white truncate">{scene.name}</p>
                                        </button>
                                     ))}
                                </div>
                            </TabsContent>
                            <TabsContent value="cameras" className="mt-4"><p className="text-center text-muted-foreground p-8">Camera controls coming soon.</p></TabsContent>
                            <TabsContent value="banners" className="mt-4"><p className="text-center text-muted-foreground p-8">Banner controls coming soon.</p></TabsContent>
                            <TabsContent value="music" className="mt-4"><p className="text-center text-muted-foreground p-8">Music controls coming soon.</p></TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                {/* Broadcast Controls */}
                <div>
                     <Tabs defaultValue="broadcast" className="w-full">
                        <TabsList>
                            <TabsTrigger value="broadcast">Broadcast</TabsTrigger>
                            <TabsTrigger value="automation">Automation</TabsTrigger>
                            <TabsTrigger value="audio">Audio</TabsTrigger>
                            <TabsTrigger value="graphics">Graphics</TabsTrigger>
                            <TabsTrigger value="newsroom">Newsroom</TabsTrigger>
                            <TabsTrigger value="database">Database</TabsTrigger>
                        </TabsList>
                        <TabsContent value="broadcast" className="mt-2 space-y-4">
                            <Card>
                                <CardHeader><CardTitle className="flex items-center gap-2"><Radio className="h-5 w-5"/> Broadcast Controls</CardTitle></CardHeader>
                                <CardContent className="space-y-4">
                                     <div className="flex justify-between items-center bg-secondary p-2 rounded-md">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("h-3 w-3 rounded-full", isLive ? 'bg-red-500 animate-pulse' : 'bg-gray-500')}></div>
                                            <span className="font-semibold text-sm">STREAMING</span>
                                        </div>
                                        <span className="font-mono text-sm">00:00:00</span>
                                    </div>
                                     <div className="flex justify-between items-center bg-secondary p-2 rounded-md">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("h-3 w-3 rounded-full", isRecording ? 'bg-red-500 animate-pulse' : 'bg-gray-500')}></div>
                                            <span className="font-semibold text-sm">RECORDING</span>
                                        </div>
                                        <span className="font-mono text-sm">00:00:00</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <Button variant={isLive ? "destructive" : "default"} onClick={() => setIsLive(!isLive)}>
                                            <Play className="mr-2 h-4 w-4"/> {isLive ? 'Stop Stream' : 'Start Stream'}
                                        </Button>
                                         <Button variant={isRecording ? "destructive" : "default"} onClick={() => setIsRecording(!isRecording)}>
                                            <Circle className="mr-2 h-4 w-4"/> {isRecording ? 'Stop Record' : 'Start Record'}
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader><CardTitle className="flex items-center gap-2"><Rss className="h-5 w-5"/> Multistream</CardTitle><CardDescription>Stream to multiple platforms at once.</CardDescription></CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex justify-between items-center"><div className="flex items-center gap-2"><span className="text-red-500">■</span> YouTube</div><div className="flex items-center gap-2"><span className="text-xs text-muted-foreground">Offline</span><Switch/></div></div>
                                    <div className="flex justify-between items-center"><div className="flex items-center gap-2"><span className="text-blue-500">■</span> Facebook</div><div className="flex items-center gap-2"><span className="text-xs text-muted-foreground">Offline</span><Switch/></div></div>
                                    <div className="flex justify-between items-center"><div className="flex items-center gap-2"><span className="text-purple-500">■</span> Twitch</div><div className="flex items-center gap-2"><span className="text-xs text-muted-foreground">Offline</span><Switch/></div></div>
                                     <Button variant="outline" className="w-full"><PlusCircle className="mr-2 h-4 w-4"/> Add Custom RTMP</Button>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
