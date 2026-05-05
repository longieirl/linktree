// Fade in the page once fonts and DOM are ready
document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('main');
  // Small delay lets the browser paint once before triggering the transition
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
