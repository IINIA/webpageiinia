import { ClipboardCheck, FlaskConical, Network, Rocket } from 'lucide-react';
import { FadeIn } from '@/components/anim/fade-in';

type ProcessSectionProps = {
  locale: 'es' | 'en';
};

export function ProcessSection({ locale }: ProcessSectionProps) {
  const isEs = locale === 'es';
  const steps = [
    {
      icon: ClipboardCheck,
      title: isEs ? 'Diagnóstico' : 'Assess',
      text: isEs ? 'Elegimos un caso medible y revisamos datos, proceso e impacto.' : 'We select a measurable use case and review data, process, and impact.',
    },
    {
      icon: FlaskConical,
      title: isEs ? 'Piloto' : 'Pilot',
      text: isEs ? 'Probamos valor en una línea, flujo o documento con métricas claras.' : 'We prove value on one line, workflow, or document with clear metrics.',
    },
    {
      icon: Network,
      title: isEs ? 'Integración' : 'Integrate',
      text: isEs ? 'Conectamos la solución con operación, sistemas y responsables.' : 'We connect the solution with operations, systems, and owners.',
    },
    {
      icon: Rocket,
      title: isEs ? 'Escala' : 'Scale',
      text: isEs ? 'Estandarizamos despliegue para más líneas, plantas o casos.' : 'We standardize deployment for more lines, plants, or use cases.',
    },
  ];

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-brand-600/20 bg-brand-600/10 px-4 py-1.5 text-sm font-medium text-brand-600">
              {isEs ? 'Cómo trabajamos' : 'How we work'}
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              {isEs ? 'De idea a producción sin perder control' : 'From idea to production without losing control'}
            </h2>
          </div>
        </FadeIn>
        <div className="mt-12 grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <FadeIn key={step.title} delay={index * 0.08}>
              <div className="group relative h-full overflow-hidden rounded-3xl border bg-background/80 p-6 shadow-lg shadow-brand-600/5 transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-brand-600/10">
                <div className="absolute -right-10 -top-10 h-24 w-24 rounded-full bg-brand-600/10 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-600 to-accent-500 text-white">
                  <step.icon className="h-6 w-6" />
                </div>
                <div className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  0{index + 1}
                </div>
                <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{step.text}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
