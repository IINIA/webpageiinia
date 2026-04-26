import { MetadataRoute } from 'next';
import { caseStudies } from '@/content/case-studies';
import { solutions } from '@/content/solutions';
import { getAllPosts } from '@/lib/blog';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://iinia.com';
  const locales = ['es', 'en'];

  const routes = [
    '',
    '/solutions',
    '/industries',
    '/cases',
    '/about',
    '/contact',
    '/blog',
    '/careers',
    '/partners',
    '/privacy',
    '/terms',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  locales.forEach((locale) => {
    const dynamicRoutes = [
      ...solutions.map((solution) => `/solutions/${solution.slug}`),
      ...caseStudies.map((caseStudy) => `/cases/${caseStudy.slug}`),
      ...getAllPosts(locale).map((post) => `/blog/${post.slug}`),
    ];

    [...routes, ...dynamicRoutes].forEach((route) => {
      sitemap.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '/blog' ? 'weekly' : 'monthly',
        priority: route === '' ? 1 : 0.8,
        alternates: {
          languages: {
            es: `${baseUrl}/es${route}`,
            en: `${baseUrl}/en${route}`,
          },
        },
      });
    });
  });

  return sitemap;
}
