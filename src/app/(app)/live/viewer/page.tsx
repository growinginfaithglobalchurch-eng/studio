
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Send,
  Heart,
  ThumbsUp,
  Hand,
  Flame,
  Menu,
  Download,
} from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Countdown } from '@/components/countdown';
import { db } from '@/lib/firebase';
import { collection, query, where, limit, onSnapshot, doc, updateDoc, addDoc, getDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

const initialMessages = [
  { user: 'Pastor Joseph', text: 'Welcome everyone! So glad you could join us tonight.', tribe: 'All' },
  { user: 'Apostle John', text: 'Amen! The presence of the Lord is strong.', tribe: 'Lion' },
  { user: 'Tribe Eagle', text: 'We are covering this broadcast in prayer. Atmosphere is clear!', tribe: 'Eagle' },
  { user: 'Jane D.', text: 'Feeling the anointing all the way from Brazil!', tribe: '' },
];
const userAvatar = PlaceHolderImages.find(p => p.id === 'avatar-1');

type ScheduleItem = {
  time: string;
  title: string;
  host: string;
};

const schedule: ScheduleItem[] = [
  { time: '08:00 AM', title: 'Morning Glory', host: 'DJ Faith' },
  { time: '12:00 PM', title: 'Midday Worship', host: 'The Worship Team' },
  { time: '04:00 PM', title: 'Kingdom Drive Time', host: 'Pastor J' },
  { time: '08:00 PM', title: 'Prophetic Encounter', host: 'Prophetess Norah' },
];


const PrayTabContent = () => {
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages(prev => [...prev, { user: 'You', text: newMessage, tribe: '' }]);
            setNewMessage('');
        }
    };
    
    return (
        <div className="h-full flex flex-col bg-card">
            <ScrollArea className="flex-grow p-4">
                <div className="space-y-4">
                    {messages.map((msg, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <Avatar className="w-8 h-8 border-2 border-zinc-600">
                                <AvatarFallback>{msg.user.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                                <p className="text-sm font-semibold text-accent">{msg.user} {msg.tribe && <span className="text-xs text-zinc-500">({msg.tribe})</span>}</p>
                                <p className="text-sm text-zinc-200">{msg.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </ScrollArea>
             <div className="p-4 border-t border-zinc-700 space-y-3">
                 <div className="flex justify-around">
                    <Button variant="ghost" size="icon" className="hover:bg-zinc-700"><Heart className="h-6 w-6 text-red-500" /></Button>
                    <Button variant="ghost" size="icon" className="hover:bg-zinc-700"><ThumbsUp className="h-6 w-6 text-blue-500" /></Button>
                    <Button variant="ghost" size="icon" className="hover:bg-zinc-700"><Hand className="h-6 w-6 text-yellow-500" /></Button>
                    <Button variant="ghost" size="icon" className="hover:bg-zinc-700"><Flame className="h-6 w-6 text-orange-500" /></Button>
                </div>
                <div className="flex gap-2">
                    <Avatar className="w-9 h-9">
                        {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="You" data-ai-hint={userAvatar.imageHint} />}
                        <AvatarFallback>Y</AvatarFallback>
                    </Avatar>
                    <Input 
                        placeholder="Say something..." 
                        className="bg-zinc-800 border-zinc-600 text-white flex-1"
                        value={newMessage}
                        onChange={e => setNewMessage(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
                    />
                    <Button onClick={handleSendMessage}>
                        <Send className="h-4 w-4" />
                    </Button>
                </div>
            </div>
        </div>
    )
}

const ScheduleTabContent = () => (
    <div className="p-4 space-y-6 bg-secondary/30">
        <div className="text-left">
            <h3 className="font-semibold text-muted-foreground text-sm">NEXT PROGRAM</h3>
            <Card className="mt-2">
                <CardContent className="p-4 space-y-3 text-center">
                    <p className="text-2xl font-bold">{schedule[0].time}</p>
                    <Countdown targetDate={new Date(new Date().getTime() + 4 * 3600 * 1000 + 9 * 60 * 1000 + 5 * 1000)} />
                </CardContent>
            </Card>
        </div>
        <div>
            <h4 className="font-bold text-muted-foreground mb-2 text-sm">TODAY'S SCHEDULE</h4>
            <div className="space-y-2">
                 {schedule.map(item => (
                    <Card key={item.time}>
                        <CardContent className="p-3">
                            <div className="flex justify-between items-center">
                                <span className="text-lg font-semibold">{item.time}</span>
                                <div>
                                    <p className="font-semibold text-right">{item.title}</p>
                                    <p className="text-xs text-muted-foreground text-right">with {item.host}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    </div>
)

const NotesTabContent = () => {
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const handleDownloadNotes = () => {
    if (!notes.trim()) {
      toast({
        variant: 'destructive',
        title: 'No Notes to Download',
        description: 'Please write some notes before downloading.',
      });
      return;
    }
    const blob = new Blob([notes], { type: 'text/plain;charset=utf-8' });
    const href = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = href;
    const now = new Date();
    const dateStr = `${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')}`;
    link.download = `live-notes-${dateStr}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);

    toast({
        title: "Notes Downloaded",
        description: "Your notes have been saved as a .txt file.",
    });
  };

  return (
    <div className="h-full flex flex-col p-4 bg-secondary/30 space-y-4">
      <Label htmlFor="notes-textarea" className="font-semibold text-muted-foreground">
        My Notes
      </Label>
      <Textarea
        id="notes-textarea"
        placeholder="Type your notes from the session here..."
        className="flex-grow bg-card text-card-foreground border-zinc-700 resize-none"
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
      />
      <Button onClick={handleDownloadNotes} className="w-full">
        <Download className="mr-2 h-4 w-4" />
        Download Notes
      </Button>
    </div>
  );
};

const LiveVideoPlayer = ({ showId }: { showId: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  const joinStream = async () => {
    if (!pcRef.current || !showId) return;

    setIsConnecting(true);
    const pc = pcRef.current;

    const callDoc = doc(db, 'liveRooms', showId);
    const answerCandidates = collection(callDoc, 'answerCandidates');
    const offerCandidates = collection(callDoc, 'offerCandidates');

    pc.onicecandidate = (event) => {
      event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
    };

    const callData = (await getDoc(callDoc)).data();
    if (callData && callData.offer) {
        const offerDescription = new RTCSessionDescription(callData.offer);
        await pc.setRemoteDescription(offerDescription);

        const answerDescription = await pc.createAnswer();
        await pc.setLocalDescription(answerDescription);

        const answer = {
            type: answerDescription.type,
            sdp: answerDescription.sdp,
        };
        await updateDoc(callDoc, { answer });

        onSnapshot(offerCandidates, (snapshot) => {
            snapshot.docChanges().forEach((change) => {
                if (change.type === 'added') {
                    pc.addIceCandidate(new RTCIceCandidate(change.doc.data()));
                }
            });
        });
    }
  };

  useEffect(() => {
    const servers = {
      iceServers: [
        { urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'] },
      ],
      iceCandidatePoolSize: 10,
    };
    const pc = new RTCPeerConnection(servers);
    pcRef.current = pc;

    pc.ontrack = (event) => {
      if (videoRef.current && event.streams[0]) {
        videoRef.current.srcObject = event.streams[0];
        videoRef.current.play().catch(e => console.error("Video play failed:", e));
        setIsConnected(true);
        setIsConnecting(false);
      }
    };
    
    return () => {
      pc.close();
    };
  }, [showId]);

  if (isConnected) {
    return (
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        playsInline
      />
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black text-white">
      <p className="text-lg">The live broadcast is available.</p>
      <Button onClick={joinStream} disabled={isConnecting} className="mt-4">
        {isConnecting ? 'Connecting...' : 'Join Live Broadcast'}
      </Button>
    </div>
  );
};


export default function LiveViewerPage() {
  const [liveShow, setLiveShow] = useState<{ id: string, title: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const logo = PlaceHolderImages.find(p => p.id === 'ministry-logo-1');

  useEffect(() => {
    const q = query(
      collection(db, 'liveRooms'),
      where('isLive', '==', true),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        setLiveShow({ id: doc.id, title: doc.data().title || 'Live Broadcast' });
      } else {
        setLiveShow(null);
      }
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);
  
  return (
    <div className="h-screen w-screen bg-black flex flex-col fixed inset-0">
        <header className="flex-shrink-0 bg-black text-white flex items-center justify-between p-2 h-16">
            <div className="flex items-center gap-2">
                 {logo && (
                    <div className="relative h-12 w-32">
                        <Image
                            src={logo.imageUrl}
                            alt="Royal Life TV"
                            fill
                            className="object-contain"
                            data-ai-hint={logo.imageHint}
                        />
                    </div>
                )}
            </div>
            <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6"/>
            </Button>
        </header>

      <main className="flex-1 flex flex-col min-h-0">
        <div className="relative bg-black">
          <AspectRatio ratio={16 / 9}>
             {isLoading ? (
                <div className="w-full h-full flex items-center justify-center bg-black text-white">
                    <p className="animate-pulse">Searching for live broadcast...</p>
                </div>
              ) : liveShow ? (
                 <LiveVideoPlayer showId={liveShow.id} />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center bg-black text-white gap-4">
                  <p className="text-2xl font-bold">Broadcast is Offline</p>
                </div>
              )}
          </AspectRatio>
        </div>

        <Tabs defaultValue="schedule" className="flex-1 flex flex-col min-h-0 bg-secondary text-card-foreground">
          <TabsList className="grid w-full grid-cols-4 rounded-none h-14 bg-card">
            <TabsTrigger value="pray" className="h-full rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent">Pray</TabsTrigger>
            <TabsTrigger value="schedule" className="h-full rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent">Schedule</TabsTrigger>
            <TabsTrigger value="notes" className="h-full rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent">Notes</TabsTrigger>
            <TabsTrigger value="bible" className="h-full rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent">Bible</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pray" className="flex-1 min-h-0">
              <PrayTabContent />
          </TabsContent>
          <TabsContent value="schedule" className="flex-1 min-h-0 overflow-y-auto">
             <ScheduleTabContent />
          </TabsContent>
          <TabsContent value="notes" className="flex-1 min-h-0">
              <NotesTabContent />
          </TabsContent>
          <TabsContent value="bible" className="flex-1 p-4 bg-secondary/30">
              <p className="text-muted-foreground text-center">Bible feature coming soon.</p>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
