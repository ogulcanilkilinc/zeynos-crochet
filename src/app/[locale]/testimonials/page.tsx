import type { Metadata } from 'next';
import type { Locale } from '@/types';
import TestimonialCarousel from '@/components/testimonials/TestimonialCarousel';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'en' ? "Testimonials | Zeyno's Crochet" : "Müşteri Yorumları | Zeyno's Crochet",
    description: locale === 'en'
      ? 'Read reviews and testimonials from our happy customers.'
      : 'Mutlu müşterilerimizden yorumları ve değerlendirmeleri okuyun.',
  };
}

export default async function TestimonialsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <section className="section">
      <div className="container">
        <div className="testimonials-stats">
          <div className="stat-card">
            <span className="stat-icon">⭐</span>
            <span className="stat-number">4.8</span>
            <span className="stat-label">{locale === 'tr' ? 'Ortalama Puan' : 'Average Rating'}</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">😊</span>
            <span className="stat-number">200+</span>
            <span className="stat-label">{locale === 'tr' ? 'Mutlu Müşteri' : 'Happy Customers'}</span>
          </div>
          <div className="stat-card">
            <span className="stat-icon">💯</span>
            <span className="stat-number">98%</span>
            <span className="stat-label">{locale === 'tr' ? 'Memnuniyet Oranı' : 'Satisfaction Rate'}</span>
          </div>
        </div>

        <TestimonialCarousel locale={locale as Locale} />
      </div>
    </section>
  );
}
