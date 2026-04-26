import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/anim/fade-in';
import { getAllPosts } from '@/lib/blog';
import { getLocalizedMetadata } from '@/lib/seo';
import { formatDate } from '@/lib/utils';
import { Calendar, User } from 'lucide-react';

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
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <FadeIn key={post.slug} delay={index * 0.1}>
              <Card className="glass-card flex h-full flex-col transition-all hover:shadow-lg hover:-translate-y-1">
                <CardHeader>
                  <div className="mb-3 flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-xl line-clamp-2">{post.title}</CardTitle>
                  <CardDescription className="line-clamp-2">{post.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(post.date, locale)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <User className="h-4 w-4" />
                      <span>{post.author}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="ghost" className="w-full" asChild>
                    <Link href={`/${locale}/blog/${post.slug}`}>{t('read_more')}</Link>
                  </Button>
                </CardFooter>
              </Card>
            </FadeIn>
          ))}
        </div>
      )}
    </div>
  );
}
