
'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Send,
  Image as ImageIcon,
  Video,
  Bold,
  Italic,
  Underline,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export function CreatePostForm() {
  const currentUserAvatar = PlaceHolderImages.find((p) => p.id === 'avatar-1');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderlined, setIsUnderlined] = useState(false);
  const [fontStyle, setFontStyle] = useState('font-body');

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex gap-4">
          <Avatar className="h-10 w-10 border">
            {currentUserAvatar && (
              <AvatarImage
                src={currentUserAvatar.imageUrl}
                alt="You"
                data-ai-hint={currentUserAvatar.imageHint}
              />
            )}
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
          <div className="flex-grow space-y-3">
            <Input
              placeholder="Title"
              className={cn(
                'border-0 border-b-2 rounded-none px-0 text-lg font-bold focus-visible:ring-0',
                isBold && 'font-bold',
                isItalic && 'italic',
                isUnderlined && 'underline',
                fontStyle
              )}
            />

            <div className="flex flex-wrap items-center gap-2 rounded-md border p-2">
              <Button
                variant={isBold ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setIsBold(!isBold)}
              >
                <Bold className="h-4 w-4" />
              </Button>
              <Button
                variant={isItalic ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setIsItalic(!isItalic)}
              >
                <Italic className="h-4 w-4" />
              </Button>
              <Button
                variant={isUnderlined ? 'secondary' : 'ghost'}
                size="icon"
                onClick={() => setIsUnderlined(!isUnderlined)}
              >
                <Underline className="h-4 w-4" />
              </Button>
              <Select
                onValueChange={(value) => setFontStyle(value)}
                defaultValue={fontStyle}
              >
                <SelectTrigger className="w-[150px] text-foreground">
                  <SelectValue placeholder="Font Style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="font-body">Sans-serif</SelectItem>
                  <SelectItem value="font-headline">Serif</SelectItem>
                  <SelectItem value="font-mono">Monospace</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Textarea
              placeholder="What's on your mind?"
              className="min-h-[120px]"
            />
             <Input placeholder="Categories (e.g. Faith, Encouragement, Testimony)" />

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon">
                  <ImageIcon className="h-5 w-5 text-accent" />
                  <span className="sr-only">Add Photo</span>
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-5 w-5 text-accent" />
                  <span className="sr-only">Add Video</span>
                </Button>
              </div>
              <Button>
                <Send className="h-4 w-4 mr-2" />
                Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
