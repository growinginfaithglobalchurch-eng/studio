

'use client';

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { groups as initialGroups, communityUsers } from '@/lib/data';
import { UserPlus, Users, Search, PlusCircle, CheckCircle } from 'lucide-react';
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function GroupsPage() {
  const [groups, setGroups] = useState(initialGroups);
  const { toast } = useToast();

  const handleJoinGroup = (groupId: number) => {
    setGroups(prev => prev.map(g => 
        g.id === groupId ? { ...g, isMember: !g.isMember } : g
    ));

    const group = groups.find(g => g.id === groupId);
    if (!group) return;

    const isJoining = !group.isMember;

    toast({
        title: isJoining ? "Group Joined!" : "Left Group",
        description: isJoining 
          ? `You have successfully joined the "${group.name}" group.`
          : `You have left the "${group.name}" group.`
    });
  };

  const handleCreateGroup = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const title = formData.get('title') as string;
    
    // In a real app, you would also handle file uploads and create a new group object
    toast({
        title: "Group Created!",
        description: `Your new group "${title}" has been created and is pending review.`,
    });
    // In a real app, you'd reset form state
  };

  const myGroups = groups.filter(g => g.isMember);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">Groups</h1>
        <p className="text-muted-foreground">
          Find your community and grow together.
        </p>
      </div>

      <Tabs defaultValue="discover">
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="discover">
            <Search className="mr-2 h-4 w-4" /> Discover
          </TabsTrigger>
          <TabsTrigger value="my-groups">
            <Users className="mr-2 h-4 w-4" /> My Groups ({myGroups.length})
          </TabsTrigger>
          <TabsTrigger value="create">
            <PlusCircle className="mr-2 h-4 w-4" /> Create
          </TabsTrigger>
        </TabsList>

        <TabsContent value="discover">
          <Card>
            <CardHeader>
              <CardTitle>Discover Groups</CardTitle>
              <CardDescription>Browse groups and find your place to connect.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {groups.map((group) => (
                <Card key={group.id} className="flex flex-col">
                    {group.image && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                            <Image src={group.image.imageUrl} alt={group.name} fill className="object-cover" data-ai-hint={group.image.imageHint} />
                        </div>
                    )}
                  <CardHeader>
                    <CardTitle className="font-headline">{group.name}</CardTitle>
                    <CardDescription>{group.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-4">
                    <div className="flex items-center space-x-2">
                        <div className="flex -space-x-2 overflow-hidden">
                            {communityUsers.slice(0, 3).map(user => (
                                user.avatar && <Avatar key={user.id} className="inline-block h-6 w-6 rounded-full border-2 border-card">
                                    <AvatarImage src={user.avatar.imageUrl} />
                                    <AvatarFallback>{user.name[0]}</AvatarFallback>
                                </Avatar>
                            ))}
                        </div>
                        <span className="text-xs text-muted-foreground">{group.members} members</span>
                    </div>
                  </CardContent>
                  <div className="p-6 pt-0">
                     <Button className="w-full" onClick={() => handleJoinGroup(group.id)} variant={group.isMember ? 'secondary' : 'default'}>
                        {group.isMember ? <CheckCircle className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />}
                        {group.isMember ? 'Joined' : 'Join Group'}
                      </Button>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="my-groups">
          <Card>
            <CardHeader>
              <CardTitle>My Groups</CardTitle>
              <CardDescription>The communities you are a part of.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2">
              {myGroups.length > 0 ? (
                myGroups.map((group) => (
                  <Card key={group.id} className="flex flex-col">
                    {group.image && (
                        <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                            <Image src={group.image.imageUrl} alt={group.name} fill className="object-cover" data-ai-hint={group.image.imageHint} />
                        </div>
                    )}
                    <CardHeader>
                        <CardTitle className="font-headline">{group.name}</CardTitle>
                    </CardHeader>
                     <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground line-clamp-2">{group.description}</p>
                     </CardContent>
                     <div className="p-6 pt-0">
                         <Button variant="outline" className="w-full text-white">View Group</Button>
                     </div>
                  </Card>
                ))
              ) : (
                <p className="text-muted-foreground">
                  You haven't joined any groups yet.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="create">
            <Card>
                <CardHeader>
                    <CardTitle>Create a New Group</CardTitle>
                    <CardDescription>Start your own community and gather with like-minded believers.</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleCreateGroup} className="space-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Group Name</Label>
                            <Input id="title" name="title" placeholder="e.g., Morning Prayer Warriors" required />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="description">Group Description</Label>
                            <Textarea id="description" name="description" placeholder="What is this group about?" required />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Input id="category" name="category" placeholder="e.g., Bible Study, Men's Group, etc." required />
                        </div>
                        <div className="space-y-2">
                             <Label htmlFor="cover-image">Cover Image</Label>
                             <Input id="cover-image" type="file" />
                        </div>
                        <Button type="submit">
                           <PlusCircle className="mr-2 h-4 w-4" />
                           Create Group
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
