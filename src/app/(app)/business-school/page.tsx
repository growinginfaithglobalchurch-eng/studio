
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
  TrendingUp,
  DollarSign,
  Briefcase,
  Lightbulb,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ScrollAnimator } from '@/components/scroll-animator';

const corePillars = [
  {
    icon: <DollarSign className="h-6 w-6 text-accent" />,
    title: 'Kingdom Economics & Finance',
    description:
      'Understand wealth creation, stewardship, and investment from a biblical perspective.',
  },
  {
    icon: <Briefcase className="h-6 w-6 text-accent" />,
    title: 'Marketplace Leadership & Ethics',
    description:
      'Lead with integrity and excellence, transforming your workplace into a sphere of influence.',
  },
  {
    icon: <Lightbulb className="h-6 w-6 text-accent" />,
    title: 'Spirit-Led Entrepreneurship',
    description:
      'Launch and grow ventures that are both profitable and purposeful, guided by the Holy Spirit.',
  },
];

const signaturePrograms = [
  {
    title: 'Startup & Small Business Incubator',
    description:
      'A comprehensive program to help you launch and scale your business idea with mentorship and practical resources.',
    image: PlaceHolderImages.find((p) => p.id === 'devotional-1'),
  },
  {
    title: 'Wealth Creation & Stewardship',
    description:
      'Learn biblical principles for generating wealth and managing it for Kingdom impact and generational legacy.',
    image: PlaceHolderImages.find((p) => p.id === 'community-feature'),
  },
];

export default function BusinessSchoolPage() {
  const heroImage = PlaceHolderImages.find(
    (p) => p.id === 'live-replay-1'
  );

  return (
    <div className="space-y-8">
      <ScrollAnimator>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">
              Business School Core100
            </h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Equipping marketplace leaders and entrepreneurs for Kingdom impact.
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
                  Now Enrolling for Business School Core100
                </CardTitle>
                <CardDescription className="mt-4 text-lg">
                  Integrate your faith with cutting-edge business strategy and build for eternal significance.
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
                  alt="Business School"
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
          <h2 className="text-2xl font-headline font-bold mb-4">Core Competencies</h2>
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
            Key Modules
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
