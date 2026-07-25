'use client';

import { useState, useEffect, useRef } from 'react';
import type { Locale } from '@/types';
import { getDictionary } from '@/i18n/config';

interface StatsCounterProps {
  locale: Locale;
}

interface StatItem {
  icon: string;
  target: number;
  suffix: string;
  labelKey: 'products' | 'happyCustomers' | 'yearsExperience' | 'handmade';
}

const stats: StatItem[] = [
  { icon: '🧶', target: 50, suffix: '+', labelKey: 'products' },
  { icon: '😊', target: 200, suffix: '+', labelKey: 'happyCustomers' },
  { icon: '⏰', target: 15, suffix: '+', labelKey: 'yearsExperience' },
  { icon: '✨', target: 1000, suffix: '+', labelKey: 'handmade' },
];

function useCountUp(target: number, isVisible: boolean, duration: number = 2000) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target, isVisible, duration]);

  return count;
}

function StatCard({ stat, locale, isVisible }: { stat: StatItem; locale: Locale; isVisible: boolean }) {
  const dict = getDictionary(locale);
  const count = useCountUp(stat.target, isVisible);

  return (
    <div className="stat-card">
      <span className="stat-icon">{stat.icon}</span>
      <div className="stat-number">{count}{stat.suffix}</div>
      <div className="stat-label">{dict.stats[stat.labelKey]}</div>
    </div>
  );
}

export default function StatsCounter({ locale }: StatsCounterProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section" ref={ref}>
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat) => (
            <StatCard key={stat.labelKey} stat={stat} locale={locale} isVisible={isVisible} />
          ))}
        </div>
      </div>
    </section>
  );
}
