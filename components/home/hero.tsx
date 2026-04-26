'use client';

import dynamic from 'next/dynamic';
import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/anim/fade-in';
import { trackEvent } from '@/lib/analytics';
import { ArrowRight, Sparkles } from 'lucide-react';

const ParticlesBackground = dynamic(
  () =>
    import('@/components/graphics/particles').then((mod) => ({
      default: mod.ParticlesBackground,
    })),
  { ssr: false, loading: () => null }
);

const HeroShowcase = dynamic(
  () =>
    import('@/components/home/hero-showcase').then((mod) => ({
      default: mod.HeroShowcase,
    })),
  { ssr: false, loading: () => <HeroShowcaseSkeleton /> }
);

export function Hero() {
  const t = useTranslations('home.hero');
  const locale = useLocale();
  const isEs = locale === 'es';
  const metrics = [
    {
      value: '94%',
      label: isEs ? 'menos errores de ensamble' : 'fewer assembly errors',
    },
    {
      value: '120+',
      label: isEs ? 'horas administrativas ahorradas al mes' : 'admin hours saved monthly',
    },
    {
      value: '434k',
      label: isEs ? 'activos urbanos mapeados con IA' : 'urban assets mapped with AI',
    },
  ];

  return (
    <section className="relative overflow-hidden py-20 lg:py-40">
      <ParticlesBackground />
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="mx-auto max-w-6xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2 text-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-brand-600" />
              <span className="font-medium">{t('eyebrow')}</span>
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              {t('title')}
            </h1>

            <p className="mb-10 text-lg text-muted-foreground sm:text-xl">
              {t('subtitle')}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="xl" variant="default" asChild>
                <Link
                  href={`/${locale}/contact`}
                  onClick={() =>
                    trackEvent({ action: 'hero_cta_click', category: 'navigation', label: 'contact' })
                  }
                >
                  {t('cta_primary')}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" asChild>
                <Link
                  href={`/${locale}/solutions`}
                  onClick={() =>
                    trackEvent({ action: 'hero_cta_click', category: 'navigation', label: 'solutions' })
                  }
                >
                  {t('cta_secondary')}
                </Link>
              </Button>
            </div>

            <div className="mx-auto mt-10 grid max-w-4xl gap-3 rounded-3xl border border-brand-600/20 bg-background/75 p-3 shadow-xl shadow-brand-600/10 backdrop-blur md:grid-cols-3">
              {metrics.map((metric) => (
                <div
                  key={metric.value}
                  className="rounded-2xl border border-border/50 bg-muted/30 px-5 py-4 text-left md:text-center"
                >
                  <div className="text-3xl font-bold tracking-tight text-brand-600">
                    {metric.value}
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>

            <div className="mt-20 space-y-8">
              <div className="rounded-3xl border border-brand-600/30 bg-background/70 p-8 text-left shadow-lg shadow-brand-600/10 backdrop-blur sm:text-center">
                <p className="text-base text-muted-foreground">{t('supporting')}</p>
              </div>

              <HeroShowcase />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function HeroShowcaseSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-3xl border border-dashed border-border bg-muted/40 p-4 shadow-inner shadow-black/5 sm:p-6">
      <div className="mb-4 h-6 w-40 animate-pulse rounded-full bg-muted sm:mx-auto" />
      <div className="h-[400px] w-full animate-pulse rounded-[28px] bg-muted sm:h-[500px] lg:h-[560px]" />
    </div>
  );
}
