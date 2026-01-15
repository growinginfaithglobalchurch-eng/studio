
'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Tv, GitMerge, MoveRight, Camera, Film, Upload, SlidersHorizontal, Radio, Play, Circle, Power } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
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

     useEffect(() => {
        const interval = setInterval(() => {
            setAudioLevel(Math.floor(Math.random() * 100));
        }, 300);
        return () => clearInterval(interval);
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

    return (
        <div className="h-full flex flex-col bg-background text-white -m-4 md:-m-6">
            <header className="flex items-center justify-between p-2 border-b border-border bg-card shrink-0">
                <h1 className="text-lg font-headline font-bold flex items-center gap-2">
                    <Tv className="h-5 w-5 text-accent" />
                    Royal Life TV Studio
                </h1>
                <div className="flex items-center gap-2">
                     <div className="flex items-center gap-2 text-sm">
                        <div className={cn("h-2 w-2 rounded-full", isLive ? "bg-red-500 animate-pulse" : "bg-gray-500")}></div>
                        <span>{isLive ? "LIVE" : "OFFLINE"}</span>
                    </div>
                    <Button variant="destructive" size="sm" onClick={() => setIsLive(!isLive)}>
                        <Power className="mr-2 h-4 w-4" />
                        {isLive ? "Stop Stream" : "Go Live"}
                    </Button>
                </div>
            </header>

            <main className="flex-grow grid grid-cols-[1fr_auto_1fr] gap-2 p-2">
                {/* Preview Column */}
                <div className="flex flex-col">
                    <div className="bg-orange-500 text-white font-bold text-sm p-1 text-center rounded-t-md">PREVIEW: {previewScene?.name}</div>
                    <div className="flex-grow bg-black border-2 border-orange-500 rounded-b-md relative overflow-hidden">
                        {previewScene && <Image src={previewScene.sourceUrl} alt={previewScene.name} fill className="object-cover" data-ai-hint={previewScene.dataAiHint} />}
                    </div>
                </div>

                {/* Center Controls */}
                <div className="flex flex-col items-center justify-center gap-2 w-24">
                     <div className="flex flex-col gap-2 w-full">
                        <Button variant="outline" onClick={() => handleTransition('cut')}>CUT</Button>
                        <Button variant="outline" onClick={() => handleTransition('fade')}>FADE</Button>
                     </div>
                     <div className="w-full h-48 bg-card rounded-md p-2 flex flex-col-reverse gap-1 border">
                         <div className="w-full bg-green-500 rounded-sm" style={{height: `${audioLevel}%`}}></div>
                     </div>
                     <div className="font-mono text-lg">1:23:45</div>
                </div>

                {/* Program Column */}
                <div className="flex flex-col">
                     <div className={cn("text-white font-bold text-sm p-1 text-center rounded-t-md", isLive ? "bg-red-600" : "bg-green-600")}>
                        PROGRAM: {programScene?.name}
                     </div>
                    <div className={cn("flex-grow bg-black border-2 rounded-b-md relative overflow-hidden", isLive ? "border-red-600" : "border-green-600")}>
                         {programScene && <Image src={programScene.sourceUrl} alt={programScene.name} fill className="object-cover" data-ai-hint={programScene.dataAiHint} />}
                         {/* Picture-in-Picture Effect */}
                         {programScene?.id === 'game' && previewScene?.id === 'cam1' && (
                            <div className="absolute bottom-4 right-4 w-1/3 aspect-video rounded-md overflow-hidden border-2 border-primary shadow-lg">
                                 <Image src={previewScene.sourceUrl} alt={previewScene.name} fill className="object-cover"/>
                                 <div className="absolute inset-0 border-2 border-primary/50"></div>
                            </div>
                         )}
                    </div>
                </div>
            </main>
        </div>
    );
}
