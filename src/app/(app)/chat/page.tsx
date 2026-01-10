
'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { communityUsers } from '@/lib/data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  MessageCircle,
  Search,
  Paperclip,
  Send,
  MoreVertical,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const initialMessages = [
  {
    id: 1,
    sender: 'Jane Smith',
    text: 'Hey! How are you doing? I saw your post on the feed, it was really encouraging.',
    timestamp: '10:30 AM',
    isCurrentUser: false,
  },
  {
    id: 2,
    sender: 'You',
    text: 'Hi Jane! I\'m doing well, thank you. Glad you enjoyed the post! How are things with you?',
    timestamp: '10:32 AM',
    isCurrentUser: true,
  },
  {
    id: 3,
    sender: 'Jane Smith',
    text: 'All is well! I was wondering if you had any thoughts on the devotional from this morning?',
    timestamp: '10:33 AM',
    isCurrentUser: false,
  },
];

const currentUser = {
  id: 0,
  name: 'Joseph',
  avatar: PlaceHolderImages.find(p => p.id === 'avatar-1')
}

export default function ChatPage() {
  const [selectedUser, setSelectedUser] = useState(communityUsers[1]);
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;

    const message = {
        id: messages.length + 1,
        sender: 'You',
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isCurrentUser: true,
    };

    setMessages([...messages, message]);
    setNewMessage('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };


  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] lg:grid-cols-[350px_1fr] h-[calc(100vh-8rem)] gap-4">
      {/* Contacts Sidebar */}
      <Card className="flex-col hidden md:flex">
        <CardHeader className="p-4">
          <CardTitle className="text-xl font-bold">Chats</CardTitle>
           <div className="relative mt-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search connections..." className="pl-9 bg-secondary" />
          </div>
        </CardHeader>
        <CardContent className="p-0 flex-grow overflow-y-auto">
          <div className="flex flex-col">
            {communityUsers.slice(1).map((user) => (
              <button
                key={user.id}
                onClick={() => setSelectedUser(user)}
                className={cn(
                  'flex items-center gap-3 p-3 text-left hover:bg-muted transition-colors w-full',
                   selectedUser.id === user.id && 'bg-muted'
                )}
              >
                <Avatar>
                  {user.avatar && <AvatarImage src={user.avatar.imageUrl} alt={user.name} data-ai-hint={user.avatar.imageHint} />}
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-grow">
                  <p className="font-semibold text-card-foreground">{user.name}</p>
                  <p className="text-xs text-black/60 truncate">
                    Hey! How are you doing? Let's catch up...
                  </p>
                </div>
                <div className="text-xs text-black/60 self-start">
                    10:33 AM
                </div>
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Main Chat Window */}
      <Card className="flex flex-col h-full">
        {selectedUser ? (
          <>
            <div className="flex items-center p-3 border-b">
              <Avatar>
                 {selectedUser.avatar && <AvatarImage src={selectedUser.avatar.imageUrl} alt={selectedUser.name} data-ai-hint={selectedUser.avatar.imageHint} />}
                 <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                 <p className="font-semibold text-card-foreground">{selectedUser.name}</p>
                 <p className="text-xs text-black/60">Online</p>
              </div>
              <div className="ml-auto">
                  <Button variant="ghost" size="icon">
                      <MoreVertical className="h-5 w-5" />
                  </Button>
              </div>
            </div>

            <div className="flex-grow p-4 space-y-4 overflow-y-auto bg-secondary/40">
                {messages.map(msg => (
                    <div key={msg.id} className={cn("flex items-end gap-2", msg.isCurrentUser ? "justify-end" : "justify-start")}>
                        {!msg.isCurrentUser && (
                            <Avatar className="h-8 w-8">
                                {selectedUser.avatar && <AvatarImage src={selectedUser.avatar.imageUrl} alt={selectedUser.name} />}
                                <AvatarFallback>{selectedUser.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        )}
                        <div className={cn(
                            "rounded-lg px-4 py-2 max-w-sm",
                             msg.isCurrentUser ? "bg-primary text-primary-foreground" : "bg-card text-card-foreground"
                        )}>
                            <p className="text-sm">{msg.text}</p>
                             <p className={cn("text-xs mt-1", msg.isCurrentUser ? "text-primary-foreground/70" : "text-black/50")}>{msg.timestamp}</p>
                        </div>
                         {msg.isCurrentUser && (
                            <Avatar className="h-8 w-8">
                                {currentUser.avatar && <AvatarImage src={currentUser.avatar.imageUrl} alt={currentUser.name} />}
                                <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
            </div>

            <div className="p-4 border-t bg-card">
              <div className="relative">
                <Input 
                    placeholder="Type a message..." 
                    className="pr-24"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center">
                   <Button variant="ghost" size="icon">
                      <Paperclip className="h-5 w-5 text-black/60" />
                   </Button>
                   <Button size="sm" className="ml-2" onClick={handleSendMessage}>
                     <Send className="h-4 w-4 mr-2" /> Send
                   </Button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8">
            <MessageCircle className="h-16 w-16 text-muted-foreground" />
            <h2 className="mt-4 text-2xl font-semibold text-card-foreground">Select a conversation</h2>
            <p className="mt-2 text-black/60">
              Choose someone from your connections to start chatting.
            </p>
          </div>
        )}
      </Card>
    </div>
  );
}
