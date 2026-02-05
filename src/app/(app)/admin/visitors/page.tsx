
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ClipboardList, Users, Shield, Check, Award, Eye, Gavel, UserPlus, Link as LinkIcon, FileText, Loader2 } from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { Input } from '@/components/ui/input';

type Profile = {
    id: string;
    full_name: string;
}

type Visitor = {
    id: number;
    profile_id: string;
    name: string;
    track: string;
    progress: number;
    mentor_id: string | null;
    mentor_name: string | null;
    status: string;
    warRoomAccess: boolean;
    courtAccess: boolean;
    participation: {
        completed: string[];
        violations: string[];
    }
}

export default function AdminVisitorsPage() {
    const { toast } = useToast();
    const [visitors, setVisitors] = useState<Visitor[]>([]);
    const [allProfiles, setAllProfiles] = useState<Profile[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
    const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
    const [assignMentorState, setAssignMentorState] = useState({ visitorId: '', mentorId: '' });
    const [enrollVisitorState, setEnrollVisitorState] = useState({ profileId: '', track: 'Leadership' });

    useEffect(() => {
        const fetchData = async () => {
            setIsLoading(true);
            const { data: visitorsData, error: visitorsError } = await supabase.from('visitors').select('*');
            const { data: profilesData, error: profilesError } = await supabase.from('profiles').select('id, full_name');

            if (visitorsError || profilesError) {
                toast({ variant: 'destructive', title: "Error fetching data", description: visitorsError?.message || profilesError?.message });
            } else {
                const profilesMap = new Map(profilesData.map(p => [p.id, p.full_name]));
                const enrichedVisitors = visitorsData.map(v => ({
                    ...v,
                    name: profilesMap.get(v.profile_id) || 'Unknown User',
                    mentor_name: v.mentor_id ? (profilesMap.get(v.mentor_id) || 'Unassigned') : 'Unassigned',
                    // Keep static participation for the modal
                    participation: {
                        completed: ["Kingdom Protocols Training", "Identity & Purpose Session"],
                        violations: v.id === 1 ? ["Missed one mandatory session"] : []
                    }
                }));
                setVisitors(enrichedVisitors);
                setAllProfiles(profilesData);
            }
            setIsLoading(false);
        };
        fetchData();
    }, [toast]);

    const handleAccessChange = async (visitorId: number, type: 'war_room_access' | 'court_access', approve: boolean) => {
        const { data, error } = await supabase.from('visitors').update({ [type]: approve }).eq('id', visitorId).select().single();
        if (error) {
            toast({ variant: 'destructive', title: 'Error updating access', description: error.message });
        } else {
            setVisitors(prev => prev.map(v => v.id === visitorId ? { ...v, [type === 'war_room_access' ? 'warRoomAccess' : 'courtAccess']: approve } : v));
            toast({ title: 'Access Updated!', description: `Access has been ${approve ? 'granted' : 'revoked'}.` });
        }
    };

    const handleViewParticipation = (visitor: Visitor) => {
        setSelectedVisitor(visitor);
        setIsReviewDialogOpen(true);
    };

    const handleIssueBadge = (visitorName: string) => {
        toast({ title: 'Badge Issued', description: `An authority badge has been generated for ${visitorName}.` });
    };

    const handleGenerateReport = (visitorName: string) => {
        toast({ title: 'Report Generated', description: `A participation and progress report for ${visitorName} is being downloaded.` });
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Active': return 'default';
            case 'Completed': return 'secondary';
            case 'Pending': return 'outline';
            default: return 'secondary';
        }
    };
    
    const handleAssignmentChange = (type: 'visitorId' | 'mentorId', value: string) => {
        setAssignMentorState(prev => ({ ...prev, [type]: value }));
    };

    const handleAssignMentor = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!assignMentorState.visitorId || !assignMentorState.mentorId) {
            toast({ variant: 'destructive', title: 'Missing Fields', description: 'Please select a visitor and a mentor.' });
            return;
        }

        const { data, error } = await supabase.from('visitors').update({ mentor_id: assignMentorState.mentorId }).eq('id', assignMentorState.visitorId).select().single();

        if (error) {
            toast({ variant: 'destructive', title: 'Error assigning mentor', description: error.message });
        } else if (data) {
            const updatedVisitor = visitors.find(v => v.id.toString() === assignMentorState.visitorId);
            const mentor = allProfiles.find(p => p.id === assignMentorState.mentorId);
            if (updatedVisitor && mentor) {
                 setVisitors(prev => prev.map(v => v.id.toString() === assignMentorState.visitorId ? { ...v, mentor_id: mentor.id, mentor_name: mentor.full_name } : v));
            }
            setAssignMentorState({ visitorId: '', mentorId: '' });
            toast({ title: 'Mentor Assigned', description: `${mentor?.full_name} has been assigned.` });
        }
    };
    
    const handleEnrollVisitor = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!enrollVisitorState.profileId || !enrollVisitorState.track) {
            toast({ variant: 'destructive', title: 'Missing Fields', description: 'Please select a user and specify a track.' });
            return;
        }
        
        const newVisitorData = {
            profile_id: enrollVisitorState.profileId,
            track: enrollVisitorState.track,
            progress: 0,
            status: "Pending",
        };

        const { data, error } = await supabase.from('visitors').insert(newVisitorData).select().single();
        if (error) {
            toast({ variant: 'destructive', title: 'Error enrolling visitor', description: error.message });
        } else {
            const profile = allProfiles.find(p => p.id === data.profile_id);
            const newVisitor: Visitor = {
                ...data,
                name: profile?.full_name || 'Unknown',
                mentor_name: null,
                participation: { completed: [], violations: [] }
            }
            setVisitors(prev => [newVisitor, ...prev]);
            setEnrollVisitorState({ profileId: '', track: 'Leadership' });
            toast({ title: 'Visitor Enrolled', description: `${profile?.full_name} has been added to the visitors program.` });
        }
    }
    
    const unassignedProfiles = allProfiles.filter(p => !visitors.some(v => v.profile_id === p.id));


    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold text-foreground">Admin & Mentor View: Visitors</h1>
                <p className="text-muted-foreground">
                    Manage visitor programs, review participation, and assign roles.
                </p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><UserPlus className="h-5 w-5 text-accent" />Enroll New Visitor</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleEnrollVisitor} className="grid gap-6 md:grid-cols-3">
                         <div className="space-y-2">
                            <Label>Select User to Enroll</Label>
                            <Select onValueChange={(val) => setEnrollVisitorState(p => ({...p, profileId: val}))} value={enrollVisitorState.profileId}>
                                <SelectTrigger><SelectValue placeholder="Select a user" /></SelectTrigger>
                                <SelectContent>
                                    {unassignedProfiles.length > 0 ? unassignedProfiles.map(p => <SelectItem key={p.id} value={p.id}>{p.full_name}</SelectItem>) : <SelectItem value="none" disabled>No unenrolled users</SelectItem>}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                             <Label>Assign Track</Label>
                             <Input value={enrollVisitorState.track} onChange={(e) => setEnrollVisitorState(p => ({...p, track: e.target.value}))} placeholder="e.g., Leadership" />
                        </div>
                        <div className="flex items-end">
                            <Button type="submit" className="w-full">Enroll Visitor</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><LinkIcon className="h-5 w-5 text-accent" />Assign Mentor</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAssignMentor} className="grid gap-6 md:grid-cols-3">
                        <div className="space-y-2">
                            <Label>Select Visitor</Label>
                            <Select onValueChange={(val) => handleAssignmentChange('visitorId', val)} value={assignMentorState.visitorId}>
                                <SelectTrigger><SelectValue placeholder="Select a visitor" /></SelectTrigger>
                                <SelectContent>{visitors.map(v => <SelectItem key={v.id} value={v.id.toString()}>{v.name}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>Select Mentor</Label>
                            <Select onValueChange={(val) => handleAssignmentChange('mentorId', val)} value={assignMentorState.mentorId}>
                                <SelectTrigger><SelectValue placeholder="Select a mentor" /></SelectTrigger>
                                <SelectContent>{allProfiles.map(p => <SelectItem key={p.id} value={p.id}>{p.full_name}</SelectItem>)}</SelectContent>
                            </Select>
                        </div>
                        <div className="flex items-end">
                            <Button type="submit" className="w-full">Assign Mentor</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-accent" />Visitors Overview</CardTitle>
                    <CardDescription>Dashboard for all registered visitors in the program.</CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading ? (
                        <div className="flex justify-center items-center p-8"><Loader2 className="animate-spin h-8 w-8 text-accent" /></div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Visitor Name</TableHead>
                                    <TableHead>Track</TableHead>
                                    <TableHead>Progress</TableHead>
                                    <TableHead>Mentor</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>War Room Access</TableHead>
                                    <TableHead>Court Access</TableHead>
                                    <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {visitors.map((visitor) => (
                                    <TableRow key={visitor.id}>
                                        <TableCell className="font-medium">{visitor.name}</TableCell>
                                        <TableCell>{visitor.track}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Progress value={visitor.progress} className="w-24 h-2" />
                                                <span>{visitor.progress}%</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{visitor.mentor_name}</TableCell>
                                        <TableCell><Badge variant={getStatusVariant(visitor.status) as any}>{visitor.status}</Badge></TableCell>
                                        <TableCell>
                                            <Button size="sm" variant={visitor.warRoomAccess ? "secondary" : "default"} onClick={() => handleAccessChange(visitor.id, 'war_room_access', !visitor.warRoomAccess)} className="w-40">
                                                <Shield className="mr-2 h-4 w-4" />
                                                {visitor.warRoomAccess ? 'Access Approved' : 'Approve War Room'}
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button size="sm" variant={visitor.courtAccess ? "secondary" : "default"} onClick={() => handleAccessChange(visitor.id, 'court_access', !visitor.courtAccess)} className="w-40">
                                                <Gavel className="mr-2 h-4 w-4" />
                                                {visitor.courtAccess ? 'Access Approved' : 'Approve Court'}
                                            </Button>
                                        </TableCell>
                                        <TableCell className="text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild><Button variant="ghost" size="sm">Other Actions</Button></DropdownMenuTrigger>
                                                <DropdownMenuContent>
                                                    <DropdownMenuLabel>Manage Visitor</DropdownMenuLabel>
                                                    <DropdownMenuSeparator />
                                                    <DropdownMenuItem onClick={() => handleViewParticipation(visitor)}><Eye className="mr-2 h-4 w-4" />View Participation</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleGenerateReport(visitor.name)}><FileText className="mr-2 h-4 w-4" />Generate Report</DropdownMenuItem>
                                                    <DropdownMenuItem onClick={() => handleIssueBadge(visitor.name)}><Award className="mr-2 h-4 w-4" />Issue Badge</DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            <AlertDialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Participation Report for {selectedVisitor?.name}</AlertDialogTitle>
                        <AlertDialogDescription>A summary of the visitor's engagement and any recorded violations.</AlertDialogDescription>
                    </AlertDialogHeader>
                    {selectedVisitor && (
                        <div className="space-y-4 text-sm">
                           <div>
                                <h3 className="font-semibold text-foreground mb-2">Completed Activities</h3>
                                {selectedVisitor.participation.completed.length > 0 ? (
                                    <ul className="list-disc pl-5 text-muted-foreground">
                                        {selectedVisitor.participation.completed.map(item => <li key={item}>{item}</li>)}
                                    </ul>
                                ) : <p className="text-muted-foreground">No activities completed yet.</p>}
                           </div>
                           <div>
                                <h3 className="font-semibold text-foreground mb-2">Violations</h3>
                                {selectedVisitor.participation.violations.length > 0 ? (
                                    <ul className="list-disc pl-5 text-destructive">
                                        {selectedVisitor.participation.violations.map(item => <li key={item}>{item}</li>)}
                                    </ul>
                                ) : <p className="text-muted-foreground">No violations recorded.</p>}
                           </div>
                        </div>
                    )}
                    <AlertDialogFooter>
                        <AlertDialogAction onClick={() => setIsReviewDialogOpen(false)}>Close</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
