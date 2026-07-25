'use client';

import Link from 'next/link';
import type { Locale, Product } from '@/types';
import { getDictionary } from '@/i18n/config';
import { formatPrice } from '@/lib/utils';
import productsData from '@/data/products.json';

interface FeaturedProductsProps {
  locale: Locale;
}

export default function FeaturedProducts({ locale }: FeaturedProductsProps) {
  const dict = getDictionary(locale);
  const products = (productsData as Product[]).filter((p) => p.featured).slice(0, 4);

  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-header">
          <h2 className="heading-lg">{locale === 'tr' ? 'Öne Çıkan Ürünler' : 'Featured Products'}</h2>
          <p className="body-lg text-muted">{locale === 'tr' ? 'En beğenilen el yapımı ürünlerimiz' : 'Our most popular handmade products'}</p>
        </div>

        <div className="product-grid">
          {products.map((product, index) => (
            <div key={product.id} className="card product-card" style={{ animationDelay: `${index * 100}ms` }}>
              <div className="card-image product-card-image">
                <div className="placeholder-image card-image">🧶</div>
              </div>
              <div className="card-body">
                <h3 className="product-card-title">{product.name[locale]}</h3>
                <div className="product-card-footer">
                  <span className="product-price">{formatPrice(product.price)}</span>
                  <Link href={`/${locale}/products/${product.slug}`} className="btn btn-primary btn-sm">
                    {dict.products.viewDetails}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-2xl)' }}>
          <Link href={`/${locale}/products`} className="btn btn-outline btn-lg">
            {dict.common.seeAll} →
          </Link>
        </div>
      </div>
    </section>
  );
}
