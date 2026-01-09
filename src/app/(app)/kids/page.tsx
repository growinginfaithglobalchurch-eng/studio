
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Baby, ShieldCheck, Gamepad2, Users } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

const kidsContent = {
    image: PlaceHolderImages.find(p => p.id === 'community-feature'),
    title: "Kids Connect (Ages 7-12)",
    description: "A fun, safe, and interactive space for children to learn about God's love through stories, games, and activities.",
    features: [
        "Interactive Bible Stories",
        "Creative Activities & Crafts",
        "Weekly Memory Verses",
        "Monitored Chat & Community"
    ]
}

const youthContent = {
    image: PlaceHolderImages.find(p => p.id === 'live-replay-1'),
    title: "Youth Connect (Ages 13-18)",
    description: "A dynamic community for teens to grow in their faith, tackle real-life questions, and connect with peers.",
    features: [
        "Topical Bible Studies & Discussions",
        "Mentorship Groups",
        "Live Q&A Sessions",
        "Service & Mission Projects"
    ]
}

export default function KidsAndYouthPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
            <Baby className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">Kids & Youth Connect</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          A safe and engaging environment for the next generation to grow in faith.
        </p>
      </div>

       <Card className="bg-secondary/30">
        <CardHeader className="flex flex-row items-center gap-4">
          <ShieldCheck className="h-8 w-8 text-accent" />
          <div>
            <CardTitle>Safety First</CardTitle>
            <CardDescription className="text-muted-foreground">
              Our commitment is to provide a secure digital environment. All leaders are verified, content is moderated, and robust privacy controls are in place to protect our young members.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="flex flex-col">
          {kidsContent.image && (
             <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                <Image src={kidsContent.image.imageUrl} alt={kidsContent.title} fill className="object-cover" data-ai-hint={kidsContent.image.imageHint}/>
             </div>
          )}
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                <Gamepad2 className="h-6 w-6 text-accent" />
                {kidsContent.title}
            </CardTitle>
            <CardDescription>{kidsContent.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <h4 className="font-semibold mb-2 text-card-foreground">What's Inside:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
              {kidsContent.features.map(feature => <li key={feature}>{feature}</li>)}
            </ul>
          </CardContent>
          <div className="p-6 pt-0">
             <Button>Explore Kids Connect</Button>
          </div>
        </Card>

         <Card className="flex flex-col">
          {youthContent.image && (
             <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                <Image src={youthContent.image.imageUrl} alt={youthContent.title} fill className="object-cover" data-ai-hint={youthContent.image.imageHint}/>
             </div>
          )}
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                <Users className="h-6 w-6 text-accent" />
                {youthContent.title}
            </CardTitle>
            <CardDescription>{youthContent.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <h4 className="font-semibold mb-2 text-card-foreground">What's Inside:</h4>
            <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
              {youthContent.features.map(feature => <li key={feature}>{feature}</li>)}
            </ul>
          </CardContent>
           <div className="p-6 pt-0">
             <Button asChild>
                <Link href="/youth">Explore Youth Connect</Link>
             </Button>
          </div>
        </Card>
      </div>

    </div>
  );
}
