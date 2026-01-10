

'use client';

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { communityUsers as initialUsers } from '@/lib/data';
import { UserPlus, Users, UserCheck, MessageSquare, UserMinus, Check } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function ConnectPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>(initialUsers);

  const handleFriendAction = (user: User) => {
    if (user.isFriend) {
      // Remove friend
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, isFriend: false } : u));
      toast({
        title: 'Friend Removed',
        description: `${user.name} has been removed from your friends list.`,
      });
    } else {
      // Add friend
       setUsers(prev => prev.map(u => u.id === user.id ? { ...u, isFriend: true } : u));
      toast({
        title: 'Friend Added!',
        description: `You are now friends with ${user.name}.`,
      });
    }
  };

  const friends = users.filter(u => u.isFriend);
  // Simulating not seeing yourself
  const discoverableUsers = users.filter(u => u.id !== 1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">Connections</h1>
        <p className="text-muted-foreground">
          Find and connect with other members of the community.
        </p>
      </div>

      <Tabs defaultValue="discover">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="discover">
            <Users className="mr-2 h-4 w-4" /> Discover
          </TabsTrigger>
          <TabsTrigger value="friends">
            <UserCheck className="mr-2 h-4 w-4" /> Friends ({friends.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="discover">
          <Card>
            <CardHeader>
              <CardTitle>Discover Members</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {discoverableUsers.map((user) => (
                <Card
                  key={user.id}
                  className="flex flex-col items-center p-6 text-center"
                >
                  <Avatar className="h-20 w-20">
                    {user.avatar && <AvatarImage src={user.avatar.imageUrl} alt={user.name} data-ai-hint={user.avatar.imageHint} />}
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 text-lg font-bold text-card-foreground">{user.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {user.location}
                  </p>
                   <Button 
                    className="mt-4 w-full" 
                    onClick={() => handleFriendAction(user)}
                    variant={user.isFriend ? 'secondary' : 'default'}
                  >
                    {user.isFriend ? <UserMinus className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />}
                    {user.isFriend ? 'Remove Friend' : 'Add Friend'}
                  </Button>
                </Card>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="friends">
          <Card>
            <CardHeader>
              <CardTitle>Your Friends</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {friends.length > 0 ? (
                friends.map((user) => (
                  <Card key={user.id} className="p-4">
                    <div className="flex items-center gap-4">
                        <Avatar>
                           {user.avatar && <AvatarImage src={user.avatar.imageUrl} alt={user.name} data-ai-hint={user.avatar.imageHint} />}
                           <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold text-card-foreground">{user.name}</h3>
                            <p className="text-sm text-muted-foreground">{user.location}</p>
                        </div>
                    </div>
                     <div className="flex gap-2 mt-4">
                        <Button className="flex-1" asChild>
                            <Link href="/chat">
                                <MessageSquare className="mr-2 h-4 w-4" />
                                Message
                            </Link>
                        </Button>
                         <Button className="flex-1" variant="destructive" onClick={() => handleFriendAction(user)}>
                            <UserMinus className="mr-2 h-4 w-4" />
                            Unfriend
                        </Button>
                     </div>
                  </Card>
                ))
              ) : (
                <p className="text-muted-foreground">
                  You haven&apos;t added any friends yet.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
