import type { Metadata } from 'next';
import type { Locale } from '@/types';
import ProductGrid from '@/components/products/ProductGrid';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'en' ? "Products | Zeyno's Crochet" : "Ürünler | Zeyno's Crochet",
    description: locale === 'en'
      ? 'Browse our handmade knitting and crochet products. Baby blankets, amigurumi toys, accessories and more.'
      : 'El yapımı örgü ve tığ işi ürünlerimize göz atın. Bebek battaniyeleri, amigurumi oyuncaklar, aksesuarlar ve daha fazlası.',
  };
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <ProductGrid locale={locale as Locale} />;
}
