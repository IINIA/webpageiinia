'use client';

import { useLocale, useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/anim/fade-in';
import { trackEvent } from '@/lib/analytics';
import { ArrowRight, Bot, Camera, Database, ShieldCheck, Sparkles } from 'lucide-react';

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
    <section className="relative overflow-hidden py-20 lg:py-32">
      <div className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_30%_10%,rgba(140,0,255,0.16),transparent_35%),radial-gradient(circle_at_70%_20%,rgba(255,63,127,0.12),transparent_30%)]" />
      <div className="absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-brand-600/60 to-transparent" />
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="mx-auto grid max-w-6xl gap-12 text-center lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:text-left">
            <div>
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

            <div className="mt-10 grid gap-3 rounded-3xl border border-brand-600/20 bg-background/75 p-3 shadow-xl shadow-brand-600/10 backdrop-blur md:grid-cols-3">
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
            </div>

            <div className="space-y-8">
              <LightweightHeroMockup isEs={isEs} />
              <div className="rounded-3xl border border-brand-600/30 bg-background/70 p-6 text-left shadow-lg shadow-brand-600/10 backdrop-blur">
                <p className="text-base text-muted-foreground">{t('supporting')}</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

function LightweightHeroMockup({ isEs }: { isEs: boolean }) {
  const signals = [
    { icon: Camera, label: isEs ? 'Visión en línea' : 'In-line vision', value: '24ms' },
    { icon: Bot, label: isEs ? 'LLM privado' : 'Private LLM', value: 'RAG' },
    { icon: Database, label: isEs ? 'Datos seguros' : 'Secure data', value: 'On-prem' },
    { icon: ShieldCheck, label: isEs ? 'Auditable' : 'Auditable', value: 'ISO-ready' },
  ];

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-brand-600/25 bg-slate-950 p-4 text-white shadow-2xl shadow-brand-600/20">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(140,0,255,0.32),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(255,63,127,0.24),transparent_24%)]" />
      <div className="relative rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/50">IINIA OS</p>
            <h3 className="mt-1 text-2xl font-bold">
              {isEs ? 'Centro de IA industrial' : 'Industrial AI command center'}
            </h3>
          </div>
          <div className="rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-200">
            Live
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {signals.map((signal) => (
            <div key={signal.label} className="rounded-2xl border border-white/10 bg-white/8 p-4">
              <signal.icon className="h-5 w-5 text-accent-500" />
              <p className="mt-3 text-sm text-white/60">{signal.label}</p>
              <p className="text-2xl font-bold">{signal.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-2xl border border-white/10 bg-black/30 p-4">
          <div className="mb-3 flex items-center justify-between text-xs text-white/50">
            <span>{isEs ? 'Flujo operativo' : 'Operational flow'}</span>
            <span>98.7%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div className="h-full w-[86%] rounded-full bg-gradient-to-r from-brand-600 to-accent-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
