
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
import { ScrollArea } from '@/components/ui/scroll-area';

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
    { id: 'cam2', name: 'Side Camera', type: 'video', sourceUrl: 'https://picsum.photos/seed/cam2/1280/720', dataAiHint: 'video camera feed' },
    { id: 'waiting', name: 'Waiting Screen', type: 'image', sourceUrl: 'https://picsum.photos/seed/waiting/1280/720', dataAiHint: 'abstract pattern' },
    { id: 'presentation', name: 'Presentation Slides', type: 'image', sourceUrl: 'https://picsum.photos/seed/slides/1280/720', dataAiHint: 'presentation slides' },
    { id: 'interview', name: 'Interview Setup', type: 'video', sourceUrl: 'https://picsum.photos/seed/interview/1280/720', dataAiHint: 'interview setup' },
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
        } else {
            setStreamTime(0);
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
        <div className="flex flex-col h-full gap-4 -m-4 md:-m-6 p-4 bg-zinc-900 text-zinc-100">
            {/* Header */}
            <header className="flex items-center justify-between shrink-0">
                <div className="relative h-16 w-full max-w-2xl">
                    {/* Main Silver Body */}
                    <div className="absolute bottom-0 left-0 h-12 w-full bg-gradient-to-r from-zinc-400 to-zinc-200" style={{ clipPath: 'polygon(5% 0, 100% 0, 95% 100%, 0 100%)' }}>
                        <div className="absolute left-[15%] top-1/2 -translate-y-1/2 w-3/4">
                            <h2 className="text-black font-extrabold text-xl tracking-wide">ROYAL LIFE TV STUDIO</h2>
                            <p className="text-zinc-700 text-xs truncate">Official broadcast center for Faith Connect Global.</p>
                        </div>
                    </div>

                    {/* Red Top Bar */}
                    <div className="absolute top-0 left-[10%] h-6 w-[60%] bg-red-600 flex items-center" style={{ clipPath: 'polygon(0 0, 100% 0, 98% 100%, 2% 100%)' }}>
                        <span className="text-white font-bold text-sm ml-4">LIVE STREAM</span>
                         <div className="absolute right-4 top-1/2 -translate-y-1/2 h-1 w-8 bg-white/50"></div>
                    </div>

                    {/* Metallic Left Shape */}
                    <div className="absolute bottom-0 left-0 h-12 w-[18%] bg-gradient-to-r from-zinc-600 via-zinc-800 to-zinc-600" style={{ clipPath: 'polygon(0 0, 70% 0, 100% 100%, 0% 100%)' }}>
                        <div className="absolute h-full w-2 bg-red-600 skew-x-[-20deg] left-10"></div>
                        <div className="absolute h-full w-1 bg-red-700 skew-x-[-20deg] left-14"></div>
                    </div>
                </div>
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
                     <div className="w-2 h-full min-h-24 bg-zinc-800 rounded-full overflow-hidden relative mt-4">
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
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 flex flex-col">
                    <div className="flex justify-between items-center pb-2 border-b border-zinc-700 mb-2">
                        <h2 className="text-lg font-bold flex items-center gap-2 text-zinc-100"><Clapperboard /> Media Manager</h2>
                        <div className="flex items-center gap-4">
                            <Button variant="outline" size="sm"><Upload className="mr-2 h-4 w-4"/> Upload</Button>
                             <div className="flex items-center space-x-2">
                                <Switch id="live-cameras" />
                                <Label htmlFor="live-cameras" className="text-sm text-zinc-300">Use Live Cameras</Label>
                            </div>
                        </div>
                    </div>
                     <Tabs defaultValue="scenes" className="flex flex-col flex-grow">
                        <TabsList className="bg-zinc-900 text-zinc-400">
                            <TabsTrigger value="scenes" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"><FileImage className="mr-2 h-4 w-4"/>Scenes</TabsTrigger>
                            <TabsTrigger value="cameras" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"><Camera className="mr-2 h-4 w-4"/>Cameras</TabsTrigger>
                            <TabsTrigger value="banners" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"><Video className="mr-2 h-4 w-4"/>Banners</TabsTrigger>
                            <TabsTrigger value="music" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"><Music className="mr-2 h-4 w-4"/>Music</TabsTrigger>
                        </TabsList>
                        <TabsContent value="scenes" className="bg-zinc-900/50 rounded-b-md p-2 flex-grow min-h-0">
                           <ScrollArea className="h-full">
                               <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pr-4">
                                    {scenes.map(scene => (
                                        <button 
                                            key={scene.id} 
                                            className={cn(
                                                "aspect-video rounded-md relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900",
                                                previewScene?.id === scene.id ? 'ring-2 ring-orange-500' : 'ring-1 ring-zinc-700 hover:ring-orange-500'
                                            )}
                                            onClick={() => setPreviewScene(scene)}
                                        >
                                            <Image src={scene.sourceUrl} alt={scene.name} fill className="object-cover"/>
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                            <p className="absolute bottom-1 left-2 text-xs text-white font-semibold truncate">{scene.name}</p>
                                        </button>
                                    ))}
                               </div>
                           </ScrollArea>
                        </TabsContent>
                    </Tabs>
                </div>

                {/* Broadcast & Control Center */}
                <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 flex flex-col">
                    <Tabs defaultValue="broadcast" className="flex flex-col flex-grow">
                        <TabsList className="w-full grid grid-cols-6 bg-zinc-900 text-zinc-400">
                            <TabsTrigger value="broadcast" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100">Broadcast</TabsTrigger>
                            <TabsTrigger value="automation" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100">Automation</TabsTrigger>
                            <TabsTrigger value="audio" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100">Audio</TabsTrigger>
                            <TabsTrigger value="graphics" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100">Graphics</TabsTrigger>
                            <TabsTrigger value="newsroom" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100">Newsroom</TabsTrigger>
                            <TabsTrigger value="database" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100">Database</TabsTrigger>
                        </TabsList>
                         <TabsContent value="broadcast" className="bg-zinc-900/50 rounded-b-md p-2 flex-grow min-h-0 space-y-4">
                            {/* Broadcast Controls */}
                            <div className="bg-zinc-800 rounded-lg p-3">
                                <h3 className="font-bold flex items-center gap-2 mb-2 text-zinc-100"><Radio className="h-5 w-5"/> Broadcast Controls</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between items-center bg-zinc-900 p-2 rounded">
                                        <div className="flex items-center gap-2 text-zinc-300">
                                            <div className={cn("h-2 w-2 rounded-full", isLive ? "bg-green-500 animate-pulse" : "bg-zinc-500")}></div>
                                            <span>{isLive ? 'ONLINE' : 'OFFLINE'}</span>
                                        </div>
                                        <span className="font-mono text-zinc-300">{formatTime(streamTime)}</span>
                                    </div>
                                    <div className="flex justify-between items-center bg-zinc-900 p-2 rounded">
                                        <div className="flex items-center gap-2 text-zinc-300">
                                            <div className="h-2 w-2 rounded-full bg-zinc-500"></div>
                                            <span>NOT RECORDING</span>
                                        </div>
                                        <span className="font-mono text-zinc-300">00:00:00</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 pt-2">
                                        <Button variant="outline">Start Stream</Button>
                                        <Button variant="outline">Start Record</Button>
                                    </div>
                                </div>
                            </div>
                            {/* Multistream */}
                            <div className="bg-zinc-800 rounded-lg p-3">
                                <h3 className="font-bold flex items-center gap-2 mb-2 text-zinc-100"><Shuffle className="h-5 w-5"/> Multistream</h3>
                                <p className="text-xs text-zinc-400 mb-4">Stream to multiple platforms at once.</p>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2 text-zinc-100"><Youtube className="h-5 w-5 text-red-600"/><span>YouTube</span></div>
                                        <div className="flex items-center gap-2 text-xs text-zinc-300"><div className="h-2 w-2 rounded-full bg-zinc-500"></div>Offline <Switch/></div>
                                    </div>
                                     <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2 text-zinc-100"><Facebook className="h-5 w-5 text-blue-600"/><span>Facebook</span></div>
                                        <div className="flex items-center gap-2 text-xs text-zinc-300"><div className="h-2 w-2 rounded-full bg-zinc-500"></div>Offline <Switch/></div>
                                    </div>
                                     <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-2 text-zinc-100"><Twitch className="h-5 w-5 text-purple-600"/><span>Twitch</span></div>
                                        <div className="flex items-center gap-2 text-xs text-zinc-300"><div className="h-2 w-2 rounded-full bg-zinc-500"></div>Offline <Switch/></div>
                                    </div>
                                </div>
                                 <Button variant="ghost" className="w-full mt-4 text-xs text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100"><Plus className="mr-2 h-4 w-4"/> Add Custom RTMP</Button>
                            </div>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
