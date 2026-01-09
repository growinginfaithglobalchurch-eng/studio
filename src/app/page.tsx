

import Image from 'next/image';
import Link from 'next/link';
import {
  BookOpen,
  HeartHandshake,
  Users,
  Clapperboard,
  Church,
  Target,
  Gem,
  Rocket,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const features = [
  {
    icon: <BookOpen className="h-10 w-10 text-accent" />,
    title: 'Deepen Spiritual Growth',
    description: 'Access teachings, devotionals, and interactive tools that nurture consistent spiritual maturity.',
    image: PlaceHolderImages.find(img => img.id === 'devotionals-feature'),
  },
  {
    icon: <Users className="h-10 w-10 text-accent" />,
    title: 'Unite the Faithful',
    description: 'Build an engaged, supportive, and interactive faith community across geographical boundaries.',
    image: PlaceHolderImages.find(img => img.id === 'community-feature'),
  },
  {
    icon: <Rocket className="h-10 w-10 text-accent" />,
    title: 'Equip for Kingdom Impact',
    description: 'Discover your gifts and calling in Christ and activate them in service and influence.',
    image: PlaceHolderImages.find(img => img.id === 'prayer-feature'),
  },
];

const values = [
    {
      icon: <Target className="h-8 w-8 text-accent" />,
      title: "Our Vision",
      description: "To build a global digital altar where believers are raised, equipped, and released to live beyond limitations through faith in Christ."
    },
    {
      icon: <Rocket className="h-8 w-8 text-accent" />,
      title: "Our Mission",
      description: "To recruit, identify, equip, deploy, and sustain believers worldwide by providing a Spirit-led platform for growth, revelation, and kingdom impact."
    },
    {
      icon: <Gem className="h-8 w-8 text-accent" />,
      title: "Our Purpose",
      description: "To make spiritual growth accessible, structured, and transformational for believers everywhere—turning faith into lifestyle and revelation into impact."
    }
]


export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
          <Link href="/" className="flex items-center gap-2">
            <Church className="h-8 w-8 text-accent" />
            <span className="text-lg font-headline font-bold text-foreground">
              Faith Connect Global
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link href="/login">Log In</Link>
            </Button>
            <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/signup">Get Started</Link>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="relative">
          <div className="container px-0 md:px-6">
            <AspectRatio ratio={16 / 9} className="relative">
              <Image
                src={PlaceHolderImages.find(img => img.id === 'hero')?.imageUrl || ''}
                alt="Congregation worshipping"
                fill
                className="object-cover md:rounded-lg"
                priority
                data-ai-hint="worship congregation"
              />
              
              <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                <div className="container px-4 md:px-6">
                  <h1 className="font-headline text-4xl font-bold tracking-wide text-white sm:text-5xl md:text-6xl lg:text-7xl">
                    Deeper Faith. Global Connection.
                  </h1>
                  <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 md:text-xl">
                    Connecting Faith. Activating Purpose. Impacting the World.
                  </p>
                  <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <Link href="/signup">Join the Community</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
                      <Link href="/#features">Learn More</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </AspectRatio>
          </div>
        </section>
        
        <section id="features" className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-wide sm:text-4xl text-foreground">
                A Platform for Transformation
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Everything you need to deepen your relationship with God and
                connect with a global family of believers.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              {features.map((feature, index) => (
                <Card key={index} className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 bg-card">
                  <CardHeader className="flex flex-col items-center text-center p-6">
                    {feature.icon}
                    <CardTitle className="mt-4 font-headline font-bold text-card-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center px-6 pb-6">
                    <p className="text-black/60">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary py-12 md:py-24">
          <div className="container px-4 md:px-6">
             <div className="mb-12 text-center">
                 <h2 className="font-headline text-3xl font-bold tracking-wide sm:text-4xl text-foreground">
                    Our Core Convictions
                  </h2>
                   <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                    The heart behind our global digital altar.
                  </p>
             </div>
            <div className="grid gap-8 md:grid-cols-3">
                {values.map((value) => (
                    <Card key={value.title} className="bg-card p-6 text-center flex flex-col items-center">
                         {value.icon}
                        <h3 className="text-xl font-bold text-card-foreground mt-4">{value.title}</h3>
                        <p className="text-black/60 mt-2">{value.description}</p>
                    </Card>
                ))}
            </div>
          </div>
        </section>

        <section id="founders" className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-wide sm:text-4xl text-foreground">
                Meet the Founders
              </h2>
            </div>
            <div className="grid gap-10 md:grid-cols-2">
                <Card className="flex flex-col items-center p-8 text-center bg-card">
                    <Avatar className="w-24 h-24 mb-4 border-4 border-accent">
                        <AvatarImage src={PlaceHolderImages.find(p => p.id === 'avatar-1')?.imageUrl} alt="Joseph Tryson"/>
                        <AvatarFallback>JT</AvatarFallback>
                    </Avatar>
                    <h3 className="font-headline text-xl font-bold text-card-foreground">The Bondservant of Christ, Joseph Tryson</h3>
                    <p className="mt-2 text-black/60">A visionary leader, author, and spiritual mentor whose life’s mandate centers on unlocking human potential in Christ.</p>
                </Card>
                 <Card className="flex flex-col items-center p-8 text-center bg-card">
                    <Avatar className="w-24 h-24 mb-4 border-4 border-accent">
                        <AvatarImage src={PlaceHolderImages.find(p => p.id === 'avatar-2')?.imageUrl} alt="Prophetess Norah Tryson"/>
                        <AvatarFallback>NT</AvatarFallback>
                    </Avatar>
                    <h3 className="font-headline text-xl font-bold text-card-foreground">Prophetess Norah Tryson</h3>
                    <p className="mt-2 text-black/60">A prophetic voice and co-leader whose ministry amplifies the revelation of God’s heart for His people.</p>
                </Card>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-secondary text-secondary-foreground">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
          <p className="text-sm text-black/60">
            © {new Date().getFullYear()} Faith Connect Global. All Rights Reserved.
          </p>
          <nav className="flex gap-4">
            <Link href="#" className="text-sm hover:underline text-black/60">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm hover:underline text-black/60">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
