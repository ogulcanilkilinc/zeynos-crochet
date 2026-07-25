'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Testimonial, Locale } from '@/types';
import { getDictionary } from '@/i18n/config';
import TestimonialCard from './TestimonialCard';
import testimonialsData from '@/data/testimonials.json';

interface TestimonialCarouselProps {
  locale: Locale;
}

export default function TestimonialCarousel({ locale }: TestimonialCarouselProps) {
  const dict = getDictionary(locale);
  const testimonials = testimonialsData as Testimonial[];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  }, [testimonials.length]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(handleNext, 5000);
    return () => clearInterval(timer);
  }, [isPaused, handleNext]);

  return (
    <section className="section testimonials-section">
      <div className="container">
        <div className="section-header reveal">
          <h1 className="heading-lg">{dict.testimonials.title}</h1>
          <p className="body-lg text-muted">{dict.testimonials.subtitle}</p>
        </div>

        <div
          className="carousel reveal"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <button className="carousel-nav carousel-prev" onClick={handlePrev} aria-label="Previous">
            ‹
          </button>

          <div className="carousel-track">
            <div
              className="carousel-slides"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="carousel-slide">
                  <TestimonialCard testimonial={testimonial} locale={locale} />
                </div>
              ))}
            </div>
          </div>

          <button className="carousel-nav carousel-next" onClick={handleNext} aria-label="Next">
            ›
          </button>
        </div>

        <div className="carousel-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === currentIndex ? 'carousel-dot-active' : ''}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
