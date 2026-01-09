'use client';

import { useState } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Ticket, Clock, Video, MapPin, CalendarDays } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { communityUsers, events, conferences } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

export default function EventsPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());

  const featuredSpeakers = communityUsers.slice(0, 4);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <CalendarIcon className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-headline font-bold text-foreground">Events & Live Sessions</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Join our live events, view schedules, and register for upcoming sessions.
        </p>
      </div>
      
      <section>
          <h2 className="text-2xl font-headline font-bold mb-4">Major Conferences</h2>
          <div className="grid gap-8 md:grid-cols-2">
            {conferences.map(conf => (
                <Card key={conf.id} className="overflow-hidden">
                    {conf.image && (
                        <div className="relative aspect-video w-full">
                            <Image src={conf.image.imageUrl} alt={conf.title} fill className="object-cover" data-ai-hint={conf.image.imageHint}/>
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="font-headline text-xl">{conf.title}</CardTitle>
                        <CardDescription>{conf.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <CalendarDays className="h-4 w-4"/>
                            <span>{conf.dates}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin className="h-4 w-4"/>
                            <span>{conf.location}</span>
                        </div>
                    </CardContent>
                    <CardFooter>
                         <Button>
                            <Ticket className="mr-2 h-4 w-4" />
                            Register Now
                        </Button>
                    </CardFooter>
                </Card>
            ))}
          </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Video className="h-6 w-6 text-accent" />
                        Upcoming Events
                    </CardTitle>
                    <CardDescription>
                        Register for our upcoming live sessions and workshops.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {events.map((event) => (
                        <div key={event.id} className="flex flex-col sm:flex-row items-start gap-4 rounded-lg border p-4">
                            <div className="w-full sm:w-24 h-24 bg-secondary rounded-md flex flex-col items-center justify-center text-center">
                                <p className="text-sm font-bold text-accent">{event.date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()}</p>
                                <p className="text-3xl font-bold">{event.date.getDate()}</p>
                            </div>
                            <div className="flex-grow">
                                <Badge variant={event.isLive ? 'destructive' : 'secondary'}>{event.isLive ? 'LIVE NOW' : 'UPCOMING'}</Badge>
                                <h3 className="text-lg font-bold mt-2">{event.title}</h3>
                                <p className="text-sm text-muted-foreground">with {event.speaker}</p>
                                <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                                    <Clock className="h-4 w-4" />
                                    <span>{event.time}</span>
                                </div>
                            </div>
                            <Button className="w-full sm:w-auto mt-4 sm:mt-0">
                                <Ticket className="mr-2 h-4 w-4" />
                                {event.isLive ? 'Join Now' : 'Register'}
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Event Schedule</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border"
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
                <CardTitle>Featured Speakers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {featuredSpeakers.map((speaker) => (
                    <div key={speaker.id} className="flex items-center gap-3">
                        <Avatar>
                            {speaker.avatar && <AvatarImage src={speaker.avatar.imageUrl} alt={speaker.name} data-ai-hint={speaker.avatar.imageHint} />}
                            <AvatarFallback>{speaker.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold text-card-foreground">{speaker.name}</p>
                            <p className="text-xs text-muted-foreground">{speaker.location}</p>
                        </div>
                    </div>
                ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
