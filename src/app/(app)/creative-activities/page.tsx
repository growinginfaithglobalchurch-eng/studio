'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Palette, Download } from 'lucide-react';
import { creativeActivities } from '@/lib/data';
import { useToast } from '@/hooks/use-toast';
import { ScrollAnimator } from '@/components/scroll-animator';
import Image from 'next/image';

export default function CreativeActivitiesPage() {
    const { toast } = useToast();

    const handleDownload = (activity: typeof creativeActivities[0]) => {
        const activityHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${activity.title}</title>
                <style>
                    @page { size: A4 portrait; margin: 1in; }
                    body { font-family: sans-serif; }
                    h1 { text-align: center; font-size: 24px; margin-bottom: 20px; }
                    p { text-align: center; font-size: 16px; color: #555; }
                    img { max-width: 100%; height: auto; display: block; margin: 40px auto; border: 1px solid #ccc; padding: 10px; }
                </style>
            </head>
            <body>
                <h1>${activity.title}</h1>
                <p>${activity.description}</p>
                ${activity.image ? `<img src="${activity.image.imageUrl}" alt="${activity.title}" />` : ''}
                <script>
                    window.onload = () => {
                        window.print();
                    };
                </script>
            </body>
            </html>
        `;

        const blob = new Blob([activityHTML.trim()], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        URL.revokeObjectURL(url);
        
        toast({
            title: "Generating Activity Sheet",
            description: `Your sheet for "${activity.title}" is opening in a new tab. You can save it as a PDF from there.`,
        });
    };

    return (
        <div className="space-y-8">
            <ScrollAnimator>
                <div>
                    <div className="flex items-center gap-3 mb-2">
                        <Palette className="h-8 w-8 text-accent" />
                        <h1 className="text-3xl font-headline font-bold text-foreground">Creative Activities</h1>
                    </div>
                    <p className="text-muted-foreground max-w-2xl">
                        Downloadable coloring pages, crafts, and activities to make learning about God fun.
                    </p>
                </div>
            </ScrollAnimator>
            
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {creativeActivities.map((activity, index) => (
                    <ScrollAnimator key={activity.id} delay={index * 0.1}>
                        <Card className="flex flex-col h-full">
                            {activity.image && (
                                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-t-lg">
                                    <Image src={activity.image.imageUrl} alt={activity.title} fill className="object-cover" data-ai-hint={activity.image.imageHint} />
                                </div>
                            )}
                            <CardHeader>
                                <CardTitle className="font-headline">{activity.title}</CardTitle>
                                <CardDescription>{activity.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow" />
                            <CardFooter>
                                <Button className="w-full" onClick={() => handleDownload(activity)}>
                                    <Download className="mr-2 h-5 w-5" />
                                    Download Activity
                                </Button>
                            </CardFooter>
                        </Card>
                    </ScrollAnimator>
                ))}
            </div>
        </div>
    );
}
