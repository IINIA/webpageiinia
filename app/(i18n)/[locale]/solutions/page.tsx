import { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/anim/fade-in';
import Link from 'next/link';
import { solutions } from '@/content/solutions';
import { getLocalizedMetadata } from '@/lib/seo';
import { cn } from '@/lib/utils';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return getLocalizedMetadata({
    title: locale === 'es' ? 'Soluciones de IA industrial' : 'Industrial AI Solutions',
    description:
      locale === 'es'
        ? 'Visión artificial, LLMs empresariales e infraestructura GPU para llevar IA industrial a producción.'
        : 'Computer vision, enterprise LLMs, and GPU infrastructure to take industrial AI into production.',
    locale: locale === 'es' ? 'es' : 'en',
    path: '/solutions',
  });
}

export default async function SolutionsPage({ params: { locale } }: Props) {
  const t = await getTranslations('solutions');
  const localeKey = locale === 'es' ? 'es' : 'en';
  const highlightedSolutions = solutions.slice(0, 2);

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

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {highlightedSolutions.map((solution, index) => (
          <FadeIn key={index} delay={index * 0.1}>
            <Card
              className={cn(
                'glass-card h-full transition-all hover:shadow-xl hover:-translate-y-1',
                solution.card.backgroundImage &&
                  'relative overflow-hidden border border-white/60 bg-white/80 dark:border-white/10 dark:bg-slate-950/70 backdrop-blur'
              )}
            >
              {solution.card.backgroundImage && (
                <>
                  <Image
                    src={solution.card.backgroundImage}
                    alt={solution.card.title[localeKey]}
                    fill
                    className="absolute inset-0 object-cover"
                    priority={index === 0}
                    quality={70}
                    sizes="(min-width: 1024px) 45vw, 90vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/70 to-white/50 dark:from-slate-950/90 dark:via-slate-950/68 dark:to-slate-950/48 backdrop-blur-md transition-colors"
                    aria-hidden="true"
                  />
                </>
              )}
              <CardHeader className={cn(solution.card.backgroundImage && 'relative z-10')}>
                <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-brand-600 to-accent-500">
                  <solution.card.icon className="h-7 w-7 text-white" />
                </div>
                <CardTitle className="text-2xl text-slate-900 dark:text-white">
                  {solution.card.title[localeKey]}
                </CardTitle>
              </CardHeader>
              <CardContent className={cn(solution.card.backgroundImage && 'relative z-10')}>
                <CardDescription
                  className={cn(
                    'mb-4 text-base text-muted-foreground',
                    solution.card.backgroundImage && 'text-slate-800 dark:text-white/90'
                  )}
                >
                  {solution.card.description[localeKey]}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {solution.card.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className={cn(
                        solution.card.backgroundImage &&
                          'border-slate-300/60 bg-white/65 text-slate-800 dark:border-white/25 dark:bg-white/12 dark:text-white'
                      )}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className={cn(solution.card.backgroundImage && 'relative z-10')}>
                <Button
                  variant="ghost"
                  className={cn(
                    'w-full',
                    solution.card.backgroundImage &&
                      'text-slate-800 hover:text-slate-800 dark:text-white/90 dark:hover:text-white'
                  )}
                  asChild
                >
                  <Link href={`/${locale}/solutions/${solution.slug}`}>{t('view_details')}</Link>
                </Button>
              </CardFooter>
            </Card>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
