import type { Metadata } from 'next';
import type { Locale } from '@/types';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import StatsCounter from '@/components/home/StatsCounter';
import TestimonialsPreview from '@/components/home/TestimonialsPreview';
import { generateWhatsAppUrl } from '@/lib/utils';

const WHATSAPP_PHONE = '905551234567';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isEn = locale === 'en';

  return {
    title: isEn
      ? "Zeyno's Crochet | Handmade Knitting & Crochet"
      : "Zeyno's Crochet | El Yapımı Örgü & Tığ İşi",
    description: isEn
      ? "Zeynep's handmade knitting and crochet products. Baby blankets, amigurumi toys, knitted accessories and more."
      : "Zeynep'in el emeği örgü ve tığ işi ürünleri. Bebek battaniyeleri, amigurumi oyuncaklar, örgü aksesuarlar ve daha fazlası.",
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = locale as Locale;

  const whatsappMessage = loc === 'tr'
    ? 'Merhaba! Ürünleriniz hakkında bilgi almak istiyorum.'
    : 'Hello! I would like to learn more about your products.';

  const baseUrl = 'https://zeynoscrochet.com';
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: "Zeyno's Crochet",
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    description: loc === 'tr'
      ? "Zeynep'in el emeği örgü ve tığ işi ürünleri. Bebek battaniyeleri, amigurumi oyuncaklar, örgü aksesuarlar."
      : "Zeynep's handmade knitting and crochet products. Baby blankets, amigurumi toys, accessories.",
    sameAs: [
      'https://instagram.com/zeynos.crochet',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+90-555-123-4567',
      contactType: 'customer service',
      availableLanguage: ['Turkish', 'English'],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <HeroSection locale={loc} />
      <FeaturedProducts locale={loc} />
      <StatsCounter locale={loc} />
      <TestimonialsPreview locale={loc} />

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2 className="heading-lg">
              {loc === 'tr' ? 'Hayalinizdeki Ürünü Birlikte Tasarlayalım' : "Let's Design Your Dream Product Together"}
            </h2>
            <p className="body-lg">
              {loc === 'tr'
                ? 'Özel sipariş vermek veya sorularınız için benimle iletişime geçin.'
                : 'Contact me for custom orders or any questions you may have.'}
            </p>
            <a
              href={generateWhatsAppUrl(WHATSAPP_PHONE, whatsappMessage)}
              className="btn btn-primary btn-lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              🧶 {loc === 'tr' ? 'WhatsApp ile İletişim' : 'Contact via WhatsApp'}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
