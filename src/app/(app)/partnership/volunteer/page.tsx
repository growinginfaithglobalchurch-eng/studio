
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { ScrollAnimator } from '@/components/scroll-animator';

export default function VolunteerPage() {
  return (
    <div className="space-y-8">
      <ScrollAnimator>
        <div>
          <div className="flex items-center gap-3 mb-2">
              <Users className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-headline font-bold text-foreground">Volunteer with Our Channel</h1>
          </div>
          <p className="text-muted-foreground">
            Use your gifts and talents to serve in the ministry.
          </p>
        </div>
      </ScrollAnimator>

      <ScrollAnimator>
        <Card>
          <CardHeader>
              <CardTitle>Coming Soon</CardTitle>
              <CardDescription>
                  This page is under construction. Please check back later for information on volunteer opportunities.
              </CardDescription>
          </CardHeader>
        </Card>
      </ScrollAnimator>
    </div>
  );
}

    