

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Church } from 'lucide-react';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader className="text-center">
           <Link href="/" className="flex items-center justify-center gap-2 mb-4">
            <Church className="h-8 w-8 text-accent" />
            <span className="text-xl font-headline font-bold">
              Faith Connect Global
            </span>
          </Link>
          <CardTitle className="text-2xl font-headline font-bold">Welcome Back</CardTitle>
          <CardDescription>Enter your email below to login to your account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="m@example.com" required className="text-white" />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required className="text-white" />
            </div>
            <Button type="submit" className="w-full" asChild>
                <Link href="/dashboard">Login</Link>
            </Button>
            <Button variant="outline" className="w-full text-foreground">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
