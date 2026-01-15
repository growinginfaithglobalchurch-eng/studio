
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Tv,
  GitMerge,
  MoveRight,
  Camera,
  Film,
  Upload,
  SlidersHorizontal,
  Radio,
  Play,
  Circle,
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
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

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
    const [isRecording, setIsRecording] = useState(false);
    
    const [previewScene, setPreviewScene] = useState<Scene | null>(scenes[0] || null);
    const [programScene, setProgramScene] = useState<Scene | null>(scenes[4] || null);
    const [audioLevel, setAudioLevel] = useState(75);
    const [streamTime, setStreamTime] = useState(0);
    const [recordTime, setRecordTime] = useState(0);
    const [availableScenes, setAvailableScenes] = useState(scenes);
    const [hasCameraPermission, setHasCameraPermission] = useState(false);
    const liveVideoRef = useRef<HTMLVideoElement>(null);

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
    
    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (isRecording) {
            timer = setInterval(() => {
                setRecordTime(prev => prev + 1);
            }, 1000);
        }
        return () => clearInterval(timer);
    }, [isRecording]);

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
    
    const handleAddInput = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('inputName') as string;
        const url = formData.get('inputUrl') as string;

        if (name && url) {
            const newScene: Scene = {
                id: `scene-${Date.now()}`,
                name: name,
                type: 'video', // Simple default
                sourceUrl: url,
                dataAiHint: 'custom input',
            };
            setAvailableScenes(prev => [...prev, newScene]);
            toast({
                title: 'Input Added',
                description: `"${name}" has been added to your scenes.`,
            });
            // Here you would close the dialog
        }
    };

    const handleCameraSwitch = async (checked: boolean) => {
        if (checked) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                setHasCameraPermission(true);
                if (liveVideoRef.current) {
                    liveVideoRef.current.srcObject = stream;
                }
                 toast({ title: 'Camera Activated', description: 'Your webcam is now active.' });
            } catch (error) {
                console.error('Error accessing camera:', error);
                setHasCameraPermission(false);
                toast({
                    variant: 'destructive',
                    title: 'Camera Access Denied',
                    description: 'Please enable camera permissions.',
                });
            }
        } else {
            if (liveVideoRef.current && liveVideoRef.current.srcObject) {
                const stream = liveVideoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
                liveVideoRef.current.srcObject = null;
                setHasCameraPermission(false);
            }
        }
    };

    const addCameraToScenes = () => {
        const newScene: Scene = {
            id: `cam-live-${Date.now()}`,
            name: "Live Webcam",
            type: 'live',
            sourceUrl: "WEBCAM_FEED", // Special identifier
            dataAiHint: "live camera feed"
        };
        setAvailableScenes(prev => [...prev, newScene]);
        toast({ title: 'Live Camera Added', description: 'The webcam feed is now an available scene.'});
    };

    return (
        <div className="h-full flex flex-col -m-4 md:-m-6">
            <header className="flex items-center justify-between p-2 border-b border-border bg-card shrink-0">
                <h1 className="text-lg font-headline font-bold flex items-center gap-2">
                    <Tv className="h-5 w-5 text-accent" />
                    Royal Life TV Studio
                </h1>
                 <Button variant={isLive ? 'destructive' : 'default'} onClick={() => setIsLive(!isLive)}>
                    <Power className="mr-2 h-4 w-4" />
                    {isLive ? "Stop Stream" : "Go Live"}
                </Button>
            </header>

            <main className="flex-grow grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-2 p-2 min-h-0">
                 <div className="flex flex-col">
                    <div className="bg-orange-500 text-white font-bold text-sm p-1 text-center rounded-t-md">PREVIEW: {previewScene?.name}</div>
                    <div className="flex-grow bg-black border-2 border-orange-500 rounded-b-md relative overflow-hidden">
                        {previewScene && <Image src={previewScene.sourceUrl} alt={previewScene.name} fill className="object-cover" data-ai-hint={previewScene.dataAiHint} />}
                    </div>
                </div>

                <div className="flex flex-col items-center justify-center gap-2 w-24">
                     <div className="flex flex-col gap-2 w-full">
                        <Button variant="outline" onClick={() => handleTransition('cut')}>CUT</Button>
                        <Button variant="outline" onClick={() => handleTransition('fade')}>FADE</Button>
                     </div>
                     <div className="w-full h-48 bg-card rounded-md p-2 flex flex-col-reverse gap-1 border">
                         <div className="w-full bg-green-500 rounded-sm" style={{height: `${audioLevel}%`}}></div>
                     </div>
                     <div className="font-mono text-lg">{formatTime(streamTime)}</div>
                </div>

                <div className="flex flex-col">
                     <div className={cn("text-white font-bold text-sm p-1 text-center rounded-t-md", isLive ? "bg-red-600" : "bg-green-600")}>
                        PROGRAM: {programScene?.name}
                     </div>
                    <div className={cn("flex-grow bg-black border-2 rounded-b-md relative overflow-hidden", isLive ? "border-red-600" : "border-green-600")}>
                         {programScene && <Image src={programScene.sourceUrl} alt={programScene.name} fill className="object-cover" data-ai-hint={programScene.dataAiHint} />}
                         {programScene?.id === 'game' && previewScene?.id === 'cam1' && (
                            <div className="absolute bottom-4 right-4 w-1/3 aspect-video rounded-md overflow-hidden border-2 border-primary shadow-lg">
                                 <Image src={previewScene.sourceUrl} alt={previewScene.name} fill className="object-cover"/>
                                 <div className="absolute inset-0 border-2 border-primary/50"></div>
                            </div>
                         )}
                    </div>
                </div>
            </main>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-2 border-t">
                {/* Left Column: Media Manager */}
                <Card>
                    <CardHeader className="flex flex-row justify-between items-center">
                        <div>
                            <CardTitle>Media Manager</CardTitle>
                            <CardDescription>Manage all your production assets.</CardDescription>
                        </div>
                        <div className="flex items-center gap-2">
                            <Dialog>
                                <DialogTrigger asChild>
                                    <Button variant="outline"><Upload className="mr-2 h-4 w-4"/> Upload</Button>
                                </DialogTrigger>
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>Add New Input</DialogTitle>
                                    </DialogHeader>
                                    <form onSubmit={handleAddInput} className="space-y-4">
                                        <div><Label htmlFor="inputName">Input Name</Label><Input id="inputName" name="inputName" placeholder="e.g., Sermon Intro Video" /></div>
                                        <div><Label htmlFor="inputUrl">Source URL</Label><Input id="inputUrl" name="inputUrl" placeholder="https://..." /></div>
                                        {/* File upload would be more complex */}
                                        <Button type="submit">Add Input</Button>
                                    </form>
                                </DialogContent>
                            </Dialog>
                            <div className="flex items-center space-x-2">
                                <Switch id="use-live-cameras" onCheckedChange={handleCameraSwitch} />
                                <Label htmlFor="use-live-cameras">Use Live Cameras</Label>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="scenes">
                            <TabsList className="w-full">
                                <TabsTrigger value="scenes" className="flex-1"><Monitor className="mr-2"/>Scenes</TabsTrigger>
                                <TabsTrigger value="cameras" className="flex-1"><Camera className="mr-2"/>Cameras</TabsTrigger>
                                <TabsTrigger value="banners" className="flex-1"><FileImage className="mr-2"/>Banners</TabsTrigger>
                                <TabsTrigger value="music" className="flex-1"><Music className="mr-2"/>Music</TabsTrigger>
                            </TabsList>
                            <TabsContent value="scenes">
                                <ScrollArea className="h-48">
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 p-1">
                                        {availableScenes.map(scene => (
                                            <Button key={scene.id} variant="outline" className="h-20 flex-col gap-1" onClick={() => setPreviewScene(scene)}>
                                                {scene.type === 'image' && <FileImage/>}
                                                {scene.type === 'video' && <Video/>}
                                                {scene.type === 'live' && <Camera/>}
                                                <span className="text-xs truncate w-full">{scene.name}</span>
                                            </Button>
                                        ))}
                                    </div>
                                </ScrollArea>
                            </TabsContent>
                             <TabsContent value="cameras">
                                 <div className="space-y-4">
                                    <div className="aspect-video w-full bg-black rounded-md">
                                        <video ref={liveVideoRef} className="w-full h-full" autoPlay muted playsInline />
                                    </div>
                                    <Button onClick={addCameraToScenes} disabled={!hasCameraPermission}>Add Camera to Scenes</Button>
                                 </div>
                            </TabsContent>
                            <TabsContent value="banners"><p className="text-center text-muted-foreground p-8">Banner content area</p></TabsContent>
                            <TabsContent value="music"><p className="text-center text-muted-foreground p-8">Music content area</p></TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>

                {/* Right Column: Broadcast Controls */}
                <Card>
                    <CardHeader>
                        <CardTitle>Broadcast & Control Center</CardTitle>
                        <CardDescription>Manage your stream, recording, and destinations.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="broadcast">
                            <TabsList className="w-full">
                                <TabsTrigger value="broadcast" className="flex-1"><Radio className="mr-2"/>Broadcast</TabsTrigger>
                                <TabsTrigger value="audio" className="flex-1"><AudioLines className="mr-2"/>Audio</TabsTrigger>
                                <TabsTrigger value="graphics" className="flex-1"><FileImage className="mr-2"/>Graphics</TabsTrigger>
                            </TabsList>
                            <TabsContent value="broadcast" className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <Card className={cn("p-4 text-center", isLive ? "bg-destructive/20 border-destructive" : "bg-secondary")}>
                                        <p className="text-xs font-bold">{isLive ? "STREAMING" : "OFFLINE"}</p>
                                        <p className="font-mono text-lg">{formatTime(streamTime)}</p>
                                    </Card>
                                     <Card className={cn("p-4 text-center", isRecording ? "bg-destructive/20 border-destructive" : "bg-secondary")}>
                                        <p className="text-xs font-bold">{isRecording ? "RECORDING" : "NOT RECORDING"}</p>
                                        <p className="font-mono text-lg">{formatTime(recordTime)}</p>
                                    </Card>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <Button variant={isLive ? "destructive" : "default"} onClick={() => setIsLive(!isLive)}><Radio className="mr-2"/>{isLive ? "Stop Stream" : "Start Stream"}</Button>
                                    <Button variant={isRecording ? "destructive" : "default"} onClick={() => setIsRecording(!isRecording)}><Circle className="mr-2"/>{isRecording ? "Stop Record" : "Start Record"}</Button>
                                </div>
                                
                                <Card>
                                    <CardHeader className="p-3"><CardTitle className="text-base">Multistream</CardTitle></CardHeader>
                                    <CardContent className="p-3 space-y-2">
                                        <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Youtube className="text-red-500"/>YouTube</div><Switch defaultChecked/></div>
                                        <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Facebook className="text-blue-600"/>Facebook</div><Switch /></div>
                                        <div className="flex items-center justify-between"><div className="flex items-center gap-2"><Twitch className="text-purple-500"/>Twitch</div><Switch /></div>
                                        <Button variant="outline" className="w-full"><Plus className="mr-2"/>Add RTMP Destination</Button>
                                    </CardContent>
                                </Card>

                            </TabsContent>
                             <TabsContent value="audio"><p className="text-center text-muted-foreground p-8">Audio mixer controls</p></TabsContent>
                             <TabsContent value="graphics"><p className="text-center text-muted-foreground p-8">Graphics and overlays controls</p></TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
