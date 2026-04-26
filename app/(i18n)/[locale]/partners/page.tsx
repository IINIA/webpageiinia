import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { FadeIn } from '@/components/anim/fade-in';
import Link from 'next/link';
import { Handshake } from 'lucide-react';
import { getLocalizedMetadata } from '@/lib/seo';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return getLocalizedMetadata({
    title: locale === 'es' ? 'Socios y alianzas' : 'Partners and Alliances',
    description:
      locale === 'es'
        ? 'Alianzas tecnológicas e industriales que respaldan las soluciones de IA de IINIA.'
        : 'Technology and industrial alliances that support IINIA AI solutions.',
    locale: locale === 'es' ? 'es' : 'en',
    path: '/partners',
  });
}

const partnerCategories = [
  {
    titleEs: 'Socios tecnológicos',
    titleEn: 'Technology partners',
    partners: ['NVIDIA', 'EXXACTcorp', 'Flō Networks'],
  },
  {
    titleEs: 'Ecosistema industrial',
    titleEn: 'Industrial ecosystem',
    partners: ['Teleflex', 'Hubbell', 'IA HUB MX'],
  },
  {
    titleEs: 'Canales de contacto',
    titleEn: 'Contact channels',
    partners: ['LinkedIn IINIA', 'Facebook IINIA', 'contacto.iinia.ai'],
  },
];

export default async function PartnersPage({ params: { locale } }: Props) {
  const t = await getTranslations('partners');

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
        {partnerCategories.map((category, index) => (
          <FadeIn key={index} delay={index * 0.1}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                  <Handshake className="h-6 w-6 text-brand-600" />
                  {locale === 'es' ? category.titleEs : category.titleEn}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {category.partners.map((partner, idx) => (
                    <div
                      key={idx}
                      className="flex h-24 items-center justify-center rounded-lg border bg-muted/20 px-6 text-center font-medium"
                    >
                      {partner}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={0.3}>
        <Card className="glass-card mt-12">
          <CardContent className="py-12 text-center">
            <h2 className="mb-4 text-2xl font-bold">
              {locale === 'es'
                ? '¿Quieres construir una alianza con IINIA?'
                : 'Want to build a partnership with IINIA?'}
            </h2>
            <p className="mb-6 text-muted-foreground">
              {locale === 'es'
                ? 'Comparte tu caso y nuestro equipo evaluará la colaboración adecuada.'
                : 'Share your use case and our team will evaluate the right collaboration path.'}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex rounded-md bg-brand-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-900"
            >
              {locale === 'es' ? 'Hablar con IINIA' : 'Talk to IINIA'}
            </Link>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
