
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { devotionals } from '@/lib/data';
import { AudioLines, Bookmark, Share2, Video, BookText } from 'lucide-react';

export default function DevotionalsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline">Daily Devotionals</h1>
        <p className="text-muted-foreground">
          Nourish your spirit with daily wisdom and encouragement.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {devotionals.map((devotional) => (
          <Card key={devotional.id} className="flex flex-col">
            <CardHeader className="p-0">
              {devotional.image && (
                <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={devotional.image.imageUrl}
                    alt={devotional.title}
                    fill
                    className="object-cover"
                    data-ai-hint={devotional.image.imageHint}
                  />
                </div>
              )}
               <div className="p-6 pb-2">
                <p className="text-sm text-muted-foreground">{devotional.date} &bull; {devotional.category}</p>
                <CardTitle className="mt-1 font-headline text-xl">{devotional.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-1">by {devotional.author}</p>
              </div>
            </CardHeader>
            <CardContent className="flex-grow p-6 pt-0">
              <Tabs defaultValue="text" className="w-full">
                <TabsList className="grid w-full grid-cols-3 mb-4">
                  <TabsTrigger value="text"><BookText className="h-4 w-4 mr-1" /> Text</TabsTrigger>
                  <TabsTrigger value="audio"><AudioLines className="h-4 w-4 mr-1" /> Audio</TabsTrigger>
                  <TabsTrigger value="video"><Video className="h-4 w-4 mr-1" /> Video</TabsTrigger>
                </TabsList>
                <TabsContent value="text" className="text-sm text-muted-foreground max-h-24 overflow-y-auto">
                  {devotional.content.text}
                </TabsContent>
                <TabsContent value="audio" className="text-center p-4">
                  <p className="text-sm text-muted-foreground">Audio player coming soon.</p>
                </TabsContent>
                <TabsContent value="video" className="text-center p-4">
                 <p className="text-sm text-muted-foreground">Video player coming soon.</p>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-between p-6 pt-0">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
              <Button>Read More</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
