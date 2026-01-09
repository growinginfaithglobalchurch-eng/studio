

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { feedItems, communityUsers } from "@/lib/data";
import { BookOpen, Handshake, HeartHandshake, Rss, Send, Image as ImageIcon, Video, PlusCircle } from "lucide-react";
import Link from 'next/link';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const iconMap = {
  PRAYER_REQUEST: <HeartHandshake className="h-5 w-5 text-accent" />,
  NEW_DEVOTIONAL: <BookOpen className="h-5 w-5 text-accent" />,
  NEW_CONNECTION: <Handshake className="h-5 w-5 text-accent" />,
  default: <Rss className="h-5 w-5 text-accent" />
}

// Mock data for stories, in a real app this would come from a backend
const stories = [
    { id: 'current-user', name: 'Your Story', avatar: PlaceHolderImages.find(p => p.id === 'avatar-1') },
    ...communityUsers.slice(1, 5).map(user => ({...user, name: user.name.split(' ')[0]}))
];

export default function DashboardPage() {
  const currentUserAvatar = PlaceHolderImages.find(p => p.id === 'avatar-1');

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">Feeds & Stories</h1>
        <p className="text-foreground/80">
          Catch up on stories and see what's happening in the community.
        </p>
      </div>

      <Card>
        <CardHeader>
             <h2 className="text-lg font-semibold tracking-tight text-foreground">Stories</h2>
        </CardHeader>
        <CardContent>
            <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max space-x-4 pb-4">
                {stories.map((story) => (
                    <Link href="#" key={story.id} className="flex-shrink-0">
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
                        <p className="text-xs text-center text-foreground truncate w-full">{story.name}</p>
                    </div>
                    </Link>
                ))}
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>
        </CardContent>
      </Card>


      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10 border">
              {currentUserAvatar && <AvatarImage src={currentUserAvatar.imageUrl} alt="You" data-ai-hint={currentUserAvatar.imageHint}/>}
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-grow space-y-2">
                <Textarea placeholder="What's on your mind?" className="bg-secondary text-foreground" />
                <div className="flex justify-between items-center">
                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon">
                            <ImageIcon className="h-5 w-5 text-accent" />
                            <span className="sr-only">Add Photo</span>
                        </Button>
                        <Button variant="ghost" size="icon">
                            <Video className="h-5 w-5 text-accent" />
                            <span className="sr-only">Add Video</span>
                        </Button>
                    </div>
                    <Button>
                        <Send className="h-4 w-4 mr-2" />
                        Post
                    </Button>
                </div>
            </div>
          </div>
        </CardContent>
      </Card>


      <div className="space-y-4">
         <h2 className="text-lg font-semibold tracking-tight text-foreground">Community Feed</h2>
        {feedItems.map((item) => (
          <Card key={item.id}>
            <CardHeader className="p-4">
              <div className="flex items-start gap-4">
                 <Link href={item.href}>
                  <Avatar className="h-10 w-10 border">
                    {item.avatar && <AvatarImage src={item.avatar.imageUrl} alt={item.user} data-ai-hint={item.avatar.imageHint}/>}
                    <AvatarFallback>{item.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                 </Link>
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    {iconMap[item.type as keyof typeof iconMap] || iconMap.default}
                    <p className="text-sm text-black">
                      <Link href={item.href} className="font-semibold hover:underline text-black">{item.user}</Link> {item.content}
                    </p>
                  </div>
                  <p className="text-xs text-black/70 mt-1">{item.timestamp}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 pl-16">
              <Card className="bg-secondary p-3">
                 <p className="text-sm line-clamp-3 text-secondary-foreground">{item.details}</p>
              </Card>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
