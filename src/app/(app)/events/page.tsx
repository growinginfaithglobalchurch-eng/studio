
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Ticket, Clock, Video, MapPin, CalendarDays, Zap, BookOpen, Edit, Save, Trash2, Cross, CheckCircle } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { communityUsers, events, conferences, empowermentMeetings, annualCalendar, consecrationWeek } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { format } from 'date-fns';

export default function EventsPage() {
  const [date, setDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    setDate(new Date());
  }, []);

  const featuredSpeakers = communityUsers.slice(0, 4);
  const bannerImage = PlaceHolderImages.find(img => img.id === 'hero');
  
  const formatDateRange = (start: Date, end: Date) => {
    const startMonth = format(start, 'MMMM');
    const endMonth = format(end, 'MMMM');
    if (startMonth === endMonth) {
      return `${startMonth} ${format(start, 'do')} - ${format(end, 'do')}, ${format(start, 'yyyy')}`;
    }
    return `${format(start, 'MMMM do')} - ${format(end, 'MMMM do')}, ${format(start, 'yyyy')}`;
  };

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

       {bannerImage && (
        <div className="relative w-full rounded-lg overflow-hidden">
            <AspectRatio ratio={16/9}>
                <Image
                    src={bannerImage.imageUrl}
                    alt="Events Banner"
                    fill
                    className="object-cover"
                    data-ai-hint={bannerImage.imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-6">
                    <h2 className="text-3xl font-headline font-bold text-white">Join Us for a Time of Encounter</h2>
                </div>
            </AspectRatio>
        </div>
      )}
      
      <section>
        <h2 className="text-2xl font-headline font-bold mb-4">Consecration Week</h2>
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Cross className="h-6 w-6 text-accent" />
              <CardTitle className="font-headline text-2xl">Global Consecration Week</CardTitle>
            </div>
            <CardDescription className="text-muted-foreground">A dedicated week for the entire community to align with God through fasting, prayer, and focused study.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              <span className="font-bold text-foreground">Dates:</span> {formatDateRange(consecrationWeek.startDate, consecrationWeek.endDate)}
            </p>
            <Accordion type="single" collapsible className="w-full">
              {consecrationWeek.schedule.map((day) => (
                <AccordionItem value={day.day} key={day.day}>
                  <AccordionTrigger className="text-lg font-semibold text-card-foreground">{day.day}: <span className="ml-2 font-normal text-muted-foreground">{day.theme}</span></AccordionTrigger>
                  <AccordionContent className="p-4 bg-secondary/10 rounded-md">
                    <ul className="space-y-2">
                      {day.points.map((point, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-card-foreground">{point.title}</p>
                            <p className="text-sm text-muted-foreground">{point.scripture}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-headline font-bold mb-4">Annual Ministry Calendar</h2>
        <Card>
          <CardHeader>
            <CardTitle>12-Month Ministry Blueprint</CardTitle>
            <CardDescription>A complete overview of our yearly Kingdom system and flow.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {annualCalendar.map((item) => (
                <AccordionItem value={item.month} key={item.month}>
                  <AccordionTrigger className="text-lg font-headline">{item.month}: <span className="ml-2 font-normal text-muted-foreground">{item.theme}</span></AccordionTrigger>
                  <AccordionContent className="p-4 bg-secondary/30 rounded-md">
                    <p className="font-semibold text-foreground">Purpose: <span className="font-normal text-muted-foreground">{item.purpose}</span></p>
                    <h4 className="font-semibold text-foreground mt-4 mb-2">Key Activities:</h4>
                    <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                      {item.activities.map(activity => <li key={activity}>{activity}</li>)}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>
      </section>
      
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

      <section>
        <h2 className="text-2xl font-headline font-bold mb-4">Empowerment Meetings</h2>
        <div className="grid gap-8 md:grid-cols-2">
          {empowermentMeetings.map(meeting => (
            <Card key={meeting.id} className="overflow-hidden">
              {meeting.image && (
                <div className="relative aspect-video w-full">
                  <Image src={meeting.image.imageUrl} alt={meeting.title} fill className="object-cover" data-ai-hint={meeting.image.imageHint} />
                </div>
              )}
              <CardHeader>
                <Badge variant="secondary" className="w-fit mb-2">{meeting.type}</Badge>
                <CardTitle className="font-headline text-xl">{meeting.title}</CardTitle>
                <CardDescription>{meeting.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  <span>{meeting.frequency}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>{meeting.time}</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Zap className="mr-2 h-4 w-4" />
                  Attend Meeting
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
