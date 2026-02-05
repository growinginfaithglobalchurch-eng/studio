
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Megaphone, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollAnimator } from '@/components/scroll-animator';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

type Announcement = {
  id: number;
  title: string;
  content: string;
  category: string;
  date: string;
};

export default function AnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const { data, error } = await supabase
        .from('announcements')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        toast({
          variant: 'destructive',
          title: 'Error fetching announcements',
          description: error.message,
        });
      } else {
        setAnnouncements(data || []);
      }
      setIsLoading(false);
    };

    fetchAnnouncements();
  }, [toast]);

  return (
    <div className="space-y-8">
      <ScrollAnimator>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Megaphone className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">Announcements</h1>
          </div>
          <p className="text-muted-foreground">
            Stay up-to-date with the latest news and updates.
          </p>
        </div>
      </ScrollAnimator>

      <div className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-10">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
          </div>
        ) : announcements.length > 0 ? (
          announcements.map((announcement, index) => (
            <ScrollAnimator key={announcement.id} delay={index * 0.1}>
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-headline text-xl">{announcement.title}</CardTitle>
                    {announcement.category && <Badge variant="secondary">{announcement.category}</Badge>}
                  </div>
                  <CardDescription>{new Date(announcement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{announcement.content}</p>
                </CardContent>
              </Card>
            </ScrollAnimator>
          ))
        ) : (
          <Card>
            <CardContent className="p-6 text-center text-muted-foreground">
              No announcements have been posted yet.
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
