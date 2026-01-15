
'use client';

import { useState, useEffect } from 'react';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Ear, Waves } from 'lucide-react';

type ChannelProps = {
  label: string;
  color: string;
};

const AudioChannel = ({ label, color }: ChannelProps) => {
  const [level, setLevel] = useState(Math.random() * 75);
  const [isMuted, setIsMuted] = useState(false);
  const [isSolo, setIsSolo] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isMuted) {
        setLevel(Math.random() * (isSolo ? 90 : 75));
      } else {
        setLevel(0);
      }
    }, 300 + Math.random() * 200);
    return () => clearInterval(interval);
  }, [isMuted, isSolo]);

  return (
    <div className="flex flex-col items-center gap-2 p-2 bg-zinc-800 rounded-lg">
      <div className="relative w-full h-32 bg-black rounded-sm overflow-hidden border border-zinc-700">
        <div className="absolute bottom-0 w-full bg-zinc-700" style={{ height: `${level}%` }}></div>
        <div 
          className="absolute bottom-0 w-full transition-all duration-75"
          style={{ 
            height: `${level}%`,
            background: `linear-gradient(to top, ${color}, transparent)`
          }}
        ></div>
        <div className={cn("absolute top-0 w-full h-0.5 bg-red-500", level > 95 ? 'block' : 'hidden')}></div>
      </div>
      <Slider
        defaultValue={[75]}
        max={100}
        step={1}
        orientation="vertical"
        className="h-32"
        disabled={isMuted}
      />
      <div className="flex gap-1 w-full">
        <button 
            onClick={() => setIsMuted(!isMuted)}
            className={cn("w-full text-xs font-bold rounded p-1", isMuted ? 'bg-red-600 text-white' : 'bg-zinc-700 text-zinc-300')}
        >
            M
        </button>
        <button 
            onClick={() => setIsSolo(!isSolo)}
            className={cn("w-full text-xs font-bold rounded p-1", isSolo ? 'bg-yellow-500 text-black' : 'bg-zinc-700 text-zinc-300')}
        >
            S
        </button>
      </div>
      <span className="text-xs font-bold text-zinc-300 bg-black w-full text-center rounded p-1 truncate">{label}</span>
    </div>
  );
};

export function AudioMixer() {
  const channels = [
    { label: 'CAM 1', color: '#34d399' },
    { label: 'CAM 2', color: '#34d399' },
    { label: 'GUEST 1', color: '#60a5fa' },
    { label: 'GUEST 2', color: '#60a5fa' },
    { label: 'MUSIC', color: '#f87171' },
    { label: 'SOUND FX', color: '#f87171' },
    { label: 'VIDEO', color: '#c084fc' },
  ];

  return (
    <div className="bg-zinc-900/50 rounded-b-md p-4 flex-grow min-h-0 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-bold flex items-center gap-2 text-zinc-100">
          <Waves className="h-5 w-5 text-accent" /> Audio Mixer
        </h3>
        <div className="flex items-center gap-2 text-xs text-zinc-400">
            <Ear className="h-4 w-4"/>
            <span>Main Output</span>
        </div>
      </div>
      <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
        {channels.map(ch => (
          <AudioChannel key={ch.label} label={ch.label} color={ch.color} />
        ))}
         <div className="border-l-2 border-dashed border-zinc-600 pl-3">
            <AudioChannel label="MASTER" color="#fbbf24" />
        </div>
      </div>
    </div>
  );
}
