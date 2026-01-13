
'use client';

import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Podcast, PlayCircle, Rss } from 'lucide-react';
import { collection, getDocs, orderBy, query, limit } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { LivePlayer } from '@/components/podcast/LivePlayer';
import { useToast } from '@/hooks/use-toast';

type PodcastEpisode = {
  id: string;
  title: string;
  description: string;
  recordingUrl: string;
  createdAt: any;
};

export default function PodcastPage() {
  const [episodes, setEpisodes] = useState<PodcastEpisode[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchEpisodes = async () => {
      try {
        const episodesRef = collection(db, 'podcasts');
        const q = query(
          episodesRef,
          orderBy('createdAt', 'desc'),
          limit(20)
        );
        const querySnapshot = await getDocs(q);
        const fetchedEpisodes = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as PodcastEpisode[];
        setEpisodes(fetchedEpisodes);
      } catch (error) {
        console.error('Error fetching podcast episodes:', error);
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Could not fetch podcast episodes.',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchEpisodes();
  }, [toast]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">
          Podcast
        </h1>
        <p className="text-muted-foreground">
          Listen to live broadcasts and past episodes.
        </p>
      </div>

      <LivePlayer showType="podcast" />

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rss className="h-5 w-5 text-accent" />
            Recent Episodes
          </CardTitle>
          <CardDescription>Browse and listen to our latest episodes.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoading ? (
            <p>Loading episodes...</p>
          ) : episodes.length > 0 ? (
            episodes.map((episode) => (
              <Card
                key={episode.id}
                className="flex flex-col md:flex-row items-center gap-4 p-4"
              >
                <div className="flex-grow">
                  <h3 className="font-bold text-lg text-foreground">
                    {episode.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(
                      episode.createdAt?.seconds * 1000
                    ).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                    {episode.description}
                  </p>
                </div>
                <div className="flex-shrink-0 w-full md:w-auto">
                  <audio
                    controls
                    src={episode.recordingUrl}
                    className="w-full"
                  >
                    Your browser does not support the audio element.
                  </audio>
                </div>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground text-center py-8">
              No podcast episodes found. Check back soon!
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
