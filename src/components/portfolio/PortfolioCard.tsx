'use client';

import Image from 'next/image';
import type { PortfolioItem, Locale } from '@/types';
import Badge from '@/components/ui/Badge';

interface PortfolioCardProps {
  item: PortfolioItem;
  locale: Locale;
  onClick: () => void;
}

export default function PortfolioCard({ item, locale, onClick }: PortfolioCardProps) {
  const categoryLabels: Record<string, Record<string, string>> = {
    tr: { knitting: 'Örgü', crochet: 'Tığ İşi', amigurumi: 'Amigurumi', accessory: 'Aksesuar' },
    en: { knitting: 'Knitting', crochet: 'Crochet', amigurumi: 'Amigurumi', accessory: 'Accessory' },
  };

  return (
    <div
      className="portfolio-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
    >
      <Badge variant="default" className="portfolio-card-badge">
        {categoryLabels[locale][item.category]}
      </Badge>
      <Image
        src={item.images[0] || '/images/placeholder.jpg'}
        alt={item.title[locale]}
        width={400}
        height={300}
        className="portfolio-card-image"
        unoptimized
      />
      <div className="portfolio-card-overlay">
        <h3 className="portfolio-card-title">{item.title[locale]}</h3>
        <p className="portfolio-card-desc">{item.description[locale].substring(0, 80)}...</p>
        <div className="portfolio-card-techniques">
          {item.techniques[locale].slice(0, 3).map((tech, i) => (
            <span key={i} className="technique-tag">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
