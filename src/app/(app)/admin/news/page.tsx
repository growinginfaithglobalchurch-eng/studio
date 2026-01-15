
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { newsFeed as initialNewsFeed } from '@/lib/data';
import { Newspaper, PlusCircle, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';

type Reaction = {
    emoji: string;
    count: number;
}

type NewsItem = {
    id: number;
    title: string | null;
    content: string;
    timestamp: string;
    image: { imageUrl: string; imageHint: string; } | null;
    reactions: Reaction[];
};

export default function AdminNewsPage() {
    const { toast } = useToast();
    const [newsItems, setNewsItems] = useState<NewsItem[]>(initialNewsFeed);
    const [newItem, setNewItem] = useState({
        title: '',
        content: '',
        imageUrl: '',
        imageHint: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewItem(prev => ({ ...prev, [name]: value }));
    };

    const handleAddItem = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItem.title && !newItem.content) {
            toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please provide a title or content.',
            });
            return;
        }
        const newId = newsItems.length > 0 ? Math.max(...newsItems.map(a => a.id)) + 1 : 1;
        const newPost: NewsItem = {
            id: newId,
            title: newItem.title,
            content: newItem.content,
            image: newItem.imageUrl ? { imageUrl: newItem.imageUrl, imageHint: newItem.imageHint } : null,
            timestamp: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' }),
            reactions: [],
        };
        setNewsItems(prev => [newPost, ...prev]);
        setNewItem({
            title: '',
            content: '',
            imageUrl: '',
            imageHint: '',
        });
        toast({
            title: 'News Posted',
            description: `"${newItem.title}" has been successfully posted.`,
        });
    };

    const handleDeleteItem = (id: number) => {
        setNewsItems(prev => prev.filter(item => item.id !== id));
        toast({
            title: 'News Item Deleted',
            description: 'The news post has been removed.',
        });
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-headline font-bold text-foreground">Manage Global News</h1>
                <p className="text-muted-foreground">
                    Create, edit, or remove posts from the Global News channel.
                </p>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <PlusCircle className="h-5 w-5 text-accent" />
                        Create News Post
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAddItem} className="grid gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input id="title" name="title" value={newItem.title} onChange={handleInputChange} placeholder="e.g., Global Day of Prayer" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="content">Content</Label>
                            <Textarea id="content" name="content" value={newItem.content} onChange={handleInputChange} placeholder="Write the news post details here..." />
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="imageUrl">Image URL (Optional)</Label>
                                <Input id="imageUrl" name="imageUrl" value={newItem.imageUrl} onChange={handleInputChange} placeholder="https://..." />
                            </div>
                             <div className="space-y-2">
                                <Label htmlFor="imageHint">Image AI Hint (Optional)</Label>
                                <Input id="imageHint" name="imageHint" value={newItem.imageHint} onChange={handleInputChange} placeholder="e.g., prayer meeting" />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <Button type="submit">
                                <PlusCircle className="mr-2 h-4 w-4" />
                                Post News
                            </Button>
                        </div>
                    </form>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Newspaper className="h-5 w-5 text-accent" />
                        Posted News
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {newsItems.map(item => (
                        <div key={item.id} className="flex flex-col md:flex-row gap-4 rounded-lg border p-4">
                           {item.image && (
                                <div className="relative w-full md:w-48 h-32 md:h-auto flex-shrink-0 overflow-hidden rounded-md">
                                     <Image src={item.image.imageUrl} alt={item.title || 'News image'} fill className="object-cover" data-ai-hint={item.image.imageHint} />
                                </div>
                           )}
                           <div className="flex-grow">
                                <p className="text-sm text-muted-foreground">{item.timestamp}</p>
                                {item.title && <h3 className="font-bold text-lg text-foreground mt-1">{item.title}</h3>}
                               <p className="text-sm text-muted-foreground mt-2">{item.content}</p>
                           </div>
                           <div className="flex-shrink-0 flex flex-col gap-2">
                                <Button variant="destructive" size="sm" onClick={() => handleDeleteItem(item.id)}>
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
