
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Headphones, PenSquare, BookText, TrendingUp, Sparkles, AudioLines, Video } from "lucide-react";
import { devotionals } from "@/lib/data";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";

const growthHubSections = [
  {
    icon: <BookOpen className="h-6 w-6 text-accent" />,
    title: "Bible Reading Plans & Studies",
    description: "Engage with Scripture through structured reading plans and in-depth studies.",
    cta: "Browse Plans",
    href: "#"
  },
  {
    icon: <Headphones className="h-6 w-6 text-accent" />,
    title: "Audio Teachings & Prophetic Insights",
    description: "Listen to powerful sermons, teachings, and prophetic words on the go.",
    cta: "Listen Now",
    href: "#"
  },
  {
    icon: <PenSquare className="h-6 w-6 text-accent" />,
    title: "Scripture-Based Reflections & Declarations",
    description: "Journal your thoughts and speak life with powerful scriptural declarations.",
    cta: "Start Reflecting",
    href: "#"
  }
];


export default function FaithGrowthHubPage() {
  const latestDevotional = devotionals[0];

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
            <TrendingUp className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">Faith Growth Hub</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          A structured spiritual growth center designed for believers at every level.
        </p>
      </div>

      <Card className="bg-gradient-to-r from-primary/10 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3">
             <Sparkles className="h-6 w-6 text-accent" />
            <div>
                 <CardTitle className="font-headline text-xl font-bold">Daily Focus: Faith Activations</CardTitle>
                 <CardDescription>Start your day with a fresh word and practical activation.</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
           <Card key={latestDevotional.id} className="flex flex-col md:flex-row">
            <div className="md:w-1/3">
                {latestDevotional.image && (
                    <div className="relative aspect-video w-full h-full overflow-hidden rounded-t-lg md:rounded-l-lg md:rounded-t-none">
                    <Image
                        src={latestDevotional.image.imageUrl}
                        alt={latestDevotional.title}
                        fill
                        className="object-cover"
                        data-ai-hint={latestDevotional.image.imageHint}
                    />
                    </div>
                )}
            </div>
            <div className="flex flex-col md:w-2/3">
                 <CardHeader>
                    <p className="text-sm text-muted-foreground">{latestDevotional.date} &bull; {latestDevotional.category}</p>
                    <CardTitle className="mt-1 font-headline text-xl font-bold">{latestDevotional.title}</CardTitle>
                    <p className="text-sm text-muted-foreground mt-1">by {latestDevotional.author}</p>
                </CardHeader>
                <CardContent className="flex-grow">
                     <p className="text-sm text-muted-foreground line-clamp-3">
                        {latestDevotional.content.text}
                     </p>
                </CardContent>
                 <div className="p-6 pt-0">
                    <Button asChild>
                        <Link href="/devotionals">Continue Reading</Link>
                    </Button>
                </div>
            </div>
          </Card>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {growthHubSections.map((section) => (
          <Card key={section.title} className="flex flex-col">
            <CardHeader className="flex flex-row items-start gap-4">
              {section.icon}
              <div className="flex-grow">
                 <CardTitle>{section.title}</CardTitle>
                 <CardDescription className="mt-1">{section.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="flex-grow" />
            <div className="p-6 pt-0">
                <Button variant="outline" asChild>
                    <Link href={section.href}>{section.cta}</Link>
                </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
