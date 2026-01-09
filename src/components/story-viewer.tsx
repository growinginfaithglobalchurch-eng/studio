
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { User } from '@/lib/types';

interface StoryViewerProps {
  user: User;
  onClose: () => void;
}

export function StoryViewer({ user, onClose }: StoryViewerProps) {
  const [progress, setProgress] = useState(0);
  const storyImage = PlaceHolderImages.find(p => p.id === 'devotional-1');

  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 5000); // 5 second story duration

    const interval = setInterval(() => {
        setProgress(p => {
            if (p >= 100) {
                clearInterval(interval);
                return 100;
            }
            return p + 1;
        });
    }, 50); // Update progress every 50ms

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 bg-black/90 z-[100] flex items-center justify-center animate-in fade-in-0">
      <div className="relative w-full max-w-md h-[90vh] bg-card rounded-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="absolute top-0 left-0 w-full p-4 z-10 bg-gradient-to-b from-black/50 to-transparent">
          <Progress value={progress} className="h-1" />
          <div className="flex items-center gap-3 mt-3">
            <Avatar className="h-10 w-10 border-2 border-white">
              {user.avatar && <AvatarImage src={user.avatar.imageUrl} alt={user.name} />}
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <p className="text-white font-semibold">{user.name}</p>
          </div>
        </div>

        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-20 text-white/80 hover:text-white">
          <X className="h-7 w-7" />
          <span className="sr-only">Close</span>
        </button>

        {/* Story Content */}
        <div className="relative flex-grow">
          {storyImage && (
            <Image
              src={storyImage.imageUrl}
              alt="Story"
              fill
              className="object-cover"
              data-ai-hint={storyImage.imageHint}
            />
          )}
           <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
      </div>
    </div>
  );
}
