import { allies } from '@/content/allies';

type TrustBandProps = {
  locale: 'es' | 'en';
};

export function TrustBand({ locale }: TrustBandProps) {
  return (
    <section className="border-y bg-muted/20 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm font-medium text-muted-foreground">
            {locale === 'es' ? 'Ecosistema que respalda despliegues industriales' : 'Ecosystem backing industrial deployments'}
          </p>
          <div className="flex flex-wrap gap-2">
            {allies.slice(0, 6).map((ally) => (
              <span key={ally.name} className="rounded-full border bg-background px-3 py-1 text-xs font-semibold text-muted-foreground">
                {ally.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
