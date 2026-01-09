
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
  BookCheck,
  ClipboardList,
  Target,
  BookOpen,
  Eye,
  Wind,
  Lightbulb,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const corePillars = [
  {
    icon: <BookOpen className="h-6 w-6 text-accent" />,
    title: 'Prophetic Foundations',
    description:
      'Understand the biblical basis of prophecy and its role today.',
  },
  {
    icon: <Eye className="h-6 w-6 text-accent" />,
    title: 'Scriptural Revelation',
    description:
      'Learn to interpret scripture with Spirit-led insight and accuracy.',
  },
  {
    icon: <Wind className="h-6 w-6 text-accent" />,
    title: 'Spirit-Led Living',
    description:
      'Cultivate a lifestyle of hearing God\'s voice and following His lead.',
  },
];

const signaturePrograms = [
  {
    title: 'The Seer\'s Realm: Visions, Dreams & Open Heavens',
    description:
      'An in-depth program on understanding and navigating the spiritual realm of visions and dreams.',
    image: PlaceHolderImages.find((p) => p.id === 'devotional-3'),
  },
  {
    title: 'Advanced Prophetic Ministry & Activation',
    description:
      'For those ready to move into a higher dimension of prophetic accuracy, impact, and stewardship.',
    image: PlaceHolderImages.find((p) => p.id === 'live-replay-1'),
  },
];

export default function SchoolOfRevelationPage() {
  const heroImage = PlaceHolderImages.find(
    (p) => p.id === 'live-stream-feature'
  );

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <GraduationCap className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-headline font-bold text-foreground">
            School of Revelation
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Unlocking the depths of God’s Word and the mysteries of His Kingdom.
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 items-center">
          <div className="p-8">
            <CardHeader className="p-0">
              <p className="text-sm font-semibold text-accent">Grand Opening</p>
              <CardTitle className="text-3xl font-headline mt-2">
                Now Enrolling for the School of Revelation
              </CardTitle>
              <CardDescription className="mt-4 text-lg">
                Step into a new dimension of spiritual understanding and
                operate in the fullness of God’s revelatory gifts.
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
                alt="School of Revelation"
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
