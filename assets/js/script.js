(() => {
  'use strict';
  const config = window.PORTFOLIO_CONFIG || {};
  const header = document.querySelector('.site-header');
  const menu = document.querySelector('.navigation');
  const toggle = document.querySelector('.menu-toggle');
  const desktop = window.matchMedia('(min-width: 1024px)');
  const navLinks = [...menu.querySelectorAll('a')];
  let isOpen = false;

  function setMenu(open, restoreFocus = false) {
    isOpen = open;
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? toggle.dataset.closeLabel : toggle.dataset.openLabel);
    document.querySelector('main').inert = open;
    document.querySelector('footer').inert = open;
    if (open) navLinks[0].focus();
    else if (restoreFocus) toggle.focus();
  }

  toggle.hidden = false;
  header.classList.add('menu-ready');
  toggle.addEventListener('click', () => setMenu(!isOpen, isOpen));
  navLinks.forEach(link => link.addEventListener('click', () => {
    if (!isOpen) return;
    setMenu(false);
    const section = document.querySelector(link.hash);
    section.setAttribute('tabindex', '-1');
    section.focus({ preventScroll: true });
  }));
  document.addEventListener('keydown', event => {
    if (!isOpen) return;
    if (event.key === 'Escape') { event.preventDefault(); setMenu(false, true); }
    if (event.key !== 'Tab') return;
    const focusable = [...header.querySelectorAll('a,button')].filter(el => !el.hidden && el.getClientRects().length);
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  desktop.addEventListener('change', () => setMenu(false));

  function updateHeader() { header.classList.toggle('is-scrolled', window.scrollY > 80); }
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // Observer marks the section in view; content never depends on it being available.
  if ('IntersectionObserver' in window) {
    const sections = document.querySelectorAll('main > section[id]');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          if (link.hash === '#' + entry.target.id) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-15% 0px -65% 0px' });
    sections.forEach(section => observer.observe(section));
  }

  function preserveAnchor() {
    document.querySelectorAll('[data-language-link]').forEach(link => {
      const url = new URL(link.href);
      url.hash = window.location.hash;
      link.href = url.href;
    });
  }
  preserveAnchor();
  window.addEventListener('hashchange', preserveAnchor);

  function setupTheme() {
    const button = document.querySelector('.theme-toggle');
    const preference = window.matchMedia('(prefers-color-scheme: dark)');
    const isDark = () => document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : preference.matches;
    const reflect = () => {
      button.setAttribute('aria-pressed', String(isDark()));
      document.querySelector('meta[name="theme-color"]').content = isDark() ? '#1D1915' : '#F3EEE4';
    };
    button.hidden = false;
    reflect();
    button.addEventListener('click', () => {
      const theme = isDark() ? 'light' : 'dark';
      document.documentElement.dataset.theme = theme;
      try { localStorage.setItem('gn-theme', theme); } catch { /* Theme remains usable without storage. */ }
      reflect();
    });
    preference.addEventListener('change', reflect);
  }
  setupTheme();

  function setupWhatsApp() {
    const phone = config.whatsapp?.phone || '';
    // Missing/invalid data: links stay hidden and have no fabricated URL.
    if (!/^[1-9]\d{9,14}$/.test(phone)) return;
    const language = document.documentElement.lang;
    const message = config.whatsapp.messages?.[language] || '';
    if (!message) return;
    const href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    document.querySelectorAll('[data-whatsapp]').forEach(link => {
      link.href = href;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.hidden = false;
    });
    document.body.classList.add('has-whatsapp');
    // Keep the floating shortcut out of the way of contact actions and the footer.
    if ('IntersectionObserver' in window) {
      const floating = document.querySelector('.whatsapp-float');
      new IntersectionObserver(entries => { floating.hidden = entries[0].isIntersecting; }, { threshold: 0 }).observe(document.querySelector('#contato'));
    }
  }
  setupWhatsApp();
  document.querySelectorAll('[data-year]').forEach(node => { node.textContent = new Date().getFullYear(); });
  if (config.available === false) document.querySelectorAll('[data-availability]').forEach(node => { node.hidden = true; });
})();
