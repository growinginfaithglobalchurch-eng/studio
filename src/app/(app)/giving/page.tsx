
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Gift, Handshake, Heart, PiggyBank, Briefcase } from "lucide-react";
import Link from "next/link";
import { ScrollAnimator } from "@/components/scroll-animator";

const givingWays = [
    {
        icon: <Heart className="h-8 w-8 text-accent" />,
        title: "Tithe & Offerings",
        description: "Honor the Lord with your firstfruits. Your faithful giving supports the ongoing ministry and operational needs of Faith Connect Global.",
        cta: "Give Now"
    },
    {
        icon: <PiggyBank className="h-8 w-8 text-accent" />,
        title: "One-Time Gift",
        description: "Sow a seed into fertile ground. Your one-time donation helps fuel special projects, outreach initiatives, and global expansion.",
        cta: "Donate"
    },
    {
        icon: <Handshake className="h-8 w-8 text-accent" />,
        title: "Become a Partner",
        description: "Join us as a covenant partner to consistently support the vision and mandate of this ministry through regular financial commitment.",
        cta: "Become a Partner"
    }
]

export default function GivingPage() {
    return (
        <div className="space-y-8">
             <ScrollAnimator>
               <div>
                  <div className="flex items-center gap-3 mb-2">
                      <Gift className="h-8 w-8 text-accent" />
                      <h1 className="text-3xl font-headline font-bold text-foreground">Giving & Partnership</h1>
                  </div>
                  <p className="text-muted-foreground max-w-2xl">
                    Fueling Kingdom work through generosity and covenant connection.
                  </p>
              </div>
             </ScrollAnimator>

            <ScrollAnimator>
              <Card className="bg-gradient-to-r from-primary/10 to-transparent">
                  <CardHeader>
                      <CardTitle className="font-headline text-xl font-bold">Our Philosophy of Giving</CardTitle>
                  </CardHeader>
                  <CardContent>
                      <p className="text-muted-foreground">
                          We believe that giving is an act of worship and a vital part of a believer's walk with God. It is not merely a transaction, but a demonstration of faith, love, and our partnership with God in His work on earth. Your generosity empowers us to fulfill the mandate of raising, equipping, and deploying believers for global impact.
                      </p>
                  </CardContent>
              </Card>
            </ScrollAnimator>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {givingWays.map((way, index) => (
                    <ScrollAnimator key={way.title} delay={index * 0.1}>
                      <Card className="text-center flex flex-col items-center p-6">
                          <div className="bg-muted rounded-full p-4">
                              {way.icon}
                          </div>
                          <CardHeader className="p-2">
                              <CardTitle>{way.title}</CardTitle>
                          </CardHeader>
                          <CardContent className="flex-grow">
                              <p className="text-muted-foreground">{way.description}</p>
                          </CardContent>
                          <div className="p-6 pt-0">
                              <Button asChild>
                                  <Link href="/signup">{way.cta}</Link>
                              </Button>
                          </div>
                      </Card>
                    </ScrollAnimator>
                ))}
            </div>

            <ScrollAnimator>
              <Card>
                  <CardHeader className="flex flex-row items-center gap-4">
                      <Briefcase className="h-8 w-8 text-accent" />
                      <div>
                          <CardTitle>Corporate & Ministry Partnerships</CardTitle>
                          <CardDescription>
                              We invite businesses and other ministries to partner with us to advance the Kingdom. Let's collaborate on projects, events, and initiatives that bring transformation.
                          </CardDescription>
                      </div>
                  </CardHeader>
                  <CardContent>
                      <Button asChild>
                          <Link href="/contact">Contact Us for Partnership</Link>
                      </Button>
                  </CardContent>
              </Card>
            </ScrollAnimator>

        </div>
    )
}
