import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { caseStudies } from '@/content/case-studies';
import { getPageSEO } from '@/lib/seo';
import { Hero } from '@/components/home/hero';
import { ModelCarousel } from '@/components/home/model-carousel';
import { AlliesSection } from '@/components/home/allies';
import { ProcessSection } from '@/components/home/process-section';
import { TrustBand } from '@/components/home/trust-band';
import { VideoDemo } from '@/components/home/video-demo';
import { ValueProps } from '@/components/home/value-props';
import { FadeIn } from '@/components/anim/fade-in';
import { Button } from '@/components/ui/button';
import { ArrowUpRight } from 'lucide-react';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const seo = getPageSEO(
    'IINIA Industrial Intelligence & AI Solutions',
    locale === 'es'
      ? 'Soluciones avanzadas de inteligencia artificial para optimizar tu producción'
      : 'Advanced artificial intelligence solutions to optimize your production',
    locale as 'es' | 'en',
    '/'
  );

  return {
    title: seo.title,
    description: seo.description,
    alternates: {
      canonical: seo.canonical,
      languages: {
        es: 'https://iinia.com/es',
        en: 'https://iinia.com/en',
      },
    },
    openGraph: {
      title: seo.openGraph?.title,
      description: seo.openGraph?.description,
      url: seo.openGraph?.url,
      siteName: 'IINIA',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
  };
}

export default async function HomePage({ params: { locale } }: Props) {
  const caseSection = await getTranslations('home.case_studies');
  const alliesSection = await getTranslations('home.allies');
  const castedLocale = (locale === 'es' ? 'es' : 'en') as 'es' | 'en';

  return (
    <>
      <Hero />
      <TrustBand locale={castedLocale} />
      <VideoDemo locale={castedLocale} />
      <ProcessSection locale={castedLocale} />
      <AlliesSection
        locale={castedLocale}
        copy={{
          eyebrow: alliesSection('eyebrow'),
          title: alliesSection('title'),
          subtitle: alliesSection('subtitle'),
        }}
      />
      <ValueProps />
      <div className="container mx-auto px-4 mt-16 lg:mt-24">
        <FadeIn>
          <ModelCarousel />
        </FadeIn>
      </div>

      <section id="cases" className="relative py-24">
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-brand-600/10 via-transparent to-transparent dark:from-brand-600/20" />
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <div className="max-w-2xl text-left">
                <span className="inline-flex items-center gap-2 rounded-full border border-brand-600/20 bg-brand-600/10 px-4 py-1.5 text-sm font-medium text-brand-600 dark:border-brand-600/40 dark:bg-brand-600/15">
                  {caseSection('eyebrow')}
                </span>
                <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
                  {caseSection('title')}
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">{caseSection('subtitle')}</p>
              </div>
              <Button variant="ghost" size="lg" className="self-start md:self-end" asChild>
                <Link href={`/${locale}/cases`}>
                  {caseSection('cta')}
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </FadeIn>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            {caseStudies.map((caseStudy, index) => (
              <FadeIn key={caseStudy.title.es} delay={index * 0.1}>
                <article className="group relative overflow-hidden rounded-3xl border border-border/40 bg-background/90 p-6 shadow-lg shadow-brand-600/10 backdrop-blur">
                  <div className="absolute -right-32 -top-32 h-64 w-64 rounded-full bg-brand-600/10 blur-3xl transition-opacity duration-500 group-hover:opacity-80 dark:bg-brand-600/20" />
                  <div className="grid gap-6 md:grid-cols-[minmax(0,220px)_1fr]">
                    <div className="relative h-48 w-full overflow-hidden rounded-2xl border border-border/40 bg-muted">
                      <Image
                        src={caseStudy.image.src}
                        alt={locale === 'es' ? caseStudy.image.alt.es : caseStudy.image.alt.en}
                        fill
                        sizes="(min-width: 1024px) 220px, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority={index === 0}
                      />
                    </div>
                    <div className="flex flex-col justify-between gap-4">
                      <div className="space-y-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-600">
                          {locale === 'es' ? caseStudy.industry.es : caseStudy.industry.en}
                        </span>
                        <h3 className="text-2xl font-semibold leading-snug">
                          <Link
                            href={`/${locale}/cases/${caseStudy.slug}`}
                            className="transition-colors hover:text-brand-600"
                          >
                            {locale === 'es' ? caseStudy.title.es : caseStudy.title.en}
                          </Link>
                        </h3>
                        <p className="text-sm font-medium text-muted-foreground">
                          {caseSection('client_prefix')}{' '}
                          <span className="text-foreground">
                            {locale === 'es' ? caseStudy.client.es : caseStudy.client.en}
                          </span>
                        </p>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {locale === 'es' ? caseStudy.description.es : caseStudy.description.en}
                      </p>
                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                          {caseSection('metric_label')}
                        </span>
                        <div className="flex flex-wrap gap-3">
                          {caseStudy.metrics.map((metric, metricIndex) => (
                            <div
                              key={metricIndex}
                              className="flex items-center gap-3 rounded-2xl border border-brand-600/30 bg-brand-600/10 px-4 py-3 text-sm text-brand-600 dark:border-brand-600/40 dark:bg-brand-600/15"
                            >
                              <metric.icon className="h-5 w-5" />
                              <div>
                                <div className="text-2xl font-bold leading-none">
                                  {metric.value}
                                </div>
                                <div className="text-xs text-brand-600/80">
                                  {locale === 'es' ? metric.label.es : metric.label.en}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
