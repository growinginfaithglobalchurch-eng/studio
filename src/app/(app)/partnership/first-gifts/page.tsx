'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Gift, Book, Award, CheckCircle } from 'lucide-react';
import { ScrollAnimator } from '@/components/scroll-animator';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Image from 'next/image';
import Link from 'next/link';

const gifts = [
    {
        title: "Welcome Partner Kit",
        description: "A specially curated kit including a welcome letter from our founders and exclusive ministry resources to start your journey with us.",
        image: PlaceHolderImages.find(p => p.id === 'partner-kit'),
    },
    {
        title: "Exclusive E-Book: \"The Heart of a Partner\"",
        description: "Receive a digital copy of this exclusive e-book by Joseph Tryson, written specially for our covenant partners to deepen your understanding of partnership.",
        image: PlaceHolderImages.find(p => p.id === 'ebook-cover'),
    },
    {
        title: "Official Partner Certificate & Pin",
        description: "A beautifully designed lapel pin and a printable certificate to signify your official partnership and covenant connection with us.",
        image: PlaceHolderImages.find(p => p.id === 'partner-pin'),
    }
];

export default function PartnerGiftsPage() {
  return (
    <div className="space-y-8">
      <ScrollAnimator>
        <div>
          <div className="flex items-center gap-3 mb-2">
              <Gift className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-headline font-bold text-foreground">First Gifts for Our Partners</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            As a heartfelt thank you for your commitment, every new partner receives a special welcome gift.
          </p>
        </div>
      </ScrollAnimator>

      <ScrollAnimator>
        <Card className="bg-gradient-to-r from-primary/10 to-transparent">
          <CardHeader>
              <CardTitle className="font-headline text-xl text-foreground">A Token of Our Gratitude</CardTitle>
          </CardHeader>
          <CardContent>
              <p className="text-muted-foreground">
                  Your partnership is a sacred covenant with us and with the work God is doing through this ministry. These initial gifts are a small token of our immense appreciation for your decision to stand with us. We are honored to have you as part of the family.
              </p>
          </CardContent>
        </Card>
      </ScrollAnimator>
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {gifts.map((gift, index) => (
              <ScrollAnimator key={gift.title} delay={index * 0.1}>
                  <Card className="flex flex-col h-full">
                      {gift.image && (
                          <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                              <Image src={gift.image.imageUrl} alt={gift.title} fill className="object-cover" data-ai-hint={gift.image.imageHint} />
                          </div>
                      )}
                      <CardHeader>
                          <CardTitle className="font-headline">{gift.title}</CardTitle>
                      </CardHeader>
                      <CardContent className="flex-grow">
                          <p className="text-muted-foreground">{gift.description}</p>
                      </CardContent>
                  </Card>
              </ScrollAnimator>
          ))}
      </div>

      <ScrollAnimator>
        <Card className="text-center p-8 bg-secondary/30">
            <CardTitle className="font-headline text-2xl">Ready to Partner With Us?</CardTitle>
            <CardDescription className="mt-2 mb-6 max-w-xl mx-auto">
                Become a partner today to join us in our mission and receive your welcome gifts.
            </CardDescription>
            <Button size="lg" asChild>
                <Link href="/partnership/join">Become a Partner</Link>
            </Button>
        </Card>
      </ScrollAnimator>
    </div>
  );
}
