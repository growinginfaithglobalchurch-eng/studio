'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BookOpen,
  Church,
  Clapperboard,
  HeartHandshake,
  LayoutDashboard,
  Settings,
  Users,
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
} from '@/components/ui/sidebar';

const menuItems = [
  {
    href: '/dashboard',
    icon: <LayoutDashboard />,
    label: 'Dashboard',
  },
  {
    href: '/devotionals',
    icon: <BookOpen />,
    label: 'Devotionals',
  },
  {
    href: '/prayer',
    icon: <HeartHandshake />,
    label: 'Prayer Wall',
  },
  {
    href: '/live',
    icon: <Clapperboard />,
    label: 'Live Sessions',
  },
  {
    href: '/ministries',
    icon: <Church />,
    label: 'Ministries',
  },
  {
    href: '/connect',
    icon: <Users />,
    label: 'Connect',
  },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="hidden md:flex md:flex-col md:border-r-0 bg-sidebar text-sidebar-foreground">
      <SidebarHeader className="p-4">
        <Link href="/dashboard" className="flex items-center gap-3">
          <Church className="h-8 w-8 text-sidebar-primary" />
          <div className="flex flex-col">
            <span className="font-headline text-xl font-bold text-sidebar-foreground">
              Faith Connect
            </span>
             <span className="text-xs text-sidebar-foreground/70">Global</span>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent className="p-4 pt-0">
        <SidebarMenu>
          {menuItems.map((item) => (
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
      </SidebarContent>

      <SidebarFooter className="p-4">
         <SidebarMenu>
            <SidebarMenuItem>
              <Link href="#">
                <SidebarMenuButton
                  className="w-full justify-start"
                >
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
         </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
