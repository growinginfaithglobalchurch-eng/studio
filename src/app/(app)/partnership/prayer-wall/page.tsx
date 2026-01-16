
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { HeartHandshake } from 'lucide-react';
import { ScrollAnimator } from '@/components/scroll-animator';

export default function PartnerPrayerWallPage() {
  return (
    <div className="space-y-8">
      <ScrollAnimator>
        <div>
          <div className="flex items-center gap-3 mb-2">
              <HeartHandshake className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-headline font-bold text-foreground">Prayer Wall for Our Partners</h1>
          </div>
          <p className="text-muted-foreground">
            A dedicated space for our partners to share requests and intercede for one another.
          </p>
        </div>
      </ScrollAnimator>

      <ScrollAnimator>
        <Card>
          <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                  This page is under construction. Please check back later to access the partner prayer wall.
              </CardDescription>
          </CardHeader>
        </Card>
      </ScrollAnimator>
    </div>
  );
}

    