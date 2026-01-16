
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Shield, Send, HeartHandshake } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { communityUsers } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ScrollAnimator } from '@/components/scroll-animator';
import { Label } from '@/components/ui/label';

type PartnerPetition = {
    id: number;
    user: string;
    avatar?: string;
    request: string;
    timestamp: string;
    prayedCount: number;
}

const initialPetitions: PartnerPetition[] = [
    {
        id: 1,
        user: 'Partner David',
        avatar: communityUsers.find(u => u.id === 1)?.avatar?.imageUrl,
        request: 'Praying for wisdom and favor in a new business venture we are launching for the Kingdom.',
        timestamp: '2 hours ago',
        prayedCount: 12,
    },
    {
        id: 2,
        user: 'Partner Maria',
        avatar: communityUsers.find(u => u.id === 6)?.avatar?.imageUrl,
        request: 'Standing in the gap for my children\'s salvation and for peace in our home.',
        timestamp: '8 hours ago',
        prayedCount: 35,
    }
];

export default function PartnerPrayerWallPage() {
  const { toast } = useToast();
  const [petitions, setPetitions] = useState<PartnerPetition[]>(initialPetitions);
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.trim()) {
      toast({
        variant: 'destructive',
        title: 'Empty Request',
        description: 'Please write a prayer request before submitting.',
      });
      return;
    }

    const newPrayer: PartnerPetition = {
      id: petitions.length + 1,
      user: name.trim() || 'Anonymous Partner',
      avatar: communityUsers.find(u => u.id === 2)?.avatar?.imageUrl, // generic for new posts
      request: request,
      timestamp: 'Just now',
      prayedCount: 0,
    };

    setPetitions([newPrayer, ...petitions]);
    setName('');
    setRequest('');
    toast({
      title: 'Prayer Request Submitted',
      description: 'Your request has been posted on the Partner Prayer Wall.',
    });
  };

  const handlePray = (id: number) => {
    setPetitions(
      petitions.map(req =>
        req.id === id ? { ...req, prayedCount: req.prayedCount + 1 } : req
      )
    );
    toast({
        title: 'Thank you for interceding!',
        description: 'You have joined in prayer with your fellow partner.'
    })
  };

  return (
    <div className="space-y-8">
      <ScrollAnimator>
        <div>
          <div className="flex items-center gap-3 mb-2">
              <HeartHandshake className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-headline font-bold text-foreground">Partner Prayer Wall</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            An exclusive space for our covenant partners to share requests and intercede for one another.
          </p>
        </div>
      </ScrollAnimator>
      
      <div className="grid md:grid-cols-3 gap-6">
        <ScrollAnimator className="md:col-span-1 flex flex-col gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Send className="h-5 w-5 text-accent" />
                        Submit a Request
                    </CardTitle>
                    <CardDescription>
                        Share your prayer needs with a trusted circle of partners.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="name">Your Name (Optional)</Label>
                            <Input
                                id="name"
                                placeholder="Anonymous Partner"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="request">Prayer Request</Label>
                             <Textarea
                                id="request"
                                placeholder="Type your prayer request here..."
                                className="min-h-[120px]"
                                value={request}
                                onChange={(e) => setRequest(e.target.value)}
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Submit to the Wall
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </ScrollAnimator>

        <ScrollAnimator className="md:col-span-2">
            <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-accent" />
                    Intercession Wall
                    </CardTitle>
                    <CardDescription>Lift up your fellow partners in prayer.</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow p-0">
                    <ScrollArea className="h-[calc(100vh-22rem)]">
                        <div className="p-6 space-y-4">
                        {petitions.length > 0 ? petitions.map((req, index) => (
                            <React.Fragment key={req.id}>
                                <div className="flex gap-4">
                                <Avatar className="h-10 w-10">
                                    {req.avatar && <AvatarImage src={req.avatar} alt={req.user} />}
                                    <AvatarFallback>
                                    {req.user.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <div className="flex items-center justify-between">
                                    <p className="font-semibold text-foreground">{req.user}</p>
                                    <p className="text-xs text-muted-foreground">
                                        {req.timestamp}
                                    </p>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">
                                    {req.request}
                                    </p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <Button
                                            size="sm"
                                            variant="secondary"
                                            className="gap-2"
                                            onClick={() => handlePray(req.id)}
                                        >
                                            <HeartHandshake className="h-4 w-4" /> Pray
                                        </Button>
                                        <span className="text-xs text-muted-foreground">{req.prayedCount} partners are praying.</span>
                                    </div>
                                </div>
                                </div>
                                {index < petitions.length - 1 && (
                                <Separator className="my-4" />
                                )}
                            </React.Fragment>
                        )) : (
                            <p className="text-center text-muted-foreground">The prayer wall is clear. Be the first to post a request.</p>
                        )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </Card>
        </ScrollAnimator>
      </div>

    </div>
  );
}
