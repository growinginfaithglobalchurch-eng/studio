
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, BookOpen, CheckCircle, Droplets, Heart, Shield, Award, PlayCircle, Star, Target, Users, ThumbsUp, GitCompare, Landmark } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { useRef, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ScrollAnimator } from "@/components/scroll-animator";

const trainingModules = [
    { 
        id: "mandate", 
        title: "The Kingdom Mandate: Parenting from God’s Perspective", 
        icon: <Target className="h-5 w-5 text-accent" />, 
        content: "From the very beginning, God instituted the family as a primary means by which His Kingdom would be established on Earth. This module redefines parenting as a divine calling to multiply God’s image and raise up Kingdom ambassadors who will carry His light into the world.",
        points: ["The Origin of Parenting: God’s Design", "The Kingdom Mandate: Multiplying God’s Image", "The Role of Parents in the Kingdom of God", "Parenting with Purpose: Raising Kingdom Ambassadors", "The Power of Generational Influence", "The Kingdom’s Empowering Grace"]
    },
    { 
        id: "model", 
        title: "God as Our Model: Understanding Divine Fatherhood", 
        icon: <Users className="h-5 w-5 text-accent" />, 
        content: "God is the perfect Father. His love, provision, guidance, discipline, presence, and unconditional grace form the ultimate model for Kingdom parenting. By reflecting His heart, we help our children understand their true identity as children of God.",
        points: ["God’s Heart as a Father (1 John 3:1)", "God’s Provision (Matthew 7:11)", "God’s Guidance (Proverbs 3:5-6)", "God’s Discipline (Hebrews 12:6)", "God’s Presence (Psalm 139:7)", "God’s Unconditional Love (Romans 8:38-39)"]
    },
    { 
        id: "values", 
        title: "Establishing Kingdom Values in Your Home", 
        icon: <Home className="h-5 w-5 text-accent" />, 
        content: "A home is never neutral—it is either intentionally formed by Kingdom values or unconsciously shaped by worldly influences. This module provides the blueprint for making your home the center of spiritual formation where righteousness, peace, and joy in the Holy Spirit reign.",
        points: ["The Home as a Kingdom Environment", "Modeling Before Teaching", "Teaching Values Through Daily Life", "Guarding the Culture of the Home"]
    },
    { 
        id: "discipleship", 
        title: "Discipleship at Home: Teaching the Ways of God", 
        icon: <BookOpen className="h-5 w-5 text-accent" />, 
        content: "Discipleship begins in the home. Parents are the first pastors, teachers, and disciplers in a child’s life. This module focuses on practical ways to teach Scripture, prayer, worship, and obedience as a natural part of family life.",
        points: ["The Home as the First Discipleship Center", "Teaching God’s Word", "Prayer and Worship as a Family", "Leading by Example"]
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
    {
        id: "grace-truth",
        title: "Grace and Truth: Balancing Love and Authority",
        icon: <GitCompare className="h-5 w-5 text-accent" />,
        content: "Jesus modeled a perfect balance—full of grace and truth (John 1:14). Parents must learn to do the same, avoiding the extremes of permissive grace or rigid authority.",
        points: ["Avoiding Extremes in Parenting", "Leading with Love and Firmness", "Building Trust through Balance"]
    },
    {
        id: "empowering",
        title: "Empowering Your Children for Kingdom Living",
        icon: <Award className="h-5 w-5 text-accent" />,
        content: "Children are not merely future leaders—they are active participants in God’s Kingdom now. This module is about empowering them to live out their faith.",
        points: ["Affirming Identity and Purpose", "Teaching Responsibility and Faith", "Releasing Them into Their Calling"]
    },
    {
        id: "leaders",
        title: "Raising Kingdom Leaders: A Legacy of Faith",
        icon: <Landmark className="h-5 w-5 text-accent" />,
        content: "Leadership begins at home. Kingdom leaders are shaped by character, humility, and a heart of service. Learn how to cultivate these traits in your children.",
        points: ["Modeling Servant Leadership", "Creating a Generational Legacy", "The Power of Intentional Mentorship"]
    },
    {
        id: "challenges",
        title: "Navigating Challenges in a Broken World",
        icon: <Shield className="h-5 w-5 text-accent" />,
        content: "Parents must equip children to navigate cultural confusion, moral challenges, and spiritual opposition with wisdom and faith.",
        points: ["Teaching Biblical Discernment", "Standing Firm in Faith Through Trials", "Creating a Safe Space for Tough Questions"]
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
    const [completedModules, setCompletedModules] = useState<string[]>([]);

    const handleActivationCheck = (label: string) => {
        toast({
            title: "Activation Logged!",
            description: `Great job leading your family in: "${label}"`
        })
    };

    const handleBeginTraining = () => {
        trainingModulesRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleCompleteModule = (moduleId: string) => {
        const isCompleted = completedModules.includes(moduleId);
        
        if (isCompleted) {
            setCompletedModules(prev => prev.filter(id => id !== moduleId));
        } else {
            setCompletedModules(prev => [...prev, moduleId]);
            toast({
                title: "Module Complete!",
                description: "You've completed a training module. Keep going!"
            });
        }
    };

    const progressPercentage = (completedModules.length / trainingModules.length) * 100;


    return (
        <div className="space-y-8">
            <ScrollAnimator>
              <div>
                  <div className="flex items-center gap-3 mb-2">
                      <Home className="h-8 w-8 text-accent" />
                      <h1 className="text-3xl font-headline font-bold text-foreground">Kingdom Parenting Room</h1>
                  </div>
                  <p className="text-muted-foreground max-w-2xl">
                      A training hub to equip and transform you into a visionary Kingdom parent.
                  </p>
              </div>
            </ScrollAnimator>

            <ScrollAnimator>
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
            </ScrollAnimator>

            <div className="grid md:grid-cols-3 gap-8" ref={trainingModulesRef}>
                <div className="md:col-span-2 space-y-8">
                    <ScrollAnimator>
                      <Card>
                          <CardHeader>
                              <CardTitle className="flex items-center gap-2"><BookOpen className="h-5 w-5 text-accent"/>Training Modules</CardTitle>
                              <div className="space-y-2 pt-2">
                                  <Progress value={progressPercentage} className="h-2" />
                                  <p className="text-sm text-muted-foreground">{completedModules.length} of {trainingModules.length} modules completed.</p>
                              </div>
                          </CardHeader>
                          <CardContent>
                              <Accordion type="single" collapsible className="w-full">
                                  {trainingModules.map(mod => {
                                      const isCompleted = completedModules.includes(mod.id);
                                      return (
                                          <AccordionItem value={mod.id} key={mod.id} className={cn(isCompleted && "bg-green-500/10")}>
                                              <AccordionTrigger className="hover:no-underline px-4">
                                                  <div className="flex items-center gap-3 text-left">
                                                      {mod.icon}
                                                      <span className={cn("text-lg font-semibold", "text-black")}>{mod.title}</span>
                                                  </div>
                                              </AccordionTrigger>
                                              <AccordionContent className="p-4 bg-secondary/30 rounded-md">
                                                  <p className="text-muted-foreground">{mod.content}</p>
                                                  <ul className="list-disc pl-5 mt-4 space-y-1 text-muted-foreground">
                                                      {mod.points.map(p => <li key={p}>{p}</li>)}
                                                  </ul>
                                                  <Button 
                                                      className="mt-4" 
                                                      variant={isCompleted ? "secondary" : "default"}
                                                      onClick={() => handleCompleteModule(mod.id)}
                                                  >
                                                      {isCompleted ? <ThumbsUp className="mr-2 h-4 w-4" /> : <CheckCircle className="mr-2 h-4 w-4" />}
                                                      {isCompleted ? "Completed" : "Mark as Complete"}
                                                  </Button>
                                              </AccordionContent>
                                          </AccordionItem>
                                      )
                                  })}
                              </Accordion>
                          </CardContent>
                      </Card>
                    </ScrollAnimator>
                </div>
                <div className="space-y-8">
                     <ScrollAnimator>
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
                     </ScrollAnimator>
                    <ScrollAnimator>
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
                    </ScrollAnimator>
                </div>
            </div>
        </div>
    );
}
