
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Briefcase, UserPlus, Search, Wrench, Rocket } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

const processSteps = [
    {
        icon: <UserPlus className="h-6 w-6 text-accent" />,
        title: "Recruit: Called to Lead",
        description: "Identifying and calling forth those with the potential and heart to lead in the Kingdom.",
    },
    {
        icon: <Search className="h-6 w-6 text-accent" />,
        title: "Identify: Pinpointing the Sphere",
        description: "Helping leaders discern their specific area of influence, whether in ministry, business, or community.",
    },
    {
        icon: <Wrench className="h-6 w-6 text-accent" />,
        title: "Equip: Forging Kingdom Leaders",
        description: "Intensive training in theology, character, and practical leadership skills to build effective leaders.",
    },
    {
        icon: <Rocket className="h-6 w-6 text-accent" />,
        title: "Deploy: Releasing for Impact",
        description: "Commissioning and sending out trained leaders to bring transformation to their assigned spheres.",
    }
];

export default function LeadershipForumPage() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'live-replay-1');

    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <Briefcase className="h-8 w-8 text-accent" />
                    <h1 className="text-3xl font-headline font-bold text-foreground">Leadership Forum</h1>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                    Raising and releasing leaders to shape culture and advance the Kingdom.
                </p>
            </div>

            {heroImage && (
                 <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <Image src={heroImage.imageUrl} alt="Leadership Forum" fill className="object-cover" data-ai-hint={heroImage.imageHint}/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <div className="max-w-xl text-white">
                            <h2 className="text-3xl font-headline font-bold">For such a time as this...</h2>
                            <p className="mt-2 text-lg">God is raising up a new breed of leaders who will carry His presence and authority into every area of society.</p>
                        </div>
                    </div>
                </div>
            )}

            <div>
                <h2 className="text-2xl font-headline font-bold mb-4">Our Leadership Pipeline</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                    {processSteps.map(step => (
                        <Card key={step.title}>
                            <CardHeader className="flex flex-row items-center gap-4">
                                {step.icon}
                                <CardTitle>{step.title}</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{step.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>

            <Card className="text-center p-8 bg-secondary/30">
                <CardTitle className="font-headline text-2xl">Are You Called to Lead?</CardTitle>
                <CardDescription className="mt-2 mb-6 max-w-xl mx-auto">
                    If you have a desire to grow in your leadership and make a greater impact, our leadership development track is for you.
                </CardDescription>
                <div className="flex gap-4 justify-center">
                    <Button size="lg" asChild>
                        <Link href="/school-of-ministry">Explore Ministry School</Link>
                    </Button>
                     <Button size="lg" variant="outline" asChild>
                        <Link href="/business-school">Explore Business School</Link>
                    </Button>
                </div>
            </Card>

        </div>
    );
}
