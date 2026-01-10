

'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { communityUsers, friends } from '@/lib/data';
import { UserPlus, Users, UserCheck, MessageSquare } from 'lucide-react';
import Link from 'next/link';

export default function ConnectPage() {
  // Filter out the first user to simulate not seeing yourself in the list
  const otherUsers = communityUsers.slice(1);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">Connections</h1>
        <p className="text-muted-foreground">
          Find and connect with other members of the community.
        </p>
      </div>

      <Tabs defaultValue="discover">
        <TabsList className="grid w-full grid-cols-3 md:w-[400px]">
          <TabsTrigger value="discover">
            <Users className="mr-2 h-4 w-4" /> Discover
          </TabsTrigger>
          <TabsTrigger value="friends">
            <UserCheck className="mr-2 h-4 w-4" /> Friends
          </TabsTrigger>
          <TabsTrigger value="requests">
            <UserPlus className="mr-2 h-4 w-4" /> Requests
          </TabsTrigger>
        </TabsList>
        <TabsContent value="discover">
          <Card>
            <CardHeader>
              <CardTitle>Discover Members</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {otherUsers.map((user) => (
                <Card
                  key={user.id}
                  className="flex flex-col items-center p-6 text-center"
                >
                  <Avatar className="h-20 w-20">
                    {user.avatar && <AvatarImage src={user.avatar.imageUrl} alt={user.name} data-ai-hint={user.avatar.imageHint} />}
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h3 className="mt-4 text-lg font-bold text-card-foreground">{user.name}</h3>
                  <p className="text-sm text-black/60">
                    {user.location}
                  </p>
                  <Button className="mt-4 w-full">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Add Friend
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
                            <p className="text-sm text-black/60">{user.location}</p>
                        </div>
                    </div>
                     <Button className="mt-4 w-full" asChild>
                        <Link href="/chat">
                            <MessageSquare className="mr-2 h-4 w-4" />
                            Message
                        </Link>
                      </Button>
                  </Card>
                ))
              ) : (
                <p className="text-black/60">
                  You haven&apos;t added any friends yet.
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
            <CardContent>
              <p className="text-black/60">
                No new friend requests.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
