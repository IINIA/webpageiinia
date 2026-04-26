# AGENTS.md

## Commands
- Use npm; this repo has `package-lock.json` and no alternate package-manager config.
- Install with `npm install`; run locally with `npm run dev` and open `/es` or `/en`, not `/`.
- Verification scripts are `npm run lint`, `npm run typecheck`, and `npm run build`; there is no test script configured.
- `npm run build` automatically runs `next-sitemap` via `postbuild`, using `SITE_URL` from env or `https://iinia.com`.

## App Wiring
- This is a Next.js 14 App Router site. Real pages live under `app/(i18n)/[locale]/`; `app/layout.tsx` only returns children.
- Supported locales are exactly `es` and `en`; middleware uses `localePrefix: 'always'` with default locale `es`.
- `next-intl` is configured by `next.config.js` to load `./lib/i18n.ts`; translations are in `messages/es.json` and `messages/en.json`.
- When adding a page, update the localized route, both message files, navigation in `components/nav/navbar.tsx` or footer if it should be linked, and `app/sitemap.ts` for sitemap routes.
- Path aliases come from `tsconfig.json`: `@/*`, `@/components/*`, `@/lib/*`, and `@/styles/*`.

## Content And SEO
- Blog posts are filesystem content under `content/blog/{es,en}` and are read by `lib/blog.ts`; filenames become slugs and frontmatter should include `title`, `description`, `date`, `author`, and `tags`.
- The App Router native `Metadata` API is used for SEO; do not reintroduce `next-seo` components into server layouts.
- `app/sitemap.ts` and `app/robots.ts` hardcode `https://iinia.com`; `next-sitemap.config.js` separately reads `SITE_URL`.
- Analytics load only when `NEXT_PUBLIC_GA_ID` is set; conversion events are sent through `lib/analytics.ts`.

## UI Conventions
- Theme colors are CSS variables in `styles/globals.css` exposed through Tailwind tokens in `tailwind.config.ts`; keep brand changes there instead of hardcoding colors across components.
- Dark mode uses `next-themes` in `app/(i18n)/[locale]/providers.tsx`; theme-dependent UI must stay in client components.
- Navbar logo switching expects `public/logo.webp` for dark/default and `public/logo_alt.webp` for light theme.

## Known Placeholders
- `components/forms/contact-form.tsx` posts to `app/api/contact/route.ts`, then opens WhatsApp using `https://wa.me/526565951211`.
- `app/api/contact/route.ts` validates contact leads and logs them server-side; it is the hook to replace with CRM/email delivery.
- Placeholder/sample content remains in blog posts, partners, cases, images, analytics, and OpenGraph assets; code comments with `TODO:` mark some of these locations.
