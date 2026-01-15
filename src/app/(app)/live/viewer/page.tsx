
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

const initialMessages = [
  { user: 'Pastor Joseph', text: 'Welcome everyone! So glad you could join us tonight.', tribe: 'All' },
  { user: 'Apostle John', text: 'Amen! The presence of the Lord is strong.', tribe: 'Lion' },
  { user: 'Tribe Eagle', text: 'We are covering this broadcast in prayer. Atmosphere is clear!', tribe: 'Eagle' },
  { user: 'Jane D.', text: 'Feeling the anointing all the way from Brazil!', tribe: '' },
];
const userAvatar = PlaceHolderImages.find(p => p.id === 'avatar-1');


const CountdownTimer = () => {
    // Placeholder values, in a real app this would be dynamic
    return (
        <div className="flex justify-center gap-4">
            <div className="p-4 bg-secondary rounded-lg text-center w-24">
                <p className="text-3xl font-bold">21</p>
                <p className="text-xs text-muted-foreground">HOURS</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg text-center w-24">
                <p className="text-3xl font-bold">57</p>
                <p className="text-xs text-muted-foreground">MINUTES</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg text-center w-24">
                <p className="text-3xl font-bold">41</p>
                <p className="text-xs text-muted-foreground">SECONDS</p>
            </div>
        </div>
    )
}

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
        <div className="h-full flex flex-col">
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
    <div className="p-4 space-y-6">
        <div className="text-center">
            <h3 className="font-semibold text-muted-foreground">NEXT SERVICE</h3>
            <p className="text-2xl font-bold mt-1">10:00AM</p>
            <div className="mt-2">
                <CountdownTimer />
            </div>
        </div>
        <div>
            <h4 className="font-bold text-muted-foreground mb-2">FRIDAY, JANUARY 16</h4>
            <div className="space-y-2">
                <div className="bg-secondary p-3 rounded-lg text-lg font-semibold">10:00AM</div>
                <div className="bg-secondary p-3 rounded-lg text-lg font-semibold">12:00PM</div>
            </div>
        </div>
         <div>
            <h4 className="font-bold text-muted-foreground mb-2">SATURDAY, JANUARY 17</h4>
            <div className="space-y-2">
                <div className="bg-secondary p-3 rounded-lg text-lg font-semibold">10:00AM</div>
            </div>
        </div>
    </div>
)


export default function LiveViewerPage() {
  const programOutput = PlaceHolderImages.find(p => p.id === 'live-replay-1');

  return (
    <div className="h-screen w-screen bg-background flex flex-col fixed inset-0">
        <header className="flex-shrink-0 bg-black text-white flex items-center justify-between p-2 h-16">
            <div className="flex items-center gap-2">
                <div className="h-10 w-32 relative">
                    {/* Placeholder for ROYAL LIFE TV Logo */}
                    <div className="bg-black border border-yellow-400 h-full flex flex-col justify-center items-center p-1">
                        <span className="font-bold text-lg text-yellow-400 leading-none">ROYAL LIFE TV</span>
                        <span className="text-xs text-white leading-none">SEEING AND LIVING A LIFE</span>
                        <span className="text-xs text-white leading-none">BEYOND LIMITS</span>
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
            {/* Overlays can be added here */}
          </AspectRatio>
        </div>

        <Tabs defaultValue="schedule" className="flex-1 flex flex-col min-h-0 bg-card text-card-foreground">
          <TabsList className="grid w-full grid-cols-4 rounded-none h-14">
            <TabsTrigger value="pray" className="h-full rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"><Heart className="h-5 w-5 mr-2"/>Pray</TabsTrigger>
            <TabsTrigger value="schedule" className="h-full rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"><Calendar className="h-5 w-5 mr-2"/>Schedule</TabsTrigger>
            <TabsTrigger value="notes" className="h-full rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"><FileText className="h-5 w-5 mr-2"/>Notes</TabsTrigger>
            <TabsTrigger value="bible" className="h-full rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary data-[state=active]:bg-transparent"><BookOpen className="h-5 w-5 mr-2"/>Bible</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pray" className="flex-1 min-h-0">
              <PrayTabContent />
          </TabsContent>
          <TabsContent value="schedule" className="flex-1 min-h-0 overflow-y-auto">
             <ScheduleTabContent />
          </TabsContent>
          <TabsContent value="notes" className="flex-1 p-4">
              <p className="text-muted-foreground text-center">Notes feature coming soon.</p>
          </TabsContent>
          <TabsContent value="bible" className="flex-1 p-4">
              <p className="text-muted-foreground text-center">Bible feature coming soon.</p>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
