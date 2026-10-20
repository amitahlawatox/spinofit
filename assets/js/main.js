(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#primary-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!open));
      nav.classList.toggle('is-open', !open);
      toggle.setAttribute('aria-label', open ? 'Open navigation' : 'Close navigation');
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Open navigation');
    }));
  }

  // Crisp micro-interactions: reading progress, compact sticky header and gentle reveal.
  const progress = document.createElement('div');
  progress.id = 'reading-progress';
  progress.setAttribute('aria-hidden', 'true');
  document.body.appendChild(progress);

  const header = document.querySelector('.site-header');
  let scrollQueued = false;
  const updateScrollUI = () => {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const percent = max > 0 ? (window.scrollY / max) * 100 : 0;
    progress.style.width = Math.min(100, Math.max(0, percent)) + '%';
    if (header) header.classList.toggle('is-scrolled', window.scrollY > 14);
    scrollQueued = false;
  };
  window.addEventListener('scroll', () => {
    if (!scrollQueued) {
      window.requestAnimationFrame(updateScrollUI);
      scrollQueued = true;
    }
  }, {passive: true});
  updateScrollUI();

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!reduceMotion && 'IntersectionObserver' in window) {
    document.body.classList.add('reveal-ready');
    const revealTargets = document.querySelectorAll(
      '.section-index, .section-overline, .two-col > *, .fact, .service-card, .timeline-entry, .journal-card, .contact-copy, .contact-form, .statement-inner'
    );
    revealTargets.forEach((el, i) => {
      el.setAttribute('data-reveal', '');
      if (el.classList.contains('service-card') || el.classList.contains('journal-card') || el.classList.contains('fact')) {
        el.setAttribute('data-reveal-delay', String((i % 3) + 1));
      }
    });
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    }, {threshold: 0.12, rootMargin: '0px 0px -35px 0px'});
    revealTargets.forEach(el => observer.observe(el));
  }
  const year = document.querySelector('#year');
  if (year) year.textContent = new Date().getFullYear();
})();