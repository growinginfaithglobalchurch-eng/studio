
'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import {
  Mic,
  PlusCircle,
  Radio,
  Share2,
  Trash2,
  Upload,
  Circle,
  StopCircle,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { startLiveShow, endLiveShow } from '@/app/radio-actions';
import { LiveListenerCount } from './LiveListenerCount';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { db, storage } from '@/lib/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface LiveControlPanelProps {
  isRadio?: boolean;
}

export function LiveControlPanel({ isRadio = false }: LiveControlPanelProps) {
  const [title, setTitle] = useState('');
  const [isLive, setIsLive] = useState(false);
  const [showId, setShowId] = useState<string | null>(null);
  const { toast } = useToast();
  const router = useRouter();

  const [isRecording, setIsRecording] = useState(false);
  const [recordingStartTime, setRecordingStartTime] = useState<number | null>(null);
  const [elapsedTime, setElapsedTime] = useState(0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const [tribe, setTribe] = useState<string | null>(null);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRecording && recordingStartTime) {
      timer = setInterval(() => {
        setElapsedTime(Date.now() - recordingStartTime);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isRecording, recordingStartTime]);
  

  const formatTime = (ms: number) => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60).toString().padStart(2, '0');
    const seconds = (totalSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleStartLive = async () => {
    if (!title.trim()) {
      toast({
        variant: 'destructive',
        title: 'Title is required',
        description: `Please enter a title for the ${isRadio ? 'radio show' : 'podcast'}.`,
      });
      return;
    }
    const newShowId = doc(collection(db, 'liveRooms')).id;
    const result = await startLiveShow(newShowId, title, "Host Name", tribe, isRadio);

    if (result.success) {
      setIsLive(true);
      setShowId(newShowId);
      toast({
        title: 'You are now live!',
        description: `Your ${isRadio ? 'radio show' : 'podcast'} has started.`,
      });
      router.push(`/podcast/host/${newShowId}?isRadio=${isRadio}`);
    } else {
      toast({
        variant: 'destructive',
        title: 'Failed to start',
        description: result.error,
      });
    }
  };

  const handleEndLive = async () => {
    if (!showId) return;
    if (isRecording) {
      await stopRecording(showId);
    }
    const result = await endLiveShow(showId, isRadio);
    if (result.success) {
      setIsLive(false);
      setShowId(null);
      setTitle('');
      toast({
        title: 'Live session ended',
        description: `The ${isRadio ? 'radio show' : 'podcast'} has been successfully ended.`,
      });
    } else {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Could not end the session.'
        })
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      recordedChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      mediaRecorderRef.current.onstop = async () => {
        if (!showId) return;
        const blob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
        
        toast({ title: "Uploading recording..." });
        const storageRef = ref(storage, `${isRadio ? 'radio-recordings' : 'podcast-recordings'}/${showId}.webm`);
        await uploadBytes(storageRef, blob);
        const recordingUrl = await getDownloadURL(storageRef);

        const collectionName = isRadio ? 'radioShows' : 'podcasts';
        await setDoc(doc(db, collectionName, showId), {
            title: title,
            host: "Host Name",
            createdAt: serverTimestamp(),
            recordingUrl: recordingUrl,
            description: `Recording of live session: ${title}`
        }, { merge: true });

        toast({ title: "Recording saved and uploaded!" });

        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
      setRecordingStartTime(Date.now());
      toast({ title: "Recording started!" });

    } catch (error) {
      console.error("Error starting recording:", error);
      toast({ variant: 'destructive', title: "Could not start recording", description: "Please ensure microphone access is granted." });
    }
  };

  const stopRecording = async (currentShowId: string) => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    }
    setIsRecording(false);
    setRecordingStartTime(null);
    setElapsedTime(0);
  };


  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Radio className="h-5 w-5 text-accent" />
          {isRadio ? 'Live Radio Broadcast' : 'Live Podcast Studio'}
        </CardTitle>
        <CardDescription>
          Start a new live session, manage recordings, and view analytics.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isLive ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="session-title">Session Title</Label>
              <Input
                id="session-title"
                placeholder={`e.g., Prophetic Hour - ${new Date().toLocaleDateString()}`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="text-white"
              />
            </div>
             <div>
              <Label>Target Tribe (Optional)</Label>
               <Select onValueChange={setTribe} value={tribe || ''}>
                <SelectTrigger>
                  <SelectValue placeholder="All Tribes (Public)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Tribes (Public)</SelectItem>
                  <SelectItem value="Eagle">Eagles</SelectItem>
                  <SelectItem value="Lion">Lions</SelectItem>
                  <SelectItem value="Marine">Marines</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={handleStartLive} className="w-full" size="lg">
              <Mic className="mr-2" /> Start Live Session
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="p-4 bg-destructive/10 border border-destructive rounded-lg text-center">
              <h3 className="font-bold text-destructive flex items-center justify-center gap-2">
                <Radio className="animate-pulse" />
                SESSION IN PROGRESS
              </h3>
              <p className="text-lg font-semibold text-foreground">{title}</p>
              {showId && <LiveListenerCount roomId={showId} isRadio={isRadio} />}
            </div>
            
            <div className="flex items-center justify-between gap-4 p-4 bg-secondary rounded-lg">
                <div>
                    <h4 className="font-semibold text-foreground">Recording</h4>
                    <p className="text-sm text-muted-foreground">
                        {isRecording ? formatTime(elapsedTime) : 'Not Recording'}
                    </p>
                </div>
                <Button
                    onClick={() => isRecording ? stopRecording(showId!) : startRecording()}
                    variant={isRecording ? "destructive" : "outline"}
                    size="icon"
                    className="w-14 h-14"
                >
                    {isRecording ? <StopCircle className="h-8 w-8"/> : <Circle className="h-8 w-8 text-destructive" />}
                </Button>
            </div>

            <Button onClick={handleEndLive} className="w-full" variant="destructive" size="lg">
              End Live Session
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
