
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Download, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ScrollAnimator } from "@/components/scroll-animator";

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

    const handleDownload = (cert: typeof userCertificates[0]) => {
        const certificateHTML = `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>${cert.title}</title>
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Noto+Serif:wght@400;700&family=Playfair+Display:wght@700&display=swap');
                    @page {
                        size: A4 landscape;
                        margin: 0;
                    }
                    body {
                        margin: 0;
                        padding: 0;
                        font-family: 'Noto Serif', serif;
                        background-color: #f0f0f0;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        min-height: 100vh;
                    }
                    .certificate-container {
                        width: 297mm;
                        height: 210mm;
                        background-color: #0d1117;
                        color: #e6e6e6;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        box-shadow: 0 0 10px rgba(0,0,0,0.5);
                    }
                    .certificate-border {
                        width: calc(100% - 40px);
                        height: calc(100% - 40px);
                        border: 2px solid #FFD700;
                        padding: 30px;
                        display: flex;
                        flex-direction: column;
                        justify-content: space-between;
                        text-align: center;
                        box-sizing: border-box;
                    }
                    .header {
                        font-family: 'Playfair Display', serif;
                        font-size: 48px;
                        color: #FFD700;
                        margin: 0;
                    }
                    .subtitle {
                        font-size: 24px;
                        margin-top: 10px;
                    }
                    .presented-to {
                        font-size: 18px;
                        margin-top: 40px;
                    }
                    .recipient-name {
                        font-family: 'Playfair Display', serif;
                        font-size: 40px;
                        color: #FFD700;
                        margin: 10px 0;
                        border-bottom: 1px solid #FFD700;
                        padding-bottom: 5px;
                        display: inline-block;
                    }
                    .reason {
                        font-size: 16px;
                        margin: 20px auto;
                        max-width: 80%;
                    }
                    .footer {
                        display: flex;
                        justify-content: space-around;
                        align-items: flex-end;
                        margin-top: 50px;
                    }
                    .signature-line {
                        border-top: 1px solid #e6e6e6;
                        width: 200px;
                        padding-top: 5px;
                        font-size: 14px;
                    }
                </style>
            </head>
            <body>
                <div class="certificate-container">
                    <div class="certificate-border">
                        <div>
                            <h1 class="header">Certificate of Completion</h1>
                            <h2 class="subtitle">${cert.issuingAuthority}</h2>
                        </div>
                        <div>
                            <p class="presented-to">is hereby granted to</p>
                            <p class="recipient-name">[Your Name Here]</p>
                            <p class="reason">For the successful completion of the</p>
                            <h3 style="font-size: 28px; color: #FFD700; margin: 0;">${cert.title}</h3>
                        </div>
                        <div class="footer">
                            <div class="signature-line">
                                <p>The Bondservant of Christ, Joseph Tryson</p>
                                <p>Founder</p>
                            </div>
                            <div class="signature-line">
                                <p>${new Date(cert.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                <p>Date</p>
                            </div>
                        </div>
                    </div>
                </div>
                 <script>
                    window.onload = () => {
                        window.print();
                    };
                </script>
            </body>
            </html>
        `;

        const blob = new Blob([certificateHTML.trim()], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        URL.revokeObjectURL(url);
        
        toast({
            title: "Generating Certificate",
            description: `Your certificate for "${cert.title}" is opening in a new tab.`,
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
      <ScrollAnimator>
        <div>
          <div className="flex items-center gap-3 mb-2">
              <Award className="h-8 w-8 text-accent" />
              <h1 className="text-3xl font-headline font-bold text-foreground">Your Certificates</h1>
          </div>
          <p className="text-muted-foreground max-w-2xl">
            View and share the certificates you've earned on your spiritual journey.
          </p>
        </div>
      </ScrollAnimator>
      
      {userCertificates.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2">
            {userCertificates.map((cert, index) => (
                <ScrollAnimator key={cert.id} delay={index * 0.1}>
                  <Card className="flex flex-col">
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
                          <Button className="w-full" onClick={() => handleDownload(cert)}>
                              <Download className="mr-2 h-4 w-4" /> Download
                          </Button>
                          <Button variant="outline" className="w-full text-white" onClick={() => handleShare(cert.title)}>
                              <Share2 className="mr-2 h-4 w-4" /> Share
                          </Button>
                      </div>
                  </Card>
                </ScrollAnimator>
            ))}
        </div>
      ) : (
        <ScrollAnimator>
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
        </ScrollAnimator>
      )}
    </div>
  )
}
