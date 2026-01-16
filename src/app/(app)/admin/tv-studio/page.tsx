
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
  User,
  Shield,
  Eye,
  AudioLines,
  Shuffle,
  PictureInPicture2,
  AlertCircle,
  Waves,
  BookText,
  Newspaper,
  PenLine,
  Text,
  LayoutGrid,
  UserPlus,
  Link as LinkIcon,
  Trash2,
  PlayCircle,
  LayoutPanelLeft,
  RectangleHorizontal,
  Split,
  StopCircle,
  Circle,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AudioMixer } from '@/components/tv-studio/AudioMixer';
import { Input } from '@/components/ui/input';
import { useBroadcast } from '@/hooks/use-broadcast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase';

type Scene = {
  id: string;
  name: string;
  type: 'image' | 'video' | 'live' | 'guest';
  sourceUrl?: string;
  sourceStream?: MediaStream;
  dataAiHint?: string;
  title?: string;
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

type LowerThird = {
  title: string;
  subtitle: string;
};

const musicTracks = [
    { id: 'worship-1', title: 'Atmospheric Worship', duration: '4:32' },
    { id: 'praise-break', title: 'Praise Break Loop', duration: '2:15' },
    { id: 'prayer-bg', title: 'Instrumental Prayer Bed', duration: '8:55' },
    { id: 'intro-sting', title: 'Broadcast Intro Sting', duration: '0:15' },
];

const ScriptureOverlay = ({ scripture }: { scripture: Scripture }) => (
  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[80%] max-w-4xl font-sans z-20">
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

const LowerThirdOverlay = ({ data }: { data: LowerThird }) => (
  <div className="absolute bottom-16 left-8 font-sans z-20 w-[40%] max-w-md">
    <div className="bg-primary p-2">
      <h3 className="text-2xl font-bold text-primary-foreground">{data.title}</h3>
    </div>
    <div className="bg-black/80 p-2">
      <p className="text-lg text-white">{data.subtitle}</p>
    </div>
  </div>
);

const NewsTickerOverlay = ({ text }: { text: string }) => (
    <div className="absolute bottom-0 left-0 w-full h-10 bg-black/80 flex items-center overflow-hidden z-20">
        <p className="text-white text-lg font-semibold whitespace-nowrap animate-marquee">{text}</p>
        <style jsx>{`
            @keyframes marquee {
                0% { transform: translateX(100%); }
                100% { transform: translateX(-100%); }
            }
            .animate-marquee {
                animation: marquee 15s linear infinite;
                padding-left: 100%;
            }
        `}</style>
    </div>
);

export default function TvStudioPage() {
  const { toast } = useToast();
  const { isBroadcasting: isLive, startBroadcast, stopBroadcast, showId } = useBroadcast('liveRooms');
  const [mediaStream, setMediaStream] = useState<MediaStream | null>(null);

  const [useLiveCameras, setUseLiveCameras] = useState(false);
  const [liveStream, setLiveStream] = useState<MediaStream | null>(null);
  const [layout, setLayout] = useState<'fullscreen' | 'split-equal' | 'split-focus'>('fullscreen');
  const [scenes, setScenes] = useState<Scene[]>(initialScenes);

  const [previewScene, setPreviewScene] = useState<Scene | null>(null);
  const [programScene, setProgramScene] = useState<Scene | null>(
    scenes.find(s => s.id === 'game') || null
  );

  const previewVideoRef = useRef<HTMLVideoElement>(null);
  const programVideoRef = useRef<HTMLVideoElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
  const [showLowerThird, setShowLowerThird] = useState(false);
  const [lowerThirdData, setLowerThirdData] = useState<LowerThird>({ title: 'Joseph Tryson', subtitle: 'The Bondservant of Christ' });
  const [showLogoBug, setShowLogoBug] = useState(false);
  const logoScene = scenes.find(s => s.id === 'logo');
  
  const guests = scenes.filter(s => s.type === 'guest');
  const activeGuest = guests.length > 0 ? guests[0] : null;

  const [newsTickerText, setNewsTickerText] = useState('');
  const [showNewsTicker, setShowNewsTicker] = useState(false);
  
  const [videoPlaylistIndex, setVideoPlaylistIndex] = useState(0);
  const [videoPlaylistAutoplay, setVideoPlaylistAutoplay] = useState(false);

  // Recording state
  const [isRecording, setIsRecording] = useState(false);
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording && recordingStartTime) {
      timer = setInterval(() => {
        setElapsedTime(Date.now() - recordingStartTime);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording, recordingStartTime]);


  const handleLayoutChange = (newLayout: 'fullscreen' | 'split-equal' | 'split-focus') => {
    if ((newLayout === 'split-equal' || newLayout === 'split-focus') && guests.length === 0) {
        toast({
            variant: 'destructive',
            title: 'No Guest Available',
            description: 'Add a guest from the "Guests" tab to use split-screen layouts.',
        });
        return;
    }
    setLayout(newLayout);
  };

  const handleGenerateScripture = () => {
    const scriptures = [
      { reference: "Philippians 4:13", text: "I can do all things through him who strengthens me." },
      { reference: "Proverbs 3:5-6", text: "Trust in the Lord with all your heart, and do not lean on your own understanding. In all your ways acknowledge him, and he will make straight your paths." },
      { reference: "Jeremiah 29:11", text: "For I know the plans I have for you, declares the Lord, plans for welfare and not for evil, to give you a future and a hope." },
    ];
    setScripture(scriptures[Math.floor(Math.random() * scriptures.length)]);
    toast({ title: "New scripture generated!" });
  };
  
 const handleCameraToggle = async (checked: boolean) => {
    setUseLiveCameras(checked);
    if (checked) {
      if (typeof window !== 'undefined' && navigator.mediaDevices?.getUserMedia) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          setLiveStream(stream);

          const cameraScene: Scene = {
              id: 'cam1',
              name: 'Main Camera',
              type: 'live',
              sourceStream: stream
          };
          // To simulate a second camera, we use the same stream. In a real app, you'd use a different device.
          const sideCameraScene: Scene = {
              id: 'cam2',
              name: 'Side Camera',
              type: 'live',
              sourceStream: stream
          };
          setScenes(prev => [...prev.filter(s => s.type !== 'live'), cameraScene, sideCameraScene]);
          setPreviewScene(cameraScene);

        } catch (error) {
          console.error('Error accessing camera:', error);
          setUseLiveCameras(false);
          setPreviewScene(initialScenes[0]); // fallback
          toast({
            variant: 'destructive',
            title: 'Camera Access Denied',
            description: 'Please enable camera permissions to use live camera feeds.',
          });
        }
      }
    } else {
      liveStream?.getTracks().forEach(track => track.stop());
      setLiveStream(null);
      setScenes(prev => prev.filter(s => s.type !== 'live'));
      if (previewScene?.type === 'live') {
        setPreviewScene(null);
      }
    }
  };


  useEffect(() => {
    // Cleanup stream on component unmount
    return () => {
        liveStream?.getTracks().forEach(track => track.stop());
    }
  }, [liveStream]);


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

  const formatTimeMs = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');
    return `${h}:${m}:${s}`;
  };

  const handleTransition = (type: string) => {
    const transitionName = type.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase());

    if (type === 'ftb') {
        setProgramScene(null);
        toast({ title: 'Fade to Black' });
        return;
    }

    if (type === 'quick-play') {
        const introScene = scenes.find(s => s.id === 'intro');
        if (introScene) {
            setProgramScene(introScene);
            toast({ title: 'Quick Play!', description: `Playing "${introScene.name}"` });
        } else {
            toast({
                variant: 'destructive',
                title: 'Quick Play Failed',
                description: 'Intro scene not found.',
            });
        }
        return;
    }
    
    if (!previewScene) {
        toast({
            variant: 'destructive',
            title: 'No Scene in Preview',
            description: 'Select a scene to transition to.',
        });
        return;
    }
    
    setProgramScene(previewScene);
    toast({
      title: `${transitionName} Transition!`,
      description: `"${previewScene.name}" is now live.`,
    });
};

const handleLiveToggle = async () => {
    if (isLive) {
      if (isRecording) {
        await handleToggleRecord(); // Stop recording if it's active
      }
      stopBroadcast();
      mediaStream?.getTracks().forEach(track => track.stop());
      setMediaStream(null);
      toast({ title: 'Stream Stopped', description: 'Your broadcast has ended.' });
    } else {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: true });
        setMediaStream(stream);
        // Ensure stream is active before starting broadcast
        stream.onactive = () => {
            startBroadcast(stream, {
              title: programScene?.name || 'Live Broadcast',
              host: 'Royal Life TV',
              tribe: 'all', // For now, can be updated later
            });
            toast({ title: 'Going Live!', description: 'Your broadcast is starting...' });
        };
      } catch (err) {
        console.error("Error getting display media", err);
        toast({ variant: 'destructive', title: 'Could not start stream', description: 'Permission to share screen was denied.' });
      }
    }
  };

  const handleToggleRecord = async () => {
    if (isRecording) {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);
        setRecordingStartTime(null);
    } else {
        if (!isLive || !mediaStream) {
            toast({
                variant: 'destructive',
                title: 'Not Live',
                description: 'You must be live to start recording.',
            });
            return;
        }

        try {
            mediaRecorderRef.current = new MediaRecorder(mediaStream, { mimeType: 'video/webm' });
            recordedChunksRef.current = [];

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    recordedChunksRef.current.push(event.data);
                }
            };

            mediaRecorderRef.current.onstop = async () => {
                if (!showId) return;
                const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
                
                setIsUploading(true);
                toast({ title: "Uploading recording..." });

                try {
                    const storageRef = ref(storage, `tv-studio-recordings/${showId}.webm`);
                    await uploadBytes(storageRef, blob);
                    const recordingUrl = await getDownloadURL(storageRef);

                    const showDocRef = doc(db, 'liveRooms', showId);
                    await updateDoc(showDocRef, { recordingUrl });
                    
                    toast({ title: "Recording saved and uploaded!" });
                } catch (error) {
                    console.error("Upload failed", error);
                    toast({ variant: 'destructive', title: "Upload Failed", description: "Could not save the recording." });
                } finally {
                    setIsUploading(false);
                }
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
            setRecordingStartTime(Date.now());
            toast({ title: "Recording started!" });

        } catch (error) {
            console.error("Error starting recording:", error);
            toast({ variant: 'destructive', title: "Could not start recording", description: "Please ensure microphone access is granted." });
        }
    }
};


  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const fileType = file.type.startsWith('video/') ? 'video' : 'image';
    const newScene: Scene = {
      id: `local-${Date.now()}`,
      name: file.name,
      type: fileType,
      sourceUrl: URL.createObjectURL(file),
      dataAiHint: 'custom upload',
    };

    setScenes(prev => [newScene, ...prev]);
    setPreviewScene(newScene);

    toast({
      title: 'Upload Successful',
      description: `"${file.name}" has been added to your scenes.`,
    });
  };

  const handleAddGuest = () => {
    const newGuestId = `guest-${Date.now()}`;
    const guestNum = guests.length + 1;
    const newGuest: Scene = {
      id: newGuestId,
      name: `Guest ${guestNum}`,
      title: 'New Guest',
      type: 'guest',
      sourceUrl: `https://picsum.photos/seed/${newGuestId}/1280/720`,
      dataAiHint: 'remote speaker feed',
    };
    setScenes(prev => [...prev, newGuest]);
    toast({
      title: 'Guest Invited!',
      description: `${newGuest.name} has been added to your camera sources.`,
    });
  };
  
  const handleRemoveGuest = (guestId: string) => {
    setScenes(prev => prev.filter(s => s.id !== guestId));
    toast({
      title: 'Guest Removed',
      description: 'The guest has been removed from your sources.',
    });
  };

  const TransitionButton = ({ label, shortcut }: { label: string, shortcut?: string }) => (
    <Button
      variant="outline"
      className="bg-zinc-700 border-zinc-600 text-zinc-100 hover:bg-zinc-600 w-full justify-between"
      onClick={() => handleTransition(label.toLowerCase().replace(' ', '-'))}
    >
      <span>{label}</span>
      {shortcut && <span className="text-xs text-zinc-400">{shortcut}</span>}
    </Button>
  );

  const renderScene = (scene: Scene | null | undefined, videoRef: React.RefObject<HTMLVideoElement> | null, isPreview = false) => {
    if (!scene) return null;
    if (scene.type === 'live' && scene.sourceStream) {
      return <video ref={videoRef} className="w-full h-full object-cover" autoPlay muted playsInline />;
    }
    if (scene.type === 'video' || scene.type === 'guest') {
       return <video ref={videoRef} src={scene.sourceUrl} className="w-full h-full object-cover" autoPlay loop muted playsInline />;
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

        {/* Fixed Header */}
        <header className="flex-shrink-0">
           <div className="flex items-center justify-between h-16 bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-700 px-4">
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
                   onClick={handleLiveToggle}
               >
                   <Power className="mr-2 h-4 w-4" />
                   {isLive ? 'Stop Stream' : 'Go Live'}
               </Button>
           </div>
        </header>

        {/* Fixed Monitors */}
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
                {programScene === null ? (
                    <div className="w-full h-full bg-black flex items-center justify-center">
                        <p className="text-zinc-600">Faded to Black</p>
                    </div>
                ) : (
                <>
                    {showScriptureOverlay && <ScriptureOverlay scripture={scripture} />}
                    {showLowerThird && <LowerThirdOverlay data={lowerThirdData} />}
                    {showLogoBug && logoScene && (
                    <div className="absolute top-4 right-4 w-24 h-24 z-20">
                        <Image src={logoScene.sourceUrl!} alt="Station Logo" fill className="object-contain" />
                    </div>
                    )}
                    {showNewsTicker && <NewsTickerOverlay text={newsTickerText} />}

                    {/* Main Program Renderer */}
                    {layout === 'fullscreen' && (
                    <div className="absolute inset-0">
                        {renderScene(programScene, programVideoRef)}
                        <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                            Source: {programScene?.name || 'None'}
                        </div>
                        {programScene?.id === 'game' && previewScene?.type === 'live' && (
                        <div className="absolute bottom-4 right-4 w-1/4 aspect-video rounded-md overflow-hidden border-2 border-primary shadow-lg">
                            {renderScene(previewScene, null)}
                            <div className="absolute inset-0 border-2 border-primary/50 flex items-center justify-center">
                            <PictureInPicture2 className="h-6 w-6 text-white/50" />
                            </div>
                        </div>
                        )}
                    </div>
                    )}
                    {layout === 'split-equal' && (
                        <div className="flex w-full h-full">
                            <div className="w-1/2 h-full relative border-r-2 border-zinc-700">
                                {renderScene(programScene, programVideoRef)}
                                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                    {programScene?.name || 'Host'}
                                </div>
                            </div>
                            <div className="w-1/2 h-full relative">
                                {renderScene(activeGuest, null)}
                                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                    {activeGuest?.name}
                                </div>
                            </div>
                        </div>
                    )}
                    {layout === 'split-focus' && (
                        <div className="flex w-full h-full">
                            <div className="w-2/3 h-full relative border-r-2 border-zinc-700">
                                {renderScene(programScene, programVideoRef)}
                                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                    {programScene?.name || 'Host'}
                                </div>
                            </div>
                            <div className="w-1/3 h-full relative">
                                {renderScene(activeGuest, null)}
                                <div className="absolute bottom-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                                    {activeGuest?.name}
                                </div>
                            </div>
                        </div>
                    )}
                </>
            )}
            </div>
            </div>
        </main>

        {/* Scrollable Controls */}
        <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-4 min-h-0 overflow-y-auto pb-4">
            <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 flex flex-col backdrop-blur-sm">
            <div className="flex justify-between items-center pb-2 border-b border-zinc-700 mb-2">
                <h2 className="text-lg font-bold flex items-center gap-2 text-zinc-100">
                <Clapperboard /> Media Manager
                </h2>
                <div className="flex items-center gap-4">
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} accept="image/*,video/*" className="hidden" />
                <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()}>
                    <Upload className="mr-2 h-4 w-4" /> Upload
                </Button>
                <div className="flex items-center space-x-2">
                    <Switch id="live-cameras" checked={useLiveCameras} onCheckedChange={handleCameraToggle}/>
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
                    {scenes.filter(s => s.type !== 'live' && s.type !== 'guest').map((scene) => (
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
                        <div className="space-y-4">
                            <div>
                                <h4 className="text-xs font-bold text-zinc-400 mb-2 px-2">LIVE CAMERAS</h4>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pr-4">
                                    {useLiveCameras && liveStream ? scenes.filter(s => s.type === 'live').map(scene => (
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
                                            <video ref={el => { if (el) el.srcObject = scene.sourceStream!}} className="w-full h-full object-cover" autoPlay muted playsInline />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                            <p className="absolute bottom-1 left-2 text-xs text-white font-semibold truncate">
                                                {scene.name}
                                            </p>
                                        </button>
                                    )) : (
                                        <div className="col-span-full">
                                            <Alert variant="destructive">
                                                <AlertCircle className="h-4 w-4" />
                                                <AlertTitle>Cameras Inactive</AlertTitle>
                                                <AlertDescription>
                                                    Enable the "Use Live Cameras" switch to activate camera feeds.
                                                </AlertDescription>
                                            </Alert>
                                        </div>
                                    )}
                                </div>
                            </div>
                             <div>
                                <h4 className="text-xs font-bold text-zinc-400 mb-2 px-2">GUESTS</h4>
                                 <div className="grid grid-cols-2 md:grid-cols-3 gap-2 pr-4">
                                    {guests.length > 0 ? scenes.filter(s => s.type === 'guest').map(scene => (
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
                                            <Image src={scene.sourceUrl!} alt={scene.name} fill className="object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                                            <p className="absolute bottom-1 left-2 text-xs text-white font-semibold truncate">
                                                {scene.name}
                                            </p>
                                        </button>
                                    )) : (
                                         <div className="col-span-full p-4 text-center text-sm text-zinc-500">
                                            No guests have been added.
                                        </div>
                                    )}
                                 </div>
                             </div>
                        </div>
                    </ScrollArea>
                </TabsContent>
                <TabsContent
                    value="banners"
                    className="bg-zinc-900/50 rounded-b-md p-2 flex-grow min-h-0"
                >
                    <div className="flex items-center justify-center h-full">
                        <p className="text-zinc-500 text-sm">Banner content coming soon.</p>
                    </div>
                </TabsContent>
                <TabsContent
                    value="music"
                    className="bg-zinc-900/50 rounded-b-md p-2 flex-grow min-h-0"
                >
                    <ScrollArea className="h-full">
                        <div className="space-y-2 pr-4">
                            {musicTracks.map((track) => (
                                <div
                                    key={track.id}
                                    className="flex items-center justify-between bg-zinc-900 p-2 rounded-md"
                                >
                                    <div className="flex items-center gap-3">
                                        <Music className="h-4 w-4 text-zinc-400" />
                                        <div>
                                            <p className="text-sm font-semibold text-zinc-100">{track.title}</p>
                                            <p className="text-xs text-zinc-500">{track.duration}</p>
                                        </div>
                                    </div>
                                    <Button variant="ghost" size="icon" onClick={() => toast({ title: `Playing: ${track.title}` })}>
                                        <PlayCircle className="h-5 w-5 text-accent" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </ScrollArea>
                </TabsContent>
            </Tabs>
            </div>

            <div className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 flex flex-col backdrop-blur-sm">
            <Tabs defaultValue="broadcast" className="flex flex-col flex-grow">
                <TabsList className="w-full grid grid-cols-7 bg-zinc-900/80 text-zinc-400">
                <TabsTrigger value="broadcast" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100">Broadcast</TabsTrigger>
                <TabsTrigger value="layouts" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"><LayoutGrid className="mr-2 h-4 w-4" />Layouts</TabsTrigger>
                <TabsTrigger value="guests" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"><UserPlus className="mr-2 h-4 w-4" />Guests</TabsTrigger>
                <TabsTrigger value="automation" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100">Automation</TabsTrigger>
                <TabsTrigger value="audio" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100"><Waves className="mr-2 h-4 w-4"/> Audio</TabsTrigger>
                <TabsTrigger value="graphics" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100">Graphics</TabsTrigger>
                <TabsTrigger value="newsroom" className="data-[state=active]:bg-zinc-700 data-[state=active]:text-zinc-100">Newsroom</TabsTrigger>
                </TabsList>
                <TabsContent value="broadcast" className="bg-zinc-900/50 rounded-b-md p-2 flex-grow min-h-0 space-y-4">
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
                            <div className={cn('h-2 w-2 rounded-full', isRecording ? 'bg-red-500 animate-pulse' : 'bg-zinc-500')}></div>
                            <span>{isRecording ? 'RECORDING' : 'NOT RECORDING'}</span>
                          </div>
                          <span className="font-mono text-zinc-300">{formatTimeMs(elapsedTime)}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 pt-2">
                        <Button variant="outline" onClick={handleLiveToggle} disabled={isUploading}>
                            {isLive ? <StopCircle className="mr-2" /> : <PlayCircle className="mr-2" />}
                            {isLive ? 'Stop Stream' : 'Start Stream'}
                        </Button>
                        <Button variant={isRecording ? 'destructive' : 'outline'} onClick={handleToggleRecord} disabled={!isLive || isUploading}>
                            {isRecording ? <StopCircle className="mr-2" /> : <Circle className="mr-2 h-4 w-4 text-destructive fill-destructive" />}
                            {isUploading ? 'Uploading...' : (isRecording ? 'Stop Record' : 'Start Record')}
                        </Button>
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
                <TabsContent value="layouts" className="bg-zinc-900/50 rounded-b-md p-2 flex-grow min-h-0 space-y-4">
                    <div className="bg-zinc-800 rounded-lg p-3">
                        <h3 className="font-bold flex items-center gap-2 mb-2 text-zinc-100">
                            <LayoutGrid className="h-5 w-5 text-accent" />
                            Scene Layouts
                        </h3>
                        <div className="grid grid-cols-3 gap-2">
                            <Button variant={layout === 'fullscreen' ? 'secondary' : 'outline'} className="h-20 flex-col" onClick={() => handleLayoutChange('fullscreen')}>
                                <RectangleHorizontal className="h-6 w-6"/>
                                <span className="text-xs mt-1">Fullscreen</span>
                            </Button>
                            <Button variant={layout === 'split-equal' ? 'secondary' : 'outline'} className="h-20 flex-col" onClick={() => handleLayoutChange('split-equal')}>
                                <Split className="h-6 w-6"/>
                                <span className="text-xs mt-1">Split 50/50</span>
                            </Button>
                            <Button variant={layout === 'split-focus' ? 'secondary' : 'outline'} className="h-20 flex-col" onClick={() => handleLayoutChange('split-focus')}>
                                <LayoutPanelLeft className="h-6 w-6"/>
                                <span className="text-xs mt-1">Focus Left</span>
                            </Button>
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="guests" className="bg-zinc-900/50 rounded-b-md p-2 flex-grow min-h-0 space-y-4">
                    <div className="bg-zinc-800 rounded-lg p-3">
                        <h3 className="font-bold flex items-center gap-2 mb-2 text-zinc-100">
                            Guest Management
                        </h3>
                        <p className="text-xs text-zinc-400 mb-4">
                            Invite guests to join your broadcast. Their video will appear as a source in the "Cameras" tab.
                        </p>
                        <Button
                            variant="outline"
                            className="w-full"
                            onClick={handleAddGuest}
                        >
                            <LinkIcon className="mr-2 h-4 w-4" /> Generate Invite Link
                        </Button>
                    </div>
                    <div className="bg-zinc-800 rounded-lg p-3 space-y-3">
                      <h3 className="font-bold text-zinc-100">Current Guests</h3>
                       {guests.length > 0 ? scenes.filter(s => s.type === 'guest').map(g => (
                          <div key={g.id} className="flex items-center justify-between gap-3 bg-zinc-900 p-2 rounded-md">
                              <div className="flex items-center gap-3">
                                  <div className="relative w-16 h-9 rounded-md bg-black overflow-hidden">
                                      <Image src={g.sourceUrl!} alt={g.name} fill className="object-cover"/>
                                  </div>
                                  <div>
                                      <p className="font-semibold">{g.name}</p>
                                      <p className="text-xs text-zinc-400">{g.title}</p>
                                  </div>
                              </div>
                              <Button variant="destructive" size="icon" className="h-8 w-8" onClick={() => handleRemoveGuest(g.id)}>
                                  <Trash2 className="h-4 w-4" />
                              </Button>
                          </div>
                      )) : (
                           <p className="text-center text-sm text-zinc-500 py-4">No guests invited.</p>
                      )}
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
                    <Input placeholder="Enter news ticker text..." value={newsTickerText} onChange={(e) => setNewsTickerText(e.target.value)} className="bg-zinc-900 text-white border-zinc-700"/>
                    <div className="flex items-center justify-between mt-2">
                        <Button variant="outline" size="sm" onClick={() => setShowNewsTicker(true)}>Display Ticker</Button>
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="ticker-onair" className="text-sm">On Air</Label>
                            <Switch id="ticker-onair" checked={showNewsTicker} onCheckedChange={setShowNewsTicker}/>
                        </div>
                    </div>
                </div>
                <div className="bg-zinc-800 rounded-lg p-3">
                    <h3 className="font-bold flex items-center gap-2 mb-2 text-zinc-100">
                    <Clapperboard className="h-5 w-5 text-accent" /> Video Playlist
                    </h3>
                    <div className="space-y-2 max-h-32 overflow-y-auto">
                        {videoPlaylist.map((scene, index) => (
                            <div key={scene.id} className={cn("bg-black/50 p-2 rounded-md flex justify-between items-center text-sm", videoPlaylistIndex === index && "ring-2 ring-primary")}>
                                <p>{index + 1}. {scene.name}</p>
                                <p className="text-zinc-400">02:30</p>
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <Button variant="outline" size="sm" onClick={() => setVideoPlaylistIndex(i => (i + 1) % videoPlaylist.length)}>Play Next</Button>
                        <div className="flex items-center space-x-2">
                            <Label htmlFor="playlist-auto" className="text-sm">Autoplay</Label>
                            <Switch id="playlist-auto" checked={videoPlaylistAutoplay} onCheckedChange={setVideoPlaylistAutoplay}/>
                        </div>
                    </div>
                </div>
                </TabsContent>
                <TabsContent value="audio" className="flex-grow min-h-0">
                <AudioMixer />
                </TabsContent>
                <TabsContent
                value="graphics"
                className="bg-zinc-900/50 rounded-b-md p-2 flex-grow min-h-0 space-y-4"
                >
                <div className="bg-zinc-800 rounded-lg p-3">
                    <h3 className="font-bold flex items-center gap-2 mb-2 text-zinc-100">
                    <PenLine className="h-5 w-5 text-accent" /> Lower Thirds
                    </h3>
                    <div className="space-y-2">
                    <Input placeholder="Title (e.g., Pastor John Doe)" value={lowerThirdData.title} onChange={(e) => setLowerThirdData(d => ({ ...d, title: e.target.value }))} className="bg-zinc-900 text-white border-zinc-700"/>
                    <Input placeholder="Subtitle (e.g., Lead Pastor)" value={lowerThirdData.subtitle} onChange={(e) => setLowerThirdData(d => ({ ...d, subtitle: e.target.value }))} className="bg-zinc-900 text-white border-zinc-700"/>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                        <Button variant="outline" size="sm" onClick={() => setShowLowerThird(!showLowerThird)}>
                        {showLowerThird ? 'Hide Lower Third' : 'Show Lower Third'}
                        </Button>
                        <div className="flex items-center space-x-2">
                            <Switch id="lowerthird-onair" checked={showLowerThird} onCheckedChange={setShowLowerThird} />
                            <Label htmlFor="lowerthird-onair" className="text-sm">On Air</Label>
                        </div>
                    </div>
                </div>
                <div className="bg-zinc-800 rounded-lg p-3">
                    <h3 className="font-bold flex items-center gap-2 mb-2 text-zinc-100">
                    <Text className="h-5 w-5 text-accent" /> Station Logo Bug
                    </h3>
                    <div className="flex items-center justify-between">
                        <p className="text-sm text-zinc-300">Show logo in top-right corner</p>
                        <Switch id="logo-onair" checked={showLogoBug} onCheckedChange={setShowLogoBug} />
                    </div>
                </div>
                <div className="bg-zinc-800 rounded-lg p-3">
                    <h3 className="font-bold flex items-center gap-2 mb-2 text-zinc-100">
                    <FileImage className="h-5 w-5 text-accent" /> Full-Screen Graphics
                    </h3>
                    <ScrollArea className="h-40">
                    <div className="space-y-2 pr-4">
                        {scenes.filter(s => s.type === 'image').map(scene => (
                        <div key={scene.id} className="flex items-center justify-between bg-zinc-900 p-2 rounded-md">
                            <p className="text-sm text-zinc-200">{scene.name}</p>
                            <Button variant="outline" size="xs" onClick={() => setProgramScene(scene)}>Send to Program</Button>
                        </div>
                        ))}
                    </div>
                    </ScrollArea>
                </div>
                </TabsContent>
            </Tabs>
            </div>
        </div>
    </div>
  );
}
