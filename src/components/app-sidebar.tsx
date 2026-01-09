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

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:flex-col md:border-r bg-card text-card-foreground">
      <div className="flex h-16 items-center border-b px-4 shrink-0">
         <Link href="/dashboard" className="flex items-center gap-3">
          <Church className="h-8 w-8 text-accent" />
          <div className="flex flex-col">
            <span className="font-headline text-lg text-foreground font-bold">
              Growing In Faith
            </span>
             <span className="text-sm text-foreground/70 -mt-1">Global Connect</span>
          </div>
        </Link>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
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
                pathname === '/feeds' ? 'bg-red-600 text-white hover:bg-red-700' : 'text-card-foreground hover:bg-muted'
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

        <Accordion type="multiple" defaultValue={['general', 'courses']} className="w-full">
          <AccordionItem value="general" className="border-b-0">
            <AccordionTrigger className="py-2 hover:no-underline text-muted-foreground">
                <span className="font-semibold">General</span>
            </AccordionTrigger>
            <AccordionContent className="pl-2">
              <Link href="/dashboard" className={cn("flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-muted", pathname === '/dashboard' ? 'text-primary' : 'text-muted-foreground')}>
                <div className="w-6 h-6 rounded bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-bold">h</div>
                Home
              </Link>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="courses" className="border-b-0">
            <AccordionTrigger className="py-2 hover:no-underline text-muted-foreground">
              <span className="font-semibold">Courses</span>
            </AccordionTrigger>
            <AccordionContent className="pl-2 space-y-1">
              <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted">
                 <div className="w-6 h-6 rounded bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-bold">s</div>
                School of Ministry
              </Link>
              <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted">
                <Sparkles className="h-4 w-4" />
                School Of Revelation
              </Link>
              <Link href="#" className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted">
                <div className="w-6 h-6 rounded bg-gray-200 text-gray-700 flex items-center justify-center text-xs font-bold">t</div>
                The of the Spirit
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
        
        <hr/>
        
        <nav className="flex flex-col gap-1">
            <Link
                href="/groups"
                className="flex items-center justify-between rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-muted"
            >
                <span className="font-semibold">Cell Groups</span>
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


      </div>
    </div>
  );
}
