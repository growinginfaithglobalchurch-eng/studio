
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { ScrollAnimator } from '@/components/scroll-animator';

export default function FounderMeetingsPage() {
  return (
    <div className="space-y-8">
      <ScrollAnimator>
        <div>
          <div className="flex items-center gap-3 mb-2">
              <Calendar className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-headline font-bold text-foreground">Monthly and Annually Meeting with Our Founders</h1>
          </div>
          <p className="text-muted-foreground">
            Connect directly with our leadership.
          </p>
        </div>
      </ScrollAnimator>

      <ScrollAnimator>
        <Card>
          <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                  This page is under construction. Please check back later for the meeting schedule.
              </CardDescription>
          </CardHeader>
        </Card>
      </ScrollAnimator>
    </div>
  );
}

    