
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { feedItems } from "@/lib/data";
import { BookOpen, Handshake, HeartHandshake, Rss } from "lucide-react";
import Link from 'next/link';

const iconMap = {
  PRAYER_REQUEST: <HeartHandshake className="h-5 w-5 text-accent" />,
  NEW_DEVOTIONAL: <BookOpen className="h-5 w-5 text-accent" />,
  NEW_CONNECTION: <Handshake className="h-5 w-5 text-accent" />,
  default: <Rss className="h-5 w-5 text-accent" />
}

export default function FeedsPage() {
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <div>
        <h1 className="text-3xl font-headline font-bold">Community Feed</h1>
        <p className="text-white">
          See what's happening in the community right now.
        </p>
      </div>

      <div className="space-y-4">
        {feedItems.map((item) => (
          <Card key={item.id}>
            <CardHeader className="p-4">
              <div className="flex items-start gap-4">
                 <Link href={item.href}>
                  <Avatar className="h-10 w-10 border">
                    {item.avatar && <AvatarImage src={item.avatar.imageUrl} alt={item.user} data-ai-hint={item.avatar.imageHint}/>}
                    <AvatarFallback>{item.user.charAt(0)}</AvatarFallback>
                  </Avatar>
                 </Link>
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    {iconMap[item.type as keyof typeof iconMap] || iconMap.default}
                    <p className="text-sm">
                      <Link href={item.href} className="font-semibold hover:underline">{item.user}</Link> {item.content}
                    </p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{item.timestamp}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-0 pl-16">
              <Card className="bg-secondary p-3">
                 <CardDescription className="text-sm text-foreground line-clamp-3">{item.details}</CardDescription>
              </Card>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
