import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { caseStudies, getCaseStudyBySlug } from '@/content/case-studies';
import { getLocalizedMetadata } from '@/lib/seo';

type Props = {
  params: { locale: string; slug: string };
};

export function generateStaticParams() {
  return ['es', 'en'].flatMap((locale) =>
    caseStudies.map((caseStudy) => ({ locale, slug: caseStudy.slug }))
  );
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  const caseStudy = getCaseStudyBySlug(slug);

  if (!caseStudy) return { title: 'Case not found' };

  const localeKey = locale === 'es' ? 'es' : 'en';

  return getLocalizedMetadata({
    title: caseStudy.title[localeKey],
    description: caseStudy.description[localeKey],
    locale: localeKey,
    path: `/cases/${caseStudy.slug}`,
  });
}

export default function CaseStudyPage({ params: { locale, slug } }: Props) {
  const caseStudy = getCaseStudyBySlug(slug);
  const localeKey = locale === 'es' ? 'es' : 'en';

  if (!caseStudy) notFound();

  return (
    <main className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-5xl">
        <Button variant="ghost" size="sm" asChild className="mb-8">
          <Link href={`/${locale}/cases`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            {localeKey === 'es' ? 'Volver a casos' : 'Back to cases'}
          </Link>
        </Button>

        <article className="space-y-12">
          <header className="space-y-6">
            <Badge variant="brand" className="w-fit">
              {caseStudy.industry[localeKey]}
            </Badge>
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
                  {caseStudy.title[localeKey]}
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  {caseStudy.description[localeKey]}
                </p>
              </div>
              <Card className="glass-card">
                <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {localeKey === 'es' ? 'Cliente' : 'Client'}
                    </p>
                    <p className="text-xl font-semibold">{caseStudy.client[localeKey]}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {localeKey === 'es' ? 'Industria' : 'Industry'}
                    </p>
                    <p className="text-xl font-semibold">{caseStudy.industry[localeKey]}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </header>

          <div className="relative h-[420px] overflow-hidden rounded-3xl border border-border/50 bg-muted">
            <Image
              src={caseStudy.image.src}
              alt={caseStudy.image.alt[localeKey]}
              fill
              priority
              sizes="(min-width: 1024px) 960px, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <section className="space-y-8 lg:col-span-2">
              <div className="grid gap-4 md:grid-cols-2">
                <Card className="glass-card border-destructive/20">
                  <CardContent className="p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                      {localeKey === 'es' ? 'Antes' : 'Before'}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold">
                      {localeKey === 'es' ? 'Proceso con fricción' : 'Friction-heavy process'}
                    </h2>
                    <p className="mt-3 text-muted-foreground">{caseStudy.challenge[localeKey]}</p>
                  </CardContent>
                </Card>
                <Card className="glass-card border-brand-600/30">
                  <CardContent className="p-6">
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
                      {localeKey === 'es' ? 'Después' : 'After'}
                    </p>
                    <h2 className="mt-3 text-2xl font-semibold">
                      {caseStudy.metrics[0]?.value} {caseStudy.metrics[0]?.label[localeKey]}
                    </h2>
                    <p className="mt-3 text-muted-foreground">{caseStudy.solution[localeKey]}</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="glass-card">
                <CardContent className="space-y-4 p-6">
                  <h2 className="text-2xl font-semibold">
                    {localeKey === 'es' ? 'Reto' : 'Challenge'}
                  </h2>
                  <p className="text-muted-foreground">{caseStudy.challenge[localeKey]}</p>
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="space-y-4 p-6">
                  <h2 className="text-2xl font-semibold">
                    {localeKey === 'es' ? 'Solución' : 'Solution'}
                  </h2>
                  <p className="text-muted-foreground">{caseStudy.solution[localeKey]}</p>
                </CardContent>
              </Card>
            </section>

            <aside className="space-y-6">
              <Card className="glass-card">
                <CardContent className="space-y-5 p-6">
                  <h2 className="text-xl font-semibold">
                    {localeKey === 'es' ? 'Resultados' : 'Results'}
                  </h2>
                  {caseStudy.metrics.map((metric) => (
                    <div key={metric.label.en} className="rounded-2xl border bg-muted/20 p-4">
                      <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
                        <metric.icon className="h-4 w-4" />
                        {metric.label[localeKey]}
                      </div>
                      <p className="text-3xl font-bold text-brand-600">{metric.value}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="glass-card">
                <CardContent className="space-y-4 p-6">
                  <h2 className="text-xl font-semibold">Stack</h2>
                  <div className="flex flex-wrap gap-2">
                    {caseStudy.stack.map((item) => (
                      <Badge key={item} variant="secondary">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>

          <section className="rounded-3xl border bg-gradient-to-br from-brand-600 to-accent-500 p-8 text-white shadow-xl">
            <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-2xl font-bold">
                  {localeKey === 'es'
                    ? '¿Quieres un caso similar en tu operación?'
                    : 'Want a similar use case in your operation?'}
                </h2>
                <p className="mt-2 text-white/85">
                  {localeKey === 'es'
                    ? 'Cuéntanos tu línea, proceso o reto y evaluamos una prueba de valor.'
                    : 'Tell us about your line, process, or challenge and we will evaluate a value pilot.'}
                </p>
              </div>
              <Button variant="secondary" size="lg" asChild>
                <Link href={`/${locale}/contact`}>
                  {localeKey === 'es' ? 'Hablar con IINIA' : 'Talk to IINIA'}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </section>
        </article>
      </div>
    </main>
  );
}
