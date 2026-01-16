
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Gift } from 'lucide-react';
import { ScrollAnimator } from '@/components/scroll-animator';

export default function PartnerGiftsPage() {
  return (
    <div className="space-y-8">
      <ScrollAnimator>
        <div>
          <div className="flex items-center gap-3 mb-2">
              <Gift className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-headline font-bold text-foreground">First Gifts for Our Partners</h1>
          </div>
          <p className="text-muted-foreground">
            A token of our appreciation for your partnership.
          </p>
        </div>
      </ScrollAnimator>

      <ScrollAnimator>
        <Card>
          <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                  This page is under construction. Please check back later for more information on gifts for our partners.
              </CardDescription>
          </CardHeader>
        </Card>
      </ScrollAnimator>
    </div>
  );
}

    