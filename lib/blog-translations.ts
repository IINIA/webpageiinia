const blogSlugPairs: Record<string, string> = {
  'introduccion-ia-industrial': 'introduction-industrial-ai',
  'mantenimiento-predictivo': 'predictive-maintenance',
  'ia-industrial-ciudad-juarez': 'industrial-ai-ciudad-juarez',
  'vision-artificial-calidad-maquiladora': 'computer-vision-quality-maquiladora',
  'llms-privados-industria': 'private-llms-industry',
  'evaluacion-madurez-ia-industrial': 'industrial-ai-maturity-assessment',
  'edge-ai-vs-cloud-industria': 'edge-ai-vs-cloud-industry',
  'automatizacion-documental-ia': 'document-automation-ai',
  'seguridad-industrial-vision-ia': 'industrial-safety-computer-vision-ai',
  'talento-ia-industrial-frontera': 'industrial-ai-talent-border',
  'gpu-on-premise-ia-industrial': 'on-premise-gpu-industrial-ai',
  'roadmap-ia-industrial-90-dias': '90-day-industrial-ai-roadmap',
};

const reverseBlogSlugPairs = Object.fromEntries(
  Object.entries(blogSlugPairs).map(([esSlug, enSlug]) => [enSlug, esSlug])
);

export function getTranslatedBlogSlug(slug: string, targetLocale: string) {
  return targetLocale === 'en' ? blogSlugPairs[slug] : reverseBlogSlugPairs[slug];
}
