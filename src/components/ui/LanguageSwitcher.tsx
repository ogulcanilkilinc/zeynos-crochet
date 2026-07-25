'use client';

import { usePathname, useRouter } from 'next/navigation';
import type { Locale } from '@/types';
import { cn } from '@/lib/utils';

interface LanguageSwitcherProps {
  locale: Locale;
}

export default function LanguageSwitcher({ locale }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: Locale) => {
    if (newLocale === locale) return;

    // Replace the locale segment in the current path
    const segments = pathname.split('/');
    if (segments[1] === 'tr' || segments[1] === 'en') {
      segments[1] = newLocale;
    } else {
      segments.splice(1, 0, newLocale);
    }
    router.push(segments.join('/'));
  };

  return (
    <div className="lang-switcher">
      <button
        className={cn('lang-btn', locale === 'tr' && 'lang-btn-active')}
        onClick={() => switchLocale('tr')}
        aria-label="Türkçe"
      >
        🇹🇷 TR
      </button>
      <button
        className={cn('lang-btn', locale === 'en' && 'lang-btn-active')}
        onClick={() => switchLocale('en')}
        aria-label="English"
      >
        🇬🇧 EN
      </button>
    </div>
  );
}
