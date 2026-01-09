import { ContentRecommender } from '@/components/content-recommender';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  BookOpen,
  HeartHandshake,
  Users,
  Clapperboard,
} from 'lucide-react';

const stats = [
  {
    icon: <BookOpen className="h-6 w-6 text-primary" />,
    title: 'Devotionals Read',
    value: '12',
  },
  {
    icon: <HeartHandshake className="h-6 w-6 text-primary" />,
    title: 'Prayers Joined',
    value: '8',
  },
  {
    icon: <Clapperboard className="h-6 w-6 text-primary" />,
    title: 'Sessions Watched',
    value: '5',
  },
  {
    icon: <Users className="h-6 w-6 text-primary" />,
    title: 'New Connections',
    value: '3',
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight font-headline">
          Welcome back, Joseph!
        </h1>
        <p className="text-muted-foreground">
          Here is your spiritual growth journey at a glance.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:bg-card/90 transition-colors">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                in the last 30 days
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6">
        <ContentRecommender />
      </div>

      <div>
        {/* Placeholder for more dashboard components like upcoming events, recent activity etc */}
      </div>
    </div>
  );
}
