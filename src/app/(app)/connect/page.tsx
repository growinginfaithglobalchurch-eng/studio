
'use client';

import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { communityUsers as initialUsers } from '@/lib/data';
import { UserPlus, Users, UserCheck, MessageSquare, UserMinus, Check, UserX } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { User } from '@/lib/types';
import { cn } from '@/lib/utils';

type UserWithRequest = User & { friendRequestSent?: boolean };

export default function ConnectPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<UserWithRequest[]>(initialUsers.map(u => ({...u, isFriendRequest: false, friendRequestSent: false})));
  const [friendRequests, setFriendRequests] = useState<User[]>([
      { ...initialUsers[3], isFriendRequest: true },
      { ...initialUsers[5], isFriendRequest: true },
  ]);

  const handleFriendAction = (user: UserWithRequest) => {
    if (user.isFriend) {
      // Remove friend
      setUsers(prev => prev.map(u => u.id === user.id ? { ...u, isFriend: false } : u));
      toast({
        title: 'Friend Removed',
        description: `${user.name} has been removed from your friends list.`,
      });
    } else {
      // Send friend request
       setUsers(prev => prev.map(u => u.id === user.id ? { ...u, friendRequestSent: true } : u));
      toast({
        title: 'Friend Request Sent!',
        description: `Your friend request to ${user.name} has been sent.`,
      });
    }
  };
  
  const handleRequestAction = (requestingUser: User, action: 'accept' | 'decline') => {
      setFriendRequests(prev => prev.filter(u => u.id !== requestingUser.id));
      if (action === 'accept') {
          setUsers(prev => prev.map(u => u.id === requestingUser.id ? { ...u, isFriend: true, friendRequestSent: false } : u));
          toast({
              title: 'Friend Request Accepted',
              description: `You are now friends with ${requestingUser.name}.`,
          });
      } else {
           toast({
              title: 'Friend Request Declined',
              description: `You have declined ${requestingUser.name}'s friend request.`,
              variant: 'destructive'
          });
      }
  };

  const friends = users.filter(u => u.isFriend);
  // Simulating not seeing yourself
  const discoverableUsers = users.filter(u => u.id !== 1);

  const getButtonState = (user: UserWithRequest) => {
    if (user.isFriend) {
        return {
            text: "Remove Friend",
            variant: "secondary" as const,
            icon: <UserMinus className="mr-2 h-4 w-4" />,
            disabled: false,
        }
    }
    if (user.friendRequestSent) {
         return {
            text: "Request Sent",
            variant: "outline" as const,
            icon: <Check className="mr-2 h-4 w-4" />,
            disabled: true,
        }
    }
    return {
        text: "Add Friend",
        variant: "default" as const,
        icon: <UserPlus className="mr-2 h-4 w-4" />,
        disabled: false,
    }
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">Connections</h1>
        <p className="text-muted-foreground">
          Find and connect with other members of the community.
        </p>
      </div>

      <Tabs defaultValue="discover">
        <TabsList className="grid w-full grid-cols-3 md:w-[600px]">
          <TabsTrigger value="discover">
            <Users className="mr-2 h-4 w-4" /> Discover
          </TabsTrigger>
          <TabsTrigger value="friends">
            <UserCheck className="mr-2 h-4 w-4" /> Friends ({friends.length})
          </TabsTrigger>
          <TabsTrigger value="requests">
            <UserPlus className="mr-2 h-4 w-4" /> Requests ({friendRequests.length})
          </TabsTrigger>
        </TabsList>
        <TabsContent value="discover">
          <Card>
            <CardHeader>
              <CardTitle>Discover Members</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {discoverableUsers.map((user) => {
                const buttonState = getButtonState(user);
                return (
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
                        variant={buttonState.variant}
                        disabled={buttonState.disabled}
                      >
                        {buttonState.icon}
                        {buttonState.text}
                      </Button>
                    </Card>
                )
            })}
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
                  You haven't added any friends yet.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
         <TabsContent value="requests">
          <Card>
            <CardHeader>
              <CardTitle>Friend Requests</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {friendRequests.length > 0 ? (
                friendRequests.map((user) => (
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
                        <Button className="flex-1" onClick={() => handleRequestAction(user, 'accept')}>
                            <UserCheck className="mr-2 h-4 w-4" />
                            Accept
                        </Button>
                         <Button className="flex-1" variant="destructive" onClick={() => handleRequestAction(user, 'decline')}>
                            <UserX className="mr-2 h-4 w-4" />
                            Decline
                        </Button>
                     </div>
                  </Card>
                ))
              ) : (
                <p className="text-muted-foreground">
                  You have no new friend requests.
                </p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
