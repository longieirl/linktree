# linktree

A personal link-in-bio page for [@longieirl](https://github.com/longieirl/linktree) — a self-hosted alternative to Linktree built with zero dependencies.

## What it does

A single-page site that aggregates social and professional profile links in one place. Visitors see a profile photo, a short bio, and a set of link buttons pointing to GitHub, LinkedIn, X/Twitter, Facebook, and an SAP Developer profile.

## How it was built

Pure static HTML, CSS, and JavaScript — no build step, no framework, no package manager.

- **`index.html`** — semantic markup with Open Graph and Twitter Card meta tags for link previews, and Google Analytics for traffic tracking
- **`style.css`** — mobile-first responsive layout (max-width 520px), dark luxury aesthetic with a `#0a0a0a` background, warm gold (`#c9a96e`) accents, SVG noise texture overlay, and a radial amber glow. Fonts are Playfair Display (name), DM Mono (buttons), and DM Sans (body) loaded from Google Fonts
- **`script.js`** — minimal fade-in on load using a CSS class toggle

### Design details

- Pill-shaped outlined link buttons with staggered entrance animations
- Avatar with an animated gold ring pulse
- Hover effects scoped to pointer devices only (`@media (hover: hover)`) so touch users don't see stuck hover states
- 44px minimum tap targets throughout for mobile accessibility

## Structure

```
index.html   — page markup
style.css    — all styles
script.js    — fade-in on load
avatar.jpg   — profile photo
```

## Live site

[https://longieirl.github.io/linktree/](https://longieirl.github.io/linktree/)
