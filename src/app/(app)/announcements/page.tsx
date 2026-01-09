
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { announcements } from '@/lib/data';
import { Megaphone } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export default function AnnouncementsPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
            <Megaphone className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">Announcements</h1>
        </div>
        <p className="text-muted-foreground">
          Stay up-to-date with the latest news and updates.
        </p>
      </div>

      <div className="space-y-6">
        {announcements.map((announcement) => (
          <Card key={announcement.id}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="font-headline text-xl">{announcement.title}</CardTitle>
                    <Badge variant="secondary">{announcement.category}</Badge>
                </div>
              <CardDescription>{new Date(announcement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{announcement.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
