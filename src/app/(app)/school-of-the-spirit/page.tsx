
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
  Wind,
  Gift,
  Flame,
  UserCheck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const corePillars = [
  {
    icon: <UserCheck className="h-6 w-6 text-accent" />,
    title: 'The Person of the Holy Spirit',
    description:
      'Develop intimacy with the Holy Spirit as a person, guide, and comforter.',
  },
  {
    icon: <Gift className="h-6 w-6 text-accent" />,
    title: 'Gifts of the Spirit',
    description:
      'Discover, activate, and mature in the supernatural gifts for ministry and life.',
  },
  {
    icon: <Flame className="h-6 w-6 text-accent" />,
    title: 'The Anointing',
    description:
      'Understand and carry the anointing for breakthrough and impact.',
  },
];

const signaturePrograms = [
  {
    title: 'Operating in the Gifts: A Practical Workshop',
    description:
      'A hands-on program to help you confidently step out and minister with the gifts of the Spirit.',
    image: PlaceHolderImages.find((p) => p.id === 'community-feature'),
  },
  {
    title: 'The Dynamics of the Anointing: From Personal to Corporate',
    description:
      'Explore the different dimensions of the anointing and how it operates in individuals and the church body.',
    image: PlaceHolderImages.find((p) => p.id === 'prayer-feature'),
  },
];

export default function SchoolOfTheSpiritPage() {
  const heroImage = PlaceHolderImages.find(
    (p) => p.id === 'live-replay-2'
  );

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Wind className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-headline font-bold text-foreground">
            School of the Spirit
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Cultivating a life of intimacy, power, and partnership with the Holy Spirit.
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 items-center">
          <div className="p-8">
            <CardHeader className="p-0">
              <p className="text-sm font-semibold text-accent">Join the Movement</p>
              <CardTitle className="text-3xl font-headline mt-2">
                Now Enrolling for the School of the Spirit
              </CardTitle>
              <CardDescription className="mt-4 text-lg">
                Go deeper than just learning about the Spirit—learn to live in and by Him every day.
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
                alt="School of the Spirit"
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
