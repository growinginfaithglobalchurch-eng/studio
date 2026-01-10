import Link from 'next/link';
import { Church } from 'lucide-react';
import { AppSidebarNav } from './app-sidebar-nav';
import { ScrollArea } from './ui/scroll-area';


export function AppSidebar() {
  return (
    <div className="hidden border-r bg-card text-card-foreground md:block w-64">
      <div className="flex h-full max-h-screen flex-col gap-2">
        <div className="flex h-16 items-center border-b-[1.5px] border-border px-6">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Church className="h-6 w-6 text-accent" />
            <span className="">Faith Connect</span>
          </Link>
        </div>
        <ScrollArea className="flex-1 py-2">
          <AppSidebarNav />
        </ScrollArea>
      </div>
    </div>
  );
}
