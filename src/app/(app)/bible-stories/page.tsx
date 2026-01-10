
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookText, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

const stories = [
    {
        title: "David and Goliath",
        description: "The story of a brave shepherd boy who trusted God and defeated a giant.",
        image: PlaceHolderImages.find(p => p.id === 'devotional-2')
    },
    {
        title: "Noah's Ark",
        description: "Join Noah as he builds a giant ark to save his family and the animals from a great flood.",
        image: PlaceHolderImages.find(p => p.id === 'live-replay-2')
    },
    {
        title: "Daniel in the Lion's Den",
        description: "A story of faith and courage as Daniel faces a den of hungry lions.",
        image: PlaceHolderImages.find(p => p.id === 'live-replay-1')
    },
     {
        title: "The Story of Creation",
        description: "Learn how God created the heavens and the earth in seven days.",
        image: PlaceHolderImages.find(p => p.id === 'devotionals-feature')
    }
];

export default function BibleStoriesPage() {
    const { toast } = useToast();

    const handleReadStory = (title: string) => {
        toast({
            title: "Loading Story!",
            description: `Get ready to read "${title}"!`,
        });
    };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
            <BookText className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">Interactive Bible Stories</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Explore the Bible through fun and engaging stories made just for you!
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stories.map(story => (
              <Card key={story.title} className="flex flex-col">
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
                      <Button className="w-full" onClick={() => handleReadStory(story.title)}>
                          <PlayCircle className="mr-2 h-5 w-5" />
                          Read Story
                      </Button>
                  </CardFooter>
              </Card>
          ))}
      </div>
    </div>
  );
}
