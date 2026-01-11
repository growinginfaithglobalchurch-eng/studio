
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
import { useLanguage } from '@/context/language-context';

export function LanguageSwitcher() {
  const { toast } = useToast();
  const { setLanguage } = useLanguage();

  const handleLanguageChange = (lang: any, langName: string) => {
    setLanguage(lang);
    toast({
        title: 'Language Switched',
        description: `The language has been set to ${langName}.`,
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
        <DropdownMenuItem onSelect={() => handleLanguageChange('en', 'English')}>English</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('es', 'Spanish')}>Español (Spanish)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('fr', 'French')}>Français (French)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('zh', 'Mandarin')}>中文 (Mandarin)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('ur', 'Urdu')}>اردو (Urdu)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('pt', 'Portuguese')}>Português (Portuguese)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('de', 'German')}>Deutsch (German)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('ru', 'Russian')}>Русский (Russian)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('ar', 'Arabic')}>العربية (Arabic)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('hi', 'Hindi')}>हिन्दी (Hindi)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('ja', 'Japanese')}>日本語 (Japanese)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('ko', 'Korean')}>한국어 (Korean)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('it', 'Italian')}>Italiano (Italian)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('nl', 'Dutch')}>Nederlands (Dutch)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('sw', 'Swahili')}>Kiswahili (Swahili)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('yo', 'Yoruba')}>Yorùbá (Yoruba)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('bem', 'Bemba')}>Ichibemba (Bemba)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('ny', 'Chichewa')}>Chichewa (Nyanja)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('toi', 'Tonga')}>Chitonga (Tonga)</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => handleLanguageChange('loz', 'Lozi')}>Silozi (Lozi)</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
