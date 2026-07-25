'use client';

import Link from 'next/link';
import type { Locale } from '@/types';
import { getDictionary } from '@/i18n/config';

interface FooterProps {
  locale: Locale;
}

export default function Footer({ locale }: FooterProps) {
  const dict = getDictionary(locale);

  const navLinks = [
    { href: `/${locale}`, label: dict.nav.home },
    { href: `/${locale}/portfolio`, label: dict.nav.portfolio },
    { href: `/${locale}/products`, label: dict.nav.products },
    { href: `/${locale}/about`, label: dict.nav.about },
    { href: `/${locale}/testimonials`, label: dict.nav.testimonials },
    { href: `/${locale}/contact`, label: dict.nav.contact },
    { href: `/${locale}/order-tracking`, label: dict.nav.orderTracking },
  ];

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div>
            <div className="footer-brand accent-text">{dict.footer.brand}</div>
            <p className="footer-tagline">{dict.footer.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="footer-heading">{locale === 'tr' ? 'Hızlı Bağlantılar' : 'Quick Links'}</h3>
            <ul className="footer-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="footer-link">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="footer-heading">{locale === 'tr' ? 'Sosyal Medya' : 'Social Media'}</h3>
            <ul className="footer-links">
              <li>
                <a href="https://wa.me/905551234567" className="footer-link" target="_blank" rel="noopener noreferrer">
                  📱 WhatsApp
                </a>
              </li>
              <li>
                <a href="https://instagram.com/zeynos.crochet" className="footer-link" target="_blank" rel="noopener noreferrer">
                  📸 Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <span>© 2024 Zeyno&apos;s Crochet. {dict.footer.rights}</span>
          <span>{dict.footer.madeWithLove}</span>
        </div>
      </div>
    </footer>
  );
}
