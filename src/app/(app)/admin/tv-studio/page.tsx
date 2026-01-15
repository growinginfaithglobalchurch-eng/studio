
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Tv,
  Camera,
  Film,
  Upload,
  Radio,
  Power,
  Music,
  FileImage,
  Video,
  Monitor,
  Youtube,
  Facebook,
  Twitch,
  Plus,
  Settings2,
  Clapperboard,
  HardDrive,
  User,
  Shield,
  Eye,
  AudioLines,
  Shuffle,
  PictureInPicture2
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

type Scene = {
    id: string;
    name: string;
    type: 'image' | 'video' | 'live';
    sourceUrl: string;
    dataAiHint?: string;
}

const scenes: Scene[] = [
    { id: 'cam1', name: 'Main Camera', type: 'video', sourceUrl: 'https://picsum.photos/seed/cam1/1280/720', dataAiHint: 'video camera feed' },
    { id: 'intro', name: 'Intro Video', type: 'video', sourceUrl: 'https://picsum.photos/seed/intro/1280/720', dataAiHint: 'countdown intro' },
    { id: 'logo', name: 'Logo Screen', type: 'image', sourceUrl: PlaceHolderImages.find(p => p.id === 'ministry-logo-1')?.imageUrl || '', dataAiHint: 'ministry logo' },
    { id: 'scripture', name: 'Scripture Graphic', type: 'image', sourceUrl: 'https://picsum.photos/seed/scripture/1280/720', dataAiHint: 'bible scripture' },
    { id: 'game', name: 'Game Feed', type: 'video', sourceUrl: 'https://picsum.photos/seed/game/1280/720', dataAiHint: 'space shooter game' },
    { id: 'guest', name: 'Guest Speaker Cam', type: 'video', sourceUrl: 'https://picsum.photos/seed/guest/1280/720', dataAiHint: 'remote speaker feed' },
    { id: 'outro', name: 'Outro Bumper', type: 'video', sourceUrl: 'https://picsum.photos/seed/outro/1280/720', dataAiHint: 'outro video' },
    { id: 'lowerthird', name: 'Lower Third BG', type: 'image', sourceUrl: 'https://picsum.photos/seed/lowerthird/1280/720', dataAiHint: 'abstract background' },
];


export default function TvStudioPage() {
    const { toast } = useToast();
    const [isLive, setIsLive] = useState(false);
    
    const [previewScene, setPreviewScene] = useState<Scene | null>(scenes[0] || null);
    const [programScene, setProgramScene] = useState<Scene | null>(scenes[4] || null);
    
    const [audioLevel, setAudioLevel] = useState(75);
    const [streamTime, setStreamTime] = useState(0);

     useEffect(() => {
        const interval = setInterval(() => {
            setAudioLevel(Math.floor(Math.random() * 100));
        }, 300);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isLive) {
            timer = setInterval(() => {
                setStreamTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isLive]);

    const formatTime = (seconds: number) => {
        const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
        const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${h}:${m}:${s}`;
    }

    const handleTransition = (type: 'cut' | 'fade') => {
        if (previewScene) {
            setProgramScene(previewScene);
            toast({
                title: type === 'cut' ? 'Cut!' : 'Fade Transition Complete',
                description: `"${previewScene.name}" is now live.`
            });
        }
    };
    
    return (
        <div className="flex flex-col h-full gap-4 -m-4 md:-m-6 p-4 bg-background text-foreground">
            {/* Header */}
            <header className="flex items-center justify-between shrink-0">
                <h1 className="text-xl font-headline font-bold flex items-center gap-2">
                    <Tv className="h-6 w-6 text-accent" />
                    Royal Life TV Studio
                </h1>
                 <Button variant={isLive ? 'destructive' : 'default'} onClick={() => setIsLive(!isLive)}>
                    <Power className="mr-2 h-4 w-4" />
                    {isLive ? "Stop Stream" : "Go Live"}
                </Button>
            </header>

            {/* Monitors & Transitions */}
            <main className="grid grid-cols-[1fr_auto_1fr] gap-4">
                {/* Preview Screen */}
                <div className="flex flex-col min-h-0">
                    <div className="bg-orange-500 text-white font-bold text-sm p-1 px-2 flex justify-between items-center rounded-t-md">
                        <span>PREVIEW</span>
                        <span>Fallback</span>
                    </div>
                    <div className="flex-grow bg-black border-2 border-orange-500 rounded-b-md relative overflow-hidden aspect-video">
                        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Source: {previewScene?.name || 'None'}</div>
                        {previewScene && <Image src={previewScene.sourceUrl} alt={previewScene.name} fill className="object-cover" data-ai-hint={previewScene.dataAiHint} />}
                    </div>
                </div>

                {/* Transition Controls */}
                <div className="flex flex-col items-center justify-center gap-2">
                     <Button variant="outline" size="sm" onClick={() => handleTransition('cut')}>CUT</Button>
                     <Button variant="outline" size="sm" onClick={() => handleTransition('fade')}>FADE</Button>
                     <div className="w-2 h-full min-h-24 bg-card rounded-full overflow-hidden relative mt-4">
                         <div className="bg-green-500 w-full absolute bottom-0 transition-all duration-300" style={{height: `${audioLevel}%`}}></div>
                     </div>
                </div>

                {/* Program Screen */}
                <div className="flex flex-col min-h-0">
                     <div className={cn("text-white font-bold text-sm p-1 px-2 flex justify-between items-center rounded-t-md", isLive ? "bg-red-600" : "bg-green-600")}>
                        <span>PROGRAM</span>
                        {isLive && <span>LIVE</span>}
                     </div>
                    <div className={cn("flex-grow bg-black border-2 rounded-b-md relative overflow-hidden aspect-video", isLive ? "border-red-600" : "border-green-600")}>
                         <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">Source: {programScene?.name || 'None'}</div>
                         {programScene && <Image src={programScene.sourceUrl} alt={programScene.name} fill className="object-cover" data-ai-hint={programScene.dataAiHint} />}
                         {programScene?.id === 'game' && previewScene?.id === 'cam1' && (
                            <div className="absolute bottom-4 right-4 w-1/4 aspect-video rounded-md overflow-hidden border-2 border-primary shadow-lg">
                                 <Image src={previewScene.sourceUrl} alt={previewScene.name} fill className="object-cover"/>
                                 <div className="absolute inset-0 border-2 border-primary/50 flex items-center justify-center">
                                    <PictureInPicture2 className="h-6 w-6 text-white/50" />
                                 </div>
                            </div>
                         )}
                    </div>
                </div>
            </main>

            {/* Control Panels */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow min-h-0">
                {/* Media Manager */}
                <div className="bg-card rounded-lg p-4 flex flex-col">
                    <div className="flex justify-between items-center pb-2 border-b mb-2">
                        <h2 className="text-lg font-bold flex items-center gap-2"><Clapperboard /> Media Manager</h2>
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm"><Upload className="mr-2 h-4 w-4"/> Upload</Button>
                             <div className="flex items-center space-x-2">
                                <Switch id="live-cameras" />
                                <Label htmlFor="live-cameras" className="text-sm">Use Live Cameras</Label>
                            </div>
                        </div>
                    </div>
                     <Tabs defaultValue="scenes" className="flex flex-col flex-grow">
                        <TabsList>
                            <TabsTrigger value="scenes"><FileImage className="mr-2 h-4 w-4"/>Scenes</TabsTrigger>
                            <TabsTrigger value="cameras"><Camera className="mr-2 h-4 w-4"/>Cameras</TabsTrigger>
                            <TabsTrigger value="banners"><Video className="mr-2 h-4 w-4"/>Banners</TabsTrigger>
                            <TabsTrigger value="music"><Music className="mr-2 h-4 w-4"/>Music</TabsTrigger>
                        </TabsList>
                        <TabsContent value="scenes" className="bg-background/50 rounded-b-md p-2 flex-grow min-h-0">
                           {/* Content for scenes would go here */}
                           <p className="text-center text-muted-foreground p-8">Scene management UI coming soon.</p>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Broadcast & Control Center */}
                <div className="bg-card rounded-lg p-4 flex flex-col">
                    <Tabs defaultValue="broadcast" className="flex flex-col flex-grow">
                        <TabsList className="w-full">
                            <TabsTrigger value="broadcast">Broadcast</TabsTrigger>
                            <TabsTrigger value="automation">Automation</TabsTrigger>
                            <TabsTrigger value="audio">Audio</TabsTrigger>
                            <TabsTrigger value="graphics">Graphics</TabsTrigger>
                            <TabsTrigger value="newsroom">Newsroom</TabsTrigger>
                            <TabsTrigger value="database">Database</TabsTrigger>
                        </TabsList>
                         <TabsContent value="broadcast" className="bg-background/50 rounded-b-md p-2 flex-grow min-h-0 space-y-4">
                            {/* Broadcast Controls */}
                            <div className="bg-card rounded-lg p-3">
                                <h3 className="font-bold flex items-center gap-2 mb-2"><Radio className="h-5 w-5"/> Broadcast Controls</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between items-center bg-secondary p-2 rounded">
                                        <div className="flex items-center gap-2">
                                            <div className={cn("h-2 w-2 rounded-full", isLive ? "bg-green-500 animate-pulse" : "bg-muted-foreground")}></div>
                                            <span>{isLive ? 'ONLINE' : 'OFFLINE'}</span>
                                        </div>
                                        <span className="font-mono">{formatTime(streamTime)}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-secondary p-2 rounded">
                                        <div className="flex items-center gap-2">
                                            <div className="h-2 w-2 rounded-full bg-muted-foreground"></div>
                                            <span>NOT RECORDING</span>
                                        </div>
                                        <span className="font-mono">00:00:00</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 pt-2">
                                        <Button variant="outline">Start Stream</Button>
                                        <Button variant="outline">Start Record</Button>
                                    </div>
                                </div>
                            </div>
                            {/* Multistream */}
                            <div className="bg-card rounded-lg p-3">
                                <h3 className="font-bold flex items-center gap-2 mb-2"><Shuffle className="h-5 w-5"/> Multistream</h3>
                                <p className="text-xs text-muted-foreground mb-4">Stream to multiple platforms at once.</p>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2"><Youtube className="h-5 w-5 text-red-600"/><span>YouTube</span></div>
                                        <div className="flex items-center gap-2 text-xs"><div className="h-2 w-2 rounded-full bg-muted-foreground"></div>Offline <Switch/></div>
                                    </div>
                                     <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2"><Facebook className="h-5 w-5 text-blue-600"/><span>Facebook</span></div>
                                        <div className="flex items-center gap-2 text-xs"><div className="h-2 w-2 rounded-full bg-muted-foreground"></div>Offline <Switch/></div>
                                    </div>
                                     <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2"><Twitch className="h-5 w-5 text-purple-600"/><span>Twitch</span></div>
                                        <div className="flex items-center gap-2 text-xs"><div className="h-2 w-2 rounded-full bg-muted-foreground"></div>Offline <Switch/></div>
                                    </div>
                                </div>
                                 <Button variant="ghost" className="w-full mt-4 text-xs"><Plus className="mr-2 h-4 w-4"/> Add Custom RTMP</Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
