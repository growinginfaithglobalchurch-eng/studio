
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const userCertificates = [
    {
        id: 1,
        title: "Visitor Training Program Graduate",
        issuingAuthority: "Faith Connect Global",
        date: "2024-07-30",
        description: "Successfully completed the mandatory 3-day pre-arrival training, demonstrating understanding of Kingdom culture and protocols.",
    },
    {
        id: 2,
        title: "School of the Prophet Graduate",
        issuingAuthority: "Growing In Faith Global Bible Institute",
        date: "2024-06-15",
        description: "Completed the full curriculum for the School of the Prophet, demonstrating proficiency in discerning and delivering prophetic words with integrity.",
    },
    {
        id: 3,
        title: "Kingdom Leadership Certificate",
        issuingAuthority: "Growing In Faith Global Bible Institute",
        date: "2024-04-20",
        description: "Awarded for completing the Kingdom Leadership track, equipping the believer for service and influence.",
    }
];

export default function CertificatesPage() {
    const { toast } = useToast();

    const handleDownload = (title: string) => {
        toast({
            title: "Downloading Certificate",
            description: `Your certificate for "${title}" is being prepared for download.`,
        });
    };

    const handleShare = (title: string) => {
        navigator.clipboard.writeText(`I just earned my certificate in "${title}" from Faith Connect Global!`);
        toast({
            title: "Link Copied!",
            description: "A shareable link for your certificate has been copied to your clipboard.",
        });
    };


  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
            <Award className="h-8 w-8 text-accent" />
            <h1 className="text-3xl font-headline font-bold text-foreground">Your Certificates</h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          View and share the certificates you've earned on your spiritual journey.
        </p>
      </div>
      
      {userCertificates.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
            {userCertificates.map(cert => (
                <Card key={cert.id} className="flex flex-col">
                    <CardHeader>
                        <div className="flex items-start gap-4">
                            <div className="bg-muted p-3 rounded-full">
                                <Award className="h-6 w-6 text-accent" />
                            </div>
                            <div>
                                <CardTitle className="font-headline text-xl">{cert.title}</CardTitle>
                                <CardDescription>Issued by {cert.issuingAuthority} on {new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                        <p className="text-sm text-muted-foreground">{cert.description}</p>
                    </CardContent>
                    <div className="p-6 pt-0 flex flex-col sm:flex-row gap-2">
                        <Button className="w-full" onClick={() => handleDownload(cert.title)}>
                            <Download className="mr-2 h-4 w-4" /> Download
                        </Button>
                        <Button variant="outline" className="w-full text-white" onClick={() => handleShare(cert.title)}>
                            <Share2 className="mr-2 h-4 w-4" /> Share
                        </Button>
                    </div>
                </Card>
            ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-full text-center py-16">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <div className="mx-auto bg-muted rounded-full p-3">
                        <Award className="h-10 w-10 text-primary" />
                    </div>
                    <CardTitle className="mt-4">No Certificates Earned Yet</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">Complete courses and programs to earn certificates. They will appear here once you've earned them.</p>
                </CardContent>
            </Card>
        </div>
      )}
    </div>
  )
}
