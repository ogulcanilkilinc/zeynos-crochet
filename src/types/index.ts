export interface Product {
  id: string;
  slug: string;
  name: { tr: string; en: string };
  description: { tr: string; en: string };
  price: number;
  currency: string;
  category: 'knitting' | 'crochet' | 'amigurumi' | 'accessory';
  images: string[];
  inStock: boolean;
  stockCount: number;
  materials: { tr: string; en: string };
  dimensions: { tr: string; en: string };
  featured: boolean;
  instagramUrl?: string;
  createdAt: string;
}

export interface PortfolioItem {
  id: string;
  title: { tr: string; en: string };
  description: { tr: string; en: string };
  category: 'knitting' | 'crochet' | 'amigurumi' | 'accessory';
  images: string[];
  completedAt: string;
  techniques: { tr: string[]; en: string[] };
}

export interface Testimonial {
  id: string;
  name: string;
  avatar?: string;
  rating: number;
  comment: { tr: string; en: string };
  product?: string;
  date: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  product: string;
  status: 'received' | 'preparing' | 'completed' | 'shipped';
  statusHistory: { status: string; date: string; note?: { tr: string; en: string } }[];
  createdAt: string;
  estimatedDelivery?: string;
  trackingNumber?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export type Locale = 'tr' | 'en';
