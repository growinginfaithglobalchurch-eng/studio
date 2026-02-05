'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { bibleStories } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpenText, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function StoryViewerPage() {
    const params = useParams();
    const slug = params.slug as string;

    const story = bibleStories.find(s => s.slug === slug);

    if (!story) {
        return (
            <div className="text-center py-10">
                <h1 className="text-2xl font-bold">Story not found</h1>
                <p className="text-muted-foreground">The story you are looking for does not exist.</p>
                 <Button asChild className="mt-4">
                    <Link href="/bible-stories">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Stories
                    </Link>
                </Button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-8">
            <div className="relative">
                 <Button asChild variant="outline" className="absolute top-4 left-4 z-10 bg-card/80">
                    <Link href="/bible-stories">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Link>
                </Button>
                {story.image && (
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                        <Image src={story.image.imageUrl} alt={story.title} fill className="object-cover" data-ai-hint={story.image.imageHint} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </div>
                )}
            </div>
           
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-3">
                        <BookOpenText className="h-8 w-8 text-accent"/>
                        <div>
                            <CardTitle className="font-headline text-3xl">{story.title}</CardTitle>
                            <CardDescription>{story.description}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 text-lg text-muted-foreground leading-relaxed">
                    {story.content.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
