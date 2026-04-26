import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FadeIn } from '@/components/anim/fade-in';
import { JsonLd } from '@/components/seo/json-ld';
import { getAllPosts, getPostBySlug } from '@/lib/blog';
import { blogPostingSchema } from '@/lib/schema';
import { formatDate } from '@/lib/utils';
import { ArrowLeft, Calendar, User } from 'lucide-react';

type Props = {
  params: { locale: string; slug: string };
};

export async function generateStaticParams() {
  const esPosts = getAllPosts('es');
  const enPosts = getAllPosts('en');

  return [
    ...esPosts.map((post) => ({ locale: 'es', slug: post.slug })),
    ...enPosts.map((post) => ({ locale: 'en', slug: post.slug })),
  ];
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  const post = getPostBySlug(slug, locale);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default async function BlogPostPage({ params: { locale, slug } }: Props) {
  const t = await getTranslations('blog');
  const post = getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto px-4 py-20">
      <JsonLd data={blogPostingSchema(post)} />
      <FadeIn>
        <div className="mx-auto max-w-3xl">
          <Button variant="ghost" size="sm" asChild className="mb-8">
            <Link href={`/${locale}/blog`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t('back_to_blog')}
            </Link>
          </Button>

          <header className="mb-12">
            <div className="mb-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="brand">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
              {post.title}
            </h1>

            <p className="mb-6 text-xl text-muted-foreground">{post.description}</p>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.date, locale)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
            </div>
          </header>

          <div className="prose dark:prose-invert max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h3:text-2xl prose-a:text-brand-600 prose-a:no-underline hover:prose-a:underline prose-img:rounded-2xl">
            <MDXRemote source={post.content} />
          </div>
        </div>
      </FadeIn>
    </article>
  );
}
