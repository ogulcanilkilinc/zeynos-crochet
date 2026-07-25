'use client';

import { cn } from '@/lib/utils';
import type { Locale } from '@/types';
import { getDictionary } from '@/i18n/config';

interface ProductFilterProps {
  activeFilter: string;
  onFilterChange: (filter: string) => void;
  locale: Locale;
}

const filters = [
  { key: 'all', labelKey: 'filterAll' as const },
  { key: 'knitting', labelKey: 'filterKnitting' as const },
  { key: 'crochet', labelKey: 'filterCrochet' as const },
  { key: 'amigurumi', labelKey: 'filterAmigurumi' as const },
  { key: 'accessory', labelKey: 'filterAccessory' as const },
];

export default function ProductFilter({ activeFilter, onFilterChange, locale }: ProductFilterProps) {
  const dict = getDictionary(locale);

  return (
    <div className="filter-bar">
      {filters.map((filter) => (
        <button
          key={filter.key}
          className={cn('filter-btn', activeFilter === filter.key && 'filter-btn-active')}
          onClick={() => onFilterChange(filter.key)}
        >
          {dict.products[filter.labelKey]}
        </button>
      ))}
    </div>
  );
}
