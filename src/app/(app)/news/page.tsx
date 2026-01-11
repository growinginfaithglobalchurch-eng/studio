
'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { newsFeed as initialNewsFeed } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { CheckCheck, Check, Send, Paperclip, ImageIcon, Video, FileText, Trash2, Smile } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Image from 'next/image';

export default function GlobalNewsPage() {
    const { toast } = useToast();
    const channelAvatar = PlaceHolderImages.find(p => p.id === 'ministry-logo-1');
    
    const [newsFeed, setNewsFeed] = useState(initialNewsFeed);
    const [newMessage, setNewMessage] = useState('');
    const [title, setTitle] = useState('');

    const handleSendMessage = () => {
        if (!newMessage.trim() && !title.trim()) {
            toast({
                variant: 'destructive',
                title: 'Empty Message',
                description: 'Please add a title or content to your message.',
            });
            return;
        }

        const newPost = {
            id: newsFeed.length + 1,
            title: title,
            content: newMessage,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            image: null,
            reactions: []
        };
        setNewsFeed(prev => [...prev, newPost]);
        setNewMessage('');
        setTitle('');
        toast({
            title: 'Message Posted',
            description: 'Your message has been posted to the news channel.',
        });
    };

    const handleDelete = (id: number) => {
        setNewsFeed(prev => prev.filter(item => item.id !== id));
        toast({
            title: 'Post Deleted',
            description: 'The news post has been removed.',
        })
    };

    const addReaction = (id: number, emoji: string) => {
        setNewsFeed(prev => prev.map(item => {
            if (item.id === id) {
                const existingReaction = item.reactions.find(r => r.emoji === emoji);
                if (existingReaction) {
                    return {
                        ...item,
                        reactions: item.reactions.map(r => 
                            r.emoji === emoji ? { ...r, count: r.count + 1 } : r
                        )
                    }
                } else {
                    return {
                        ...item,
                        reactions: [...item.reactions, { emoji, count: 1 }]
                    }
                }
            }
            return item;
        }));
    };

    const reactionEmojis = ['🙏', '❤️', '🔥', '👍'];

    return (
        <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
            <Card className="flex flex-col flex-grow">
                <CardHeader className="bg-[#3B0000] text-white p-3 flex-row items-center gap-3">
                     {channelAvatar && (
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={channelAvatar.imageUrl} alt="News Channel" />
                            <AvatarFallback>N</AvatarFallback>
                        </Avatar>
                     )}
                     <div>
                        <CardTitle className="text-lg font-bold">News Channel</CardTitle>
                        <CardDescription className="text-white/80 text-xs">Official announcements and updates.</CardDescription>
                     </div>
                </CardHeader>

                <ScrollArea className="flex-grow p-4 bg-gray-800/50">
                    <div className="space-y-4">
                        <div className="text-center my-4">
                            <span className="bg-secondary text-muted-foreground text-xs font-semibold px-2 py-1 rounded-full">YESTERDAY</span>
                        </div>

                        {newsFeed.map((item, index) => (
                             <div key={item.id} className="flex flex-col items-start group">
                                <div className="bg-card rounded-lg p-3 max-w-lg shadow-md relative">
                                    {/* Admin Delete Button */}
                                    <Button 
                                        variant="destructive" 
                                        size="icon" 
                                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        onClick={() => handleDelete(item.id)}
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </Button>

                                     {item.image && (
                                        <div className="relative w-full aspect-video rounded-md overflow-hidden mb-2">
                                            <Image src={item.image.imageUrl} alt={item.title || 'News Image'} fill className="object-cover" />
                                        </div>
                                     )}
                                    {item.title && <h4 className="font-bold text-card-foreground">{item.title}</h4>}
                                    <p className="text-sm text-card-foreground/90 whitespace-pre-wrap">{item.content}</p>
                                    
                                    {item.reactions && item.reactions.length > 0 && (
                                        <div className="flex gap-1 mt-2">
                                            {item.reactions.map(r => (
                                                <button key={r.emoji} onClick={() => addReaction(item.id, r.emoji)} className="bg-secondary px-2 py-0.5 rounded-full text-xs flex items-center gap-1">
                                                    <span>{r.emoji}</span>
                                                    <span>{r.count}</span>
                                                </button>
                                            ))}
                                        </div>
                                    )}

                                    <div className="flex justify-end items-center mt-1">
                                        <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                                        <CheckCheck className="h-4 w-4 ml-1 text-blue-400" />
                                    </div>
                                </div>
                                <div className="flex gap-1 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                    {reactionEmojis.map(emoji => (
                                        <Button key={emoji} variant="ghost" size="icon" className="h-7 w-7 rounded-full" onClick={() => addReaction(item.id, emoji)}>
                                            {emoji}
                                        </Button>
                                    ))}
                                </div>
                            </div>
                        ))}
                        
                         <div className="text-center my-4">
                            <span className="bg-secondary text-muted-foreground text-xs font-semibold px-2 py-1 rounded-full">TODAY</span>
                        </div>

                         <div className="flex flex-col items-start group">
                            <div className="bg-card rounded-lg p-3 max-w-lg shadow-md">
                                <h4 className="font-bold text-card-foreground">Welcome to the Channel!</h4>
                                <p className="text-sm text-card-foreground/90 whitespace-pre-wrap">Stay tuned for all official news and announcements from Growing in Faith Global. This channel is your primary source for updates.</p>
                                <div className="flex justify-end items-center mt-1">
                                    <span className="text-xs text-muted-foreground">8:00 AM</span>
                                    <Check className="h-4 w-4 ml-1 text-muted-foreground" />
                                </div>
                            </div>
                        </div>
                    </div>
                </ScrollArea>
                
                {/* Admin Input Area */}
                <div className="p-4 border-t bg-card">
                    <Input 
                        placeholder="Title (Optional)"
                        className="mb-2 text-white"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div className="relative">
                        <Textarea 
                            placeholder="Type a message..." 
                            className="pr-24 text-white"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage();
                                }
                            }}
                        />
                        <div className="absolute right-2 top-2 flex flex-col gap-1">
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                      <Paperclip className="h-5 w-5 text-muted-foreground" />
                                   </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-1">
                                    <div className="flex gap-1">
                                        <Button variant="ghost" size="icon"><ImageIcon/></Button>
                                        <Button variant="ghost" size="icon"><Video/></Button>
                                        <Button variant="ghost" size="icon"><FileText/></Button>
                                    </div>
                                </PopoverContent>
                            </Popover>
                           <Button size="icon" className="h-8 w-8" onClick={handleSendMessage}>
                             <Send className="h-4 w-4" />
                           </Button>
                        </div>
                    </div>
                </div>

            </Card>
        </div>
    );
}
