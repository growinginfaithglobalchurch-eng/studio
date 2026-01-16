
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Star, Shield, Users, Video, Calendar, Ticket, Award } from 'lucide-react';
import { ScrollAnimator } from '@/components/scroll-animator';

const partnershipBenefits = [
    {
        icon: <Video className="h-8 w-8 text-accent" />,
        title: "Exclusive Content & Briefings",
        description: "Receive access to a private library of teachings and get exclusive monthly video updates from our founders, providing deeper insights and prophetic direction."
    },
    {
        icon: <Users className="h-8 w-8 text-accent" />,
        title: "Partner-Only Community",
        description: "Connect with a dedicated community of like-minded partners on our private prayer wall and exclusive group forums for mutual encouragement and networking."
    },
    {
        icon: <Calendar className="h-8 w-8 text-accent" />,
        title: "Direct Impartation Meetings",
        description: "Gain access to monthly and annual online meetings with Joseph and Norah Tryson for a time of impartation, teaching, and strategic ministry updates."
    },
    {
        icon: <Ticket className="h-8 w-8 text-accent" />,
        title: "Priority Access & Discounts",
        description: "Enjoy early-bird registration and exclusive partner discounts on conferences, special events, and resources available in our digital store."
    },
    {
        icon: <Shield className="h-8 w-8 text-accent" />,
        title: "Spiritual Covering & Prayer",
        description: "Be covered in prayer by our dedicated intercessory team. We are committed to standing with our partners for their breakthrough and protection."
    },
    {
        icon: <Award className="h-8 w-8 text-accent" />,
        title: "Eternal Reward & Kingdom Impact",
        description: "The greatest benefit of all: the joy and eternal reward of knowing you are sowing into fertile ground and co-laboring to advance the Kingdom of God globally."
    }
];

export default function PartnershipBenefitsPage() {
  return (
    <div className="space-y-8">
      <ScrollAnimator>
        <div>
          <div className="flex items-center gap-3 mb-2">
              <Star className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-headline font-bold text-foreground">Benefits of Partnering with Royal Life TV</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            When you partner with us, you are not just giving; you are connecting to the grace and anointing on this ministry.
          </p>
        </div>
      </ScrollAnimator>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {partnershipBenefits.map((benefit, index) => (
            <ScrollAnimator key={benefit.title} delay={index * 0.1}>
                <Card className="text-center flex flex-col items-center p-6 h-full">
                    <div className="bg-muted rounded-full p-4">
                        {benefit.icon}
                    </div>
                    <CardHeader className="p-2">
                        <CardTitle className="font-headline text-xl">{benefit.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-muted-foreground">{benefit.description}</p>
                    </CardContent>
                </Card>
            </ScrollAnimator>
        ))}
      </div>
    </div>
  );
}
