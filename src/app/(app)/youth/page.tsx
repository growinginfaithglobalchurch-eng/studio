
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Briefcase, MessageSquare, Video, Shield, UserCheck } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

const youthContent = {
    image: PlaceHolderImages.find(p => p.id === 'live-replay-1'),
    title: "Youth Connect (Ages 14-24)",
    description: "A dynamic community for teens and young adults to grow in their faith, discover their calling, and connect with purpose-driven peers.",
}

const activities = [
    {
        icon: <Briefcase className="h-6 w-6 text-accent" />,
        title: "Leadership Training",
        description: "Develop your leadership potential through practical training and ministry opportunities.",
    },
    {
        icon: <UserCheck className="h-6 w-6 text-accent" />,
        title: "Mentorship Groups",
        description: "Connect with a mentor and a small group of peers for guidance and accountability.",
    },
    {
        icon: <Video className="h-6 w-6 text-accent" />,
        title: "Live Sessions & Q&A",
        description: "Get your questions answered by pastors and leaders in a live, interactive setting.",
    },
    {
        icon: <MessageSquare className="h-6 w-6 text-accent" />,
        title: "Topical Discussions",
        description: "Engage in relevant discussions about faith, culture, and real-life issues.",
    }
]

export default function YouthConnectPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
            <Users className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">{youthContent.title}</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          {youthContent.description}
        </p>
      </div>

      {youthContent.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
             <Image src={youthContent.image.imageUrl} alt={youthContent.title} fill className="object-cover" data-ai-hint={youthContent.image.imageHint}/>
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <Button size="lg" asChild>
                    <Link href="/signup">Join the Community</Link>
                </Button>
             </div>
          </div>
      )}
      
       <Card className="bg-secondary/30">
        <CardHeader className="flex flex-row items-center gap-4">
          <Shield className="h-8 w-8 text-accent" />
          <div>
            <CardTitle>A Safe Place to Connect</CardTitle>
            <CardDescription className="text-muted-foreground">
                Youth Connect is a moderated and safe environment for teens and young adults to build healthy friendships and grow in their faith without fear.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      <div>
        <h2 className="text-2xl font-headline font-bold mb-4">What You Can Do Here</h2>
        <div className="grid gap-6 md:grid-cols-2">
            {activities.map(activity => (
                 <Card key={activity.title}>
                    <CardHeader className="flex flex-row items-start gap-4">
                        {activity.icon}
                        <div>
                            <CardTitle className="text-lg">{activity.title}</CardTitle>
                            <CardDescription className="mt-1">{activity.description}</CardDescription>
                        </div>
                    </CardHeader>
                 </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
