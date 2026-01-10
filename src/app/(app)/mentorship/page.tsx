import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { communityUsers } from '@/lib/data';
import {
  ClipboardCheck,
  UserCheck,
  UserPlus,
} from 'lucide-react';

const mentors = communityUsers.slice(0, 4);

const mentorshipTracks = [
  {
    icon: <ClipboardCheck className="h-6 w-6 text-accent" />,
    title: 'Foundations of Faith',
    description:
      'A 12-week program covering the core doctrines of Christianity, designed for new believers.',
  },
  {
    icon: <ClipboardCheck className="h-6 w-6 text-accent" />,
    title: 'Kingdom Leadership',
    description:
      'Develop your leadership skills and learn to lead with a servant\'s heart in your sphere of influence.',
  },
  {
    icon: <ClipboardCheck className="h-6 w-6 text-accent" />,
    title: 'Prophetic Ministry Training',
    description:
      'Learn to hear the voice of God more clearly and operate in the prophetic gifts.',
  },
];

export default function MentorshipPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <UserCheck className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-headline font-bold text-foreground">
            Mentorship & Discipleship
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Connect with seasoned believers who can guide you on your spiritual
          journey.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Find a Mentor</CardTitle>
          <CardDescription>
            Browse our community of mentors and request to connect.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {mentors.map((mentor) => (
            <Card key={mentor.id} className="flex flex-col items-center p-6 text-center">
              <Avatar className="h-24 w-24">
                {mentor.avatar && (
                  <AvatarImage src={mentor.avatar.imageUrl} alt={mentor.name} data-ai-hint={mentor.avatar.imageHint} />
                )}
                <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <h3 className="mt-4 text-lg font-bold text-card-foreground">{mentor.name}</h3>
              <p className="text-sm text-muted-foreground">{mentor.location}</p>
              <Button className="mt-4 w-full">
                <UserPlus className="mr-2 h-4 w-4" />
                Request Mentor
              </Button>
            </Card>
          ))}
        </CardContent>
      </Card>
      
      <div className="space-y-4">
        <h2 className="text-2xl font-headline font-bold">Mentorship Tracks</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mentorshipTracks.map((track) => (
            <Card key={track.title} className="flex flex-col">
              <CardHeader className="flex flex-row items-start gap-4">
                {track.icon}
                <div className="flex-grow">
                  <CardTitle>{track.title}</CardTitle>
                  <CardDescription className="mt-1">
                    {track.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex-grow" />
              <div className="p-6 pt-0">
                <Button variant="outline">Learn More</Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
