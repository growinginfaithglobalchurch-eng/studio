
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookText, PlayCircle, Baby, Users, Briefcase } from 'lucide-react';
import Image from 'next/image';
import { bibleStories } from '@/lib/data';
import { ScrollAnimator } from '@/components/scroll-animator';
import Link from 'next/link';

export default function BibleStoriesPage() {

    const kidsStories = bibleStories.filter(s => s.category === 'Kids');
    const teenStories = bibleStories.filter(s => s.category === 'Teens & Youth');
    const adultStories = bibleStories.filter(s => s.category === 'Adults & Leaders');
    
    const categorySections = [
        { title: "Kids Bible Stories", icon: <Baby className="h-6 w-6" />, stories: kidsStories },
        { title: "Teens & Youth Stories", icon: <Users className="h-6 w-6" />, stories: teenStories },
        { title: "Adults & Leaders", icon: <Briefcase className="h-6 w-6" />, stories: adultStories },
    ];

    return (
        <div className="space-y-12">
            <ScrollAnimator>
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <BookText className="h-8 w-8 text-accent" />
                        <h1 className="text-3xl font-headline font-bold text-foreground">Interactive Bible Stories</h1>
                    </div>
                    <p className="text-muted-foreground max-w-2xl">
                        Explore the Bible through powerful, revelation-filled stories designed to build your faith.
                    </p>
                </div>
            </ScrollAnimator>

            {categorySections.map(section => section.stories.length > 0 && (
                <ScrollAnimator key={section.title}>
                    <section>
                         <div className="flex items-center gap-3 mb-4">
                            {section.icon}
                            <h2 className="text-2xl font-headline font-bold text-foreground">{section.title}</h2>
                        </div>
                        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                            {section.stories.map((story, index) => (
                                <ScrollAnimator key={story.id} delay={index * 0.1}>
                                    <Card className="flex flex-col h-full">
                                        {story.image && (
                                            <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                                                <Image src={story.image.imageUrl} alt={story.title} fill className="object-cover" data-ai-hint={story.image.imageHint} />
                                            </div>
                                        )}
                                        <CardHeader>
                                            <CardTitle className="font-headline">{story.title}</CardTitle>
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
                    </section>
                </ScrollAnimator>
            ))}
        </div>
    );
}
