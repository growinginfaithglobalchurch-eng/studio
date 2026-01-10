

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
  ShieldCheck,
  BookMarked,
  Eye,
  UserCheck,
  Network,
  Sparkles,
  Swords,
  Globe,
  Zap,
  RefreshCw,
} from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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

const inEssencePoints = [
  {
    icon: <Network className="h-8 w-8 text-accent" />,
    title: 'A Digital Church Extension',
  },
  {
    icon: <Sparkles className="h-8 w-8 text-accent" />,
    title: 'A Faith Activation System',
  },
  {
    icon: <Swords className="h-8 w-8 text-accent" />,
    title: 'A Kingdom Training Ground',
  },
  {
    icon: <Globe className="h-8 w-8 text-accent" />,
    title: 'A Global Spiritual Family',
  },
];


const leadershipPoints = [
    {
        icon: <ShieldCheck className="h-6 w-6 text-accent" />,
        title: "Apostolic & Prophetic Foundation",
    },
    {
        icon: <BookMarked className="h-6 w-6 text-accent" />,
        title: "Doctrinal Depth & Revelatory Accuracy",
    },
    {
        icon: <Eye className="h-6 w-6 text-accent" />,
        title: "Spiritual Oversight & Vision Alignment",
    },
    {
        icon: <UserCheck className="h-6 w-6 text-accent" />,
        title: "Mandate to Raise a Mature End-Time Generation",
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
              <div className="absolute inset-0 bg-gradient-to-t from-background/70 to-transparent" />
              <div className="relative z-10 flex h-full flex-col items-center justify-center text-center">
                <div className="container px-4 md:px-6">
                  <h1 className="font-headline text-4xl font-bold tracking-wide text-white sm:text-5xl md:text-6xl lg:text-7xl">
                    Deeper Faith. Global Connection.
                  </h1>
                  <p className="mx-auto mt-6 max-w-3xl text-lg text-white/90 md:text-xl">
                    An interactive spiritual ecosystem to grow in faith, access transformational resources, and live out your divine purpose.
                  </p>
                  <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <Button size="lg" asChild>
                      <Link href="/signup">Get Started</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                      <Link href="/dashboard">Explore Platform</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </AspectRatio>
          </div>
        </section>

        <section className="py-12 md:py-20 text-center bg-secondary">
            <div className="container px-4 md:px-6">
                <p className="font-semibold text-accent tracking-wider uppercase">Welcome to</p>
                <h2 className="font-headline text-4xl font-bold tracking-wide sm:text-5xl text-card-foreground mt-2">
                    The Year of Restoration &amp; Acceleration
                </h2>
                <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                    This is a season of divine recovery and supernatural advancement. God is restoring what was lost and accelerating His promises in your life. Position yourself for an unprecedented move of the Spirit!
                </p>
                <div className="flex justify-center gap-6 mt-6">
                    <div className="flex items-center gap-2 text-foreground">
                        <RefreshCw className="h-5 w-5 text-accent"/>
                        <span>Restoration</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground">
                        <Zap className="h-5 w-5 text-accent"/>
                        <span>Acceleration</span>
                    </div>
                </div>
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
                    <p className="text-card-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24 bg-secondary">
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
                        <p className="text-muted-foreground mt-2">{value.description}</p>
                    </Card>
                ))}
            </div>
          </div>
        </section>

        <section className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-wide sm:text-4xl text-foreground">
                In Essence
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Growing in Faith Global Connect is:
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              {inEssencePoints.map((point) => (
                <Card
                  key={point.title}
                  className="bg-card p-6 text-center flex flex-col items-center"
                >
                  {point.icon}
                  <h3 className="text-lg font-bold text-card-foreground mt-4">
                    {point.title}
                  </h3>
                </Card>
              ))}
            </div>
            <p className="mt-12 text-center text-lg max-w-4xl mx-auto text-muted-foreground">
              It exists to transform non-existent realities into existence through faith, empowering believers to live fully in Christ and fulfill divine purpose on earth.
            </p>
          </div>
        </section>

        <section id="founders" className="py-12 md:py-24 bg-secondary">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-wide sm:text-4xl text-foreground">
                Meet the Founders
              </h2>
              <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                Founded by The Bondservant of Christ, Joseph Tryson, with Prophetess Norah Tryson.
              </p>
            </div>
            <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                <Card className="flex flex-col items-center p-8 text-center bg-card">
                    <Avatar className="w-24 h-24 mb-4 border-4 border-accent">
                        <AvatarImage src={PlaceHolderImages.find(p => p.id === 'avatar-1')?.imageUrl} alt="Joseph Tryson"/>
                        <AvatarFallback>JT</AvatarFallback>
                    </Avatar>
                    <h3 className="font-headline text-xl font-bold text-card-foreground">The Bondservant of Christ, Joseph Tryson</h3>
                    <p className="mt-2 text-muted-foreground">A visionary leader, author, and spiritual mentor whose life’s mandate centers on unlocking human potential in Christ.</p>
                </Card>
                 <Card className="flex flex-col items-center p-8 text-center bg-card">
                    <Avatar className="w-24 h-24 mb-4 border-4 border-accent">
                        <AvatarImage src={PlaceHolderImages.find(p => p.id === 'avatar-2')?.imageUrl} alt="Prophetess Norah Tryson"/>
                        <AvatarFallback>NT</AvatarFallback>
                    </Avatar>
                    <h3 className="font-headline text-xl font-bold text-card-foreground">Prophetess Norah Tryson</h3>
                    <p className="mt-2 text-muted-foreground">A prophetic voice and co-leader whose ministry amplifies the revelation of God’s heart for His people.</p>
                </Card>
                <Card className="flex flex-col p-8 bg-card lg:col-span-2 lg:row-start-1 lg:col-start-3">
                     <CardHeader className="p-0 text-center">
                        <CardTitle className="font-headline text-xl font-bold text-card-foreground">Our Leadership Covering</CardTitle>
                        <CardDescription className="mt-2 text-muted-foreground">Their leadership provides:</CardDescription>
                     </CardHeader>
                     <CardContent className="mt-6">
                        <ul className="space-y-4">
                            {leadershipPoints.map((point) => (
                                <li key={point.title} className="flex items-center gap-4">
                                    {point.icon}
                                    <span className="font-medium text-card-foreground">{point.title}</span>
                                </li>
                            ))}
                        </ul>
                     </CardContent>
                </Card>
            </div>
          </div>
        </section>

      </main>

      <footer className="bg-background text-foreground">
        <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row md:px-6">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Faith Connect Global. All Rights Reserved.
          </p>
          <nav className="flex gap-4">
            <Link href="#" className="text-sm hover:underline text-muted-foreground">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm hover:underline text-muted-foreground">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
