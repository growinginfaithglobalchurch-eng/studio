
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ministries } from '@/lib/data';

export default function MinistriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-headline font-bold">Partner Ministries</h1>
        <p className="text-muted-foreground">
          Discover and connect with churches and ministries from around the globe.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {ministries.map((ministry) => (
          <Card key={ministry.id} className="text-center">
            <CardHeader className="items-center">
              {ministry.logo && (
                <div className="relative h-24 w-24 overflow-hidden rounded-full border-4 border-card">
                  <Image
                    src={ministry.logo.imageUrl}
                    alt={`${ministry.name} logo`}
                    fill
                    className="object-contain"
                    data-ai-hint={ministry.logo.imageHint}
                  />
                </div>
              )}
              <CardTitle className="font-headline text-xl font-bold pt-4">{ministry.name}</CardTitle>
            </CardHeader>
            <CardContent className="min-h-[80px]">
              <p className="text-sm text-muted-foreground">{ministry.description}</p>
            </CardContent>
            <div className="p-6 pt-0">
              <Button>Learn More</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
