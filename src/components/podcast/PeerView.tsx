
'use client';

import { useEffect, useRef, useState } from 'react';

interface PeerViewProps {
  stream: MediaStream;
}

export function PeerView({ stream }: PeerViewProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (audioRef.current && stream) {
      audioRef.current.srcObject = stream;
      setIsReady(true);
    }
  }, [stream]);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error('Audio play failed:', error);
      });
    }
  };

  return (
    <div>
      <audio ref={audioRef} autoPlay playsInline />
      {!isReady && <p>Connecting to stream...</p>}
      {isReady && (
        <button onClick={playAudio}>
          Click to play (if audio doesn't start automatically)
        </button>
      )}
    </div>
  );
}
