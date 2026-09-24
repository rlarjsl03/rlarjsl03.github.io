const navigationLinks = Array.from(document.querySelectorAll('.top-tabs a[href^="#"]'));
const observedSections = Array.from(document.querySelectorAll('main > section[id]'));

function setActiveNavigation(sectionId) {
  const navigationId = sectionId === 'web-project' ? 'projects' : sectionId;

  navigationLinks.forEach(link => {
    const isActive = link.getAttribute('href') === `#${navigationId}`;
    link.classList.toggle('active', isActive);

    if (isActive) {
      link.setAttribute('aria-current', 'page');
    } else {
      link.removeAttribute('aria-current');
    }
  });
}

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    const current = entries
      .filter(entry => entry.isIntersecting)
      .sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top))[0];

    if (current) setActiveNavigation(current.target.id);
  }, {
    rootMargin: '-20% 0px -68% 0px',
    threshold: 0
  });

  observedSections.forEach(section => observer.observe(section));
}

navigationLinks.forEach(link => {
  link.addEventListener('click', () => setActiveNavigation(link.hash.slice(1)));
});
