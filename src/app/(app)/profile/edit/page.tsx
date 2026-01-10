
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Camera, UserCircle } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function EditProfilePage() {
  const router = useRouter();
  const { toast } = useToast();
  
  // In a real app, you would fetch the current user's data
  const [name, setName] = useState('Joseph');
  const [email, setEmail] = useState('joseph@faithconnect.com');
  const [location, setLocation] = useState('New York, USA');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(PlaceHolderImages.find(p => p.id === 'avatar-1')?.imageUrl || null);
  
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
      description: 'Your profile has been successfully updated.',
    });
    router.push('/profile');
  };

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-2xl font-headline flex items-center gap-2">
                <UserCircle className="h-6 w-6 text-accent"/>
                Edit Your Profile
            </CardTitle>
            <CardDescription>
              Update your personal information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <div className="relative">
                <Avatar className="h-24 w-24 border-4 border-accent">
                    {avatarPreview ? (
                        <AvatarImage src={avatarPreview} alt={name} />
                    ) : (
                        <AvatarFallback>{name ? name.charAt(0) : 'U'}</AvatarFallback>
                    )}
                </Avatar>
                <label htmlFor="avatar-upload" className="absolute -bottom-1 -right-1 bg-card rounded-full p-1 cursor-pointer hover:bg-muted border border-border">
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
                required
              />
            </div>
             <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
          <CardFooter className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="submit">Save Changes</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
