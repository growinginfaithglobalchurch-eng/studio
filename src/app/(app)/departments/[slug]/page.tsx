
'use client';

import { useParams } from 'next/navigation';
import { departments, Department } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { iconMap } from '../page';
import { slugify, unslugify } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, MessageSquare, Calendar, Megaphone, UserPlus, BookOpen, ClipboardCheck, GraduationCap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

export default function DepartmentDetailPage() {
    const params = useParams();
    const { toast } = useToast();
    const departmentName = unslugify(params.slug as string);
    const department = departments.find(d => d.name === departmentName);

    const handleJoin = () => {
        if (!department) return;
        toast({
            title: 'Request to Join Sent!',
            description: `Your request to join the ${department.name} has been submitted.`
        });
    };

    if (!department) {
        return (
            <div className="text-center py-10">
                <h1 className="text-2xl font-bold">Department not found</h1>
                <p className="text-muted-foreground">The department you are looking for does not exist.</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <div className="flex items-start gap-4">
                        {iconMap[department.icon]}
                        <div>
                            <CardTitle className="font-headline text-3xl">{department.name}</CardTitle>
                            <CardDescription className="text-lg mt-1">{department.description}</CardDescription>
                        </div>
                         <Button className="ml-auto" onClick={handleJoin}>
                            <UserPlus className="mr-2 h-4 w-4" />
                            Join Department
                        </Button>
                    </div>
                </CardHeader>
            </Card>

            <Tabs defaultValue="home" className="w-full">
                <TabsList className="grid w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                    <TabsTrigger value="home"><Home className="mr-2 h-4 w-4" /> Home</TabsTrigger>
                    <TabsTrigger value="announcements"><Megaphone className="mr-2 h-4 w-4" /> Announcements</TabsTrigger>
                    <TabsTrigger value="meetings"><Calendar className="mr-2 h-4 w-4" /> Meetings</TabsTrigger>
                    <TabsTrigger value="teachings"><BookOpen className="mr-2 h-4 w-4" /> Teachings</TabsTrigger>
                    <TabsTrigger value="trainings"><GraduationCap className="mr-2 h-4 w-4" /> Trainings</TabsTrigger>
                    <TabsTrigger value="assignments"><ClipboardCheck className="mr-2 h-4 w-4" /> Assignments</TabsTrigger>
                </TabsList>
                <TabsContent value="home">
                    <Card>
                        <CardHeader>
                            <CardTitle>Welcome to the {department.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">This is the central hub for our department. Here you can find announcements, join discussions, see upcoming meetings, and access training materials. We're glad to have you!</p>
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="announcements">
                     <Card>
                        <CardHeader><CardTitle>Announcements</CardTitle></CardHeader>
                        <CardContent><p className="text-muted-foreground">Department announcements coming soon.</p></CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="meetings">
                     <Card>
                        <CardHeader><CardTitle>Meetings & Schedule</CardTitle></CardHeader>
                        <CardContent><p className="text-muted-foreground">Meeting schedule and content coming soon.</p></CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="teachings">
                     <Card>
                        <CardHeader><CardTitle>Teachings</CardTitle></CardHeader>
                        <CardContent><p className="text-muted-foreground">Teaching content coming soon.</p></CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="trainings">
                     <Card>
                        <CardHeader><CardTitle>Trainings & Practical Sessions</CardTitle></CardHeader>
                        <CardContent><p className="text-muted-foreground">Training materials and session info coming soon.</p></CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="assignments">
                     <Card>
                        <CardHeader><CardTitle>Assignments & Serving Appointments</CardTitle></CardHeader>
                        <CardContent><p className="text-muted-foreground">Service schedules and assignments coming soon.</p></CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
