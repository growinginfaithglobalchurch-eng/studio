
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ministries } from '@/lib/data';
import { HandHelping, Briefcase } from 'lucide-react';
import Link from 'next/link';

const opportunities = [
  {
    icon: <Briefcase className="h-6 w-6 text-accent" />,
    title: 'Discover Your Gifts & Calling',
    description: 'Take assessments and get guidance to understand how God has uniquely wired you for impact.',
    cta: 'Start Discovery',
    href: '/spiritual-gifts-assessment',
  },
  {
    icon: <Briefcase className="h-6 w-6 text-accent" />,
    title: 'Evangelism & Outreach Teams',
    description: 'Join local and global teams to share the Gospel and demonstrate God\'s love in practical ways.',
    cta: 'Join a Team',
    href: '/departments',
  },
];

export default function MinistriesPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
            <HandHelping className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">
              Ministry & Assignment Activation
            </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Helping believers move from learning to living out their divine purpose.
        </p>
      </div>

       <div className="grid gap-6 md:grid-cols-2">
           {opportunities.map((item) => (
             <Card key={item.title}>
                <CardHeader className="flex flex-row items-start gap-4">
                    {item.icon}
                    <div>
                        <CardTitle>{item.title}</CardTitle>
                        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    </div>
                </CardHeader>
                <CardContent>
                  <Button asChild variant="outline" className="text-white">
                    <Link href={item.href}>{item.cta}</Link>
                  </Button>
                </CardContent>
             </Card>
           ))}
       </div>

        <Card>
            <CardHeader className="flex flex-row items-center gap-4">
                <Briefcase className="h-8 w-8 text-accent" />
                <div>
                    <CardTitle>Church & Ministry Integration</CardTitle>
                    <CardDescription>
                        We invite churches and other ministries to partner with us to advance the Kingdom. Let's collaborate on projects, events, and initiatives that bring transformation.
                    </CardDescription>
                </div>
            </CardHeader>
            <CardContent>
                <Button variant="outline" asChild className="text-white">
                    <Link href="/contact">Contact Us for Partnership</Link>
                </Button>
            </CardContent>
        </Card>

      <div>
        <h2 className="text-2xl font-headline font-bold mb-4">Ministry Opportunities</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ministries.map((ministry) => (
            <Card key={ministry.id} className="text-center flex flex-col">
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
                <CardContent className="flex-grow">
                <p className="text-sm text-muted-foreground">{ministry.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild className="text-white">
                    <Link href="/signup">Get Involved</Link>
                  </Button>
                </div>
            </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
