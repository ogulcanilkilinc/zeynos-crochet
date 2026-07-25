'use client';

import { useEffect, useCallback, useState } from 'react';
import Image from 'next/image';
import type { PortfolioItem, Locale } from '@/types';
import Modal from '@/components/ui/Modal';

interface LightboxModalProps {
  item: PortfolioItem | null;
  locale: Locale;
  onClose: () => void;
}

export default function LightboxModal({ item, locale, onClose }: LightboxModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    setCurrentImageIndex(0);
  }, [item]);

  const handlePrev = useCallback(() => {
    if (!item) return;
    setCurrentImageIndex((prev) => (prev > 0 ? prev - 1 : item.images.length - 1));
  }, [item]);

  const handleNext = useCallback(() => {
    if (!item) return;
    setCurrentImageIndex((prev) => (prev < item.images.length - 1 ? prev + 1 : 0));
  }, [item]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };
    if (item) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [item, handlePrev, handleNext]);

  if (!item) return null;

  return (
    <Modal isOpen={!!item} onClose={onClose}>
      <div className="lightbox">
        <div className="lightbox-image-container">
          {item.images.length > 1 && (
            <button className="lightbox-nav lightbox-prev" onClick={handlePrev}>‹</button>
          )}
          <Image
            src={item.images[currentImageIndex] || '/images/placeholder.jpg'}
            alt={item.title[locale]}
            width={800}
            height={600}
            className="lightbox-img"
            unoptimized
          />
          {item.images.length > 1 && (
            <button className="lightbox-nav lightbox-next" onClick={handleNext}>›</button>
          )}
        </div>
        <div className="lightbox-info">
          <h2 className="heading-md">{item.title[locale]}</h2>
          <p className="body-md text-muted">{item.description[locale]}</p>
          <div className="lightbox-meta">
            <div className="lightbox-techniques">
              {item.techniques[locale].map((tech, i) => (
                <span key={i} className="technique-tag">{tech}</span>
              ))}
            </div>
            <span className="lightbox-date">
              {new Date(item.completedAt).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
                year: 'numeric',
                month: 'long',
              })}
            </span>
          </div>
          {item.images.length > 1 && (
            <div className="lightbox-dots">
              {item.images.map((_, i) => (
                <button
                  key={i}
                  className={`lightbox-dot ${i === currentImageIndex ? 'lightbox-dot-active' : ''}`}
                  onClick={() => setCurrentImageIndex(i)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
}
