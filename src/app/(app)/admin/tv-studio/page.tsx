
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
} from 'lucide-react';
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
        <div className="h-full flex flex-col -m-4 md:-m-6 bg-background">
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

            <main className="flex-grow grid grid-rows-[1fr_auto_1fr] grid-cols-1 gap-2 p-2 min-h-0">
                 {/* Preview Screen */}
                 <div className="flex flex-col min-h-0">
                    <div className="bg-orange-500 text-white font-bold text-sm p-1 text-center rounded-t-md">PREVIEW: {previewScene?.name}</div>
                    <div className="flex-grow bg-black border-2 border-orange-500 rounded-b-md relative overflow-hidden">
                        {previewScene && <Image src={previewScene.sourceUrl} alt={previewScene.name} fill className="object-cover" data-ai-hint={previewScene.dataAiHint} />}
                    </div>
                </div>

                {/* Transition Controls */}
                <div className="flex flex-col items-center justify-center gap-2 py-2">
                     <div className="flex gap-4">
                        <Button variant="outline" onClick={() => handleTransition('cut')}>CUT</Button>
                        <Button variant="outline" onClick={() => handleTransition('fade')}>FADE</Button>
                     </div>
                </div>

                {/* Program Screen */}
                <div className="flex flex-col min-h-0">
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
        </div>
    );
}
