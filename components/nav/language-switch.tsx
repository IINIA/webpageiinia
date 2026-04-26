'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { getTranslatedBlogSlug } from '@/lib/blog-translations';
import { Globe } from 'lucide-react';

export function LanguageSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = locale === 'es' ? 'en' : 'es';
    const segments = pathname.split('/').filter(Boolean);

    if (segments[1] === 'blog' && segments[2]) {
      const translatedSlug = getTranslatedBlogSlug(segments[2], newLocale);

      if (translatedSlug) {
        router.push(`/${newLocale}/blog/${translatedSlug}`);
        return;
      }
    }

    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <Button variant="ghost" size="sm" onClick={switchLocale} className="gap-2">
      <Globe className="h-4 w-4" />
      <span className="text-xs font-semibold uppercase">{locale}</span>
    </Button>
  );
}
