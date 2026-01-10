
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
        <h1 className="text-3xl font-headline font-bold">Live Ministry & Prophetic Encounters</h1>
        <p className="text-muted-foreground">
          Real-time access to spiritual impartation.
        </p>
      </div>

      <section>
        <h2 className="text-2xl font-headline font-bold mb-4">Live Now</h2>
        <Link href="https://royallifetelevision.online.church/" target="_blank" rel="noopener noreferrer">
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="grid md:grid-cols-2">
                <div className="relative">
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
                </div>
                <div className="flex flex-col justify-center p-6">
                     <Badge variant="destructive" className="flex items-center gap-2 w-fit">
                        <Clapperboard className="h-4 w-4" /> LIVE NOW
                    </Badge>
                    <CardTitle className="font-headline text-2xl font-bold mt-4">{liveSessions.current.title}</CardTitle>
                    <p className="text-lg text-muted-foreground mt-2">{liveSessions.current.speaker}</p>
                    <p className="text-sm text-muted-foreground mt-4">Join us for a powerful time of worship, teaching, and prophetic ministry. Click to watch live.</p>
                </div>
            </div>
          </Card>
        </Link>
      </section>

      <section>
        <h2 className="text-2xl font-headline font-bold mb-4">Replay Library: On-Demand Access</h2>
         <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {liveSessions.replays.map((replay) => (
                <Link key={replay.id} href={liveSessions.current.videoUrl} target="_blank" rel="noopener noreferrer">
                    <Card className="group overflow-hidden">
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
                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
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
              </Link>
            ))}
         </div>
      </section>
    </div>
  );
}
