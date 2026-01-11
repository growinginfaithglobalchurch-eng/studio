
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Crown, CheckCircle } from "lucide-react";
import { ScrollAnimator } from "@/components/scroll-animator";

const prayerPoints = [
    "I stand as a gatekeeper in my territory and I shut down every demonic gate of poverty, sickness, and immorality.",
    "In the name of Jesus, I decree that the systems of my city—government, education, business—will align with the purposes of God.",
    "I take authority over every spirit of lawlessness and rebellion, and I release a spirit of order, justice, and righteousness.",
    "Let the scepter of wickedness over my land be broken. I declare that the righteous will flourish.",
    "I dispossess every squatter spirit occupying positions of influence that belong to the saints.",
    "By faith, I raise the standard of the Lord against every flood of evil trying to take over our communities.",
    "I prophesy to the foundations of my nation: Be reset and aligned to God's original intent. Let every ungodly foundation be shaken.",
];

export default function LandForcesPrayerPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <ScrollAnimator>
        <div>
          <div className="flex items-center gap-3 mb-2">
              <Crown className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-headline font-bold text-foreground">Prophetic Prayers: The Land Forces</h1>
          </div>
          <p className="text-muted-foreground">
            Use these prayer points to exercise dominion over territories and systems.
          </p>
        </div>
      </ScrollAnimator>

      <ScrollAnimator>
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
      </ScrollAnimator>
    </div>
  );
}
