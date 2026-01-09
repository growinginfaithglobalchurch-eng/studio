'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { courses as initialCourses } from '@/lib/data';
import { GraduationCap, PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

export default function AdminCoursesPage() {
    const { toast } = useToast();
    const [courses, setCourses] = useState(initialCourses);
    const [newCourse, setNewCourse] = useState({
        title: '',
        description: '',
        category: '',
        imageUrl: '',
        imageHint: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewCourse(prev => ({ ...prev, [name]: value }));
    };

    const handleAddCourse = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCourse.title || !newCourse.category) {
            toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please fill out at least title and category.',
            });
            return;
        }
        const newId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
        const newCourseData = {
            id: newId,
            title: newCourse.title,
            description: newCourse.description,
            category: newCourse.category,
            image: {
                id: `course-${newId}`,
                imageUrl: newCourse.imageUrl || 'https://picsum.photos/seed/1/600/400',
                description: newCourse.title,
                imageHint: newCourse.imageHint || 'course material'
            }
        };
        setCourses(prev => [newCourseData, ...prev]);
        setNewCourse({
            title: '',
            description: '',
            category: '',
            imageUrl: '',
            imageHint: ''
        });
        toast({
            title: 'Course Added',
            description: `"${newCourse.title}" has been successfully added.`,
        });
    };

    const handleDeleteCourse = (id: number) => {
        setCourses(prev => prev.filter(course => course.id !== id));
        toast({
            title: 'Course Deleted',
            description: 'The course has been removed.',
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold text-foreground">Manage Courses</h1>
                <p className="text-muted-foreground">
                    Add, edit, or remove courses available on the platform.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <PlusCircle className="h-5 w-5 text-accent" />
                        Add New Course
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddCourse} className="grid gap-6 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="title">Course Title</Label>
                            <Input id="title" name="title" value={newCourse.title} onChange={handleInputChange} placeholder="e.g., Foundations of Faith" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="category">Category</Label>
                            <Input id="category" name="category" value={newCourse.category} onChange={handleInputChange} placeholder="e.g., Spiritual Growth" />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea id="description" name="description" value={newCourse.description} onChange={handleInputChange} placeholder="A brief description of the course..." />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="imageUrl">Image URL</Label>
                            <Input id="imageUrl" name="imageUrl" value={newCourse.imageUrl} onChange={handleInputChange} placeholder="https://... (optional)" />
                        </div>
                         <div className="space-y-2">
                            <Label htmlFor="imageHint">Image AI Hint</Label>
                            <Input id="imageHint" name="imageHint" value={newCourse.imageHint} onChange={handleInputChange} placeholder="e.g., open book" />
                        </div>
                        <div className="md:col-span-2 flex justify-end">
                            <Button type="submit">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Add Course
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <GraduationCap className="h-5 w-5 text-accent" />
                        Existing Courses
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {courses.map(course => (
                        <div key={course.id} className="flex flex-col md:flex-row gap-4 rounded-lg border p-4">
                           {course.image && (
                               <div className="relative w-full md:w-48 h-32 md:h-auto flex-shrink-0 overflow-hidden rounded-md">
                                    <Image src={course.image.imageUrl} alt={course.title} fill className="object-cover" data-ai-hint={course.image.imageHint} />
                               </div>
                           )}
                           <div className="flex-grow">
                                <h3 className="font-bold text-lg text-foreground">{course.title}</h3>
                               <p className="text-sm font-semibold text-accent">{course.category}</p>
                               <p className="text-sm text-muted-foreground mt-2">{course.description}</p>
                           </div>
                           <div className="flex-shrink-0 flex flex-col gap-2">
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteCourse(course.id)}>
                                    <Trash2 className="h-4 w-4" />
                                    <span className="ml-2">Delete</span>
                                </Button>
                           </div>
                        </div>
                    ))}
                </CardContent>
            </Card>

        </div>
    );
}
