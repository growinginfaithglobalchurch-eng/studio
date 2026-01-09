
'use client';

import { useEffect, useState, useTransition } from 'react';
import {
  BookOpen,
  HeartHandshake,
  Lightbulb,
  Users,
  Wand2,
} from 'lucide-react';
import { getRecommendedContent } from '@/app/actions';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { RecommendContentOutput } from '@/ai/flows/content-recommendations';

const categoryIcons = {
  devotional: <BookOpen className="h-6 w-6 text-accent" />,
  course: <Lightbulb className="h-6 w-6 text-accent" />,
  communityGroup: <Users className="h-6 w-6 text-accent" />,
  prayerFocus: <HeartHandshake className="h-6 w-6 text-accent" />,
};

const categoryLabels = {
  devotional: 'Devotional',
  course: 'Course',
  communityGroup: 'Community Group',
  prayerFocus: 'Prayer Focus',
}

export function ContentRecommender() {
  const [recommendations, setRecommendations] =
    useState<RecommendContentOutput | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const result = await getRecommendedContent();
      setRecommendations(result);
    });
  }, []);

  return (
    <Card className="col-span-1 lg:col-span-1">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Wand2 className="h-6 w-6 text-accent" />
          <div>
            <CardTitle className="font-headline text-2xl text-accent font-bold">
              Your Personalized Faith Path
            </CardTitle>
            <CardDescription className="text-card-foreground/80">
              AI-powered recommendations to guide your spiritual journey.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div className="flex items-center space-x-4" key={i}>
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {recommendations &&
              (Object.keys(recommendations) as Array<keyof RecommendContentOutput>).map(
                (key) => {
                  const item = recommendations[key];
                  if (!item) return null;
                  return (
                    <div
                      key={key}
                      className="flex items-start gap-4 rounded-lg bg-card/50 p-4"
                    >
                      <div className="flex-shrink-0">{categoryIcons[key]}</div>
                      <div className="flex-grow">
                         <p className="text-sm font-semibold text-accent">{categoryLabels[key]}</p>
                        <p className="font-semibold text-md">{item.title}</p>
                        <p className="text-sm text-card-foreground/70 mt-1">
                          {item.reason}
                        </p>
                        <Button
                            variant="link"
                            className="p-0 h-auto mt-2 text-primary"
                        >
                            Learn More
                        </Button>
                      </div>
                    </div>
                  );
                }
              )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
