

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
  Clock,
  MessageSquare,
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
    { href: '/identity-journal', label: 'Identity Journal', icon: <User className="h-4 w-4" /> },
    { href: '/kingdom-speech', label: 'Kingdom Speech', icon: <MessageSquare className="h-4 w-4" /> },
    { href: '/devotionals', label: 'Daily Declarations', icon: <Sparkles className="h-4 w-4" /> },
];

const communityNav = [
  { href: '/connect', label: 'Connect', icon: <Handshake className="h-4 w-4" /> },
  { href: '/groups', label: 'Groups', icon: <Users className="h-4 w-4" /> },
  { href: '/family-hub', label: 'Family Hub', icon: <Home className="h-4 w-4" /> },
  { href: '/mentorship', label: 'Mentorship', icon: <UserCheck className="h-4 w-4" /> },
  { href: '/kids-and-youth', label: 'Kids & Youth', icon: <Baby className="h-4 w-4" /> },
  { href: '/parental-dashboard', label: 'Parental Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> },
  { href: '/our-mandate', label: 'Our Mandate', icon: <BookMarked className="h-4 w-4" /> },
  { href: '/programming', label: 'Service Programming', icon: <ClipboardList className="h-4 w-4" /> },
  { href: '/departments', label: 'Departments', icon: <Users className="h-4 w-4" /> },
  { href: '/life-group-training', label: 'Life Group Training', icon: <Users className="h-4 w-4" /> },
  { href: '/church-integration', label: 'Church Integration', icon: <Handshake className="h-4 w-4" /> },
  { href: '/visiting-programs', label: 'Visiting Programs', icon: <Globe className="h-4 w-4" /> },
  { href: '/visitor-training-program', label: 'Visitor Training', icon: <GraduationCap className="h-4 w-4" /> },
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

const warfareNav = [
    { href: '/spirit-warfare', label: 'Overview', icon: <Swords className="h-4 w-4" /> },
    { href: '/war-room', label: 'War Room', icon: <Shield className="h-4 w-4" /> },
    { href: '/courts-of-heaven', label: 'Courts of Heaven', icon: <Gavel className="h-4 w-4" /> },
    { href: '/mercy-city', label: 'Mercy City', icon: <Shield className="h-4 w-4" /> },
    { href: '/mercy-city-session', label: 'Mercy City Session', icon: <BookOpen className="h-4 w-4" /> },
    { href: '/traveling-through-time', label: 'Traveling Through Time', icon: <Clock className="h-4 w-4" /> },
    { href: '/traveling-through-time-ezekiel-37', label: 'Time Travel (Ezekiel 37)', icon: <BookOpen className="h-4 w-4" /> },
    { href: '/global-prayer-hub', label: 'Global Prayer Hub', icon: <Globe className="h-4 w-4" /> },
    { href: '/prayer', label: 'Prayer Wall', icon: <HeartHandshake className="h-4 w-4" /> },
    { href: '/prayer-line-registration', label: 'Prayer Line', icon: <Phone className="h-4 w-4" /> },
]

const resourcesNav = [
    { href: '/resources', label: 'Resource Library', icon: <Library className="h-4 w-4" /> },
    { href: '/live', label: 'Live & Replays', icon: <Clapperboard className="h-4 w-4" /> },
    { href: '/store', label: 'Store', icon: <Store className="h-4 w-4" /> },
    { href: '/events', label: 'Events Calendar', icon: <Calendar className="h-4 w-4" /> },
];

const adminContentNav = [
    { href: '/admin/announcements', label: 'Announcements', icon: <Megaphone className="h-4 w-4" /> },
    { href: '/admin/teachings', label: 'Teachings', icon: <BookOpen className="h-4 w-4" /> },
    { href: '/admin/courses', label: 'Courses', icon: <GraduationCap className="h-4 w-4" /> },
];

const adminCommunityNav = [
    { href: '/admin/departments', label: 'Departments', icon: <Handshake className="h-4 w-4" /> },
    { href: '/admin/life-groups', label: 'Life Groups', icon: <Users className="h-4 w-4" /> },
    { href: '/admin/family-hub', label: 'Family Hub', icon: <Home className="h-4 w-4" /> },
    { href: '/admin/visitors', label: 'Visitors', icon: <Users className="h-4 w-4" /> },
];

const adminProgramsNav = [
    { href: '/admin/meetings', label: 'Meetings', icon: <Calendar className="h-4 w-4" /> },
    { href: '/admin/mentorship', label: 'Mentorship', icon: <UserCheck className="h-4 w-4" /> },
    { href: '/admin/discipleship', label: 'Discipleship', icon: <Users className="h-4 w-4" /> },
    { href: '/admin/conferences', label: 'Conferences', icon: <Calendar className="h-4 w-4" /> },
    { href: '/admin/events', label: 'Events', icon: <Calendar className="h-4 w-4" /> },
    { href: '/admin/programming', label: 'Programming', icon: <ClipboardList className="h-4 w-4" /> },
    { href: '/admin/global-prayer-hub', label: 'Global Prayer Hub', icon: <Globe className="h-4 w-4" /> },
];

const adminStrategyNav = [
    { href: '/admin/global-expansion', label: 'Global Strategy', icon: <Globe className="h-4 w-4" /> },
    { href: '/admin/roadmap', label: 'Roadmap', icon: <GraduationCap className="h-4 w-4" /> },
    { href: '/admin/settings', label: 'Settings', icon: <Settings className="h-4 w-4" /> },
];


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
  
  const createAccordionTrigger = (label: string, icon: React.ReactNode, pathPrefix: string) => (
       <AccordionTrigger className={cn("flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-muted-foreground transition-all hover:text-sidebar-foreground hover:no-underline hover:bg-sidebar-muted",
           (pathname.startsWith(pathPrefix)) && 'bg-sidebar-muted text-sidebar-foreground',
           "data-[state=open]:bg-sidebar-muted data-[state=open]:text-sidebar-foreground"
          )}>
            {icon}
            {label}
        </AccordionTrigger>
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
        
      <Accordion type="single" collapsible className="w-full" defaultValue={pathname.startsWith('/admin') ? 'admin' : ''}>
         <AccordionItem value="practices" className="border-b-0">
          {createAccordionTrigger("Daily Practices", <CheckSquare className="h-4 w-4" />, "/growth-hub")}
          <AccordionContent className="pl-4 pb-0">
            <div className="flex flex-col space-y-1">
              {dailyPracticesNav.map(createNavLink)}
            </div>
          </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="community" className="border-b-0">
          {createAccordionTrigger("Community & Growth", <Users className="h-4 w-4" />, "/")}
          <AccordionContent className="pl-4 pb-0">
            <div className="flex flex-col space-y-1">
              {communityNav.map(createNavLink)}
            </div>
          </AccordionContent>
        </AccordionItem>

         <AccordionItem value="equipping" className="border-b-0">
          {createAccordionTrigger("Equipping Centers", <GraduationCap className="h-4 w-4" />, "/school")}
          <AccordionContent className="pl-4 pb-0">
            <div className="flex flex-col space-y-1">
              {equippingNav.map(createNavLink)}
            </div>
          </AccordionContent>
        </AccordionItem>
        
         <AccordionItem value="warfare" className="border-b-0">
          {createAccordionTrigger("Warfare & Governance", <Shield className="h-4 w-4" />, "/warfare")}
          <AccordionContent className="pl-4 pb-0">
            <div className="flex flex-col space-y-1">
              {warfareNav.map(createNavLink)}
            </div>
          </AccordionContent>
        </AccordionItem>

         <AccordionItem value="resources" className="border-b-0">
          {createAccordionTrigger("Content Library", <Library className="h-4 w-4" />, "/resources")}
          <AccordionContent className="pl-4 pb-0">
            <div className="flex flex-col space-y-1">
              {resourcesNav.map(createNavLink)}
            </div>
          </AccordionContent>
        </AccordionItem>

         <AccordionItem value="admin" className="border-b-0">
          {createAccordionTrigger("Admin", <Shield className="h-4 w-4" />, "/admin")}
          <AccordionContent className="pl-4 pb-0">
             <div className="flex flex-col space-y-1">
                 {createNavLink({ href: '/admin', label: 'Dashboard', icon: <LayoutDashboard className="h-4 w-4" /> })}
                
                 <Accordion type="multiple" className="w-full">
                     <AccordionItem value="content" className="border-b-0">
                        <AccordionTrigger className="pl-3 py-2 text-sidebar-muted-foreground text-xs font-medium hover:no-underline justify-start gap-2">
                           Content Management
                        </AccordionTrigger>
                        <AccordionContent className="pl-8 pb-0">
                           {adminContentNav.map(createNavLink)}
                        </AccordionContent>
                     </AccordionItem>
                     <AccordionItem value="community-admin" className="border-b-0">
                        <AccordionTrigger className="pl-3 py-2 text-sidebar-muted-foreground text-xs font-medium hover:no-underline justify-start gap-2">
                           Community & Users
                        </AccordionTrigger>
                        <AccordionContent className="pl-8 pb-0">
                           {adminCommunityNav.map(createNavLink)}
                        </AccordionContent>
                     </AccordionItem>
                     <AccordionItem value="programs-admin" className="border-b-0">
                        <AccordionTrigger className="pl-3 py-2 text-sidebar-muted-foreground text-xs font-medium hover:no-underline justify-start gap-2">
                           Programs & Events
                        </AccordionTrigger>
                        <AccordionContent className="pl-8 pb-0">
                           {adminProgramsNav.map(createNavLink)}
                        </AccordionContent>
                     </AccordionItem>
                      <AccordionItem value="strategy-admin" className="border-b-0">
                        <AccordionTrigger className="pl-3 py-2 text-sidebar-muted-foreground text-xs font-medium hover:no-underline justify-start gap-2">
                           Strategy & Settings
                        </AccordionTrigger>
                        <AccordionContent className="pl-8 pb-0">
                           {adminStrategyNav.map(createNavLink)}
                        </AccordionContent>
                     </AccordionItem>
                 </Accordion>
             </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="pt-4 mt-4 border-t border-border">
        {createNavLink({ href: "/notifications", label: "Notifications", icon: <Bell className="h-4 w-4" /> })}
        {createNavLink({ href: "/profile", label: "Profile & Settings", icon: <User className="h-4 w-4" /> })}
        {createNavLink({ href: "/certificates", label: "Certificates", icon: <Award className="h-4 w-4" /> })}
      </div>
       
    </nav>
  );
}









