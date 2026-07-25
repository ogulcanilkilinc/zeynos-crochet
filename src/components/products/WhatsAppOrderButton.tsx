'use client';

import { generateWhatsAppUrl, getProductWhatsAppMessage } from '@/lib/utils';
import type { Locale } from '@/types';

interface WhatsAppOrderButtonProps {
  productName: string;
  price: number;
  locale: Locale;
  className?: string;
}

const WHATSAPP_PHONE = '905551234567';

export default function WhatsAppOrderButton({ productName, price, locale, className }: WhatsAppOrderButtonProps) {
  const message = getProductWhatsAppMessage(productName, price, locale);
  const url = generateWhatsAppUrl(WHATSAPP_PHONE, message);
  const label = locale === 'tr' ? 'WhatsApp ile Sipariş Ver' : 'Order via WhatsApp';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`btn btn-whatsapp ${className || ''}`}
    >
      <span className="whatsapp-icon">📱</span>
      {label}
    </a>
  );
}
