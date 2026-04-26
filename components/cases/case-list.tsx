'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search } from 'lucide-react';
import type { CaseStudy } from '@/content/case-studies';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

type CaseListProps = {
  caseStudies: CaseStudy[];
  locale: string;
};

export function CaseList({ caseStudies, locale }: CaseListProps) {
  const localeKey = locale === 'es' ? 'es' : 'en';
  const [query, setQuery] = useState('');
  const [activeIndustry, setActiveIndustry] = useState('all');
  const deferredQuery = useDeferredValue(query.toLowerCase().trim());

  const industries = useMemo(
    () => ['all', ...Array.from(new Set(caseStudies.map((caseStudy) => caseStudy.industry[localeKey]))).sort()],
    [caseStudies, localeKey]
  );

  const filteredCases = caseStudies.filter((caseStudy) => {
    const matchesIndustry = activeIndustry === 'all' || caseStudy.industry[localeKey] === activeIndustry;
    const searchable = [
      caseStudy.title[localeKey],
      caseStudy.client[localeKey],
      caseStudy.industry[localeKey],
      caseStudy.description[localeKey],
      caseStudy.stack.join(' '),
    ]
      .join(' ')
      .toLowerCase();

    return matchesIndustry && searchable.includes(deferredQuery);
  });

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border bg-muted/20 p-4 shadow-sm backdrop-blur">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={localeKey === 'es' ? 'Buscar por cliente, industria, stack o resultado...' : 'Search by client, industry, stack, or result...'}
            className="h-12 w-full rounded-2xl border bg-background pl-11 pr-4 text-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
          />
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {industries.map((industry) => (
            <button
              key={industry}
              onClick={() => setActiveIndustry(industry)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeIndustry === industry
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-border bg-background text-muted-foreground hover:text-foreground'
              }`}
            >
              {industry === 'all' ? (localeKey === 'es' ? 'Todas' : 'All') : industry}
            </button>
          ))}
        </div>
      </div>

      {filteredCases.length === 0 ? (
        <div className="rounded-2xl border bg-muted/20 p-12 text-center">
          <p className="text-muted-foreground">
            {localeKey === 'es' ? 'No encontramos casos con esos filtros.' : 'No cases match those filters.'}
          </p>
        </div>
      ) : (
        <div className="space-y-12">
          {filteredCases.map((caseStudy, index) => (
            <Card key={caseStudy.slug} className="glass-card overflow-hidden">
              <div className="grid gap-8 lg:grid-cols-3">
                <div className="flex flex-col lg:col-span-2">
                  <div className="relative h-48 w-full overflow-hidden border-b border-border/40">
                    <Image
                      src={caseStudy.image.src}
                      alt={caseStudy.image.alt[localeKey]}
                      fill
                      priority={index === 0}
                      sizes="(min-width: 1024px) 60vw, 100vw"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/10 to-transparent" />
                  </div>
                  <CardHeader className="space-y-4">
                    <Badge variant="brand" className="w-fit">
                      {caseStudy.industry[localeKey]}
                    </Badge>
                    <CardTitle className="text-2xl lg:text-3xl">{caseStudy.title[localeKey]}</CardTitle>
                    <CardDescription className="text-base">{caseStudy.client[localeKey]}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{caseStudy.description[localeKey]}</p>
                    <Button variant="ghost" className="mt-6 px-0" asChild>
                      <Link href={`/${locale}/cases/${caseStudy.slug}`}>
                        {localeKey === 'es' ? 'Ver caso completo' : 'View full case'}
                      </Link>
                    </Button>
                  </CardContent>
                </div>

                <div className="border-t border-border/60 bg-gradient-to-br from-brand-600/10 via-muted/20 to-accent-500/10 p-6 lg:border-l lg:border-t-0">
                  <h3 className="mb-6 text-sm font-semibold uppercase tracking-wider">
                    {localeKey === 'es' ? 'Resultados' : 'Results'}
                  </h3>
                  <div className="space-y-6">
                    {caseStudy.metrics.map((metric) => (
                      <div key={metric.label.en}>
                        <div className="mb-2 flex items-center gap-2 text-muted-foreground">
                          <metric.icon className="h-4 w-4" />
                          <span className="text-sm">{metric.label[localeKey]}</span>
                        </div>
                        <div className="text-5xl font-bold tracking-tight text-brand-600">{metric.value}</div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 grid grid-cols-3 gap-2 text-center text-xs text-muted-foreground">
                    {(localeKey === 'es' ? ['Diagnóstico', 'Piloto', 'Escala'] : ['Assess', 'Pilot', 'Scale']).map((step) => (
                      <div key={step} className="rounded-xl border bg-background/70 px-2 py-3">
                        {step}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
