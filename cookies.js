(() => {
  const GA_ID = 'G-4ZZ7JEXK7P';
  const CONSENT_KEY = 'cookie_consent';
  const CONSENT_VERSION = '1'; // bump when policy changes to re-prompt users

  const banner = document.getElementById('cookie-banner');
  const overlay = document.getElementById('cookie-modal-overlay');
  const analyticsToggle = document.getElementById('analytics-toggle');

  // ─── Consent storage ──────────────────────────────────────────
  function getConsent() {
    try { return JSON.parse(localStorage.getItem(CONSENT_KEY)); } catch { return null; }
  }

  function saveConsent(analytics, method) {
    const record = {
      version: CONSENT_VERSION,
      analytics,
      method,           // 'accept_all' | 'reject_all' | 'custom'
      ts: Date.now(),
      ua: navigator.userAgent.slice(0, 120)
    };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
    return record;
  }

  // ─── Google Analytics — lazy load only after consent ──────────
  function loadGA() {
    if (window.__gaLoaded) return;
    window.__gaLoaded = true;

    // Initialise dataLayer stub before the script arrives
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    gtag('js', new Date());
    gtag('config', GA_ID, {
      anonymize_ip: true,              // GDPR: mask last octet of IP
      allow_google_signals: false,     // disable advertising / remarketing features
      allow_ad_personalization_signals: false,
      restricted_data_processing: true // CCPA safeguard
    });

    const s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);
  }

  // ─── UI helpers ───────────────────────────────────────────────
  function closeBanner() { if (banner.open) banner.close(); }
  function closeModal()  { if (overlay.open) overlay.close(); }

  function openModal() {
    const consent = getConsent();
    analyticsToggle.checked = consent ? Boolean(consent.analytics) : true;
    overlay.showModal();
  }

  // ─── Boot: show banner if no valid consent on record ──────────
  const existing = getConsent();
  if (!existing || existing.version !== CONSENT_VERSION) {
    banner.show(); // non-modal — doesn't trap focus like showModal()
  } else if (existing.analytics) {
    loadGA(); // re-hydrate GA on return visits that previously accepted
  }

  // ─── Banner actions ───────────────────────────────────────────
  document.getElementById('cookie-accept').addEventListener('click', () => {
    saveConsent(true, 'accept_all');
    loadGA();
    closeBanner();
  });

  document.getElementById('cookie-decline').addEventListener('click', () => {
    saveConsent(false, 'reject_all');
    closeBanner();
  });

  document.getElementById('cookie-manage').addEventListener('click', () => {
    closeBanner();
    openModal();
  });

  // ─── Footer "Cookie Preferences" link ─────────────────────────
  document.getElementById('cookie-prefs-btn').addEventListener('click', openModal);

  // ─── Modal actions ────────────────────────────────────────────
  document.getElementById('cookie-modal-save').addEventListener('click', () => {
    const analytics = analyticsToggle.checked;
    saveConsent(analytics, 'custom');
    if (analytics) loadGA();
    closeModal();
    closeBanner();
  });

  document.getElementById('cookie-modal-close').addEventListener('click', () => {
    // If no consent on record yet, treat Cancel as Reject so banner doesn't re-prompt
    if (!getConsent()) saveConsent(false, 'reject_all');
    closeModal();
  });

  // Close on overlay backdrop click — same: persist a rejection if nothing saved yet
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      if (!getConsent()) saveConsent(false, 'reject_all');
      closeModal();
    }
  });

  // <dialog> fires 'cancel' on Escape — persist rejection and close cleanly
  overlay.addEventListener('cancel', (e) => {
    e.preventDefault();
    if (!getConsent()) saveConsent(false, 'reject_all');
    closeModal();
  });
})();
