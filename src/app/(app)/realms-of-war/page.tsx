
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Feather, Crown, Anchor } from 'lucide-react';

const realmsOfWar = [
  {
    icon: <Feather className="h-10 w-10 text-accent" />,
    title: 'The Air Forces',
    description: 'Battles over minds, ideologies, atmospheres, and spiritual visibility. This realm concerns principalities that control media, education, and belief systems. Warfare here involves breaking mental strongholds and releasing the truth of God.',
  },
  {
    icon: <Crown className="h-10 w-10 text-accent" />,
    title: 'The Land Forces',
    description: 'Battles over governance, rulership, and the establishment of systems. This realm deals with powers that influence governments, laws, and economic structures. Warfare here is about establishing righteous order and Kingdom governance.',
  },
  {
    icon: <Anchor className="h-10 w-10 text-accent" />,
    title: 'The Marine Forces',
    description: 'Battles over origins, bloodlines, ancient covenants, and hidden cycles. This is the deepest realm of warfare, dealing with foundational issues, generational curses, and marine witchcraft. Warfare here breaks long-standing patterns and uproots ancient evils.',
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
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-secondary">
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
