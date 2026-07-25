import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: "Zeyno's Crochet | El Yapımı Örgü & Tığ İşi",
  description:
    "Zeynep'in el emeği örgü ve tığ işi ürünleri. Bebek battaniyeleri, amigurumi oyuncaklar, örgü aksesuarlar ve daha fazlası.",
  keywords: [
    'örgü',
    'tığ işi',
    'crochet',
    'knitting',
    'amigurumi',
    'el yapımı',
    'handmade',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
