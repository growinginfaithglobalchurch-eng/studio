'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function ProfileSetupPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [name, setName] = useState('Joseph');
  const [location, setLocation] = useState('New York, USA');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(PlaceHolderImages.find(p => p.id === 'avatar-1')?.imageUrl || null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast({
        variant: 'destructive',
        title: 'Name is required',
        description: 'Please enter your name to continue.',
      });
      return;
    }
    toast({
      title: 'Profile Updated!',
      description: 'Your profile has been successfully set up.',
    });
    router.push('/dashboard');
  };
  
   const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-secondary p-4">
      <Card className="w-full max-w-lg">
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl font-headline">Set Up Your Profile</CardTitle>
            <CardDescription>
              Let's get your profile ready so you can connect with the community.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-accent">
                    {avatarPreview && <AvatarImage src={avatarPreview} alt={name} />}
                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                </Avatar>
                <label htmlFor="avatar-upload" className="absolute -bottom-1 -right-1 bg-card rounded-full p-1 cursor-pointer hover:bg-muted">
                    <Camera className="h-5 w-5 text-primary"/>
                    <input id="avatar-upload" type="file" className="hidden" onChange={handleAvatarChange} accept="image/*" />
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., John Doe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g., London, UK"
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Complete Profile
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
