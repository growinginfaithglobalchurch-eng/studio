
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Globe } from 'lucide-react';
import { ScrollAnimator } from '@/components/scroll-animator';

export default function KingdomExpandersPage() {
  return (
    <div className="space-y-8">
      <ScrollAnimator>
        <div>
          <div className="flex items-center gap-3 mb-2">
              <Globe className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-headline font-bold text-foreground">Become a Kingdom Expander</h1>
          </div>
          <p className="text-muted-foreground">
            Join a dedicated group committed to expanding the Kingdom.
          </p>
        </div>
      </ScrollAnimator>

      <ScrollAnimator>
        <Card>
          <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                  This page is under construction. Please check back later for more information on our Kingdom Expanders program.
              </CardDescription>
          </CardHeader>
        </Card>
      </ScrollAnimator>
    </div>
  );
}

    