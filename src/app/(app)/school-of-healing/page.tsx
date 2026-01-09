
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
  HeartPulse,
  BookHeart,
  HandHelping,
  ShieldCheck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const corePillars = [
  {
    icon: <BookHeart className="h-6 w-6 text-accent" />,
    title: 'Biblical Basis for Healing',
    description:
      'Understand God\'s will and promises concerning healing throughout Scripture.',
  },
  {
    icon: <HandHelping className="h-6 w-6 text-accent" />,
    title: 'Ministering Healing',
    description:
      'Learn practical, faith-filled ways to pray for the sick and minister healing to others.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-accent" />,
    title: 'Walking in Divine Health',
    description:
      'Cultivate a lifestyle of faith and wellness that sustains your divine health.',
  },
];

const signaturePrograms = [
  {
    title: 'Healing Ministry Bootcamp',
    description:
      'An intensive, hands-on program to activate you in ministering healing with authority and compassion.',
    image: PlaceHolderImages.find((p) => p.id === 'prayer-feature'),
  },
  {
    title: 'Anatomy of a Miracle: Faith, Power, and God\'s Word',
    description:
      'A deep-dive into the dynamics of miracles, exploring the interplay of faith, the power of the Spirit, and the spoken Word.',
    image: PlaceHolderImages.find((p) => p.id === 'live-stream-feature'),
  },
];

export default function SchoolOfHealingPage() {
  const heroImage = PlaceHolderImages.find(
    (p) => p.id === 'prayer-feature'
  );

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <HeartPulse className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-headline font-bold text-foreground">
            School of Healing
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Equipping believers to receive and minister God's healing power.
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 items-center">
          <div className="p-8">
            <CardHeader className="p-0">
              <p className="text-sm font-semibold text-accent">Join Now</p>
              <CardTitle className="text-3xl font-headline mt-2">
                Now Enrolling for the School of Healing
              </CardTitle>
              <CardDescription className="mt-4 text-lg">
                Step into a new dimension of understanding and operating in the healing ministry of Jesus.
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
                alt="School of Healing"
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
