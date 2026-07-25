'use client';

import { useState } from 'react';
import type { Order, Locale } from '@/types';
import { getDictionary } from '@/i18n/config';
import { cn, getStatusColor } from '@/lib/utils';
import Badge from '@/components/ui/Badge';

interface OrderTrackerProps {
  locale: Locale;
}

const statusSteps = ['received', 'preparing', 'completed', 'shipped'] as const;
const statusIcons: Record<string, string> = {
  received: '📋',
  preparing: '🧶',
  completed: '✅',
  shipped: '📦',
};

export default function OrderTracker({ locale }: OrderTrackerProps) {
  const dict = getDictionary(locale);
  const [orderNumber, setOrderNumber] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'found' | 'not-found'>('idle');

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderNumber.trim()) return;

    setStatus('loading');
    try {
      const res = await fetch(`/api/order-tracking?orderNumber=${encodeURIComponent(orderNumber.trim())}`);
      if (res.ok) {
        const data = await res.json();
        setOrder(data);
        setStatus('found');
      } else {
        setOrder(null);
        setStatus('not-found');
      }
    } catch {
      setStatus('not-found');
    }
  };

  const currentStepIndex = order
    ? statusSteps.indexOf(order.status as typeof statusSteps[number])
    : -1;

  return (
    <section className="section">
      <div className="container">
        <div className="section-header reveal">
          <h1 className="heading-lg">{dict.orderTracking.title}</h1>
          <p className="body-lg text-muted">{dict.orderTracking.subtitle}</p>
        </div>

        <form className="order-search-form reveal" onSubmit={handleSearch}>
          <div className="order-search-input-group">
            <input
              type="text"
              className="form-input order-search-input"
              placeholder={locale === 'tr' ? 'Örn: ZC-2024-001' : 'e.g. ZC-2024-001'}
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
            />
            <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
              {status === 'loading'
                ? (locale === 'tr' ? 'Aranıyor...' : 'Searching...')
                : dict.orderTracking.searchButton
              }
            </button>
          </div>
        </form>

        {status === 'not-found' && (
          <div className="empty-state reveal">
            <span className="empty-icon">🔍</span>
            <p>{dict.orderTracking.noOrderFound}</p>
          </div>
        )}

        {status === 'found' && order && (
          <div className="order-result reveal">
            <div className="order-result-header">
              <h2 className="heading-md">
                {locale === 'tr' ? 'Sipariş' : 'Order'} #{order.orderNumber}
              </h2>
              <Badge
                variant={
                  order.status === 'shipped' || order.status === 'completed'
                    ? 'success'
                    : order.status === 'preparing'
                    ? 'warning'
                    : 'default'
                }
              >
                {dict.orderTracking.statuses[order.status as keyof typeof dict.orderTracking.statuses]}
              </Badge>
            </div>

            <div className="order-timeline">
              {statusSteps.map((step, i) => (
                <div
                  key={step}
                  className={cn(
                    'timeline-step',
                    i <= currentStepIndex && 'timeline-step-completed',
                    i === currentStepIndex && 'timeline-step-current'
                  )}
                >
                  <div className="timeline-icon">{statusIcons[step]}</div>
                  <div className="timeline-content">
                    <span className="timeline-label">
                      {dict.orderTracking.statuses[step as keyof typeof dict.orderTracking.statuses]}
                    </span>
                    {order.statusHistory
                      .filter((h) => h.status === step)
                      .map((h, hi) => (
                        <span key={hi} className="timeline-date">
                          {new Date(h.date).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                          {h.note && <span className="timeline-note"> – {h.note[locale]}</span>}
                        </span>
                      ))}
                  </div>
                  {i < statusSteps.length - 1 && <div className="timeline-connector" />}
                </div>
              ))}
            </div>

            <div className="order-details">
              <div className="order-detail-item">
                <span className="order-detail-label">🛍️ {locale === 'tr' ? 'Ürün' : 'Product'}</span>
                <span className="order-detail-value">{order.product}</span>
              </div>
              {order.estimatedDelivery && (
                <div className="order-detail-item">
                  <span className="order-detail-label">📅 {dict.orderTracking.estimatedDelivery}</span>
                  <span className="order-detail-value">
                    {new Date(order.estimatedDelivery).toLocaleDateString(locale === 'tr' ? 'tr-TR' : 'en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              )}
              {order.trackingNumber && (
                <div className="order-detail-item">
                  <span className="order-detail-label">📦 {dict.orderTracking.trackingNumber}</span>
                  <span className="order-detail-value tracking-number">{order.trackingNumber}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
