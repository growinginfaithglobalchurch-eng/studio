
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Shield, Globe, Award, Tv } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/dashboard', icon: <Home className="h-5 w-5" />, label: 'Dashboard' },
  { href: '/live/viewer', icon: <Tv className="h-5 w-5" />, label: 'Live' },
  { href: '/war-room', icon: <Shield className="h-5 w-5" />, label: 'War Room' },
  { href: '/visiting-programs', icon: <Globe className="h-5 w-5" />, label: 'Programs' },
  { href: '/certificates', icon: <Award className="h-5 w-5" />, label: 'Certs' },
];

export function AppBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-card border-t border-border md:hidden">
      <div className="grid h-full max-w-lg grid-cols-5 mx-auto font-medium">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'inline-flex flex-col items-center justify-center px-5 hover:bg-muted text-muted-foreground',
              (pathname.startsWith(item.href) && (item.href !== '/dashboard' || pathname === '/dashboard')) && 'text-primary'
            )}
          >
            {item.icon}
            <span className="text-xs">{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
