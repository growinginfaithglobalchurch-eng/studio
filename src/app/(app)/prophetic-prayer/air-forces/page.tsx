
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Feather, CheckCircle } from "lucide-react";
import { ScrollAnimator } from "@/components/scroll-animator";

const prayerPoints = [
    "By the authority in the name of Jesus, I release the fire of the Holy Ghost to consume every satanic cloud and spiritual fog blocking my vision and clarity.",
    "I take authority over the airwaves and command every demonic broadcast of fear, confusion, and lies to be silenced now.",
    "I decree that the atmosphere over my mind, my family, and my city is cleansed by the blood of Jesus. The air I breathe is holy.",
    "I pull down every mental stronghold and high thing that exalts itself against the knowledge of Christ in my thought life.",
    "I declare that my mind is the mind of Christ. I host thoughts of purity, power, and purpose.",
    "I release the winds of the Spirit to blow away every chaff of demonic oppression and bring in the rain of God's presence.",
    "I forbid any and all assignments of mind-blinding spirits. Let the light of the glorious gospel shine.",
];

export default function AirForcesPrayerPage() {
  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <ScrollAnimator>
        <div>
          <div className="flex items-center gap-3 mb-2">
              <Feather className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-headline font-bold text-foreground">Prophetic Prayers: The Air Forces</h1>
          </div>
          <p className="text-muted-foreground">
            Use these prayer points to engage in warfare against powers of the air.
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
