
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { AudioLines, Bookmark, Share2, Video, BookText, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

type Devotional = {
    id: number;
    title: string;
    author: string;
    publish_date: string;
    category: string;
    image_url: string;
    image_hint: string;
    content_text: string;
    audio_url: string;
    video_url: string;
};

export default function DevotionalsPage() {
  const [devotionals, setDevotionals] = useState<Devotional[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchDevotionals = async () => {
      const { data, error } = await supabase
        .from('devotionals')
        .select('*')
        .order('publish_date', { ascending: false });
      
      if(error) {
        toast({
          variant: 'destructive',
          title: 'Error fetching devotionals',
          description: error.message
        });
      } else {
        setDevotionals(data || []);
      }
      setIsLoading(false);
    };
    fetchDevotionals();
  }, [toast]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold">Daily Devotionals</h1>
        <p className="text-muted-foreground">
          Nourish your spirit with daily wisdom and encouragement.
        </p>
      </div>
      {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
      ) : devotionals.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {devotionals.map((devotional) => (
              <Card key={devotional.id} className="flex flex-col">
                <CardHeader className="p-0">
                  {devotional.image_url && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                      <Image
                        src={devotional.image_url}
                        alt={devotional.title}
                        fill
                        className="object-cover"
                        data-ai-hint={devotional.image_hint}
                      />
                    </div>
                  )}
                   <div className="p-6 pb-2">
                    <p className="text-sm text-muted-foreground">{new Date(devotional.publish_date).toLocaleDateString()} &bull; {devotional.category}</p>
                    <CardTitle className="mt-1 font-headline text-xl font-bold">{devotional.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">by {devotional.author}</p>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow p-6 pt-0">
                  <Tabs defaultValue="text" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 mb-4">
                      <TabsTrigger value="text"><BookText className="h-4 w-4 mr-1" /> Text</TabsTrigger>
                      <TabsTrigger value="audio" disabled={!devotional.audio_url}><AudioLines className="h-4 w-4 mr-1" /> Audio</TabsTrigger>
                      <TabsTrigger value="video" disabled={!devotional.video_url}><Video className="h-4 w-4 mr-1" /> Video</TabsTrigger>
                    </TabsList>
                    <TabsContent value="text" className="text-sm text-muted-foreground max-h-24 overflow-y-auto">
                      {devotional.content_text}
                    </TabsContent>
                    <TabsContent value="audio" className="text-center p-4">
                      <p className="text-sm text-muted-foreground">Audio player coming soon.</p>
                    </TabsContent>
                    <TabsContent value="video" className="text-center p-4">
                     <p className="text-sm text-muted-foreground">Video player coming soon.</p>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between p-6 pt-0">
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon">
                      <Bookmark className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <Button>Read More</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
      ) : (
        <Card>
          <CardContent className="p-6 text-center text-muted-foreground">
            No devotionals have been published yet.
          </CardContent>
        </Card>
      )}
    </div>
  );
}
