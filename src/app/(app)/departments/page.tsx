

'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { departments as initialDepartments, Department } from "@/lib/data";
import { Handshake, UserPlus, Music, Music2, Video, Heart, Wrench, DollarSign, HeartHandshake, Baby, PenSquare, Shield, Users, Briefcase, Eye, CheckCircle } from "lucide-react";
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';


export const iconMap: { [key: string]: React.ReactNode } = {
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
  const { toast } = useToast();
  const [departments, setDepartments] = useState<Department[]>(initialDepartments);

  const handleJoin = (departmentName: string) => {
     setDepartments(prev => prev.map(d => 
      d.name === departmentName ? { ...d, isMember: !d.isMember } : d
    ));

    const isJoining = !departments.find(d => d.name === departmentName)?.isMember;

    toast({
      title: isJoining ? "Successfully Joined!" : "Left Department",
      description: isJoining 
        ? `You have joined the ${departmentName}.`
        : `You have left the ${departmentName}.`,
    });
  };

  const myDepartments = departments.filter(d => d.isMember);
  const allDepartments = departments;
  
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

       <Tabs defaultValue="discover">
        <TabsList className="grid w-full grid-cols-2 md:w-[400px]">
          <TabsTrigger value="discover"><Eye className="mr-2 h-4 w-4" /> Discover</TabsTrigger>
          <TabsTrigger value="my-departments"><Users className="mr-2 h-4 w-4" /> My Departments ({myDepartments.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="discover">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
              {allDepartments.map((dept: Department) => (
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
                  <div className="p-6 pt-0 flex gap-2">
                      <Button className="w-full" asChild>
                          <Link href={`/departments/${slugify(dept.name)}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View
                          </Link>
                      </Button>
                      <Button className="w-full text-white" variant={dept.isMember ? "secondary" : "outline"} onClick={() => handleJoin(dept.name)}>
                          {dept.isMember ? <CheckCircle className="mr-2 h-4 w-4" /> : <UserPlus className="mr-2 h-4 w-4" />}
                          {dept.isMember ? 'Joined' : 'Join'}
                      </Button>
                  </div>
                </Card>
              ))}
            </div>
        </TabsContent>
         <TabsContent value="my-departments">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
               {myDepartments.length > 0 ? myDepartments.map((dept) => (
                 <Card key={dept.name} className="flex flex-col">
                    <CardHeader>
                        <div className="flex items-start gap-4">
                            {iconMap[dept.icon]}
                            <div>
                                <CardTitle className="font-headline text-xl">{dept.name}</CardTitle>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex-grow" />
                    <div className="p-6 pt-0">
                         <Button className="w-full" asChild>
                          <Link href={`/departments/${slugify(dept.name)}`}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Department Hub
                          </Link>
                      </Button>
                    </div>
                 </Card>
               )) : <p className="text-muted-foreground col-span-full">You haven't joined any departments yet.</p>}
            </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
