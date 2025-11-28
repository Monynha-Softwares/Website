import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Globe } from 'lucide-react';
import { cn } from '@/lib/utils';

export const LanguageSwitcher = ({ className }: { className?: string }) => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    document.documentElement.lang = lng; // Update HTML lang attribute
  };

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'pt-BR', name: 'Português (BR)' },
    { code: 'es', name: 'Español' },
    { code: 'fr', name: 'Français' },
  ];

  return (
    <Select value={i18n.language} onValueChange={changeLanguage}>
      <SelectTrigger className={cn("w-[150px] border-border/70 bg-background/70 backdrop-blur-xl", className)}>
        <Globe className="h-4 w-4 mr-2 text-muted-foreground" />
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent className="bg-surface-1 border-border/70">
        {languages.map((lang) => (
          <SelectItem key={lang.code} value={lang.code}>
            {lang.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

LanguageSwitcher.displayName = "LanguageSwitcher";