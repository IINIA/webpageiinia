import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FadeIn } from '@/components/anim/fade-in';
import { Factory, Pill, Cpu, Car, Zap, Package } from 'lucide-react';
import { getLocalizedMetadata } from '@/lib/seo';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return getLocalizedMetadata({
    title: locale === 'es' ? 'Industrias que servimos' : 'Industries We Serve',
    description:
      locale === 'es'
        ? 'IA industrial para automotriz, farmacéutica, electrónica, manufactura, energía y logística.'
        : 'Industrial AI for automotive, pharmaceutical, electronics, manufacturing, energy, and logistics teams.',
    locale: locale === 'es' ? 'es' : 'en',
    path: '/industries',
  });
}

const industriesData = [
  {
    icon: Car,
    titleEs: 'Automotriz',
    titleEn: 'Automotive',
    descEs: 'Optimización de líneas de ensamblaje y control de calidad automatizado',
    descEn: 'Assembly line optimization and automated quality control',
    backgroundImage: '/images/industries/automotive.jpg',
  },
  {
    icon: Pill,
    titleEs: 'Farmacéutica',
    titleEn: 'Pharmaceutical',
    descEs: 'Cumplimiento regulatorio y optimización de procesos de manufactura',
    descEn: 'Regulatory compliance and manufacturing process optimization',
    backgroundImage: '/images/industries/pharmaceutical.jpg',
  },
  {
    icon: Cpu,
    titleEs: 'Electrónica',
    titleEn: 'Electronics',
    descEs: 'Inspección visual automatizada y control de procesos',
    descEn: 'Automated visual inspection and process control',
    backgroundImage: '/images/industries/electronics.jpg',
  },
  {
    icon: Factory,
    titleEs: 'Manufactura General',
    titleEn: 'General Manufacturing',
    descEs: 'Soluciones personalizadas para cualquier tipo de producción',
    descEn: 'Custom solutions for any type of production',
    backgroundImage: '/images/industries/manufacturing.jpg',
  },
  {
    icon: Zap,
    titleEs: 'Energía',
    titleEn: 'Energy',
    descEs: 'Optimización de redes y mantenimiento predictivo',
    descEn: 'Grid optimization and predictive maintenance',
    backgroundImage: '/images/industries/energy.jpg',
  },
  {
    icon: Package,
    titleEs: 'Logística',
    titleEn: 'Logistics',
    descEs: 'Optimización de rutas y gestión de inventario inteligente',
    descEn: 'Route optimization and intelligent inventory management',
    backgroundImage: '/images/industries/logistics.jpg',
  },
];

export default async function IndustriesPage({ params: { locale } }: Props) {
  const t = await getTranslations('industries');

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

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {industriesData.map((industry, index) => (
          <FadeIn key={index} delay={index * 0.1}>
            <Card className="glass-card h-full transition-all hover:shadow-lg hover:-translate-y-1 overflow-hidden group">
              <div
                className="h-32 bg-cover bg-center relative"
                style={{ backgroundImage: `url(${industry.backgroundImage})` }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm border border-white/30">
                  <industry.icon className="h-6 w-6 text-white" />
                </div>
              </div>
              <CardHeader className="pb-3">
                <CardTitle className="text-2xl">
                  {locale === 'es' ? industry.titleEs : industry.titleEn}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {locale === 'es' ? industry.descEs : industry.descEn}
                </CardDescription>
              </CardContent>
            </Card>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
