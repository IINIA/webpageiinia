import type { BlogPost } from '@/lib/blog';
import type { SolutionContent } from '@/content/solutions';

const baseUrl = 'https://iinia.com';

export function organizationSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${baseUrl}/#organization`,
    name: 'IINIA Industrial Intelligence & AI Solutions',
    alternateName: 'IINIA',
    url: baseUrl,
    logo: `${baseUrl}/logo.webp`,
    email: 'contacto@iinia.ai',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Ciudad Juárez',
      addressRegion: 'Chihuahua',
      addressCountry: 'MX',
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: '+52-656-595-1211',
        contactType: locale === 'es' ? 'ventas y consultoría' : 'sales and consulting',
        email: 'contacto@iinia.ai',
        areaServed: ['MX', 'US'],
        availableLanguage: ['es', 'en'],
      },
    ],
    sameAs: [
      'https://contacto.iinia.ai',
      'https://linkedin.com/company/iinia',
      'https://www.facebook.com/people/IINIA-Industrial-Intelligence-and-IA-Solutions/61586761854900/',
    ],
  };
}

export function websiteSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${baseUrl}/#website`,
    name: 'IINIA',
    url: `${baseUrl}/${locale}`,
    inLanguage: locale,
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
  };
}

export function servicesSchema(solutions: SolutionContent[], locale: 'es' | 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: locale === 'es' ? 'Servicios de IA industrial' : 'Industrial AI services',
    itemListElement: solutions.map((solution, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Service',
        name: solution.metadata.title[locale],
        description: solution.metadata.description[locale],
        url: `${baseUrl}/${locale}/solutions/${solution.slug}`,
        provider: {
          '@id': `${baseUrl}/#organization`,
        },
        areaServed: ['MX', 'US'],
        serviceType: solution.card.tags.join(', '),
      },
    })),
  };
}

export function blogPostingSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@id': `${baseUrl}/#organization`,
    },
    mainEntityOfPage: `${baseUrl}/${post.locale}/blog/${post.slug}`,
    inLanguage: post.locale,
    keywords: post.tags.join(', '),
  };
}
