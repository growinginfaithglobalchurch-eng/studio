
'use client';
import { useEffect, useState } from 'react';
import {
  collection,
  query,
  where,
  limit,
  onSnapshot,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import { Button } from '../ui/button';
import { PlayCircle, Rss } from 'lucide-react';
import { LiveListenerCount } from './LiveListenerCount';
import Link from 'next/link';

interface LiveShow {
  id: string;
  title: string;
  host: string;
  isLive: boolean;
}

interface LivePlayerProps {
  showType: 'podcast' | 'radio';
}

export function LivePlayer({ showType }: LivePlayerProps) {
  const [liveShow, setLiveShow] = useState<LiveShow | null>(null);
  const collectionName = showType === 'radio' ? 'radioShows' : 'liveRooms';

  useEffect(() => {
    const q = query(
      collection(db, collectionName),
      where('isLive', '==', true),
      limit(1)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        const doc = snapshot.docs[0];
        setLiveShow({ id: doc.id, ...doc.data() } as LiveShow);
      } else {
        setLiveShow(null);
      }
    });

    return () => unsubscribe();
  }, [collectionName]);

  if (!liveShow) {
    return null;
  }

  return (
    <Card className="bg-destructive/10 border-destructive">
      <CardHeader>
        <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-destructive">
                <Rss className="h-5 w-5 animate-pulse" />
                LIVE NOW
            </CardTitle>
            {liveShow && <LiveListenerCount roomId={liveShow.id} isRadio={showType === 'radio'}/>}
        </div>
        <CardDescription className="text-foreground">
          A live broadcast is in progress.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h3 className="text-lg font-bold text-foreground">{liveShow.title}</h3>
                <p className="text-sm text-muted-foreground">with {liveShow.host}</p>
            </div>
            <Button asChild className="w-full md:w-auto">
                <Link href={`/podcast/viewer/${liveShow.id}?isRadio=${showType === 'radio'}`}>
                    <PlayCircle className="mr-2 h-4 w-4"/>
                    Listen Live
                </Link>
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
