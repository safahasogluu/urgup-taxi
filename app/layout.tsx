import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { getBaseUrl } from '@/lib/url';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

