
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gamepad2, BookText, Music, Video, Shield, PlayCircle } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useToast } from '@/hooks/use-toast';

const kidsContent = {
    image: PlaceHolderImages.find(p => p.id === 'community-feature'),
    title: "Kids Connect (Ages 4-10)",
    description: "A fun, safe, and interactive space for children to learn about God's love through stories, songs, and activities.",
}

const activities = [
    {
        icon: <BookText className="h-6 w-6 text-accent" />,
        title: "Interactive Bible Stories",
        description: "Engaging, animated stories that bring the Bible to life for young hearts.",
        href: "/bible-stories",
        cta: "Start Reading"
    },
    {
        icon: <Music className="h-6 w-6 text-accent" />,
        title: "Memory Verse Songs",
        description: "Fun songs and videos to help kids hide God's Word in their hearts.",
        href: "#",
        cta: "Sing Along"
    },
    {
        icon: <Video className="h-6 w-6 text-accent" />,
        title: "Worship & Action Songs",
        description: "Upbeat music to get kids moving and praising God.",
        href: "#",
        cta: "Watch Now"
    },
    {
        icon: <Gamepad2 className="h-6 w-6 text-accent" />,
        title: "Creative Activities & Crafts",
        description: "Fun, downloadable activities that reinforce biblical lessons.",
        href: "#",
        cta: "Get Creative"
    }
]

const featuredActivity = {
    title: "David and Goliath: Interactive Story",
    description: "Join David as he bravely faces the giant! Tap on characters and objects to see what happens next.",
    image: PlaceHolderImages.find(p => p.id === 'devotional-2')
}

export default function KidsConnectPage() {
    const { toast } = useToast();

    const handleStartActivity = () => {
        toast({
            title: "Activity Starting!",
            description: `The "${featuredActivity.title}" activity is now loading. Have fun!`,
        });
    };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
            <Gamepad2 className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">{kidsContent.title}</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          {kidsContent.description}
        </p>
      </div>

      {kidsContent.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
             <Image src={kidsContent.image.imageUrl} alt={kidsContent.title} fill className="object-cover" data-ai-hint={kidsContent.image.imageHint}/>
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <Button size="lg" asChild>
                    <Link href="/signup">Join the Fun!</Link>
                </Button>
             </div>
          </div>
      )}
      
       <Card className="bg-secondary/30">
        <CardHeader className="flex flex-row items-center gap-4">
          <Shield className="h-8 w-8 text-accent" />
          <div>
            <CardTitle>A Safe Place to Learn and Grow</CardTitle>
            <CardDescription className="text-muted-foreground">
                Kids Connect is a moderated and safe environment for children to build a foundation of faith.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
      
      {featuredActivity && (
          <Card className="overflow-hidden">
            <CardHeader className="p-0">
                <div className="bg-primary text-primary-foreground text-center py-2 font-bold">Today's Featured Activity</div>
            </CardHeader>
            <div className="grid md:grid-cols-2 items-center">
                 {featuredActivity.image && (
                    <AspectRatio ratio={16 / 9}>
                        <Image src={featuredActivity.image.imageUrl} alt={featuredActivity.title} fill className="object-cover"/>
                    </AspectRatio>
                 )}
                 <div className="p-6">
                    <h3 className="text-xl font-bold font-headline">{featuredActivity.title}</h3>
                    <p className="text-muted-foreground mt-2">{featuredActivity.description}</p>
                    <Button className="mt-4" onClick={handleStartActivity}>
                        <PlayCircle className="mr-2 h-5 w-5" />
                        Start Activity
                    </Button>
                 </div>
            </div>
          </Card>
      )}

      <div>
        <h2 className="text-2xl font-headline font-bold mb-4">What You Can Do Here</h2>
        <div className="grid gap-6 md:grid-cols-2">
            {activities.map(activity => (
                 <Card key={activity.title} className="flex flex-col">
                    <CardHeader className="flex flex-row items-start gap-4">
                        {activity.icon}
                        <div>
                            <CardTitle className="text-lg">{activity.title}</CardTitle>
                            <CardDescription className="mt-1">{activity.description}</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow" />
                    <CardFooter>
                        <Button asChild className="w-full" variant="outline">
                            <Link href={activity.href}>{activity.cta}</Link>
                        </Button>
                    </CardFooter>
                 </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
