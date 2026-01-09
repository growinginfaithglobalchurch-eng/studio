'use client';

import { useEffect, useState, useTransition } from 'react';
import { Wand2 } from 'lucide-react';
import { getRecommendedContent } from '@/app/actions';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function ContentRecommender() {
  const [recommendation, setRecommendation] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      const result = await getRecommendedContent();
      setRecommendation(result.recommendedContent);
    });
  }, []);

  return (
    <Card className="bg-primary/5 border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Wand2 className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="font-headline text-2xl text-primary">
              Recommended For You
            </CardTitle>
            <CardDescription>
              Based on your recent activity and prayer requests.
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <div className="flex items-center space-x-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ) : (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-lg bg-card p-4">
            <div className='flex-grow'>
              <Badge variant="outline" className="mb-2 border-accent text-accent">AI Suggestion</Badge>
              <p className="font-semibold text-lg">{recommendation}</p>
              <p className="text-sm text-muted-foreground">We think this content will be a blessing to you right now.</p>
            </div>
            <Button className="shrink-0 bg-accent text-accent-foreground hover:bg-accent/90">
              Watch Now
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
