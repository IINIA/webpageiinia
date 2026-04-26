import { NextIntlClientProvider } from 'next-intl';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/nav/navbar';
import { Footer } from '@/components/nav/footer';
import { Analytics } from '@/components/analytics';
import { FloatingWhatsApp } from '@/components/floating-whatsapp';
import { JsonLd } from '@/components/seo/json-ld';
import { organizationSchema, websiteSchema } from '@/lib/schema';
import { Providers } from './providers';
import '@/styles/globals.css';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const locales = ['es', 'en'];

export const metadata: Metadata = {
  metadataBase: new URL('https://iinia.com'),
  title: {
    default: 'IINIA - Industrial AI Solutions',
    template: '%s | IINIA',
  },
  description: 'Advanced industrial artificial intelligence solutions for manufacturing optimization',
  keywords: ['AI', 'Industrial AI', 'Manufacturing', 'Automation', 'Machine Learning'],
  authors: [{ name: 'IINIA' }],
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://iinia.com/',
    siteName: 'IINIA',
    title: 'IINIA - Industrial AI Solutions',
    description: 'Advanced industrial artificial intelligence solutions for manufacturing optimization',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'IINIA - Industrial AI Solutions',
    description: 'Advanced industrial artificial intelligence solutions for manufacturing optimization',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) notFound();

  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <NextIntlClientProvider messages={messages}>
            <JsonLd data={[organizationSchema(locale), websiteSchema(locale)]} />
            <a href="#main-content" className="skip-to-content">
              Skip to content
            </a>
            <Navbar />
            <main id="main-content" className="min-h-screen">
              {children}
            </main>
            <Footer />
            <FloatingWhatsApp />
          </NextIntlClientProvider>
        </Providers>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
