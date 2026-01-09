'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Church,
  Clapperboard,
  HeartHandshake,
  LayoutDashboard,
  MessageSquarePlus,
  PlusCircle,
  Settings,
  Users,
  User,
  Rss,
  Shield,
  UserCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarSeparator,
} from '@/components/ui/sidebar';

const menuItems = [
  {
    href: '/dashboard',
    icon: <LayoutDashboard className="h-5 w-5" />,
    label: 'Home',
  },
  {
    href: '/feeds',
    icon: <Rss className="h-5 w-5" />,
    label: 'Feeds',
  },
  {
    href: '/devotionals',
    icon: <BookOpen className="h-5 w-5" />,
    label: 'Devotionals',
  },
  {
    href: '/prayer',
    icon: <HeartHandshake className="h-5 w-5" />,
    label: 'Prayer Wall',
  },
  {
    href: '/live',
    icon: <Clapperboard className="h-5 w-5" />,
    label: 'Live Sessions',
  },
  {
    href: '/ministries',
    icon: <Church className="h-5 w-5" />,
    label: 'Ministries',
  },
  {
    href: '/connect',
    icon: <Users className="h-5 w-5" />,
    label: 'Connect',
  },
  {
    href: '/groups',
    icon: <Users className="h-5 w-5" />,
    label: 'Groups',
  },
  {
    href: '/mentorship',
    icon: <UserCheck className="h-5 w-5" />,
    label: 'Mentorship',
  },
  {
    href: '/profile',
    icon: <User className="h-5 w-5" />,
    label: 'Profile',
  },
  {
    href: '/admin',
    icon: <Shield className="h-5 w-5" />,
    label: 'Admin',
  }
];

const topLevelNav = ['/dashboard', '/feeds', '/devotionals', '/prayer', '/live', '/ministries', '/profile'];
const connectNav = ['/connect', '/groups', '/mentorship'];
const adminNav = ['/admin'];


const MainMenu = ({ items }: { items: typeof menuItems }) => {
    const pathname = usePathname();
    return (
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href}>
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  className={cn(
                    'w-full justify-start',
                    pathname === item.href &&
                      'bg-sidebar-accent text-sidebar-accent-foreground'
                  )}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
    )
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="hidden md:flex md:flex-col md:border-r-0 bg-sidebar text-sidebar-foreground">
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Church className="h-8 w-8 text-accent" />
          <div className="flex flex-col">
            <span className="font-headline text-lg text-sidebar-foreground font-bold">
              Growing In Faith
            </span>
             <span className="text-sm text-sidebar-foreground/70 -mt-1">Global Connect</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-4 pt-0">
         <SidebarMenu>
            <SidebarGroup>
                <SidebarGroupLabel>Quick Actions</SidebarGroupLabel>
                <SidebarMenuItem>
                    <Link href="/prayer">
                        <SidebarMenuButton size="sm" className="w-full justify-start">
                            <PlusCircle className="h-4 w-4" />
                            <span>Submit a Prayer</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
                 <SidebarMenuItem>
                    <Link href="/groups">
                        <SidebarMenuButton size="sm" className="w-full justify-start">
                            <MessageSquarePlus className="h-4 w-4" />
                            <span>Start a Discussion</span>
                        </SidebarMenuButton>
                    </Link>
                </SidebarMenuItem>
            </SidebarGroup>
        </SidebarMenu>

        <SidebarSeparator />
        
        <MainMenu items={menuItems.filter(item => topLevelNav.includes(item.href))} />

        <SidebarSeparator />

        <SidebarGroup>
            <SidebarGroupLabel>Community</SidebarGroupLabel>
            <MainMenu items={menuItems.filter(item => connectNav.includes(item.href))} />
        </SidebarGroup>

        <SidebarSeparator />

         <SidebarGroup>
            <SidebarGroupLabel>Admin</SidebarGroupLabel>
            <MainMenu items={menuItems.filter(item => adminNav.includes(item.href))} />
        </SidebarGroup>

      </SidebarContent>

      <SidebarFooter className="p-4 mt-auto">
         <SidebarMenu>
            <SidebarMenuItem>
              <Link href="#">
                <SidebarMenuButton
                  className="w-full justify-start"
                >
                  <Settings className="h-5 w-5" />
                  <span>Settings</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
