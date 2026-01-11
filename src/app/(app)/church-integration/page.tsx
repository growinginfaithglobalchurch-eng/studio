

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Handshake, Users, BookOpen, Globe } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ScrollAnimator } from "@/components/scroll-animator";

const partnerModels = [
    {
        icon: <Users className="h-8 w-8 text-accent" />,
        title: "Partner Church Model",
        type: "church",
        description: "Integrate the Faith Connect Global platform as your church's official digital campus. Provide your members with a rich ecosystem of resources, community, and growth tracks, all while maintaining your church's identity.",
        features: [
            "Co-branded platform experience.",
            "Private groups for your small groups and ministries.",
            "Custom content channels for your sermons and teachings.",
            "Analytics dashboard to track member engagement."
        ],
    },
    {
        icon: <BookOpen className="h-8 w-8 text-accent" />,
        title: "Ministry Partner Model",
        type: "ministry",
        description: "For para-church ministries, itinerant speakers, and content creators. Share your resources with a global audience, host exclusive courses, and build a community around your unique message.",
        features: [
            "A dedicated channel on the platform.",
            "Monetization tools for courses and resources.",
            "Collaboration opportunities with other ministries.",
            "Access to a global audience of engaged believers."
        ]
    }
];

const collaborationGuidelines = [
    "Uphold biblical truth and doctrinal integrity.",
    "Foster a spirit of unity and honor within the Body of Christ.",
    "Commit to excellence in content and ministry delivery.",
    "Maintain accountability and transparent communication."
];

export default function ChurchIntegrationPage() {
    const heroImage = PlaceHolderImages.find(p => p.id === 'community-feature');

    return (
        <div className="space-y-8">
             <ScrollAnimator>
               <div>
                  <div className="flex items-center gap-3 mb-2">
                      <Handshake className="h-8 w-8 text-accent" />
                      <h1 className="text-3xl font-headline font-bold text-foreground">Church & Ministry Integration</h1>
                  </div>
                  <p className="text-muted-foreground max-w-2xl">
                    Partnering together to expand the Kingdom of God globally.
                  </p>
              </div>
             </ScrollAnimator>

            {heroImage && (
                 <ScrollAnimator>
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                      <Image src={heroImage.imageUrl} alt="Church & Ministry Integration" fill className="object-cover" data-ai-hint={heroImage.imageHint}/>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                          <div className="max-w-xl text-white">
                              <h2 className="text-3xl font-headline font-bold">Uniting for Greater Impact</h2>
                              <p className="mt-2">We believe in the power of collaboration. By joining forces, we can more effectively equip the saints, reach the lost, and see God's Kingdom advance across the earth.</p>
                          </div>
                      </div>
                  </div>
                 </ScrollAnimator>
            )}

            <ScrollAnimator>
              <div>
                  <h2 className="text-2xl font-headline font-bold mb-4">Partnership Models</h2>
                  <div className="grid gap-8 md:grid-cols-2">
                      {partnerModels.map((model, index) => (
                          <ScrollAnimator key={model.title} delay={index * 0.1}>
                            <Card className="flex flex-col">
                                <CardHeader className="flex flex-row items-start gap-4">
                                    {model.icon}
                                    <div>
                                        <CardTitle className="font-headline text-xl">{model.title}</CardTitle>
                                        <CardDescription>{model.description}</CardDescription>
                                    </div>
                                </CardHeader>
                                <CardContent className="flex-grow">
                                    <h4 className="font-semibold mb-2 text-card-foreground">Key Features:</h4>
                                    <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                                        {model.features.map(feature => <li key={feature}>{feature}</li>)}
                                    </ul>
                                </CardContent>
                                <div className="p-6 pt-0">
                                    <Button asChild>
                                        <Link href={`/contact?type=${model.type}`}>Inquire About Partnership</Link>
                                    </Button>
                                </div>
                            </Card>
                          </ScrollAnimator>
                      ))}
                  </div>
              </div>
            </ScrollAnimator>

            <ScrollAnimator>
              <Card>
                  <CardHeader>
                      <div className="flex items-center gap-3">
                          <Globe className="h-6 w-6 text-accent" />
                          <CardTitle className="font-headline text-xl">Collaboration Guidelines</CardTitle>
                      </div>
                      <CardDescription>To ensure unity and effectiveness, we ask our partners to align with these core principles.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <ul className="grid gap-4 md:grid-cols-2">
                          {collaborationGuidelines.map(guideline => (
                              <li key={guideline} className="flex items-center gap-3">
                                  <div className="bg-muted rounded-full p-2">
                                      <Handshake className="h-4 w-4 text-accent" />
                                  </div>
                                  <span className="text-muted-foreground">{guideline}</span>
                              </li>
                          ))}
                      </ul>
                  </CardContent>
              </Card>
            </ScrollAnimator>

            <ScrollAnimator>
              <Card className="text-center p-8 bg-secondary/30">
                  <CardTitle className="font-headline text-2xl">Ready to Partner With Us?</CardTitle>
                  <CardDescription className="mt-2 mb-6 max-w-xl mx-auto">
                      If you share our vision and are interested in exploring a partnership, we would love to connect with you. Let's discuss how we can work together to serve the Body of Christ.
                  </CardDescription>
                  <Button size="lg" asChild>
                      <Link href="/contact">Contact Our Partnerships Team</Link>
                  </Button>
              </Card>
            </ScrollAnimator>

        </div>
    )
}
