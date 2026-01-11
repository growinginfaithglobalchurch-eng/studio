
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Crown } from 'lucide-react';
import { ScrollAnimator } from '@/components/scroll-animator';

export default function LionRoomPage() {
  return (
    <div className="space-y-8">
      <ScrollAnimator>
        <div>
          <div className="flex items-center gap-3 mb-2">
              <Crown className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-headline font-bold text-foreground">Lion Room</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            The command center for the Lions Tribe, rulers of the Land Forces.
          </p>
        </div>
      </ScrollAnimator>

      <ScrollAnimator>
        <Card>
          <CardHeader>
              <CardTitle>Welcome, Lion</CardTitle>
          </CardHeader>
          <CardContent>
              <p className="text-muted-foreground">This is where you receive assignments focused on territorial dominion, confronting opposition, and establishing righteous order. Stand ready to enforce Kingdom governance.</p>
          </CardContent>
        </Card>
      </ScrollAnimator>
    </div>
  );
}
