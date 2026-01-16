
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Globe, HeartHandshake, Shield, User, Star } from 'lucide-react';
import { ScrollAnimator } from '@/components/scroll-animator';
import Link from 'next/link';

const commitments = [
    {
        icon: <HeartHandshake className="h-6 w-6 text-accent" />,
        title: "Covenant Prayer",
        description: "Commit to consistent, strategic prayer for the ministry, its leaders, and its global initiatives. Kingdom Expanders form the spiritual frontline."
    },
    {
        icon: <Shield className="h-6 w-6 text-accent" />,
        title: "Faithful Giving",
        description: "Provide foundational financial support through significant, regular giving that fuels global outreach, media expansion, and new projects."
    },
    {
        icon: <User className="h-6 w-6 text-accent" />,
        title: "Active Ambassadorship",
        description: "Represent the vision and values of the ministry in your sphere of influence, helping to build community and extend our reach."
    }
];

export default function KingdomExpandersPage() {
  return (
    <div className="space-y-8">
      <ScrollAnimator>
        <div>
          <div className="flex items-center gap-3 mb-2">
              <Globe className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-headline font-bold text-foreground">Become a Kingdom Expander</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            Join the core team of covenant partners fueling the global mandate of Faith Connect Global.
          </p>
        </div>
      </ScrollAnimator>

      <ScrollAnimator>
        <Card className="bg-gradient-to-r from-primary/10 to-transparent">
          <CardHeader>
              <CardTitle className="font-headline text-xl text-foreground">What is a Kingdom Expander?</CardTitle>
          </CardHeader>
          <CardContent>
              <p className="text-muted-foreground">
                  Kingdom Expanders are more than partners; they are pillars. They are a dedicated group of individuals, families, and organizations who are deeply committed to the vision of taking the Gospel to the nations through this ministry. By providing substantial spiritual and financial support, they form the bedrock upon which our global expansion is built.
              </p>
          </CardContent>
        </Card>
      </ScrollAnimator>

      <ScrollAnimator>
        <div>
          <h2 className="text-2xl font-headline font-bold mb-4 text-center">The Threefold Commitment</h2>
          <div className="grid gap-6 md:grid-cols-3">
              {commitments.map((commitment, index) => (
                  <ScrollAnimator key={commitment.title} delay={index * 0.1}>
                    <Card className="text-center flex flex-col items-center p-6 h-full">
                        <div className="bg-muted rounded-full p-4">
                            {commitment.icon}
                        </div>
                        <CardHeader className="p-2">
                            <CardTitle>{commitment.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-muted-foreground">{commitment.description}</p>
                        </CardContent>
                    </Card>
                  </ScrollAnimator>
              ))}
          </div>
        </div>
      </ScrollAnimator>

      <ScrollAnimator>
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2"><Star className="h-5 w-5 text-accent" />Benefits of Being a Kingdom Expander</CardTitle>
                <CardDescription>As a core partner, you gain access to a deeper level of connection and involvement.</CardDescription>
            </CardHeader>
            <CardContent>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Exclusive monthly video briefings from our founders.</li>
                    <li>Priority access to special events and leadership meetings.</li>
                    <li>Direct input and feedback channels for ministry strategy.</li>
                    <li>A dedicated community group for Kingdom Expanders.</li>
                </ul>
            </CardContent>
        </Card>
      </ScrollAnimator>

       <ScrollAnimator>
        <Card className="text-center p-8 bg-secondary/30">
            <CardTitle className="font-headline text-2xl">Ready to Build With Us?</CardTitle>
            <CardDescription className="mt-2 mb-6 max-w-xl mx-auto">
                If you are ready to make a significant commitment to advancing the Kingdom through this ministry, we invite you to apply to become a Kingdom Expander.
            </CardDescription>
            <Button size="lg" asChild>
                <Link href="/partnership/join">Apply to be a Kingdom Expander</Link>
            </Button>
        </Card>
      </ScrollAnimator>
    </div>
  );
}
