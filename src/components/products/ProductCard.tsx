'use client';

import Image from 'next/image';
import Link from 'next/link';
import type { Product, Locale } from '@/types';
import { formatPrice, getStockBadge, cn } from '@/lib/utils';
import Badge from '@/components/ui/Badge';
import WhatsAppOrderButton from './WhatsAppOrderButton';

interface ProductCardProps {
  product: Product;
  locale: Locale;
}

export default function ProductCard({ product, locale }: ProductCardProps) {
  const stockBadge = getStockBadge(product.stockCount, locale);
  const detailsLabel = locale === 'tr' ? 'Detayları Gör' : 'View Details';

  return (
    <div className="card product-card">
      <div className="card-image product-card-image">
        <Image
          src={product.images[0] || '/images/placeholder.jpg'}
          alt={product.name[locale]}
          width={400}
          height={300}
          className="product-img"
          unoptimized
        />
        <div className="product-card-overlay">
          <Link href={`/${locale}/products/${product.slug}`} className="btn btn-primary btn-sm">
            {detailsLabel}
          </Link>
        </div>
        <Badge variant={stockBadge.color === 'badge-success' ? 'success' : stockBadge.color === 'badge-warning' ? 'warning' : 'danger'} className="product-stock-badge">
          {stockBadge.text}
        </Badge>
      </div>
      <div className="card-body">
        <div className="product-card-category">
          <Badge variant="default">
            {locale === 'tr'
              ? product.category === 'knitting' ? 'Örgü' : product.category === 'crochet' ? 'Tığ İşi' : product.category === 'amigurumi' ? 'Amigurumi' : 'Aksesuar'
              : product.category === 'knitting' ? 'Knitting' : product.category === 'crochet' ? 'Crochet' : product.category === 'amigurumi' ? 'Amigurumi' : 'Accessory'
            }
          </Badge>
        </div>
        <h3 className="product-card-name">{product.name[locale]}</h3>
        <p className="product-card-description">{product.description[locale].substring(0, 80)}...</p>
        <div className="product-card-footer">
          <span className="product-card-price">{formatPrice(product.price)}</span>
          {product.inStock && (
            <WhatsAppOrderButton
              productName={product.name[locale]}
              price={product.price}
              locale={locale}
              className="btn-sm"
            />
          )}
        </div>
      </div>
    </div>
  );
}
