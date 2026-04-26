import type { Metadata } from 'next';
import { getLocalizedMetadata } from '@/lib/seo';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return getLocalizedMetadata({
    title: locale === 'es' ? 'Términos de uso' : 'Terms of Use',
    description:
      locale === 'es'
        ? 'Términos de uso del sitio web de IINIA.'
        : 'Terms of use for the IINIA website.',
    locale: locale === 'es' ? 'es' : 'en',
    path: '/terms',
  });
}

export default function TermsPage({ params: { locale } }: Props) {
  const isEs = locale === 'es';

  return (
    <main className="container mx-auto px-4 py-20">
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="space-y-4">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-brand-600">IINIA</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {isEs ? 'Términos de uso' : 'Terms of Use'}
          </h1>
          <p className="text-muted-foreground">
            {isEs ? 'Última actualización: abril 2026' : 'Last updated: April 2026'}
          </p>
        </header>

        <section className="prose prose-slate max-w-none dark:prose-invert">
          {isEs ? (
            <>
              <p>
                Al utilizar este sitio aceptas estos términos. El contenido se proporciona con fines
                informativos sobre servicios, capacidades y casos de uso de IINIA.
              </p>
              <h2>Uso del sitio</h2>
              <p>
                No debes usar el sitio para actividades ilegales, envío de información falsa,
                interferencia técnica o intento de acceso no autorizado.
              </p>
              <h2>Propiedad intelectual</h2>
              <p>
                Marcas, textos, diseños, imágenes y materiales del sitio pertenecen a IINIA o a sus
                respectivos titulares. No se concede licencia salvo autorización expresa.
              </p>
              <h2>Información comercial</h2>
              <p>
                Las descripciones de servicios no constituyen una propuesta vinculante. Cualquier
                alcance, precio o entregable se define en acuerdos específicos.
              </p>
              <h2>Contacto</h2>
              <p>Para dudas sobre estos términos, escríbenos a contacto@iinia.ai.</p>
            </>
          ) : (
            <>
              <p>
                By using this site, you accept these terms. The content is provided for informational
                purposes about IINIA services, capabilities, and use cases.
              </p>
              <h2>Site use</h2>
              <p>
                You must not use the site for illegal activity, false submissions, technical
                interference, or unauthorized access attempts.
              </p>
              <h2>Intellectual property</h2>
              <p>
                Trademarks, copy, designs, images, and site materials belong to IINIA or their
                respective owners. No license is granted unless expressly authorized.
              </p>
              <h2>Commercial information</h2>
              <p>
                Service descriptions are not binding proposals. Scope, pricing, and deliverables are
                defined in specific agreements.
              </p>
              <h2>Contact</h2>
              <p>For questions about these terms, contact us at contacto@iinia.ai.</p>
            </>
          )}
        </section>
      </div>
    </main>
  );
}
