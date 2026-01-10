
'use client';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from './ui/button';
import { Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function LanguageSwitcher() {
  const { toast } = useToast();

  const handleLanguageChange = (lang: string) => {
    toast({
        title: 'Language Switched',
        description: `The language has been set to ${lang}. Content will be translated shortly.`,
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Globe className="h-5 w-5 text-muted-foreground" />
          <span className="sr-only">Change language</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onSelect={() => handleLanguageChange('English')}>
          English
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('Spanish')}>
          Español
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('French')}>
          Français
        </DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('Mandarin')}>
          中文
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
