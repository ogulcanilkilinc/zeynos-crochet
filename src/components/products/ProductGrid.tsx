'use client';

import { useState } from 'react';
import type { Product, Locale } from '@/types';
import { getDictionary } from '@/i18n/config';
import ProductFilter from './ProductFilter';
import ProductCard from './ProductCard';
import productsData from '@/data/products.json';

interface ProductGridProps {
  locale: Locale;
}

export default function ProductGrid({ locale }: ProductGridProps) {
  const dict = getDictionary(locale);
  const [activeFilter, setActiveFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  const products = productsData as Product[];

  const filteredProducts = products
    .filter((p) => activeFilter === 'all' || p.category === activeFilter)
    .sort((a, b) => {
      if (sortOrder === 'price-asc') return a.price - b.price;
      if (sortOrder === 'price-desc') return b.price - a.price;
      return 0;
    });

  return (
    <section className="section">
      <div className="container">
        <div className="section-header reveal">
          <h1 className="heading-lg">{dict.products.title}</h1>
          <p className="body-lg text-muted">{dict.products.subtitle}</p>
        </div>

        <div className="products-controls reveal">
          <ProductFilter activeFilter={activeFilter} onFilterChange={setActiveFilter} locale={locale} />
          <div className="sort-controls">
            <select
              className="form-input sort-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as 'default' | 'price-asc' | 'price-desc')}
            >
              <option value="default">{locale === 'tr' ? 'Sıralama' : 'Sort By'}</option>
              <option value="price-asc">{locale === 'tr' ? 'Fiyat: Düşükten Yükseğe' : 'Price: Low to High'}</option>
              <option value="price-desc">{locale === 'tr' ? 'Fiyat: Yüksekten Düşüğe' : 'Price: High to Low'}</option>
            </select>
          </div>
        </div>

        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} locale={locale} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="empty-state">
            <span className="empty-icon">🧶</span>
            <p>{locale === 'tr' ? 'Bu kategoride ürün bulunamadı.' : 'No products found in this category.'}</p>
          </div>
        )}
      </div>
    </section>
  );
}
