'use client';

import Link from 'next/link';
import type { Locale, Testimonial } from '@/types';
import { getDictionary } from '@/i18n/config';
import testimonialsData from '@/data/testimonials.json';
import TestimonialCard from '@/components/testimonials/TestimonialCard';

interface TestimonialsPreviewProps {
  locale: Locale;
}

export default function TestimonialsPreview({ locale }: TestimonialsPreviewProps) {
  const dict = getDictionary(locale);
  const testimonials = (testimonialsData as Testimonial[]).slice(0, 3);

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <h2 className="heading-lg">{dict.testimonials.title}</h2>
          <p className="body-lg text-muted">{dict.testimonials.subtitle}</p>
        </div>

        <div className="testimonials-preview-grid">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} locale={locale} />
          ))}
        </div>

        <div className="testimonials-preview-action">
          <Link href={`/${locale}/testimonials`} className="btn btn-outline btn-lg">
            {dict.common.seeAll} →
          </Link>
        </div>
      </div>
    </section>
  );
}
