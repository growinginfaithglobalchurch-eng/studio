
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Feather, Crown, Anchor, Swords } from 'lucide-react';
import Link from 'next/link';

const realmsOfWar = [
  {
    icon: <Feather className="h-10 w-10 text-accent" />,
    title: 'The Air Forces',
    description: 'Battles over minds, ideologies, atmospheres, and spiritual visibility. This realm concerns principalities that control media, education, and belief systems. Warfare here involves breaking mental strongholds and releasing the truth of God.',
    strategies: [
        "Declarations of Truth (Ephesians 6:17): Countering lies with the specific, spoken Word of God.",
        "Atmospheric Cleansing: Using worship and praise to shift the spiritual environment and displace demonic presence.",
        "Binding and Loosing (Matthew 18:18): Using your delegated authority to forbid demonic activity and permit heavenly influence.",
        "Discerning and Dismantling Strongholds: Identifying and pulling down ungodly patterns of thinking in a region or culture."
    ],
    href: '/prophetic-prayer/air-forces',
  },
  {
    icon: <Crown className="h-10 w-10 text-accent" />,
    title: 'The Land Forces',
    description: 'Battles over governance, rulership, and the establishment of systems. This realm deals with powers that influence governments, laws, and economic structures. Warfare here is about establishing righteous order and Kingdom governance.',
    strategies: [
        "Consistent Righteous Living (Proverbs 14:34): Your personal holiness creates a legal basis for righteousness in your territory.",
        "Strategic Intercession for Leaders (1 Timothy 2:1-2): Praying specifically for those in authority to create peace and open doors for the Gospel.",
        "Issuing Heavenly Decrees: Making legal proclamations based on God's Word to establish His will in the earthly realm.",
        "Occupying Gates of Influence: Believers taking their place in key sectors of society (business, arts, government) to bring Kingdom influence."
    ],
    href: '/prophetic-prayer/land-forces',
  },
  {
    icon: <Anchor className="h-10 w-10 text-accent" />,
    title: 'The Marine Forces',
    description: 'Battles over origins, bloodlines, ancient covenants, and hidden cycles. This is the deepest realm of warfare, dealing with foundational issues, generational curses, and marine witchcraft. Warfare here breaks long-standing patterns and uproots ancient evils.',
    strategies: [
        "Bloodline Repentance: Identifying and repenting for the sins of your ancestors to break legal grounds used by the enemy.",
        "Utilizing the Blood of Jesus: Applying the power of Christ's blood to nullify ancient, ungodly covenants and curses.",
        "Deep Deliverance Ministry: Addressing deep-rooted demonic oppression that causes cyclical problems.",
        "Uprooting Evil Altars: Spiritually dismantling demonic altars that give the enemy influence over a family or region."
    ],
    href: '/prophetic-prayer/marine-forces',
  },
];

export default function RealmsOfWarPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">The Three Realms of Spiritual Warfare</h1>
        <p className="text-muted-foreground max-w-3xl mt-2">
          Understanding your operational domain is critical for effective spiritual warfare. Every believer has a primary realm of authority, though some may operate in all three.
        </p>
      </div>

      <div className="space-y-6">
        {realmsOfWar.map((realm) => (
          <Card key={realm.title}>
            <CardHeader>
                <div className="flex items-center gap-4">
                    {realm.icon}
                    <CardTitle className="font-headline text-2xl">{realm.title}</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
              <p className="text-lg text-muted-foreground">{realm.description}</p>
              <div className="mt-6 border-t pt-4">
                <h3 className="font-bold text-lg text-foreground flex items-center gap-2"><Swords className="h-5 w-5 text-accent"/>Combat Strategies</h3>
                <ul className="mt-3 space-y-2 list-disc pl-5 text-muted-foreground">
                    {realm.strategies.map((strategy) => (
                        <li key={strategy}>{strategy}</li>
                    ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter>
                <Button asChild>
                  <Link href={realm.href}>View Prophetic Prayer Points</Link>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Card className="bg-card text-card-foreground">
          <CardHeader>
              <CardTitle>Identity Before Authority</CardTitle>
          </CardHeader>
          <CardContent>
              <p className="text-muted-foreground">Remember, authority in any realm is only activated when your identity in Christ is firmly established. Your position as a son or daughter of God is the source of all power. Before you engage the enemy, know who you are in Him.</p>
          </CardContent>
      </Card>
    </div>
  );
}
