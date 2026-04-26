import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { caseStudies } from '@/content/case-studies';
import { FadeIn } from '@/components/anim/fade-in';
import { CaseList } from '@/components/cases/case-list';
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

      <CaseList caseStudies={caseStudies} locale={locale} />
    </div>
  );
}
