
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

const initialVisitors = [
    {
        id: 1,
        name: communityUsers[2].name,
        track: "Leadership",
        progress: 75,
        mentor: communityUsers[0].name,
        status: "Active",
        warRoomAccess: false,
        courtAccess: false,
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
    }
];

export default function AdminVisitorsPage() {
    const { toast } = useToast();
    const [visitors, setVisitors] = useState(initialVisitors);

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

    const handleViewParticipation = (visitorName: string) => {
        toast({
            title: 'Loading Report',
            description: `Generating participation report for ${visitorName}...`,
        });
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
                                                <DropdownMenuItem onClick={() => handleViewParticipation(visitor.name)}>
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
        </div>
    );
}
