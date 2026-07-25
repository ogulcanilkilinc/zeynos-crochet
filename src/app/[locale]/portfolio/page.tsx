import type { Metadata } from 'next';
import type { Locale } from '@/types';
import PortfolioGrid from '@/components/portfolio/PortfolioGrid';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return {
    title: locale === 'en' ? "Portfolio | Zeyno's Crochet" : "Portfolyo | Zeyno's Crochet",
    description: locale === 'en'
      ? 'Explore our handcrafted knitting and crochet portfolio. Each piece is made with love and care.'
      : 'El yapımı örgü ve tığ işi portfolyomuzu keşfedin. Her parça sevgi ve özenle yapılmıştır.',
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return <PortfolioGrid locale={locale as Locale} />;
}
