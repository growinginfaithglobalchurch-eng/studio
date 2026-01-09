
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, UserPlus, Search, Wrench, Rocket } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

const processSteps = [
    {
        icon: <UserPlus className="h-6 w-6 text-accent" />,
        title: "Recruit: The Great Commission",
        description: "Joining the mission to make disciples of all nations, starting with our community.",
    },
    {
        icon: <Search className="h-6 w-6 text-accent" />,
        title: "Identify: Discovering Your Place",
        description: "Through teaching and relationship, we help identify the unique calling God has placed on your life.",
    },
    {
        icon: <Wrench className="h-6 w-6 text-accent" />,
        title: "Equip: Sharpening for Service",
        description: "Providing foundational teaching and practical training to build a strong, Christ-centered life.",
    },
    {
        icon: <Rocket className="h-6 w-6 text-accent" />,
        title: "Deploy: Living on Mission",
        description: "Releasing equipped believers to impact their families, workplaces, and communities for the Kingdom.",
    }
];

export default function DiscipleshipForumPage() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'community-feature');

    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <Users className="h-8 w-8 text-accent" />
                    <h1 className="text-3xl font-headline font-bold text-foreground">Discipleship Forum</h1>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                    Following the command of Jesus to make disciples who make disciples.
                </p>
            </div>

            {heroImage && (
                 <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <Image src={heroImage.imageUrl} alt="Discipleship Forum" fill className="object-cover" data-ai-hint={heroImage.imageHint}/>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                        <div className="max-w-xl text-white">
                            <h2 className="text-3xl font-headline font-bold">"Go and make disciples of all nations..."</h2>
                            <p className="mt-2 text-lg">- Matthew 28:19</p>
                        </div>
                    </div>
                </div>
            )}

            <div>
                <h2 className="text-2xl font-headline font-bold mb-4">Our Discipleship Process</h2>
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
                <CardTitle className="font-headline text-2xl">Ready to Grow?</CardTitle>
                <CardDescription className="mt-2 mb-6 max-w-xl mx-auto">
                    Whether you are a new believer or have walked with Christ for years, there is a next step for you. Connect with our discipleship program to get started.
                </CardDescription>
                <Button size="lg" asChild>
                    <Link href="/admin/discipleship">Join the Program</Link>
                </Button>
            </Card>

        </div>
    );
}
