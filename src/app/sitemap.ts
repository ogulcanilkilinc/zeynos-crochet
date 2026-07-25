import { MetadataRoute } from 'next';
import productsData from '@/data/products.json';
import { locales } from '@/i18n/config';
import type { Product } from '@/types';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Sitenizin canlıya alındığındaki ana adresi
  const baseUrl = 'https://zeynoscrochet.com';

  // Ana sayfalar ve statik alt sayfalar
  const routes = [
    '',
    '/portfolio',
    '/products',
    '/about',
    '/contact',
    '/testimonials',
    '/order-tracking',
  ];

  const sitemapEntries: MetadataRoute.Sitemap = [];

  // Statik rotaların çift dil (TR ve EN) kombinasyonlarını oluştur
  for (const locale of locales) {
    for (const route of routes) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1.0 : 0.8,
      });
    }
  }

  // Dinamik ürün sayfalarını sitemap'e ekle
  const products = productsData as Product[];
  for (const product of products) {
    for (const locale of locales) {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/products/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: 0.7,
      });
    }
  }

  return sitemapEntries;
}
