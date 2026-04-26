'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import { trackEvent } from '@/lib/analytics';

const whatsappNumber = '526565951211';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  company: z.string().min(2, 'Company name must be at least 2 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function ContactForm() {
  const t = useTranslations('contact.form');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setStatus('loading');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Contact request failed');
      }

      const message = [
        'Hola IINIA, me gustaría recibir información.',
        '',
        `Nombre: ${data.name}`,
        `Email: ${data.email}`,
        `Empresa: ${data.company}`,
        `Mensaje: ${data.message}`,
      ].join('\n');

      window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        '_blank',
        'noopener,noreferrer'
      );

      trackEvent({
        action: 'contact_submit',
        category: 'lead',
        label: 'whatsapp',
      });

      setStatus('success');
      reset();

      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error) {
      setStatus('error');
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="name">{t('name')}</Label>
        <Input
          id="name"
          {...register('name')}
          placeholder=" Juan Pérez"
          className="mt-2"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="email">{t('email')}</Label>
        <Input
          id="email"
          type="email"
          {...register('email')}
          placeholder=" juan@empresa.com"
          className="mt-2"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="company">{t('company')}</Label>
        <Input
          id="company"
          {...register('company')}
          placeholder=" Mi Empresa S.A."
          className="mt-2"
        />
        {errors.company && (
          <p className="mt-1 text-sm text-destructive">{errors.company.message}</p>
        )}
      </div>

      <div>
        <Label htmlFor="message">{t('message')}</Label>
        <Textarea
          id="message"
          {...register('message')}
          placeholder=" Cuéntanos sobre tu proyecto..."
          className="mt-2"
          rows={6}
        />
        {errors.message && (
          <p className="mt-1 text-sm text-destructive">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" size="lg" className="w-full" disabled={status === 'loading'}>
        {status === 'loading' && <Loader2 className="mr-2 h-5 w-5 animate-spin" />}
        {status === 'success' && <CheckCircle className="mr-2 h-5 w-5" />}
        {status === 'error' && <AlertCircle className="mr-2 h-5 w-5" />}
        {status === 'idle' && t('submit')}
        {status === 'loading' && (t('submit') + '...')}
        {status === 'success' && t('success')}
        {status === 'error' && t('error')}
      </Button>
    </form>
  );
}
