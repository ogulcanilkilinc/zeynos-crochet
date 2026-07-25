import type { Metadata } from 'next';
import type { Locale } from '@/types';
import Link from 'next/link';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title:
      locale === 'en'
        ? "About | Zeyno's Crochet"
        : "Hakkımda | Zeyno's Crochet",
    description:
      locale === 'en'
        ? "Learn about Zeynep's crochet journey, techniques, and passion for handmade crafts."
        : "Zeynep'in örgü yolculuğu, teknikleri ve el yapımı sanatına olan tutkusu hakkında bilgi edinin.",
  };
}

const content = {
  tr: {
    title: 'Zeynep\'in Örgü Hikayesi',
    subtitle: 'Her ilmeğe sevgi katarak...',
    storyTitle: 'Hikayem',
    storyText: `Örgü ve tığ işi tutkum, büyükannemin sıcacık ellerinde başladı. Küçük bir kız çocuğuyken, onun yanında oturup renkli ipliklerin dans edişini izlerdim. O günlerden bugüne, her ilmek benim için bir sevgi ifadesi oldu.

Yıllar içinde bu tutku bir sanata dönüştü. Geleneksel Türk örgü tekniklerini modern tasarımlarla birleştirerek, her biri benzersiz ürünler yaratıyorum. Bebek battaniyelerinden amigurumi oyuncaklara, kış aksesuarlarından ev dekorasyonuna kadar geniş bir yelpazede üretim yapıyorum.

Her ürünüm, doğal ve kaliteli malzemelerle, büyük bir özen ve sabırla hazırlanıyor. Çünkü biliyorum ki, el yapımı bir ürün sadece bir eşya değil – içinde bir hikaye, bir emek ve çok fazla sevgi barındırır.`,
    techniquesTitle: 'Tekniklerim',
    techniques: [
      {
        name: 'Örgü (Knitting)',
        icon: '🧶',
        description: 'Şiş örgü tekniğiyle battaniyeler, bereler, atkılar ve daha fazlası. Geleneksel Türk motifleriyle modern tasarımları harmanlıyorum.',
      },
      {
        name: 'Tığ İşi (Crochet)',
        icon: '🪡',
        description: 'Tığ işi tekniğiyle sepetler, suplalar, dantel örtüler ve dekoratif ürünler. İnce işçilik ve zarif desenler.',
      },
      {
        name: 'Amigurumi',
        icon: '🧸',
        description: 'Japon kökenli bu tığ işi tekniğiyle sevimli oyuncaklar ve figürler örüyorum. Her biri çocuklar için güvenli malzemelerle üretilir.',
      },
    ],
    materialsTitle: 'Malzemelerim',
    materialsText: 'Ürünlerimde yalnızca en kaliteli, doğal ve güvenli malzemeleri kullanıyorum. Organik pamuk, merino yünü, bambu iplik ve anti-alerjik dolgu malzemeleri temel tercihlerim arasında. Özellikle bebek ürünlerinde sertifikalı, cilde uyumlu malzemeler kullanmaya özen gösteriyorum.',
    materials: [
      { name: 'Organik Pamuk', emoji: '🌿' },
      { name: 'Merino Yünü', emoji: '🐑' },
      { name: 'Bambu İplik', emoji: '🎋' },
      { name: 'Anti-Alerjik Dolgu', emoji: '☁️' },
    ],
    timelineTitle: 'Yolculuğum',
    timeline: [
      { year: '2009', event: 'Büyükannesinden öğrenmeye başladı' },
      { year: '2012', event: 'İlk amigurumi çalışması' },
      { year: '2015', event: 'Sipariş almaya başladı' },
      { year: '2018', event: "Instagram'da paylaşıma başladı" },
      { year: '2020', event: "Zeyno's Crochet'i kurdu" },
      { year: '2024', event: 'Online varlığını büyütüyor' },
    ],
  },
  en: {
    title: "Zeynep's Crochet Story",
    subtitle: 'With love in every stitch...',
    storyTitle: 'My Story',
    storyText: `My passion for knitting and crochet began in my grandmother's warm hands. As a little girl, I would sit beside her watching the colorful yarns dance. From those days until now, every stitch has become an expression of love for me.

Over the years, this passion transformed into an art form. By combining traditional Turkish knitting techniques with modern designs, I create unique products, each one of a kind. I produce a wide range of items, from baby blankets to amigurumi toys, winter accessories to home decor.

Every product I make is prepared with natural, high-quality materials, great care, and patience. Because I know that a handmade product is not just an object – it contains a story, hard work, and so much love.`,
    techniquesTitle: 'My Techniques',
    techniques: [
      {
        name: 'Knitting',
        icon: '🧶',
        description: 'Blankets, beanies, scarves, and more using needle knitting techniques. I blend traditional Turkish motifs with modern designs.',
      },
      {
        name: 'Crochet',
        icon: '🪡',
        description: 'Baskets, placemats, lace covers, and decorative items using crochet technique. Fine craftsmanship and elegant patterns.',
      },
      {
        name: 'Amigurumi',
        icon: '🧸',
        description: 'I create adorable toys and figures using this Japanese-origin crochet technique. Each one is made with child-safe materials.',
      },
    ],
    materialsTitle: 'My Materials',
    materialsText: 'I use only the highest quality, natural, and safe materials in my products. Organic cotton, merino wool, bamboo yarn, and hypoallergenic filling materials are among my primary choices. I take special care to use certified, skin-friendly materials, especially for baby products.',
    materials: [
      { name: 'Organic Cotton', emoji: '🌿' },
      { name: 'Merino Wool', emoji: '🐑' },
      { name: 'Bamboo Yarn', emoji: '🎋' },
      { name: 'Hypoallergenic Filling', emoji: '☁️' },
    ],
    timelineTitle: 'My Journey',
    timeline: [
      { year: '2009', event: 'Began learning from her grandmother' },
      { year: '2012', event: 'Created first amigurumi' },
      { year: '2015', event: 'Started taking custom orders' },
      { year: '2018', event: 'Launched Instagram presence' },
      { year: '2020', event: "Founded Zeyno's Crochet" },
      { year: '2024', event: 'Growing online presence' },
    ],
  },
};

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = content[locale as Locale] || content.tr;

  return (
    <>
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="about-hero-content">
            <span className="about-hero-emoji">🧶</span>
            <h1 className="about-hero-title font-playfair">{t.title}</h1>
            <p className="about-hero-subtitle font-dancing">{t.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="about-story">
        <div className="container">
          <div className="about-story-grid">
            <div className="about-story-image">
              <div className="about-story-image-placeholder">
                <span className="placeholder-emoji">👩‍🎨</span>
                <span className="placeholder-text">Zeynep</span>
              </div>
            </div>
            <div className="about-story-text">
              <h2 className="section-title font-playfair">{t.storyTitle}</h2>
              {t.storyText.split('\n\n').map((paragraph, index) => (
                <p key={index} className="about-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="about-timeline">
        <div className="container">
          <h2 className="section-title font-playfair text-center">{t.timelineTitle}</h2>
          <div className="timeline">
            {t.timeline.map((item, index) => (
              <div
                key={item.year}
                className={`timeline-item ${index % 2 === 0 ? 'timeline-left' : 'timeline-right'}`}
              >
                <div className="timeline-dot" />
                <div className="timeline-card">
                  <span className="timeline-year font-playfair">{item.year}</span>
                  <p className="timeline-event">{item.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Techniques Section */}
      <section className="about-techniques">
        <div className="container">
          <h2 className="section-title font-playfair text-center">{t.techniquesTitle}</h2>
          <div className="techniques-grid">
            {t.techniques.map((technique) => (
              <div key={technique.name} className="technique-card">
                <span className="technique-icon">{technique.icon}</span>
                <h3 className="technique-name font-playfair">{technique.name}</h3>
                <p className="technique-description">{technique.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Materials Section */}
      <section className="about-materials">
        <div className="container">
          <h2 className="section-title font-playfair text-center">{t.materialsTitle}</h2>
          <p className="about-materials-text">{t.materialsText}</p>
          <div className="materials-grid">
            {t.materials.map((material) => (
              <div key={material.name} className="material-card">
                <span className="material-emoji">{material.emoji}</span>
                <span className="material-name">{material.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="about-cta">
        <div className="container">
          <div className="about-cta-content">
            <h2 className="font-playfair">
              {locale === 'tr'
                ? 'Birlikte güzel şeyler yaratmaya hazır mısınız?'
                : 'Ready to create beautiful things together?'}
            </h2>
            <div className="about-cta-buttons">
              <Link href={`/${locale}/products`} className="btn btn-primary">
                {locale === 'tr' ? 'Ürünleri Keşfet' : 'Explore Products'}
              </Link>
              <Link href={`/${locale}/contact`} className="btn btn-outline">
                {locale === 'tr' ? 'İletişime Geç' : 'Get in Touch'}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
