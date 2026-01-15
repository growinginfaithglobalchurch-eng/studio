
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { communityUsers as initialUsers } from '@/lib/data';
import {
  Activity,
  ArrowUpRight,
  FileText,
  HeartHandshake,
  MoreHorizontal,
  Users,
} from 'lucide-react';
import Link from 'next/link';
import { ScrollAnimator } from '@/components/scroll-animator';
import { useState } from 'react';
import type { User } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

export default function AdminPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleDeleteUser = (userId: number) => {
    const userToDelete = users.find(u => u.id === userId);
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId));
    if (userToDelete) {
      toast({
        title: 'User Deleted',
        description: `${userToDelete.name} has been removed from the platform.`,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <ScrollAnimator>
        <div className="flex items-center">
          <h1 className="text-2xl font-semibold md:text-3xl font-headline">Admin Dashboard</h1>
        </div>
      </ScrollAnimator>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <ScrollAnimator delay={0.1}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{users.length}</div>
              <p className="text-xs text-muted-foreground">
                +20.1% from last month
              </p>
            </CardContent>
          </Card>
        </ScrollAnimator>
        <ScrollAnimator delay={0.2}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Posts Today</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+52</div>
              <p className="text-xs text-muted-foreground">
                +12 since last hour
              </p>
            </CardContent>
          </Card>
        </ScrollAnimator>
        <ScrollAnimator delay={0.3}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Prayer Requests
              </CardTitle>
              <HeartHandshake className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+120</div>
              <p className="text-xs text-muted-foreground">
                +19% from last month
              </p>
            </CardContent>
          </Card>
        </ScrollAnimator>
        <ScrollAnimator delay={0.4}>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Now</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">+573</div>
              <p className="text-xs text-muted-foreground">
                +201 since last hour
              </p>
            </CardContent>
          </Card>
        </ScrollAnimator>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <ScrollAnimator className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center">
              <div className="grid gap-2">
                <CardTitle>Users</CardTitle>
                <CardDescription>
                  Recent users that have joined the platform.
                </CardDescription>
              </div>
              <Button asChild size="sm" className="ml-auto gap-1">
                <Link href="/connect">
                  View All
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Joined Date</TableHead>
                    <TableHead>
                      <span className="sr-only">Actions</span>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map(user => (
                      <TableRow key={user.id}>
                          <TableCell>
                              <div className="flex items-center gap-3">
                                  <Avatar className="h-9 w-9">
                                      {user.avatar && <AvatarImage src={user.avatar.imageUrl} alt="Avatar" data-ai-hint={user.avatar.imageHint} />}
                                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="font-medium">{user.name}</div>
                              </div>
                          </TableCell>
                          <TableCell>
                              {user.profile?.email || `user${user.id}@example.com`}
                          </TableCell>
                          <TableCell>
                              2024-07-01
                          </TableCell>
                           <TableCell>
                              <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                  <Button
                                      aria-haspopup="true"
                                      size="icon"
                                      variant="ghost"
                                  >
                                      <MoreHorizontal className="h-4 w-4" />
                                      <span className="sr-only">Toggle menu</span>
                                  </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                  <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                  <DropdownMenuItem onSelect={() => toast({ title: 'Edit action coming soon.' })}>
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onSelect={() => handleDeleteUser(user.id)}
                                    className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                                  >
                                    Delete
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
        </ScrollAnimator>

        <ScrollAnimator>
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-8">
              <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src={initialUsers[1].avatar?.imageUrl} alt="Avatar" />
                  <AvatarFallback>{initialUsers[1].name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {initialUsers[1].name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    posted a new prayer request.
                  </p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">5m ago</div>
              </div>
               <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src={initialUsers[2].avatar?.imageUrl} alt="Avatar" />
                  <AvatarFallback>{initialUsers[2].name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {initialUsers[2].name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    joined the "Kingdom Builders" group.
                  </p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">12m ago</div>
              </div>
               <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src={initialUsers[0].avatar?.imageUrl} alt="Avatar" />
                  <AvatarFallback>{initialUsers[0].name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {initialUsers[0].name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    watched a new live session.
                  </p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">30m ago</div>
              </div>
               <div className="flex items-center gap-4">
                <Avatar className="hidden h-9 w-9 sm:flex">
                  <AvatarImage src={initialUsers[3].avatar?.imageUrl} alt="Avatar" />
                  <AvatarFallback>{initialUsers[3].name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="grid gap-1">
                  <p className="text-sm font-medium leading-none">
                    {initialUsers[3].name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    registered for the "Faith that Moves Mountains" course.
                  </p>
                </div>
                <div className="ml-auto text-sm text-muted-foreground">1h ago</div>
              </div>
            </CardContent>
          </Card>
        </ScrollAnimator>
      </div>
    </div>
  );
}
