
'use client';

import { ContentRecommender } from '@/components/content-recommender';
import { SpiritualGrowthChart } from '@/components/spiritual-growth-chart';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookOpen,
  HeartHandshake,
  Users,
  Clapperboard,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';
import Link from 'next/link';

const stats = [
  {
    icon: <BookOpen className="h-6 w-6 text-accent" />,
    title: 'Devotionals Read',
    value: '12',
  },
  {
    icon: <HeartHandshake className="h-6 w-6 text-accent" />,
    title: 'Prayers Joined',
    value: '8',
  },
  {
    icon: <Clapperboard className="h-6 w-6 text-accent" />,
    title: 'Sessions Watched',
    value: '5',
  },
  {
    icon: <Users className="h-6 w-6 text-accent" />,
    title: 'New Connections',
    value: '3',
  },
];

// In a real app, this would come from an auth context
const user = {
  name: 'Joseph',
  email: 'joseph@faithconnect.com',
  avatar: PlaceHolderImages.find((p) => p.id === 'avatar-1'),
};


export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            {user.avatar && (
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={user.avatar.imageUrl}
                  alt={user.name}
                  data-ai-hint={user.avatar.imageHint}
                />
                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div>
              <h1 className="text-2xl font-bold text-card-foreground">{user.name}</h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
            <Button variant="outline" size="icon" className="ml-auto" asChild>
              <Link href="/profile/edit">
                <Edit className="h-4 w-4 text-accent" />
                <span className="sr-only">Edit Profile</span>
              </Link>
            </Button>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:bg-card/90 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-card-foreground">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-card-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                in the last 30 days
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SpiritualGrowthChart />
        <ContentRecommender />
      </div>

      <div>
        {/* Placeholder for more dashboard components like upcoming events, recent activity etc */}
      </div>
    </div>
  );
}
