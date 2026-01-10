
import { AppHeader } from '@/components/app-header';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <AppHeader />
      <main className="flex-1">{children}</main>
    </div>
  );
}
