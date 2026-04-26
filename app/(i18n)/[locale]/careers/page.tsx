import { Metadata } from 'next';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { Card, CardContent } from '@/components/ui/card';
import { FadeIn } from '@/components/anim/fade-in';
import { Briefcase } from 'lucide-react';
import { getLocalizedMetadata } from '@/lib/seo';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return getLocalizedMetadata({
    title: locale === 'es' ? 'Carreras en IINIA' : 'Careers at IINIA',
    description:
      locale === 'es'
        ? 'Conecta con IINIA para participar en proyectos de IA industrial, visión artificial, datos e infraestructura.'
        : 'Connect with IINIA to work on industrial AI, computer vision, data, and infrastructure projects.',
    locale: locale === 'es' ? 'es' : 'en',
    path: '/careers',
  });
}

export default async function CareersPage({ params: { locale } }: Props) {
  const t = await getTranslations('careers');

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

      <FadeIn delay={0.2}>
        <Card className="glass-card mx-auto max-w-2xl">
          <CardContent className="flex flex-col items-center py-16 text-center">
            <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-accent-500">
              <Briefcase className="h-10 w-10 text-white" />
            </div>
            <h2 className="mb-4 text-2xl font-bold">{t('coming_soon')}</h2>
            <p className="mb-8 text-muted-foreground">
              {locale === 'es'
                ? 'Estamos formando talento en IA industrial, visión por computadora, datos e infraestructura. Si quieres participar, comparte tu perfil con nuestro equipo.'
                : 'We are building talent across industrial AI, computer vision, data, and infrastructure. If you want to contribute, share your profile with our team.'}
            </p>
            <Link
              href={`/${locale}/contact`}
              className="rounded-md bg-brand-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-900"
            >
              {locale === 'es' ? 'Enviar perfil' : 'Send profile'}
            </Link>
          </CardContent>
        </Card>
      </FadeIn>
    </div>
  );
}
