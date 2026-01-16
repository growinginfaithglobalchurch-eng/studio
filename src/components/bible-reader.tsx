
'use client';

import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { bibleBooks } from '@/lib/bible-data';

export function BibleReader() {
  const [selectedBook, setSelectedBook] = useState('Genesis');
  const [selectedChapter, setSelectedChapter] = useState('1');
  const [selectedVerse, setSelectedVerse] = useState('1');
  const [selectedVersion, setSelectedVersion] = useState('KJV');

  const bookData = bibleBooks.find(b => b.name === selectedBook);
  const chapters = bookData ? Array.from({ length: bookData.chapters }, (_, i) => i + 1) : [];
  // For simplicity, we'll assume a max of 176 verses (Psalm 119). A real app would need detailed data.
  const verses = Array.from({ length: 176 }, (_, i) => i + 1);

  const handleBookChange = (book: string) => {
    setSelectedBook(book);
    setSelectedChapter('1');
    setSelectedVerse('1');
  };
  
  const handleChapterChange = (chapter: string) => {
    setSelectedChapter(chapter);
    setSelectedVerse('1');
  };

  return (
    <div className="p-4 space-y-4 bg-secondary/30 h-full flex flex-col">
      <div className="grid grid-cols-2 gap-4">
        <Select value={selectedBook} onValueChange={handleBookChange}>
          <SelectTrigger><SelectValue placeholder="Book" /></SelectTrigger>
          <SelectContent>
            {bibleBooks.map(book => (
              <SelectItem key={book.name} value={book.name}>{book.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={selectedVersion} onValueChange={setSelectedVersion}>
          <SelectTrigger><SelectValue placeholder="Version" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="KJV">KJV</SelectItem>
            <SelectItem value="NIV">NIV</SelectItem>
            <SelectItem value="ESV">ESV</SelectItem>
            <SelectItem value="NLT">NLT</SelectItem>
            <SelectItem value="AMP">AMP</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Select value={selectedChapter} onValueChange={handleChapterChange}>
          <SelectTrigger><SelectValue placeholder="Chapter" /></SelectTrigger>
          <SelectContent>
            {chapters.map(ch => (
              <SelectItem key={ch} value={ch.toString()}>{`Chapter ${ch}`}</SelectItem>
            ))}
          </SelectContent>
        </Select>
         <Select value={selectedVerse} onValueChange={setSelectedVerse}>
          <SelectTrigger><SelectValue placeholder="Verse" /></SelectTrigger>
          <SelectContent>
            {verses.map(v => (
              <SelectItem key={v} value={v.toString()}>{`Verse ${v}`}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Card className="flex-grow">
        <CardContent className="p-4">
          <h3 className="font-bold text-lg">{`${selectedBook} ${selectedChapter}:${selectedVerse}`}</h3>
          <p className="mt-2 text-muted-foreground">
            In the beginning God created the heaven and the earth. (Placeholder Text - a real app would fetch this content based on selection.)
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
