import { FadeIn } from '@/components/anim/fade-in';

type VideoDemoProps = {
  locale: 'es' | 'en';
};

export function VideoDemo({ locale }: VideoDemoProps) {
  const isEs = locale === 'es';

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex rounded-full border border-brand-600/20 bg-brand-600/10 px-4 py-1.5 text-sm font-medium text-brand-600">
              {isEs ? 'Demo visual' : 'Visual demo'}
            </span>
            <h2 className="mt-6 text-3xl font-bold tracking-tight sm:text-4xl">
              {isEs ? 'Visión artificial operando en tiempo real' : 'Computer vision running in real time'}
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              {isEs
                ? 'Una muestra del tipo de monitoreo visual que puede integrarse en líneas industriales.'
                : 'A sample of the visual monitoring that can be integrated into industrial lines.'}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="mx-auto mt-10 max-w-6xl overflow-hidden rounded-[2rem] border border-brand-600/25 bg-slate-950 p-3 shadow-2xl shadow-brand-600/15">
            <div className="relative overflow-hidden rounded-[1.5rem] border border-white/10">
              <video
                className="aspect-video h-full w-full object-cover"
                controls
                muted
                playsInline
                preload="none"
                poster="/og/logo.webp"
              >
                <source src="/media/hero-background.webm" type="video/webm" />
                {isEs
                  ? 'Tu navegador no soporta reproducción de video.'
                  : 'Your browser does not support video playback.'}
              </video>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
