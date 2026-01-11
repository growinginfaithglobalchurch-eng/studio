
import { AppHeader } from '@/components/app-header';
import { AppBottomNav } from '@/components/app-bottom-nav';
import { AppSidebar } from '@/components/app-sidebar';

export default function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <div className="flex flex-1 flex-col">
        <AppHeader />
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6 bg-background pb-20 md:pb-6">
          {children}
        </main>
        <AppBottomNav />
      </div>
    </div>
  );
}
