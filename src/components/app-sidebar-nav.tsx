'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Clapperboard,
  HandHelping,
  Handshake,
  HeartHandshake,
  Home,
  Shield,
  User,
  Users,
  Rss
} from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from './ui/button';

const mainNav = [
  { href: '/dashboard', label: 'Home', icon: <Home className="h-4 w-4" /> },
  { href: '/feeds', label: 'Feeds', icon: <Rss className="h-4 w-4" /> },
  { href: '/devotionals', label: 'Devotionals', icon: <BookOpen className="h-4 w-4" /> },
  { href: '/prayer', label: 'Prayer Wall', icon: <HeartHandshake className="h-4 w-4" /> },
  { href: '/live', label: 'Live Sessions', icon: <Clapperboard className="h-4 w-4" /> },
  { href: '/ministries', label: 'Ministries', icon: <HandHelping className="h-4 w-4" /> },
];

const communityNav = [
  { href: '/connect', label: 'Connect', icon: <Handshake className="h-4 w-4" /> },
  { href: '/groups', label: 'Groups', icon: <Users className="h-4 w-4" /> },
  { href: '/mentorship', label: 'Mentorship', icon: <User className="h-4 w-4" /> },
  { href: '/friends', label: 'Friends', icon: <Users className="h-4 w-4" /> },
]

export function AppSidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="grid items-start gap-2 px-4 text-sm font-medium">
      {mainNav.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-muted-foreground transition-all hover:text-sidebar-foreground hover:bg-sidebar-muted',
            pathname === item.href && 'bg-sidebar-muted text-sidebar-foreground'
          )}
        >
          {item.icon}
          {item.label}
        </Link>
      ))}

      <Accordion type="multiple" defaultValue={['community']} className="w-full">
        <AccordionItem value="community" className="border-b-0">
          <AccordionTrigger className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-muted-foreground transition-all hover:text-sidebar-foreground hover:no-underline [&[data-state=open]>svg]:rotate-180 hover:bg-sidebar-muted")}>
            <Users className="h-4 w-4" />
            Community
          </AccordionTrigger>
          <AccordionContent className="pl-2">
            <div className="flex flex-col space-y-1">
              {communityNav.map((item) => (
                 <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-muted-foreground transition-all hover:text-sidebar-foreground hover:bg-sidebar-muted',
                      pathname === item.href && 'bg-sidebar-muted text-sidebar-foreground'
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

       <Link
          href="/profile"
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-muted-foreground transition-all hover:text-sidebar-foreground hover:bg-sidebar-muted',
            pathname === '/profile' && 'bg-sidebar-muted text-sidebar-foreground'
          )}
        >
          <User className="h-4 w-4" />
          Profile
        </Link>
        <Link
          href="/admin"
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-muted-foreground transition-all hover:text-sidebar-foreground hover:bg-sidebar-muted',
            pathname === '/admin' && 'bg-sidebar-muted text-sidebar-foreground'
          )}
        >
          <Shield className="h-4 w-4" />
          Admin
        </Link>
    </nav>
  );
}
