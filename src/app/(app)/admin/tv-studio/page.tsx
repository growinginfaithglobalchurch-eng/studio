
'use client';

import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Tv, Video, Power, Image as ImageIcon, PlusCircle, Trash2, GitMerge, MoveRight, Radio, Camera, Film } from 'lucide-react';
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';


type Scene = {
    id: string;
    name: string;
    type: 'image' | 'video' | 'live';
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
    { id: 'intro', name: 'Intro Video', type: 'video', sourceUrl: 'https://picsum.photos/seed/intro/1280/720', dataAiHint: 'countdown intro' },
    { id: 'logo', name: 'Logo Screen', type: 'image', sourceUrl: PlaceHolderImages.find(p => p.id === 'ministry-logo-1')?.imageUrl || '', dataAiHint: 'ministry logo' },
    { id: 'scripture', name: 'Scripture Graphic', type: 'image', sourceUrl: 'https://picsum.photos/seed/scripture/1280/720', dataAiHint: 'bible scripture' },
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

    const [newScene, setNewScene] = useState({ name: '', type: 'image' as 'image' | 'video', sourceUrl: '' });
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const [isCameraOn, setIsCameraOn] = useState(false);
    const [hasCameraPermission, setHasCameraPermission] = useState<boolean | null>(null);
    const cameraVideoRef = useRef<HTMLVideoElement>(null);
    
    useEffect(() => {
        if (isCameraOn) {
            const getCameraPermission = async () => {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    setHasCameraPermission(true);
                    if (cameraVideoRef.current) {
                        cameraVideoRef.current.srcObject = stream;
                    }
                } catch (error) {
                    console.error('Error accessing camera:', error);
                    setHasCameraPermission(false);
                    setIsCameraOn(false);
                    toast({
                        variant: 'destructive',
                        title: 'Camera Access Denied',
                        description: 'Please enable camera permissions to use this feature.',
                    });
                }
            };
            getCameraPermission();
        } else {
             if (cameraVideoRef.current && cameraVideoRef.current.srcObject) {
                const stream = cameraVideoRef.current.srcObject as MediaStream;
                stream.getTracks().forEach(track => track.stop());
                cameraVideoRef.current.srcObject = null;
            }
        }
    }, [isCameraOn, toast]);

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

    const handleDeleteScene = (id: string) => {
        if (programScene.id === id || previewScene.id === id) {
            toast({ variant: 'destructive', title: 'Cannot delete active scene.' });
            return;
        }
        setScenes(prev => prev.filter(s => s.id !== id));
    };
    
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            const type = file.type.startsWith('video') ? 'video' : 'image';
            setNewScene({ name: file.name, type, sourceUrl: url });
        }
    };
    
    const addCameraToScenes = () => {
        if (!isCameraOn || !cameraVideoRef.current?.srcObject) {
            toast({ variant: 'destructive', title: 'Camera is not active.' });
            return;
        }
        const newCameraScene: Scene = {
            id: `live-cam-${Date.now()}`,
            name: 'Live Camera Feed',
            type: 'live',
            sourceUrl: 'camera-stream', // Placeholder
        };
        setScenes(prev => [...prev, newCameraScene]);
        toast({ title: 'Live Camera Added', description: 'The camera feed is now available as an input.'});
    };

    const SceneMonitor = ({ scene, title, isLiveScene = false }: { scene: Scene, title: string, isLiveScene?: boolean }) => (
        <div className="flex flex-col h-full bg-black border border-border/50 rounded-lg">
             <div className={cn(
                "p-2 text-center text-white font-bold",
                isLiveScene ? "bg-red-600" : "bg-green-600"
             )}>
                <CardTitle className="text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                    {isLiveScene && <Radio className="h-4 w-4 animate-pulse" />}
                    {title}
                </CardTitle>
             </div>
             <div className="flex-grow p-1">
                 <AspectRatio ratio={16 / 9} className="bg-black rounded-md overflow-hidden h-full">
                    {scene.type === 'image' && <Image src={scene.sourceUrl} alt={scene.name} fill className="object-contain" data-ai-hint={scene.dataAiHint} />}
                    {scene.type === 'video' && <Image src={scene.sourceUrl} alt={scene.name} fill className="object-cover" data-ai-hint={scene.dataAiHint} />}
                    {scene.type === 'live' && (
                        <video ref={cameraVideoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
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
                    <SceneMonitor scene={programScene} title="Program" isLiveScene={isLive} />
                </div>
            </div>
            
            <Tabs defaultValue="media">
                <Card>
                    <CardHeader className="flex-row items-center justify-between">
                         <TabsList>
                            <TabsTrigger value="media"><Film className="mr-2 h-4 w-4"/> Media</TabsTrigger>
                            <TabsTrigger value="camera"><Camera className="mr-2 h-4 w-4"/> Cameras</TabsTrigger>
                        </TabsList>
                        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                            <DialogTrigger asChild>
                                <Button>
                                    <PlusCircle className="mr-2 h-4 w-4" /> Add Media Input
                                </Button>
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
                    </CardHeader>
                    <CardContent>
                        <TabsContent value="media">
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {scenes.map(scene => (
                                    <div key={scene.id} className="relative group">
                                        <AspectRatio ratio={16/9} className={cn("bg-black rounded-md overflow-hidden border-2 cursor-pointer", 
                                            previewScene.id === scene.id && "border-green-500",
                                            programScene.id === scene.id && "border-destructive"
                                            )} onClick={() => handleSceneToPreview(scene)}>
                                            {scene.type === 'image' && <Image src={scene.sourceUrl} alt={scene.name} fill className="object-contain" />}
                                            {scene.type === 'video' && <Image src={scene.sourceUrl} alt={scene.name} fill className="object-cover" />}
                                            {scene.type === 'live' && <div className="bg-black flex items-center justify-center h-full"><Camera className="h-8 w-8 text-white"/></div>}
                                            <div className="absolute bottom-0 left-0 right-0 p-1 bg-black/50 text-white text-xs text-center truncate">{scene.name}</div>
                                        </AspectRatio>
                                        <Button size="icon" variant="destructive" className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity" onClick={(e) => { e.stopPropagation(); handleDeleteScene(scene.id); }}>
                                            <Trash2 className="h-3 w-3"/>
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </TabsContent>
                        <TabsContent value="camera">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <div className="flex items-center space-x-2">
                                        <Switch id="camera-switch" checked={isCameraOn} onCheckedChange={setIsCameraOn} />
                                        <Label htmlFor="camera-switch">Activate Live Camera</Label>
                                    </div>
                                    {hasCameraPermission === false && (
                                        <Alert variant="destructive">
                                            <AlertTitle>Camera Access Required</AlertTitle>
                                            <AlertDescription>Please allow camera access to use this feature.</AlertDescription>
                                        </Alert>
                                    )}
                                    <Button onClick={addCameraToScenes} disabled={!isCameraOn}>Add Camera to Scenes</Button>
                                </div>
                                <div className="bg-black rounded-md overflow-hidden">
                                    <AspectRatio ratio={16/9}>
                                        <video ref={cameraVideoRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                                        {!isCameraOn && <div className="w-full h-full flex items-center justify-center bg-secondary"><Camera className="h-10 w-10 text-muted-foreground"/></div>}
                                    </AspectRatio>
                                </div>
                            </div>
                        </TabsContent>
                    </CardContent>
                </Card>
            </Tabs>
        </div>
    );
}
