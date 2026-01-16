
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
  Hand,
  Flame,
  Menu,
  BookOpen,
  Calendar,
  FileText,
} from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { communityUsers } from '@/lib/data';
import { Countdown } from '@/components/countdown';

const initialMessages = [
  { user: 'Pastor Joseph', text: 'Welcome everyone! So glad you could join us tonight.', tribe: 'All' },
  { user: 'Apostle John', text: 'Amen! The presence of the Lord is strong.', tribe: 'Lion' },
  { user: 'Tribe Eagle', text: 'We are covering this broadcast in prayer. Atmosphere is clear!', tribe: 'Eagle' },
  { user: 'Jane D.', text: 'Feeling the anointing all the way from Brazil!', tribe: '' },
];
const userAvatar = PlaceHolderImages.find(p => p.id === 'avatar-1');

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
            <h3 className="font-semibold text-muted-foreground text-sm">NEXT SERVICE</h3>
            <Card className="mt-2">
                <CardContent className="p-4 space-y-3 text-center">
                    <p className="text-2xl font-bold">10:00AM</p>
                    <Countdown targetDate={new Date(new Date().getTime() + 4 * 3600 * 1000 + 9 * 60 * 1000 + 5 * 1000)} />
                </CardContent>
            </Card>
        </div>
        <div>
            <h4 className="font-bold text-muted-foreground mb-2 text-sm">FRIDAY, JANUARY 16</h4>
            <div className="space-y-2">
                <Card><CardContent className="p-3 text-lg font-semibold">10:00AM</CardContent></Card>
                <Card><CardContent className="p-3 text-lg font-semibold">12:00PM</CardContent></Card>
            </div>
        </div>
         <div>
            <h4 className="font-bold text-muted-foreground mb-2 text-sm">SATURDAY, JANUARY 17</h4>
            <div className="space-y-2">
                <Card><CardContent className="p-3 text-lg font-semibold">10:00AM</CardContent></Card>
            </div>
        </div>
    </div>
)


export default function LiveViewerPage() {
  const programOutput = PlaceHolderImages.find(p => p.id === 'live-replay-1');

  return (
    <div className="h-screen w-screen bg-black flex flex-col fixed inset-0">
        <header className="flex-shrink-0 bg-black text-white flex items-center justify-between p-2 h-16">
            <div className="flex items-center gap-2">
                <div className="h-10 w-32 relative">
                    <div className="bg-black h-full flex flex-col justify-center items-center p-1">
                        <span className="font-bold text-lg text-yellow-400 leading-none">ROYAL LIFE TV</span>
                        <span className="text-[0.5rem] text-white leading-tight">SEEING AND LIVING A LIFE</span>
                        <span className="text-[0.5rem] text-white leading-tight">BEYOND LIMITS</span>
                    </div>
                </div>
            </div>
            <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6"/>
            </Button>
        </header>

      <main className="flex-1 flex flex-col min-h-0">
        <div className="relative bg-black">
          <AspectRatio ratio={16 / 9}>
            {programOutput && (
              <Image
                src={programOutput.imageUrl}
                alt="Live Program Output"
                fill
                className="object-cover"
                data-ai-hint={programOutput.imageHint}
              />
            )}
            <div className="absolute bottom-4 left-4 bg-black/50 text-white p-2 rounded-md">
                <p className="font-semibold">Being in a <span className="text-cyan-400">healthy</span> relationship</p>
            </div>
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
          <TabsContent value="notes" className="flex-1 p-4 bg-secondary/30">
              <p className="text-muted-foreground text-center">Notes feature coming soon.</p>
          </TabsContent>
          <TabsContent value="bible" className="flex-1 p-4 bg-secondary/30">
              <p className="text-muted-foreground text-center">Bible feature coming soon.</p>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
