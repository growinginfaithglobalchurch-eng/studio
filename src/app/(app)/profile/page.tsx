
'use client';

import { ContentRecommender } from '@/components/content-recommender';
import { SpiritualGrowthChart } from '@/components/spiritual-growth-chart';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  BookOpen,
  HeartHandshake,
  Users,
  Clapperboard,
  Edit,
  Shield,
  Star,
  GitBranch,
  TrendingUp,
  Award,
  CheckCircle,
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { tribeIcons } from '@/components/profile-icons';
import { cn } from '@/lib/utils';

// Mock data based on the new User model
const user = {
  profile: {
    fullName: 'Joseph Tryson',
    email: 'joseph@faithconnect.com',
    photoURL: PlaceHolderImages.find((p) => p.id === 'avatar-1')?.imageUrl,
  },
  kingdomID: {
    kingdomIDNumber: 'KGC-2026-000123',
    authorityLevel: 1,
    tribe: 'Eagle',
    badge: 'Kingdom Citizen',
  },
  authority: {
      tier: 2,
      title: "Authorized Citizen",
      status: "Active"
  },
  dailyPractices: {
      streakCount: 21,
      alignment: true,
      wordIntake: true,
      identity: true,
      speech: true,
      obedience: false,
      warfareReadiness: true,
      review: true,
  },
  growthMetrics: {
      consistencyScore: 82,
      readinessLevel: "Emerging Authority",
      authorityEligibility: false,
  }
};

const dailyPracticesList = [
    { key: 'alignment', label: 'Alignment' },
    { key: 'wordIntake', label: 'Word Intake' },
    { key: 'identity', label: 'Identity' },
    { key: 'speech', label: 'Speech' },
    { key: 'obedience', label: 'Obedience' },
    { key: 'warfareReadiness', label: 'Warfare Readiness' },
    { key: 'review', label: 'Review' },
];

export default function ProfilePage() {

  const TribeIcon = tribeIcons[user.kingdomID.tribe as keyof typeof tribeIcons] || tribeIcons.All;

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            {user.profile.photoURL && (
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={user.profile.photoURL}
                  alt={user.profile.fullName}
                  data-ai-hint="man smiling"
                />
                <AvatarFallback>{user.profile.fullName.charAt(0)}</AvatarFallback>
              </Avatar>
            )}
            <div>
              <h1 className="text-2xl font-bold text-card-foreground">{user.profile.fullName}</h1>
              <p className="text-muted-foreground">{user.profile.email}</p>
            </div>
            <Button variant="outline" size="icon" className="ml-auto" asChild>
              <Link href="/profile/edit">
                <Edit className="h-4 w-4" />
                <span className="sr-only">Edit Profile</span>
              </Link>
            </Button>
          </div>
        </CardHeader>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="col-span-1 lg:col-span-1">
            <CardHeader>
                <CardTitle className="flex items-center gap-2 text-card-foreground"><Shield className="h-5 w-5 text-accent"/>Kingdom ID</CardTitle>
                <CardDescription>Your official spiritual identification.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                    <span className="text-sm text-card-foreground">ID Number</span>
                    <span className="font-mono text-sm font-bold text-card-foreground">{user.kingdomID.kingdomIDNumber}</span>
                </div>
                 <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                    <span className="text-sm text-card-foreground">Badge</span>
                    <Badge variant="default">{user.kingdomID.badge}</Badge>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                    <span className="text-sm text-card-foreground">Tribe</span>
                    <div className="flex items-center gap-2">
                        <TribeIcon className="h-5 w-5 text-accent" />
                        <span className="font-semibold text-card-foreground">{user.kingdomID.tribe}</span>
                    </div>
                </div>
                <div className="flex items-center justify-between p-3 rounded-lg bg-secondary">
                    <span className="text-sm text-card-foreground">Authority Level</span>
                    <span className="font-bold text-lg text-accent">{user.kingdomID.authorityLevel}</span>
                </div>
            </CardContent>
        </Card>
        
        <Card className="col-span-1 lg:col-span-1">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Star className="h-5 w-5 text-accent" />Status & Metrics</CardTitle>
                <CardDescription>Your current standing and growth.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                 <div className="text-center">
                    <p className="text-sm text-muted-foreground">Citizenship Status</p>
                    <p className="text-lg font-bold text-green-400">Active</p>
                </div>
                <Separator />
                <div className="text-center">
                    <p className="text-sm text-muted-foreground">Authority Title</p>
                    <p className="text-lg font-bold text-card-foreground">{user.authority.title}</p>
                </div>
                 <Separator />
                 <div className="flex justify-around items-center pt-2">
                    <div className="text-center">
                        <p className="text-sm text-muted-foreground">Consistency</p>
                        <p className="text-2xl font-bold text-accent">{user.growthMetrics.consistencyScore}%</p>
                    </div>
                     <div className="text-center">
                        <p className="text-sm text-muted-foreground">Readiness</p>
                        <p className="font-bold text-card-foreground">{user.growthMetrics.readinessLevel}</p>
                    </div>
                 </div>
            </CardContent>
        </Card>
        
        <Card className="col-span-1 md:col-span-2 lg:col-span-1">
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><TrendingUp className="h-5 w-5 text-accent"/>Daily Practices</CardTitle>
                <CardDescription>Your current daily discipline streak.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="text-center">
                    <p className="text-5xl font-bold text-accent">{user.dailyPractices.streakCount}</p>
                    <p className="text-sm text-muted-foreground">Day Streak</p>
                </div>
                 <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    {dailyPracticesList.map(practice => (
                        <div key={practice.key} className="flex items-center gap-2 text-sm">
                            <CheckCircle className={cn("h-4 w-4", user.dailyPractices[practice.key as keyof typeof user.dailyPractices] ? 'text-green-500' : 'text-muted-foreground/50')} />
                            <span className={cn(user.dailyPractices[practice.key as keyof typeof user.dailyPractices] ? 'text-foreground' : 'text-muted-foreground')}>{practice.label}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>

      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <SpiritualGrowthChart />
        <ContentRecommender />
      </div>
       <div className="grid gap-6">
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-accent"/>My Certificates & Badges</CardTitle>
                <CardDescription>Recognitions of your growth and achievements.</CardDescription>
            </CardHeader>
            <CardContent>
                 <div className="flex items-center gap-4 text-muted-foreground">
                    <p>Your earned certificates will appear here.</p>
                     <Button asChild variant="link">
                        <Link href="/certificates">View All</Link>
                     </Button>
                 </div>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
