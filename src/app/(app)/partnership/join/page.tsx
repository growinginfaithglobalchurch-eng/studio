
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Handshake } from 'lucide-react';
import { ScrollAnimator } from '@/components/scroll-animator';

export default function JoinPartnershipPage() {
  return (
    <div className="space-y-8">
      <ScrollAnimator>
        <div>
          <div className="flex items-center gap-3 mb-2">
              <Handshake className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-headline font-bold text-foreground">Join Partnership with Royal Life TV</h1>
          </div>
          <p className="text-muted-foreground">
            Become a partner and join us in our mission.
          </p>
        </div>
      </ScrollAnimator>

      <ScrollAnimator>
        <Card>
          <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                  This page is under construction. Please check back later for more information on how to join our partnership program.
              </CardDescription>
          </CardHeader>
        </Card>
      </ScrollAnimator>
    </div>
  );
}

    