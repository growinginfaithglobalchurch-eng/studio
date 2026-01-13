
'use client';

import { useEffect, useRef, useState } from 'react';
import { Button } from '../ui/button';
import { Mic, MicOff } from 'lucide-react';
import { LiveListenerCount } from './LiveListenerCount';

interface HostViewProps {
  roomId: string;
  isRadio?: boolean;
}

export function HostView({ roomId, isRadio = false }: HostViewProps) {
  const [isMuted, setIsMuted] = useState(true);
  const localStreamRef = useRef<MediaStream | null>(null);
  const rtcPeerConnectionRef = useRef<RTCPeerConnection | null>(null);

  useEffect(() => {
    const startStream = async () => {
      // Get user's microphone
      localStreamRef.current = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });

      // Mute by default
      localStreamRef.current.getAudioTracks()[0].enabled = false;
    };

    startStream();

    // Cleanup: stop media stream when component unmounts
    return () => {
      localStreamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  const toggleMute = () => {
    if (localStreamRef.current) {
      const audioTrack = localStreamRef.current.getAudioTracks()[0];
      audioTrack.enabled = !audioTrack.enabled;
      setIsMuted(!audioTrack.enabled);
    }
  };

  return (
    <div className="p-4 bg-card rounded-lg flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">You are LIVE</h2>
      <div className="bg-destructive text-destructive-foreground px-3 py-1 rounded-md flex items-center gap-2">
        <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
        <span>LIVE</span>
      </div>

      <LiveListenerCount roomId={roomId} isRadio={isRadio} />

      <Button
        onClick={toggleMute}
        variant={isMuted ? 'destructive' : 'secondary'}
        size="lg"
        className="rounded-full w-24 h-24"
      >
        {isMuted ? (
          <MicOff className="h-10 w-10" />
        ) : (
          <Mic className="h-10 w-10" />
        )}
      </Button>
      <p className="text-sm text-muted-foreground">
        {isMuted ? 'You are muted' : 'You are live'}
      </p>
    </div>
  );
}
