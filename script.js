// Fade in the page once fonts and DOM are ready
document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('main');
  // Small delay lets the browser paint once before triggering the transition
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      main.classList.add('visible');
    });
  });

  function analyticsConsented() {
    try {
      const c = JSON.parse(localStorage.getItem('cookie_consent'));
      return c && c.analytics === true;
    } catch { return false; }
  }

  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-track-label]');
    if (!link || !window.gtag || !analyticsConsented()) return;
    gtag('event', 'link_click', {
      link_label: link.dataset.trackLabel,
      link_url: link.href,
      link_section: link.dataset.trackSection,
    });
  });
});
