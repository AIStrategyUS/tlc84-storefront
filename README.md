# The Legacy Collective — storefront mockup

A production-quality mockup rebuild of [tlc84.com](https://tlc84.com) as a modern,
fast, mobile-first direct-to-consumer storefront. Built with Vite, React,
TypeScript, and Tailwind CSS. There is no backend: cart, checkout, photo
uploads, and event booking are all simulated client-side so the whole site
can be reviewed as a static link before any real infrastructure is built.

See [`docs/ASSUMPTIONS.md`](docs/ASSUMPTIONS.md) for every place a judgment
call was made instead of a confirmed answer from the client, and
[`docs/GOING-LIVE.md`](docs/GOING-LIVE.md) (added in Phase 4) for what it
takes to turn this into a real, transacting store.

## Status

Being built in phases, each reviewed before the next starts:

- [x] **Phase 1** — scaffold, brand theme, header/footer, homepage, GitHub Pages deploy
- [x] **Phase 2** — catalog data, shop pages, product pages, the photo customizer
- [ ] **Phase 3** — cart drawer, cart page, checkout, order confirmation
- [ ] **Phase 4** — events booking, bulk orders, about, contact, policies, trust layer, SEO polish

## Stack

- Vite + React 18 + TypeScript (strict)
- Tailwind CSS, with brand tokens as theme colors (see `tailwind.config.js`)
- React Router (`BrowserRouter`)
- Fraunces (display headings) + Figtree (body/UI), via Google Fonts
- lucide-react for icons

## Getting started

```bash
npm install
npm run dev
```

Open the printed local URL (typically `http://localhost:5173`).

## Building

```bash
npm run build
```

This runs a strict TypeScript build, builds the production bundle with Vite,
and copies `dist/index.html` to `dist/404.html`. The 404 copy is what makes
client-side routes (e.g. `/shop/faith`) work when someone loads that URL
directly on GitHub Pages, which otherwise only serves static files and has no
knowledge of React Router's routes.

Preview the production build locally with:

```bash
npm run preview
```

## Deploying to GitHub Pages

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys
automatically on every push to `main`, using the official
`actions/configure-pages`, `actions/upload-pages-artifact`, and
`actions/deploy-pages` actions.

**One-time setup required in the repo's GitHub settings:** go to
**Settings → Pages** and set **Source** to **GitHub Actions** (not "Deploy
from a branch"). Without this, the workflow will run but Pages won't serve
its output.

The site's base path is derived from `package.json`'s `"name"` field
(`/${name}/`), so the repo name only has to be typed in one place. If the
repo is ever renamed, update `"name"` in `package.json` to match — no other
file needs to change. To build for a different host (a custom domain, or
serving from the domain root), override it at build time:

```bash
VITE_BASE_PATH=/ npm run build
```

## Project structure

```
src/
  components/
    layout/     Header, Footer, Layout (page shell)
    ui/         Shared building blocks (Button, ComingSoon, ...)
  data/         Typed catalog and content data (added in Phase 2)
  lib/          Small framework-free helpers and hooks
  pages/        One file per route in the site map
docs/           Assumptions, photo shot list, going-live plan
public/images/  Logo and product photo placeholders
```
