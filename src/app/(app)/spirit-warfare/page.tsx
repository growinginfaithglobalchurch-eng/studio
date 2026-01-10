
'use client';

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
  Swords,
  ShieldCheck,
  KeyRound,
  Hammer,
  Scale,
  Globe,
  Waves,
  Feather,
  Crown,
  Anchor,
  Users,
  Badge,
  Shield,
  Milestone,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '@/hooks/use-toast';

const courtsOfHeavenPillars = [
  {
    icon: <Scale className="h-6 w-6 text-accent" />,
    title: 'Spiritual Legality',
    description:
      'Understanding the legal frameworks that govern the spiritual realm.',
  },
  {
    icon: <Hammer className="h-6 w-6 text-accent" />,
    title: 'Righteous Judgments',
    description:
      'Petitioning for and enforcing the just verdicts of heaven on earth.',
  },
  {
    icon: <ShieldCheck className="h-6 w-6 text-accent" />,
    title: 'Addressing Accusations',
    description:
      'Countering the claims of the adversary through the blood of Jesus and repentance.',
  },
];

const realmsOfWar = [
  {
    icon: <Feather className="h-8 w-8 text-accent" />,
    title: 'The Air Forces',
    description: 'Battles over minds, ideologies, atmospheres, and spiritual visibility.',
  },
  {
    icon: <Crown className="h-8 w-8 text-accent" />,
    title: 'The Land Forces',
    description: 'Battles over governance, rulership, and the establishment of systems.',
  },
  {
    icon: <Anchor className="h-8 w-8 text-accent" />,
    title: 'The Marine Forces',
    description: 'Battles over origins, bloodlines, ancient covenants, and hidden cycles.',
  },
];

const warfareTribes = [
  {
    icon: <Feather className="h-8 w-8 text-accent" />,
    name: 'The Eagles',
    domain: 'Rulers of the Air Forces',
    nature: 'Visionary, prophetic, intercessory, revelatory.',
    functions: [
        'Discernment of spiritual climates',
        'Breaking mental strongholds',
        'Prophetic declarations',
        'Governing through revelation'
    ]
  },
   {
    icon: <Crown className="h-8 w-8 text-accent" />,
    name: 'The Lions',
    domain: 'Rulers of the Land Forces',
    nature: 'Bold, authoritative, leadership-driven.',
    functions: [
        'Territorial dominion',
        'Confronting opposition',
        'Establishing righteous order',
        'Enforcing Kingdom governance'
    ]
  },
   {
    icon: <Anchor className="h-8 w-8 text-accent" />,
    name: 'The Authorities (Marines)',
    domain: 'Rulers of Water & Sea Forces',
    nature: 'Deep, strategic, foundation-breakers.',
    functions: [
        'Breaking generational cycles',
        'Dealing with marine strongholds',
        'Addressing bloodline battles',
        'Operating in deep spiritual intelligence'
    ]
  }
];

export default function SpiritWarfarePage() {
  const { toast } = useToast();
  const heroImage = PlaceHolderImages.find(
    (p) => p.id === 'devotional-2'
  );

  const handleChooseTribe = (tribeName: string) => {
    toast({
        title: "Tribe Selected!",
        description: `You have joined the ${tribeName}. Your profile badge has been assigned.`
    });
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Swords className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-headline font-bold text-foreground">
            Spirit Warfare
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Divine engagement against invisible powers through identity, authority, and dominion in Christ.
        </p>
      </div>

       <Card className="bg-secondary/30">
        <CardHeader>
            <CardTitle>Definition & Foundational Teaching</CardTitle>
            <CardDescription>“For we wrestle not against flesh and blood, but against principalities, powers, rulers of darkness, and spiritual wickedness in high places.” (Ephesians 6:12)</CardDescription>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">Spirit warfare is not panic-driven combat; it is governance from position. Believers do not fight for victory but from victory, established through the finished work of Christ.</p>
        </CardContent>
      </Card>


      <Card className="overflow-hidden">
        <div className="grid md:grid-cols-2 items-center">
          <div className="p-8">
            <CardHeader className="p-0">
               <div className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-sm font-semibold text-accent border border-accent/20 w-fit">Section 1</div>
              <CardTitle className="text-3xl font-headline mt-2">
                The Courts of Heaven
              </CardTitle>
              <CardDescription className="mt-4 text-lg">
                The judicial realm of the spirit where verdicts are issued, accusations are addressed, and destinies are legislated. Warfare that ignores the courts may win battles but lose legitimacy.
              </CardDescription>
            </CardHeader>
          </div>
          <div className="p-8 bg-card">
            <h3 className="font-bold mb-4 text-card-foreground">Teaching Focus:</h3>
            <div className="grid gap-4">
                 {courtsOfHeavenPillars.map((pillar) => (
                    <div key={pillar.title} className="flex items-start gap-3">
                        {pillar.icon}
                        <div>
                            <h4 className="font-semibold text-card-foreground">{pillar.title}</h4>
                            <p className="text-sm text-muted-foreground">{pillar.description}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </div>
      </Card>

      <div>
        <div className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-sm font-semibold text-accent border border-accent/20 w-fit mb-2">Section 2 & 3</div>
        <h2 className="text-2xl font-headline font-bold mb-4">Knowing Your Domain: Identity Before Authority</h2>
        <p className="text-muted-foreground max-w-3xl mb-6">There are three primary realms of spiritual warfare. Authority is activated only when identity is established. Every believer must understand where they function best.</p>
        <div className="grid gap-6 md:grid-cols-3">
          {realmsOfWar.map((pillar) => (
            <Card key={pillar.title}>
              <CardHeader className="flex flex-row items-center gap-4">
                {pillar.icon}
                <CardTitle className="font-headline">{pillar.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{pillar.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <div className="inline-block rounded-lg bg-accent/10 px-3 py-1 text-sm font-semibold text-accent border border-accent/20 w-fit mb-2">Section 4</div>
        <h2 className="text-2xl font-headline font-bold mb-4">
          Choosing Tribes of War
        </h2>
        <p className="text-muted-foreground max-w-3xl mb-6">Select your Warfare Tribe to receive your Tribal Badge. This badge will appear on your profile and assignments, signifying your operational domain and building identity clarity, functional alignment, and coordinated warfare operations.</p>

        <div className="grid gap-8 md:grid-cols-3">
          {warfareTribes.map((tribe) => (
            <Card key={tribe.name} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-3">
                    {tribe.icon}
                    <div>
                        <CardTitle className="font-headline">{tribe.name}</CardTitle>
                        <CardDescription>{tribe.domain}</CardDescription>
                    </div>
                </div>
                <p className="text-sm italic text-muted-foreground pt-2">{tribe.nature}</p>
              </CardHeader>
              <CardContent className="flex-grow">
                <h4 className="font-semibold mb-2 text-card-foreground">Functions:</h4>
                 <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                    {tribe.functions.map(item => <li key={item}>{item}</li>)}
                </ul>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full text-white" onClick={() => handleChooseTribe(tribe.name)}>Choose {tribe.name}</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <Card className="mt-8">
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Users className="h-6 w-6 text-accent" /> Option: All Tribes</CardTitle>
                <CardDescription>For strategic warfare commanders trained to operate across all realms: Air, Land, and Sea. This selection grants the "All Tribes Badge" for full-spectrum spiritual engagement.</CardDescription>
            </CardHeader>
            <CardContent>
                <Button onClick={() => handleChooseTribe('All Tribes')}>Choose All Tribes</Button>
            </CardContent>
        </Card>
      </div>
      
       <div className="grid gap-6 md:grid-cols-2">
         <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Shield className="h-6 w-6 text-accent" /> The War Room</CardTitle>
            </CardHeader>
            <CardContent>
                 <p className="text-muted-foreground mb-4">The War Room is a portal for war against all dark forces and their kingdom, traveling through time, removing evil, events, curses, accidents, death, poverty, divorces etc.</p>
                 <Button asChild variant="secondary">
                    <Link href="/war-room">Enter the War Room</Link>
                 </Button>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="font-headline flex items-center gap-2"><Badge className="h-6 w-6 text-accent" /> About Tribal Badges</CardTitle>
            </CardHeader>
            <CardContent>
                 <p className="text-muted-foreground">Your badge appears on your profile and in discussions, helping to build identity, alignment, and coordinate warfare operations across the platform.</p>
            </CardContent>
        </Card>
       </div>
      
       <Card className="text-center p-8 bg-secondary/30">
        <CardTitle className="font-headline text-2xl flex items-center justify-center gap-2"><Milestone className="h-6 w-6 text-accent"/> Walking in Christ’s Triumphal Procession</CardTitle>
        <CardDescription className="mt-2 mb-4 text-lg">
          “Now thanks be unto God, who always leads us in triumph in Christ.” (2 Corinthians 2:14)
        </CardDescription>
        <p className="text-muted-foreground max-w-2xl mx-auto">This is warfare as a victory procession, not a struggle. Christ is the Head of the army; we are the visible proof of His triumph. We live daily from conquest, not conflict. <span className="font-bold text-foreground">We do not chase demons. We walk, and darkness adjusts.</span></p>
      </Card>


    </div>
  );
}
