'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Facebook, Globe, Linkedin, Mail, MessageCircle } from 'lucide-react';
import { useTheme } from 'next-themes';
import { trackEvent } from '@/lib/analytics';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = mounted && resolvedTheme === 'light' ? '/logo_alt.webp' : '/logo.webp';

  const companyLinks = [
    { name: tNav('about'), href: `/${locale}/about` },
    { name: tNav('careers'), href: `/${locale}/careers` },
    { name: tNav('partners'), href: `/${locale}/partners` },
    { name: tNav('blog'), href: `/${locale}/blog` },
  ];

  const solutionsLinks = [
    { name: tNav('solutions'), href: `/${locale}/solutions` },
    { name: tNav('industries'), href: `/${locale}/industries` },
    { name: tNav('cases'), href: `/${locale}/cases` },
  ];

  const legalLinks = [
    { name: t('privacy'), href: `/${locale}/privacy` },
    { name: t('terms'), href: `/${locale}/terms` },
  ];

  const socialLinks = [
    { name: 'WhatsApp', href: 'https://wa.me/526565951211', icon: MessageCircle },
    { name: 'LinkedIn', href: 'https://linkedin.com/company/iinia', icon: Linkedin },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/people/IINIA-Industrial-Intelligence-and-IA-Solutions/61586761854900/',
      icon: Facebook,
    },
    { name: 'Links', href: 'https://contacto.iinia.ai', icon: Globe },
    { name: 'Email', href: 'mailto:contacto@iinia.ai', icon: Mail },
  ];

  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 rounded-3xl border border-brand-600/20 bg-muted/30 p-6 md:flex md:items-center md:justify-between md:gap-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-brand-600">
              {locale === 'es' ? 'Siguiente paso' : 'Next step'}
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              {locale === 'es'
                ? 'Evalúa tu oportunidad de IA industrial'
                : 'Assess your industrial AI opportunity'}
            </h2>
          </div>
          <Link
            href={`/${locale}/contact`}
            className="mt-5 inline-flex rounded-lg bg-brand-600 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-brand-900 md:mt-0"
          >
            {locale === 'es' ? 'Agenda una evaluación' : 'Book an assessment'}
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="relative h-10 w-10">
                <Image
                  src={logoSrc}
                  alt="IINIA Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-xl font-bold">IINIA</span>
            </div>
            <p className="text-sm text-muted-foreground">{t('tagline')}</p>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              {t('company')}
            </h3>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              {t('solutions')}
            </h3>
            <ul className="space-y-2">
              {solutionsLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider">
              {t('contact')}
            </h3>
            <div className="space-y-2">
              <a
                href="mailto:contacto@iinia.ai"
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                contacto@iinia.ai
              </a>
              <p className="text-sm text-muted-foreground">
                Ciudad Juárez, México
              </p>
              <div className="flex gap-3 pt-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    onClick={() =>
                      trackEvent({
                        action: 'footer_contact_click',
                        category: 'contact',
                        label: link.name.toLowerCase(),
                      })
                    }
                    aria-label={link.name}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <link.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t pt-8">
          <div className="mb-4 flex flex-wrap justify-center gap-4">
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} IINIA. All rights reserved.
          </p>
          <p className="mt-2 text-center text-xs font-medium text-brand-600">
            {locale === 'es'
              ? 'IA industrial lista para producción'
              : 'Production-ready industrial AI'}
          </p>
        </div>
      </div>
    </footer>
  );
}
