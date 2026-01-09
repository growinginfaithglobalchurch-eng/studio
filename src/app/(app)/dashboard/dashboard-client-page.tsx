
'use client';

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
      icon: <Gem className="h-8 w-8 text-accent" />,
      title: "Faith at the Center",
      description: "Championing a lifestyle where faith is the foundation of every decision and action."
    },
    {
      icon: <Users className="h-8 w-8 text-accent" />,
      title: "Authentic Community",
      description: "Fostering genuine connections and support among believers worldwide."
    },
    {
      icon: <Rocket className="h-8 w-8 text-accent" />,
      title: "Purpose-Driven Growth",
      description: "Empowering every user to discover and walk in their God-given purpose and impact."
    }
]


export default function DashboardClientPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background -m-4 lg:-m-6">
      <main className="flex-1">
        <section className="relative">
          <div className="px-0 md:px-6">
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
                    An interactive spiritual ecosystem to grow in faith, access transformational resources, and live out your divine purpose.
                  </p>
                  <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                    <Button size="lg" asChild className="bg-accent text-accent-foreground hover:bg-accent/90">
                      <Link href="/profile">View Your Profile</Link>
                    </Button>
                    <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
                      <Link href="/connect">Connect with Others</Link>
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
                <Card key={index} className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
                  <CardHeader className="flex flex-col items-center text-center p-6">
                    {feature.icon}
                    <CardTitle className="mt-4 font-headline font-bold">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-center px-6 pb-6">
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-secondary py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <Card className="p-8 md:p-12">
              <div className="grid items-center gap-12 md:grid-cols-2">
                <div className="space-y-4">
                    <div className="inline-block rounded-lg bg-accent px-3 py-1 text-sm text-accent-foreground">Our Vision</div>
                  <h2 className="font-headline text-3xl font-bold tracking-wide sm:text-4xl">
                    Cultivating a Global Community of Empowered Believers
                  </h2>
                  <p className="text-muted-foreground md:text-xl/relaxed">
                    We exist to ignite and sustain a lifestyle of faith that produces lasting transformation in individuals, families, and nations—revealing God’s power, presence, and purpose in everyday life.
                  </p>
                </div>
                <div className="flex flex-col gap-6">
                    {values.map((value) => (
                        <div key={value.title} className="flex items-start gap-4">
                            {value.icon}
                            <div>
                                <h3 className="text-lg font-bold">{value.title}</h3>
                                <p className="text-muted-foreground">{value.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
              </div>
            </Card>
          </div>
        </section>

        <section id="founders" className="py-12 md:py-24">
          <div className="container px-4 md:px-6">
            <div className="mb-12 text-center">
              <h2 className="font-headline text-3xl font-bold tracking-wide sm:text-4xl">
                Meet the Founders
              </h2>
            </div>
            <div className="grid gap-10 md:grid-cols-2">
                <Card className="flex flex-col items-center p-8 text-center">
                    <Avatar className="w-24 h-24 mb-4 border-4 border-accent">
                        <AvatarImage src={PlaceHolderImages.find(p => p.id === 'avatar-1')?.imageUrl} alt="Joseph Tryson"/>
                        <AvatarFallback>JT</AvatarFallback>
                    </Avatar>
                    <h3 className="font-headline text-xl font-bold">The Bondservant of Christ, Joseph Tryson</h3>
                    <p className="mt-2 text-muted-foreground">A visionary leader, author, and spiritual mentor whose life’s mandate centers on unlocking human potential in Christ.</p>
                </Card>
                 <Card className="flex flex-col items-center p-8 text-center">
                    <Avatar className="w-24 h-24 mb-4 border-4 border-accent">
                        <AvatarImage src={PlaceHolderImages.find(p => p.id === 'avatar-2')?.imageUrl} alt="Prophetess Norah Tryson"/>
                        <AvatarFallback>NT</AvatarFallback>
                    </Avatar>
                    <h3 className="font-headline text-xl font-bold">Prophetess Norah Tryson</h3>
                    <p className="mt-2 text-muted-foreground">A prophetic voice and co-leader whose ministry amplifies the revelation of God’s heart for His people.</p>
                </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
