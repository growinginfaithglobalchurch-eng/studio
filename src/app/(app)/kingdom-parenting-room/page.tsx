
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
                <CardContent className="space-y-4 prose prose-invert max-w-none prose-p:text-muted-foreground">
                    <p>As parents, we are the primary stewards of the environment in which our children are raised. The values we establish in our homes shape the beliefs, behaviors, and spiritual direction of our children. A home is never neutral—it is either intentionally formed by Kingdom values or unconsciously shaped by worldly influences.</p>
                    <p>Kingdom values are the principles that reflect God’s heart, His character, and His priorities. Romans 14:17 reminds us that “the kingdom of God is not a matter of eating and drinking, but of righteousness, peace, and joy in the Holy Spirit.” These values must be more than ideas; they must be lived out daily within the family.</p>
                    <h4 className="text-lg font-bold text-foreground">The Home as a Kingdom Environment</h4>
                    <p>God designed the home to be the first place where faith is modeled and practiced. Before churches, schools, or ministries influence a child, the home sets the foundation. When Kingdom values are embedded into daily family life, children grow up with a clear understanding of who God is and how His Kingdom operates.</p>
                    <h4 className="text-lg font-bold text-foreground">Modeling Before Teaching</h4>
                    <p>Children learn values more from what they observe than from what they are told. Parents must live out integrity, humility, forgiveness, prayer, and love consistently. When parents apologize, forgive, and seek God openly, children learn that faith is real and active.</p>
                    <h4 className="text-lg font-bold text-foreground">Teaching Values Through Daily Life</h4>
                    <p>Everyday moments—mealtimes, conversations, conflicts, and celebrations—become opportunities to teach Kingdom values. Deuteronomy 6:6–7 emphasizes teaching God’s ways naturally throughout daily routines. This intentional approach builds spiritual depth in children.</p>
                    <h4 className="text-lg font-bold text-foreground">Guarding the Culture of the Home</h4>
                    <p>Parents must be vigilant about what influences enter the home. Media, friendships, and ideologies shape values subtly. Establishing clear boundaries protects the spiritual atmosphere of the household and reinforces God’s truth.</p>
                    <h4 className="text-lg font-bold text-foreground">Conclusion</h4>
                    <p>When Kingdom values are firmly established at home, children grow with a strong moral compass and spiritual confidence. A Kingdom-centered home becomes a place where God’s presence is evident and His purposes are nurtured.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="font-headline text-2xl">SECTION 4: DISCIPLESHIP AT HOME: Teaching Your Children the Ways of God</CardTitle></CardHeader>
                <CardContent className="space-y-4 prose prose-invert max-w-none prose-p:text-muted-foreground">
                    <p>Discipleship begins in the home. Before children learn doctrine, they learn devotion by observing their parents’ relationship with God. Jesus commanded His followers to make disciples, and this mission starts with our own children.</p>
                    <h4 className="text-lg font-bold text-foreground">The Home as the First Discipleship Center</h4>
                    <p>Parents are the first pastors, teachers, and disciplers in a child’s life. Teaching Scripture, prayer, worship, and obedience must be integrated into family life.</p>
                    <h4 className="text-lg font-bold text-foreground">Teaching God’s Word</h4>
                    <p>Regular exposure to Scripture builds spiritual understanding. Reading Bible stories, memorizing verses, and discussing biblical principles help children develop a biblical worldview.</p>
                    <h4 className="text-lg font-bold text-foreground">Prayer and Worship as a Family</h4>
                    <p>Family prayer cultivates dependence on God. Worship teaches children reverence and gratitude. These practices create spiritual unity and strengthen faith.</p>
                    <h4 className="text-lg font-bold text-foreground">Leading by Example</h4>
                    <p>Discipleship is most effective when parents live what they teach. Children imitate authenticity more than instruction.</p>
                    <h4 className="text-lg font-bold text-foreground">Conclusion</h4>
                    <p>A discipled child grows into a mature believer who understands God’s ways and walks faithfully with Him.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="font-headline text-2xl">SECTION 5: THE POWER OF PRAYER IN PARENTING</CardTitle></CardHeader>
                <CardContent className="space-y-4 prose prose-invert max-w-none prose-p:text-muted-foreground">
                    <p>Prayer is one of the greatest gifts God has given parents. Through prayer, parents partner with God in shaping their children’s lives.</p>
                    <h4 className="text-lg font-bold text-foreground">Prayer as Spiritual Covering</h4>
                    <p>Prayer protects, guides, and strengthens children spiritually. Parents intercede for their children’s identity, purpose, and future.</p>
                    <h4 className="text-lg font-bold text-foreground">Teaching Children to Pray</h4>
                    <p>When children learn to pray, they develop a personal relationship with God. Prayer becomes a source of comfort and strength throughout life.</p>
                    <h4 className="text-lg font-bold text-foreground">Trusting God Through Prayer</h4>
                    <p>Parenting requires surrender. Prayer teaches parents to trust God with what they cannot control.</p>
                    <h4 className="text-lg font-bold text-foreground">Conclusion</h4>
                    <p>Praying parents raise children who understand dependence on God and experience His faithfulness firsthand.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="font-headline text-2xl">SECTION 6: DISCIPLINE: Correcting WITH Kingdom Principles</CardTitle></CardHeader>
                <CardContent className="space-y-4 prose prose-invert max-w-none prose-p:text-muted-foreground">
                    <p>Discipline is a vital part of Kingdom parenting. Biblical discipline is not punishment but loving correction aimed at character formation.</p>
                    <h4 className="text-lg font-bold text-foreground">God’s Model of Discipline</h4>
                    <p>Hebrews 12:6 shows that discipline is an expression of love. It guides children toward righteousness and maturity.</p>
                    <h4 className="text-lg font-bold text-foreground">Discipline with Purpose</h4>
                    <p>Correction must be consistent, fair, and motivated by love—not anger.</p>
                    <h4 className="text-lg font-bold text-foreground">Restoration After Discipline</h4>
                    <p>True discipline restores relationship and teaches responsibility. It should always point children back to grace.</p>
                    <h4 className="text-lg font-bold text-foreground">Conclusion</h4>
                    <p>Kingdom discipline produces self-control, wisdom, and godly character.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="font-headline text-2xl">SECTION 7: GRACE AND TRUTH: Balancing Love and Authority</CardTitle></CardHeader>
                <CardContent className="space-y-4 prose prose-invert max-w-none prose-p:text-muted-foreground">
                    <p>Jesus modeled perfect balance—full of grace and truth (John 1:14). Parents must do the same.</p>
                    <h4 className="text-lg font-bold text-foreground">Avoiding Extremes</h4>
                    <p>Too much authority without grace leads to fear; too much grace without truth leads to irresponsibility.</p>
                    <h4 className="text-lg font-bold text-foreground">Leading with Love</h4>
                    <p>Love creates security. Authority provides direction. Together, they produce healthy development.</p>
                    <h4 className="text-lg font-bold text-foreground">Conclusion</h4>
                    <p>Balanced parenting reflects Christ and builds trust, respect, and obedience in children.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="font-headline text-2xl">SECTION 8: EMPOWERING YOUR CHILDREN FOR KINGDOM LIVING</CardTitle></CardHeader>
                <CardContent className="space-y-4 prose prose-invert max-w-none prose-p:text-muted-foreground">
                    <p>Children are not merely future leaders—they are active participants in God’s Kingdom now.</p>
                    <h4 className="text-lg font-bold text-foreground">Affirming Identity and Purpose</h4>
                    <p>Parents must speak life, affirm gifts, and encourage calling.</p>
                    <h4 className="text-lg font-bold text-foreground">Teaching Responsibility and Faith</h4>
                    <p>Empowerment involves allowing children to grow through responsibility and faith-filled decisions.</p>
                    <h4 className="text-lg font-bold text-foreground">Conclusion</h4>
                    <p>Empowered children grow into confident believers who live boldly for God’s Kingdom.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="font-headline text-2xl">SECTION 9: RAISING KINGDOM LEADERS: Developing a Legacy of Faith</CardTitle></CardHeader>
                <CardContent className="space-y-4 prose prose-invert max-w-none prose-p:text-muted-foreground">
                    <p>Leadership begins at home. Kingdom leaders are shaped by character, humility, and service.</p>
                    <h4 className="text-lg font-bold text-foreground">Servant Leadership</h4>
                    <p>Jesus taught that true leadership is service.</p>
                    <h4 className="text-lg font-bold text-foreground">Generational Legacy</h4>
                    <p>Faith passed down intentionally creates lasting impact beyond one generation.</p>
                    <h4 className="text-lg font-bold text-foreground">Conclusion</h4>
                    <p>Kingdom parenting produces leaders who influence the world for Christ.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="font-headline text-2xl">SECTION 10: NAVIGATING CHALLENGES: Parenting in a Broken World</CardTitle></CardHeader>
                <CardContent className="space-y-4 prose prose-invert max-w-none prose-p:text-muted-foreground">
                    <p>Parents must guide children through cultural confusion, moral challenges, and spiritual opposition.</p>
                    <h4 className="text-lg font-bold text-foreground">Teaching Discernment</h4>
                    <p>Children must learn to recognize truth amid deception.</p>
                    <h4 className="text-lg font-bold text-foreground">Standing Firm in Faith</h4>
                    <p>Parents model resilience by trusting God through difficulty.</p>
                    <h4 className="text-lg font-bold text-foreground">Conclusion</h4>
                    <p>God’s truth equips families to overcome the brokenness of the world.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="font-headline text-2xl">SECTION 11: PRACTICAL TIPS FOR EVERYDAY KINGDOM PARENTING</CardTitle></CardHeader>
                <CardContent className="space-y-4 prose prose-invert max-w-none prose-p:text-muted-foreground">
                    <p>Kingdom parenting is lived daily, not occasionally.</p>
                    <h4 className="text-lg font-bold text-foreground">Consistency and Presence</h4>
                    <p>Time, attention, and consistency build strong family bonds.</p>
                    <h4 className="text-lg font-bold text-foreground">Growing as Parents</h4>
                    <p>Parents must continue growing spiritually to lead effectively.</p>
                    <h4 className="text-lg font-bold text-foreground">Conclusion</h4>
                    <p>Faithfulness in daily practices produces long-term spiritual fruit.</p>
                </CardContent>
            </Card>

            <Card>
                <CardHeader><CardTitle className="font-headline text-2xl">SECTION 12: CONCLUSION: A Vision for the Future of Our Families</CardTitle></CardHeader>
                <CardContent className="space-y-4 prose prose-invert max-w-none prose-p:text-muted-foreground">
                    <p>Kingdom parenting is a sacred calling with eternal impact. Parents are entrusted with shaping lives that reflect God’s image and advance His Kingdom.</p>
                    <p>As parents commit to God’s ways, families become centers of light, hope, and transformation. The seeds planted today will bear fruit for generations.</p>
                    <p>May God empower every parent to raise children who love Him, serve Him, and live boldly for His Kingdom.</p>
                    <p>Amen.</p>
                </CardContent>
            </Card>
        </div>
    );
}
