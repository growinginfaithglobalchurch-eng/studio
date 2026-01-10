
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Feather } from 'lucide-react';

export default function EagleRoomPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
            <Feather className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">Eagle Room</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          The command center for the Eagles Tribe, rulers of the Air Forces.
        </p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Welcome, Eagle</CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-muted-foreground">This is where you receive specific assignments related to atmospheric cleansing, breaking mental strongholds, and prophetic declaration. Stay alert and await your orders.</p>
        </CardContent>
      </Card>
    </div>
  );
}
