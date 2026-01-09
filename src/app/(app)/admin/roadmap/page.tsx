
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DollarSign, CalendarDays, Rocket, Users, Handshake, ShieldCheck, Baby } from 'lucide-react';

const roadmapSections = [
    {
        icon: <DollarSign className="h-6 w-6 text-accent" />,
        title: "Monetization & Sustainability",
        description: "Access levels, giving philosophy, and partnership models.",
        details: ["Free Access: Core biblical teachings & community.", "Premium Access: Advanced courses, mentorship.", "Giving Philosophy: Tithes, offerings, and partnership contributions.", "Partnerships: Collaborate with ministries and businesses."]
    },
    {
        icon: <CalendarDays className="h-6 w-6 text-accent" />,
        title: "12-Month Content & Program Roadmap",
        description: "Monthly themes, core focus areas, and key activities.",
        details: ["Q1: Foundations of Faith", "Q2: Understanding the Prophetic", "Q3: Kingdom Leadership", "Q4: Global Missions & Outreach"]
    },
    {
        icon: <Users className="h-6 w-6 text-accent" />,
        title: "Admin & Leadership Dashboard",
        description: "Role-based access, key modules, and accountability framework.",
        details: ["Roles: Super Admin, Content Manager, Community Moderator.", "Modules: User management, content publishing, analytics.", "Accountability: Audit logs and performance metrics."]
    },
    {
        icon: <Handshake className="h-6 w-6 text-accent" />,
        title: "Church & Ministry Integration",
        description: "Partner Church and Ministry models with collaboration guidelines.",
        details: ["Partner Model: Integrate our platform into your church's digital strategy.", "Collaboration: Co-host events, share resources, and create courses."]
    },
     {
        icon: <Baby className="h-6 w-6 text-accent" />,
        title: "Kids & Youth Connect Platform",
        description: "Age-based structure, safety measures, and curriculum highlights.",
        details: ["Structure: Groups for ages 7-12 and 13-18.", "Safety: Verified leaders, content moderation, privacy controls.", "Curriculum: Interactive Bible stories, discipleship for youth."]
    }
]

const features = [
    { feature: "AI Content Recommendations", status: "Active", description: "Personalized content paths for users." },
    { feature: "Live Streaming & Replays", status: "Active", description: "Real-time ministry and on-demand access." },
    { feature: "Community & Messaging", status: "In Development", description: "Direct messaging and group chat functionality." },
    { feature: "Mentorship Matching", status: "Planned", description: "Connect mentors with mentees based on profiles." },
    { feature: "Mobile App (iOS & Android)", status: "Planned", description: "Native mobile experience for on-the-go access." },
]

export default function RoadmapPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">Platform Roadmap & Strategy</h1>
        <p className="text-muted-foreground">
          An overview of the strategic direction for Faith Connect Global.
        </p>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {roadmapSections.map((section) => (
                <Card key={section.title} className="flex flex-col">
                    <CardHeader>
                        <div className="flex items-start gap-4">
                            {section.icon}
                            <div>
                                <CardTitle>{section.title}</CardTitle>
                                <CardDescription>{section.description}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                            {section.details.map((detail, index) => (
                                <li key={index}>{detail}</li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
            ))}
       </div>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Rocket className="h-6 w-6 text-accent" />
                    Continuous Features Roadmap
                </CardTitle>
                <CardDescription>
                    A snapshot of our feature development pipeline.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Feature</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Description</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {features.map((feature) => (
                            <TableRow key={feature.feature}>
                                <TableCell className="font-medium">{feature.feature}</TableCell>
                                <TableCell>{feature.status}</TableCell>
                                <TableCell>{feature.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>

    </div>
  );
}
