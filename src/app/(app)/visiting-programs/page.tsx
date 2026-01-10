
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plane, Users, Globe, CheckCircle, ClipboardCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const programPurposes = [
    "Immerse visitors in Kingdom culture",
    "Provide spiritual mentorship and exposure",
    "Strengthen identity as Kingdom citizens",
    "Offer practical engagement in War Rooms, Courts, and Leadership modules",
    "Build local and international networks",
];

const visitorTypes = [
    {
        icon: <Globe className="h-8 w-8 text-accent" />,
        title: "International Visitors",
        description: "For those traveling from other countries seeking Kingdom exposure and immersion. We provide a guided experience to maximize your time with us.",
        details: [
            "Access to translation support.",
            "Information on local housing options.",
            "Structured daily and weekly schedules."
        ],
        applyLink: "/international-visitor-registration"
    },
    {
        icon: <Users className="h-8 w-8 text-accent" />,
        title: "Local Visitors",
        description: "For those from within the country who desire deeper spiritual integration and mentorship within our community.",
        details: [
            "Full access to physical programs and meetings.",
            "Focused on deep community integration.",
            "Opportunities for ongoing mentorship."
        ],
        applyLink: "/local-visitor-registration"
    }
];

export default function VisitingProgramsPage() {
    const bannerImage = PlaceHolderImages.find(p => p.id === 'welcome-onboarding');

    return (
        <div className="space-y-8">
            <div className="text-center">
                <div className="flex items-center justify-center gap-3 mb-2">
                    <Plane className="h-8 w-8 text-accent" />
                    <h1 className="text-4xl font-headline font-bold text-foreground">Visiting Programs</h1>
                </div>
                <p className="text-xl text-muted-foreground">
                    Experiencing the Kingdom Firsthand
                </p>
                <p className="mt-4 text-lg italic text-muted-foreground/90">“Go therefore and make disciples of all nations…” — Matthew 28:19</p>
            </div>
            
            <div className="relative w-full rounded-lg overflow-hidden">
                <AspectRatio ratio={16 / 9}>
                    {bannerImage && (
                        <Image
                            src={bannerImage.imageUrl}
                            alt="Visiting Programs"
                            fill
                            className="object-cover"
                            data-ai-hint={bannerImage.imageHint}
                        />
                    )}
                </AspectRatio>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Purpose of the Program</CardTitle>
                    <CardDescription>Our Visiting Programs are designed to achieve several key objectives:</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3">
                        {programPurposes.map((purpose) => (
                            <li key={purpose} className="flex items-center gap-3">
                                <div className="bg-green-500/20 text-green-400 rounded-full p-1">
                                    <CheckCircle className="h-5 w-5" />
                                </div>
                                <span className="text-muted-foreground">{purpose}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>

            <Card className="bg-secondary/30">
                <CardHeader>
                    <CardTitle className="font-headline text-2xl text-foreground flex items-center gap-3">
                        <ClipboardCheck className="h-6 w-6 text-accent" />
                        Mandatory Pre-Arrival Training
                    </CardTitle>
                    <CardDescription className="text-muted-foreground pt-2">
                        To ensure all visitors are aligned and prepared, accepted applicants must complete a mandatory three-day training program before their arrival at the church.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">This training covers our core values, Kingdom protocols, and prepares you for a powerful time of immersion. Details will be provided upon acceptance.</p>
                     <Button asChild>
                        <Link href="/visitor-training-program">View Training Curriculum</Link>
                    </Button>
                </CardContent>
            </Card>
            
            <div>
                <h2 className="text-2xl font-headline font-bold text-center mb-6">Choose Your Program Type</h2>
                <div className="grid md:grid-cols-2 gap-8 items-start">
                    {visitorTypes.map(type => (
                        <Card key={type.title} className="flex flex-col h-full">
                            <CardHeader className="items-center text-center">
                                {type.icon}
                                <CardTitle className="font-headline text-xl mt-2">{type.title}</CardTitle>
                                <CardDescription>{type.description}</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-grow">
                                <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                                    {type.details.map(detail => <li key={detail}>{detail}</li>)}
                                </ul>
                            </CardContent>
                            <div className="p-6 pt-0">
                                <Button asChild className="w-full">
                                    <Link href={type.applyLink}>Apply Now</Link>
                                </Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
