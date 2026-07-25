'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product, Locale } from '@/types';
import { formatPrice, getStockBadge } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import WhatsAppOrderButton from './WhatsAppOrderButton';
import ProductCard from './ProductCard';
import productsData from '@/data/products.json';

interface ProductDetailProps {
  slug: string;
  locale: Locale;
}

export default function ProductDetail({ slug, locale }: ProductDetailProps) {
  const products = productsData as Product[];
  const product = products.find((p) => p.slug === slug);
  const [selectedImage, setSelectedImage] = useState(0);

  if (!product) {
    return (
      <section className="section">
        <div className="container">
          <div className="empty-state">
            <span className="empty-icon">😔</span>
            <h2>{locale === 'tr' ? 'Ürün Bulunamadı' : 'Product Not Found'}</h2>
            <p>{locale === 'tr' ? 'Aradığınız ürün mevcut değil.' : 'The product you are looking for does not exist.'}</p>
            <Link href={`/${locale}/products`} className="btn btn-primary">
              {locale === 'tr' ? '← Ürünlere Dön' : '← Back to Products'}
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const stockBadge = getStockBadge(product.stockCount, locale);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const categoryLabels: Record<string, Record<string, string>> = {
    tr: { knitting: 'Örgü', crochet: 'Tığ İşi', amigurumi: 'Amigurumi', accessory: 'Aksesuar' },
    en: { knitting: 'Knitting', crochet: 'Crochet', amigurumi: 'Amigurumi', accessory: 'Accessory' },
  };

  // Structured data (Schema.org) for Search Engines
  const baseUrl = 'https://zeynoscrochet.com';
  const productSchema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name[locale],
    description: product.description[locale],
    image: product.images.map((img) => `${baseUrl}${img}`),
    category: categoryLabels[locale][product.category],
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: product.currency || 'TRY',
      availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `${baseUrl}/${locale}/products/${product.slug}`,
      priceValidUntil: '2027-12-31',
    },
  };

  return (
    <section className="section product-detail-section">
      {/* Search Engine Optimization Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      <div className="container">
        <Link href={`/${locale}/products`} className="back-link">
          {locale === 'tr' ? '← Ürünlere Dön' : '← Back to Products'}
        </Link>

        <div className="product-detail">
          <div className="product-detail-gallery">
            <div className="product-main-image">
              <Image
                src={product.images[selectedImage] || '/images/placeholder.jpg'}
                alt={product.name[locale]}
                width={600}
                height={500}
                className="detail-img"
                unoptimized
              />
            </div>
            {product.images.length > 1 && (
              <div className="product-thumbnails">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    className={`thumbnail ${i === selectedImage ? 'thumbnail-active' : ''}`}
                    onClick={() => setSelectedImage(i)}
                  >
                    <Image src={img} alt="" width={80} height={80} unoptimized />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="product-detail-info">
            <Badge variant="default" className="product-category-badge">
              {categoryLabels[locale][product.category]}
            </Badge>
            <h1 className="heading-lg product-detail-title">{product.name[locale]}</h1>
            <p className="body-lg product-detail-description">{product.description[locale]}</p>

            <div className="product-detail-price">
              <span className="price-label">{locale === 'tr' ? 'Fiyat' : 'Price'}</span>
              <span className="price-value">{formatPrice(product.price)}</span>
            </div>

            <Badge
              variant={stockBadge.color === 'badge-success' ? 'success' : stockBadge.color === 'badge-warning' ? 'warning' : 'danger'}
            >
              {stockBadge.text}
            </Badge>

            <div className="product-detail-meta">
              <div className="meta-item">
                <span className="meta-label">🧶 {locale === 'tr' ? 'Malzemeler' : 'Materials'}</span>
                <span className="meta-value">{product.materials[locale]}</span>
              </div>
              <div className="meta-item">
                <span className="meta-label">📐 {locale === 'tr' ? 'Boyutlar' : 'Dimensions'}</span>
                <span className="meta-value">{product.dimensions[locale]}</span>
              </div>
            </div>

            {product.inStock && (
              <div className="product-detail-actions">
                <WhatsAppOrderButton
                  productName={product.name[locale]}
                  price={product.price}
                  locale={locale}
                />
              </div>
            )}
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products">
            <h2 className="heading-md">{locale === 'tr' ? 'Benzer Ürünler' : 'Related Products'}</h2>
            <div className="product-grid">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} locale={locale} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
