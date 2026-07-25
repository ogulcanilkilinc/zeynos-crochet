'use client';

import type { Locale } from '@/types';
import { getDictionary } from '@/i18n/config';
import { generateWhatsAppUrl } from '@/lib/utils';

interface HeroSectionProps {
  locale: Locale;
}

const WHATSAPP_PHONE = '905551234567';

export default function HeroSection({ locale }: HeroSectionProps) {
  const dict = getDictionary(locale);

  const whatsappMessage =
    locale === 'tr'
      ? 'Merhaba! Ürünleriniz hakkında bilgi almak istiyorum.'
      : 'Hello! I would like to get information about your products.';

  return (
    <section className="hero">
      <div className="hero-decoration-1" />
      <div className="hero-decoration-2" />
      <div className="hero-decoration-3" />

      <div className="hero-content">
        <h1 className="hero-title gradient-text">{dict.hero.title}</h1>
        <p className="hero-subtitle">{dict.hero.subtitle}</p>
        <div className="hero-buttons">
          <a href={`/${locale}/products`} className="btn btn-primary btn-lg">
            <span className="btn-icon">✨</span>
            {dict.hero.cta}
          </a>
          <a
            href={generateWhatsAppUrl(WHATSAPP_PHONE, whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp btn-lg"
          >
            <span className="btn-icon">📱</span>
            {dict.hero.ctaSecondary}
          </a>
        </div>
      </div>
    </section>
  );
}
