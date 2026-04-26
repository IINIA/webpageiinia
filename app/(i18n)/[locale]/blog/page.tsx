import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { FadeIn } from '@/components/anim/fade-in';
import { BlogList } from '@/components/blog/blog-list';
import { getAllPosts } from '@/lib/blog';
import { getLocalizedMetadata } from '@/lib/seo';

type Props = {
  params: { locale: string };
};

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  return getLocalizedMetadata({
    title: locale === 'es' ? 'Blog de IA industrial' : 'Industrial AI Blog',
    description:
      locale === 'es'
        ? 'Ideas, tendencias y guías prácticas sobre IA industrial, visión artificial y LLMs empresariales.'
        : 'Ideas, trends, and practical guides on industrial AI, computer vision, and enterprise LLMs.',
    locale: locale === 'es' ? 'es' : 'en',
    path: '/blog',
  });
}

export default async function BlogPage({ params: { locale } }: Props) {
  const t = await getTranslations('blog');
  const posts = getAllPosts(locale);

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

      {posts.length === 0 ? (
        <div className="rounded-2xl border bg-muted/20 p-12 text-center">
          <p className="text-muted-foreground">
             No blog posts yet. Check back soon!
          </p>
        </div>
      ) : (
        <BlogList posts={posts} locale={locale} readMoreLabel={t('read_more')} />
      )}
    </div>
  );
}
