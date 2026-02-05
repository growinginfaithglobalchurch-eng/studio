
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookText, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import { bibleStories } from '@/lib/data';
import { ScrollAnimator } from '@/components/scroll-animator';
import Link from 'next/link';

export default function BibleStoriesPage() {

    return (
        <div className="space-y-8">
            <ScrollAnimator>
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <BookText className="h-8 w-8 text-accent" />
                        <h1 className="text-3xl font-headline font-bold text-foreground">Interactive Bible Stories</h1>
                    </div>
                    <p className="text-muted-foreground max-w-2xl">
                        Explore the Bible through fun and engaging stories made just for you!
                    </p>
                </div>
            </ScrollAnimator>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {bibleStories.map((story, index) => (
                    <ScrollAnimator key={story.title} delay={index * 0.1}>
                        <Card className="flex flex-col">
                            {story.image && (
                                <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                                    <Image src={story.image.imageUrl} alt={story.title} fill className="object-cover" data-ai-hint={story.image.imageHint} />
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="font-headline">{story.title}</CardTitle>
                                <CardDescription>{story.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow" />
                            <CardFooter>
                                <Button asChild className="w-full">
                                    <Link href={`/bible-stories/${story.slug}`}>
                                        <PlayCircle className="mr-2 h-5 w-5" />
                                        Read Story
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>
                    </ScrollAnimator>
                ))}
            </div>
        </div>
    );
}
