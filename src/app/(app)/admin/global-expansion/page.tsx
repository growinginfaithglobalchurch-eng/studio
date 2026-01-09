
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Globe, Languages, Map, Users, Milestone } from 'lucide-react';

const expansionPhases = [
    {
        icon: <Milestone className="h-6 w-6 text-accent" />,
        title: "Phase 1: English-Speaking Nations",
        description: "Initial rollout to regions with minimal language barriers to refine the platform and gather feedback.",
        details: ["Target Regions: UK, Canada, Australia, New Zealand, South Africa.", "Focus: Establish foundational communities and test core features.", "Goal: 10,000 active users across these regions in 6 months."]
    },
    {
        icon: <Milestone className="h-6 w-6 text-accent" />,
        title: "Phase 2: Major Language Groups",
        description: "Translate the platform and core content into major world languages to significantly expand reach.",
        details: ["Target Languages: Spanish, Portuguese, French, Mandarin.", "Focus: Partner with native-speaking ministries for content translation and cultural adaptation.", "Goal: Launch in 3 new language markets within 12 months."]
    },
    {
        icon: <Milestone className="h-6 w-6 text-accent" />,
        title: "Phase 3: High-Growth Regions",
        description: "Strategic expansion into regions with rapidly growing Christian populations and digital adoption.",
        details: ["Target Regions: Latin America, Southeast Asia, Sub-Saharan Africa.", "Focus: Develop region-specific content and appoint local leadership teams.", "Goal: Become the leading digital faith platform in these key areas."]
    }
];

const localizationPrinciples = [
    {
        icon: <Languages className="h-6 w-6 text-accent" />,
        title: "Content Localization",
        description: "Translate core teachings, devotionals, and courses. Adapt imagery and examples to be culturally relevant and resonant.",
    },
    {
        icon: <Users className="h-6 w-6 text-accent" />,
        title: "Community Management",
        description: "Appoint and train regional community moderators who understand the local culture and language to foster safe and engaging online spaces.",
    },
    {
        icon: <Map className="h-6 w-6 text-accent" />,
        title: "Regional Engagement",
        description: "Appoint Regional Ambassadors, host region-specific live events, and establish partnerships with local churches and ministries to drive growth.",
    }
];


export default function GlobalExpansionPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
             <Globe className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">Global Expansion & Localization</h1>
        </div>
        <p className="text-muted-foreground">
          Our strategy for taking Faith Connect Global to every tribe and nation.
        </p>
      </div>

       <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2">
                Phased Rollout Strategy
            </CardTitle>
            <CardDescription>
                A methodical approach to scaling our global presence.
            </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            {expansionPhases.map((phase) => (
                <div key={phase.title} className="flex items-start gap-4">
                     {phase.icon}
                    <div className="flex-grow">
                        <h3 className="font-bold text-lg text-foreground">{phase.title}</h3>
                        <p className="text-muted-foreground">{phase.description}</p>
                        <ul className="mt-2 space-y-1 text-sm text-muted-foreground list-disc pl-5">
                            {phase.details.map((detail, index) => (
                                <li key={index}>{detail}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))}
        </CardContent>
       </Card>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    Localization Principles
                </CardTitle>
                 <CardDescription>
                    Ensuring the platform feels like home for every user, everywhere.
                </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6 md:grid-cols-3">
                {localizationPrinciples.map((principle) => (
                    <div key={principle.title} className="flex flex-col items-center text-center p-4 rounded-lg bg-card-foreground/5">
                        {principle.icon}
                        <h3 className="mt-4 font-bold text-foreground">{principle.title}</h3>
                        <p className="mt-2 text-sm text-muted-foreground">{principle.description}</p>
                    </div>
                ))}
            </CardContent>
        </Card>
    </div>
  );
}
