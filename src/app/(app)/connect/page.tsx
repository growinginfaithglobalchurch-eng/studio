import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { communityUsers } from '@/lib/data';
import { Plus } from 'lucide-react';

export default function ConnectPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl tracking-tight font-headline">Connect with the Community</h1>
        <p className="text-muted-foreground">
          Find and build relationships with believers from across the world.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {communityUsers.map((user) => (
          <Card key={user.id}>
            <CardContent className="flex flex-col items-center p-6 text-center">
               {user.avatar && (
                  <Avatar className="h-24 w-24 border-4 border-card">
                     <AvatarImage src={user.avatar.imageUrl} alt={user.name} data-ai-hint={user.avatar.imageHint} />
                     <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
               )}
              <h3 className="mt-4 text-lg font-semibold">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.location}</p>
              <Button className="mt-4 w-full" variant="outline">
                <Plus className="mr-2 h-4 w-4" />
                Connect
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
