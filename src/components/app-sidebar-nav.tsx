

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
  Megaphone,
  School,
  LayoutDashboard,
  Bell,
  Store,
  Gavel,
  BookMarked,
  Award,
  CheckSquare,
  Phone,
  Code,
  ClipboardList,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const dailyPracticesNav = [
    { href: '/growth-hub', label: 'Overview', icon: <TrendingUp className="h-4 w-4" /> },
    { href: '/bible-reading-plan', label: 'Bible Reading Plan', icon: <BookMarked className="h-4 w-4" /> },
    { href: '/devotionals', label: 'Daily Declarations', icon: <Sparkles className="h-4 w-4" /> },
];

const warfareNav = [
    { href: '/spirit-warfare', label: 'Spirit Warfare', icon: <Swords className="h-4 w-4" /> },
    { href: '/war-room', label: 'War Room', icon: <Shield className="h-4 w-4" /> },
    { href: '/courts-of-heaven', label: 'Courts of Heaven', icon: <Gavel className="h-4 w-4" /> },
    { href: '/prayer', label: 'Prayer Wall', icon: <HeartHandshake className="h-4 w-4" /> },
    { href: '/prayer-line-registration', label: 'Prayer Line', icon: <Phone className="h-4 w-4" /> },
]

const communityNav = [
  { href: '/connect', label: 'Connect', icon: <Handshake className="h-4 w-4" /> },
  { href: '/groups', label: 'Groups', icon: <Users className="h-4 w-4" /> },
  { href: '/mentorship', label: 'Mentorship', icon: <UserCheck className="h-4 w-4" /> },
  { href: '/visiting-programs', label: 'Visiting Programs', icon: <Globe className="h-4 w-4" /> },
  { href: '/visitor-training-program', label: 'Visitor Training', icon: <GraduationCap className="h-4 w-4" /> },
  { href: '/kids-and-youth', label: 'Kids & Youth', icon: <Baby className="h-4 w-4" /> },
  { href: '/church-integration', label: 'Church Integration', icon: <Handshake className="h-4 w-4" /> },
  { href: '/our-mandate', label: 'Our Mandate', icon: <BookMarked className="h-4 w-4" /> },
  { href: '/programming', label: 'Service Programming', icon: <ClipboardList className="h-4 w-4" /> },
  { href: '/life-group-training', label: 'Life Group Training', icon: <Users className="h-4 w-4" /> },
];

const equippingNav = [
    { href: '/courses', label: 'All Courses', icon: <GraduationCap className="h-4 w-4" /> },
    { href: '/bible-school', label: 'Bible School', icon: <School className="h-4 w-4" /> },
    { href: '/school-of-revelation', label: 'School of Revelation', icon: <Sparkles className="h-4 w-4" /> },
    { href: '/school-of-the-spirit', label: 'School of the Spirit', icon: <Wind className="h-4 w-4" /> },
    { href: '/school-of-healing', label: 'School of Healing', icon: <HeartPulse className="h-4 w-4" /> },
    { href: '/school-of-prophet', label: 'School of the Prophet', icon: <Voicemail className="h-4 w-4" /> },
    { href: '/one-on-one-prophetic-registration', label: '1-on-1 Prophetic', icon: <UserCheck className="h-4 w-4" /> },
    { href: '/school-of-deliverance', label: 'School of Deliverance', icon: <Swords className="h-4 w-4" /> },
    { href: '/school-of-ministry', label: 'School of Ministry', icon: <Briefcase className="h-4 w-4" /> },
    { href: '/business-school', label: 'Business School', icon: <TrendingUp className="h-4 w-4" /> },
    { href: '/bible-theology', label: 'Bible Theology', icon: <BookOpen className="h-4 w-4" /> },
];

const resourcesNav = [
    { href: '/resources', label: 'Resource Library', icon: <Library className="h-4 w-4" /> },
    { href: '/live', label: 'Live & Replays', icon: <Clapperboard className="h-4 w-4" /> },
    { href: '/store', label: 'Store', icon: <Store className="h-4 w-4" /> },
    { href: '/events', label: 'Events Calendar', icon: <Calendar className="h-4 w-4" /> },
];

const adminNav = [
    { href: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
    { href: '/admin/announcements', label: 'Announcements', icon: <Megaphone className="h-4 w-4" /> },
    { href: '/admin/departments', label: 'Departments', icon: <Handshake className="h-4 w-4" /> },
    { href: '/admin/meetings', label: 'Meetings', icon: <Calendar className="h-4 w-4" /> },
    { href: '/admin/teachings', label: 'Teachings', icon: <BookOpen className="h-4 w-4" /> },
    { href: '/admin/courses', label: 'Courses', icon: <GraduationCap className="h-4 w-4" /> },
    { href: '/admin/mentorship', label: 'Mentorship', icon: <UserCheck className="h-4 w-4" /> },
    { href: '/admin/discipleship', label: 'Discipleship', icon: <Users className="h-4 w-4" /> },
    { href: '/admin/conferences', label: 'Conferences', icon: <Calendar className="h-4 w-4" /> },
    { href: '/admin/events', label: 'Events', icon: <Calendar className="h-4 w-4" /> },
    { href: '/admin/programming', label: 'Programming', icon: <ClipboardList className="h-4 w-4" /> },
    { href: '/admin/life-groups', label: 'Life Groups', icon: <Users className="h-4 w-4" /> },
    { href: '/admin/global-expansion', label: 'Global Strategy', icon: <Globe className="h-4 w-4" /> },
    { href: '/admin/roadmap', label: 'Roadmap', icon: <GraduationCap className="h-4 w-4" /> },
    { href: '/admin/settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
]

interface AppSidebarNavProps {
  onLinkClick?: () => void;
}

export function AppSidebarNav({ onLinkClick }: AppSidebarNavProps) {
  const pathname = usePathname();

  const createNavLink = (item: { href: string; label: string; icon: React.ReactNode }) => (
     <Link
        key={item.href}
        href={item.href}
        onClick={onLinkClick}
        className={cn(
          'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-muted-foreground transition-all hover:text-sidebar-foreground hover:bg-sidebar-muted',
           (pathname === item.href) && 'bg-sidebar-muted text-sidebar-foreground'
        )}
      >
        {item.icon}
        {item.label}
      </Link>
  );

  return (
    <nav className="grid items-start gap-1 px-2 text-sm font-medium">
       <Link
          href="/dashboard"
          onClick={onLinkClick}
          className={cn(
            'flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-muted-foreground transition-all hover:text-sidebar-foreground hover:bg-sidebar-muted font-semibold text-base',
            pathname === '/dashboard' && 'bg-sidebar-muted text-sidebar-foreground'
          )}
        >
          <Home className="h-5 w-5" />
          Dashboard
        </Link>
        
        <div className="px-3 py-2 text-xs font-medium text-sidebar-muted-foreground">Daily Practices</div>
        {dailyPracticesNav.map(createNavLink)}

        <div className="px-3 py-2 text-xs font-medium text-sidebar-muted-foreground">Warfare & Governance</div>
        {warfareNav.map(createNavLink)}
      
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="community" className="border-b-0">
          <AccordionTrigger className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-muted-foreground transition-all hover:text-sidebar-foreground hover:no-underline hover:bg-sidebar-muted data-[state=open]:bg-sidebar-muted data-[state=open]:text-sidebar-foreground")}>
            <Users className="h-4 w-4" />
            Community & Growth
          </AccordionTrigger>
          <AccordionContent className="pl-4 pb-0">
            <div className="flex flex-col space-y-1">
              {communityNav.map(createNavLink)}
            </div>
          </AccordionContent>
        </AccordionItem>

         <AccordionItem value="equipping" className="border-b-0">
          <AccordionTrigger className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-muted-foreground transition-all hover:text-sidebar-foreground hover:no-underline hover:bg-sidebar-muted data-[state=open]:bg-sidebar-muted data-[state=open]:text-sidebar-foreground")}>
            <GraduationCap className="h-4 w-4" />
            Equipping Centers
          </AccordionTrigger>
          <AccordionContent className="pl-4 pb-0">
            <div className="flex flex-col space-y-1">
              {equippingNav.map(createNavLink)}
            </div>
          </AccordionContent>
        </AccordionItem>
        
         <AccordionItem value="resources" className="border-b-0">
          <AccordionTrigger className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-muted-foreground transition-all hover:text-sidebar-foreground hover:no-underline hover:bg-sidebar-muted data-[state=open]:bg-sidebar-muted data-[state=open]:text-sidebar-foreground")}>
            <Library className="h-4 w-4" />
            Content Library
          </AccordionTrigger>
          <AccordionContent className="pl-4 pb-0">
            <div className="flex flex-col space-y-1">
              {resourcesNav.map(createNavLink)}
            </div>
          </AccordionContent>
        </AccordionItem>

         <AccordionItem value="admin" className="border-b-0">
          <AccordionTrigger className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-muted-foreground transition-all hover:text-sidebar-foreground hover:no-underline hover:bg-sidebar-muted",
           (pathname.startsWith('/admin')) && 'bg-sidebar-muted text-sidebar-foreground',
           "data-[state=open]:bg-sidebar-muted data-[state=open]:text-sidebar-foreground"
          )}>
            <Shield className="h-4 w-4" />
            Admin
          </AccordionTrigger>
          <AccordionContent className="pl-4 pb-0">
            <div className="flex flex-col space-y-1">
              {adminNav.map(createNavLink)}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="pt-4 mt-4 border-t border-border">
        {createNavLink({ href: "/notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> })}
        {createNavLink({ href: "/profile", label: "Profile & Settings", icon: <User className="h-4 w-4" /> })}
      </div>
       
    </nav>
  );
}
