
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Anchor, CheckCircle } from "lucide-react";

const prayerPoints = [
    "I apply the blood of Jesus to my bloodline and I renounce and break every evil covenant made by my ancestors.",
    "By the power of the cross, I disconnect myself and my family from every marine altar and water spirit influencing our destiny.",
    "I command every serpent, leviathan, and spirit of the deep assigned against my progress to be paralyzed and judged by fire.",
    "Let every foundational problem and cyclical battle in my life be uprooted and destroyed now, in Jesus' name.",
    "I release myself from every cage of marine witchcraft and I retrieve my stolen virtues, blessings, and destiny from the waters.",
    "I decree that my financial, marital, and spiritual life will no longer be manipulated by powers from the sea.",
    "I declare that my foundation is now Christ Jesus, the Rock of Ages. Every other foundation is sinking sand.",
];

export default function MarineForcesPrayerPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <div className="flex items-center gap-3 mb-2">
            <Anchor className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">Prophetic Prayers: The Marine Forces</h1>
        </div>
        <p className="text-muted-foreground">
          Use these prayer points to deal with foundational issues and marine powers.
        </p>
      </div>

      <Card>
        <CardHeader>
            <CardTitle>Prayer of Engagement</CardTitle>
            <CardDescription>Declare these points with faith and authority.</CardDescription>
        </CardHeader>
        <CardContent>
            <ul className="space-y-4">
                {prayerPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3">
                        <CheckCircle className="h-5 w-5 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-muted-foreground">{point}</span>
                    </li>
                ))}
            </ul>
        </CardContent>
      </Card>
    </div>
  );
}
