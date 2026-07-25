'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import type { Locale } from '@/types';
import { getDictionary } from '@/i18n/config';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  locale: Locale;
}

export default function MobileMenu({ isOpen, onClose, locale }: MobileMenuProps) {
  const dict = getDictionary(locale);

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add('no-scroll');
    } else {
      document.body.classList.remove('no-scroll');
    }
    return () => {
      document.body.classList.remove('no-scroll');
    };
  }, [isOpen]);

  if (!isOpen) return null;

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
    <>
      <div className="mobile-menu-overlay" onClick={onClose} />
      <div className="mobile-menu-panel">
        <div className="mobile-menu-header">
          <span className="header-logo accent-text">Zeyno&apos;s Crochet</span>
          <button
            className="mobile-menu-close"
            onClick={onClose}
            aria-label="Close menu"
          >
            ✕
          </button>
        </div>

        <nav>
          <ul className="mobile-menu-nav">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="mobile-menu-link"
                  onClick={onClose}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mobile-menu-footer">
          <LanguageSwitcher locale={locale} />
        </div>
      </div>
    </>
  );
}
