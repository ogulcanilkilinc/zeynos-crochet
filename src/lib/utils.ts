import type { Locale } from '@/types';

/**
 * Format a price with Turkish Lira symbol
 */
export function formatPrice(price: number, currency: string = 'TL'): string {
  const formatted = new Intl.NumberFormat('tr-TR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
  return `${formatted} ${currency}`;
}

/**
 * Generate a WhatsApp URL for sending a message
 */
export function generateWhatsAppUrl(phoneNumber: string, message: string): string {
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanPhone}?text=${encodedMessage}`;
}

/**
 * Generate a product order message for WhatsApp
 */
export function getProductWhatsAppMessage(
  productName: string,
  price: number,
  locale: Locale
): string {
  if (locale === 'tr') {
    return `Merhaba! 🧶 ${productName} hakkında bilgi almak istiyorum. Fiyat: ${formatPrice(price)}`;
  }
  return `Hello! 🧶 I'd like to get information about ${productName}. Price: ${formatPrice(price)}`;
}

/**
 * Classname utility — joins truthy class strings
 */
export function cn(...classes: (string | undefined | false | null)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Get a CSS colour class name for an order status
 */
export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    received: 'badge-primary',
    preparing: 'badge-warning',
    completed: 'badge-success',
    shipped: 'badge-success',
  };
  return colors[status] || 'badge-primary';
}

/**
 * Get stock badge text and colour based on stock count
 */
export function getStockBadge(
  stockCount: number,
  locale: Locale
): { text: string; color: string } {
  if (stockCount === 0) {
    return {
      text: locale === 'tr' ? 'Tükendi' : 'Out of Stock',
      color: 'badge-danger',
    };
  }
  if (stockCount <= 3) {
    return {
      text: locale === 'tr' ? 'Son Birkaç Ürün' : 'Only a Few Left',
      color: 'badge-warning',
    };
  }
  return {
    text: locale === 'tr' ? 'Stokta' : 'In Stock',
    color: 'badge-success',
  };
}
