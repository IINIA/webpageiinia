import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FadeIn } from '@/components/anim/fade-in';
import { ContactForm } from '@/components/forms/contact-form';
import { ExternalLink, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { getLocalizedMetadata } from '@/lib/seo';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return getLocalizedMetadata({
    title: locale === 'es' ? 'Contacto IINIA' : 'Contact IINIA',
    description:
      locale === 'es'
        ? 'Habla con IINIA por WhatsApp o correo para evaluar tu caso de IA industrial.'
        : 'Reach IINIA by WhatsApp or email to evaluate your industrial AI use case.',
    locale: locale === 'es' ? 'es' : 'en',
    path: '/contact',
  });
}

const contactInfo = [
  {
    icon: Mail,
    labelEs: 'Email',
    labelEn: 'Email',
    value: 'contacto@iinia.ai',
    href: 'mailto:contacto@iinia.ai',
  },
  {
    icon: MessageCircle,
    labelEs: 'WhatsApp',
    labelEn: 'WhatsApp',
    value: '+52 656 595 1211',
    href: 'https://wa.me/526565951211',
  },
  {
    icon: Linkedin,
    labelEs: 'LinkedIn',
    labelEn: 'LinkedIn',
    value: 'IINIA',
    href: 'https://linkedin.com/company/iinia',
  },
  {
    icon: ExternalLink,
    labelEs: 'Links de contacto',
    labelEn: 'Contact links',
    value: 'contacto.iinia.ai',
    href: 'https://contacto.iinia.ai',
  },
];

export default async function ContactPage({ params: { locale } }: Props) {
  const t = await getTranslations('contact');

  return (
    <div className="container mx-auto px-4 py-20">
      <FadeIn>
        <div className="mb-10 text-center">
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
            {t('title')}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={0.1}>
        <div className="mx-auto mb-10 grid max-w-5xl gap-4 rounded-3xl border border-brand-600/25 bg-gradient-to-br from-brand-600 to-accent-500 p-6 text-white shadow-2xl shadow-brand-600/20 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/75">
              {locale === 'es' ? 'Respuesta directa' : 'Direct response'}
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              {locale === 'es'
                ? 'Agenda una evaluación inicial de IA industrial'
                : 'Book an initial industrial AI assessment'}
            </h2>
            <p className="mt-2 text-white/85">
              {locale === 'es'
                ? 'Te ayudamos a definir caso de uso, datos disponibles, alcance técnico y siguiente paso.'
                : 'We help define the use case, available data, technical scope, and next step.'}
            </p>
          </div>
          <Button variant="secondary" size="lg" asChild>
            <a href="https://wa.me/526565951211" target="_blank" rel="noopener noreferrer">
              WhatsApp
            </a>
          </Button>
        </div>
      </FadeIn>

      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
        {/* Contact Info */}
        <div className="space-y-6">
          {contactInfo.map((info, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <Card className="glass-card">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-brand-600 to-accent-500">
                      <info.icon className="h-6 w-6 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        {locale === 'es' ? info.labelEs : info.labelEn}
                      </CardTitle>
                      {info.href ? (
                        <a
                          href={info.href}
                          target={info.href.startsWith('http') ? '_blank' : undefined}
                          rel={info.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="text-sm text-muted-foreground hover:text-brand-600 transition-colors"
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className="text-sm text-muted-foreground">{info.value}</p>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </FadeIn>
          ))}
        </div>

        {/* Contact Form */}
        <FadeIn delay={0.2} className="lg:col-span-2">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-2xl">
                {locale === 'es'
                  ? 'Envíanos un mensaje por WhatsApp'
                  : 'Send us a WhatsApp message'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ContactForm />
            </CardContent>
          </Card>
        </FadeIn>
      </div>
    </div>
  );
}
