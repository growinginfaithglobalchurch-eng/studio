
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tv, Video, Power, Image as ImageIcon, PlusCircle, Trash2, GitMerge, MoveRight, Radio, Camera, Film, Upload, SlidersHorizontal, Music, Clapperboard, Newspaper, Database, Rss, Play, Circle, Twitch } from 'lucide-react';
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
];

export default function TvStudioPage() {
    const { toast } = useToast();
    const [isLive, setIsLive] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [scenes, setScenes] = useState(initialScenes);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [newScene, setNewScene] = useState({ name: '', type: 'image' as 'image' | 'video', sourceUrl: '' });
    const [useLiveCameras, setUseLiveCameras] = useState(false);

    const handleGoLive = () => {
        setIsLive(!isLive);
        toast({
            title: isLive ? "Stream Ended" : "You are LIVE!",
            description: isLive ? "The broadcast has been stopped." : "Your stream has started successfully.",
            variant: isLive ? 'destructive' : 'default'
        });
    };
    
    const handleRecord = () => {
        setIsRecording(!isRecording);
        toast({
            title: isRecording ? "Recording Stopped" : "Recording Started",
            description: isRecording ? "Your recording has been saved." : "The session is now being recorded.",
        });
    }
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            const type = file.type.startsWith('video') ? 'video' : 'image';
            setNewScene({ name: file.name, type, sourceUrl: url });
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

    const YoutubeIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-red-600">
        <path d="M12.04,18.3c-5.1,0-9.2-1.4-9.2-3.2s4.1-3.2,9.2-3.2s9.2,1.4,9.2,3.2S17.14,18.3,12.04,18.3z M12.04,5.7 c-5.1,0-9.2,1.4-9.2,3.2s4.1,3.2,9.2,3.2s9.2,1.4,9.2,3.2S17.14,5.7,12.04,5.7z M12.04,12.5c-2.3,0-4.2-0.5-4.2-1.1s1.9-1.1,4.2-1.1 s4.2,0.5,4.2,1.1S14.34,12.5,12.04,12.5z" />
        <path d="M21.5,8.8v6.4c0,1.3-1.9,2.4-4.2,2.4s-4.2-1.1-4.2-2.4V8.8h-2.1v6.4c0,2.1,3.1,3.8,7.3,3.8s7.3-1.7,7.3-3.8V8.8H21.5z" />
        <path d="M12.04,4.2C6.94,4.2,2.84,5.6,2.84,7.4s4.1,3.2,9.2,3.2s9.2-1.4,9.2-3.2S17.14,4.2,12.04,4.2z M12.04,9.5 c-2.3,0-4.2-0.5-4.2-1.1s1.9-1.1,4.2-1.1s4.2,0.5,4.2,1.1S14.34,9.5,12.04,9.5z" />
        <path d="M9.84,8.8v6.4c0,1.3,1.9,2.4,4.2,2.4s4.2-1.1,4.2-2.4V8.8H16.1v6.4c0,0.8-1.5,1.4-3.2,1.4s-3.2-0.6-3.2-1.4V8.8H9.84z" />
      </svg>
    );

    const FacebookIcon = () => (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5 text-blue-600">
        <path d="M22,12c0-5.5-4.5-10-10-10S2,6.5,2,12c0,5,3.7,9.1,8.4,9.9v-7H7.9V12h2.5V9.8c0-2.5,1.5-3.9,3.8-3.9 c1.1,0,2,0.1,2.3,0.1v2.1h-1.3c-1.2,0-1.4,0.6-1.4,1.4V12h2.8l-0.4,2.9h-2.4V21.9C18.3,21.1,22,17,22,12z" />
      </svg>
    )


    return (
        <div className="flex flex-col h-full bg-background">
            <header className="p-4 border-b">
                 <h1 className="text-xl font-headline font-bold text-foreground flex items-center gap-2">
                    <Tv className="h-6 w-6 text-accent" />
                    Royal Life TV Studio
                </h1>
            </header>

            <div className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-4 p-4">
                {/* Left Column: Media Manager */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                    <Card className="flex-grow flex flex-col">
                        <CardHeader className="flex flex-row items-center justify-between">
                            <CardTitle className="flex items-center gap-2"><Clapperboard className="h-5 w-5 text-accent"/>Media Manager</CardTitle>
                            <div className="flex items-center gap-4">
                               <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                                    <DialogTrigger asChild>
                                        <Button variant="outline"><Upload className="mr-2 h-4 w-4" /> Upload</Button>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader><DialogTitle>Add New Media Input</DialogTitle></DialogHeader>
                                        <form onSubmit={handleAddScene} className="space-y-4">
                                            <div className="space-y-2"><Label>Input Name</Label><Input value={newScene.name} onChange={(e) => setNewScene({...newScene, name: e.target.value})} placeholder="e.g., Guest Camera" /></div>
                                            <div className="space-y-2"><Label>Source URL (or upload)</Label><Input value={newScene.sourceUrl} onChange={(e) => setNewScene({...newScene, sourceUrl: e.target.value})} placeholder="https://... or upload a file" /></div>
                                            <div className="space-y-2"><Label>Upload File</Label><Input type="file" onChange={handleFileChange} accept="image/*,video/*" /></div>
                                            <Button type="submit" className="w-full">Add Input</Button>
                                        </form>
                                    </DialogContent>
                                </Dialog>
                                <div className="flex items-center space-x-2">
                                    <Label htmlFor="live-camera-switch">Use Live Cameras</Label>
                                    <Switch id="live-camera-switch" checked={useLiveCameras} onCheckedChange={setUseLiveCameras}/>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="flex-grow flex flex-col">
                            <Tabs defaultValue="scenes" className="flex-grow flex flex-col">
                                <TabsList>
                                    <TabsTrigger value="scenes"><Film className="mr-2 h-4 w-4"/>Scenes</TabsTrigger>
                                    <TabsTrigger value="cameras"><Camera className="mr-2 h-4 w-4"/>Cameras</TabsTrigger>
                                    <TabsTrigger value="banners"><ImageIcon className="mr-2 h-4 w-4"/>Banners</TabsTrigger>
                                    <TabsTrigger value="music"><Music className="mr-2 h-4 w-4"/>Music</TabsTrigger>
                                </TabsList>
                                <TabsContent value="scenes" className="flex-grow bg-black mt-2 rounded-md">
                                    {/* This would be where the scene/media preview is displayed */}
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column: Controls */}
                <div className="lg:col-span-1 flex flex-col gap-4">
                     <Tabs defaultValue="broadcast" className="w-full">
                        <TabsList className="grid w-full grid-cols-3">
                            <TabsTrigger value="broadcast">Broadcast</TabsTrigger>
                            <TabsTrigger value="audio">Audio</TabsTrigger>
                            <TabsTrigger value="graphics">Graphics</TabsTrigger>
                        </TabsList>
                        <TabsContent value="broadcast" className="space-y-4">
                             <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><Rss className="h-5 w-5 text-accent"/>Broadcast Controls</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                     <div className="flex items-center justify-between p-3 bg-secondary rounded-md">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("w-3 h-3 rounded-full", isLive ? "bg-red-500 animate-pulse" : "bg-gray-500")}></div>
                                            <span className="font-semibold">{isLive ? "ONLINE" : "OFFLINE"}</span>
                                        </div>
                                        <span className="font-mono text-sm">00:00:00</span>
                                     </div>
                                     <div className="flex items-center justify-between p-3 bg-secondary rounded-md">
                                        <div className="flex items-center gap-2">
                                             <div className={cn("w-3 h-3 rounded-full border-2", isRecording ? "bg-red-500 border-red-500 animate-pulse" : "border-gray-500")}></div>
                                            <span className="font-semibold">{isRecording ? "RECORDING" : "NOT RECORDING"}</span>
                                        </div>
                                        <span className="font-mono text-sm">00:00:00</span>
                                     </div>
                                     <div className="grid grid-cols-2 gap-2">
                                         <Button variant="outline" onClick={handleGoLive}>
                                            <Play className="mr-2 h-4 w-4" /> {isLive ? "Stop Stream" : "Start Stream"}
                                        </Button>
                                         <Button variant="outline" onClick={handleRecord}>
                                            <Circle className="mr-2 h-4 w-4" /> {isRecording ? "Stop Record" : "Start Record"}
                                        </Button>
                                     </div>
                                </CardContent>
                            </Card>
                             <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2"><GitMerge className="h-5 w-5 text-accent"/>Multistream</CardTitle>
                                    <CardDescription>Stream to multiple platforms at once.</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div className="flex items-center justify-between p-2 bg-secondary rounded-md">
                                        <div className="flex items-center gap-2"><YoutubeIcon /> <span>YouTube</span></div>
                                        <div className="flex items-center gap-2 text-xs"><div className="w-2 h-2 rounded-full bg-gray-500"></div>Offline<Switch/></div>
                                    </div>
                                     <div className="flex items-center justify-between p-2 bg-secondary rounded-md">
                                        <div className="flex items-center gap-2"><FacebookIcon /> <span>Facebook</span></div>
                                        <div className="flex items-center gap-2 text-xs"><div className="w-2 h-2 rounded-full bg-gray-500"></div>Offline<Switch/></div>
                                    </div>
                                     <div className="flex items-center justify-between p-2 bg-secondary rounded-md">
                                        <div className="flex items-center gap-2"><Twitch className="h-5 w-5 text-purple-500" /> <span>Twitch</span></div>
                                        <div className="flex items-center gap-2 text-xs"><div className="w-2 h-2 rounded-full bg-gray-500"></div>Offline<Switch/></div>
                                    </div>
                                    <Button variant="ghost" className="w-full"><PlusCircle className="mr-2 h-4 w-4" /> Add Custom RTMP</Button>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

