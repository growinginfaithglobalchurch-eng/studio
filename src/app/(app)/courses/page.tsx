
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  GraduationCap,
  BookCheck,
  ClipboardList,
  Target,
  BookOpen,
} from 'lucide-react';

const courseCategories = [
  {
    icon: <BookOpen className="h-6 w-6 text-accent" />,
    title: 'Deliverance & Spiritual Warfare',
    description: 'Understand and operate in the authority you have in Christ.',
  },
  {
    icon: <BookOpen className="h-6 w-6 text-accent" />,
    title: 'Foundations of Faith',
    description: 'Solidify your understanding of core biblical doctrines.',
  },
  {
    icon: <BookOpen className="h-6 w-6 text-accent" />,
    title: 'Kingdom Leadership',
    description: 'Develop your influence and lead with a servant\'s heart.',
  },
  {
    icon: <BookOpen className="h-6 w-6 text-accent" />,
    title: 'Prophetic Ministry',
    description: 'Learn to hear God\'s voice and minister with clarity.',
  },
];

const programFeatures = [
    {
        icon: <ClipboardList className="h-6 w-6 text-accent" />,
        title: "Assignments & Assessments",
        description: "Engage with practical assignments and track your understanding through assessments to ensure you're growing.",
    },
     {
        icon: <Target className="h-6 w-6 text-accent" />,
        title: "Mentorship Pathways",
        description: "Connect with seasoned leaders for guidance, accountability, and impartation throughout your learning journey.",
    },
]

export default function CoursesPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <GraduationCap className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-headline font-bold text-foreground">
            Kingdom Learning & Equipping Center
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Integrated with{' '}
          <span className="font-semibold text-primary">
            Growing In Faith Global Bible Institute
          </span>
          .
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Featured Course Categories</CardTitle>
          <CardDescription>
            Begin your journey by exploring our core areas of study.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 md:grid-cols-2">
          {courseCategories.map((cat) => (
            <Card key={cat.title}>
              <CardHeader className="flex flex-row items-center gap-4">
                {cat.icon}
                <CardTitle>{cat.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{cat.description}</p>
              </CardContent>
              <CardFooter>
                 <Button variant="outline">Explore Courses</Button>
              </CardFooter>
            </Card>
          ))}
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="flex flex-col">
          <CardHeader>
            <div className="flex items-center gap-4">
              <BookCheck className="h-8 w-8 text-accent" />
              <div>
                <CardTitle>Certificate & Diploma Programs</CardTitle>
                <CardDescription>
                  Enroll in structured programs for comprehensive, in-depth study.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-grow">
            <ul className="space-y-2 text-sm text-muted-foreground list-disc pl-5">
                <li>Diploma in Prophetic Studies</li>
                <li>Certificate in Kingdom Leadership</li>
                <li>Advanced Deliverance Ministry Program</li>
            </ul>
          </CardContent>
          <CardFooter>
            <Button>View All Programs</Button>
          </CardFooter>
        </Card>
        <div className="space-y-6">
            {programFeatures.map((feat) => (
                 <Card key={feat.title}>
                    <CardHeader className="flex flex-row items-start gap-4">
                        {feat.icon}
                        <div>
                            <CardTitle className="text-lg">{feat.title}</CardTitle>
                            <CardDescription className="mt-1">{feat.description}</CardDescription>
                        </div>
                    </CardHeader>
                 </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
