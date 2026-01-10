
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookCopy, FileText, Goal, MessageCircleHeart } from 'lucide-react';

const resourceCategories = [
  {
    icon: <BookCopy className="h-6 w-6 text-accent" />,
    title: 'E-Books & Manuals',
    description: 'In-depth teachings and practical guides on spiritual growth and ministry.',
    cta: 'Browse E-Books',
  },
  {
    icon: <FileText className="h-6 w-6 text-accent" />,
    title: 'Prophetic Prayer Points',
    description: 'Targeted prayer points and declarations to align with God\'s will.',
    cta: 'View Prayer Points',
  },
  {
    icon: <Goal className="h-6 w-6 text-accent" />,
    title: 'Vision & Destiny Tools',
    description: 'Resources to help you discover and walk in your divine purpose.',
    cta: 'Explore Tools',
  },
  {
    icon: <MessageCircleHeart className="h-6 w-6 text-accent" />,
    title: 'Special Messages',
    description: 'Exclusive messages from The Bondservant of Christ Joseph Tryson & Prophetess Norah Tryson.',
    cta: 'Listen Now',
  },
];

export default function ResourcesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-headline font-bold text-foreground">
          Prophetic Resources Library
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          A revelation-driven resource vault to equip you for a life of purpose and power.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
        {resourceCategories.map((category) => (
          <Card key={category.title} className="flex flex-col">
            <CardHeader className="flex flex-row items-start gap-4">
              {category.icon}
              <div className="flex-grow">
                <CardTitle>{category.title}</CardTitle>
                <CardDescription className="mt-1">{category.description}</CardDescription>
              </div>
            </CardHeader>
             <CardContent className="flex-grow" />
            <div className="p-6 pt-0">
              <Button variant="outline" className="text-white">{category.cta}</Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
