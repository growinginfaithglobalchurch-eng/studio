
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, CheckCircle, Droplets, Heart, Shield, Award, PlayCircle, Star, Target, Users } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";

const trainingModules = [
    { 
        id: "mandate", 
        title: "The Kingdom Mandate: Parenting from God’s Perspective", 
        icon: <Target className="h-5 w-5 text-accent" />, 
        content: "From the very beginning, God instituted the family as a primary means by which His Kingdom would be established on Earth. This module redefines parenting as a divine calling to multiply God’s image and raise up Kingdom ambassadors who will carry His light into the world.",
        points: ["The Origin of Parenting: God’s Design", "The Kingdom Mandate: Multiplying God’s Image", "The Role of Parents in the Kingdom of God", "Parenting with Purpose: Raising Kingdom Ambassadors"]
    },
    { 
        id: "model", 
        title: "God as Our Model: Understanding Divine Fatherhood", 
        icon: <Users className="h-5 w-5 text-accent" />, 
        content: "God is the perfect Father. His love, provision, guidance, discipline, and presence form the ultimate model for Kingdom parenting. By reflecting His heart, we help our children understand their true identity as children of God.",
        points: ["God’s Heart as a Father (1 John 3:1)", "God’s Provision (Matthew 7:11)", "God’s Guidance (Proverbs 3:5-6)", "God’s Discipline (Hebrews 12:6)", "God’s Presence (Psalm 139:7)"]
    },
    { 
        id: "values", 
        title: "Establishing Kingdom Values in Your Home", 
        icon: <Home className="h-5 w-5 text-accent" />, 
        content: "A home is never neutral—it is either intentionally formed by Kingdom values or unconsciously shaped by worldly influences. This module provides the blueprint for making your home the center of spiritual formation where righteousness, peace, and joy in the Holy Spirit reign.",
        points: ["The Home as a Kingdom Environment", "Modeling Before Teaching", "Guarding the Culture of the Home"]
    },
    { 
        id: "discipleship", 
        title: "Discipleship at Home: Teaching the Ways of God", 
        icon: <BookOpen className="h-5 w-5 text-accent" />, 
        content: "Discipleship begins in the home. Parents are the first pastors, teachers, and disciplers in a child’s life. This module focuses on practical ways to teach Scripture, prayer, worship, and obedience as a natural part of family life.",
        points: ["The Home as the First Discipleship Center", "Teaching God’s Word", "Prayer and Worship as a Family"]
    },
    { 
        id: "prayer", 
        title: "The Power of Prayer in Parenting", 
        icon: <Heart className="h-5 w-5 text-accent" />, 
        content: "Prayer is the ultimate tool for partnering with God in shaping your children’s lives. Learn to use prayer as a spiritual covering, a tool for guidance, and a source of strength, while teaching your children to develop their own relationship with God.",
        points: ["Prayer as Spiritual Covering", "Teaching Children to Pray", "Trusting God Through Prayer"]
    },
     { 
        id: "discipline", 
        title: "Discipline & Correction with Kingdom Principles", 
        icon: <Droplets className="h-5 w-5 text-accent" />, 
        content: "Biblical discipline is not about punishment; it's about loving correction that forms character and guides children toward righteousness. This module teaches how to balance grace and truth to restore relationship and instill wisdom.",
        points: ["God’s Model of Discipline", "Discipline with Purpose", "Restoration After Discipline"]
    },
];

const dailyActivations = [
    { id: "prayer", label: "Family Prayer Time" },
    { id: "scripture", label: "Discussed a Kingdom Value or Scripture" },
    { id: "blessing", label: "Spoke a Blessing/Declaration Over Your Children" },
    { id: "gratitude", label: "Shared 'God Moments' or Gratitude" },
];

const badges = [
    { icon: <Star className="h-6 w-6 text-yellow-400"/>, title: "Foundation Builder", description: "Completed 'Kingdom Mandate' Module" },
    { icon: <Heart className="h-6 w-6 text-red-400"/>, title: "Prayer Warrior Parent", description: "Completed 'Power of Prayer' Module" },
    { icon: <Award className="h-6 w-6 text-blue-400"/>, title: "Legacy Leader", description: "Completed all training modules" },
];


export default function KingdomParentingPage() {
    const { toast } = useToast();
    const trainingModulesRef = useRef<HTMLDivElement>(null);

    const handleActivationCheck = (label: string) => {
        toast({
            title: "Activation Logged!",
            description: `Great job leading your family in: "${label}"`
        })
    };

    const handleBeginTraining = () => {
        trainingModulesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <Home className="h-8 w-8 text-accent" />
                    <h1 className="text-3xl font-headline font-bold text-foreground">Kingdom Parenting Room</h1>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                    A training hub to equip and transform you into a visionary Kingdom parent.
                </p>
            </div>

            <Card className="bg-gradient-to-r from-primary/10 to-transparent">
                <CardHeader>
                    <CardTitle className="font-headline text-xl text-foreground">The Vision: Parents as Kings & Priests</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">This room is designed to raise and transform parents into leaders who govern their families with Kingdom principles. Your mandate is to predominate, govern, and colonize the earth by first establishing God's culture in your home. You are a king and a priest to your family.</p>
                     <Button className="mt-4" size="lg" onClick={handleBeginTraining}>
                        <PlayCircle className="mr-2 h-5 w-5" />
                        Begin Training
                    </Button>
                </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-8" ref={trainingModulesRef}>
                <div className="md:col-span-2 space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-accent"/>Training Modules</CardTitle>
                            <CardDescription>Engage with these modules to build your foundation as a Kingdom parent.</CardDescription>
                        </CardHeader>
                        <CardContent>
                             <Accordion type="single" collapsible className="w-full">
                                {trainingModules.map(mod => (
                                    <AccordionItem value={mod.id} key={mod.id}>
                                        <AccordionTrigger className="hover:no-underline">
                                            <div className="flex items-center gap-3">
                                                {mod.icon}
                                                <span className="text-lg font-semibold text-black">{mod.title}</span>
                                            </div>
                                        </AccordionTrigger>
                                        <AccordionContent className="p-4 bg-secondary/30 rounded-md">
                                            <p className="text-muted-foreground">{mod.content}</p>
                                            <ul className="list-disc pl-5 mt-4 space-y-1 text-muted-foreground">
                                                {mod.points.map(p => <li key={p}>{p}</li>)}
                                            </ul>
                                        </AccordionContent>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </CardContent>
                    </Card>
                </div>
                <div className="space-y-8">
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><CheckCircle className="h-5 w-5 text-accent"/>Daily Activations</CardTitle>
                            <CardDescription>Apply what you learn.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            {dailyActivations.map(item => (
                                <div key={item.id} className="flex items-center space-x-3 p-3 rounded-md border bg-card">
                                    <Checkbox id={item.id} onCheckedChange={() => handleActivationCheck(item.label)} />
                                    <Label htmlFor={item.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                        {item.label}
                                    </Label>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                             <CardTitle className="flex items-center gap-2"><Award className="h-5 w-5 text-accent"/>My Badges</CardTitle>
                             <CardDescription>Track your progress.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                             {badges.map(badge => (
                                <div key={badge.title} className="flex items-center gap-3">
                                    {badge.icon}
                                    <div>
                                        <p className="font-semibold text-foreground">{badge.title}</p>
                                        <p className="text-xs text-foreground">{badge.description}</p>
                                    </div>
                                </div>
                             ))}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
