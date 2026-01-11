
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
  BookOpen,
  ScrollText,
  Landmark,
  Scale,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ScrollAnimator } from '@/components/scroll-animator';

const corePillars = [
  {
    icon: <ScrollText className="h-6 w-6 text-accent" />,
    title: 'Systematic Theology',
    description:
      'Understanding the foundational doctrines of the faith in a structured, coherent way.',
  },
  {
    icon: <Scale className="h-6 w-6 text-accent" />,
    title: 'Biblical Hermeneutics',
    description:
      'Mastering the art and science of biblical interpretation to accurately handle the Word of truth.',
  },
  {
    icon: <Landmark className="h-6 w-6 text-accent" />,
    title: 'Church History & Doctrine',
    description:
      'Tracing the development of Christian thought and doctrine from the early church to the present day.',
  },
];

const signaturePrograms = [
  {
    title: 'Old & New Testament Survey',
    description:
      'A comprehensive journey through the entire Bible, providing historical context and theological themes for every book.',
    image: PlaceHolderImages.find((p) => p.id === 'devotionals-feature'),
  },
  {
    title: 'Advanced Christology: The Person and Work of Christ',
    description:
      'An in-depth study of the nature, person, and redemptive work of Jesus Christ, from Old Testament prophecy to New Testament fulfillment.',
    image: PlaceHolderImages.find((p) => p.id === 'live-stream-feature'),
  },
];

export default function BibleTheologyPage() {
  const heroImage = PlaceHolderImages.find(
    (p) => p.id === 'devotionals-feature'
  );

  return (
    <div className="space-y-8">
      <ScrollAnimator>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">
              Bible Theology (All Levels)
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            A deep dive into systematic theology, biblical interpretation, and church history, activated at a professional and international level.
          </p>
        </div>
      </ScrollAnimator>

      <ScrollAnimator>
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 items-center">
            <div className="p-8">
              <CardHeader className="p-0">
                <p className="text-sm font-semibold text-accent">Enrollment Open</p>
                <CardTitle className="text-3xl font-headline mt-2">
                  Master the Word of God
                </CardTitle>
                <CardDescription className="mt-4 text-lg">
                  Build an unshakable theological foundation to defend your faith and effectively minister the Gospel with depth and accuracy.
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
                  alt="Bible Theology"
                  fill
                  className="object-cover"
                  data-ai-hint={heroImage.imageHint}
                />
              </div>
            )}
          </div>
        </Card>
      </ScrollAnimator>

      <ScrollAnimator>
        <div>
          <h2 className="text-2xl font-headline font-bold mb-4">Core Pillars</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {corePillars.map((pillar, index) => (
              <ScrollAnimator key={pillar.title} delay={index * 0.1}>
                <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                    {pillar.icon}
                    <CardTitle>{pillar.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{pillar.description}</p>
                  </CardContent>
                </Card>
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </ScrollAnimator>

      <ScrollAnimator>
        <div>
          <h2 className="text-2xl font-headline font-bold mb-4">
            Signature Programs
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {signaturePrograms.map((program, index) => (
              <ScrollAnimator key={program.title} delay={index * 0.1}>
                <Card className="flex flex-col">
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
              </ScrollAnimator>
            ))}
          </div>
        </div>
      </ScrollAnimator>
    </div>
  );
}
