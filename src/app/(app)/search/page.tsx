
'use client';

import { useSearchParams } from 'next/navigation';
import { devotionals, ministries } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { BookOpen, Church, Search as SearchIcon } from 'lucide-react';
import React from 'react';
import { ScrollAnimator } from '@/components/scroll-animator';

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';
  const [searchQuery, setSearchQuery] = React.useState(query);

  const filteredDevotionals = query
    ? devotionals.filter(
        (d) =>
          d.title.toLowerCase().includes(query.toLowerCase()) ||
          d.content.text.toLowerCase().includes(query.toLowerCase()) ||
          d.author.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const filteredMinistries = query
    ? ministries.filter((m) =>
        m.name.toLowerCase().includes(query.toLowerCase()) || 
        m.description.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // A page reload is fine for this simple search
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };
  
  const totalResults = filteredDevotionals.length + filteredMinistries.length;

  return (
    <div className="space-y-8">
      <ScrollAnimator>
        <div>
          <h1 className="text-3xl font-headline font-bold">Search Results</h1>
          <p className="text-muted-foreground">
            {query ? `Found ${totalResults} results for "${query}"` : 'Enter a term to search.'}
          </p>
        </div>

        <form onSubmit={handleSearch} className="flex gap-2">
          <Input
            type="search"
            placeholder="Search content, members..."
            className="bg-background"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button type="submit">
              <SearchIcon className="mr-2 h-4 w-4" />
              Search
          </Button>
        </form>
      </ScrollAnimator>
      
      {query && (
        <div className="space-y-6">
          {filteredDevotionals.length > 0 && (
            <ScrollAnimator>
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">Devotionals</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredDevotionals.map((item) => (
                    <Card key={`devotional-${item.id}`}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <BookOpen className="h-5 w-5 text-accent" /> {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-3">{item.content.text}</p>
                        <Button asChild variant="link" className="p-0 mt-2">
                          <Link href="/devotionals">Read More</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </ScrollAnimator>
          )}

          {filteredMinistries.length > 0 && (
            <ScrollAnimator>
              <section>
                <h2 className="text-2xl font-headline font-bold mb-4">Ministries</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {filteredMinistries.map((item) => (
                    <Card key={`ministry-${item.id}`}>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                          <Church className="h-5 w-5 text-accent" /> {item.name}
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                        <Button asChild variant="link" className="p-0 mt-2">
                          <Link href="/ministries">Learn More</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            </ScrollAnimator>
          )}
          
          {totalResults === 0 && (
             <ScrollAnimator>
              <div className="text-center py-12">
                  <p className="text-lg text-muted-foreground">No results found for your query.</p>
              </div>
             </ScrollAnimator>
          )}

        </div>
      )}
    </div>
  );
}
