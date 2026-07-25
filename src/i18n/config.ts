import tr from './tr.json';
import en from './en.json';

export const locales = ['tr', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'tr';

const dictionaries: Record<Locale, typeof tr> = { tr, en };

export function getDictionary(locale: Locale) {
  return dictionaries[locale] || dictionaries[defaultLocale];
}

export function getNestedValue(obj: Record<string, unknown>, path: string): string {
  return path.split('.').reduce((acc: unknown, part: string) => {
    if (acc && typeof acc === 'object') {
      return (acc as Record<string, unknown>)[part];
    }
    return path;
  }, obj) as string;
}
