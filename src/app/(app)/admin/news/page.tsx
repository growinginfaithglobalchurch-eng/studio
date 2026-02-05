
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Newspaper, PlusCircle, Trash2, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';

type NewsItem = {
    id: number;
    title: string | null;
    content: string;
    created_at: string;
    image_url: string | null;
    image_hint: string | null;
};

export default function AdminNewsPage() {
    const { toast } = useToast();
    const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [newItem, setNewItem] = useState({
        title: '',
        content: '',
        imageUrl: '',
        imageHint: ''
    });

    useEffect(() => {
        const fetchNews = async () => {
            setIsLoading(true);
            const { data, error } = await supabase
                .from('news_feed')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) {
                toast({ variant: 'destructive', title: 'Error fetching news', description: error.message });
            } else {
                setNewsItems(data || []);
            }
            setIsLoading(false);
        };
        fetchNews();
    }, [toast]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setNewItem(prev => ({ ...prev, [name]: value }));
    };

    const handleAddItem = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newItem.title && !newItem.content) {
            toast({
                variant: 'destructive',
                title: 'Missing Fields',
                description: 'Please provide a title or content.',
            });
            return;
        }

        const newPost = {
            title: newItem.title,
            content: newItem.content,
            image_url: newItem.imageUrl || null,
            image_hint: newItem.imageHint || null,
        };

        const { data, error } = await supabase.from('news_feed').insert([newPost]).select();

        if (error) {
            toast({ variant: 'destructive', title: 'Error posting news', description: error.message });
        } else if (data) {
            setNewsItems(prev => [data[0], ...prev]);
            setNewItem({
                title: '',
                content: '',
                imageUrl: '',
                imageHint: '',
            });
            toast({
                title: 'News Posted',
                description: `Your post has been successfully added to the feed.`,
            });
        }
    };

    const handleDeleteItem = async (id: number) => {
        const { error } = await supabase.from('news_feed').delete().match({ id });
        if (error) {
            toast({ variant: 'destructive', title: 'Error deleting news', description: error.message });
        } else {
            setNewsItems(prev => prev.filter(item => item.id !== id));
            toast({
                title: 'News Item Deleted',
                description: 'The news post has been removed.',
            });
        }
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
                    {isLoading ? (
                        <div className="flex items-center justify-center p-8"><Loader2 className="h-8 w-8 animate-spin" /></div>
                    ) : newsItems.map(item => (
                        <div key={item.id} className="flex flex-col md:flex-row gap-4 rounded-lg border p-4">
                           {item.image_url && (
                                <div className="relative w-full md:w-48 h-32 md:h-auto flex-shrink-0 overflow-hidden rounded-md">
                                     <Image src={item.image_url} alt={item.title || 'News image'} fill className="object-cover" data-ai-hint={item.image_hint || ''} />
                                </div>
                           )}
                           <div className="flex-grow">
                                <p className="text-sm text-muted-foreground">{new Date(item.created_at).toLocaleDateString()}</p>
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
