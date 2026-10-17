# Physio At Your Doorstep

Website for [physioatyourdoorstep.com](https://www.physioatyourdoorstep.com) — home physiotherapy services in Bangalore and Pune.

Built with Next.js 15 (App Router), React 19, Tailwind CSS 4 and TypeScript. All pages are statically generated from markdown; form submissions are delivered by email.

## Getting started

```bash
pnpm install
cp .env.example .env   # fill in the SMTP settings
pnpm dev               # http://localhost:3000
```

| Command      | Purpose                     |
| ------------ | --------------------------- |
| `pnpm dev`   | Local development server    |
| `pnpm build` | Production build            |
| `pnpm start` | Serve the production build  |
| `pnpm check` | Type-check without emitting |

## Project structure

```
app/                 Routes (App Router) and server actions
components/          Page sections and shared UI (components/ui = base primitives)
lib/                 Content loading, SEO/schema helpers, email, validation
content/blogs/       Blog posts            → /<slug>
content/locations/   Area pages            → /<slug>
content/service-areas/ Service × area pages → /<slug>
markdown/            Service pages         → /service/<slug>
public/images/       Static images
```

`app/sitemap.ts`, `/blogs`, `/locations` and category pages are generated from the content folders, so adding a markdown file is enough to publish a page.

## Environment

See `.env.example`. SMTP credentials are required for the booking, contact and careers forms; everything else is optional.

## Deployment

Deployed on Vercel (`vercel.json`). The canonical host is `www.physioatyourdoorstep.com`; other hosts are redirected in `next.config.ts`.
