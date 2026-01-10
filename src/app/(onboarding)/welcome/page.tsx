

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ChevronRight } from 'lucide-react';

export default function WelcomePage() {
  const welcomeImage = PlaceHolderImages.find(p => p.id === 'welcome-onboarding');

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4">
      <Card className="w-full max-w-lg text-center overflow-hidden">
        {welcomeImage && (
            <div className="relative h-64 w-full">
                <Image 
                    src={welcomeImage.imageUrl} 
                    alt="Welcome" 
                    fill
                    className="object-cover" 
                    data-ai-hint={welcomeImage.imageHint}
                />
            </div>
        )}
        <CardContent className="p-8">
          <h1 className="text-3xl font-headline font-bold text-foreground">Welcome to Faith Connect Global!</h1>
          <p className="mt-4 text-muted-foreground">
            You are not just joining a platform; you are stepping into a global family. Here, your identity in Christ is celebrated, your purpose is nurtured, and you belong.
          </p>
          <div className="mt-8">
            <Button asChild size="lg">
              <Link href="/profile-setup">
                Begin Your Journey <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
