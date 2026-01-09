
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
  Briefcase,
  HeartHandshake,
  Wrench,
  Compass,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const corePillars = [
  {
    icon: <Compass className="h-6 w-6 text-accent" />,
    title: 'Discovering Your Calling',
    description:
      'Identify your unique spiritual gifts and divine purpose through in-depth assessments and guidance.',
  },
  {
    icon: <HeartHandshake className="h-6 w-6 text-accent" />,
    title: 'Developing a Servant\'s Heart',
    description:
      'Cultivate the character and attitude of Christ-like leadership that serves others.',
  },
  {
    icon: <Wrench className="h-6 w-6 text-accent" />,
    title: 'Practical Ministry Skills',
    description:
      'Gain hands-on skills for effective evangelism, discipleship, and community leadership.',
  },
];

const signaturePrograms = [
  {
    title: 'Marketplace Ministry: Impacting Your Workplace',
    description:
      'Learn to be a minister of the gospel in your career, influencing your industry for the Kingdom.',
    image: PlaceHolderImages.find((p) => p.id === 'devotional-1'),
  },
  {
    title: 'Church Leadership & Administration',
    description:
      'A practical program on building and managing healthy church systems, from small groups to large-scale operations.',
    image: PlaceHolderImages.find((p) => p.id === 'live-replay-1'),
  },
];

export default function SchoolOfMinistryPage() {
  const heroImage = PlaceHolderImages.find(
    (p) => p.id === 'community-feature'
  );

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Briefcase className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-headline font-bold text-foreground">
            School of Ministry
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Equipping believers for effective service in every sphere of life.
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 items-center">
          <div className="p-8">
            <CardHeader className="p-0">
              <p className="text-sm font-semibold text-accent">Enrollment Open</p>
              <CardTitle className="text-3xl font-headline mt-2">
                Now Enrolling for the School of Ministry
              </CardTitle>
              <CardDescription className="mt-4 text-lg">
                Move from being a believer to being a minister. Learn to effectively serve God in your church, community, and career.
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
                alt="School of Ministry"
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
