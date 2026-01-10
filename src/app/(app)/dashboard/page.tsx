
'use client';

import React, { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { feedItems, communityUsers } from "@/lib/data";
import { BookOpen, Handshake, HeartHandshake, Rss, Send, Image as ImageIcon, Video, PlusCircle } from "lucide-react";
import Link from 'next/link';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { CreatePostForm } from "@/components/create-post-form";
import { StoryViewer } from '@/components/story-viewer';
import { User } from '@/lib/types';
import { AddStoryDialog } from '@/components/add-story-dialog';


const iconMap = {
  PRAYER_REQUEST: <HeartHandshake className="h-5 w-5 text-accent" />,
  NEW_DEVOTIONAL: <BookOpen className="h-5 w-5 text-accent" />,
  NEW_CONNECTION: <Handshake className="h-5 w-5 text-accent" />,
  default: <Rss className="h-5 w-5 text-accent" />
}

// Mock data for stories, in a real app this would come from a backend
const stories: User[] = [
    { id: 'current-user', name: 'Your Story', avatar: PlaceHolderImages.find(p => p.id === 'avatar-1')!, location: '' },
    ...communityUsers.slice(1, 5).map(user => ({...user, name: user.name.split(' ')[0]}))
];

export default function DashboardPage() {
  const [viewingStory, setViewingStory] = useState<User | null>(null);
  const [addingStory, setAddingStory] = useState(false);

  useEffect(() => {
    if (viewingStory) {
      // Prevent body scroll when story viewer is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [viewingStory]);
  
  const handleStoryClick = (story: User) => {
    if (story.id === 'current-user') {
      setAddingStory(true);
    } else {
      setViewingStory(story);
    }
  };


  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      {viewingStory && (
        <StoryViewer 
          user={viewingStory}
          onClose={() => setViewingStory(null)} 
        />
      )}
      
      <AddStoryDialog 
        open={addingStory}
        onOpenChange={setAddingStory}
      />

      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">Feeds & Stories</h1>
        <p className="text-muted-foreground">
          Catch up on stories and see what's happening in the community.
        </p>
      </div>

      <Card>
        <CardHeader>
             <h2 className="text-lg font-semibold tracking-tight text-card-foreground">Stories</h2>
        </CardHeader>
        <CardContent>
            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max space-x-4 pb-4">
                {stories.map((story) => (
                    <button 
                        key={story.id} 
                        className="flex-shrink-0 focus:outline-none"
                        onClick={() => handleStoryClick(story)}
                    >
                        <div className="flex flex-col items-center gap-2 w-20">
                            <div className="relative">
                                <Avatar className="h-16 w-16 border-2 border-accent">
                                    {story.avatar && <AvatarImage src={story.avatar.imageUrl} alt={story.name} data-ai-hint={story.avatar.imageHint} />}
                                    <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                 {story.id === 'current-user' && (
                                    <div className="absolute -bottom-1 -right-1 bg-card rounded-full">
                                        <PlusCircle className="h-6 w-6 text-primary"/>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-center text-card-foreground truncate w-full">{story.name}</p>
                        </div>
                    </button>
                ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </CardContent>
      </Card>

      <CreatePostForm />

      <div className="space-y-4">
         <h2 className="text-lg font-semibold tracking-tight text-card-foreground">Community Feed</h2>
        {feedItems.map((item, index) => (
         <React.Fragment key={item.id}>
            <Card>
                <CardHeader>
                <div className="flex items-start gap-4">
                    <Link href={item.href}>
                    <Avatar className="h-10 w-10 border">
                        {item.avatar && <AvatarImage src={item.avatar.imageUrl} alt={item.user} data-ai-hint={item.avatar.imageHint}/>}
                        <AvatarFallback>{item.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    </Link>
                    <div className="flex-grow">
                    <div className="flex items-center gap-2">
                        <p className="text-sm text-muted-foreground">
                        <Link href={item.href} className="font-semibold hover:underline text-card-foreground">{item.user}</Link>
                        <span className="text-muted-foreground"> {item.content}</span>
                        </p>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{item.timestamp}</p>
                    </div>
                </div>
                </CardHeader>
                <CardContent>
                    <p className="text-sm text-card-foreground/90">{item.details}</p>
                </CardContent>
            </Card>
            {index < feedItems.length - 1 && <Separator />}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}
