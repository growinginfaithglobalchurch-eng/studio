
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserCheck, Clapperboard, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const connectionFeatures = [
  {
    icon: <Users className="h-10 w-10 text-accent" />,
    title: 'Faith Groups',
    description: 'Join vibrant communities to share, learn, and grow with fellow believers.',
    href: '/groups',
    cta: 'Explore Groups',
  },
  {
    icon: <UserCheck className="h-10 w-10 text-accent" />,
    title: 'Mentorship Tracks',
    description: 'Connect with seasoned leaders for personalized guidance and spiritual development.',
    href: '/mentorship',
    cta: 'Find a Mentor',
  },
  {
    icon: <Clapperboard className="h-10 w-10 text-accent" />,
    title: 'Live Sessions',
    description: 'Participate in live worship, teachings, and interactive events with the global community.',
    href: '/live',
    cta: 'Join Live',
  },
];

export default function ConnectPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold">Community Connection</h1>
        <p className="text-white">
          Build relationships, find mentorship, and engage in live events.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {connectionFeatures.map((feature) => (
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
