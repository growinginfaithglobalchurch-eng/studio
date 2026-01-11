
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
        <DropdownMenuItem onSelect={() => handleLanguageChange('English')}>English</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('Spanish')}>Español (Spanish)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('French')}>Français (French)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('Mandarin')}>中文 (Mandarin)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('Urdu')}>اردو (Urdu)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('Portuguese')}>Português (Portuguese)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('German')}>Deutsch (German)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('Russian')}>Русский (Russian)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('Arabic')}>العربية (Arabic)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('Hindi')}>हिन्दी (Hindi)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('Japanese')}>日本語 (Japanese)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('Korean')}>한국어 (Korean)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('Italian')}>Italiano (Italian)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('Dutch')}>Nederlands (Dutch)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('Swahili')}>Kiswahili (Swahili)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('Yoruba')}>Yorùbá (Yoruba)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
