
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageCircle, Users, User, Handshake } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/feeds', icon: <Home className="h-5 w-5" />, label: 'Home' },
  { href: '/connect', icon: <Handshake className="h-5 w-5" />, label: 'Connect' },
  { href: '/chat', icon: <MessageCircle className="h-5 w-5" />, label: 'Chat' },
  { href: '/profile', icon: <User className="h-5 w-5" />, label: 'Me' },
];

export function AppBottomNav() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-0 left-0 z-50 w-full h-16 bg-card border-t border-border md:hidden">
      <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'inline-flex flex-col items-center justify-center px-5 hover:bg-muted text-muted-foreground',
              (pathname === item.href || (item.href === '/profile' && pathname.startsWith('/dashboard'))) && 'text-primary'
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
