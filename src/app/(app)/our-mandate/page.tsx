
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Shield, Eye, Target, Rocket, Wind, Languages, BookMarked, Quote } from "lucide-react";
import Image from "next/image";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { ScrollAnimator } from "@/components/scroll-animator";

const benedictionPoints = [
    "Immortality, death impossible",
    "Divine health, sickness impossible",
    "Divine protection, destruction impossible",
    "Divine provision, poverty impossible",
    "Divine direction, mistakes impossible",
    "Holy communion, Covid-19 impossible"
];

const languagePoints = [
    "We are a tribe of life.",
    "We are the tribe of Enoch.",
    "If you join our community, you will live.",
    "Eternal life is our consciousness.",
    "We don’t die.",
    "We have eternal life.",
    "The only difference between us and other believers is that we dare and strive to lay hold on eternal life."
];

export default function OurMandatePage() {
    const bannerImage = PlaceHolderImages.find(p => p.id === 'hero');

    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <ScrollAnimator>
              <div>
                  <div className="flex items-center gap-3 mb-2">
                      <BookMarked className="h-8 w-8 text-accent" />
                      <h1 className="text-3xl font-headline font-bold text-foreground">Our Mandate & Core Beliefs</h1>
                  </div>
                  <p className="text-muted-foreground max-w-2xl">
                      Foundational training for all visitors, members, and leaders of Growing In Faith Global Church.
                  </p>
              </div>
            </ScrollAnimator>

            {bannerImage && (
                 <ScrollAnimator>
                   <div className="relative w-full rounded-lg overflow-hidden">
                      <AspectRatio ratio={16 / 9}>
                              <Image
                                  src={bannerImage.imageUrl}
                                  alt="Our Mandate"
                                  fill
                                  className="object-cover"
                                  data-ai-hint={bannerImage.imageHint}
                              />
                      </AspectRatio>
                  </div>
                 </ScrollAnimator>
            )}

            <ScrollAnimator>
              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-3"><Rocket className="h-6 w-6 text-accent" />Our Mission</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-lg text-muted-foreground">
                          Taking the gospel of sonship, incorruption, and immortality to the nations of the world.
                      </p>
                  </CardContent>
              </Card>
            </ScrollAnimator>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ScrollAnimator delay={0.1}>
                  <Card>
                      <CardHeader>
                          <CardTitle className="flex items-center gap-3"><Quote className="h-5 w-5 text-accent" />Our Motto</CardTitle>
                      </CardHeader>
                      <CardContent><p className="text-muted-foreground">Death has been swallowed up in victory.</p></CardContent>
                  </Card>
                </ScrollAnimator>
                <ScrollAnimator delay={0.2}>
                  <Card>
                      <CardHeader>
                          <CardTitle className="flex items-center gap-3"><Eye className="h-5 w-5 text-accent" />Our Perception</CardTitle>
                      </CardHeader>
                      <CardContent><p className="text-muted-foreground">Death is an enemy.</p></CardContent>
                  </Card>
                </ScrollAnimator>
                 <ScrollAnimator delay={0.3} className="md:col-span-2 lg:col-span-1">
                   <Card>
                      <CardHeader>
                          <CardTitle className="flex items-center gap-3"><Target className="h-5 w-5 text-accent" />Our Vision</CardTitle>
                      </CardHeader>
                      <CardContent><p className="text-muted-foreground">Building a generation of remnants of the body of Christ that will not see physical death.</p></CardContent>
                  </Card>
                 </ScrollAnimator>
            </div>
            
             <ScrollAnimator>
               <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-3"><Wind className="h-6 w-6 text-accent" />The Revelation</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-lg text-muted-foreground">
                        Through the spirit of revelation and renewal of the mind, they will transform to either live and remain or ascend to heaven to exit the earth at will.
                      </p>
                  </CardContent>
              </Card>
             </ScrollAnimator>


            <ScrollAnimator>
              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-3"><Shield className="h-6 w-6 text-accent" />Our Benediction</CardTitle>
                      <CardDescription>The declarations of our faith and covenant.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <ul className="space-y-3">
                          {benedictionPoints.map((point) => (
                              <li key={point} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-md">
                                  <div className="bg-green-500/20 text-green-400 rounded-full p-1">
                                      <CheckCircle className="h-5 w-5" />
                                  </div>
                                  <span className="font-semibold text-black">{point}</span>
                              </li>
                          ))}
                      </ul>
                  </CardContent>
              </Card>
            </ScrollAnimator>

            <ScrollAnimator>
              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-3"><Languages className="h-6 w-6 text-accent" />Our Language</CardTitle>
                      <CardDescription>The creed and consciousness of our tribe.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <ul className="space-y-2 list-disc pl-5 text-muted-foreground">
                          {languagePoints.map((point) => (
                              <li key={point}>{point}</li>
                          ))}
                      </ul>
                  </CardContent>
              </Card>
            </ScrollAnimator>

        </div>
    );
}
