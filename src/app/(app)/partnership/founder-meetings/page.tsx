
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Video, Star } from 'lucide-react';
import { ScrollAnimator } from '@/components/scroll-animator';

const monthlyMeetings = [
    { date: 'August 30, 2024', time: '8:00 PM EST', topic: 'Q3 Kingdom Strategy & Prophetic Direction' },
    { date: 'September 27, 2024', time: '8:00 PM EST', topic: 'Focus: Ministry Expansion into Asia' },
    { date: 'October 25, 2024', time: '8:00 PM EST', topic: 'Pre-Conference Impartation & Prayer' },
];

const annualMeeting = {
    date: 'December 28, 2024',
    time: '2:00 PM EST',
    title: '2025 Vision Casting & Annual Partner Summit',
    description: 'A special annual gathering to review the year, receive an exclusive word for the upcoming year, and participate in a powerful time of impartation with our founders.'
};

export default function FounderMeetingsPage() {
  return (
    <div className="space-y-8">
      <ScrollAnimator>
        <div>
          <div className="flex items-center gap-3 mb-2">
              <Calendar className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-headline font-bold text-foreground">Monthly and Annual Meetings with Our Founders</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            An exclusive benefit for our covenant partners to receive direct impartation, vision, and strategic updates.
          </p>
        </div>
      </ScrollAnimator>

      <ScrollAnimator>
        <Card className="bg-gradient-to-r from-primary/10 to-transparent">
          <CardHeader>
              <CardTitle className="font-headline text-xl text-foreground">The Purpose of Partner Meetings</CardTitle>
          </CardHeader>
          <CardContent>
              <p className="text-muted-foreground">
                  These private meetings are designed to foster a deeper connection between our leadership and you, our valued partners. It's a time for us to pour into you, share what God is showing us for the coming season, and pray together for the advancement of the Kingdom. Your partnership is a spiritual covenant, and these meetings are a key part of that relationship.
              </p>
          </CardContent>
        </Card>
      </ScrollAnimator>

      <ScrollAnimator>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Video className="h-5 w-5 text-accent"/>Upcoming Monthly Partner Briefings</CardTitle>
                <CardDescription>Join Joseph & Norah Tryson for these live, online-only sessions.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {monthlyMeetings.map((meeting) => (
                    <div key={meeting.date} className="flex flex-col sm:flex-row items-start justify-between p-4 rounded-lg border bg-secondary/50">
                        <div>
                            <p className="font-bold text-lg text-foreground">{meeting.date} at {meeting.time}</p>
                            <p className="text-sm text-muted-foreground mt-1">Topic: {meeting.topic}</p>
                        </div>
                        <Button className="mt-2 sm:mt-0" disabled>Link sent to Partners</Button>
                    </div>
                ))}
            </CardContent>
        </Card>
      </ScrollAnimator>

       <ScrollAnimator>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Star className="h-5 w-5 text-accent"/>Annual Partner Summit</CardTitle>
            </CardHeader>
            <CardContent>
                 <div className="flex flex-col sm:flex-row items-start justify-between p-4 rounded-lg border bg-secondary/50">
                    <div>
                        <p className="font-bold text-lg text-foreground">{annualMeeting.title}</p>
                        <p className="text-muted-foreground mt-1">{annualMeeting.date} at {annualMeeting.time}</p>
                        <p className="text-sm text-muted-foreground mt-2">{annualMeeting.description}</p>
                    </div>
                    <Button className="mt-4 sm:mt-0" disabled>Registration for Partners</Button>
                </div>
            </CardContent>
        </Card>
      </ScrollAnimator>
      
      <ScrollAnimator>
        <Card>
            <CardHeader>
                <CardTitle>How to Access</CardTitle>
                <CardDescription>Details for joining these exclusive meetings.</CardDescription>
            </CardHeader>
            <CardContent>
                <p className="text-muted-foreground">Private links to join the monthly and annual meetings will be sent directly to the email address of registered partners. Please ensure your contact information is up to date.</p>
            </CardContent>
        </Card>
      </ScrollAnimator>

    </div>
  );
}
