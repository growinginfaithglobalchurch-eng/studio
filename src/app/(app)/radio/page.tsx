
'use client';
import { useState, useEffect, useRef } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Radio,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ListMusic,
  Clock,
  Mic,
} from 'lucide-react';
import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
  limit,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { LivePlayer } from '@/components/podcast/LivePlayer';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';

type Track = {
  title: string;
  url: string;
};

type ScheduleItem = {
  time: string;
  title: string;
  host: string;
};

export default function RadioPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const radioBanner = PlaceHolderImages.find((p) => p.id === 'live-replay-2');
  
  const schedule: ScheduleItem[] = [
    { time: '08:00 AM', title: 'Morning Glory', host: 'DJ Faith' },
    { time: '12:00 PM', title: 'Midday Worship', host: 'The Worship Team' },
    { time: '04:00 PM', title: 'Kingdom Drive Time', host: 'Pastor J' },
    { time: '08:00 PM', title: 'Prophetic Encounter', host: 'Prophetess Norah' },
  ];

  useEffect(() => {
    const playlistDocRef = doc(db, 'radio', 'automatedPlaylist');
    const unsubscribe = onSnapshot(playlistDocRef, (doc) => {
      if (doc.exists()) {
        const data = doc.data();
        if(data.tracks) {
          setPlaylist(data.tracks);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (playlist.length > 0 && audioRef.current) {
        audioRef.current.src = playlist[currentTrackIndex].url;
        if(isPlaying) {
            audioRef.current.play();
        }
    }
  }, [currentTrackIndex, playlist, isPlaying]);


  const handlePlayPause = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => console.error("Audio play failed: ", error));
    }
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    if (!audioRef.current) return;
    audioRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const handleTrackEnd = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };
  
  const currentTrack = playlist[currentTrackIndex];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">
          Faith Connect Radio
        </h1>
        <p className="text-muted-foreground">
          24/7 stream of worship, teaching, and prophetic encouragement.
        </p>
      </div>

      <LivePlayer showType="radio" />

      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2">
            <div className="relative aspect-video">
                {radioBanner && <Image src={radioBanner.imageUrl} alt="Radio Banner" fill className="object-cover" data-ai-hint={radioBanner.imageHint} />}
                 <div className="absolute inset-0 bg-black/50" />
            </div>
          <div className="p-6 flex flex-col justify-center">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Now Playing</p>
                <h2 className="text-xl font-bold text-foreground">
                  {currentTrack?.title || 'Loading...'}
                </h2>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={handleMuteToggle}>
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
                <Button size="icon" onClick={handlePlayPause} className="rounded-full h-12 w-12">
                  {isPlaying ? (
                    <Pause className="h-6 w-6" />
                  ) : (
                    <Play className="h-6 w-6" />
                  )}
                </Button>
              </div>
            </div>
             <audio ref={audioRef} onEnded={handleTrackEnd} />
          </div>
        </div>
      </Card>
      
      <div className="grid md:grid-cols-2 gap-8">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><ListMusic className="h-5 w-5 text-accent"/> Automated Playlist</CardTitle>
                <CardDescription>Our 24/7 stream when no show is live.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 max-h-60 overflow-y-auto">
                {playlist.map((track, index) => (
                    <div key={index} className={`flex items-center gap-3 p-2 rounded-md ${index === currentTrackIndex ? 'bg-primary/20' : ''}`}>
                        <Music className="h-4 w-4"/>
                        <p className="text-sm text-foreground">{track.title}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-accent"/> Daily Schedule</CardTitle>
                <CardDescription>Our featured live shows.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {schedule.map(item => (
                    <div key={item.time} className="flex justify-between items-center">
                        <p className="font-mono text-sm text-muted-foreground">{item.time}</p>
                        <div>
                            <p className="font-semibold text-foreground text-right">{item.title}</p>
                            <p className="text-xs text-muted-foreground text-right">with {item.host}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
