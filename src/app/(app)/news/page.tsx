
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { newsFeed } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Newspaper, Check, CheckCheck } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

export default function GlobalNewsPage() {
    const channelAvatar = PlaceHolderImages.find(p => p.id === 'ministry-logo-1');

    return (
        <div className="max-w-3xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
            <Card className="flex flex-col flex-grow">
                <CardHeader className="bg-teal-700 text-white p-3 flex-row items-center gap-3">
                     {channelAvatar && (
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={channelAvatar.imageUrl} alt="Growing In Faith Global News" />
                            <AvatarFallback>N</AvatarFallback>
                        </Avatar>
                     )}
                     <div>
                        <CardTitle className="text-lg font-bold">Growing In Faith Global News</CardTitle>
                        <CardDescription className="text-white/80 text-xs">Official announcements and updates.</CardDescription>
                     </div>
                </CardHeader>
                <CardContent className="flex-grow p-4 space-y-4 bg-gray-800/50 overflow-y-auto">
                    
                    <div className="text-center my-4">
                        <span className="bg-secondary text-muted-foreground text-xs font-semibold px-2 py-1 rounded-full">YESTERDAY</span>
                    </div>

                    {newsFeed.map((item, index) => (
                         <div key={item.id} className="flex flex-col items-start">
                            <div className="bg-card rounded-lg p-3 max-w-lg shadow-md">
                                 {item.image && (
                                    <div className="relative w-full aspect-video rounded-md overflow-hidden mb-2">
                                        <img src={item.image.imageUrl} alt={item.title || 'News Image'} className="object-cover w-full h-full" />
                                    </div>
                                 )}
                                {item.title && <h4 className="font-bold text-card-foreground">{item.title}</h4>}
                                <p className="text-sm text-card-foreground/90 whitespace-pre-wrap">{item.content}</p>
                                <div className="flex justify-end items-center mt-1">
                                    <span className="text-xs text-muted-foreground">{item.timestamp}</span>
                                    <CheckCheck className="h-4 w-4 ml-1 text-blue-400" />
                                </div>
                            </div>
                        </div>
                    ))}
                    
                     <div className="text-center my-4">
                        <span className="bg-secondary text-muted-foreground text-xs font-semibold px-2 py-1 rounded-full">TODAY</span>
                    </div>

                     <div className="flex flex-col items-start">
                        <div className="bg-card rounded-lg p-3 max-w-lg shadow-md">
                            <h4 className="font-bold text-card-foreground">Welcome to the Channel!</h4>
                            <p className="text-sm text-card-foreground/90 whitespace-pre-wrap">Stay tuned for all official news and announcements from Growing in Faith Global. This channel is your primary source for updates.</p>
                            <div className="flex justify-end items-center mt-1">
                                <span className="text-xs text-muted-foreground">8:00 AM</span>
                                <Check className="h-4 w-4 ml-1 text-muted-foreground" />
                            </div>
                        </div>
                    </div>


                </CardContent>
            </Card>
        </div>
    );
}
