
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { HeartHandshake, Send, Loader2 } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ScrollAnimator } from '@/components/scroll-animator';
import { supabase } from '@/lib/supabase';

type PrayerRequest = {
  id: number;
  created_at: string;
  user_id: string | null;
  user_name: string;
  request: string;
  prayedCount: number; // For local state management
  avatar?: { imageUrl: string; imageHint: string };
};

export default function PrayerPage() {
  const { toast } = useToast();
  const [prayerRequests, setPrayerRequests] = useState<PrayerRequest[]>([]);
  const [name, setName] = useState('');
  const [request, setRequest] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRequests = async () => {
      const { data, error } = await supabase
        .from('prayer_requests')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        toast({ variant: 'destructive', title: 'Error fetching prayers', description: error.message });
      } else {
        // Hydrate with local state properties
        const hydratedData = data.map(req => ({
          ...req,
          prayedCount: 0,
          avatar: req.user_id ? PlaceHolderImages.find(p => p.id === 'avatar-1') : undefined
        }));
        setPrayerRequests(hydratedData);
      }
      setIsLoading(false);
    };
    fetchRequests();
  }, [toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!request.trim()) {
      toast({
        variant: 'destructive',
        title: 'Empty Request',
        description: 'Please write a prayer request before submitting.',
      });
      return;
    }

    const { data, error } = await supabase
      .from('prayer_requests')
      .insert([{ user_name: name.trim() || 'Anonymous', request: request }])
      .select()
      .single();

    if (error) {
      toast({ variant: 'destructive', title: 'Error submitting prayer', description: error.message });
    } else {
      const newRequest: PrayerRequest = {
        ...(data as any),
        prayedCount: 0,
        avatar: data.user_id ? PlaceHolderImages.find(p => p.id === 'avatar-1') : undefined,
      };
      setPrayerRequests(prev => [newRequest, ...prev]);
      setName('');
      setRequest('');
      toast({
        title: 'Prayer Submitted',
        description: 'Your prayer request has been added to the wall.',
      });
    }
  };

  const handlePray = (id: number) => {
    setPrayerRequests(
      prayerRequests.map(req =>
        req.id === id ? { ...req, prayedCount: req.prayedCount + 1 } : req
      )
    );
    toast({
        title: 'Thank you for praying!',
        description: 'You\'ve joined others in lifting up this request.'
    })
  };

  return (
    <div className="grid md:grid-cols-3 gap-6 h-full">
      <ScrollAnimator className="md:col-span-1 flex flex-col gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="font-headline text-2xl flex items-center gap-2 font-bold">
              <Send className="h-6 w-6 text-accent" />
              Submit a Prayer Request
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Share your request with our global community. You can choose to
                post anonymously.
              </p>
              <Input
                placeholder="Your Name (Optional)"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Textarea
                placeholder="Type your prayer request here..."
                className="min-h-[120px]"
                value={request}
                onChange={(e) => setRequest(e.target.value)}
              />
              <Button type="submit" className="w-full">
                Submit Prayer
              </Button>
            </form>
          </CardContent>
        </Card>
      </ScrollAnimator>

      <ScrollAnimator className="md:col-span-2">
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
                {isLoading ? (
                   <div className="flex justify-center items-center py-10">
                    <Loader2 className="h-8 w-8 animate-spin text-accent" />
                  </div>
                ) : prayerRequests.map((req, index) => (
                  <div key={req.id}>
                    <div className="flex gap-4">
                      <Avatar className="h-10 w-10">
                        {req.avatar && (
                          <AvatarImage
                            src={req.avatar.imageUrl}
                            alt={req.user_name}
                            data-ai-hint={req.avatar.imageHint}
                          />
                        )}
                        <AvatarFallback>
                          {req.user_name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <p className="font-semibold">{req.user_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(req.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {req.request}
                        </p>
                        <div className="mt-2">
                          <Button
                            size="sm"
                            className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                            onClick={() => handlePray(req.id)}
                          >
                            <HeartHandshake className="h-4 w-4" /> Pray (
                            {req.prayedCount})
                          </Button>
                        </div>
                      </div>
                    </div>
                    {index < prayerRequests.length - 1 && (
                      <Separator className="my-4" />
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </ScrollAnimator>
    </div>
  );
}
