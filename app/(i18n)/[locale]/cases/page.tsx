import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { caseStudies } from '@/content/case-studies';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/anim/fade-in';
import { getLocalizedMetadata } from '@/lib/seo';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return getLocalizedMetadata({
    title: locale === 'es' ? 'Casos de éxito de IA industrial' : 'Industrial AI Success Stories',
    description:
      locale === 'es'
        ? 'Resultados medibles en calidad, seguridad y eficiencia operativa con soluciones de IA industrial.'
        : 'Measurable quality, safety, and operational efficiency outcomes from industrial AI deployments.',
    locale: locale === 'es' ? 'es' : 'en',
    path: '/cases',
  });
}

export default async function CasesPage({ params: { locale } }: Props) {
  const t = await getTranslations('cases');

  return (
    <div className="container mx-auto px-4 py-20">
      <FadeIn>
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
      </FadeIn>

      <div className="space-y-12">
        {caseStudies.map((caseStudy, index) => (
          <FadeIn key={index} delay={index * 0.1}>
            <Card className="glass-card overflow-hidden">
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="lg:col-span-2 flex flex-col">
                  <div className="relative h-48 w-full overflow-hidden border-b border-border/40">
                    <Image
                      src={caseStudy.image.src}
                      alt={locale === 'es' ? caseStudy.image.alt.es : caseStudy.image.alt.en}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                  </div>
                  <CardHeader className="space-y-4">
                    <Badge variant="brand" className="w-fit">
                      {locale === 'es' ? caseStudy.industry.es : caseStudy.industry.en}
                    </Badge>
                    <CardTitle className="text-2xl lg:text-3xl">
                      {locale === 'es' ? caseStudy.title.es : caseStudy.title.en}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {locale === 'es' ? caseStudy.client.es : caseStudy.client.en}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      {locale === 'es' ? caseStudy.description.es : caseStudy.description.en}
                    </p>
                  </CardContent>
                </div>

                <div className="border-t border-border/60 bg-muted/20 p-6 lg:border-l lg:border-t-0">
                  <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider">
                    {locale === 'es' ? 'Resultados' : 'Results'}
                  </h3>
                  <div className="space-y-6">
                    {caseStudy.metrics.map((metric, idx) => (
                      <div key={idx}>
                        <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                          <metric.icon className="h-4 w-4" />
                          <span className="text-sm">
                            {locale === 'es' ? metric.label.es : metric.label.en}
                          </span>
                        </div>
                        <div className="text-3xl font-bold text-brand-600">{metric.value}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
