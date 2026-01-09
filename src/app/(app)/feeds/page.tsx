

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { feedItems } from "@/lib/data";
import { BookOpen, Handshake, HeartHandshake, Rss, Send, Image as ImageIcon, Video } from "lucide-react";
import Link from 'next/link';
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const iconMap = {
  PRAYER_REQUEST: <HeartHandshake className="h-5 w-5 text-accent" />,
  NEW_DEVOTIONAL: <BookOpen className="h-5 w-5 text-accent" />,
  NEW_CONNECTION: <Handshake className="h-5 w-5 text-accent" />,
  default: <Rss className="h-5 w-5 text-accent" />
}

export default function FeedsPage() {
  const currentUserAvatar = PlaceHolderImages.find(p => p.id === 'avatar-1');

  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-headline font-bold">Community Feed</h1>
        <p className="text-white">
          See what's happening in the community right now.
        </p>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <Avatar className="h-10 w-10 border">
              {currentUserAvatar && <AvatarImage src={currentUserAvatar.imageUrl} alt="You" data-ai-hint={currentUserAvatar.imageHint}/>}
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-grow space-y-2">
                <Textarea placeholder="What's on your mind?" className="bg-secondary" />
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
                    <p className="text-sm text-card-foreground">
                      <Link href={item.href} className="font-semibold hover:underline text-card-foreground">{item.user}</Link> {item.content}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{item.timestamp}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 pl-16">
              <Card className="bg-secondary p-3">
                 <p className="text-sm text-card-foreground line-clamp-3">{item.details}</p>
              </Card>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
