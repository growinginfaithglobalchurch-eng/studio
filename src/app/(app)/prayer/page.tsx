

import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { HeartHandshake, Send } from 'lucide-react';
import { prayerRequests } from '@/lib/data';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

export default function PrayerPage() {
  return (
    <div className="grid md:grid-cols-3 gap-6 h-full">
      <div className="md:col-span-1 flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2 font-bold">
              <Send className="h-6 w-6 text-accent" />
              Submit a Prayer Request
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Share your request with our global community. You can choose to post anonymously.
            </p>
            <Input placeholder="Your Name (Optional)" />
            <Textarea placeholder="Type your prayer request here..." className="min-h-[120px]" />
            <Button className="w-full">Submit Prayer</Button>
          </CardContent>
        </Card>
      </div>

      <div className="md:col-span-2">
        <Card className="h-full flex flex-col">
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2 font-bold">
              <HeartHandshake className="h-6 w-6 text-accent" />
              Community Prayer Wall
            </CardTitle>
          </CardHeader>
          <CardContent className="flex-grow p-0">
            <ScrollArea className="h-[calc(100vh-20rem)]">
              <div className="p-6 space-y-4">
                {prayerRequests.map((req, index) => (
                  <div key={req.id}>
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                         {req.avatar && <AvatarImage src={req.avatar.imageUrl} alt={req.user} data-ai-hint={req.avatar.imageHint} />}
                        <AvatarFallback>{req.user.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">{req.user}</p>
                          <p className="text-xs text-muted-foreground">{req.timestamp}</p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{req.request}</p>
                        <div className="mt-2">
                           <Button size="sm" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                             <HeartHandshake className="h-4 w-4" /> Pray ({req.prayedCount})
                           </Button>
                        </div>
                      </div>
                    </div>
                    {index < prayerRequests.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
