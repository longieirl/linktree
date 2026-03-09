// Fade in the page once fonts and DOM are ready
document.addEventListener('DOMContentLoaded', () => {
  const main = document.getElementById('main');
  // Small delay lets the browser paint once before triggering the transition
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      main.classList.add('visible');
    });
  });
});
