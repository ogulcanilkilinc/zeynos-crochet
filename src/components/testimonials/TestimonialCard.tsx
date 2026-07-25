'use client';

import type { Testimonial, Locale } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
  locale: Locale;
}

export default function TestimonialCard({ testimonial, locale }: TestimonialCardProps) {
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`star ${i < rating ? 'star-filled' : 'star-empty'}`}>
        {i < rating ? '★' : '☆'}
      </span>
    ));
  };

  return (
    <div className="testimonial-card">
      <div className="testimonial-quote-icon">"</div>
      <div className="testimonial-stars">{renderStars(testimonial.rating)}</div>
      <p className="testimonial-text">{testimonial.comment[locale]}</p>
      <div className="testimonial-author">
        <div className="testimonial-avatar">
          {testimonial.name.charAt(0).toUpperCase()}
        </div>
        <div className="testimonial-author-info">
          <span className="testimonial-name">{testimonial.name}</span>
          <span className="testimonial-date">
            {new Date(testimonial.date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
              year: 'numeric',
              month: 'long',
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
