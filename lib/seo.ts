import type { Metadata } from 'next';

export function getPageSEO(
  title: string,
  description: string,
  locale: 'es' | 'en',
  path: string = '/'
) {
  const baseUrl = 'https://iinia.com';
  const url = `${baseUrl}/${locale}${path}`;

  return {
    title,
    description,
    canonical: url,
    openGraph: {
      title,
      description,
      url,
      locale: locale === 'es' ? 'es_ES' : 'en_US',
    },
    languageAlternates: [
      {
        hrefLang: 'es',
        href: `${baseUrl}/es${path}`,
      },
      {
        hrefLang: 'en',
        href: `${baseUrl}/en${path}`,
      },
    ],
  };
}

export function getLocalizedMetadata({
  title,
  description,
  locale,
  path,
}: {
  title: string;
  description: string;
  locale: 'es' | 'en';
  path: string;
}): Metadata {
  const baseUrl = 'https://iinia.com';
  const canonical = `${baseUrl}/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        es: `${baseUrl}/es${path}`,
        en: `${baseUrl}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: 'IINIA',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
      images: [
        {
          url: '/og/logo.webp',
          width: 1200,
          height: 630,
          alt: 'IINIA Industrial Intelligence & AI Solutions',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/og/logo.webp'],
    },
  };
}
