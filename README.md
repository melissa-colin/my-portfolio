# melissacolin.ai — Portfolio

Personal portfolio of **Mélissa Colin**, AI engineering student at ENSEIRB-MATMECA (Bordeaux) — computer vision, deep learning, and explainable AI.

🔗 **Live:** https://melissacolin.ai

[![Astro](https://img.shields.io/badge/Astro-5C2E9E?logo=astro&logoColor=fff)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](./LICENSE)

## Overview

A fast, statically-rendered, bilingual (🇫🇷/🇬🇧) portfolio. All content is pre-rendered to HTML for excellent SEO and AI-search discoverability, with React islands used only for interactivity (filters, theme toggle, animations). Content is editable from any device through a built-in CMS, and every change auto-deploys.

## Tech stack

- **[Astro](https://astro.build)** — static site generation (zero JS shipped except small interactive islands)
- **React** islands + **[Framer Motion](https://www.framer.com/motion/)** — interactive/animated components
- **[Tailwind CSS](https://tailwindcss.com)** — styling
- **[Sveltia CMS](https://github.com/sveltia/sveltia-cms)** — Git-based content editing at `/admin`
- **GitHub Actions** → **Hostinger** — automated build & deploy

## Features

- 🌍 Localized routes — French at `/`, English at `/en/`, with `hreflang` + per-locale canonicals
- 🔎 SEO & AI-referencing — rich JSON-LD (`Person`, `ScholarlyArticle`, `WebSite`), `sitemap.xml`, `robots.txt`, `llms.txt`, and a `.well-known/ai-context.json` for entity disambiguation
- 🎂 Always-current age — computed client-side, never needs a rebuild
- ✍️ Edit content from your phone via `/admin` (no code, no local build)
- 🌗 Dark/light theme with no flash of unstyled content

## Project structure

```
src/
├── content/        # Editable content (CMS-managed): projects, experiences, education,
│                   #   certifications, publications, blog (one file per item, .fr/.en),
│                   #   and ui/ (singleton UI strings per locale)
├── components/     # .astro components + React islands (Hero, Header, Footer, pages/)
├── layouts/        # BaseLayout (head/SEO/theme) + PageLayout (header/footer shell)
├── lib/            # content + i18n + SEO helpers
├── pages/          # routes (FR at root, EN under /en), sitemap.xml endpoint
└── index.css       # global styles
public/
├── admin/          # Sveltia CMS (config.yml + loader)
├── oauth/          # GitHub OAuth handler (PHP, for the CMS — see SETUP.md)
└── assets/, .well-known/, robots.txt, llms.txt, manifest.json
```

## Local development

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # static output in dist/
pnpm preview    # serve the production build locally
```

## Editing content

Go to **https://melissacolin.ai/admin**, sign in with GitHub, edit in a form UI (works on mobile). Saving commits to this repo; GitHub Actions then rebuilds and deploys automatically (~1–2 min). See [`SETUP.md`](./SETUP.md) for the one-time CMS/CI configuration.

## Deployment

Push to `main` (or save in the CMS) → GitHub Actions builds the site and pushes `dist/` to the `my-portfolio-dist` repo, which Hostinger serves at melissacolin.ai.

## License

[MIT](./LICENSE) © Mélissa Colin
