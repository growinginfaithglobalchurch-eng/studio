
'use client';

import { useEffect, useRef, useState } from 'react';
import { db } from '@/lib/firebase';
import {
  doc,
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
} from 'firebase/firestore';
import { Button } from '../ui/button';
import { LiveListenerCount } from './LiveListenerCount';
import { Mic, Volume2, VolumeX } from 'lucide-react';

interface ViewerProps {
  roomId: string;
  isRadio?: boolean;
}

export function Viewer({ roomId, isRadio = false }: ViewerProps) {
  const [pc, setPc] = useState<RTCPeerConnection | null>(null);
  const [remoteStream, setRemoteStream] = useState<MediaStream | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const collectionName = isRadio ? 'radioShows' : 'liveRooms';

  useEffect(() => {
    const servers = {
      iceServers: [
        {
          urls: [
            'stun:stun1.l.google.com:19302',
            'stun:stun2.l.google.com:19302',
          ],
        },
      ],
      iceCandidatePoolSize: 10,
    };
    const newPc = new RTCPeerConnection(servers);
    setPc(newPc);

    newPc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
    };

    // Auto-cleanup on unmount
    return () => {
      newPc.close();
    };
  }, []);

  useEffect(() => {
    if (audioRef.current && remoteStream) {
      audioRef.current.srcObject = remoteStream;
      audioRef.current.muted = isMuted;
    }
  }, [remoteStream, isMuted]);

  const joinCall = async () => {
    if (!pc) return;

    const callDoc = doc(db, collectionName, roomId);
    const offerCandidates = collection(callDoc, 'offerCandidates');
    const answerCandidates = collection(callDoc, 'answerCandidates');

    pc.onicecandidate = (event) => {
      event.candidate && addDoc(answerCandidates, event.candidate.toJSON());
    };

    const callSnapshot = await onSnapshot(callDoc, (snapshot) => {
        const data = snapshot.data();
        if (data && !pc.currentRemoteDescription && data.offer) {
            const offerDescription = new RTCSessionDescription(data.offer);
            pc.setRemoteDescription(offerDescription);

            pc.createAnswer().then(answerDescription => {
                pc.setLocalDescription(answerDescription);
                const answer = {
                    type: answerDescription.type,
                    sdp: answerDescription.sdp,
                };
                addDoc(collection(db, collectionName, roomId, 'answers'), answer);
            });
        }
    });

    onSnapshot(offerCandidates, (snapshot) => {
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          pc.addIceCandidate(candidate);
        }
      });
    });

    setIsConnected(true);
    if(audioRef.current) {
        audioRef.current.play().catch(e => console.error("Play failed", e));
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  }

  return (
    <div className="p-4 bg-card rounded-lg flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold">Listening to Live Broadcast</h2>
       <LiveListenerCount roomId={roomId} isRadio={isRadio}/>
      {remoteStream ? (
        <div className="flex flex-col items-center gap-4">
          <audio ref={audioRef} autoPlay playsInline className="hidden" />
          <p className="text-green-400 flex items-center gap-2"><Mic className="h-4 w-4"/> Connected</p>
          <Button onClick={toggleMute} variant="secondary" size="lg" className="rounded-full w-24 h-24">
            {isMuted ? <VolumeX className="h-10 w-10" /> : <Volume2 className="h-10 w-10" />}
          </Button>
          <p className="text-sm text-muted-foreground">{isMuted ? 'Unmute to listen' : 'Mute'}</p>
        </div>
      ) : (
        <Button onClick={joinCall} disabled={isConnected}>Join Live Session</Button>
      )}
    </div>
  );
}
