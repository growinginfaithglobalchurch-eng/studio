
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ClipboardList, Users, Shield, Check, Award, Eye, Gavel } from 'lucide-react';
import { communityUsers } from '@/lib/data';
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

type Visitor = {
    id: number;
    name: string;
    track: string;
    progress: number;
    mentor: string;
    status: string;
    warRoomAccess: boolean;
    courtAccess: boolean;
    participation: {
        completed: string[];
        violations: string[];
    }
}

const initialVisitors: Visitor[] = [
    {
        id: 1,
        name: communityUsers[2].name,
        track: "Leadership",
        progress: 75,
        mentor: communityUsers[0].name,
        status: "Active",
        warRoomAccess: false,
        courtAccess: false,
        participation: {
            completed: ["Kingdom Protocols Training", "Identity & Purpose Session"],
            violations: ["Missed one mandatory session"]
        }
    },
    {
        id: 2,
        name: communityUsers[3].name,
        track: "Warrior",
        progress: 40,
        mentor: communityUsers[1].name,
        status: "Pending",
        warRoomAccess: false,
        courtAccess: false,
        participation: {
            completed: ["Kingdom Protocols Training"],
            violations: []
        }
    },
    {
        id: 3,
        name: communityUsers[4].name,
        track: "Family & Youth",
        progress: 90,
        mentor: communityUsers[1].name,
        status: "Completed",
        warRoomAccess: true,
        courtAccess: false,
         participation: {
            completed: ["All required sessions", "Final assessment"],
            violations: []
        }
    }
];

export default function AdminVisitorsPage() {
    const { toast } = useToast();
    const [visitors, setVisitors] = useState(initialVisitors);
    const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);
    const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

    const handleApproveWarRoom = (visitorId: number) => {
        setVisitors(prev => prev.map(v => v.id === visitorId ? { ...v, warRoomAccess: true } : v));
        toast({
            title: 'Access Granted!',
            description: `War Room access has been approved for the selected visitor.`,
        });
    };
    
    const handleApproveCourtAccess = (visitorId: number) => {
        setVisitors(prev => prev.map(v => v.id === visitorId ? { ...v, courtAccess: true } : v));
        toast({
            title: 'Access Granted!',
            description: `Courts of Heaven access has been approved for the selected visitor.`,
        });
    };

    const handleViewParticipation = (visitor: Visitor) => {
        setSelectedVisitor(visitor);
        setIsReviewDialogOpen(true);
    };

    const handleIssueBadge = (visitorName: string) => {
        toast({
            title: 'Badge Issued',
            description: `An authority badge has been generated for ${visitorName}.`,
        });
    };

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'Active': return 'default';
            case 'Completed': return 'secondary';
            case 'Pending': return 'outline';
            default: return 'secondary';
        }
    }

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
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-accent" />
                        Visitors Overview
                    </CardTitle>
                    <CardDescription>
                        Dashboard for all registered visitors in the program.
                    </CardDescription>
                </CardHeader>
                <CardContent>
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
                                    <TableCell>{visitor.mentor}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusVariant(visitor.status) as any}>{visitor.status}</Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="sm"
                                            variant={visitor.warRoomAccess ? "secondary" : "default"}
                                            onClick={() => handleApproveWarRoom(visitor.id)}
                                            disabled={visitor.warRoomAccess}
                                            className="w-40"
                                        >
                                            <Shield className="mr-2 h-4 w-4" />
                                            {visitor.warRoomAccess ? 'Access Approved' : 'Approve War Room'}
                                        </Button>
                                    </TableCell>
                                     <TableCell>
                                        <Button
                                            size="sm"
                                            variant={visitor.courtAccess ? "secondary" : "default"}
                                            onClick={() => handleApproveCourtAccess(visitor.id)}
                                            disabled={visitor.courtAccess}
                                            className="w-40"
                                        >
                                            <Gavel className="mr-2 h-4 w-4" />
                                            {visitor.courtAccess ? 'Access Approved' : 'Approve Court'}
                                        </Button>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm">Other Actions</Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                <DropdownMenuLabel>Manage Visitor</DropdownMenuLabel>
                                                <DropdownMenuSeparator />
                                                <DropdownMenuItem onClick={() => handleViewParticipation(visitor)}>
                                                    <Eye className="mr-2 h-4 w-4" />
                                                    View Participation
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleIssueBadge(visitor.name)}>
                                                    <Award className="mr-2 h-4 w-4" />
                                                    Issue Badge
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <AlertDialog open={isReviewDialogOpen} onOpenChange={setIsReviewDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Participation Report for {selectedVisitor?.name}</AlertDialogTitle>
                        <AlertDialogDescription>
                           A summary of the visitor's engagement and any recorded violations.
                        </AlertDialogDescription>
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
