# GA Link Click Tracking

**Date:** 2026-05-05  
**Goal:** Track which nav and social links get the most clicks via GA4 custom events.

## Problem

GA4 is already loaded and consent-gated, but only the default page view fires. All 6 nav link clicks and 5 social icon clicks are invisible in analytics.

## Solution

Option A: `data-` attribute delegation — a single JS listener catches all tracked clicks, fires a GA4 `link_click` event, and silently no-ops if the user rejected cookies.

## HTML Changes

Add two attributes to every trackable `<a>` element:

| Attribute | Value |
|---|---|
| `data-track-label` | Human-readable link name (e.g. `"GitHub"`) |
| `data-track-section` | `"nav"` for `.links` nav buttons, `"social"` for `.socials` icons |

**Nav links (6):** GitHub, LinkedIn, X / Twitter, Facebook, SAP Developer, Bank Statement Processor  
**Social icons (5):** GitHub, LinkedIn, X / Twitter, Facebook, SAP

## JS Changes (`script.js`)

Add a delegated `click` listener inside the existing `DOMContentLoaded` handler:

```js
document.addEventListener('click', (e) => {
  const link = e.target.closest('[data-track-label]');
  if (!link || !window.gtag) return;
  gtag('event', 'link_click', {
    link_label: link.dataset.trackLabel,
    link_url: link.href,
    link_section: link.dataset.trackSection,
  });
});
```

## GA4 Event Schema

| Parameter | Example values |
|---|---|
| `link_label` | `"GitHub"`, `"LinkedIn"`, `"Bank Statement Processor"` |
| `link_section` | `"nav"`, `"social"` |
| `link_url` | `"https://github.com/longieirl"` |

## Consent Safety

`window.gtag` is only defined after the user accepts analytics cookies (see `cookies.js:loadGA()`). The guard `if (!link || !window.gtag) return` ensures no event fires and no error is thrown for users who rejected consent.

## Viewing in GA4

Events appear under **Reports → Engagement → Events → link_click**. Use the secondary dimension `link_section` to compare nav vs social, or `link_label` to rank individual links.
