'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import type { Locale } from '@/types';
import { getDictionary } from '@/i18n/config';
import { cn } from '@/lib/utils';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import MobileMenu from '@/components/layout/MobileMenu';

interface HeaderProps {
  locale: Locale;
}

export default function Header({ locale }: HeaderProps) {
  const dict = getDictionary(locale);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      <header className={cn('header', isScrolled && 'header-scrolled')}>
        <div className="header-inner">
          <Link href={`/${locale}`} className="header-logo accent-text">
            Zeyno&apos;s Crochet
          </Link>

          <nav>
            <ul className="header-nav">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="header-nav-link">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header-actions">
            <LanguageSwitcher locale={locale} />
            <button
              className="hamburger"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="hamburger-line" />
              <span className="hamburger-line" />
              <span className="hamburger-line" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        locale={locale}
      />
    </>
  );
}
