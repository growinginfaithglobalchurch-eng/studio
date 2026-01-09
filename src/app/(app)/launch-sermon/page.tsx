
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollText, Sparkles, Printer } from "lucide-react";

export default function LaunchSermonPage() {
  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <div className="flex items-center gap-3 mb-2">
            <Sparkles className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">Launch Sermon & Dedication Prayer</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          A sermon script and prayer for the official launch and dedication of the Faith Connect Global platform.
        </p>
      </div>

      <div className="flex justify-end">
          <Button variant="outline" onClick={() => window.print()}>
              <Printer className="mr-2 h-4 w-4" />
              Print / Save as PDF
          </Button>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-start gap-4">
            <ScrollText className="h-8 w-8 text-accent flex-shrink-0" />
            <div>
                <CardTitle className="font-headline text-2xl">Sermon: "The Digital Altar: A New Era of Faith"</CardTitle>
                <CardDescription>By The Bondservant of Christ, Joseph Tryson</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4 prose prose-invert prose-p:text-muted-foreground prose-headings:text-foreground">
          <h3 className="font-headline font-bold">Introduction: A Divine Appointment</h3>
          <p>
            Beloved, we are gathered here not by coincidence, but by a divine appointment. We stand at the threshold of a new era, a digital reformation where God is raising up a global altar. An altar not made of stone or wood, but of interconnected hearts, crying out for more of Him. Welcome to Faith Connect Global.
          </p>

          <h3 className="font-headline font-bold">1. The Vision: A Global Upper Room</h3>
          <p>
            In the book of Acts, the disciples gathered in an upper room, and the Holy Spirit fell. They were united in purpose and prayer. This platform is our global upper room. It is a place where believers from every tribe, tongue, and nation can gather. It is a place to be equipped, to be sharpened, and to be set ablaze for the work of the Kingdom. Our vision is to see a global community of empowered believers, walking in the fullness of their identity and authority in Christ.
          </p>

           <h3 className="font-headline font-bold">2. The Mission: Raise, Equip, Deploy</h3>
          <p>
            Our mission is clear: to raise, equip, and deploy believers for global impact. This is more than a website; it is a spiritual ecosystem. It's a training ground where faith is activated. It's a resource hub where revelation is unlocked. It is a network where divine connections are forged for Kingdom assignments. We are moving from passive Christianity to active, world-changing faith.
          </p>

           <h3 className="font-headline font-bold">3. The Mandate: Turning Faith into Lifestyle</h3>
          <p>
            God has given us a mandate to turn faith into a lifestyle. It's not just for Sunday mornings. It's for your marketplace, your home, your personal life. This platform will provide you with the tools—the teachings, the mentorship, the community—to live a life that is a constant testament to the power and presence of God. We are called to be living epistles, read by all men.
          </p>

          <h3 className="font-headline font-bold">Conclusion: Your Invitation</h3>
          <p>
            So today, we don't just launch a platform; we dedicate a digital territory to the Lord. We consecrate this space for His glory. And we invite you, not just to join, but to partner. Partner with God and with us in this great commission. Your journey of deeper faith and global impact starts now.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
             <div className="flex items-start gap-4">
                <Sparkles className="h-8 w-8 text-accent flex-shrink-0" />
                <div>
                    <CardTitle className="font-headline text-2xl">Prayer of Dedication & Commissioning</CardTitle>
                    <CardDescription>To be prayed corporately</CardDescription>
                </div>
            </div>
        </CardHeader>
        <CardContent className="space-y-4 prose prose-invert prose-p:text-muted-foreground">
            <p>
                Father, in the mighty name of Jesus, we come before Your throne of grace. We thank You for Your vision, for Your wisdom, and for Your faithfulness in bringing this platform, Faith Connect Global, to fruition.
            </p>
            <p>
                Today, we dedicate this digital space to You. We consecrate every line of code, every piece of content, every connection made. We declare that this is holy ground, an altar for Your glory. Let Your presence saturate this platform, from the homepage to the deepest courses.
            </p>
             <p>
                We decree that this is a place of encounter. Let every user who logs in feel the tangible presence of the Holy Spirit. Let it be a place of salvation, healing, deliverance, and impartation. Let chains be broken, eyes be opened, and destinies be unlocked.
            </p>
             <p>
                We commission every user who engages with this platform. We send them out as ambassadors of Christ, as carriers of Your fire, to impact their homes, communities, and nations. May what is learned here be lived out there, for the expansion of Your Kingdom.
            </p>
             <p>
                We bind every plan of the enemy against this platform. We plead the blood of Jesus over it and declare that no weapon formed against it shall prosper.
            </p>
             <p>
                This is Your work, Lord. And to You, be all the glory, honor, and praise.
            </p>
            <p>
                In Jesus' mighty name we pray,
            </p>
            <p className="font-bold">Amen.</p>
        </CardContent>
      </Card>

    </div>
  );
}
