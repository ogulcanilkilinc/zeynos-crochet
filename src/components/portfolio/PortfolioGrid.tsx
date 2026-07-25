'use client';

import { useState } from 'react';
import type { PortfolioItem, Locale } from '@/types';
import { getDictionary } from '@/i18n/config';
import { cn } from '@/lib/utils';
import PortfolioCard from './PortfolioCard';
import LightboxModal from './LightboxModal';
import portfolioData from '@/data/portfolio.json';

interface PortfolioGridProps {
  locale: Locale;
}

const filters = [
  { key: 'all', labelKey: 'filterAll' as const },
  { key: 'knitting', labelKey: 'filterKnitting' as const },
  { key: 'crochet', labelKey: 'filterCrochet' as const },
  { key: 'amigurumi', labelKey: 'filterAmigurumi' as const },
  { key: 'accessory', labelKey: 'filterAccessory' as const },
];

export default function PortfolioGrid({ locale }: PortfolioGridProps) {
  const dict = getDictionary(locale);
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const items = portfolioData as PortfolioItem[];
  const filteredItems = items.filter(
    (item) => activeFilter === 'all' || item.category === activeFilter
  );

  return (
    <section className="section">
      <div className="container">
        <div className="section-header reveal">
          <h1 className="heading-lg">{dict.portfolio.title}</h1>
          <p className="body-lg text-muted">{dict.portfolio.subtitle}</p>
        </div>

        <div className="filter-bar reveal">
          {filters.map((filter) => (
            <button
              key={filter.key}
              className={cn('filter-btn', activeFilter === filter.key && 'filter-btn-active')}
              onClick={() => setActiveFilter(filter.key)}
            >
              {dict.portfolio[filter.labelKey]}
            </button>
          ))}
        </div>

        <div className="portfolio-grid">
          {filteredItems.map((item) => (
            <PortfolioCard
              key={item.id}
              item={item}
              locale={locale}
              onClick={() => setSelectedItem(item)}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">🧶</span>
            <p>{locale === 'tr' ? 'Bu kategoride çalışma bulunamadı.' : 'No works found in this category.'}</p>
          </div>
        )}

        <LightboxModal
          item={selectedItem}
          locale={locale}
          onClose={() => setSelectedItem(null)}
        />
      </div>
    </section>
  );
}
