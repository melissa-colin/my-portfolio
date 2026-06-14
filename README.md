# melissacolin.ai — My Portfolio

This is my personal portfolio. I'm **Mélissa Colin**, an AI engineering student at ENSEIRB-MATMECA (Bordeaux). I care about designing the model architectures of tomorrow (world models, bio-inspired and post-Transformer approaches), and I'm currently a Mitacs Globalink research intern at the University of Alberta. My goal is to become a Research Scientist at Google.

🔗 **Live:** https://melissacolin.ai

[![Astro](https://img.shields.io/badge/Astro-5C2E9E?logo=astro&logoColor=fff)](https://astro.build)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?logo=tailwindcss&logoColor=fff)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red.svg)](./LICENSE)

## Overview

A fast, statically-rendered, bilingual (🇫🇷/🇬🇧) portfolio I built with Astro. All content is pre-rendered to HTML for strong SEO and AI-search discoverability, with React islands used only for interactivity (filters, animations). Fonts are self-hosted (no third-party font CDN). I can edit the content from any device through a built-in CMS, and every change auto-deploys.

## Tech stack

- **[Astro](https://astro.build)** — static site generation (almost zero JS shipped, only small interactive islands)
- **React** islands + **[Framer Motion](https://www.framer.com/motion/)** feel reproduced in CSS
- **[Tailwind CSS](https://tailwindcss.com)** — styling
- **[Sveltia CMS](https://github.com/sveltia/sveltia-cms)** — Git-based content editing at `/admin`
- **GitHub Actions** → **Hostinger** — automated build & deploy

## Features

- 🌍 Localized routes — French at `/`, English at `/en/`, with `hreflang` + per-locale canonicals
- 🔎 SEO & AI-referencing — rich JSON-LD (`Person`, `ScholarlyArticle`, `WebSite`), `sitemap.xml`, `robots.txt`, `llms.txt`, and a `.well-known/ai-context.json` for entity disambiguation
- 🎂 Always-current age — computed client-side, never needs a rebuild
- ✍️ I edit content from my phone via `/admin` (no code, no local build)
- 🎨 Cohesive dark theme set before first paint (no flash of unstyled content)

## Project structure

```
src/
├── content/        # My editable content (CMS-managed): projects, experiences, education,
│                   #   certifications, publications, blog (one file per item, .fr/.en),
│                   #   and ui/ (singleton UI strings per locale)
├── components/     # .astro components + React islands (Hero, Header, Footer, pages/)
├── layouts/        # BaseLayout (head/SEO/theme/animations) + PageLayout (header/footer shell)
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

I go to **https://melissacolin.ai/admin**, sign in with GitHub, and edit in a form UI (works on mobile). Saving commits to this repo; GitHub Actions then rebuilds and deploys automatically (~1–2 min). See [`SETUP.md`](./SETUP.md) for the one-time CMS/CI configuration.

## Deployment

A push to `main` (or a save in the CMS) triggers GitHub Actions, which builds the site and pushes `dist/` to the deploy repo served by Hostinger at melissacolin.ai.

## License

**© 2026 Mélissa Colin — All rights reserved.** This repository is published for viewing only. Reuse, copying, modification, or redistribution of any part is **not permitted** without my written permission. See [LICENSE](./LICENSE).
