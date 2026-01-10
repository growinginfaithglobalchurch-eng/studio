
'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutDashboard, Users, Shield, Eye, BarChart, Settings, CheckCircle, Flame } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { communityUsers } from '@/lib/data';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

const children = communityUsers.slice(2, 5).map((u, i) => ({ 
    ...u, 
    name: `${u.name} (Child)`,
    guardianApproved: i % 2 === 0,
    dailyPracticeCompletion: [85, 60, 95][i],
    streakCount: [14, 5, 32][i]
}));

const activityFeed = [
    { id: 1, childId: 3, activity: 'Completed the "David and Goliath" lesson.', timestamp: '2 hours ago' },
    { id: 2, childId: 4, activity: 'Earned the "Memory Verse Master" badge.', timestamp: '5 hours ago' },
    { id: 3, childId: 3, activity: 'Watched the "Parable of the Sower" video.', timestamp: '1 day ago' },
    { id: 4, childId: 5, activity: 'Joined the "Youth Leadership" discussion group.', timestamp: '2 days ago' },
]

export default function ParentalDashboardPage() {
    const [selectedChildId, setSelectedChildId] = useState(children[0].id.toString());

    const selectedChild = children.find(c => c.id.toString() === selectedChildId);
    const childsActivity = activityFeed.filter(a => a.childId.toString() === selectedChildId);

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
            <LayoutDashboard className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">Parental Dashboard</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Monitor your child's activity, progress, and settings to ensure a safe and fruitful experience.
        </p>
      </div>

       <Card>
        <CardHeader>
            <CardTitle>Select Child</CardTitle>
        </CardHeader>
        <CardContent>
             <Select onValueChange={setSelectedChildId} value={selectedChildId}>
                <SelectTrigger className="w-full md:w-[300px]">
                    <SelectValue placeholder="Select a child to view their dashboard" />
                </SelectTrigger>
                <SelectContent>
                    {children.map(child => (
                        <SelectItem key={child.id} value={child.id.toString()}>
                           <div className="flex items-center gap-3">
                             <Avatar className="h-6 w-6">
                                {child.avatar && <AvatarImage src={child.avatar.imageUrl} alt={child.name} />}
                                <AvatarFallback>{child.name.charAt(0)}</AvatarFallback>
                             </Avatar>
                             <span>{child.name}</span>
                           </div>
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </CardContent>
       </Card>

      {selectedChild && (
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8">
                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><BarChart className="h-5 w-5 text-accent"/>Recent Activity</CardTitle>
                        <CardDescription>A log of {selectedChild.name}'s recent engagement on the platform.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-4">
                            {childsActivity.length > 0 ? childsActivity.map(item => (
                                <li key={item.id} className="flex items-center gap-4">
                                    <div className="bg-muted p-2 rounded-full">
                                        <Eye className="h-4 w-4 text-accent"/>
                                    </div>
                                    <div className="flex-grow">
                                        <p className="text-sm text-foreground">{item.activity}</p>
                                        <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                                    </div>
                                </li>
                            )) : <p className="text-sm text-muted-foreground">No recent activity to show.</p>}
                        </ul>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2"><Settings className="h-5 w-5 text-accent"/>Content & Safety Settings</CardTitle>
                        <CardDescription>Manage {selectedChild.name}'s access and safety preferences.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg border">
                            <p className="font-medium">Restrict Chat to Friends Only</p>
                            <Button size="sm">Enable</Button>
                        </div>
                         <div className="flex items-center justify-between p-3 rounded-lg border">
                            <p className="font-medium">Time-of-Day Restrictions</p>
                            <Button size="sm" variant="outline">Set Schedule</Button>
                        </div>
                    </CardContent>
                </Card>

            </div>
            <div className="space-y-8">
                <Card>
                    <CardHeader className="items-center text-center">
                         <Avatar className="h-24 w-24 border-4 border-accent">
                            {selectedChild.avatar && <AvatarImage src={selectedChild.avatar.imageUrl} alt={selectedChild.name} />}
                            <AvatarFallback>{selectedChild.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <CardTitle className="pt-2">{selectedChild.name}</CardTitle>
                        {selectedChild.guardianApproved && (
                             <Badge variant="secondary" className="bg-green-500/20 border-green-500/50 text-green-400">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Guardian Approved
                            </Badge>
                        )}
                    </CardHeader>
                    <CardContent className="text-center">
                        <div className="mb-4">
                            <p className="text-sm text-muted-foreground mb-1">Daily Practice Completion</p>
                            <Progress value={selectedChild.dailyPracticeCompletion} className="h-2"/>
                            <p className="text-xs font-bold text-foreground mt-1">{selectedChild.dailyPracticeCompletion}%</p>
                        </div>
                         <div className="flex items-center justify-center gap-2">
                            <Flame className="h-5 w-5 text-accent"/>
                            <p className="text-lg font-bold">{selectedChild.streakCount} Day Streak</p>
                         </div>
                    </CardContent>
                </Card>
            </div>

        </div>
      )}


    </div>
  );
}
