
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Church,
  MessageSquare,
  Rss,
  Users,
  Plus,
  Home,
  ChevronRight,
  Sparkles,
  PlusCircle,
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
        {isClient && (
          <>
            <Button variant="outline" className="w-full justify-start text-card-foreground">
              <Plus className="mr-2 h-4 w-4" /> Create
            </Button>

            <nav className="flex flex-col gap-1">
                <Link
                    href="/chat"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                    <MessageSquare className="h-4 w-4" />
                    Chat with Cohost
                </Link>
                <Link
                    href="/feeds"
                    className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 transition-all',
                    pathname === '/feeds' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'text-card-foreground hover:bg-muted'
                    )}
                >
                    <Rss className="h-4 w-4" />
                    Feed
                </Link>
                <Link
                    href="/groups"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                    <Users className="h-4 w-4" />
                    Members
                </Link>
            </nav>
            
            <hr/>

            <Accordion type="multiple" defaultValue={['general', 'community']} className="w-full">
              <AccordionItem value="general" className="border-b-0">
                <AccordionTrigger className="py-2 hover:no-underline font-semibold text-muted-foreground">
                    General
                </AccordionTrigger>
                <AccordionContent className="pl-2 space-y-1">
                  <Link href="/dashboard" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted", pathname === '/dashboard' ? 'text-primary bg-muted' : 'text-muted-foreground')}>
                    <Home className="h-4 w-4" />
                    Home
                  </Link>
                  <Link href="/devotionals" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted", pathname === '/devotionals' ? 'text-primary bg-muted' : 'text-muted-foreground')}>
                     <Sparkles className="h-4 w-4" />
                    Devotionals
                  </Link>
                   <Link href="/prayer" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted", pathname === '/prayer' ? 'text-primary bg-muted' : 'text-muted-foreground')}>
                     <Sparkles className="h-4 w-4" />
                    Prayer Wall
                  </Link>
                   <Link href="/live" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted", pathname === '/live' ? 'text-primary bg-muted' : 'text-muted-foreground')}>
                     <Sparkles className="h-4 w-4" />
                    Live Sessions
                  </Link>
                   <Link href="/ministries" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted", pathname === '/ministries' ? 'text-primary bg-muted' : 'text-muted-foreground')}>
                     <Sparkles className="h-4 w-4" />
                    Ministries
                  </Link>
                   <Link href="/profile" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted", pathname === '/profile' ? 'text-primary bg-muted' : 'text-muted-foreground')}>
                     <Sparkles className="h-4 w-4" />
                    Profile
                  </Link>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="courses" className="border-b-0">
                <AccordionTrigger className="py-2 hover:no-underline font-semibold text-muted-foreground">
                  Courses
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
              
               <AccordionItem value="community" className="border-b-0">
                <AccordionTrigger className="py-2 hover:no-underline font-semibold text-muted-foreground">
                    Community
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
                     <Users className="h-4 w-4" />
                    Mentorship
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            
            <hr/>
            
            <nav className="flex flex-col gap-1">
                <Link
                    href="/admin"
                    className={cn("flex items-center justify-between rounded-lg px-3 py-2 transition-all hover:bg-muted", pathname === '/admin' ? 'text-primary' : 'text-muted-foreground')}
                >
                    <span className="font-semibold">Admin</span>
                    <ChevronRight className="h-4 w-4" />
                </Link>
                 <Link
                    href="#"
                    className="flex items-center justify-between rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
                >
                    <span className="font-semibold">Start Here</span>
                    <ChevronRight className="h-4 w-4" />
                </Link>
            </nav>
            
            <hr/>

            <div className="space-y-2">
                <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted w-full">
                    <PlusCircle className="h-4 w-4"/>
                    <span>Create a Space</span>
                </button>
                <button className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted w-full">
                    <PlusCircle className="h-4 w-4"/>
                    <span>Create a Collection</span>
                </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
