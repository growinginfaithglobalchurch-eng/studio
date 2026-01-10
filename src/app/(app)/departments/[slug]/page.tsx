
'use client';

import { useParams } from 'next/navigation';
import { departments, Department } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { iconMap } from '../page';
import { slugify, unslugify } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, MessageSquare, Calendar, Megaphone, UserPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function DepartmentDetailPage() {
    const params = useParams();
    const departmentName = unslugify(params.slug as string);
    const department = departments.find(d => d.name === departmentName);

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
                         <Button className="ml-auto">
                            <UserPlus className="mr-2 h-4 w-4" />
                            Join Department
                        </Button>
                    </div>
                </CardHeader>
            </Card>

            <Tabs defaultValue="home" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="home"><Home className="mr-2 h-4 w-4" /> Home</TabsTrigger>
                    <TabsTrigger value="chat"><MessageSquare className="mr-2 h-4 w-4" /> Chat</TabsTrigger>
                    <TabsTrigger value="meetings"><Calendar className="mr-2 h-4 w-4" /> Meetings</TabsTrigger>
                    <TabsTrigger value="announcements"><Megaphone className="mr-2 h-4 w-4" /> Announcements</TabsTrigger>
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
                <TabsContent value="chat">
                     <Card>
                        <CardHeader><CardTitle>Chat Room</CardTitle></CardHeader>
                        <CardContent><p className="text-muted-foreground">Chat functionality coming soon.</p></CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="meetings">
                     <Card>
                        <CardHeader><CardTitle>Meetings & Schedule</CardTitle></CardHeader>
                        <CardContent><p className="text-muted-foreground">Meeting schedule and content coming soon.</p></CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="announcements">
                     <Card>
                        <CardHeader><CardTitle>Announcements</CardTitle></CardHeader>
                        <CardContent><p className="text-muted-foreground">Department announcements coming soon.</p></CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
