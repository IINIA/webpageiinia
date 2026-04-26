import type { Metadata } from 'next';
import { getLocalizedMetadata } from '@/lib/seo';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return getLocalizedMetadata({
    title: locale === 'es' ? 'Aviso de privacidad' : 'Privacy Policy',
    description:
      locale === 'es'
        ? 'Aviso de privacidad de IINIA para visitantes, prospectos y clientes.'
        : 'IINIA privacy policy for visitors, prospects, and clients.',
    locale: locale === 'es' ? 'es' : 'en',
    path: '/privacy',
  });
}

export default function PrivacyPage({ params: { locale } }: Props) {
  const isEs = locale === 'es';

  return (
    <main className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-600">IINIA</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {isEs ? 'Aviso de privacidad' : 'Privacy Policy'}
          </h1>
          <p className="text-muted-foreground">
            {isEs ? 'Última actualización: abril 2026' : 'Last updated: April 2026'}
          </p>
        </header>

        <section className="prose prose-slate max-w-none dark:prose-invert">
          {isEs ? (
            <>
              <p>
                IINIA Industrial Intelligence & AI Solutions recopila datos de contacto
                proporcionados voluntariamente por visitantes, prospectos y clientes para responder
                solicitudes, evaluar casos de uso y dar seguimiento comercial o técnico.
              </p>
              <h2>Datos que podemos recopilar</h2>
              <p>
                Nombre, correo electrónico, empresa, mensaje, canal de contacto, información técnica
                compartida en formularios y datos básicos de navegación cuando se habilita analítica.
              </p>
              <h2>Uso de la información</h2>
              <p>
                Usamos la información para responder solicitudes, preparar propuestas, coordinar
                reuniones, mejorar el sitio y medir conversiones. No vendemos datos personales.
              </p>
              <h2>Servicios de terceros</h2>
              <p>
                Podemos usar herramientas como WhatsApp, correo electrónico, analítica web o CRM para
                procesar comunicaciones y dar seguimiento a oportunidades.
              </p>
              <h2>Contacto</h2>
              <p>
                Para ejercer derechos de acceso, rectificación, cancelación u oposición, escríbenos a
                contacto@iinia.ai.
              </p>
            </>
          ) : (
            <>
              <p>
                IINIA Industrial Intelligence & AI Solutions collects contact data voluntarily provided
                by visitors, prospects, and clients to respond to requests, evaluate use cases, and
                provide commercial or technical follow-up.
              </p>
              <h2>Data we may collect</h2>
              <p>
                Name, email address, company, message, contact channel, technical information shared in
                forms, and basic browsing data when analytics are enabled.
              </p>
              <h2>How we use information</h2>
              <p>
                We use information to respond to requests, prepare proposals, coordinate meetings,
                improve the website, and measure conversions. We do not sell personal data.
              </p>
              <h2>Third-party services</h2>
              <p>
                We may use tools such as WhatsApp, email, web analytics, or CRM systems to process
                communications and follow up on opportunities.
              </p>
              <h2>Contact</h2>
              <p>
                To request access, correction, deletion, or objection regarding your data, contact us at
                contacto@iinia.ai.
              </p>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
