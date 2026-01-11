
'use client';

import React from 'react';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Shield, Send, CheckCircle, Gift } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { communityUsers } from '@/lib/data';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';

const guidedPrayerPoints = [
    "Father, I come boldly to Your throne of grace, not on my merit, but by the blood of Jesus.",
    "I plead for mercy for my shortcomings, my family's errors, and the transgressions of my nation.",
    "Lord, release Your grace to help me in my time of need. Strengthen me where I am weak.",
    "I receive Your mercy that triumphs over judgment and Your grace that empowers me to overcome.",
];

const benefitsOfMercy = [
    { title: "Divine Justification", text: "Who can bring a charge against you? It is God who justifies." },
    { title: "Freedom from Condemnation", text: "Who can condemn? Christ Jesus died, rose, and now intercedes for you." },
    { title: "Inseparable Love", text: "Nothing—no trial, no power, no created thing—can separate you from the love of God in Christ." },
    { title: "More Than Conquerors", text: "In all hardships, you are overwhelmingly victorious through Him who loved you." },
];

type MercyPetition = {
    id: number;
    user: string;
    avatar?: string;
    petition: string;
    timestamp: string;
}

const initialPetitions: MercyPetition[] = [
    {
        id: 1,
        user: 'David R.',
        avatar: communityUsers.find(u => u.id === 1)?.avatar?.imageUrl,
        petition: 'Pleading for mercy over a difficult family situation and grace to walk in forgiveness.',
        timestamp: '1 hour ago'
    },
    {
        id: 2,
        user: 'Anonymous',
        petition: 'Asking for grace and strength to overcome a persistent personal struggle.',
        timestamp: '3 hours ago'
    }
];

export default function MercyCityPage() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [petition, setPetition] = useState('');
  const [petitions, setPetitions] = useState<MercyPetition[]>(initialPetitions);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!petition.trim()) {
      toast({
        variant: 'destructive',
        title: 'Empty Petition',
        description: 'Please write your petition before submitting.',
      });
      return;
    }
    
    const newPetition: MercyPetition = {
      id: petitions.length + 1,
      user: name.trim() || 'Anonymous',
      avatar: name.trim() ? communityUsers.find(u => u.id === 2)?.avatar?.imageUrl : undefined,
      petition,
      timestamp: 'Just now',
    };

    setPetitions(prev => [newPetition, ...prev]);
    setName('');
    setPetition('');

    toast({
      title: 'Petition Submitted',
      description: 'Your plea for mercy has been laid at the altar.',
    });
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">Mercy City</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          An altar to access the Throne of Grace, pleading for mercy and finding grace in times of trouble.
        </p>
      </div>

      <Card className="bg-card">
        <CardHeader>
          <CardTitle className="font-headline text-xl text-foreground">The Throne of Grace</CardTitle>
        </CardHeader>
        <CardContent>
          <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground">
            "Let us then with confidence draw near to the throne of grace, that we may receive mercy and find grace to help in time of need."
          </blockquote>
          <p className="text-right text-sm text-foreground mt-2">- Hebrews 4:16</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-xl text-foreground"><Gift className="h-5 w-5 text-accent" />The Benefits of Mercy & Grace</CardTitle>
            <CardDescription>Based on Romans 8:29-39, when you approach the throne of grace, you receive:</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
            {benefitsOfMercy.map(benefit => (
                 <div key={benefit.title} className="p-3 rounded-lg border bg-secondary/50">
                    <h3 className="font-bold text-foreground">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{benefit.text}</p>
                </div>
            ))}
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Submit Your Petition for Mercy</CardTitle>
                    <CardDescription>Lay your case at the altar. Your petitions are held in confidence and prayer.</CardDescription>
                </CardHeader>
                <CardContent>
                     <form onSubmit={handleSubmit} className="space-y-4">
                        <Input
                            placeholder="Your Name (Optional)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <Textarea
                            placeholder="Type your petition for mercy and grace here..."
                            className="min-h-[120px]"
                            value={petition}
                            onChange={(e) => setPetition(e.target.value)}
                        />
                        <Button type="submit" className="w-full">
                            <Send className="mr-2 h-4 w-4" />
                            Lay at the Altar
                        </Button>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Guided Prayers for Mercy</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {guidedPrayerPoints.map((point) => (
                            <li key={point} className="flex items-start gap-3">
                                <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                                <span className="text-muted-foreground">{point}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
        </div>
        
        <Card>
            <CardHeader>
                <CardTitle>The Mercy Wall</CardTitle>
                <CardDescription>Petitions laid before the throne.</CardDescription>
            </CardHeader>
            <CardContent>
                 <ScrollArea className="h-[500px]">
                    <div className="space-y-4">
                    {petitions.map((p, index) => (
                        <React.Fragment key={p.id}>
                            <div className="flex gap-4">
                                <Avatar>
                                    {p.avatar && <AvatarImage src={p.avatar} />}
                                    <AvatarFallback>{p.user.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-center">
                                        <p className="font-semibold text-foreground">{p.user}</p>
                                        <p className="text-xs text-muted-foreground">{p.timestamp}</p>
                                    </div>
                                    <p className="text-sm text-muted-foreground mt-1">{p.petition}</p>
                                </div>
                            </div>
                            {index < petitions.length - 1 && <Separator className="my-4"/>}
                        </React.Fragment>
                    ))}
                    </div>
                 </ScrollArea>
            </CardContent>
        </Card>
      </div>

    </div>
  );
}
