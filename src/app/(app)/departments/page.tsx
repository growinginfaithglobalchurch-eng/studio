
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { departments, Department } from "@/lib/data";
import { Handshake, UserPlus, Music, Music2, Video, Heart, Wrench, DollarSign, HeartHandshake, Baby, PenSquare, Shield, Users, Briefcase } from "lucide-react";
import React from "react";

const iconMap: { [key: string]: React.ReactNode } = {
  'Music': <Music className="h-6 w-6 text-accent" />,
  'Handshake': <Handshake className="h-6 w-6 text-accent" />,
  'Music2': <Music2 className="h-6 w-6 text-accent" />,
  'Video': <Video className="h-6 w-6 text-accent" />,
  'Heart': <Heart className="h-6 w-6 text-accent" />,
  'Wrench': <Wrench className="h-6 w-6 text-accent" />,
  'Briefcase': <Briefcase className="h-6 w-6 text-accent" />,
  'DollarSign': <DollarSign className="h-6 w-6 text-accent" />,
  'HeartHandshake': <HeartHandshake className="h-6 w-6 text-accent" />,
  'Baby': <Baby className="h-6 w-6 text-accent" />,
  'PenSquare': <PenSquare className="h-6 w-6 text-accent" />,
  'Shield': <Shield className="h-6 w-6 text-accent" />,
  'Users': <Users className="h-6 w-6 text-accent" />,
};


export default function DepartmentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <Handshake className="h-8 w-8 text-accent" />
          <h1 className="text-3xl font-headline font-bold text-foreground">
            Church Departments
          </h1>
        </div>
        <p className="text-muted-foreground max-w-2xl">
          Find your place to serve and grow. Join a department to use your gifts for God's glory.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {departments.map((dept: Department) => (
          <Card key={dept.name} className="flex flex-col">
            <CardHeader>
                <div className="flex items-start gap-4">
                    {iconMap[dept.icon]}
                    <div>
                        <CardTitle className="font-headline text-xl">{dept.name}</CardTitle>
                        <CardDescription className="mt-1">{dept.description}</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="flex-grow" />
            <div className="p-6 pt-0">
                <Button className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Join Department
                </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
