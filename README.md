## SwapStation Mobility – Marketing & Newsroom SPA

This repository contains the marketing site and newsroom experience for **SwapStation Mobility**, built as a single‑page application on top of **React + TypeScript + Vite** with Tailwind CSS‑style utility classes.

The app includes:
- A rich landing page with hero, product/solution sections, metrics, ecosystem, testimonials and CTAs.
- A fully featured **Newsroom**:
  - Landing news section that pulls the latest posts.
  - Dedicated news listing with featured carousel, category filtering, and pagination‑style “load more”.
  - Single news article page that fetches full post content from the headless WordPress backend, plus related “Continue Reading” items.
- Additional product, services, legal, careers and locator pages wired through an in‑app page router.

---

## Tech Stack

- **Build Tool**: Vite
- **Language**: TypeScript + React
- **Styling**: Tailwind CSS (via the new `@import "tailwindcss"` pipeline and custom design tokens in `index.css`)
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Content Source**: Headless WordPress (`https://nolimit.buzz/headless/swapstation`)

Key news endpoints:
- List/posts:  
  `https://nolimit.buzz/headless/swapstation/wp-json/headless/v1/db?datatype=post&taxonomy=category`
- Single post by slug:  
  `https://nolimit.buzz/headless/swapstation/wp-json/headless/v1/post/{post_slug}`

---

## Getting Started

### Prerequisites

- Node.js (LTS recommended, e.g. 18+)
- npm (comes with Node)

### Install dependencies

```bash
npm install
```

### Run the dev server

```bash
npm run dev
```

The app will start on the port reported by Vite (typically `http://localhost:5173`).  
The site is a single‑page app; navigation is handled inside `App.tsx` via the `currentPage` state.

### Build for production

```bash
npm run build
```

The optimized assets are emitted to the `dist` directory.

### Preview the production build

```bash
npm run preview
```

---

## Project Structure (High Level)

- `App.tsx` – top‑level SPA controller and page router.
- `components/`
  - Landing sections: `Hero.tsx`, `PainSolution.tsx`, `WhatBuilding.tsx`, `HowItWorks.tsx`, `Services.tsx`, `MetricsSection.tsx`, `Ecosystem.tsx`, `NewsSection.tsx`, `FinalCTA.tsx`, etc.
  - Newsroom:
    - `NewsPage.tsx` – news listing, featured carousel, filters, and pagination.
    - `SingleNewsPage.tsx` – single article view, full content fetch + “Continue Reading”.
    - `NewsCategoryPage.tsx` – category‑filtered listing.
  - Static/other pages: `AboutPage.tsx`, `ServicesPage.tsx`, `ProductsPage.tsx`, `LocatorPage.tsx`, `TeamPage.tsx`, `CareersPage.tsx`, `LegalPage.tsx`, etc.
- `index.tsx` – React entry point.
- `index.css` – Tailwind setup and global design tokens/utilities (including typography and single‑news body styles).

---

## Environment & Configuration

The app currently **does not require any local environment variables**; all headless WordPress endpoints are public.  
If you introduce private APIs later, add a `.env` section here and reference them via Vite’s `import.meta.env` pattern.

---

## Development Notes

- News content and categories are driven entirely from the headless WordPress backend.  
- Featured stories in the Newsroom carousel are selected via the **`Featured`** term in the post’s `terms` array; if no posts are flagged, the app falls back to the latest two posts.
- The landing page news section uses the same feed but only surfaces the latest few items.
- The single article page will gracefully fall back to a static, on‑brand narrative if the remote content fails to load.

---

## Scripts

Common npm scripts defined in `package.json`:

- `npm run dev` – start the Vite dev server.
- `npm run build` – create a production build.
- `npm run preview` – preview the production build locally.

---

## License

This codebase is proprietary to SwapStation Mobility (or your organization).  
Do not distribute or reuse without explicit permission.
