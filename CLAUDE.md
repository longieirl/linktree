# Linktree Project

A static HTML/CSS/JS linktree-style website.

## Project Structure

- `index.html` — main page
- `style.css` — styles
- `script.js` — fade-in on load

## Guidelines

- Pure static files, no build step or bundler
- Vanilla HTML, CSS, and JS only
- Mobile-first, responsive design (max-width 520px centered)
- No external dependencies unless absolutely necessary

## Design

- **Aesthetic**: Dark luxury editorial — deep black background with warm amber/gold accents
- **Fonts**: Playfair Display (name/display), DM Mono (links), DM Sans (body/bio)
- **Background**: `#0a0a0a` with radial amber glow behind profile and noise texture overlay
- **Accent color**: `#c9a96e` (warm gold)
- **Link buttons**: pill-shaped, outlined, transparent bg, DM Mono labels
- **Avatar**: CSS gradient circle with initials (swap for `<img>` when ready)

## Content (update in index.html)

- **Handle**: `@yourhandle` → `<h1 class="name">`
- **Bio**: `Your short bio goes here` → `<p class="bio">`
- **Avatar initials**: `YH` → `.avatar-initials`
- **Links**: `<nav class="links">` — update `href` and label text per `<a>`
- **Socials**: `<div class="socials">` — update `href` per social icon `<a>`

## Links

| Label | URL |
|---|---|
| My Website | https://example.com |
| Latest Video | https://youtube.com |
| Shop | https://shop.example.com |
| Newsletter | https://newsletter.example.com |
| Book a Call | https://calendly.com |
