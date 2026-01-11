
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Anchor } from 'lucide-react';
import { ScrollAnimator } from '@/components/scroll-animator';

export default function MarineRoomPage() {
  return (
    <div className="space-y-8">
      <ScrollAnimator>
        <div>
          <div className="flex items-center gap-3 mb-2">
              <Anchor className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-headline font-bold text-foreground">Marine Room</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            The command center for the Marine Tribe, rulers of the Water & Sea Forces.
          </p>
        </div>
      </ScrollAnimator>

      <ScrollAnimator>
        <Card>
          <CardHeader>
              <CardTitle>Welcome, Marine</CardTitle>
          </CardHeader>
          <CardContent>
              <p className="text-muted-foreground">This is where you receive assignments for dealing with foundational issues, breaking generational cycles, and operating in deep spiritual intelligence. Prepare to address ancient strongholds.</p>
          </CardContent>
        </Card>
      </ScrollAnimator>
    </div>
  );
}
