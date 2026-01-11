
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { communityUsers } from '@/lib/data';
import { Bell, MessageSquare, UserPlus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ScrollAnimator } from '@/components/scroll-animator';

const notifications = [
    {
        id: 1,
        type: 'new_message',
        user: communityUsers[1],
        content: 'sent you a new message.',
        timestamp: '2 hours ago',
        href: '/chat'
    },
    {
        id: 2,
        type: 'friend_request',
        user: communityUsers[3],
        content: 'sent you a friend request.',
        timestamp: '5 hours ago',
        href: '/connect'
    },
     {
        id: 3,
        type: 'new_message',
        user: communityUsers[2],
        content: 'replied to your message.',
        timestamp: '1 day ago',
        href: '/chat'
    },
];

const iconMap = {
    new_message: <MessageSquare className="h-5 w-5 text-accent" />,
    friend_request: <UserPlus className="h-5 w-5 text-accent" />,
};

export default function NotificationsPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <ScrollAnimator>
        <div>
          <div className="flex items-center gap-3 mb-2">
              <Bell className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-headline font-bold text-foreground">Notifications</h1>
          </div>
          <p className="text-muted-foreground">
            Recent activity from your community.
          </p>
        </div>
      </ScrollAnimator>

      <ScrollAnimator>
        <Card>
            <CardHeader>
                <CardTitle>Recent Notifications</CardTitle>
            </CardHeader>
            <CardContent>
                {notifications.length > 0 ? (
                  <div className="space-y-4">
                      {notifications.map(notification => (
                          <div key={notification.id} className="flex items-center gap-4 p-3 rounded-lg hover:bg-secondary transition-colors">
                              {iconMap[notification.type as keyof typeof iconMap]}
                              <Avatar className="h-10 w-10">
                                  {notification.user.avatar && <AvatarImage src={notification.user.avatar.imageUrl} alt={notification.user.name} />}
                                  <AvatarFallback>{notification.user.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div className="flex-grow">
                                  <p className="text-sm">
                                      <span className="font-semibold text-foreground">{notification.user.name}</span>
                                      <span className="text-muted-foreground"> {notification.content}</span>
                                  </p>
                                  <p className="text-xs text-muted-foreground mt-1">{notification.timestamp}</p>
                              </div>
                              <Button asChild variant="ghost">
                                  <Link href={notification.href}>View</Link>
                              </Button>
                          </div>
                      ))}
                  </div>
                ) : (
                  <div className="text-center py-10">
                      <p className="text-muted-foreground">You have no new notifications.</p>
                  </div>
                )}
            </CardContent>
        </Card>
      </ScrollAnimator>
    </div>
  );
}
