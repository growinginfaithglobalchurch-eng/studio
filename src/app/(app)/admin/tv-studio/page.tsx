
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
  PictureInPicture2,
  AlertCircle,
  Waves,
  Bot,
  BookText,
  Newspaper,
  Cross,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Slider } from '@/components/ui/slider';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AudioMixer } from '@/components/tv-studio/AudioMixer';
import { Input } from '@/components/ui/input';

type Scene = {
  id: string;
  name: string;
  type: 'image' | 'video' | 'live';
  sourceUrl?: string;
  sourceStream?: MediaStream;
  dataAiHint?: string;
};

const initialScenes: Scene[] = [
  {
    id: 'intro',
    name: 'Intro Video',
    type: 'video',
    sourceUrl: 'https://picsum.photos/seed/intro/1280/720',
    dataAiHint: 'countdown intro',
  },
  {
    id: 'logo',
    name: 'Logo Screen',
    type: 'image',
    sourceUrl:
      PlaceHolderImages.find((p) => p.id === 'ministry-logo-1')?.imageUrl ||
      '',
    dataAiHint: 'ministry logo',
  },
  {
    id: 'scripture-bg',
    name: 'Scripture Graphic',
    type: 'image',
    sourceUrl: 'https://picsum.photos/seed/scripture/1280/720',
    dataAiHint: 'bible scripture',
  },
  {
    id: 'game',
    name: 'Game Feed',
    type: 'video',
    sourceUrl: 'https://picsum.photos/seed/game/1280/720',
    dataAiHint: 'space shooter game',
  },
  {
    id: 'guest',
    name: 'Guest Speaker Cam',
    type: 'video',
    sourceUrl: 'https://picsum.photos/seed/guest/1280/720',
    dataAiHint: 'remote speaker feed',
  },
  {
    id: 'outro',
    name: 'Outro Bumper',
    type: 'video',
    sourceUrl: 'https://picsum.photos/seed/outro/1280/720',
    dataAiHint: 'outro video',
  },
  {
    id: 'lowerthird',
    name: 'Lower Third BG',
    type: 'image',
    sourceUrl: 'https://picsum.photos/seed/lowerthird/1280/720',
    dataAiHint: 'abstract background',
  },
  {
    id: 'waiting',
    name: 'Waiting Screen',
    type: 'image',
    sourceUrl: 'https://picsum.photos/seed/waiting/1280/720',
    dataAiHint: 'abstract pattern',
  },
  {
    id: 'presentation',
    name: 'Presentation Slides',
    type: 'image',
    sourceUrl: 'https://picsum.photos/seed/slides/1280/720',
    dataAiHint: 'presentation slides',
  },
  {
    id: 'interview',
    name: 'Interview Setup',
    type: 'video',
    sourceUrl: 'https://picsum.photos/seed/interview/1280/720',
    dataAiHint: 'interview setup',
  },
];

const videoPlaylist = initialScenes.filter(s => s.type === 'video').slice(0,4);

type Scripture = {
    reference: string;
    text: string;
};

const ScriptureOverlay = ({ scripture }: { scripture: Scripture }) => (
    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl text-white font-sans z-20">
      <div className="relative h-10">
        <div className="absolute top-0 left-0 h-1.5 w-full bg-red-700"></div>
        <div 
          className="absolute left-0 top-1.5 h-[calc(100%-0.375rem)] w-32 bg-gradient-to-b from-gray-300 to-gray-400 flex items-center justify-center"
          style={{ clipPath: 'polygon(0 0, 100% 0, 85% 100%, 0% 100%)' }}
        >
          <span className="text-black text-sm font-bold tracking-wider">SCRIPTURE</span>
        </div>

        <div className="absolute left-[7.5rem] top-1.5 h-[calc(100%-0.375rem)] w-[calc(100%-7.5rem)] bg-white">
            <div className="absolute right-0 top-0 w-8 h-full bg-transparent" style={{
              clipPath: 'polygon(100% 0, 100% 100%, 0 100%)',
              boxShadow: '-5px 5px 8px rgba(0,0,0,0.3) inset'
            }}>
               <div className="absolute right-0 top-0 w-8 h-full bg-gray-200" style={{
                  clipPath: 'polygon(100% 0, 100% 100%, 0 100%)'
              }}/>
            </div>
            <span className="text-red-800 text-2xl font-bold absolute left-4 top-1/2 -translate-y-1/2">{scripture.reference}</span>
        </div>
      </div>

      <div 
        className="relative -mt-1 bg-red-800 p-4 pl-8 text-white text-lg italic"
        style={{ clipPath: 'polygon(0 0, 100% 0, 98% 100%, 2% 100%)' }}
      >
        <p>{scripture.text}</p>
      </div>
  </div>
);


export default function TvStudioPage() {
  const { toast } = useToast();
  const [isLive, setIsLive] = useState(false);
  const [hasCameraPermission, setHasCameraPermission] = useState(false);
  const [liveStream, setLiveStream] = useState<MediaStream | null>(null);

  const [scenes, setScenes] = useState<Scene[]>(initialScenes);

  const [previewScene, setPreviewScene] = useState<Scene | null>(null);
  const [programScene, setProgramScene] = useState<Scene | null>(
    scenes.find(s => s.id === 'game') || null
  );

  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const programVideoRef = useRef<HTMLVideoElement>(null);
  const cameraPreviewRef = useRef<HTMLVideoElement>(null);

  const [audioLevel, setAudioLevel] = useState(75);
  const [streamTime, setStreamTime] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  const initialBackground =
    PlaceHolderImages.find((p) => p.id === 'studio-background')?.imageUrl || '';
  const [backgroundUrl, setBackgroundUrl] = useState(initialBackground);

  const [scripture, setScripture] = useState<Scripture>({
    reference: "John 3:16",
    text: "For God so loved the world, that he gave his only Son, that whoever believes in him should not perish but have eternal life."
  });
  const [showScriptureOverlay, setShowScriptureOverlay] = useState(false);
  
  const handleGenerateScripture = () => {
    // In a real app, this would fetch a random scripture.
    const scriptures = [
      { reference: "Philippians 4:13", text: "I can do all things through him who strengthens me." },
      { reference: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths." },
      { reference: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope." },
    ];
    setScripture(scriptures[Math.floor(Math.random() * scriptures.length)]);
    toast({ title: "New scripture generated!" });
  };


 useEffect(() => {
    const getCameraPermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        setLiveStream(stream);

        const cameraScene: Scene = {
            id: 'cam1',
            name: 'Main Camera',
            type: 'live',
            sourceStream: stream
        };
        const sideCameraScene: Scene = {
            id: 'cam2',
            name: 'Side Camera',
            type: 'live',
            sourceStream: stream
        };
        setScenes(prev => [cameraScene, sideCameraScene, ...prev]);
        setPreviewScene(cameraScene);

        if (cameraPreviewRef.current) {
          cameraPreviewRef.current.srcObject = stream;
        }

      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        setPreviewScene(initialScenes[0]);
        toast({
          variant: 'destructive',
          title: 'Camera Access Denied',
          description: 'Please enable camera permissions to use live camera feeds.',
        });
      }
    };
    getCameraPermission();

    return () => {
        liveStream?.getTracks().forEach(track => track.stop());
    }
  }, [toast]);


  useEffect(() => {
    const audioInterval = setInterval(() => {
      setAudioLevel(Math.random() * 100);
    }, 300);

    const clockInterval = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => {
      clearInterval(audioInterval);
      clearInterval(clockInterval);
    };
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isLive) {
      timer = setInterval(() => {
        setStreamTime((prev) => prev + 1);
      }, 1000);
    } else {
      setStreamTime(0);
    }
    return () => clearInterval(timer);
  }, [isLive]);
  
  useEffect(() => {
    if (previewVideoRef.current && previewScene?.type === 'live' && previewScene.sourceStream) {
      previewVideoRef.current.srcObject = previewScene.sourceStream;
    }
  }, [previewScene]);
  
  useEffect(() => {
    if (programVideoRef.current && programScene?.type === 'live' && programScene.sourceStream) {
      programVideoRef.current.srcObject = programScene.sourceStream;
    }
  }, [programScene]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600)
      .toString()
      .padStart(2, '0');
    const m = Math.floor((seconds % 3600) / 60)
      .toString()
      .padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleTransition = (type: 'cut' | 'fade') => {
    if (previewScene) {
      setProgramScene(previewScene);
      toast({
        title: type === 'cut' ? 'Cut!' : 'Fade Transition Complete',
        description: `"${previewScene.name}" is now live.`,
      });
    }
  };

  const TransitionButton = ({ label, shortcut }: { label: string, shortcut?: string }) => (
    <Button
      variant="outline"
      className="bg-zinc-700 border-zinc-600 text-zinc-100 hover:bg-zinc-600 w-full justify-between"
      onClick={() => handleTransition(label.toLowerCase() as any)}
    >
      <span>{label}</span>
      {shortcut && <span className="text-xs text-zinc-400">{shortcut}</span>}
    </Button>
  );

  const renderScene = (scene: Scene | null, videoRef: React.RefObject<HTMLVideoElement>, isPreview = false) => {
    if (!scene) return null;
    if (scene.type === 'live' && scene.sourceStream) {
      return <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />;
    }
    return <Image src={scene.sourceUrl || ''} alt={scene.name} fill className="object-cover" data-ai-hint={scene.dataAiHint} />;
  }

  return (
    <div className="h-full flex flex-col gap-4 text-zinc-100 overflow-hidden">
      {backgroundUrl && (
        <Image
          src={backgroundUrl}
          alt="Studio Background"
          fill
          className="object-cover -z-10"
          data-ai-hint="dark gold abstract"
        />
      )}
      <div className="absolute inset-0 bg-black/50 -z-10" />

      <header className="flex items-center justify-between shrink-0 h-16 bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-700 px-4">
        <div className="flex items-center gap-4">
            <div className="h-8 w-1.5 bg-accent rounded-full"></div>
            <div>
                <h2 className="font-bold text-xl tracking-wide text-zinc-100">
                    ROYAL LIFE TV STUDIO
                </h2>
                <p className="text-zinc-400 text-xs">
                    Official broadcast center for Faith Connect Global.
                </p>
            </div>
        </div>
        <Button
          variant={isLive ? 'destructive' : 'default'}
          onClick={() => setIsLive(!isLive)}
        >
          <Power className="mr-2 h-4 w-4" />
          {isLive ? 'Stop Stream' : 'Go Live'}
        </Button>
      </header>

      <main className="grid grid-cols-[1fr_auto_1fr] gap-4 shrink-0">
        <div className="flex flex-col min-h-0">
          <div className="bg-orange-500 text-white font-bold text-sm p-1 px-2 flex justify-between items-center rounded-t-md">
            <span>PREVIEW</span>
            <span>Fallback</span>
          </div>
          <div className="flex-grow bg-black border-2 border-orange-500 rounded-b-md relative overflow-hidden aspect-video">
            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              Source: {previewScene?.name || 'None'}
            </div>
            {renderScene(previewScene, previewVideoRef, true)}
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-start gap-2 w-28">
            <div className="grid grid-cols-[1fr_16px] gap-2 w-full">
                <div className="space-y-1.5 flex flex-col">
                    <TransitionButton label="Quick Play" />
                    <TransitionButton label="Cut" />
                    <TransitionButton label="Fade" shortcut="+" />
                    <TransitionButton label="Wipe" shortcut="+" />
                    <TransitionButton label="Fly" shortcut="+" />
                    <TransitionButton label="Zoom" shortcut="+" />
                    <TransitionButton label="FTB" />
                </div>
                <div className="w-4 h-full bg-zinc-800 rounded-full overflow-hidden relative">
                    <div className="bg-yellow-400 w-full absolute top-0" style={{height: '20%'}}></div>
                    <div className="bg-green-500 w-full absolute bottom-0" style={{height: `${audioLevel * 0.8}%`}}></div>
                </div>
            </div>
            <div className="grid grid-cols-4 gap-1 p-1 bg-zinc-800 rounded-md w-full">
                {Array.from({length: 8}).map((_, i) => (
                    <Button key={i} size="sm" variant="outline" className="h-6 bg-zinc-700 border-zinc-600 text-xs">{i+1}</Button>
                ))}
            </div>
             <div className="w-full space-y-2 py-2">
                <div className="relative w-full h-8 flex items-center justify-center">
                    <div className="w-full h-1 bg-zinc-700 rounded-full"></div>
                    <div className="absolute w-2.5 h-8 bg-zinc-500 border border-zinc-400 rounded-sm cursor-pointer" style={{left: '30%'}}></div>
                </div>
                <div className="w-full h-2 bg-zinc-800 rounded-full"></div>
            </div>
            <div className="w-full bg-black border-2 border-green-500 rounded-md p-2 text-center">
                <p className="font-mono text-green-400 text-lg leading-none">{formatTime(streamTime)}</p>
                <p className="font-mono text-white text-sm leading-none mt-1">{currentTime}</p>
            </div>
        </div>

        <div className="flex flex-col min-h-0">
          <div
            className={cn(
              'text-white font-bold text-sm p-1 px-2 flex justify-between items-center rounded-t-md',
              isLive ? 'bg-red-600' : 'bg-green-600'
            )}
          >
            <span>PROGRAM</span>
            {isLive && <span>LIVE</span>}
          </div>
          <div
            className={cn(
              'flex-grow bg-black border-2 rounded-b-md relative overflow-hidden aspect-video',
              isLive ? 'border-red-600' : 'border-green-600'
            )}
          >
            {showScriptureOverlay && <ScriptureOverlay scripture={scripture} />}
            <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              Source: {programScene?.name || 'None'}
            </div>
             {renderScene(programScene, programVideoRef)}
            
            {programScene?.id === 'game' && previewScene?.id === 'cam1' && previewScene.sourceStream && (
              <div className="absolute bottom-4 right-4 w-1/4 aspect-video rounded-md overflow-hidden border-2 border-primary shadow-lg">
                <video src={previewScene.sourceUrl} autoPlay muted playsInline className="w-full h-full object-cover" />
                <div className="absolute inset-0 border-2 border-primary/50 flex items-center justify-center">
                  <PictureInPicture2 className="h-6 w-6 text-white/50" />
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-grow min-h-0 overflow-y-auto">
        <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 flex flex-col backdrop-blur-sm">
          <div className="flex justify-between items-center pb-2 border-b border-zinc-700 mb-2">
            <h2 className="text-lg font-bold flex items-center gap-2 text-zinc-100">
              <Clapperboard /> Media Manager
            </h2>
            <div className="flex items-center gap-4">
              <Button variant="outline" size="sm">
                <Upload className="mr-2 h-4 w-4" /> Upload
              </Button>
              <div className="flex items-center space-x-2">
                <Switch id="live-cameras" checked={hasCameraPermission} disabled={!hasCameraPermission}/>
                <Label htmlFor="live-cameras" className="text-sm text-zinc-300">
                  Use Live Cameras
                </Label>
              </div>
            </div>
          </div>
          <Tabs defaultValue="scenes" className="flex flex-col flex-grow">
            <TabsList className="bg-zinc-900/80 text-zinc-400">
              <TabsTrigger
                value="scenes"
                className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"
              >
                <FileImage className="mr-2 h-4 w-4" />
                Scenes
              </TabsTrigger>
              <TabsTrigger
                value="cameras"
                className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"
              >
                <Camera className="mr-2 h-4 w-4" />
                Cameras
              </TabsTrigger>
              <TabsTrigger
                value="banners"
                className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"
              >
                <Video className="mr-2 h-4 w-4" />
                Banners
              </TabsTrigger>
              <TabsTrigger
                value="music"
                className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"
              >
                <Music className="mr-2 h-4 w-4" />
                Music
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="scenes"
              className="bg-zinc-900/50 rounded-b-md p-2 flex-grow min-h-0"
            >
              <ScrollArea className="h-full">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 pr-4">
                  {scenes.filter(s => s.type !== 'live').map((scene) => (
                    <button
                      key={scene.id}
                      className={cn(
                        'aspect-video rounded-md relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900',
                        previewScene?.id === scene.id
                          ? 'ring-2 ring-orange-500'
                          : 'ring-1 ring-zinc-700 hover:ring-orange-500'
                      )}
                      onClick={() => setPreviewScene(scene)}
                    >
                      <Image
                        src={scene.sourceUrl || ''}
                        alt={scene.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                      <p className="absolute bottom-1 left-2 text-xs text-white font-semibold truncate">
                        {scene.name}
                      </p>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>
            <TabsContent
                value="cameras"
                className="bg-zinc-900/50 rounded-b-md p-2 flex-grow min-h-0"
            >
                 <ScrollArea className="h-full">
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pr-4">
                        {hasCameraPermission ? scenes.filter(s => s.type === 'live').map(scene => (
                             <button
                                key={scene.id}
                                className={cn(
                                    'aspect-video bg-black rounded-md relative overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900',
                                    previewScene?.id === scene.id
                                    ? 'ring-2 ring-orange-500'
                                    : 'ring-1 ring-zinc-700 hover:ring-orange-500'
                                )}
                                onClick={() => setPreviewScene(scene)}
                                >
                                <video ref={cameraPreviewRef} className="w-full h-full object-cover" autoPlay muted playsInline />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                <p className="absolute bottom-1 left-2 text-xs text-white font-semibold truncate">
                                    {scene.name}
                                </p>
                            </button>
                        )) : (
                            <div className="col-span-full">
                                <Alert variant="destructive">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>No Camera Access</AlertTitle>
                                    <AlertDescription>
                                        Please grant camera permissions in your browser to use this feature.
                                    </AlertDescription>
                                </Alert>
                            </div>
                        )}
                    </div>
                 </ScrollArea>
            </TabsContent>
          </Tabs>
        </div>

        <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 flex flex-col backdrop-blur-sm">
          <Tabs defaultValue="broadcast" className="flex flex-col flex-grow">
            <TabsList className="w-full grid grid-cols-6 bg-zinc-900/80 text-zinc-400">
              <TabsTrigger
                value="broadcast"
                className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"
              >
                Broadcast
              </TabsTrigger>
              <TabsTrigger
                value="automation"
                className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"
              >
                Automation
              </TabsTrigger>
              <TabsTrigger
                value="audio"
                className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"
              >
                <Waves className="mr-2 h-4 w-4"/> Audio
              </TabsTrigger>
              <TabsTrigger
                value="graphics"
                className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"
              >
                Graphics
              </TabsTrigger>
              <TabsTrigger
                value="newsroom"
                className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"
              >
                Newsroom
              </TabsTrigger>
              <TabsTrigger
                value="database"
                className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"
              >
                Database
              </TabsTrigger>
            </TabsList>
            <TabsContent
              value="broadcast"
              className="bg-zinc-900/50 rounded-b-md p-2 flex-grow min-h-0 space-y-4"
            >
              <div className="bg-zinc-800 rounded-lg p-3">
                <h3 className="font-bold flex items-center gap-2 mb-2 text-zinc-100">
                  <Radio className="h-5 w-5" /> Broadcast Controls
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center bg-zinc-900 p-2 rounded">
                    <div className="flex items-center gap-2 text-zinc-300">
                      <div
                        className={cn(
                          'h-2 w-2 rounded-full',
                          isLive ? 'bg-green-500 animate-pulse' : 'bg-zinc-500'
                        )}
                      ></div>
                      <span>{isLive ? 'ONLINE' : 'OFFLINE'}</span>
                    </div>
                    <span className="font-mono text-zinc-300">
                      {formatTime(streamTime)}
                    </span>
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
              <div className="bg-zinc-800 rounded-lg p-3">
                <h3 className="font-bold flex items-center gap-2 mb-2 text-zinc-100">
                  <Shuffle className="h-5 w-5" /> Multistream
                </h3>
                <p className="text-xs text-zinc-400 mb-4">
                  Stream to multiple platforms at once.
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-zinc-100">
                      <Youtube className="h-5 w-5 text-red-600" />
                      <span>YouTube</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <div className="h-2 w-2 rounded-full bg-zinc-500"></div>
                      Offline <Switch />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-zinc-100">
                      <Facebook className="h-5 w-5 text-blue-600" />
                      <span>Facebook</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <div className="h-2 w-2 rounded-full bg-zinc-500"></div>
                      Offline <Switch />
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2 text-zinc-100">
                      <Twitch className="h-5 w-5 text-purple-600" />
                      <span>Twitch</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-zinc-300">
                      <div className="h-2 w-2 rounded-full bg-zinc-500"></div>
                      Offline <Switch />
                    </div>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  className="w-full mt-4 text-xs text-zinc-400 hover:bg-zinc-700 hover:text-zinc-100"
                >
                  <Plus className="mr-2 h-4 w-4" /> Add Custom RTMP
                </Button>
              </div>
            </TabsContent>
            <TabsContent
              value="automation"
              className="bg-zinc-900/50 rounded-b-md p-2 flex-grow min-h-0 space-y-4"
            >
              <div className="bg-zinc-800 rounded-lg p-3">
                <h3 className="font-bold flex items-center gap-2 mb-2 text-zinc-100">
                  <BookText className="h-5 w-5 text-accent" /> Scripture Automation
                </h3>
                <div className="p-3 bg-black/50 rounded-md text-center mb-2">
                    <p className="italic text-zinc-200">"{scripture.text}"</p>
                    <p className="font-bold text-zinc-400 mt-1">{scripture.reference}</p>
                </div>
                <div className="flex items-center justify-between mt-2">
                    <Button variant="outline" size="sm" onClick={handleGenerateScripture}>Generate New</Button>
                    <div className="flex items-center space-x-2">
                        <Switch id="scripture-onair" checked={showScriptureOverlay} onCheckedChange={setShowScriptureOverlay} />
                        <Label htmlFor="scripture-onair" className="text-sm">Show on Program</Label>
                    </div>
                </div>
              </div>
               <div className="bg-zinc-800 rounded-lg p-3">
                <h3 className="font-bold flex items-center gap-2 mb-2 text-zinc-100">
                  <Newspaper className="h-5 w-5 text-accent" /> News Ticker
                </h3>
                <Input placeholder="Enter news ticker text..." className="bg-zinc-900 text-white border-zinc-700"/>
                <div className="flex items-center justify-between mt-2">
                    <Button variant="outline" size="sm">Display Ticker</Button>
                     <div className="flex items-center space-x-2">
                        <Label htmlFor="ticker-onair" className="text-sm">On Air</Label>
                        <Switch id="ticker-onair" />
                    </div>
                </div>
              </div>
               <div className="bg-zinc-800 rounded-lg p-3">
                <h3 className="font-bold flex items-center gap-2 mb-2 text-zinc-100">
                  <Clapperboard className="h-5 w-5 text-accent" /> Video Playlist
                </h3>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                    {videoPlaylist.map((scene, index) => (
                        <div key={scene.id} className="bg-black/50 p-2 rounded-md flex justify-between items-center text-sm">
                            <p>{index + 1}. {scene.name}</p>
                            <p className="text-zinc-400">02:30</p>
                        </div>
                    ))}
                </div>
                 <div className="flex items-center justify-between mt-2">
                    <Button variant="outline" size="sm">Play Next</Button>
                     <div className="flex items-center space-x-2">
                        <Label htmlFor="playlist-auto" className="text-sm">Autoplay</Label>
                        <Switch id="playlist-auto" />
                    </div>
                </div>
              </div>
            </TabsContent>
             <TabsContent value="audio" className="flex-grow min-h-0">
               <AudioMixer />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
