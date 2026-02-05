

'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar as CalendarIcon, Ticket, Clock, Video, MapPin, CalendarDays, Zap, BookOpen, Edit, Save, Trash2, Cross, CheckCircle, PartyPopper, Loader2 } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { events as initialEvents, empowermentMeetings as initialMeetings, consecrationWeek } from '@/lib/data';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { format } from 'date-fns';
import { communityUsers } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollAnimator } from '@/components/scroll-animator';
import { supabase } from '@/lib/supabase';

type Conference = {
    id: number;
    title: string;
    description: string;
    dates: string;
    location: string;
    image_url: string;
    image_hint: string;
    isRegistered: boolean;
};

type MonthlyEvent = {
    id: number;
    month: string;
    theme: string;
    purpose: string;
    activities: string[];
};

export default function EventsPage() {
  const [date, setDate] = useState<Date | undefined>();
  const [isClient, setIsClient] = useState(false);
  const [events, setEvents] = useState(initialEvents);
  
  const [conferences, setConferences] = useState<Conference[]>([]);
  const [annualCalendar, setAnnualCalendar] = useState<MonthlyEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [empowermentMeetings, setEmpowermentMeetings] = useState(initialMeetings);
  const { toast } = useToast();

  useEffect(() => {
    setIsClient(true);
    setDate(new Date());
    
    const fetchData = async () => {
        setIsLoading(true);
        
        const [confRes, calendarRes] = await Promise.all([
            supabase.from('conferences').select('*').order('id', { ascending: false }),
            supabase.from('annual_calendar').select('*').order('id', { ascending: true })
        ]);

        if (confRes.error) {
            toast({ variant: 'destructive', title: 'Error fetching conferences', description: confRes.error.message });
        } else {
            setConferences(confRes.data.map(c => ({
                ...c,
                isRegistered: false // initial state
            })));
        }

        if (calendarRes.error) {
            toast({ variant: 'destructive', title: 'Error fetching calendar', description: calendarRes.error.message });
        } else {
            setAnnualCalendar(calendarRes.data);
        }

        setIsLoading(false);
    };
    fetchData();
  }, [toast]);

  const handleRegister = (id: number, type: 'event' | 'conference' | 'meeting') => {
    let title = '';
    if (type === 'event') {
        setEvents(prev => prev.map(e => {
            if (e.id === id) {
                title = e.title;
                return { ...e, isRegistered: !e.isRegistered };
            }
            return e;
        }));
    } else if (type === 'conference') {
        setConferences(prev => prev.map(c => {
            if (c.id === id) {
                title = c.title;
                return { ...c, isRegistered: !c.isRegistered };
            }
            return c;
        }));
    } else {
        setEmpowermentMeetings(prev => prev.map(m => {
            if (m.id === id) {
                title = m.title;
                return { ...m, isRegistered: !m.isRegistered };
            }
            return m;
        }));
    }

    const isRegistering = (type === 'event' && !events.find(e=>e.id===id)?.isRegistered) ||
                          (type === 'conference' && !conferences.find(c=>c.id===id)?.isRegistered) ||
                          (type === 'meeting' && !empowermentMeetings.find(m=>m.id===id)?.isRegistered);

    toast({
        title: isRegistering ? "Registration Confirmed!" : "Registration Cancelled",
        description: isRegistering ? `You are now registered for "${title}".` : `Your registration for "${title}" has been cancelled.`,
    });
  };

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
  
  const registeredEvents = [
      ...events.filter(e => e.isRegistered),
      ...conferences.filter(c => c.isRegistered),
      ...empowermentMeetings.filter(m => m.isRegistered)
  ];

  return (
    <div className="space-y-8">
      <ScrollAnimator>
        <div>
          <div className="flex items-center gap-3 mb-2">
            <CalendarIcon className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">Events & Live Sessions</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Join our live events, view schedules, and register for upcoming sessions.
          </p>
        </div>
      </ScrollAnimator>

       {bannerImage && (
        <ScrollAnimator>
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
        </ScrollAnimator>
      )}
      
      <ScrollAnimator>
        <Tabs defaultValue="all">
          <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
              <TabsTrigger value="all"><PartyPopper className="mr-2 h-4 w-4"/> All Events</TabsTrigger>
              <TabsTrigger value="registered"><CheckCircle className="mr-2 h-4 w-4"/> My Events ({registeredEvents.length})</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-8 mt-4">
              <section>
                  <h2 className="text-2xl font-headline font-bold mb-4">Consecration Week</h2>
                  <ScrollAnimator>
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
                          <span className="font-bold text-card-foreground">Dates:</span> {formatDateRange(consecrationWeek.startDate, consecrationWeek.endDate)}
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
                  </ScrollAnimator>
              </section>

              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">Annual Ministry Calendar</h2>
                <ScrollAnimator>
                  <Card>
                    <CardHeader>
                      <CardTitle>12-Month Ministry Blueprint</CardTitle>
                      <CardDescription>A complete overview of our yearly Kingdom system and flow.</CardDescription>
                    </CardHeader>
                    <CardContent>
                       {isLoading ? (
                           <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /><p className="ml-2">Loading calendar...</p></div>
                       ) : (
                          <Accordion type="single" collapsible className="w-full">
                            {annualCalendar.map((item) => (
                              <AccordionItem value={item.month} key={item.month}>
                                <AccordionTrigger className="text-lg font-headline">{item.month}: <span className="ml-2 font-normal text-muted-foreground">{item.theme}</span></AccordionTrigger>
                                <AccordionContent className="p-4 bg-secondary rounded-md">
                                  <p className="font-semibold text-card-foreground">Purpose: <span className="font-normal text-muted-foreground">{item.purpose}</span></p>
                                  <h4 className="font-semibold text-card-foreground mt-4 mb-2">Key Activities:</h4>
                                  <ul className="list-disc pl-5 text-muted-foreground space-y-1">
                                    {item.activities.map(activity => <li key={activity}>{activity}</li>)}
                                  </ul>
                                </AccordionContent>
                              </AccordionItem>
                            ))}
                          </Accordion>
                       )}
                    </CardContent>
                  </Card>
                </ScrollAnimator>
              </section>
              
              <section>
                  <h2 className="text-2xl font-headline font-bold mb-4">Major Conferences</h2>
                  {isLoading ? (
                    <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /><p className="ml-2">Loading conferences...</p></div>
                  ) : (
                    <div className="grid gap-8 md:grid-cols-2">
                      {conferences.map((conf, index) => (
                          <ScrollAnimator key={conf.id} delay={index * 0.1}>
                            <Card className="overflow-hidden">
                                {conf.image_url && (
                                    <div className="relative aspect-video w-full">
                                        <Image src={conf.image_url} alt={conf.title} fill className="object-cover" data-ai-hint={conf.image_hint}/>
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
                                    <Button onClick={() => handleRegister(conf.id, 'conference')} className="w-full" variant={conf.isRegistered ? "secondary" : "default"}>
                                      <Ticket className="mr-2 h-4 w-4" />
                                      {conf.isRegistered ? 'Registered' : 'Register Now'}
                                  </Button>
                                </CardFooter>
                            </Card>
                          </ScrollAnimator>
                      ))}
                    </div>
                  )}
              </section>

              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">Empowerment Meetings</h2>
                <div className="grid gap-8 md:grid-cols-2">
                  {empowermentMeetings.map((meeting, index) => (
                    <ScrollAnimator key={meeting.id} delay={index * 0.1}>
                      <Card className="overflow-hidden">
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
                          <Button onClick={() => handleRegister(meeting.id, 'meeting')} className="w-full" variant={meeting.isRegistered ? "secondary" : "default"}>
                            <Zap className="mr-2 h-4 w-4" />
                            {meeting.isRegistered ? 'Attending' : 'Attend Meeting'}
                          </Button>
                        </CardFooter>
                      </Card>
                    </ScrollAnimator>
                  ))}
                </div>
              </section>

              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-8">
                    <ScrollAnimator>
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
                                      <Button onClick={() => handleRegister(event.id, 'event')} className="w-full sm:w-auto mt-4 sm:mt-0" variant={event.isRegistered ? 'secondary' : 'default'}>
                                          <Ticket className="mr-2 h-4 w-4" />
                                          {event.isRegistered ? 'Registered' : (event.isLive ? 'Join Now' : 'Register')}
                                      </Button>
                                  </div>
                              ))}
                          </CardContent>
                      </Card>
                    </ScrollAnimator>
                </div>

                <div className="space-y-8">
                  <ScrollAnimator>
                    <Card>
                      <CardHeader>
                        <CardTitle>Event Schedule</CardTitle>
                      </CardHeader>
                      <CardContent className="flex justify-center">
                        {isClient && date ? (
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            className="rounded-md border"
                          />
                        ) : (
                          <div className="rounded-md border p-3">
                            <div className="h-[280px] w-[258px] animate-pulse bg-muted rounded-md" />
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </ScrollAnimator>
                  <ScrollAnimator>
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
                  </ScrollAnimator>
                </div>
              </div>
          </TabsContent>
          <TabsContent value="registered">
              <ScrollAnimator>
                <Card>
                    <CardHeader>
                        <CardTitle>My Registered Events</CardTitle>
                        <CardDescription>All your upcoming registered events in one place.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {registeredEvents.length > 0 ? registeredEvents.map(event => (
                            <div key={`${event.id}-${event.title}`} className="flex flex-col sm:flex-row items-start gap-4 rounded-lg border p-4">
                                <div className="flex-grow">
                                    <h3 className="text-lg font-bold">{event.title}</h3>
                                    <p className="text-sm text-muted-foreground">{'time' in event ? event.time : event.dates}</p>
                                </div>
                                <Button variant="destructive" size="sm" onClick={() => handleRegister(event.id, 'title' in event && 'isLive' in event ? 'event' : ('location' in event ? 'conference' : 'meeting'))}>
                                    Cancel Registration
                                </Button>
                            </div>
                        )) : <p className="text-muted-foreground">You are not registered for any events.</p>}
                    </CardContent>
                </Card>
              </ScrollAnimator>
          </TabsContent>
        </Tabs>
      </ScrollAnimator>
    </div>
  );
}
