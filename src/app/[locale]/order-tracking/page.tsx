import type { Metadata } from 'next';
import type { Locale } from '@/types';
import OrderTracker from '@/components/order/OrderTracker';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'en' ? "Order Tracking | Zeyno's Crochet" : "Sipariş Takip | Zeyno's Crochet",
    description: locale === 'en'
      ? 'Track your order status. Enter your order number to see the current status of your handmade product.'
      : 'Sipariş durumunuzu takip edin. El yapımı ürününüzün mevcut durumunu görmek için sipariş numaranızı girin.',
  };
}

export default async function OrderTrackingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <OrderTracker locale={locale as Locale} />;
}
