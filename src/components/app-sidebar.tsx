
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Church,
  MessageSquare,
  Rss,
  Users,
  Home,
  ChevronRight,
  Sparkles,
  PlusCircle,
  BookOpen,
  Send,
  Clapperboard,
  UserCheck,
  Search,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export function AppSidebar() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return (
        <div className="hidden md:flex md:flex-col md:border-r bg-card text-card-foreground">
        <div className="flex h-16 items-center border-b px-4 shrink-0">
         <Link href="/dashboard" className="flex items-center gap-3">
          <Church className="h-8 w-8 text-accent" />
          <div className="flex flex-col">
            <span className="font-headline text-lg font-bold">
              Growing In Faith
            </span>
             <span className="text-sm text-foreground/70 -mt-1">Global Connect</span>
          </div>
        </Link>
      </div>
      <div className="flex-1 p-4">
        {/* Skeleton or loading state can go here */}
      </div>
    </div>
    );
  }

  return (
    <div className="hidden md:flex md:flex-col md:border-r bg-card text-card-foreground">
      <div className="flex h-16 items-center border-b px-4 shrink-0">
         <Link href="/dashboard" className="flex items-center gap-3">
          <Church className="h-8 w-8 text-accent" />
          <div className="flex flex-col">
            <span className="font-headline text-lg font-bold">
              Growing In Faith
            </span>
             <span className="text-sm text-foreground/70 -mt-1">Global Connect</span>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <>
            <div className="space-y-2">
                <p className="px-3 text-xs font-semibold text-muted-foreground">Quick Actions</p>
                <Button variant="outline" className="w-full justify-start text-card-foreground">
                  <Send className="mr-2 h-4 w-4" /> Submit a Prayer
                </Button>
                <Button variant="outline" className="w-full justify-start text-card-foreground">
                  <MessageSquare className="mr-2 h-4 w-4" /> Start a Discussion
                </Button>
            </div>


            <Accordion type="multiple" defaultValue={['general', 'community', 'courses']} className="w-full">
              <AccordionItem value="general" className="border-b-0">
                <AccordionTrigger className="py-2 hover:no-underline font-semibold text-muted-foreground text-xs px-3">
                    GENERAL
                </AccordionTrigger>
                <AccordionContent className="pl-2 space-y-1">
                  <Link href="/dashboard" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted", pathname === '/dashboard' ? 'text-primary bg-muted' : 'text-muted-foreground')}>
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                   <Link href="/search" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted", pathname === '/search' ? 'text-primary bg-muted' : 'text-muted-foreground')}>
                    <Search className="h-4 w-4" />
                    Search
                  </Link>
                  <Link href="/feeds" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted", pathname === '/feeds' ? 'text-primary bg-muted' : 'text-muted-foreground')}>
                     <Rss className="h-4 w-4" />
                    Feeds
                  </Link>
                  <Link href="/devotionals" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted", pathname === '/devotionals' ? 'text-primary bg-muted' : 'text-muted-foreground')}>
                     <BookOpen className="h-4 w-4" />
                    Devotionals
                  </Link>
                   <Link href="/prayer" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted", pathname === '/prayer' ? 'text-primary bg-muted' : 'text-muted-foreground')}>
                     <Sparkles className="h-4 w-4" />
                    Prayer Wall
                  </Link>
                   <Link href="/live" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted", pathname === '/live' ? 'text-primary bg-muted' : 'text-muted-foreground')}>
                     <Clapperboard className="h-4 w-4" />
                    Live Sessions
                  </Link>
                   <Link href="/ministries" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted", pathname === '/ministries' ? 'text-primary bg-muted' : 'text-muted-foreground')}>
                     <Church className="h-4 w-4" />
                    Ministries
                  </Link>
                   <Link href="/profile" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted", pathname === '/profile' ? 'text-primary bg-muted' : 'text-muted-foreground')}>
                     <Sparkles className="h-4 w-4" />
                    Profile
                  </Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="community" className="border-b-0">
                <AccordionTrigger className="py-2 hover:no-underline font-semibold text-muted-foreground text-xs px-3">
                    COMMUNITY
                </AccordionTrigger>
                <AccordionContent className="pl-2 space-y-1">
                  <Link href="/connect" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted", pathname === '/connect' ? 'text-primary bg-muted' : 'text-muted-foreground')}>
                     <Users className="h-4 w-4" />
                    Connect
                  </Link>
                  <Link href="/groups" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted", pathname === '/groups' ? 'text-primary bg-muted' : 'text-muted-foreground')}>
                     <Users className="h-4 w-4" />
                    Groups
                  </Link>
                   <Link href="/mentorship" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted", pathname === '/mentorship' ? 'text-primary bg-muted' : 'text-muted-foreground')}>
                     <UserCheck className="h-4 w-4" />
                    Mentorship
                  </Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="courses" className="border-b-0">
                <AccordionTrigger className="py-2 hover:no-underline font-semibold text-muted-foreground text-xs px-3">
                  COURSES
                </AccordionTrigger>
                <AccordionContent className="pl-2 space-y-1">
                  <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted">
                    <div className="w-6 h-6 rounded bg-muted/50 text-muted-foreground flex items-center justify-center text-xs font-bold">S</div>
                    School of Ministry
                  </Link>
                  <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted">
                    <Sparkles className="h-4 w-4" />
                    School Of Revelation
                  </Link>
                  <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted">
                    <div className="w-6 h-6 rounded bg-muted/50 text-muted-foreground flex items-center justify-center text-xs font-bold">T</div>
                    The of the Spirit
                  </Link>
                </AccordionContent>
              </AccordionItem>
              
            </Accordion>
            
            <hr className="border-border"/>
            
            <nav className="flex flex-col gap-1">
                <Link
                    href="/admin"
                    className={cn("flex items-center justify-between rounded-lg px-3 py-2 transition-all hover:bg-muted", pathname === '/admin' ? 'text-primary' : 'text-muted-foreground')}
                >
                    <span className="font-semibold">Admin</span>
                    <ChevronRight className="h-4 w-4" />
                </Link>
            </nav>
          </>
      </div>
    </div>
  );
}
