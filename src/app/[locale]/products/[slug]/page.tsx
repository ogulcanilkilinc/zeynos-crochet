import type { Metadata } from 'next';
import type { Locale, Product } from '@/types';
import ProductDetail from '@/components/products/ProductDetail';
import productsData from '@/data/products.json';

const products = productsData as Product[];

export async function generateStaticParams() {
  return products.flatMap((product) => [
    { locale: 'tr', slug: product.slug },
    { locale: 'en', slug: product.slug },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const product = products.find((p) => p.slug === slug);

  if (!product) {
    return { title: "Ürün Bulunamadı | Zeyno's Crochet" };
  }

  const loc = locale as Locale;
  return {
    title: `${product.name[loc]} | Zeyno's Crochet`,
    description: product.description[loc],
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  return <ProductDetail slug={slug} locale={locale as Locale} />;
}
