

'use client';

import { useParams } from 'next/navigation';
import { departments, Department, departmentContent } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { iconMap } from '../page';
import { slugify, unslugify } from '@/lib/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Home, MessageSquare, Calendar, Megaphone, UserPlus, BookOpen, ClipboardCheck, GraduationCap, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


export default function DepartmentDetailPage() {
    const params = useParams();
    const slug = params.slug as string;
    const { toast } = useToast();
    const departmentName = unslugify(slug);
    const department = departments.find(d => d.name === departmentName);
    
    // @ts-ignore
    const content = departmentContent[slug];


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
                        <CardContent>
                             {content?.announcements ? (
                                <div className="space-y-4">
                                {content.announcements.map((ann: any) => (
                                    <div key={ann.id} className="p-4 rounded-lg border">
                                        <p className="text-sm text-muted-foreground">{new Date(ann.date).toLocaleDateString()}</p>
                                        <h3 className="font-bold text-lg mt-1">{ann.title}</h3>
                                        <p className="text-sm text-muted-foreground mt-2">{ann.content}</p>
                                    </div>
                                ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">Department announcements coming soon.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
                 <TabsContent value="meetings">
                     <Card>
                        <CardHeader><CardTitle>Meetings & Schedule</CardTitle></CardHeader>
                        <CardContent>
                             {content?.meetings ? (
                                <div className="space-y-4">
                                {content.meetings.map((m: any) => (
                                    <div key={m.id} className="flex items-center justify-between p-4 rounded-lg border">
                                        <div>
                                            <p className="text-sm text-muted-foreground">{new Date(m.date).toLocaleString()}</p>
                                            <h3 className="font-bold text-lg mt-1">{m.title}</h3>
                                            <p className="text-sm text-muted-foreground mt-2">{m.description}</p>
                                        </div>
                                        <Button>Join Meeting</Button>
                                    </div>
                                ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">Meeting schedule and content coming soon.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="teachings">
                     <Card>
                        <CardHeader><CardTitle>Teachings</CardTitle></CardHeader>
                        <CardContent>
                           {content?.teachings ? (
                                <div className="space-y-4">
                                {content.teachings.map((t: any) => (
                                    <div key={t.id} className="flex items-center justify-between p-4 rounded-lg border">
                                        <div>
                                            <h3 className="font-bold text-lg">{t.title}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">{t.description}</p>
                                        </div>
                                        <Button variant="outline">Download: {t.file.name}</Button>
                                    </div>
                                ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">Teaching content coming soon.</p>
                           )}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="trainings">
                     <Card>
                        <CardHeader><CardTitle>Trainings & Practical Sessions</CardTitle></CardHeader>
                        <CardContent>
                           {content?.trainings ? (
                                <div className="space-y-4">
                                {content.trainings.map((t: any) => (
                                     <div key={t.id} className="flex items-center justify-between p-4 rounded-lg border">
                                        <div>
                                            <h3 className="font-bold text-lg">{t.title}</h3>
                                            <p className="text-sm text-muted-foreground mt-1">{t.description}</p>
                                        </div>
                                        <Button variant="outline">Download: {t.file.name}</Button>
                                    </div>
                                ))}
                                </div>
                            ) : (
                                <p className="text-muted-foreground">Training materials and session info coming soon.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
                <TabsContent value="assignments">
                     <Card>
                        <CardHeader><CardTitle>Assignments & Serving Appointments</CardTitle></CardHeader>
                        <CardContent>
                            {content?.assignments ? (
                                <div>
                                    <h3 className="text-xl font-bold mb-4">{content.assignments.title}</h3>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-[200px]">Role</TableHead>
                                                <TableHead>Assigned To</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {content.assignments.roles.map((a: any) => (
                                                <TableRow key={a.role}>
                                                    <TableCell className="font-medium">{a.role}</TableCell>
                                                    <TableCell>{a.person}</TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            ) : (
                               <p className="text-muted-foreground">Service schedules and assignments coming soon.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
