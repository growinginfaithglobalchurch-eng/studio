'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Music, PlayCircle } from 'lucide-react';
import { memoryVerseSongs } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { ScrollAnimator } from '@/components/scroll-animator';
import Image from 'next/image';

export default function MemoryVerseSongsPage() {
    const { toast } = useToast();

    const handlePlaySong = (title: string) => {
        toast({
            title: 'Now Playing',
            description: `"${title}" will start playing shortly. Audio player coming soon.`,
        });
    };

    return (
        <div className="space-y-8">
            <ScrollAnimator>
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Music className="h-8 w-8 text-accent" />
                        <h1 className="text-3xl font-headline font-bold text-foreground">Memory Verse Songs</h1>
                    </div>
                    <p className="text-muted-foreground max-w-2xl">
                        Fun songs and videos to help kids hide God's Word in their hearts.
                    </p>
                </div>
            </ScrollAnimator>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {memoryVerseSongs.map((song, index) => (
                    <ScrollAnimator key={song.id} delay={index * 0.1}>
                        <Card className="flex flex-col h-full">
                            {song.image && (
                                <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                                    <Image src={song.image.imageUrl} alt={song.title} fill className="object-cover" data-ai-hint={song.image.imageHint} />
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="font-headline">{song.title}</CardTitle>
                                <CardDescription>{song.scripture}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow" />
                            <CardFooter>
                                <Button className="w-full" onClick={() => handlePlaySong(song.title)}>
                                    <PlayCircle className="mr-2 h-5 w-5" />
                                    Play Song
                                </Button>
                            </CardFooter>
                        </Card>
                    </ScrollAnimator>
                ))}
            </div>
        </div>
    );
}
