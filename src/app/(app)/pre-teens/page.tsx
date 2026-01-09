
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { School, BookText, PenSquare, MessageSquare, Shield } from 'lucide-react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Link from 'next/link';

const preTeensContent = {
    image: PlaceHolderImages.find(p => p.id === 'devotional-1'),
    title: "Pre-Teens Connect (Ages 11-13)",
    description: "Engaging lessons and discussions to help pre-teens build a personal faith and navigate life's questions.",
}

const activities = [
    {
        icon: <BookText className="h-6 w-6 text-accent" />,
        title: "Interactive Lessons",
        description: "Explore biblical truths through relevant, interactive lessons that speak to your life.",
    },
    {
        icon: <PenSquare className="h-6 w-6 text-accent" />,
        title: "Journaling Prompts",
        description: "Reflect on what you're learning and document your faith journey with guided prompts.",
    },
    {
        icon: <MessageSquare className="h-6 w-6 text-accent" />,
        title: "Small Group Discussions",
        description: "Join moderated small groups to discuss lessons and share life with peers.",
    },
    {
        icon: <School className="h-6 w-6 text-accent" />,
        title: "Biblical Decision-Making",
        description: "Learn how to apply God's Word to everyday choices and challenges through real-life scenarios.",
    }
]

export default function PreTeensConnectPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
            <School className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">{preTeensContent.title}</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          {preTeensContent.description}
        </p>
      </div>

      {preTeensContent.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg">
             <Image src={preTeensContent.image.imageUrl} alt={preTeensContent.title} fill className="object-cover" data-ai-hint={preTeensContent.image.imageHint}/>
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                <Button size="lg" asChild>
                    <Link href="/signup">Get Connected</Link>
                </Button>
             </div>
          </div>
      )}
      
       <Card className="bg-secondary/30">
        <CardHeader className="flex flex-row items-center gap-4">
          <Shield className="h-8 w-8 text-accent" />
          <div>
            <CardTitle>A Safe Place to Ask Questions</CardTitle>
            <CardDescription className="text-muted-foreground">
                Pre-Teens Connect is a safe, moderated space to explore faith, ask tough questions, and build a strong foundation for your teenage years.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>

      <div>
        <h2 className="text-2xl font-headline font-bold mb-4">Platform Features</h2>
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
