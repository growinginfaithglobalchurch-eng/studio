
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
  Rss,
  TrendingUp,
  GraduationCap,
  Library,
  Settings,
  Baby,
  Gift,
  Wind,
  HeartPulse,
  Voicemail,
  Swords,
  Briefcase,
  Sparkles,
  Globe,
  Calendar,
  UserCheck,
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
  { href: '/growth-hub', label: 'Growth Hub', icon: <TrendingUp className="h-4 w-4" /> },
  { href: '/devotionals', label: 'Devotionals', icon: <BookOpen className="h-4 w-4" /> },
  { href: '/resources', label: 'Resources', icon: <Library className="h-4 w-4" /> },
  { href: '/prayer', label: 'Prayer Wall', icon: <HeartHandshake className="h-4 w-4" /> },
  { href: '/live', label: 'Live Sessions', icon: <Clapperboard className="h-4 w-4" /> },
  { href: '/events', label: 'Events', icon: <Calendar className="h-4 w-4" /> },
  { href: '/ministries', label: 'Activation', icon: <HandHelping className="h-4 w-4" /> },
  { href: '/giving', label: 'Giving', icon: <Gift className="h-4 w-4" /> },
  { href: '/launch-sermon', label: 'Launch Sermon', icon: <Sparkles className="h-4 w-4" /> },
];

const communityNav = [
  { href: '/connect', label: 'Connect', icon: <Handshake className="h-4 w-4" /> },
  { href: '/groups', label: 'Groups', icon: <Users className="h-4 w-4" /> },
  { href: '/mentorship', label: 'Mentorship', icon: <User className="h-4 w-4" /> },
  { href: '/friends', label: 'Friends', icon: <Users className="h-4 w-4" /> },
  { href: '/courses', label: 'Courses', icon: <GraduationCap className="h-4 w-4" /> },
  { href: '/school-of-revelation', label: 'School of Revelation', icon: <GraduationCap className="h-4 w-4" /> },
  { href: '/school-of-the-spirit', label: 'School of the Spirit', icon: <Wind className="h-4 w-4" /> },
  { href: '/school-of-healing', label: 'School of Healing', icon: <HeartPulse className="h-4 w-4" /> },
  { href: '/school-of-prophet', label: 'School of the Prophet', icon: <Voicemail className="h-4 w-4" /> },
  { href: '/school-of-deliverance', label: 'School of Deliverance', icon: <Swords className="h-4 w-4" /> },
  { href: '/school-of-ministry', label: 'School of Ministry', icon: <Briefcase className="h-4 w-4" /> },
  { href: '/business-school', label: 'Business School', icon: <TrendingUp className="h-4 w-4" /> },
  { href: '/kids', label: 'Kids & Youth', icon: <Baby className="h-4 w-4" /> },
  { href: '/church-integration', label: 'Church Integration', icon: <Handshake className="h-4 w-4" /> },
]

const adminNav = [
    { href: '/admin', label: 'Dashboard', icon: <Home className="h-4 w-4" /> },
    { href: '/admin/settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
    { href: '/admin/roadmap', label: 'Roadmap', icon: <GraduationCap className="h-4 w-4" /> },
    { href: '/admin/global-expansion', label: 'Global Strategy', icon: <Globe className="h-4 w-4" /> },
    { href: '/admin/conferences', label: 'Conferences', icon: <Calendar className="h-4 w-4" /> },
    { href: '/admin/courses', label: 'Courses', icon: <GraduationCap className="h-4 w-4" /> },
    { href: '/admin/mentorship', label: 'Mentorship', icon: <UserCheck className="h-4 w-4" /> },
    { href: '/admin/discipleship', label: 'Discipleship', icon: <Users className="h-4 w-4" /> },
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

      <Accordion type="multiple" defaultValue={['community', 'admin']} className="w-full">
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
                      (pathname === item.href || (pathname === '/youth' && item.href === '/kids')) && 'bg-sidebar-muted text-sidebar-foreground'
                    )}
                  >
                    {item.icon}
                    {item.label}
                  </Link>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
         <AccordionItem value="admin" className="border-b-0">
          <AccordionTrigger className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-muted-foreground transition-all hover:text-sidebar-foreground hover:no-underline [&[data-state=open]>svg]:rotate-180 hover:bg-sidebar-muted",
           (pathname.startsWith('/admin')) && 'bg-sidebar-muted text-sidebar-foreground'
          )}>
            <Shield className="h-4 w-4" />
            Admin
          </AccordionTrigger>
          <AccordionContent className="pl-2">
            <div className="flex flex-col space-y-1">
              {adminNav.map((item) => (
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
       
    </nav>
  );
}
