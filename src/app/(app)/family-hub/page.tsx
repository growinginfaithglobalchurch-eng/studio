
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { communityUsers } from "@/lib/data";
import { Home, CheckCircle, Heart, BookOpen, Sparkles, Fingerprint } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const familyGroup = {
    groupId: "FG-2024-AB789",
    members: communityUsers.slice(0, 4), // Mock data: first 4 users are a family
    familyPractices: {
        prayerMoments: true,
        scriptureDiscussion: false,
        blessingDeclarations: true,
    },
    unityScore: "Active",
    monthlyFocus: "Unity & Vision"
};

const practiceItems = [
    { id: "prayerMoments", label: "Family Prayer Moments", icon: <Heart className="h-5 w-5 text-accent" /> },
    { id: "scriptureDiscussion", label: "Scripture Discussion", icon: <BookOpen className="h-5 w-5 text-accent" /> },
    { id: "blessingDeclarations", label: "Blessing Declarations", icon: <Sparkles className="h-5 w-5 text-accent" /> }
];

export default function FamilyHubPage() {
    const { toast } = useToast();

    const handlePracticeCheck = (practice: string) => {
        toast({
            title: "Practice Logged!",
            description: `You've updated the status for "${practice}". Great job leading your family!`,
        });
        // In a real app, you'd update this state in Firebase
    };


    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <Home className="h-8 w-8 text-accent" />
                    <h1 className="text-3xl font-headline font-bold text-foreground">Family Hub</h1>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                    Your family's central place for connection, growth, and spiritual discipline.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2 space-y-8">
                     <Card>
                        <CardHeader>
                            <CardTitle>Family Practices</CardTitle>
                            <CardDescription>Track your family's spiritual disciplines for the week.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {practiceItems.map(item => (
                                <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                                    <div className="flex items-center gap-3">
                                        {item.icon}
                                        <label htmlFor={item.id} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                                            {item.label}
                                        </label>
                                    </div>
                                    <Checkbox
                                        id={item.id}
                                        defaultChecked={familyGroup.familyPractices[item.id as keyof typeof familyGroup.familyPractices]}
                                        onCheckedChange={() => handlePracticeCheck(item.label)}
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Monthly Family Focus</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="p-4 bg-secondary rounded-lg text-center">
                                <p className="text-muted-foreground text-sm">This month, our family is focusing on:</p>
                                <p className="text-2xl font-bold font-headline text-accent mt-2">{familyGroup.monthlyFocus}</p>
                            </div>
                        </CardContent>
                    </Card>

                </div>
                <div className="space-y-8">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Fingerprint className="h-5 w-5 text-accent"/> Group ID</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="font-mono text-sm text-center bg-secondary text-foreground p-2 rounded-md">{familyGroup.groupId}</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Family Members</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {familyGroup.members.map((member, index) => (
                                <div key={member.id} className="flex items-center gap-3">
                                    <Avatar>
                                        {member.avatar && <AvatarImage src={member.avatar.imageUrl} alt={member.name} />}
                                        <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-semibold text-foreground">{member.name}</p>
                                        <p className="text-xs text-muted-foreground">{index === 0 ? 'Father' : index === 1 ? 'Mother' : 'Child'} (ID: {member.id})</p>
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>

                    <Card className="text-center">
                        <CardHeader>
                            <CardTitle>Family Unity Score</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex justify-center items-center gap-2">
                                <CheckCircle className="h-10 w-10 text-green-500" />
                                <p className="text-4xl font-bold text-foreground">{familyGroup.unityScore}</p>
                            </div>
                            <CardDescription className="mt-2">Based on consistent engagement in family practices.</CardDescription>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
