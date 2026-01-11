
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Church } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function SignupPage() {
  const bgImage = PlaceHolderImages.find(p => p.id === 'hero');

  return (
    <div className="relative flex min-h-screen items-center justify-center">
      {bgImage && (
        <Image
          src={bgImage.imageUrl}
          alt="Worshipping congregation"
          fill
          className="object-cover -z-10"
          data-ai-hint={bgImage.imageHint}
        />
      )}
      <div className="absolute inset-0 bg-black/50 -z-10" />
      <Card className="mx-auto w-full max-w-sm bg-card/90 backdrop-blur-sm">
        <CardHeader className="text-center">
           <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <Church className="h-8 w-8 text-accent" />
            <span className="text-xl font-headline font-bold">
              Faith Connect Global
            </span>
          </Link>
          <CardTitle className="text-2xl font-headline font-bold">Join the Community</CardTitle>
          <CardDescription>Enter your information to create an account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="full-name">Full Name</Label>
              <Input id="full-name" placeholder="John Doe" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" />
            </div>
            <Button type="submit" className="w-full" asChild>
                <Link href="/welcome">Create an account</Link>
            </Button>
            <Button variant="outline" className="w-full">
              Sign up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
