
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Swords,
  ShieldCheck,
  KeyRound,
  Hammer,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const corePillars = [
  {
    icon: <ShieldCheck className="h-6 w-6 text-accent" />,
    title: 'The Believer\'s Authority',
    description:
      'Understand the authority you possess in Christ to overcome demonic powers.',
  },
  {
    icon: <Hammer className="h-6 w-6 text-accent" />,
    title: 'Ministering Deliverance',
    description:
      'Learn the biblical principles and safe practices for casting out demons and setting captives free.',
  },
  {
    icon: <KeyRound className="h-6 w-6 text-accent" />,
    title: 'Maintaining Your Freedom',
    description:
      'Discover how to live a victorious life and keep the doors closed to the enemy.',
  },
];

const signaturePrograms = [
  {
    title: 'Deliverance Ministry Intensive',
    description:
      'A comprehensive course on the theory and practice of deliverance ministry for personal and corporate settings.',
    image: PlaceHolderImages.find((p) => p.id === 'prayer-feature'),
  },
  {
    title: 'Advanced Spiritual Warfare & Territorial Intercession',
    description:
      'A deep-dive into higher-level spiritual warfare, dealing with principalities and territorial spirits.',
    image: PlaceHolderImages.find((p) => p.id === 'live-replay-1'),
  },
];

export default function SchoolOfDeliverancePage() {
  const heroImage = PlaceHolderImages.find(
    (p) => p.id === 'devotional-2'
  );

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Swords className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-headline font-bold text-foreground">
            School of Deliverance
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Equipping the saints to set the captives free and walk in total victory.
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 items-center">
          <div className="p-8">
            <CardHeader className="p-0">
              <p className="text-sm font-semibold text-accent">Enrollment Open</p>
              <CardTitle className="text-3xl font-headline mt-2">
                Now Enrolling for the School of Deliverance
              </CardTitle>
              <CardDescription className="mt-4 text-lg">
                Learn to operate in the power and authority of Jesus Christ to bring freedom to yourself and others.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-6">
              <Button size="lg" asChild>
                <Link href="/signup">Enroll Now</Link>
              </Button>
            </CardContent>
          </div>
          {heroImage && (
            <div className="relative h-64 md:h-full w-full">
              <Image
                src={heroImage.imageUrl}
                alt="School of Deliverance"
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />
            </div>
          )}
        </div>
      </Card>

      <div>
        <h2 className="text-2xl font-headline font-bold mb-4">Core Pillars</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {corePillars.map((pillar) => (
            <Card key={pillar.title}>
              <CardHeader className="flex flex-row items-center gap-4">
                {pillar.icon}
                <CardTitle>{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{pillar.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-headline font-bold mb-4">
          Signature Programs
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          {signaturePrograms.map((program) => (
            <Card key={program.title} className="flex flex-col">
              {program.image && (
                <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={program.image.imageUrl}
                    alt={program.title}
                    fill
                    className="object-cover"
                    data-ai-hint={program.image.imageHint}
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle className="font-headline">{program.title}</CardTitle>
                <CardDescription>{program.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow" />
              <CardFooter>
                <Button variant="outline">Explore Curriculum</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
