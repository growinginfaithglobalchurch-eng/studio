
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
  BookOpen,
  Shield,
  HeartPulse,
  Swords,
  TrendingUp,
  Briefcase,
  Wind,
  Voicemail,
  Sparkles,
  User,
  Star,
  Quote
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { communityUsers } from '@/lib/data';

const coreSchools = [
  {
    icon: <Sparkles className="h-6 w-6 text-accent" />,
    title: 'School of Revelation',
    description: 'Unlocking the depths of God’s Word and the mysteries of His Kingdom.',
    href: '/school-of-revelation',
  },
  {
    icon: <Wind className="h-6 w-6 text-accent" />,
    title: 'School of the Spirit',
    description: 'Cultivating a life of intimacy, power, and partnership with the Holy Spirit.',
    href: '/school-of-the-spirit',
  },
  {
    icon: <HeartPulse className="h-6 w-6 text-accent" />,
    title: 'School of Healing',
    description: 'Equipping believers to receive and minister God\'s healing power.',
    href: '/school-of-healing',
  },
  {
    icon: <Voicemail className="h-6 w-6 text-accent" />,
    title: 'School of the Prophet',
    description: 'Raising a generation that speaks the heart of God with clarity and power.',
    href: '/school-of-prophet',
  },
  {
    icon: <Swords className="h-6 w-6 text-accent" />,
    title: 'School of Deliverance',
    description: 'Equipping the saints to set the captives free and walk in total victory.',
    href: '/school-of-deliverance',
  },
  {
    icon: <Briefcase className="h-6 w-6 text-accent" />,
    title: 'School of Ministry',
    description: 'Equipping believers for effective service in every sphere of life.',
    href: '/school-of-ministry',
  },
   {
    icon: <TrendingUp className="h-6 w-6 text-accent" />,
    title: 'Business School',
    description: 'Equipping marketplace leaders and entrepreneurs for Kingdom impact.',
    href: '/business-school',
  },
];

const studentTestimonials = [
    {
        name: communityUsers[1].name,
        avatar: communityUsers[1].avatar,
        level: 4,
        testimonial: "The School of the Prophet completely transformed how I hear God's voice. The mentorship I received was invaluable and has given me the confidence to step out in my calling."
    },
    {
        name: communityUsers[2].name,
        avatar: communityUsers[2].avatar,
        level: 3,
        testimonial: "I came in with a lot of questions and left with a solid foundation. The curriculum is challenging, biblically sound, and incredibly practical for everyday life."
    }
]


export default function BibleSchoolPage() {
  const heroImage = PlaceHolderImages.find(
    (p) => p.id === 'devotionals-feature'
  );

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <GraduationCap className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-headline font-bold text-foreground">
            Growing In Faith Global Bible Institute
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Raising and equipping a generation that walks in the fullness of their identity and authority in Christ.
        </p>
      </div>

      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 items-center">
          <div className="p-8">
            <CardHeader className="p-0">
              <p className="text-sm font-semibold text-accent">Enrollment Now Open</p>
              <CardTitle className="text-3xl font-headline mt-2">
                Begin Your Transformational Journey
              </CardTitle>
              <CardDescription className="mt-4 text-lg">
                Our institute is more than an academic exercise; it's a spiritual equipping center designed to activate your calling.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0 mt-6">
              <Button size="lg" asChild>
                <Link href="/signup">Apply Now</Link>
              </Button>
            </CardContent>
          </div>
          {heroImage && (
            <div className="relative h-64 md:h-full w-full">
              <Image
                src={heroImage.imageUrl}
                alt="Bible Institute"
                fill
                className="object-cover"
                data-ai-hint={heroImage.imageHint}
              />
            </div>
          )}
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1">
             <CardHeader>
                <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-accent"/>Curriculum Structure</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <h3 className="font-semibold text-foreground">Levels 1-4</h3>
                    <p className="text-sm text-muted-foreground">Progress through foundational to advanced levels of spiritual truth and practical ministry.</p>
                </div>
                 <div>
                    <h3 className="font-semibold text-foreground">Mentorship</h3>
                    <p className="text-sm text-muted-foreground">Each student is assigned a mentor for personal guidance, accountability, and impartation.</p>
                </div>
                 <div>
                    <h3 className="font-semibold text-foreground">Assessments & Activation</h3>
                    <p className="text-sm text-muted-foreground">Practical assignments and quizzes ensure comprehension, leading to real-world activation of your gifts.</p>
                </div>
            </CardContent>
        </Card>
        <div className="lg:col-span-2">
            <h2 className="text-2xl font-headline font-bold mb-4">Core Schools of the Institute</h2>
            <div className="grid gap-6 md:grid-cols-2">
            {coreSchools.map((school) => (
                <Card key={school.title} className="hover:bg-secondary/50 transition-colors">
                <CardHeader>
                    <div className="flex items-center gap-3">
                        {school.icon}
                        <CardTitle className="text-lg font-headline">{school.title}</CardTitle>
                    </div>
                </CardHeader>
                <CardFooter>
                    <Button variant="outline" asChild>
                        <Link href={school.href}>Learn More</Link>
                    </Button>
                </CardFooter>
                </Card>
            ))}
            </div>
        </div>
      </div>
      
       <div>
            <h2 className="text-2xl font-headline font-bold mb-4 text-center">Student Testimonials</h2>
            <div className="grid gap-8 md:grid-cols-2">
                {studentTestimonials.map((testimonial, index) => (
                    <Card key={index} className="bg-card">
                        <CardContent className="pt-6">
                            <div className="flex gap-4">
                                <Avatar className="w-16 h-16 border-2 border-accent">
                                    <AvatarImage src={testimonial.avatar?.imageUrl} alt={testimonial.name} />
                                    <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-lg font-bold">{testimonial.name}</p>
                                    <p className="text-sm text-muted-foreground">Level {testimonial.level} Student</p>
                                </div>
                            </div>
                            <blockquote className="mt-4 border-l-2 border-accent pl-4 italic text-muted-foreground">
                                "{testimonial.testimonial}"
                            </blockquote>
                        </CardContent>
                    </Card>
                ))}
            </div>
       </div>

    </div>
  );
}
