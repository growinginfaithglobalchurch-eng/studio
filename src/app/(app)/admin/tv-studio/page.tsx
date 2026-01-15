
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
    const [currentTime, setCurrentTime] = useState('');

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

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
        <div className="flex flex-col h-[calc(100vh-5rem)] bg-background -m-4 md:-m-6">
            <header className="flex-shrink-0 bg-card border-b p-2 flex items-center justify-between">
                 <h1 className="text-lg font-headline font-bold text-foreground flex items-center gap-2">
                    <Tv className="h-6 w-6 text-accent" />
                    Royal Life TV Studio
                </h1>
                <div className="flex items-center gap-2">
                     <Button 
                        variant={isRecording ? "destructive" : "outline"} 
                        size="sm"
                        onClick={() => setIsRecording(!isRecording)}
                    >
                        <Circle className="mr-2 h-3 w-3 fill-current"/>{isRecording ? 'Stop Recording' : 'Record'}
                    </Button>
                    <Button 
                        variant={isLive ? "destructive" : "default"} 
                        size="sm"
                        onClick={() => setIsLive(!isLive)}
                    >
                        <Radio className="mr-2 h-4 w-4"/>{isLive ? 'Stop Stream' : 'Go Live'}
                    </Button>
                </div>
            </header>
            
            <div className="flex-grow grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-2 p-2">
                {/* Preview Monitor */}
                <div className="flex flex-col bg-card rounded-md border">
                    <div className="bg-orange-500 text-white text-sm font-bold py-1 px-3 rounded-t-md">PREVIEW: {previewScene?.name}</div>
                    <div className="flex-grow relative">
                         <AspectRatio ratio={16/9} className="bg-black">
                            {previewScene && <Image src={previewScene.sourceUrl} alt={previewScene.name} fill className="object-cover" data-ai-hint={previewScene.dataAiHint} />}
                        </AspectRatio>
                    </div>
                </div>

                {/* Transition Controls */}
                <div className="flex flex-col gap-2 bg-card p-2 rounded-md border w-32">
                     <Button variant="outline" onClick={() => handleTransition('cut')} className="h-10">Cut</Button>
                     <Button variant="outline" onClick={() => handleTransition('fade')} className="h-10">Fade</Button>
                     <Button variant="outline" className="h-10">Wipe</Button>
                     <Button variant="outline" className="h-10">Zoom</Button>

                     <div className="flex-grow flex flex-col justify-end gap-2">
                        <div className="relative h-32 w-4 mx-auto bg-muted rounded-full overflow-hidden">
                           <div className="absolute bottom-0 w-full bg-green-500" style={{height: '75%'}}></div>
                           <div className="absolute bottom-0 w-full bg-yellow-500" style={{height: '50%'}}></div>
                           <div className="absolute bottom-0 w-full bg-red-500" style={{height: '25%'}}></div>
                        </div>
                        <Slider defaultValue={[50]} max={100} step={1} className="[&>span]:bg-transparent [&>span]:h-1 [&_[role=slider]]:h-6 [&_[role=slider]]:w-10 [&_[role=slider]]:rounded-sm [&_[role=slider]]:border-2"/>
                         <div className="bg-muted text-center p-2 rounded-md">
                            <p className="font-mono text-lg font-bold text-foreground">21:17.6</p>
                            <p className="text-xs text-muted-foreground">{currentTime}</p>
                         </div>
                     </div>
                </div>

                {/* Program Monitor */}
                <div className="flex flex-col bg-card rounded-md border">
                    <div className={cn("text-white text-sm font-bold py-1 px-3 rounded-t-md", isLive ? "bg-red-600" : "bg-green-600")}>
                        PROGRAM: {programScene?.name} {isLive && '(LIVE)'}
                    </div>
                     <div className="flex-grow relative">
                         <AspectRatio ratio={16/9} className="bg-black">
                            {programScene && <Image src={programScene.sourceUrl} alt={programScene.name} fill className="object-cover" data-ai-hint={programScene.dataAiHint} />}
                            {programScene?.id === 'game' && previewScene?.id === 'cam1' && (
                               <div className="absolute bottom-4 right-4 w-1/4 aspect-video rounded-md overflow-hidden border-2 border-accent">
                                    <Image src={previewScene.sourceUrl} alt={previewScene.name} fill className="object-cover"/>
                               </div>
                            )}
                        </AspectRatio>
                    </div>
                </div>
            </div>

            {/* Inputs Bar */}
            <div className="flex-shrink-0 bg-card border-t p-2">
                <div className="flex items-center gap-2">
                    {scenes.map(scene => (
                        <div key={scene.id} className="w-40 flex-shrink-0 cursor-pointer" onClick={() => setPreviewScene(scene)}>
                            <AspectRatio ratio={16/9} className={cn("bg-black rounded-md overflow-hidden border-2", previewScene?.id === scene.id ? 'border-orange-500' : 'border-transparent', programScene?.id === scene.id ? 'border-green-600' : 'border-transparent')}>
                                 <Image src={scene.sourceUrl} alt={scene.name} fill className="object-cover" />
                            </AspectRatio>
                            <p className="text-xs text-center text-foreground truncate mt-1">{scene.name}</p>
                        </div>
                    ))}
                     <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="h-full w-20 flex-shrink-0"><PlusCircle /></Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader><DialogTitle>Add New Media Input</DialogTitle></DialogHeader>
                            <form onSubmit={handleAddScene} className="space-y-4">
                                <div className="space-y-2"><Label>Input Name</Label><Input value={newScene.name} onChange={(e) => setNewScene({...newScene, name: e.target.value})} placeholder="e.g., Guest Camera" /></div>
                                <div className="space-y-2"><Label>Source URL (or upload)</Label><Input value={newScene.sourceUrl} onChange={(e) => setNewScene({...newScene, sourceUrl: e.target.value})} placeholder="https://... or upload a file" /></div>
                                <div className="space-y-2">
                                  <Label>Upload File</Label>
                                  <Input 
                                    type="file" 
                                    onChange={(e) => {
                                      const file = e.target.files?.[0];
                                      if (file) {
                                          const url = URL.createObjectURL(file);
                                          const type = file.type.startsWith('video') ? 'video' : 'image';
                                          setNewScene({ name: file.name, type, sourceUrl: url });
                                      }
                                    }} 
                                    accept="image/*,video/*" 
                                  />
                                </div>
                                <Button type="submit" className="w-full">Add Input</Button>
                            </form>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
}
