
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ClipboardList, Waves, Wind, Sparkles, HandCoins, UserPlus, BookOpen, Mic, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { serviceElements as initialServiceElements } from '@/lib/data';
import { ScrollAnimator } from '@/components/scroll-animator';

const serviceElements = initialServiceElements;

const iconMap: { [key: string]: React.ReactNode } = {
  "Atmosphere": <Waves className="h-6 w-6 text-accent" />,
  "Revelation": <Sparkles className="h-6 w-6 text-accent" />,
  "Impartation": <Wind className="h-6 w-6 text-accent" />,
  "Commissioning": <Users className="h-6 w-6 text-accent" />,
  "Default": <ClipboardList className="h-6 w-6 text-accent" />,
};

const getIcon = (title: string) => {
    if (title.includes('Atmosphere')) return iconMap['Atmosphere'];
    if (title.includes('Revelation')) return iconMap['Revelation'];
    if (title.includes('Impartation')) return iconMap['Impartation'];
    if (title.includes('Closing')) return iconMap['Commissioning'];
    return iconMap['Default'];
}

const parseDetails = (details: string) => {
    return details.split('\n').map(line => {
        const match = line.match(/(.+?)\s\((\d+)\s*mins\)\s*-\s*(.+)/);
        if (match) {
            return { activity: match[1].trim(), duration: match[2], leader: match[3].trim() };
        }
        return null;
    }).filter(Boolean);
}

export default function ServiceProgrammingPage() {
    const { toast } = useToast();

    const handleJoin = () => {
        toast({
            title: "Request to Join Sent!",
            description: "Your request to join the Service Planning Team has been submitted. A team lead will be in touch."
        });
    };

    return (
        <div className="space-y-8">
            <ScrollAnimator>
              <div>
                  <div className="flex items-center gap-3 mb-2">
                      <ClipboardList className="h-8 w-8 text-accent" />
                      <h1 className="text-3xl font-headline font-bold text-foreground">Service Programming & Flow</h1>
                  </div>
                  <p className="text-muted-foreground max-w-2xl">
                      The blueprint for designing and leading a powerful, Spirit-led church service.
                  </p>
              </div>
            </ScrollAnimator>

            <ScrollAnimator>
              <Card className="bg-secondary/30">
                  <CardHeader className="flex-row items-center gap-4">
                      <BookOpen className="h-8 w-8 text-accent" />
                      <div>
                          <CardTitle>The Theology of Service Flow</CardTitle>
                          <CardDescription>
                              A church service is not a collection of random activities, but a spiritual journey. It is intentionally designed to lead people from the outer court (praise) into the Holy of Holies (worship & revelation) and back out to the world (commissioning).
                          </CardDescription>
                      </div>
                  </CardHeader>
              </Card>
            </ScrollAnimator>

            <div className="space-y-8">
                <ScrollAnimator>
                  <h2 className="text-2xl font-headline font-bold">The Four Pillars of Our Service Structure</h2>
                </ScrollAnimator>
                <div className="grid lg:grid-cols-2 gap-6">
                    {serviceElements.map((project, index) => (
                        <ScrollAnimator key={project.title} delay={index * 0.1}>
                          <Card>
                              <CardHeader>
                                  <div className="flex items-center gap-3">
                                      {getIcon(project.title)}
                                      <CardTitle className="font-headline text-xl">{project.title}</CardTitle>
                                  </div>
                                  <CardDescription>{project.description}</CardDescription>
                              </CardHeader>
                              <CardContent>
                                  <h4 className="font-semibold mb-3 text-card-foreground">Key Components:</h4>
                                  <ul className="space-y-2">
                                      {parseDetails(project.details).map((detail, index) => detail && (
                                          <li key={index} className="flex justify-between items-center text-muted-foreground text-sm p-2 bg-secondary/30 rounded-md">
                                              <span>{detail.activity} - <span className="font-semibold text-foreground">{detail.leader}</span></span>
                                              <span className="font-mono text-xs bg-muted px-2 py-1 rounded-md">{detail.duration} mins</span>
                                          </li>
                                      ))}
                                  </ul>
                              </CardContent>
                          </Card>
                        </ScrollAnimator>
                    ))}
                </div>
            </div>
            
            <ScrollAnimator>
              <Card>
                  <CardHeader>
                      <CardTitle className="flex items-center gap-2"><UserPlus className="h-5 w-5 text-accent" />Get Involved</CardTitle>
                      <CardDescription>Do you have a heart for crafting worship experiences or managing the flow of service? We invite you to join the team.</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">We are looking for Service Leaders, Worship Leaders, Production Team members, and Service Planners.</p>
                      <Button className="w-full" onClick={handleJoin}>Join the Service Planning Team</Button>
                  </CardContent>
              </Card>
            </ScrollAnimator>
        </div>
    );
}
