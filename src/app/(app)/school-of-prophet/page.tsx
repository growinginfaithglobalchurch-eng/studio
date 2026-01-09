
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
  GraduationCap,
  Ear,
  ShieldCheck,
  PackageCheck,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const corePillars = [
  {
    icon: <Ear className="h-6 w-6 text-accent" />,
    title: 'Discerning the Voice of God',
    description:
      'Learn to accurately distinguish God\'s voice from other influences.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-accent" />,
    title: 'Prophetic Integrity & Character',
    description:
      'Develop the Christ-like character necessary to carry a prophetic mantle with honor.',
  },
  {
    icon: <PackageCheck className="h-6 w-6 text-accent" />,
    title: 'Stewarding Prophetic Words',
    description:
      'Understand how to properly deliver, interpret, and walk out prophetic words.',
  },
];

const signaturePrograms = [
  {
    title: 'Prophetic Activation Bootcamp',
    description:
      'An intensive, hands-on program to activate you in ministering prophetically with boldness and accuracy.',
    image: PlaceHolderImages.find((p) => p.id === 'community-feature'),
  },
  {
    title: 'Advanced Seer\'s Training: Interpreting Visions & Dreams',
    description:
      'A deep-dive into the seer dimension, focusing on understanding and interpreting symbolic revelation.',
    image: PlaceHolderImages.find((p) => p.id === 'live-stream-feature'),
  },
];

export default function SchoolOfTheProphetPage() {
  const heroImage = PlaceHolderImages.find(
    (p) => p.id === 'devotional-3'
  );

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <GraduationCap className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-headline font-bold text-foreground">
            School of the Prophet
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Raising a generation that speaks the heart of God with clarity and power.
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 items-center">
          <div className="p-8">
            <CardHeader className="p-0">
              <p className="text-sm font-semibold text-accent">Enrollment Open</p>
              <CardTitle className="text-3xl font-headline mt-2">
                Now Enrolling for the School of the Prophet
              </CardTitle>
              <CardDescription className="mt-4 text-lg">
                Answer the call to be a clear and trusted voice for God in your generation.
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
                alt="School of the Prophet"
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
