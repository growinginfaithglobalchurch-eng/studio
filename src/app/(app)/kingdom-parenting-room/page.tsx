
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Home, BookOpen, CheckCircle, Droplets, Heart } from "lucide-react";

const contents = [
    "Introduction: A New Vision for Parenting",
    "The Kingdom Mandate: Parenting from God’s Perspective",
    "God as Our Model: Understanding Divine Fatherhood",
    "Establishing Kingdom Values in Your Home",
    "Discipleship at Home: Teaching Your Children the Ways of God",
    "The Power of Prayer in Parenting",
    "Discipline: Correcting with Kingdom Principles",
    "Grace and Truth: Balancing Love and Authority",
    "Empowering Your Children for Kingdom Living",
    "Raising Kingdom Leaders: Developing a Legacy of Faith",
    "Navigating Challenges: Parenting in a Broken World",
    "Practical Tips for Everyday Kingdom Parenting",
    "Conclusion: A Vision for the Future of Our Families"
];

const Section1Content = {
    title: "THE KINGDOM MANDATE: Parenting From God’s Perspective",
    points: [
        {
            title: "The Origin of Parenting: God’s Design",
            content: "From the very beginning, God instituted the family as a primary means by which His Kingdom would be established on Earth. In Genesis 1:28, God gave Adam and Eve a clear mandate: “Be fruitful and increase in number; fill the Earth and subdue it.” This command was not merely about population growth, but about the divine stewardship of the Earth. God’s design for parenting goes beyond merely raising children to be good citizens or successful individuals. It is about raising children who will carry the light of God’s Kingdom into the world.",
        },
        {
            title: "The Kingdom Mandate: Multiplying God’s Image",
            content: "In Genesis 1:26–27, God created humanity in His image. Parenting, therefore, is about multiplying God’s image in the world. Our children are not merely extensions of ourselves; they are bearers of God’s image, created with unique gifts and purposes.",
        },
        {
            title: "The Role of Parents in the Kingdom of God",
            content: "Ephesians 6:4 instructs parents to bring children up in the training and instruction of the Lord. Parents are both stewards and spiritual leaders, called to model Kingdom living.",
        },
        {
            title: "Parenting with Purpose: Raising Kingdom Ambassadors",
            content: "Children are called to be salt and light (Matthew 5:13–16). Parenting from God’s perspective prepares children for eternity, not just earthly success.",
        },
        {
            title: "The Power of Generational Influence",
            content: "Psalm 78:4–7 emphasizes teaching future generations the works of God. Kingdom parenting builds a legacy of faith that transcends generations.",
        },
        {
            title: "The Kingdom’s Empowering Grace",
            content: "Parenting is empowered by God’s grace. John 15:5 reminds us that fruitfulness flows from abiding in Christ.",
        }
    ]
}

const Section2Content = {
    title: "GOD AS OUR MODEL: Understanding Divine Fatherhood",
    intro: "God is the perfect Father. His love, provision, guidance, discipline, presence, and unconditional grace form the model for Kingdom parenting.",
    points: [
        { title: "God’s Heart as a Father", content: "God lavishes love on His children (1 John 3:1)." },
        { title: "God’s Provision", content: "God meets physical, emotional, and spiritual needs (Matthew 6:11; 7:11)." },
        { title: "God’s Guidance", content: "God leads His children with wisdom and truth (Proverbs 3:5–6)." },
        { title: "God’s Discipline", content: "Discipline flows from love (Hebrews 12:6; Proverbs 13:24)." },
        { title: "God’s Presence", content: "God is always near (Psalm 139:7)." },
        { title: "God’s Unconditional Love", content: "Nothing separates us from His love (Romans 8:38–39)." },
    ],
    conclusion: "By reflecting God’s fatherhood, parents help children understand their identity as children of God."
};


export default function KingdomParentingPage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center">
                <h1 className="text-3xl font-headline font-bold text-foreground">KINGDOM PARENTING</h1>
                <p className="mt-2 text-lg text-muted-foreground">By Joseph Tryson</p>
                <p className="mt-1 text-sm text-muted-foreground">©2025</p>
            </div>

            <Card>
                <CardHeader><CardTitle>CONTENTS</CardTitle></CardHeader>
                <CardContent>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                        {contents.map((item, index) => (
                             <li key={index} className="flex items-center gap-3">
                                <span className="text-accent font-bold">{index + 1}.</span>
                                <span className="text-muted-foreground">{item}</span>
                            </li>
                        ))}
                    </ul>
                </CardContent>
            </Card>
            
             <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">Introduction: A New Vision for Parenting</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 prose prose-invert max-w-none prose-p:text-muted-foreground">
                    <p>Parenting is one of the most profound and influential callings entrusted to human beings. Yet, in today’s fast-paced, often chaotic world, it can feel like an overwhelming responsibility. From balancing work, relationships, and personal goals to navigating the complexities of social media, technology, and education, parents today face a constant barrage of challenges. The pressure to raise children who are successful, moral, and well-adjusted can seem daunting.</p>
                    <p>But what if there was another way to approach parenting—a way that’s not just about surviving the journey, but about fulfilling a higher, eternal purpose?</p>
                    <p>Welcome to Kingdom Parenting—a transformative approach to raising children with the principles of God’s Kingdom at the forefront. This book is about redefining how we view parenting, not just as a task or a responsibility but as a divine mandate.</p>
                    <p>In the pages that follow, you will discover that parenting, when viewed through the lens of God's Kingdom, is far more than just a means of managing behavior or instilling good manners. It’s about shaping hearts, minds, and futures for the glory of God.</p>
                    <p>In God’s Kingdom, the family is foundational. From the very beginning, God established the family unit as the place where His character, His values, and His mission would be passed down from generation to generation. Deuteronomy 6:6–7 teaches us to impress God’s commandments on our children, talking about them when we sit at home, walk along the road, lie down, and get up.</p>
                    <p>Parenting in the Kingdom isn’t about fitting God into our lives when convenient; it’s about making our homes and families the center of spiritual formation and godly influence.</p>
                    <p>This book is for parents who long to raise children who know God, love Him, and live out His purposes. Whether you are a new parent, a seasoned one, or a grandparent looking to impact future generations, Kingdom Parenting offers a blueprint for raising children who not only succeed in life but thrive in God’s will.</p>
                    <p>The world is full of voices telling us how to parent. But God has given us a better way—the way of His Kingdom. It’s a way of grace, truth, love, and purpose.</p>
                    <p>As we embark on this journey together, let us open our hearts to God’s Word and His wisdom for parenting. Let’s set aside the pressures of worldly success and embrace the Kingdom vision of raising children who are rooted in the love of Christ and destined to impact the world for His glory.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">SECTION 1: {Section1Content.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    {Section1Content.points.map(point => (
                        <div key={point.title}>
                            <h3 className="font-bold text-lg text-foreground">{point.title}</h3>
                            <p className="text-muted-foreground mt-1">{point.content}</p>
                        </div>
                    ))}
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">SECTION 2: {Section2Content.title}</CardTitle>
                    <CardDescription>{Section2Content.intro}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                        {Section2Content.points.map(point => (
                            <li key={point.title}><span className="font-semibold text-foreground">{point.title}:</span> {point.content}</li>
                        ))}
                    </ul>
                    <p className="text-muted-foreground italic pt-4">{Section2Content.conclusion}</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="font-headline text-2xl">SECTION 3: ESTABLISHING KINGDOM VALUES IN YOUR HOME</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">As parents, we are the primary stewards of the environment in which our children are raised. The values we instill during formative years shape who they become. Kingdom values reflect God’s heart and must be intentionally cultivated in the home.</p>
                </CardContent>
            </Card>

        </div>
    );
}
