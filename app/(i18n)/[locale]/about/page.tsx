/* eslint react/no-unescaped-entities: "off" */

import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/anim/fade-in';
import { Eye, Brain, Cloud, CheckCircle2, Shield, Users, MapPin } from 'lucide-react';
import { getLocalizedMetadata } from '@/lib/seo';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return getLocalizedMetadata({
    title: locale === 'es' ? 'Sobre IINIA' : 'About IINIA',
    description:
      locale === 'es'
        ? 'Spin-off de inteligencia artificial en Ciudad Juárez enfocado en talento, visión artificial, LLMs e IA industrial.'
        : 'Artificial intelligence spin-off in Ciudad Juárez focused on talent, computer vision, LLMs, and industrial AI.',
    locale: locale === 'es' ? 'es' : 'en',
    path: '/about',
  });
}

export default async function AboutPage({ params: { locale } }: Props) {
  const t = await getTranslations('about');

  const focusAreas = [
    { icon: Eye, label: t('focus_area_1') },
    { icon: Brain, label: t('focus_area_2') },
    { icon: Cloud, label: t('focus_area_3') },
  ];

  const llmFeatures = [
    t('llm_1'),
    t('llm_2'),
    t('llm_3'),
    t('llm_4'),
  ];

  const visionServices = [
    {
      title: t('vision_1_title'),
      desc: t('vision_1_desc'),
      icon: CheckCircle2,
    },
    {
      title: t('vision_2_title'),
      desc: t('vision_2_desc'),
      icon: Shield,
    },
    {
      title: t('vision_3_title'),
      desc: t('vision_3_desc'),
      icon: Users,
    },
  ];

  return (
    <div className="container mx-auto px-4 py-20">
      {/* Header */}
      <FadeIn>
        <div className="mb-16 text-center">
          <h1 className="mb-2 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
          <p className="text-lg text-muted-foreground">{t('subtitle')}</p>
        </div>
      </FadeIn>

      {/* Main Content Grid */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column - Main Content */}
        <div className="space-y-8 lg:col-span-2">
          {/* Main Text */}
          <FadeIn>
            <Card className="glass-card">
              <CardContent className="prose dark:prose-invert max-w-none pt-6">
                <p className="text-lg leading-relaxed text-foreground">
                  {t('main_intro')}
                </p>
                <p className="text-base leading-relaxed text-muted-foreground mt-4">
                  {t('main_desc')}
                </p>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Focus Areas */}
          <FadeIn delay={0.1}>
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-2xl">{t('focus_areas_title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 sm:grid-cols-3">
                  {focusAreas.map((area, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center gap-3 rounded-lg border bg-muted/20 p-6 text-center transition-all hover:bg-muted/40"
                    >
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-brand-600 to-accent-500">
                        <area.icon className="h-6 w-6 text-white" />
                      </div>
                      <p className="text-sm font-medium leading-snug">{area.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

        {/* Right Column - Solutions */}
        <div className="space-y-8">
          {/* LLM Solutions */}
          <FadeIn delay={0.2}>
            <Card className="glass-card border-brand-600/30">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-500">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-xl">{t('llm_title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {llmFeatures.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                      <span className="text-sm leading-relaxed text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </FadeIn>

          {/* Computer Vision Solutions */}
          <FadeIn delay={0.3}>
            <Card className="glass-card border-accent-500/30">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent-500 to-brand-600">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-xl">{t('vision_title')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {visionServices.map((service, index) => (
                    <div key={index} className="space-y-1">
                      <div className="flex items-center gap-2">
                        <service.icon className="h-4 w-4 text-accent-500" />
                        <h4 className="font-semibold text-sm">{service.title}</h4>
                      </div>
                      <p className="pl-6 text-sm text-muted-foreground leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </FadeIn>
        </div>
      </div>

      {/* Location Section */}
      <FadeIn delay={0.4}>
        <div className="mt-16 space-y-8">
          {/* Location Badge */}
          <div className="flex justify-center">
            <Badge variant="secondary" className="px-6 py-3 text-base">
              📍 Ciudad Juárez, México
            </Badge>
          </div>

          {/* Interactive Map */}
          <Card className="glass-card overflow-hidden">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-500">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-xl">
                    {locale === 'es' ? 'Nuestra Ubicación' : 'Our Location'}
                  </CardTitle>
                  <CardDescription>
                    {locale === 'es'
                      ? 'Centro de innovación tecnológica en Ciudad Juárez'
                      : 'Technology innovation center in Ciudad Juárez'
                    }
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="aspect-video w-full">
                <iframe
                  src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.1234567890123!2d-106.3736111!3d31.67275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x86e75d0c0c0c0c0%3A0x0!2zMzHCsDQwJzIxLjkiTiAxMDbCsDIyJzE4LjkiVw!5e0!3m2!1ses!2smx!4v1703123456789!5m2!1ses!2smx`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-b-lg"
                  title={locale === 'es' ? 'Mapa de ubicación de INIIA' : 'INIIA location map'}
                />
              </div>
              <div className="p-6 bg-muted/20">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {locale === 'es' ? 'Coordenadas' : 'Coordinates'}
                    </p>
                    <p className="text-sm text-muted-foreground font-mono">
  {"31°40'21.9\"N 106°22'18.9\"W"}
</p>

                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium text-foreground">
                      {locale === 'es' ? 'Dirección' : 'Address'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {locale === 'es' ? 'Ciudad Juárez, Chihuahua, México' : 'Ciudad Juárez, Chihuahua, Mexico'}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </FadeIn>
    </div>
  );
}
