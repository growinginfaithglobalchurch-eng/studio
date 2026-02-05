'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import { bibleStories } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpenText, ArrowLeft, Lightbulb, Target, Sparkles, ScrollText, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CodeBlock } from '@/components/code-block';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';

export default function StoryViewerPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { toast } = useToast();

    const story = bibleStories.find(s => s.slug === slug);

    const handleDeclaration = () => {
        toast({
            title: 'Declaration Made!',
            description: 'You have activated this truth in your spirit.',
        });
    }

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
        <div className="max-w-4xl mx-auto space-y-8">
            <div className="relative">
                 <Button asChild variant="outline" className="absolute top-4 left-4 z-10 bg-card/80">
                    <Link href="/bible-stories">
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Link>
                </Button>
                {story.image && (
                    <div className="relative w-full overflow-hidden rounded-lg">
                         <AspectRatio ratio={16 / 9}>
                            <Image src={story.image.imageUrl} alt={story.title} fill className="object-cover" data-ai-hint={story.image.imageHint} />
                        </AspectRatio>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-6">
                            <h1 className="text-3xl lg:text-4xl font-headline font-bold text-white max-w-2xl">{story.title}</h1>
                        </div>
                    </div>
                )}
            </div>
           
            <Card>
                <CardHeader>
                    <div className="flex items-start gap-4">
                         <ScrollText className="h-8 w-8 text-accent flex-shrink-0" />
                        <div>
                            <CardTitle>Scripture Foundation</CardTitle>
                            <CardDescription>The biblical basis for this story.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <CodeBlock code={story.scripture} />
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <div className="flex items-start gap-4">
                         <BookOpenText className="h-8 w-8 text-accent flex-shrink-0" />
                        <div>
                            <CardTitle>The Story</CardTitle>
                            <CardDescription>A retelling of the biblical account.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4 text-lg text-muted-foreground leading-relaxed prose prose-invert max-w-none">
                    {story.narrative.map((paragraph, index) => (
                        <p key={index}>{paragraph}</p>
                    ))}
                </CardContent>
            </Card>
            
            <Alert className="bg-primary/10 border-primary/20">
                <Lightbulb className="h-5 w-5 text-accent"/>
                <AlertTitle className="text-accent font-bold text-xl">{story.revelationInsight.title}</AlertTitle>
                <AlertDescription className="text-foreground mt-2">
                    {story.revelationInsight.text}
                </AlertDescription>
            </Alert>

             <Card>
                <CardHeader>
                     <div className="flex items-start gap-4">
                         <Target className="h-8 w-8 text-accent flex-shrink-0" />
                        <div>
                            <CardTitle>Life Application</CardTitle>
                            <CardDescription>How this truth affects your life today.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                     {story.lifeApplication.map((point, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                           <p className="text-muted-foreground">{point}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>

             <Card className="bg-accent/10 border-accent/20">
                <CardHeader>
                     <div className="flex items-start gap-4">
                         <Sparkles className="h-8 w-8 text-accent flex-shrink-0" />
                        <div>
                            <CardTitle>Activation & Declaration</CardTitle>
                            <CardDescription>Speak this truth over your life to activate it.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <blockquote className="border-l-4 border-accent pl-4 italic text-foreground text-lg">
                        "{story.declaration}"
                    </blockquote>
                    <Button className="mt-4" onClick={handleDeclaration}>Activate this Word</Button>
                </CardContent>
            </Card>
        </div>
    );
}
