
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Baby, ShieldCheck, Gamepad2, Users, School } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

const ageGroups = [
    {
        icon: <Gamepad2 className="h-6 w-6 text-accent" />,
        title: "Kids Connect (Ages 4-10)",
        description: "A fun, safe, and interactive space for children to learn about God's love through stories, games, and activities.",
        features: [
            "Interactive Bible Stories",
            "Memory Verse Songs",
            "Creative Activities & Crafts",
            "Monitored Community"
        ],
        image: PlaceHolderImages.find(p => p.id === 'community-feature'),
        href: "/kids"
    },
    {
        icon: <School className="h-6 w-6 text-accent" />,
        title: "Pre-Teens Connect (Ages 11-13)",
        description: "Engaging lessons and discussions to help pre-teens build a personal faith and navigate life's questions.",
        features: [
            "Interactive Lessons",
            "Journaling Prompts",
            "Biblical Decision-Making Scenarios",
            "Small Group Discussions"
        ],
        image: PlaceHolderImages.find((p) => p.id === 'devotional-1'),
        href: "/pre-teens"
    },
    {
        icon: <Users className="h-6 w-6 text-accent" />,
        title: "Youth Connect (Ages 14-24)",
        description: "A dynamic community for teens and young adults to grow in their faith, tackle real-life questions, and connect with peers.",
        features: [
            "Leadership Training",
            "Mentorship Groups",
            "Live Q&A Sessions",
            "Service & Mission Projects"
        ],
        image: PlaceHolderImages.find(p => p.id === 'live-replay-1'),
        href: "/youth"
    }
]

export default function KidsAndYouthPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
            <Baby className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">Kids & Youth Connect</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          A safe and engaging environment for the next generation to grow in faith, with tailored content for every age.
        </p>
      </div>

       <Card className="bg-secondary/30">
        <CardHeader className="md:flex-row md:items-center md:gap-4">
          <ShieldCheck className="h-8 w-8 text-accent flex-shrink-0" />
          <div>
            <CardTitle>Safety First & Parental Oversight</CardTitle>
            <CardDescription className="text-muted-foreground mt-1">
              Our commitment is to provide a secure digital environment. All leaders are verified, content is moderated, and robust privacy controls are in place. Parents can monitor activity through a dedicated dashboard.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
            <Button asChild>
                <Link href="/parental-dashboard">View Parental Dashboard</Link>
            </Button>
        </CardContent>
      </Card>

      <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
        {ageGroups.map((group) => (
             <Card key={group.title} className="flex flex-col">
              {group.image && (
                 <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                    <Image src={group.image.imageUrl} alt={group.title} fill className="object-cover" data-ai-hint={group.image.imageHint}/>
                 </div>
              )}
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline text-xl">
                    {group.icon}
                    {group.title}
                </CardTitle>
                <CardDescription>{group.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-grow">
                <h4 className="font-semibold mb-2 text-card-foreground">What's Inside:</h4>
                <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                  {group.features.map(feature => <li key={feature}>{feature}</li>)}
                </ul>
              </CardContent>
              <div className="p-6 pt-0">
                 <Button asChild className="w-full">
                    <Link href={group.href}>Explore {group.title.split(' ')[0]}</Link>
                 </Button>
              </div>
            </Card>
        ))}
      </div>

    </div>
  );
}
