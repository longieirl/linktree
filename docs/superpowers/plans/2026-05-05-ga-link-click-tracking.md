# GA Link Click Tracking Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fire a GA4 `link_click` event for every nav and social link click, with label, URL, and section parameters, only when analytics consent has been granted.

**Architecture:** Add `data-track-label` and `data-track-section` attributes to 11 link elements in `index.html`, then wire a single delegated `click` listener in `script.js` that reads those attributes and calls `gtag()`. The listener guards on `window.gtag` so it silently no-ops for users who declined consent.

**Tech Stack:** Vanilla JS, GA4 (`gtag`), static HTML — no build step.

---

### Task 1: Add tracking attributes to nav links in index.html

**Files:**
- Modify: `index.html:44-91`

- [ ] **Step 1: Add `data-track-label` and `data-track-section="nav"` to all 6 nav link `<a>` tags**

Replace the opening tag of each nav link as follows (preserve all existing attributes):

```html
<!-- GitHub nav link — line ~44 -->
<a href="https://github.com/longieirl" class="link-btn" target="_blank" rel="noopener noreferrer" data-track-label="GitHub" data-track-section="nav">

<!-- LinkedIn nav link — line ~52 -->
<a href="https://www.linkedin.com/in/jlongieirl" class="link-btn" target="_blank" rel="noopener noreferrer" data-track-label="LinkedIn" data-track-section="nav">

<!-- X / Twitter nav link — line ~60 -->
<a href="https://x.com/longieirl" class="link-btn" target="_blank" rel="noopener noreferrer" data-track-label="X / Twitter" data-track-section="nav">

<!-- Facebook nav link — line ~68 -->
<a href="https://www.facebook.com/longieirl" class="link-btn" target="_blank" rel="noopener noreferrer" data-track-label="Facebook" data-track-section="nav">

<!-- SAP Developer nav link — line ~76 -->
<a href="https://people.sap.com/jlong" class="link-btn" target="_blank" rel="noopener noreferrer" data-track-label="SAP Developer" data-track-section="nav">

<!-- Bank Statement Processor nav link — line ~84 -->
<a href="https://github.com/longieirl/bankstatementprocessor" class="link-btn link-btn--desc" target="_blank" rel="noopener noreferrer" data-track-label="Bank Statement Processor" data-track-section="nav">
```

- [ ] **Step 2: Verify in browser — open index.html, inspect one nav link, confirm both data attributes are present**

Open DevTools → Elements, click a nav `<a>`. Confirm `data-track-label` and `data-track-section="nav"` appear in the attributes panel.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add tracking attributes to nav links"
```

---

### Task 2: Add tracking attributes to social icon links in index.html

**Files:**
- Modify: `index.html:97-125`

- [ ] **Step 1: Add `data-track-label` and `data-track-section="social"` to all 5 social icon `<a>` tags**

Replace the opening tag of each social link as follows (preserve all existing attributes):

```html
<!-- GitHub social icon — line ~97 -->
<a href="https://github.com/longieirl" class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="GitHub" data-track-label="GitHub" data-track-section="social">

<!-- LinkedIn social icon — line ~103 -->
<a href="https://www.linkedin.com/in/jlongieirl" class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-track-label="LinkedIn" data-track-section="social">

<!-- X / Twitter social icon — line ~109 -->
<a href="https://x.com/longieirl" class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="X (Twitter)" data-track-label="X / Twitter" data-track-section="social">

<!-- Facebook social icon — line ~115 -->
<a href="https://www.facebook.com/longieirl" class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="Facebook" data-track-label="Facebook" data-track-section="social">

<!-- SAP social icon — line ~121 -->
<a href="https://people.sap.com/jlong" class="social-icon" target="_blank" rel="noopener noreferrer" aria-label="SAP Profile" data-track-label="SAP Developer" data-track-section="social">
```

- [ ] **Step 2: Verify in browser — inspect a social icon `<a>`, confirm both data attributes are present with `section="social"`**

Open DevTools → Elements, click a social `<a>`. Confirm `data-track-section="social"` (not `"nav"`).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add tracking attributes to social icon links"
```

---

### Task 3: Add delegated click listener to script.js

**Files:**
- Modify: `script.js:2-10`

- [ ] **Step 1: Add the delegated click listener inside the existing `DOMContentLoaded` handler**

The full updated `script.js` should look like this:

```js
document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('main');
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      main.classList.add('visible');
    });
  });

  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-track-label]');
    if (!link || !window.gtag) return;
    gtag('event', 'link_click', {
      link_label: link.dataset.trackLabel,
      link_url: link.href,
      link_section: link.dataset.trackSection,
    });
  });
});
```

- [ ] **Step 2: Manually verify the event fires — open index.html, accept cookies, open DevTools Console, click a nav link**

In the Console, before clicking, run:
```js
window._gaDebug = true;
const orig = window.gtag;
window.gtag = function(...args) { console.log('gtag called:', JSON.stringify(args)); orig?.apply(this, args); };
```
Then click "GitHub" nav link. Expect to see:
```
gtag called: ["event","link_click",{"link_label":"GitHub","link_url":"https://github.com/longieirl","link_section":"nav"}]
```

- [ ] **Step 3: Verify consent guard — open a fresh private window, decline cookies, click a nav link, confirm no gtag call in Console**

In the Console, run:
```js
console.log('gtag defined:', typeof window.gtag);
```
Expected: `gtag defined: undefined`

Click a nav link. No `gtag called:` log should appear.

- [ ] **Step 4: Commit**

```bash
git add script.js
git commit -m "feat: fire GA4 link_click events on nav and social link clicks"
```

---

### Task 4: Verify events appear in GA4 DebugView

**Files:** None — verification only.

- [ ] **Step 1: Enable GA4 DebugView**

In Chrome, install the [Google Analytics Debugger extension](https://chrome.google.com/webstore/detail/google-analytics-debugger/jnkmfdileelhofjcijamephohjechhna) or open DevTools → Network tab and filter for `collect`.

Alternatively, open GA4 → Admin → DebugView. Events from your browser appear in real time when the GA debug extension is active.

- [ ] **Step 2: Accept cookies on the live site, click each nav link once, confirm `link_click` events appear in DebugView with correct `link_label` and `link_section` parameters**

Expected DebugView entries (one per click):
- Event name: `link_click`
- `link_label`: matches the link text
- `link_section`: `"nav"` for main buttons, `"social"` for icon row
- `link_url`: correct destination URL

- [ ] **Step 3: Register custom dimensions in GA4 (one-time setup)**

In GA4 → Admin → Custom Definitions → Custom Dimensions, create:

| Dimension name | Scope | User property / Event parameter |
|---|---|---|
| Link Label | Event | `link_label` |
| Link Section | Event | `link_section` |
| Link URL | Event | `link_url` |

This makes the parameters available as filterable dimensions in GA4 reports.
