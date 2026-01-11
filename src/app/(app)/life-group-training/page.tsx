
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Heart, BookOpen, MessageSquare, Shield, CheckCircle, GraduationCap } from "lucide-react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { ScrollAnimator } from "@/components/scroll-animator";


const curriculumModules = [
    {
        icon: <Heart className="h-5 w-5 text-accent" />,
        title: "The Heart of a Shepherd: Pastoral Care",
        description: "Learn to care for your group members with compassion, wisdom, and confidentiality.",
    },
    {
        icon: <MessageSquare className="h-5 w-5 text-accent" />,
        title: "Facilitating Spirit-Led Discussions",
        description: "Master the art of guiding conversations that are engaging, biblical, and open to the Holy Spirit.",
    },
    {
        icon: <BookOpen className="h-5 w-5 text-accent" />,
        title: "Handling the Word of Truth",
        description: "Gain confidence in preparing and leading a simple, impactful Bible study.",
    },
    {
        icon: <Shield className="h-5 w-5 text-accent" />,
        title: "Creating a Safe & Authentic Community",
        description: "Understand the principles of building trust, vulnerability, and a true family atmosphere.",
    },
    {
        icon: <Users className="h-5 w-5 text-accent" />,
        title: "Multiplying Your Group: Raising New Leaders",
        description: "Learn how to identify and develop potential leaders from within your group to expand the Kingdom.",
    },
];

const leaderQualities = [
    "A growing relationship with Jesus Christ.",
    "A heart to serve and care for people.",
    "A teachable spirit and willingness to be mentored.",
    "Agreement with the doctrine and vision of the church.",
    "Commitment to the training process.",
];

export default function LifeGroupTrainingPage() {
    const { toast } = useToast();
    const heroImage = PlaceHolderImages.find(p => p.id === 'community-feature');

    const handleEnroll = () => {
        toast({
            title: "Enrollment Request Sent!",
            description: "Thank you for your interest. A ministry leader will contact you with the next steps."
        });
    };

    return (
        <div className="space-y-8">
            <ScrollAnimator>
              <div>
                  <div className="flex items-center gap-3 mb-2">
                      <GraduationCap className="h-8 w-8 text-accent" />
                      <h1 className="text-3xl font-headline font-bold text-foreground">Life Group Leader Training</h1>
                  </div>
                  <p className="text-muted-foreground max-w-2xl">
                      Equipping and empowering you to lead a healthy, thriving small group community.
                  </p>
              </div>
            </ScrollAnimator>
            
            {heroImage && (
                <ScrollAnimator>
                  <div className="relative w-full rounded-lg overflow-hidden">
                      <AspectRatio ratio={16/9}>
                          <Image
                              src={heroImage.imageUrl}
                              alt="Life Group"
                              fill
                              className="object-cover"
                              data-ai-hint={heroImage.imageHint}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                            <div className="max-w-xl text-white">
                                  <h2 className="text-3xl font-headline font-bold">Become a Catalyst for Community</h2>
                                  <p className="mt-2">Life Groups are the heart of our church family. Step up to lead and make an eternal impact.</p>
                              </div>
                          </div>
                      </AspectRatio>
                  </div>
                </ScrollAnimator>
            )}

            <ScrollAnimator>
              <Card>
                  <CardHeader>
                      <CardTitle className="font-headline text-2xl">The Vision for Life Groups</CardTitle>
                      <CardDescription>Why we believe in small groups.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <p className="text-muted-foreground">
                          Life Groups are more than just a weekly meeting; they are the primary place where the real "one another" ministry of the church happens. It's where we care for each other, pray for each other, and grow together in our walk with Christ. As a leader, you are not just a facilitator; you are a shepherd, creating a space for life-changing community to happen.
                      </p>
                  </CardContent>
              </Card>
            </ScrollAnimator>

            <div className="grid md:grid-cols-2 gap-8">
                 <ScrollAnimator>
                   <Card>
                      <CardHeader>
                          <CardTitle>What We Look For in a Leader</CardTitle>
                      </CardHeader>
                      <CardContent>
                          <ul className="space-y-3">
                              {leaderQualities.map((quality) => (
                                  <li key={quality} className="flex items-center gap-3">
                                      <div className="bg-green-500/20 text-green-400 rounded-full p-1">
                                          <CheckCircle className="h-5 w-5" />
                                      </div>
                                      <span className="text-muted-foreground">{quality}</span>
                                  </li>
                              ))}
                          </ul>
                      </CardContent>
                  </Card>
                 </ScrollAnimator>
                <ScrollAnimator>
                  <Card>
                      <CardHeader>
                          <CardTitle>The Training Curriculum</CardTitle>
                          <CardDescription>Our training is designed to give you the confidence and skills to lead well.</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                          {curriculumModules.map((mod) => (
                              <div key={mod.title} className="flex items-start gap-3">
                                  {mod.icon}
                                  <div>
                                      <h4 className="font-semibold text-foreground">{mod.title}</h4>
                                      <p className="text-xs text-muted-foreground">{mod.description}</p>
                                  </div>
                              </div>
                          ))}
                      </CardContent>
                  </Card>
                </ScrollAnimator>
            </div>

            <ScrollAnimator>
              <Card className="text-center p-8 bg-secondary/30">
                  <CardTitle className="font-headline text-2xl">Ready to Lead?</CardTitle>
                  <CardDescription className="mt-2 mb-6 max-w-xl mx-auto">
                      If you feel the call to lead a Life Group and are ready to be equipped, we invite you to take the next step.
                  </CardDescription>
                  <Button size="lg" onClick={handleEnroll}>
                      Enroll in Leader Training
                  </Button>
              </Card>
            </ScrollAnimator>

        </div>
    );
}
