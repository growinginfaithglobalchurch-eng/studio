
'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Handshake, UserPlus, Eye, CheckCircle, Loader2 } from "lucide-react";
import Link from 'next/link';
import { slugify } from '@/lib/utils';
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/lib/supabase';
import { iconMap } from './page';

type Department = {
  id: number;
  name: string;
  description: string;
  icon: string;
  isMember?: boolean;
}

export default function DepartmentsPage() {
  const { toast } = useToast();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from('departments').select('*');
        if (error) {
            toast({
                variant: 'destructive',
                title: 'Error fetching departments',
                description: error.message,
            });
        } else {
            const departmentsWithState = data.map(d => ({ ...d, isMember: false }));
            setDepartments(departmentsWithState);
        }
        setIsLoading(false);
    };
    fetchDepartments();
  }, [toast]);

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
            {isLoading ? (
                <div className="flex justify-center items-center py-10"><Loader2 className="h-8 w-8 animate-spin text-accent" /></div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
                  {allDepartments.map((dept: Department) => (
                    <Card key={dept.name} className="flex flex-col">
                      <CardHeader>
                          <div className="flex items-start gap-4">
                              {iconMap[dept.icon] || <Briefcase className="h-6 w-6 text-accent" />}
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
            )}
        </TabsContent>
         <TabsContent value="my-departments">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-4">
               {myDepartments.length > 0 ? myDepartments.map((dept) => (
                 <Card key={dept.name} className="flex flex-col">
                    <CardHeader>
                        <div className="flex items-start gap-4">
                            {iconMap[dept.icon] || <Briefcase className="h-6 w-6 text-accent" />}
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
