'use client';

import { useDeferredValue, useMemo, useState } from 'react';
import Link from 'next/link';
import { Calendar, Search, User } from 'lucide-react';
import type { BlogPost } from '@/lib/blog';
import { formatDate } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

type BlogListProps = {
  posts: BlogPost[];
  locale: string;
  readMoreLabel: string;
};

export function BlogList({ posts, locale, readMoreLabel }: BlogListProps) {
  const [query, setQuery] = useState('');
  const [activeTag, setActiveTag] = useState('all');
  const deferredQuery = useDeferredValue(query.toLowerCase().trim());

  const tags = useMemo(
    () => ['all', ...Array.from(new Set(posts.flatMap((post) => post.tags))).sort()],
    [posts]
  );

  const filteredPosts = posts.filter((post) => {
    const matchesTag = activeTag === 'all' || post.tags.includes(activeTag);
    const searchable = `${post.title} ${post.description} ${post.author} ${post.tags.join(' ')}`.toLowerCase();
    return matchesTag && searchable.includes(deferredQuery);
  });
  const featuredPost = filteredPosts[0];
  const remainingPosts = filteredPosts.slice(1);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border bg-muted/20 p-4 shadow-sm backdrop-blur">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={locale === 'es' ? 'Buscar por tema, tecnología o autor...' : 'Search by topic, technology, or author...'}
            className="h-12 w-full rounded-2xl border bg-background pl-11 pr-4 text-sm outline-none transition focus:border-brand-600 focus:ring-2 focus:ring-brand-600/20"
          />
        </div>
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTag(tag)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeTag === tag
                  ? 'border-brand-600 bg-brand-600 text-white'
                  : 'border-border bg-background text-muted-foreground hover:text-foreground'
              }`}
            >
              {tag === 'all' ? (locale === 'es' ? 'Todos' : 'All') : tag}
            </button>
          ))}
        </div>
      </div>

      {filteredPosts.length === 0 ? (
        <div className="rounded-2xl border bg-muted/20 p-12 text-center">
          <p className="text-muted-foreground">
            {locale === 'es' ? 'No encontramos artículos con esos filtros.' : 'No articles match those filters.'}
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {featuredPost && (
            <Card className="glass-card overflow-hidden border-brand-600/30 bg-gradient-to-br from-brand-600/10 via-background to-accent-500/10">
              <div className="grid gap-6 p-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <Badge variant="brand">{locale === 'es' ? 'Destacado' : 'Featured'}</Badge>
                  <h2 className="mt-4 text-3xl font-bold tracking-tight">{featuredPost.title}</h2>
                  <p className="mt-3 text-muted-foreground">{featuredPost.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {featuredPost.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="rounded-3xl border bg-background/80 p-6">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{formatDate(featuredPost.date, locale)}</span>
                    <User className="h-4 w-4" />
                    <span>{featuredPost.author}</span>
                  </div>
                  <Button className="mt-6 w-full" asChild>
                    <Link href={`/${locale}/blog/${featuredPost.slug}`}>{readMoreLabel}</Link>
                  </Button>
                </div>
              </div>
            </Card>
          )}

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {remainingPosts.map((post) => (
            <Card key={post.slug} className="glass-card flex h-full flex-col transition-all hover:-translate-y-1 hover:shadow-xl">
              <CardHeader>
                <div className="mb-3 flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="line-clamp-2 text-xl">{post.title}</CardTitle>
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
                  <Link href={`/${locale}/blog/${post.slug}`}>{readMoreLabel}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
          </div>
        </div>
      )}
    </div>
  );
}
