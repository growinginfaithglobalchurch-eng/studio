
import { AppHeader } from '@/components/app-header';
import { AppBottomNav } from '@/components/app-bottom-nav';
import { AppSidebar } from '@/components/app-sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen w-full">
      <AppSidebar />
      <div className="flex flex-1 flex-col overflow-hidden">
        <AppHeader />
        <ScrollArea className="flex-1">
          <main className="flex-1 gap-4 p-4 lg:gap-6 lg:p-6 bg-background pb-20 md:pb-6">
            {children}
          </main>
        </ScrollArea>
        <AppBottomNav />
      </div>
    </div>
  );
}
