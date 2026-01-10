
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Store, Star, Check } from "lucide-react";

const subscriptionPlans = [
    {
        title: "Weekly Access",
        price: "$4.99",
        period: "/week",
        description: "Perfect for trying out our library or for short-term access.",
        features: ["Access to all content", "Cancel anytime"],
    },
    {
        title: "Monthly Access",
        price: "$14.99",
        period: "/month",
        description: "Our most popular plan for continuous spiritual growth.",
        features: ["Access to all content", "Cancel anytime", "Save 25% vs weekly"],
        popular: true,
    },
    {
        title: "Quarterly Access",
        price: "$39.99",
        period: "/3 months",
        description: "A great option for committed learners over a season.",
        features: ["Access to all content", "Cancel anytime", "Save over 30% vs weekly"],
    },
    {
        title: "Biannual Access",
        price: "$79.99",
        period: "/6 months",
        description: "Lock in your access for half a year and save.",
        features: ["Access to all content", "Cancel anytime", "Save over 35% vs weekly"],
    },
    {
        title: "Yearly Access",
        price: "$149.99",
        period: "/year",
        description: "The best value for a full year of unlimited spiritual nourishment.",
        features: ["Access to all content", "Cancel anytime", "Save over 40% vs weekly", "Priority support"],
    }
]

export default function StorePage() {
    return (
        <div className="space-y-8">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <Store className="h-8 w-8 text-accent" />
                    <h1 className="text-3xl font-headline font-bold text-foreground">Content Library Store</h1>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                    Unlock unlimited access to our entire library of teachings, sermons, conferences, and more.
                </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {subscriptionPlans.map(plan => (
                    <Card key={plan.title} className={`flex flex-col ${plan.popular ? 'border-primary border-2' : ''}`}>
                         {plan.popular && (
                            <div className="flex justify-center -mt-4">
                                <div className="bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-2">
                                    <Star className="h-4 w-4"/>
                                    Most Popular
                                </div>
                            </div>
                        )}
                        <CardHeader className="text-center">
                            <CardTitle className="text-2xl font-headline">{plan.title}</CardTitle>
                            <CardDescription>{plan.description}</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-grow text-center">
                           <div className="flex justify-center items-baseline">
                             <p className="text-4xl font-bold">{plan.price}</p>
                             <p className="text-muted-foreground">{plan.period}</p>
                           </div>
                           <ul className="mt-6 space-y-3 text-left">
                                {plan.features.map(feature => (
                                    <li key={feature} className="flex items-center gap-3">
                                        <div className="bg-green-500/20 text-green-400 rounded-full p-1">
                                            <Check className="h-4 w-4" />
                                        </div>
                                        <span className="text-muted-foreground">{feature}</span>
                                    </li>
                                ))}
                           </ul>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" size="lg">Subscribe Now</Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>

        </div>
    )
}
