
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Star, HandHelping, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const engagementFeatures = [
  {
    icon: <BookOpen className="h-10 w-10 text-accent" />,
    title: 'Daily Faith Practices',
    description: 'Nourish your spirit with daily devotionals, prayer requests, and community worship.',
    href: '/devotionals',
    cta: 'Start Daily Practices',
  },
  {
    icon: <Star className="h-10 w-10 text-accent" />,
    title: 'Learning Journeys',
    description: 'Engage with courses, teachings, and live sessions to deepen your understanding.',
    href: '/live',
    cta: 'Begin Learning',
  },
  {
    icon: <HandHelping className="h-10 w-10 text-accent" />,
    title: 'Kingdom Service',
    description: 'Discover your calling, connect with ministries, and find opportunities to serve.',
    href: '/ministries',
    cta: 'Find Your Place',
  },
];

export default function ConnectPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Activation & Engagement</h1>
        <p className="text-white">
          Begin your journey of growth and purpose.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {engagementFeatures.map((feature) => (
          <Card key={feature.title} className="flex flex-col">
            <CardHeader className="items-center text-center">
                <div className="p-4 bg-muted rounded-full">
                    {feature.icon}
                </div>
                <CardTitle className="pt-4 font-headline text-xl font-bold">{feature.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-grow text-center">
              <CardDescription>{feature.description}</CardDescription>
            </CardContent>
            <div className="p-6 pt-0">
                <Button asChild className="w-full">
                    <Link href={feature.href}>
                        {feature.cta}
                        <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
