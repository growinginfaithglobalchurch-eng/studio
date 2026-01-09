

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { liveSessions } from '@/lib/data';
import { Clapperboard, PlayCircle } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Badge } from '@/components/ui/badge';

export default function LivePage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Live & On-Demand</h1>
        <p className="text-muted-foreground">
          Join live events and catch up on past sessions.
        </p>
      </div>

      <section>
        <Link href="https://royallifetelevision.online.church/" target="_blank" rel="noopener noreferrer">
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4 bg-primary/10 p-4">
              <Badge variant="destructive" className="flex items-center gap-2">
                <Clapperboard className="h-4 w-4" /> LIVE NOW
              </Badge>
              <div>
                <CardTitle className="font-headline text-xl font-bold">{liveSessions.current.title}</CardTitle>
                <p className="text-sm text-muted-foreground">{liveSessions.current.speaker}</p>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <AspectRatio ratio={16 / 9}>
                  {liveSessions.current.image && (
                    <Image
                        src={liveSessions.current.image.imageUrl}
                        alt={liveSessions.current.title}
                        fill
                        className="object-cover"
                        data-ai-hint={liveSessions.current.image.imageHint}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <PlayCircle className="h-16 w-16 text-accent/80" />
                  </div>
              </AspectRatio>
            </CardContent>
          </Card>
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-headline font-bold mb-4">On-Demand Replays</h2>
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {liveSessions.replays.map((replay) => (
              <Card key={replay.id} className="group overflow-hidden">
                <CardContent className="p-0">
                  <AspectRatio ratio={16/9} className="relative">
                     {replay.image && (
                        <Image
                            src={replay.image.imageUrl}
                            alt={replay.title}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                            data-ai-hint={replay.image.imageHint}
                        />
                     )}
                     <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <PlayCircle className="h-12 w-12 text-accent/70 transition-all group-hover:text-accent group-hover:scale-110" />
                     </div>
                  </AspectRatio>
                </CardContent>
                <CardFooter className="p-4">
                    <div>
                        <h3 className="font-semibold leading-tight group-hover:text-primary">{replay.title}</h3>
                        <p className="text-xs text-muted-foreground mt-1">{replay.speaker}</p>
                    </div>
                </CardFooter>
              </Card>
            ))}
         </div>
      </section>
    </div>
  );
}
