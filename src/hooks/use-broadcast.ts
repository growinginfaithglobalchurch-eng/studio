'use client';

import { useState, useRef, useCallback } from 'react';
import { db } from '@/lib/firebase';
import { doc, setDoc, collection, addDoc, onSnapshot, updateDoc } from 'firebase/firestore';

const servers = {
  iceServers: [
    {
      urls: ['stun:stun1.l.google.com:19302', 'stun:stun2.l.google.com:19302'],
    },
  ],
  iceCandidatePoolSize: 10,
};

export interface BroadcastOptions {
  title: string;
  host: string;
  tribe: string | null;
}

export function useBroadcast(collectionName: 'liveRooms' | 'radioShows') {
  const [isBroadcasting, setIsBroadcasting] = useState(false);
  const [showId, setShowId] = useState<string | null>(null);
  const pcRef = useRef<RTCPeerConnection | null>(null);
  const localStreamRef = useRef<MediaStream | null>(null);

  const startBroadcast = useCallback(async (stream: MediaStream, options: BroadcastOptions) => {
    if (typeof window === 'undefined') {
      console.error("Broadcast is not supported on the server.");
      return;
    }
      
    try {
      localStreamRef.current = stream;

      const pc = new RTCPeerConnection(servers);
      pcRef.current = pc;

      stream.getTracks().forEach((track) => {
        pc.addTrack(track, stream);
      });

      const newShowId = doc(collection(db, collectionName)).id;
      const callDoc = doc(db, collectionName, newShowId);
      const offerCandidates = collection(callDoc, 'offerCandidates');
      const answerCandidates = collection(callDoc, 'answerCandidates');

      pc.onicecandidate = (event) => {
        event.candidate && addDoc(offerCandidates, event.candidate.toJSON());
      };

      const offerDescription = await pc.createOffer();
      await pc.setLocalDescription(offerDescription);

      const offer = {
        sdp: offerDescription.sdp,
        type: offerDescription.type,
      };

      await setDoc(callDoc, { 
          offer, 
          title: options.title, 
          host: options.host,
          isLive: true,
          createdAt: new Date(),
          allowedTribes: options.tribe ? [options.tribe] : ['All']
      });

      onSnapshot(callDoc, (snapshot) => {
          const data = snapshot.data();
          if (data && !pc.currentRemoteDescription && data?.answer) {
              const answerDescription = new RTCSessionDescription(data.answer);
              pc.setRemoteDescription(answerDescription);
          }
      });

      onSnapshot(answerCandidates, (snapshot) => {
        snapshot.docChanges().forEach((change) => {
          if (change.type === 'added') {
            const candidate = new RTCIceCandidate(change.doc.data());
            pc.addIceCandidate(candidate);
          }
        });
      });

      setShowId(newShowId);
      setIsBroadcasting(true);

    } catch (error) {
      console.error("Failed to start broadcast:", error);
    }
  }, [collectionName]);

  const stopBroadcast = useCallback(async () => {
    if (pcRef.current) {
      pcRef.current.close();
      pcRef.current = null;
    }
    
    localStreamRef.current = null;
    
    if (showId) {
      const callDoc = doc(db, collectionName, showId);
      await updateDoc(callDoc, { isLive: false, endedAt: new Date() });
    }

    setIsBroadcasting(false);
    setShowId(null);
  }, [showId, collectionName]);

  return { isBroadcasting, startBroadcast, stopBroadcast, showId };
}
