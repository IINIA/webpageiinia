'use client';

import { useLocale } from 'next-intl';
import { MessageCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

export function FloatingWhatsApp() {
  const locale = useLocale();

  return (
    <a
      href="https://wa.me/526565951211"
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackEvent({ action: 'floating_whatsapp_click', category: 'contact', label: 'whatsapp' })}
      className="fixed bottom-5 right-5 z-50 inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-white shadow-2xl shadow-emerald-500/30 transition hover:-translate-y-1 hover:bg-emerald-600"
      aria-label={locale === 'es' ? 'Contactar por WhatsApp' : 'Contact via WhatsApp'}
    >
      <MessageCircle className="h-5 w-5" />
      <span className="hidden sm:inline">WhatsApp</span>
    </a>
  );
}
