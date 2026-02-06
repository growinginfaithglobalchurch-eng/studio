
import type { Metadata } from 'next';
import { Noto_Serif, Inconsolata } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { LanguageProvider } from '@/context/language-context';
import { cn } from '@/lib/utils';

const fontBody = Noto_Serif({
  subsets: ['latin'],
  variable: '--font-body',
  weight: ['400', '700'],
});

const fontMono = Inconsolata({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Faith Connect Global',
  description:
    'A dynamic digital platform designed to bring believers into deeper connection with God, each other, and their divine purpose.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          'font-body antialiased',
          fontBody.variable,
          fontMono.variable
        )}
      >
        <LanguageProvider>
          {children}
          <Toaster />
        </LanguageProvider>
      </body>
    </html>
  );
}
