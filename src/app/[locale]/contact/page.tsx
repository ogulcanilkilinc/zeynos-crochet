import type { Metadata } from 'next';
import { getDictionary } from '@/i18n/config';
import type { Locale } from '@/types';
import ContactForm from '@/components/contact/ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title:
      locale === 'en'
        ? "Contact | Zeyno's Crochet"
        : "İletişim | Zeyno's Crochet",
    description:
      locale === 'en'
        ? 'Get in touch with us for custom orders, questions, or collaborations.'
        : 'Özel siparişler, sorularınız veya işbirlikleri için bizimle iletişime geçin.',
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const dict = getDictionary(locale as Locale);

  return (
    <section className="page-section">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title font-playfair">{dict.contact.title}</h1>
          <p className="page-subtitle">
            {locale === 'tr'
              ? 'Benimle iletişime geçin'
              : 'Get in touch with me'}
          </p>
        </div>

        <div className="contact-layout">
          <div className="contact-form-wrapper">
            <ContactForm locale={locale as Locale} />
          </div>

          <div className="contact-info-wrapper">
            <div className="contact-info-card">
              <h3 className="font-playfair">
                {locale === 'tr' ? 'İletişim Bilgileri' : 'Contact Information'}
              </h3>

              <div className="contact-info-item">
                <span className="contact-info-icon">📧</span>
                <div>
                  <span className="contact-info-label">
                    {locale === 'tr' ? 'E-posta' : 'Email'}
                  </span>
                  <a href="mailto:info@zeynoscrochet.com">info@zeynoscrochet.com</a>
                </div>
              </div>

              <div className="contact-info-item">
                <span className="contact-info-icon">📱</span>
                <div>
                  <span className="contact-info-label">
                    {locale === 'tr' ? 'Telefon' : 'Phone'}
                  </span>
                  <a href="tel:+905551234567">+90 555 123 4567</a>
                </div>
              </div>

              <div className="contact-info-item">
                <span className="contact-info-icon">📍</span>
                <div>
                  <span className="contact-info-label">
                    {locale === 'tr' ? 'Konum' : 'Location'}
                  </span>
                  <span>İstanbul, Türkiye</span>
                </div>
              </div>

              <div className="contact-info-item">
                <span className="contact-info-icon">📸</span>
                <div>
                  <span className="contact-info-label">Instagram</span>
                  <a
                    href="https://instagram.com/zeynoscrochet"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @zeynoscrochet
                  </a>
                </div>
              </div>
            </div>

            <div className="contact-whatsapp-card">
              <span className="whatsapp-icon">💬</span>
              <h4 className="font-playfair">
                {locale === 'tr'
                  ? 'Hızlı İletişim için WhatsApp'
                  : 'WhatsApp for Quick Contact'}
              </h4>
              <p>
                {locale === 'tr'
                  ? 'Hızlı yanıt almak için WhatsApp üzerinden yazabilirsiniz.'
                  : 'You can reach me via WhatsApp for a quick response.'}
              </p>
              <a
                href="https://wa.me/905551234567"
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                {locale === 'tr' ? 'WhatsApp ile Yazın' : 'Message on WhatsApp'}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
