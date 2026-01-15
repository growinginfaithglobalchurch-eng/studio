
'use client';

import React, { useState, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import {
  Send,
  Heart,
  ThumbsUp,
  ClappingHands,
  Flame,
  Eye,
} from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollArea } from '@/components/ui/scroll-area';

const studioBackground = PlaceHolderImages.find(p => p.id === 'studio-background');
const programOutput = PlaceHolderImages.find(p => p.id === 'live-replay-1');
const userAvatar = PlaceHolderImages.find(p => p.id === 'avatar-1');

const initialMessages = [
  { user: 'Pastor Joseph', text: 'Welcome everyone! So glad you could join us tonight.', tribe: 'All' },
  { user: 'Apostle John', text: 'Amen! The presence of the Lord is strong.', tribe: 'Lion' },
  { user: 'Tribe Eagle', text: 'We are covering this broadcast in prayer. Atmosphere is clear!', tribe: 'Eagle' },
  { user: 'Jane D.', text: 'Feeling the anointing all the way from Brazil!', tribe: '' },
];


export default function LiveViewerPage() {
    const [messages, setMessages] = useState(initialMessages);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages(prev => [...prev, { user: 'You', text: newMessage, tribe: '' }]);
            setNewMessage('');
        }
    };

  return (
    <div className="h-full w-full fixed inset-0 flex flex-col -m-4 lg:-m-6">
      {studioBackground && (
        <Image
          src={studioBackground.imageUrl}
          alt="Studio Background"
          fill
          className="object-cover -z-10"
        />
      )}
      <div className="absolute inset-0 bg-black/60 -z-10" />

      <main className="flex-1 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-6 p-6 h-full">
        {/* Main Content */}
        <div className="flex flex-col gap-4 h-full">
          <header className="flex-shrink-0">
            <div className="flex items-center justify-between h-16 bg-zinc-900/50 backdrop-blur-sm rounded-lg border border-zinc-700 px-4">
              <div className="flex items-center gap-4">
                <div className="h-8 w-1.5 bg-accent rounded-full"></div>
                <div>
                  <h2 className="font-bold text-xl tracking-wide text-zinc-100">
                    ROYAL LIFE TV STUDIO
                  </h2>
                  <p className="text-zinc-400 text-xs">OFFICIAL BROADCAST</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm font-semibold bg-red-600/90 text-white px-3 py-1 rounded-md">
                <div className="h-2 w-2 rounded-full bg-white animate-pulse"></div>
                LIVE
              </div>
            </div>
          </header>

          <div className="flex-grow relative bg-black rounded-md overflow-hidden border-2 border-primary/50">
            <AspectRatio ratio={16 / 9} className="h-full">
                {programOutput && (
                    <Image
                    src={programOutput.imageUrl}
                    alt="Live Program Output"
                    fill
                    className="object-cover"
                    />
                )}
                 <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </AspectRatio>
          </div>
        </div>

        {/* Sidebar */}
        <Card className="bg-zinc-900/50 border-zinc-700 text-white flex flex-col h-full overflow-hidden backdrop-blur-sm">
            <div className="p-4 border-b border-zinc-700 flex justify-between items-center">
                <h3 className="font-bold text-lg">Live Chat & Reactions</h3>
                <div className="flex items-center gap-2 text-sm text-zinc-400">
                    <Eye className="h-4 w-4" />
                    <span>1,287 watching</span>
                </div>
            </div>
            
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
                    <Button variant="ghost" size="icon" className="hover:bg-zinc-700"><ClappingHands className="h-6 w-6 text-yellow-500" /></Button>
                    <Button variant="ghost" size="icon" className="hover:bg-zinc-700"><Flame className="h-6 w-6 text-orange-500" /></Button>
                </div>
                <div className="flex gap-2">
                    <Avatar className="w-9 h-9">
                        {userAvatar && <AvatarImage src={userAvatar.imageUrl} alt="You" />}
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
        </Card>
      </main>
    </div>
  );
}
