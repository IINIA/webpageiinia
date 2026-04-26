'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LanguageSwitch } from './language-switch';
import { useTheme } from 'next-themes';

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = mounted && resolvedTheme === 'light' ? '/logo_alt.webp' : '/logo.webp';

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: t('solutions'), href: `/${locale}/solutions` },
    { name: t('industries'), href: `/${locale}/industries` },
    { name: t('cases'), href: `/${locale}/cases` },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('blog'), href: `/${locale}/blog` },
  ];

  const isActive = (href: string) => pathname === href || (href !== `/${locale}` && pathname.startsWith(`${href}/`));

  return (
    <header className="sticky top-0 z-50 w-full border-b glass">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href={`/${locale}`} className="flex items-center space-x-3">
          <div className="relative h-10 w-10">
            <Image
              src={logoSrc}
              alt="IINIA Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <span className="text-xl font-bold">IINIA</span>
          <span className="hidden text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground xl:inline">
            Industrial AI
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center space-x-1 md:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive(item.href) ? 'secondary' : 'ghost'}
                size="sm"
                className={isActive(item.href) ? 'text-brand-600' : undefined}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </div>

        {/* Right side actions */}
        <div className="flex items-center space-x-2">
          <LanguageSwitch />
          <ThemeToggle />
          <Button size="sm" className="hidden md:inline-flex" asChild>
            <Link href={`/${locale}/contact`}>
              {locale === 'es' ? 'Agenda demo' : 'Book demo'}
            </Link>
          </Button>

          {/* Mobile menu trigger */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 py-8">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="text-lg font-medium hover:text-brand-600 transition-colors"
                  >
                    {item.name}
                  </Link>
                ))}
                <Link
                  href={`/${locale}/contact`}
                  onClick={() => setIsOpen(false)}
                  className="rounded-lg bg-brand-600 px-4 py-3 text-center text-lg font-medium text-white transition-colors hover:bg-brand-900"
                >
                  {locale === 'es' ? 'Agenda demo' : 'Book demo'}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
