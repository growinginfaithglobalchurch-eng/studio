import Image from 'next/image';
import Link from 'next/link';
import {
  BookOpen,
  HeartHandshake,
  Users,
  Clapperboard,
  Church,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';

const features = [
  {
    icon: <BookOpen className="h-10 w-10 text-primary" />,
    title: 'Deepen Spiritual Growth',
    description: 'Access teachings, devotionals, and interactive tools that nurture consistent spiritual maturity.',
    image: PlaceHolderImages.find(img => img.id === 'devotionals-feature'),
  },
  {
    icon: <Users className="h-10 w-10 text-primary" />,
    title: 'Unite the Faithful',
    description: 'Build an engaged, supportive, and interactive faith community across geographical boundaries.',
    image: PlaceHolderImages.find(img => img.id === 'community-feature'),
  },
  {
    icon: <HeartHandshake className="h-10 w-10 text-primary" />,
    title: 'Equip for Kingdom Impact',
    description: 'Discover your gifts and calling in Christ and activate them in service and influence.',
    image: PlaceHolderImages.find(img => img.id === 'prayer-feature'),
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Church className="h-8 w-8 text-primary" />
            <span className="text-lg font-bold text-foreground font-headline">
              Growing in Faith
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative h-[60vh] md:h-[70vh]">
          <Image
            src={PlaceHolderImages.find(img => img.id === 'hero')?.imageUrl || ''}
            alt="Congregation worshipping"
            fill
            className="object-cover"
            priority
            data-ai-hint="worship congregation"
          />
          <div className="absolute inset-0 bg-primary/70" />
          <div className="relative z-10 flex h-full flex-col items-center justify-center text-center text-primary-foreground">
            <div className="container px-4 md:px-6">
              <h1 className="font-headline text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Deeper Faith. Global Connection.
              </h1>
              <p className="mx-auto mt-6 max-w-3xl text-lg md:text-xl">
                A spiritual ecosystem to grow in faith, access transformational resources, and live out your divine purpose.
              </p>
              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                  <Link href="/dashboard">Join the Community</Link>
                </Button>
                <Button size="lg" variant="outline" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        <section id="features" className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                A Platform for Transformation
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Everything you need to deepen your relationship with God and
                connect with a global family of believers.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader className="flex flex-col items-center text-center p-6">
                    {feature.icon}
                    <CardTitle className="mt-4 font-headline">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center text-muted-foreground px-6 pb-6">
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-card py-12 md:py-24">
           <div className="container mx-auto grid items-center gap-6 px-4 md:grid-cols-2 md:px-6">
             <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                <Image 
                  src={PlaceHolderImages.find(p => p.id === 'live-stream-feature')?.imageUrl || ''}
                  alt="Live streaming session"
                  layout="fill"
                  objectFit="cover"
                  data-ai-hint="pastor preaching"
                />
                <div className="absolute top-4 left-4 flex items-center gap-2 rounded-full bg-red-600 px-3 py-1 text-white">
                  <Clapperboard className="h-4 w-4" />
                  <span className="text-sm font-bold">LIVE</span>
                </div>
              </div>
             <div className="space-y-4">
               <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                 Live Sessions & On-Demand Media
               </h2>
               <p className="text-muted-foreground md:text-xl/relaxed">
                 Tune into live teachings, prophetic sessions, and prayer meetings. Missed a session? Catch up anytime with our extensive on-demand media library.
               </p>
               <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                 <Link href="/dashboard">Watch Now</Link>
               </Button>
             </div>
           </div>
         </section>
      </main>

      <footer className="bg-secondary text-secondary-foreground">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
          <p className="text-sm">
            © {new Date().getFullYear()} Growing in Faith Global Connect. All Rights Reserved.
          </p>
          <nav className="flex gap-4">
            <Link href="#" className="text-sm hover:underline">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm hover:underline">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
